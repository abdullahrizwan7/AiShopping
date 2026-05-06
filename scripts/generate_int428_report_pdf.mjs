import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(".");
const REPORTS_DIR = path.join(ROOT, "reports");

const TEMPLATE_PATH = path.join(REPORTS_DIR, "INT428_Project_Report_Better.template.html");
const DEFAULT_INPUTS_PATH = path.join(REPORTS_DIR, "int428_report.inputs.json");

const resolveArgValue = (flag, fallback) => {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return fallback;
  const val = process.argv[idx + 1];
  if (!val) return fallback;
  return path.resolve(val);
};

const INPUTS_PATH = resolveArgValue("--inputs", DEFAULT_INPUTS_PATH);
const OUT_HTML_PATH = resolveArgValue("--out-html", path.join(REPORTS_DIR, "INT428_Project_Report_Better.FILLED.html"));
const OUT_PDF_PATH = resolveArgValue("--out-pdf", path.join(REPORTS_DIR, "INT428_Project_Report_Better.FILLED.pdf"));

const todayISO = () => new Date().toISOString().slice(0, 10);

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const replaceAll = (template, map) => {
  let out = template;
  for (const [key, val] of Object.entries(map)) {
    out = out.replaceAll(`{{${key}}}`, val);
  }
  return out;
};

const ensureFileExists = (p, hint) => {
  if (fs.existsSync(p)) return;
  throw new Error(`${hint}\nMissing: ${p}`);
};

ensureFileExists(TEMPLATE_PATH, "Template HTML not found.");

let inputs = {};
if (fs.existsSync(INPUTS_PATH)) {
  inputs = JSON.parse(fs.readFileSync(INPUTS_PATH, "utf8"));
} else {
  throw new Error(
    `Inputs JSON not found: ${INPUTS_PATH}\nCreate it based on: ${path.join(REPORTS_DIR, "int428_report.inputs.example.json")}`
  );
}

const students = Array.isArray(inputs.students) ? inputs.students : [];
const coverStudentsHtml =
  students.length > 0
    ? students
        .map((s) => {
          const name = escapeHtml(s?.name || "______________________");
          const rollNo = escapeHtml(s?.roll_no || "______________________");
          return `<p>Student Name: ${name} &nbsp;&nbsp; Roll No: ${rollNo}</p>`;
        })
        .join("\n        ")
    : `<p>Student Name: ______________________ &nbsp;&nbsp; Roll No: ______________________</p>`;

const questionnaireStudent = students[0] || {};
const questionnaireStudentName = escapeHtml(questionnaireStudent?.name || "____________________________");
const questionnaireRollNo = escapeHtml(questionnaireStudent?.roll_no || "____________________________");
const questionnaireBranchSemester = escapeHtml(questionnaireStudent?.branch_semester || "____________________________");

const tokenMap = {
  project_title: escapeHtml(inputs.project_title || "Powered Shopping (AI Voice Shopping Assistant)"),
  course_code: escapeHtml(inputs.course_code || "INT428"),
  course_title: escapeHtml(inputs.course_title || "Domain-Specific Generative AI Chatbot Using APIs"),
  university_name: escapeHtml(inputs.university_name || "Lovely Professional University, Phagwara, Punjab"),
  submission_date: escapeHtml(inputs.submission_date || todayISO()),
  generated_on: escapeHtml(inputs.generated_on || todayISO()),
  guide_name: escapeHtml(inputs.guide_name || "______________________"),
  github_link: escapeHtml(inputs.github_link || "______________________"),
  repository_url: escapeHtml(inputs.repository_url || "______________________"),
  declaration_date: escapeHtml(inputs.declaration_date || "______________________"),
  student_signature_name: escapeHtml(inputs.student_signature_name || "______________________"),
  questionnaire_student_name: questionnaireStudentName,
  questionnaire_roll_no: questionnaireRollNo,
  questionnaire_branch_semester: questionnaireBranchSemester,
  cover_students: coverStudentsHtml
};

const template = fs.readFileSync(TEMPLATE_PATH, "utf8");
const htmlOut = replaceAll(template, tokenMap);
fs.writeFileSync(OUT_HTML_PATH, htmlOut);

const chromeCandidates = [
  process.env.CHROME_BIN,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium"
].filter(Boolean);

const findChrome = () => {
  for (const candidate of chromeCandidates) {
    try {
      if (fs.existsSync(candidate)) return candidate;
    } catch {
      // ignore
    }
  }
  return null;
};

const chromePath = findChrome();
if (!chromePath) {
  console.error("Filled HTML generated, but Chrome was not found to print PDF.");
  console.error(`HTML: ${OUT_HTML_PATH}`);
  process.exit(0);
}

const fileUrl = `file://${OUT_HTML_PATH}`;
const args = [
  "--headless=new",
  "--disable-gpu",
  "--no-margins",
  `--print-to-pdf=${OUT_PDF_PATH}`,
  fileUrl
];

const res = spawnSync(chromePath, args, { stdio: "inherit" });
if (res.error) throw res.error;
if (res.status !== 0) {
  throw new Error(`Chrome print-to-pdf failed with exit code ${res.status}`);
}

console.log(`Wrote:\n- ${OUT_HTML_PATH}\n- ${OUT_PDF_PATH}`);


# INT428 Project Report (Powered Shopping)

This repo contains the enhanced INT428 project report template + a small generator to fill required details (name/roll/etc.) and export a polished PDF.

## What’s included
- `reports/INT428_Project_Report_Better.template.html` – fillable HTML template
- `reports/int428_report.inputs.example.json` – example schema
- `scripts/generate_int428_report_pdf.mjs` – generates filled HTML + PDF

## Generate the PDF
1) Create your inputs file (this is intentionally not committed):
   - Copy `reports/int428_report.inputs.example.json` → `reports/int428_report.inputs.json`
   - Fill your details (name, roll no, guide, etc.)
2) Run:
   - `node scripts/generate_int428_report_pdf.mjs --inputs reports/int428_report.inputs.json`

Outputs:
- `reports/INT428_Project_Report_Better.FILLED.html`
- `reports/INT428_Project_Report_Better.FILLED.pdf`

Notes:
- Requires Google Chrome installed (used in headless mode).

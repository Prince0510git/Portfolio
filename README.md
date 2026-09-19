# Prince Kumar — Data Analyst Portfolio

A modern, responsive, and recruiter-focused personal portfolio website tailored specifically for **Prince Kumar (Data Analyst)**. Built with a clean data-and-technology aesthetic, high contrast readability, dark/light theme switching, interactive KPI metrics, SQL query displays, and comprehensive case study breakdowns.

---

## 🌟 Key Highlights

- **Executive Aesthetic**: Minimal, dark navy & slate palette with cyan, indigo, and emerald accents, styled specifically for data and business intelligence roles.
- **Deep-Dive Project Case Studies**: 4 detailed project showcases featuring real business problem statements, data cleaning pipelines, syntax-highlighted SQL scripts, KPI ribbon previews, and actionable recommendations:
  1. *E-Commerce Sales & Customer Analysis* (SQL, Excel, Power BI)
  2. *Retail Sales Performance Dashboard* (Excel, Power BI, SQL)
  3. *Customer Churn & Retention Analysis* (Python, Pandas, SQL, Power BI)
  4. *HR Analytics & Employee Attrition* (Python, Excel, Power BI)
- **Deep Linking / URL Routing**: Each case study can be directly accessed via URL hash (e.g. `#project-1`, `#project-2`, `#project-3`, `#project-4`), making it easy to share specific projects with recruiters.
- **Zero-Dependency / Zero-Build**: Runs instantly in any web browser without needing `npm install` or local Node build tools, while adhering strictly to clean modular standards.
- **ATS / Recruiter Friendly**: Direct resume download CTA, explicit technical competencies list, non-exaggerated timeline, and structured Schema.org JSON-LD metadata for search engine indexing.
- **Custom 404 Page**: Themed "Dataset Not Found in Query" error handler.

---

## 🚀 How to Run Locally

### Option 1: Python Built-in Server (Recommended)
Open your terminal in this directory and run:
```bash
python3 -m http.server 3000
```
Then visit: [http://localhost:3000](http://localhost:3000)

### Option 2: Direct File Open
Simply double-click `index.html` or open it with Google Chrome, Safari, Firefox, or Microsoft Edge.

---

## 📁 Directory Structure

```text
prince-kumar-portfolio/
├── 404.html                  # Custom Data Analyst themed 404 error page
├── index.html                # Semantic HTML5 single-page application
├── README.md                 # Project documentation & customization guide
└── assets/
    ├── css/
    │   └── style.css         # Complete CSS design system with light/dark tokens
    ├── img/
    │   └── favicon.svg       # Custom "PK" monogram favicon with data node accent
    └── js/
        ├── app.js            # Navigation, theme toggle, project filter & modal logic
        └── projects-data.js  # Centralized project data, SQL queries, and case study text
```

---

## ⚙️ Customization Guide (Replacing Placeholders)

All placeholder variables are clearly marked. When you are ready to update them with your personal URLs:

### 1. Contact Info & Links (in `index.html`):
- `[YOUR_EMAIL]` ➔ Your actual email address (e.g., `prince.kumar@example.com`)
- `[YOUR_LINKEDIN_URL]` ➔ Your LinkedIn profile link (e.g., `https://linkedin.com/in/princekumar`)
- `[YOUR_GITHUB_URL]` ➔ Your GitHub profile link (e.g., `https://github.com/princekumar`)
- `[RESUME_URL]` ➔ Link to your Google Drive or hosted PDF resume
- `[COMPANY NAME]` ➔ The company where you completed your 6-month internship
- `[INSTITUTE NAME]` ➔ The institute where you completed your Diploma in Data Analytics
- `[COMPLETION YEAR]` ➔ Year of diploma completion

### 2. Project URLs (in `assets/js/projects-data.js`):
- `[GITHUB_PROJECT_1_URL]` to `[GITHUB_PROJECT_4_URL]`
- `[POWERBI_DASHBOARD_1_URL]` to `[POWERBI_DASHBOARD_4_URL]`

### 3. Adding More Projects:
Simply append a new object to the `PROJECTS_DATA` array in `assets/js/projects-data.js` following the existing schema. The website will automatically render the card, chart preview, and interactive modal dialog!

---

## 🌐 Free 1-Click Deployment

### Deploy to GitHub Pages (Free)
1. Initialize a git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/prince-kumar-portfolio.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**
   - Select `main` branch and `/ (root)` folder
   - Click **Save**. Your site will be live at `https://YOUR_USERNAME.github.io/prince-kumar-portfolio/`!

### Deploy to Vercel or Netlify
Drag and drop this folder directly onto [Netlify Drop](https://app.netlify.com/drop) or import the GitHub repository into [Vercel](https://vercel.com).
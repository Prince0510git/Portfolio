/**
 * PRINCE KUMAR - DATA ANALYST PORTFOLIO
 * Main Application Logic & Interactive Controllers
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initHeroVisuals();
  initProjects();
  initCaseStudyModal();
  initContactForm();
  initScrollAnimations();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('pk_theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('pk_theme', nextTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  if (theme === 'light') {
    themeToggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
  } else {
    themeToggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
  }
}

/* ==========================================================================
   2. STICKY NAVIGATION & ACTIVE SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll listener for sticky header styling & scroll spy
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll spy
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile navigation drawer toggle
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileMenuBtn.innerHTML = isOpen ? `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ` : `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    });

    // Close mobile nav when clicking any nav item
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   3. HERO DATA VISUALS & ANIMATED METRICS
   ========================================================================== */
function initHeroVisuals() {
  const sparklineEl = document.getElementById('hero-sparkline');
  if (sparklineEl) {
    // Generate clean SVG sparkline
    const points = [25, 38, 30, 45, 42, 60, 55, 78, 70, 95];
    const width = 320;
    const height = 65;
    const step = width / (points.length - 1);
    
    let pathD = '';
    points.forEach((val, idx) => {
      const x = idx * step;
      const y = height - (val / 100) * height;
      pathD += (idx === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });

    const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

    sparklineEl.innerHTML = `
      <defs>
        <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <path d="${areaD}" fill="url(#sparklineGrad)" />
      <path d="${pathD}" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="${(points.length - 1) * step}" cy="${height - (points[points.length - 1] / 100) * height}" r="4" fill="#38bdf8" />
    `;
  }
}

/* ==========================================================================
   4. PROJECTS RENDERING & FILTERING
   ========================================================================== */
let activeFilter = 'All';

function initProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (!projectsGrid) return;

  renderProjects(PROJECTS_DATA, activeFilter);

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'All';
      renderProjects(PROJECTS_DATA, activeFilter);
    });
  });
}

function renderProjects(projects, filter) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = filter === 'All' 
    ? projects 
    : projects.filter(p => p.categories.includes(filter));

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-lg);">
        <p style="font-size: 1.1rem; color: var(--text-muted);">No projects found for filter: "${filter}".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(project => {
    // Generate mini chart SVG for preview
    const previewChartSvg = generateCardPreviewSvg(project);

    const toolsBadges = project.tools.map(t => `<span class="tool-tag">${t}</span>`).join('');
    
    const kpiPills = project.previewKpis.map(k => `
      <div class="kpi-mini-card" style="background: var(--bg-card); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); text-align: center;">
        <span style="display: block; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">${k.label}</span>
        <strong style="font-size: 1.05rem; color: var(--text-primary); font-weight: 700;">${k.value}</strong>
      </div>
    `).join('');

    return `
      <article class="project-card" data-id="${project.id}">
        <!-- Visual Dashboard Preview Area -->
        <div class="project-preview-wrap">
          <div class="preview-top-bar">
            <span class="preview-tag">${project.primaryCategory} Dashboard</span>
            <div style="display: flex; gap: 4px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981;"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #38bdf8;"></span>
            </div>
          </div>
          
          <!-- Interactive Metric Ribbon -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 0.75rem;">
            ${kpiPills}
          </div>

          <!-- Mini Chart Visual Mockup -->
          <div class="preview-chart-canvas">
            ${previewChartSvg}
          </div>
        </div>

        <!-- Project Content Body -->
        <div class="project-card-body">
          <div class="project-tools-row">
            ${toolsBadges}
          </div>

          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.shortDescription}</p>

          <div class="project-section-box">
            <strong>Business Problem</strong>
            <p>${project.businessProblemSummary}</p>
          </div>

          <div class="project-section-box">
            <strong>Key Analytical Approach</strong>
            <p>${project.keyAnalysisSummary}</p>
          </div>

          <div class="project-section-box" style="border-left: 3px solid var(--accent-emerald);">
            <strong style="color: var(--accent-emerald);">Key Actionable Finding</strong>
            <p>${project.keyInsightsSummary}</p>
          </div>

          <div class="project-card-footer">
            <button class="btn btn-primary btn-sm view-case-study-btn" data-id="${project.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              View Project
            </button>

            <div class="project-btn-group">
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" title="View Source Code Repository">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub
              </a>

              <a href="${project.dashboardUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="Open Interactive Dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach modal triggers
  grid.querySelectorAll('.view-case-study-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-id');
      openCaseStudy(pid);
    });
  });
}

function generateCardPreviewSvg(project) {
  const chartType = project.chartType;
  const labels = project.chartData.labels;
  const series = project.chartData.series;

  if (chartType === 'revenue-trend') {
    // Dual line/area trend
    const s1 = series[0].values; // Revenue
    const s2 = series[1].values; // Profit
    const maxVal = 220;
    const width = 480;
    const height = 110;
    const step = width / (s1.length - 1);

    let p1 = '';
    let p2 = '';
    s1.forEach((v, i) => {
      const x = i * step;
      const y = height - (v / maxVal) * (height - 10);
      p1 += (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });

    s2.forEach((v, i) => {
      const x = i * step;
      const y = height - (v / maxVal) * (height - 10);
      p2 += (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });

    return `
      <svg viewBox="0 0 ${width} ${height}" style="width:100%; height:100%;">
        <line x1="0" y1="${height - 2}" x2="${width}" y2="${height - 2}" stroke="var(--border-strong)" stroke-width="1" stroke-dasharray="4 4" />
        <path d="${p1}" fill="none" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round" />
        <path d="${p2}" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3" />
        <circle cx="${(s1.length - 1) * step}" cy="${height - (s1[s1.length - 1] / maxVal) * (height - 10)}" r="4" fill="#06b6d4" />
      </svg>
    `;
  } else if (chartType === 'category-breakdown' || chartType === 'churn-distribution' || chartType === 'dept-attrition') {
    // Bar chart
    const s1 = series[0].values;
    const s2 = series[1] ? series[1].values : [];
    const maxVal = Math.max(...s1, ...(s2.length ? s2 : [0])) * 1.15;
    const width = 480;
    const height = 110;
    const count = labels.length;
    const barWidth = 24;
    const groupStep = width / count;

    let bars = '';
    labels.forEach((lbl, idx) => {
      const cx = idx * groupStep + groupStep / 2;
      const h1 = (s1[idx] / maxVal) * (height - 25);
      const y1 = height - 15 - h1;

      bars += `
        <rect x="${cx - (s2.length ? barWidth : barWidth / 2)}" y="${y1}" width="${barWidth * 0.85}" height="${h1}" rx="3" fill="#38bdf8" fill-opacity="0.85" />
      `;

      if (s2.length) {
        const h2 = (s2[idx] / maxVal) * (height - 25);
        const y2 = height - 15 - h2;
        bars += `
          <rect x="${cx}" y="${y2}" width="${barWidth * 0.85}" height="${h2}" rx="3" fill="#f43f5e" fill-opacity="0.8" />
        `;
      }

      bars += `
        <text x="${cx}" y="${height - 2}" font-size="9" fill="var(--text-muted)" text-anchor="middle">${lbl}</text>
      `;
    });

    return `
      <svg viewBox="0 0 ${width} ${height}" style="width:100%; height:100%;">
        ${bars}
      </svg>
    `;
  }

  return '';
}

/* ==========================================================================
   5. PROJECT CASE STUDY MODAL & ROUTING
   ========================================================================== */
function initCaseStudyModal() {
  const modalBackdrop = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modalBackdrop) {
    closeBtn.addEventListener('click', closeCaseStudy);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeCaseStudy();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCaseStudy();
    }
  });

  // Check URL hash on initial page load (e.g. #project-1)
  const hash = window.location.hash.replace('#', '');
  if (hash && PROJECTS_DATA.some(p => p.id === hash)) {
    openCaseStudy(hash);
  }
}

function openCaseStudy(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('case-study-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalFooter = document.getElementById('modal-footer');

  if (!modal || !modalBody) return;

  const cs = project.caseStudy;

  modalTitle.textContent = project.title;

  // KPI metric cards
  const kpiGrid = project.previewKpis.map(k => `
    <div class="kpi-card">
      <div class="kpi-num">${k.value}</div>
      <div class="kpi-lbl">${k.label}</div>
      <span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 600;">${k.change}</span>
    </div>
  `).join('');

  // Data cleaning items
  const cleaningList = cs.dataCleaningProcess.map(item => `
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${item}</span>
    </li>
  `).join('');

  // EDA Findings items
  const edaList = cs.edaFindings.map(item => `
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${item}</span>
    </li>
  `).join('');

  // SQL queries syntax display
  const sqlBlocks = cs.sqlQueries.map(sq => `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.75rem;">
      <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-highlight);">${sq.title}</span>
      <pre class="code-box"><code>${escapeHtml(sq.query)}</code></pre>
    </div>
  `).join('');

  // Key findings items
  const findingsList = cs.keyFindings.map(item => `
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${item}</span>
    </li>
  `).join('');

  // Recommendations items
  const recsList = cs.recommendations.map(item => `
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
      <span>${item}</span>
    </li>
  `).join('');

  modalBody.innerHTML = `
    <!-- Top Summary & Tools -->
    <div class="case-study-hero">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
        <div style="display: flex; gap: 0.5rem;">
          ${project.tools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
        </div>
        <span class="badge badge-status">Verified Case Study</span>
      </div>
      <p style="font-size: 1rem; color: var(--text-primary); line-height: 1.6;">${cs.overview}</p>
    </div>

    <!-- Core Project KPIs -->
    <div class="case-study-section">
      <h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
        Key Project Metrics
      </h4>
      <div class="case-study-kpis">
        ${kpiGrid}
      </div>
    </div>

    <!-- Business Problem & Dataset -->
    <div class="case-study-section">
      <h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        Business Problem & Context
      </h4>
      <p style="color: var(--text-secondary); line-height: 1.6;">${cs.businessProblem}</p>
      
      <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-top: 0.5rem;">
        <strong style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Dataset Description</strong>
        <p style="font-size: 0.92rem; color: var(--text-primary); margin: 0;">${cs.datasetDescription}</p>
      </div>
    </div>

    <!-- Data Cleaning Process -->
    <div class="case-study-section">
      <h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        Data Cleaning & Preparation Process
      </h4>
      <ul class="case-study-list">
        ${cleaningList}
      </ul>
    </div>

    <!-- Exploratory Data Analysis -->
    <div class="case-study-section">
      <h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        Exploratory Data Analysis (EDA) Highlights
      </h4>
      <ul class="case-study-list">
        ${edaList}
      </ul>
    </div>

    <!-- SQL Analysis Section -->
    <div class="case-study-section">
      <h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        SQL Queries & Data Transformation
      </h4>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.25rem;">
        Key SQL scripts executed to aggregate data, calculate windowed metrics, and structure analytical tables:
      </p>
      ${sqlBlocks}
    </div>

    <!-- Key Findings -->
    <div class="case-study-section">
      <h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        Key Findings & Strategic Insights
      </h4>
      <ul class="case-study-list">
        ${findingsList}
      </ul>
    </div>

    <!-- Business Recommendations -->
    <div class="case-study-section">
      <h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 14 14"></polyline>
        </svg>
        Actionable Business Recommendations
      </h4>
      <ul class="case-study-list">
        ${recsList}
      </ul>
    </div>
  `;

  // Update Footer buttons with links
  if (modalFooter) {
    modalFooter.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 0.85rem; color: var(--text-muted);">Repository & Dashboard:</span>
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
          GitHub Repository
        </a>
        <a href="${project.dashboardUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          Live Dashboard
        </a>
      </div>
      <button class="btn btn-primary btn-sm" id="modal-done-btn">Done</button>
    `;

    document.getElementById('modal-done-btn')?.addEventListener('click', closeCaseStudy);
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  window.history.pushState(null, '', `#${projectId}`);
}

function closeCaseStudy() {
  const modal = document.getElementById('case-study-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  if (window.location.hash) {
    window.history.pushState(null, '', window.location.pathname + window.location.search);
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* ==========================================================================
   6. CONTACT FORM VALIDATION & TOAST
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const feedback = document.getElementById('form-feedback');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Client side validation
    if (!name || !email || !message) {
      showFormFeedback('Please fill in all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormFeedback('Please provide a valid email address.', 'error');
      return;
    }

    // Success response
    showFormFeedback('Message received! In this portfolio demo mode, inquiries are not dispatched to an SMTP server. Please reach Prince directly at [YOUR_EMAIL].', 'success');
    showToast('Thank you! For urgent queries, contact Prince via [YOUR_EMAIL].');
    form.reset();
  });
}

function showFormFeedback(msg, type) {
  const feedback = document.getElementById('form-feedback');
  if (!feedback) return;
  feedback.textContent = msg;
  feedback.className = `form-feedback ${type}`;
}

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   7. SCROLL REVEAL / INTERSECTION OBSERVER
   ========================================================================== */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skill-category-card, .pillar-card, .timeline-card, .edu-card, .cert-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
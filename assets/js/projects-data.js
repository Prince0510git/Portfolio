/**
 * PRINCE KUMAR - DATA ANALYST PORTFOLIO
 * Projects Data & Case Study Models
 * 
 * Note for Prince: You can update the placeholder URLs and details below anytime!
 */

const PROJECTS_DATA = [
  {
    id: 'project-1',
    title: 'E-Commerce Sales & Customer Analysis',
    shortDescription: 'Comprehensive end-to-end analysis of e-commerce transactional data to uncover revenue trends, product category profitability, and customer purchasing patterns.',
    tools: ['SQL', 'Excel', 'Power BI'],
    primaryCategory: 'Power BI',
    categories: ['SQL', 'Excel', 'Power BI'],
    githubUrl: '[GITHUB_PROJECT_1_URL]',
    dashboardUrl: '[POWERBI_DASHBOARD_1_URL]',
    
    // Preview card metadata
    businessProblemSummary: 'Identify revenue leakages, high-margin product lines, and seasonal sales patterns across geographical territories.',
    keyAnalysisSummary: 'Evaluated 50,000+ transaction records using SQL window functions, RFM customer segmentation, and dynamic Power BI DAX models.',
    keyInsightsSummary: 'Top 15% of repeat customers generated 58% of cumulative revenue; tech accessories yielded highest profit margin (34.2%).',
    
    previewKpis: [
      { label: 'Total Revenue', value: '$1.42M', change: '+14.2% YoY' },
      { label: 'Total Orders', value: '28,450', change: '+8.6% MoM' },
      { label: 'Avg Order Value', value: '$49.91', change: '+5.1%' },
      { label: 'Gross Margin', value: '29.4%', change: '+2.3 pts' }
    ],

    chartType: 'revenue-trend',
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        { name: 'Revenue ($K)', values: [85, 92, 108, 98, 115, 122, 130, 128, 140, 155, 185, 210] },
        { name: 'Profit ($K)', values: [24, 27, 32, 28, 35, 38, 40, 39, 44, 49, 58, 68] }
      ]
    },

    // Dedicated Case Study Full Details
    caseStudy: {
      overview: 'This project examines multi-regional e-commerce transaction data spanning a full fiscal year. The goal was to provide sales leadership with granular visibility into monthly sales momentum, product category profitability, and customer segmentation to optimize discount strategies.',
      businessProblem: 'The business experienced top-line revenue growth, but net margins were compressing due to uncontrolled promotional discounts in specific regions. Management required clear visibility into which product categories, shipping regions, and customer cohorts were truly driving profitable growth versus those eroding margins.',
      datasetDescription: 'Multi-table relational schema comprising Orders (Order ID, Date, Customer ID, Region, Sales, Profit, Discount), Customers (Demographics, Signup Date), Products (SKU, Category, Sub-Category, Base Unit Cost), and Geography.',
      
      dataCleaningProcess: [
        'Removed duplicate order line entries using SQL ROW_NUMBER() partitioned by Order_ID and SKU.',
        'Handled 420 null values in the Shipping_Postal_Code column via geospatial lookup imputation.',
        'Standardized date formats from heterogeneous regional strings to ISO 8601 (YYYY-MM-DD) for accurate time-intelligence calculations.',
        'Audited negative profit records and identified pricing misconfigurations on legacy bundled items.',
        'Validated data types across numerical fields (Sales, Quantity, Discount rate, Unit Price).'
      ],

      edaFindings: [
        'Q4 accounted for 38% of total annual sales, driven heavily by holiday promotional events.',
        'Technology and Home Office categories yielded the highest average ticket size ($184.20 vs $52.10 overall).',
        'Discounts exceeding 20% demonstrated diminishing returns: order volume increased by only 6%, while gross profit declined by 28%.'
      ],

      sqlQueries: [
        {
          title: 'Monthly Revenue, Profit Margin, and MoM Growth Rate',
          query: `-- Monthly revenue and profit growth calculation
WITH MonthlySales AS (
  SELECT 
    DATE_TRUNC('month', order_date) AS sales_month,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(sales_amount) AS total_revenue,
    SUM(profit_amount) AS total_profit,
    ROUND((SUM(profit_amount) / NULLIF(SUM(sales_amount), 0)) * 100, 2) AS profit_margin_pct
  FROM ecommerce_orders
  WHERE order_status = 'Completed'
  GROUP BY 1
)
SELECT 
  sales_month,
  total_revenue,
  total_profit,
  profit_margin_pct,
  LAG(total_revenue, 1) OVER (ORDER BY sales_month) AS prev_month_revenue,
  ROUND(((total_revenue - LAG(total_revenue, 1) OVER (ORDER BY sales_month)) 
    / NULLIF(LAG(total_revenue, 1) OVER (ORDER BY sales_month), 0)) * 100, 2) AS mom_revenue_growth_pct
FROM MonthlySales
ORDER BY sales_month ASC;`
        },
        {
          title: 'Customer Segmentation by RFM Score & Monetary Contribution',
          query: `-- Customer RFM Segmentation
WITH CustomerRFM AS (
  SELECT 
    customer_id,
    MAX(order_date) AS last_purchase_date,
    COUNT(order_id) AS frequency,
    SUM(sales_amount) AS total_spend,
    NTILE(4) OVER (ORDER BY MAX(order_date)) AS r_score,
    NTILE(4) OVER (ORDER BY COUNT(order_id)) AS f_score,
    NTILE(4) OVER (ORDER BY SUM(sales_amount)) AS m_score
  FROM ecommerce_orders
  GROUP BY customer_id
)
SELECT 
  customer_id,
  total_spend,
  frequency,
  r_score, f_score, m_score,
  CASE 
    WHEN r_score >= 3 AND f_score >= 3 AND m_score >= 3 THEN 'Champions / High Value'
    WHEN r_score >= 2 AND f_score >= 2 THEN 'Steady Loyalists'
    WHEN r_score = 1 AND f_score >= 3 THEN 'At Risk Repeat Buyers'
    ELSE 'Low Frequency / Dormant'
  END AS customer_segment
FROM CustomerRFM
ORDER BY total_spend DESC;`
        }
      ],

      keyFindings: [
        'Top 10 SKUs contributed 31% of total enterprise profitability despite representing only 4.5% of the total product catalog.',
        'Southern region showed strong order volumes but experienced lower margins due to elevated third-party freight costs.',
        'Repeat buyers had an Average Order Value (AOV) 24% higher than first-time acquisition orders.'
      ],

      recommendations: [
        'Implement a hard cap of 15% on standard promotional discounts for low-margin sub-categories.',
        'Develop a targeted re-engagement campaign for the "At Risk Repeat Buyers" segment prior to typical 90-day churn window.',
        'Renegotiate regional logistics contracts in Southern distribution nodes to protect gross margins.'
      ]
    }
  },

  {
    id: 'project-2',
    title: 'Retail Sales Performance Dashboard',
    shortDescription: 'Interactive, executive-grade Power BI & Excel dashboard providing real-time KPI tracking, regional sales heatmaps, and product performance analysis.',
    tools: ['Excel', 'Power BI', 'SQL'],
    primaryCategory: 'Excel',
    categories: ['Excel', 'Power BI', 'SQL'],
    githubUrl: '[GITHUB_PROJECT_2_URL]',
    dashboardUrl: '[POWERBI_DASHBOARD_2_URL]',

    businessProblemSummary: 'Retail store managers lacked a consolidated, centralized reporting system to monitor daily sales pacing, store targets, and category-level inventory velocity.',
    keyAnalysisSummary: 'Modeled star-schema data structure connecting sales transactions, store hierarchies, and target tables using DAX measures and Power Query M ETL.',
    keyInsightsSummary: 'Identified 3 lagging retail stores operating at 18% below planned quota due to overstocking non-moving home goods.',

    previewKpis: [
      { label: 'Store Sales', value: '$890.5K', change: '96.8% of Target' },
      { label: 'Transactions', value: '14,210', change: '+6.2% vs Plan' },
      { label: 'Units Per Transaction', value: '2.85', change: '+0.4 UPT' },
      { label: 'Return Rate', value: '2.1%', change: '-0.5% YoY' }
    ],

    chartType: 'category-breakdown',
    chartData: {
      labels: ['Apparel', 'Electronics', 'Home & Living', 'Beauty', 'Sports & Outdoor'],
      series: [
        { name: 'Actual ($K)', values: [280, 240, 160, 120, 90.5] },
        { name: 'Target ($K)', values: [270, 250, 190, 110, 100] }
      ]
    },

    caseStudy: {
      overview: 'A robust retail intelligence reporting suite built to bridge the gap between store operations and regional executive leadership. Features drill-through capabilities from national totals down to individual store SKUs.',
      businessProblem: 'Regional directors relied on disjointed, static weekly spreadsheets that delayed inventory re-balancing and markdown decisions. Store supervisors needed a single source of truth updated daily to take proactive measures before month-end close.',
      datasetDescription: 'Point-of-Sale (POS) relational data covering 24 physical store locations across 4 geographical regions, containing 120,000+ line items with store IDs, product classifications, and operational budgets.',

      dataCleaningProcess: [
        'Consolidated 12 monthly CSV exports using Power Query folder-connector with automated schema validation.',
        'Extracted and cleansed product SKU prefixes to establish clean product parent-child hierarchies.',
        'Identified and corrected currency inconsistencies between regional store reports.',
        'Audited POS return flags and separated gross transactions from net revenue calculations.',
        'Constructed a unified, contiguous Date Dimension table with custom 4-4-5 retail calendar weeks.'
      ],

      edaFindings: [
        'Foot traffic peaked on Thursday evenings and Saturday afternoons, representing 52% of weekly sales.',
        'Apparel division achieved 103.7% of budget target, whereas Home Goods stalled at 84.2%.',
        'Top 5 store locations generated 44% of cumulative profit across all 24 branches.'
      ],

      sqlQueries: [
        {
          title: 'Store Performance vs Budget & Variance Ranking',
          query: `-- Store Target Attainment & Regional Rank
SELECT 
  s.store_id,
  s.store_name,
  s.region,
  SUM(t.sales_net) AS actual_sales,
  b.monthly_target,
  ROUND(SUM(t.sales_net) - b.monthly_target, 2) AS variance_amount,
  ROUND((SUM(t.sales_net) / NULLIF(b.monthly_target, 0)) * 100, 2) AS target_attainment_pct,
  DENSE_RANK() OVER (PARTITION BY s.region ORDER BY (SUM(t.sales_net) / NULLIF(b.monthly_target, 0)) DESC) AS regional_rank
FROM store_dim s
JOIN retail_transactions t ON s.store_id = t.store_id
JOIN store_budgets b ON s.store_id = b.store_id AND DATE_TRUNC('month', t.transaction_date) = b.target_month
GROUP BY s.store_id, s.store_name, s.region, b.monthly_target
ORDER BY target_attainment_pct DESC;`
        }
      ],

      keyFindings: [
        'Inventory turnover in Home Goods was 4.2 weeks slower than benchmark, tying up operating cash flow.',
        'Stores that implemented cross-merchandising displays exhibited a 14% higher Units Per Transaction (UPT).',
        'Return rate on clearance apparel was under 2.5%, confirming discount strategy effectively liquidated season-end stock.'
      ],

      recommendations: [
        'Shift excess Home Goods inventory from underperforming satellite branches to high-velocity metropolitan flagship stores.',
        'Institute standardized weekly display refreshes aligned with high-traffic Thursday/Saturday peak intervals.',
        'Automate POS data refresh at 06:00 daily so morning standup meetings rely on real-time figures.'
      ]
    }
  },

  {
    id: 'project-3',
    title: 'Customer Churn & Retention Analysis',
    shortDescription: 'Exploratory data analysis and predictive churn diagnostic evaluating customer subscription behavior, tenure patterns, and key churn drivers.',
    tools: ['Python', 'Pandas', 'SQL', 'Power BI'],
    primaryCategory: 'Python',
    categories: ['Python', 'Pandas', 'SQL', 'Power BI'],
    githubUrl: '[GITHUB_PROJECT_3_URL]',
    dashboardUrl: '[POWERBI_DASHBOARD_3_URL]',

    businessProblemSummary: 'Subscription service experienced rising attrition rates in early-stage customers without clear diagnosis of whether pricing, contract length, or support tickets were the primary driver.',
    keyAnalysisSummary: 'Applied Python (Pandas/NumPy) for statistical distributions, cohort retention curves, correlation matrices, and customer tenure survival metrics.',
    keyInsightsSummary: 'Customers on month-to-month contracts had a 38.4% churn rate vs 8.2% for annual contracts; customers submitting 3+ support tickets in month 1 churned 3x faster.',

    previewKpis: [
      { label: 'Overall Churn Rate', value: '24.6%', change: '-1.8% vs Q1' },
      { label: 'Avg Customer Tenure', value: '18.4 Mo', change: '+2.1 Mo' },
      { label: 'Monthly Recurring Rev', value: '$215K', change: '+4.5% MoM' },
      { label: 'Retention (12-Mo)', value: '68.2%', change: '+3.4%' }
    ],

    chartType: 'churn-distribution',
    chartData: {
      labels: ['0-3 Mo', '4-6 Mo', '7-12 Mo', '13-24 Mo', '25+ Mo'],
      series: [
        { name: 'Active Customers', values: [320, 290, 480, 610, 850] },
        { name: 'Churned Customers', values: [180, 110, 95, 60, 35] }
      ]
    },

    caseStudy: {
      overview: 'In-depth diagnostic churn case study investigating subscription attrition patterns across 7,000+ accounts. Pinpoints the critical inflection points where customer retention drops and outlines data-backed onboarding interventions.',
      businessProblem: 'Customer Acquisition Cost (CAC) was steadily increasing, making account retention vital for healthy unit economics. Leadership lacked empirical data on whether churn was driven by onboarding friction, pricing tier dissatisfaction, or customer support responsiveness.',
      datasetDescription: 'Telco / SaaS customer subscription dataset containing demographic indicators, service subscriptions (streaming, tech support, online backup), billing methods, monthly charges, total charges, tenure (months), and churn status.',

      dataCleaningProcess: [
        'Converted TotalCharges from string object type to numeric float using pd.to_numeric() with coerce error handling.',
        'Imputed 11 zero-tenure records where TotalCharges was null with 0.0 value.',
        'Encoded categorical binary variables (e.g., SeniorCitizen, Partner, Dependents) into standardized indicators for statistical modeling.',
        'Verified outlier boundaries across MonthlyCharges using IQR (Interquartile Range) method.',
        'Structured customer tenure into segmented cohorts (0-6m, 7-12m, 13-24m, 25m+) for intuitive stakeholder presentation.'
      ],

      edaFindings: [
        'Tenure demonstrated an exponential inverse relationship with churn: 52% of all annual churn occurred within the first 6 months.',
        'Paperless billing combined with electronic check payments showed an anomalously elevated churn rate (41.8%).',
        'Customers with bundled technical support packages displayed an attrition rate of just 15.1% vs 37.4% for those without support.'
      ],

      sqlQueries: [
        {
          title: 'Cohort Churn Analysis by Contract Type & Tenure Bracket',
          query: `-- Cohort Churn Rate by Contract and Tenure Bracket
SELECT 
  contract_type,
  CASE 
    WHEN tenure_months <= 6 THEN '01. 0 - 6 Months'
    WHEN tenure_months <= 12 THEN '02. 7 - 12 Months'
    WHEN tenure_months <= 24 THEN '03. 13 - 24 Months'
    ELSE '04. 25+ Months'
  END AS tenure_cohort,
  COUNT(customer_id) AS total_customers,
  SUM(CASE WHEN churn_flag = 1 THEN 1 ELSE 0 END) AS churned_count,
  ROUND((SUM(CASE WHEN churn_flag = 1 THEN 1 ELSE 0 END)::DECIMAL / COUNT(customer_id)) * 100, 2) AS churn_rate_pct,
  ROUND(AVG(monthly_charges), 2) AS avg_monthly_bill
FROM customer_subscriptions
GROUP BY 1, 2
ORDER BY contract_type, tenure_cohort;`
        }
      ],

      keyFindings: [
        'Month-to-month customers represent 78% of all churn events despite making up only 55% of the total customer base.',
        'First 90 days represent the make-or-break onboarding phase where engagement touchpoints have the highest retention ROI.',
        'Fiber optic users experienced higher churn when tech support was omitted, pointing to initial router configuration friction.'
      ],

      recommendations: [
        'Introduce an incentivized 1-year contract transition discount ($5 off/mo) at the 3-month mark for month-to-month subscribers.',
        'Trigger proactive customer success check-ins for accounts submitting more than 1 ticket within their initial 30 days.',
        'Bundle complimentary onboarding tech support into the fiber optic plan to reduce first-month setup dissatisfaction.'
      ]
    }
  },

  {
    id: 'project-4',
    title: 'HR Analytics & Employee Attrition',
    shortDescription: 'Organizational data analysis exploring workforce demographics, attrition risk indicators, department compensation parity, and employee satisfaction trends.',
    tools: ['Python', 'Excel', 'Power BI'],
    primaryCategory: 'Python',
    categories: ['Python', 'Excel', 'Power BI'],
    githubUrl: '[GITHUB_PROJECT_4_URL]',
    dashboardUrl: '[POWERBI_DASHBOARD_4_URL]',

    businessProblemSummary: 'People Operations team observed higher voluntary turnover in key technical and sales roles, driving up talent replacement and onboarding costs.',
    keyAnalysisSummary: 'Analyzed internal HR census records evaluating job satisfaction ratings, promotion timelines, commute distance, and departmental compensation ratios.',
    keyInsightsSummary: 'Sales Executives and Research Scientists experiencing 3+ years without promotion exhibited 28.5% attrition; frequent business travel increased turnover by 12%.',

    previewKpis: [
      { label: 'Attrition Rate', value: '16.1%', change: 'Industry Avg: 15%' },
      { label: 'Avg Monthly Income', value: '$6,503', change: 'Median: $4,919' },
      { label: 'Avg Years at Company', value: '7.0 Yrs', change: '+0.5 Yrs' },
      { label: 'Avg Job Satisfaction', value: '2.73 / 4', change: 'Survey Scale' }
    ],

    chartType: 'dept-attrition',
    chartData: {
      labels: ['Sales', 'R&D', 'HR', 'Finance', 'Customer Support'],
      series: [
        { name: 'Active Staff', values: [350, 820, 50, 110, 140] },
        { name: 'Attrition Count', values: [92, 115, 12, 14, 21] }
      ]
    },

    caseStudy: {
      overview: 'Comprehensive workforce analytics study analyzing the factors influencing voluntary turnover across a 1,470-employee organization. Provides executive leadership with actionable HR policies to enhance retention.',
      businessProblem: 'Rising employee turnover resulted in estimated annual re-hiring costs exceeding $450,000. People Operations needed data-driven evidence to pinpoint whether compensation disparities, career stagnation, or work-life balance issues were the primary catalysts.',
      datasetDescription: 'Standardized HR Census dataset comprising 35 variables across 1,470 employees: Age, Department, JobRole, EducationField, MonthlyIncome, OverTime, JobSatisfaction, WorkLifeBalance, YearsSinceLastPromotion, and Attrition.',

      dataCleaningProcess: [
        'Removed non-informative constant columns (Over18, EmployeeCount, StandardHours).',
        'Validated salary bands against department job tiers to ensure clean wage categorization.',
        'Recoded ordinal survey metrics (1=Low, 2=Medium, 3=High, 4=Very High) into clear analytical dimensions.',
        'Evaluated correlation between overtime hours and employee satisfaction scores.',
        'Checked for missing data across exit interview reason fields.'
      ],

      edaFindings: [
        'Employees working regular OverTime displayed an attrition rate of 30.5% compared to only 10.4% for non-overtime staff.',
        'Single employees had a significantly higher turnover propensity (25.5%) compared to married peers (12.4%).',
        'Sales Representatives had the highest departmental attrition rate (39.8%), closely linked to compensation volatility.'
      ],

      sqlQueries: [
        {
          title: 'Department Attrition, Overtime Impact, and Wage Benchmarking',
          query: `-- Departmental Attrition and Overtime Analysis
SELECT 
  department,
  job_role,
  COUNT(employee_id) AS total_employees,
  SUM(CASE WHEN attrition = 'Yes' THEN 1 ELSE 0 END) AS attrition_count,
  ROUND((SUM(CASE WHEN attrition = 'Yes' THEN 1 ELSE 0 END)::DECIMAL / COUNT(employee_id)) * 100, 2) AS attrition_rate_pct,
  ROUND(AVG(monthly_income), 2) AS avg_monthly_income,
  ROUND(AVG(CASE WHEN overtime = 'Yes' THEN 1.0 ELSE 0.0 END) * 100, 1) AS overtime_pct,
  ROUND(AVG(years_since_last_promotion), 1) AS avg_yrs_since_promo
FROM hr_employee_records
GROUP BY department, job_role
HAVING COUNT(employee_id) >= 15
ORDER BY attrition_rate_pct DESC;`
        }
      ],

      keyFindings: [
        'Employees with over 4 years since their last promotion were 2.2x more likely to voluntarily leave.',
        'Low work-life balance scores (rating 1 of 4) correlated directly with 31% attrition regardless of compensation tier.',
        'Competitive base salaries alone did not retain high performers without clear upward promotion paths.'
      ],

      recommendations: [
        'Establish a formal biannual promotion and milestone review cadence for high-turnover roles like Sales Representatives.',
        'Audit and redistribute workload allocations to curtail systemic overtime in high-risk departments.',
        'Provide flexible hybrid scheduling for roles requiring substantial off-hours project commitments.'
      ]
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS_DATA };
}
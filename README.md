# ☁️ Cloud Architecture Academy

> **Master AWS, Microsoft Azure & Google Cloud Platform (GCP) Cloud Architecture.**  
> Learn services, design real-world resilient architectures, compare cloud trade-offs, and defend your designs in senior cloud architect interviews.

---

## 🌟 Key Features

1. **Independent 3-Cloud Learning Tracks**:
   - **AWS Architect Track**: VPCs, IAM, EC2, EKS, Lambda, Aurora, S3, Auto Scaling, Security.
   - **Azure Architect Track**: VNets, Entra ID, Managed Identities, AKS, Azure SQL MI, Blob, Key Vault.
   - **GCP Architect Track**: Global VPC, GKE Autopilot, Cloud Run, Cloud Spanner, Global Anycast LB.
2. **16-Point Educational Standard**:
   - Every lesson includes What, Why, Simple Explanation, Interactive Diagrams, Real-world examples, When to Use / When NOT to Use, Pros & Cons, Multi-Cloud Equivalents, Common Mistakes, Hands-on CLI/Terraform sandbox, Scenario Challenges, and Model Interview Q&As.
3. **Interactive Architecture Designer (React Flow Canvas)**:
   - Drag and drop cloud components onto a browser-based canvas.
   - Connect edges, configure Multi-AZ, Encryption, and Private Subnets.
   - **Automated Educational Architecture Reviewer**: Calculates Availability, Security, Scalability, Networking, DR, and Cost scores (0–100), detects Single Points of Failure (SPOFs), and gives actionable remediation tips.
   - Export diagrams as PNG images and save locally in the browser.
4. **Interactive Cloud Decision Engine**:
   - *"Which Cloud Should I Choose?"* Multi-criteria evaluation of workload, team skills, global latency, and licensing to generate unbiased recommendations and trade-off analyses.
5. **Multi-Cloud Comparison Matrix & "I Know AWS → Teach Me Azure / GCP"**:
   - Side-by-side matrices for Compute, Kubernetes, Object Storage, Relational DBs, Serverless, and IAM.
   - Direct mental model translation bridge for engineers transitioning between cloud providers.
6. **Architecture Interview Simulator & 50+ Question Bank**:
   - Defend high-level and low-level architectural decisions across multiple interview rounds with instant feedback.
7. **100% Static & Browser-Native (Zero Backend Required)**:
   - Client-side execution, `localStorage` progress persistence, and subpath-resilient `HashRouter` navigation.

---

## 🚀 1. Local Development Instructions

### Prerequisites
- **Node.js**: v18.0+ or v20.0+ installed
- **npm** or **yarn** / **pnpm**

### Steps
```bash
# 1. Clone the repository or navigate to project directory
cd clouds

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser at `http://localhost:3000` or the port displayed in your terminal.

---

## 📦 2. Production Build Instructions

To compile the application into pure, static HTML, CSS, and JavaScript files:

```bash
npm run build
```

The optimized static assets will be output to the `dist/` directory.

You can preview the production build locally with:
```bash
npm run preview
```

---

## 🐙 3. GitHub Repository Setup Instructions

```bash
# 1. Initialize git repository (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit changes
git commit -m "Initial commit: Cloud Architecture Academy"

# 4. Set the main branch
git branch -M main

# 5. Link to your remote GitHub repository
git remote add origin https://github.com/purnareddy9/multi-cloud-aws-azure-gcp.git

# 6. Push to GitHub
git push -u origin main
```

---

## 🌐 4. GitHub Pages Setup Instructions

1. Open your repository on GitHub (`https://github.com/purnareddy9/multi-cloud-aws-azure-gcp`).
2. Go to **Settings** (tab at the top).
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** (from the dropdown).
5. That's it! Pushing to `main` will automatically trigger the included workflow.

---

## ⚙️ 5. GitHub Actions Deployment Workflow

The deployment workflow is pre-configured at `.github/workflows/deploy.yml`:

```yaml
name: Deploy Cloud Architecture Academy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static application
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🔗 6. How to Access the Deployed Website

Once the GitHub Actions workflow finishes (usually ~1 minute):

1. Go to the **Actions** tab on your GitHub repository to view the build status.
2. Once complete, your site will be live at:
   ```text
   https://purnareddy9.github.io/multi-cloud-aws-azure-gcp/
   ```
3. Because the app uses relative routing (`base: './'`) and `HashRouter`, all subpaths, refresh actions, and internal links will work cleanly with zero 404 errors.

---

## 📚 Curriculum Structure (Levels 0 – 12)

```text
LEVEL 0  ──► Cloud Fundamentals (IaaS vs PaaS vs SaaS, Shared Responsibility, Regions & AZs)
LEVEL 1  ──► AWS Architect Path (17 Production Modules)
LEVEL 2  ──► Azure Architect Path (17 Enterprise Modules)
LEVEL 3  ──► GCP Architect Path (17 Modern Cloud Modules)
LEVEL 4  ──► Multi-Cloud Service Comparison Matrix (Compute, K8s, Storage, DB, Serverless)
LEVEL 5  ──► Cloud Networking Deep Dive (CIDR, Subnets, Routing, NAT, Peering, Hybrid)
LEVEL 6  ──► Cloud Security & Zero Trust (IAM, Entra ID, KMS, Private Endpoints)
LEVEL 7  ──► Interactive Architecture Designer & Validator Canvas
LEVEL 8  ──► High Availability Patterns (Multi-AZ, Auto Scaling, Redundancy)
LEVEL 9  ──► Disaster Recovery Strategies (RPO, RTO, Pilot Light, Warm Standby, Active/Active)
LEVEL 10 ──► Multi-Cloud Architecture & Interconnectivity (IPSec VPN, OIDC Federation)
LEVEL 11 ──► Real-World Architecture Scenarios & Capstones
LEVEL 12 ──► Senior Cloud Architect Interview Simulator & 50+ Question Bank
```

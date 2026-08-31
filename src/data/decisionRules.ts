import { DecisionEngineQuestion } from '../types';

export const decisionQuestions: DecisionEngineQuestion[] = [
  {
    id: 'workload-type',
    question: '1. What is the primary nature of your workload?',
    description: 'Select the primary architectural core of your application.',
    options: [
      {
        id: 'k8s',
        label: 'Microservices on Managed Kubernetes',
        description: 'Dozens of containerized microservices requiring autoscaling and service mesh.',
        scores: { aws: 7, azure: 7, gcp: 10 },
        rationale: 'GCP created Kubernetes and GKE Autopilot offers the most mature, hands-off managed Kubernetes experience in the industry.'
      },
      {
        id: 'msft-stack',
        label: 'Enterprise Microsoft / .NET & Windows Stack',
        description: 'Legacy and modern .NET apps, Active Directory, Windows Server, and SQL Server.',
        scores: { aws: 4, azure: 10, gcp: 3 },
        rationale: 'Azure offers unmatched synergy, Azure Hybrid Benefit license discounts, and native Entra ID integration.'
      },
      {
        id: 'aiml-bigdata',
        label: 'AI / Machine Learning & Massive Big Data Analytics',
        description: 'LLM fine-tuning, real-time analytics streaming, BigQuery / Vertex AI.',
        scores: { aws: 7, azure: 8, gcp: 10 },
        rationale: 'GCP BigQuery, Vertex AI, and custom TPU infrastructure lead in data analytics and machine learning speed.'
      },
      {
        id: 'serverless-containers',
        label: 'Event-driven Serverless & Container APIs',
        description: 'FastAPI, Express, or Go APIs scaling to zero with fast startup.',
        scores: { aws: 8, azure: 6, gcp: 9 },
        rationale: 'GCP Cloud Run and AWS Lambda offer the industry\'s best serverless experiences with instant elasticity.'
      }
    ]
  },
  {
    id: 'team-ecosystem',
    question: '2. What is your team\'s existing technical expertise?',
    description: 'Existing organizational skillsets drastically impact operational velocity and time to market.',
    options: [
      {
        id: 'team-aws',
        label: 'Deep AWS certifications and Terraform AWS modules',
        description: 'Team already knows IAM, VPCs, CloudFormation, and AWS SDKs.',
        scores: { aws: 10, azure: 3, gcp: 4 },
        rationale: 'Leveraging existing AWS skills minimizes hiring latency, operational mistakes, and certification retraining costs.'
      },
      {
        id: 'team-azure',
        label: 'Windows System Admins, C# Developers, and Microsoft 365 admins',
        description: 'Team manages Active Directory, PowerShell, and Azure DevOps.',
        scores: { aws: 3, azure: 10, gcp: 2 },
        rationale: 'Azure aligns directly with Windows administrators and Microsoft ecosystem workflows.'
      },
      {
        id: 'team-opensource',
        label: 'Linux, Go, Python, Kubernetes, and Cloud-Native CNCF tooling',
        description: 'Team prefers vendor-neutral open-source tools and CLI-driven workflows.',
        scores: { aws: 7, azure: 5, gcp: 9 },
        rationale: 'GCP aligns most closely with standard CNCF open-source patterns and Kubernetes paradigms.'
      }
    ]
  },
  {
    id: 'networking-scope',
    question: '3. What is your geographic footprint and latency requirement?',
    description: 'Do you need instant global traffic routing across multiple continents?',
    options: [
      {
        id: 'global-anycast',
        label: 'Global active-active multi-region with single Anycast IP',
        description: 'Users worldwide need sub-second failover and lowest latency without DNS caching delays.',
        scores: { aws: 7, azure: 7, gcp: 10 },
        rationale: 'GCP\'s Global VPC and Global Anycast Load Balancers route users worldwide on Google\'s private fiber backbone with zero DNS TTL delay.'
      },
      {
        id: 'regional-heavy',
        label: 'Strict regional residency (Single Country / Single Region)',
        description: 'Data must legally remain inside a specific country (e.g. Germany, India, US FedRAMP).',
        scores: { aws: 9, azure: 9, gcp: 8 },
        rationale: 'Both AWS and Azure have the highest density of sovereign, isolated regional government and commercial data centers.'
      }
    ]
  },
  {
    id: 'licensing-cost',
    question: '4. What are your software licensing and contract commitments?',
    description: 'Existing enterprise agreements can dramatically lower total cost of ownership (TCO).',
    options: [
      {
        id: 'lic-ea',
        label: 'Microsoft Enterprise Agreement (EA) with Software Assurance',
        description: 'Company already pays Microsoft millions annually for licenses.',
        scores: { aws: 2, azure: 10, gcp: 2 },
        rationale: 'Azure Hybrid Benefit allows applying existing Windows Server and SQL Server licenses to Azure VMs, cutting compute costs by up to 85%.'
      },
      {
        id: 'lic-committed',
        label: 'Pure Linux / Open Source stack with committed cloud spend',
        description: 'No proprietary licenses; want predictable committed use discounts.',
        scores: { aws: 9, azure: 6, gcp: 9 },
        rationale: 'AWS Compute Savings Plans and GCP Committed Use Discounts provide flexible discounts without vendor lock-in.'
      }
    ]
  }
];

import React from 'react';
import { GeneralTopicPage } from './GeneralTopicPage';

export const SecurityPage: React.FC = () => {
  return (
    <GeneralTopicPage
      levelNumber={6}
      category="Cloud Security & Zero Trust"
      title="Zero-Trust Cloud IAM & Data Protection"
      subtitle="Identity federation, role assumption, key management (KMS / Key Vault), private endpoints, and perimeter WAF security."
      iconType="security"
      diagramAscii={`
┌──────────────────────────────────────────────────────────┐
│                   Zero Trust Cloud Perimeter             │
│                                                          │
│  [ Internet Users ] ──► [ WAF / DDoS Shield ]            │
│                                │                         │
│                                ▼                         │
│                      [ Application Layer ]               │
│                                │ (Managed Identity)      │
│                                ▼                         │
│  [ Private Endpoint ] ──► [ KMS Encrypted Database ]     │
│  (Zero Public IP)          (TLS 1.3 in transit)          │
└──────────────────────────────────────────────────────────┘
      `}
      sections={[
        {
          heading: '1. The Core Tenets of Zero Trust Architecture',
          explanation: 'Zero Trust assumes breach and verifies every transaction explicitly: "Never Trust, Always Verify". Identity becomes the primary security perimeter rather than physical network boundaries.',
          points: [
            'Explicit Verification: Authenticate and authorize based on all available data points (identity, location, device health).',
            'Least Privilege: Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA) roles.',
            'Assume Breach: Minimize blast radius by micro-segmenting networks and encrypting all data in transit (TLS) and at rest (KMS).'
          ],
          comparisonRow: {
            aws: 'AWS IAM Roles, Instance Profiles, KMS Customer Managed Keys (CMK).',
            azure: 'Microsoft Entra ID, Managed Identities, Azure Key Vault & HSM.',
            gcp: 'Cloud IAM Service Accounts, Workload Identity, Cloud KMS & Secret Manager.'
          }
        },
        {
          heading: '2. Private Endpoints & Service Endpoints',
          explanation: 'Enterprises must access PaaS services (S3, Azure SQL, BigQuery) without traffic ever touching the public internet.',
          points: [
            'Private Endpoints inject an RFC1918 private IP directly into your VPC/VNet subnet.',
            'Eliminates data exfiltration risk: instances can only access your specific approved storage account, not public external accounts.',
            'Mandatory for SOC2, HIPAA, and PCI-DSS compliance.'
          ],
          comparisonRow: {
            aws: 'AWS PrivateLink & Interface VPC Endpoints.',
            azure: 'Azure Private Link & Private Endpoints.',
            gcp: 'GCP Private Service Connect (PSC).'
          }
        }
      ]}
      interviewQuestion={{
        question: 'How do you prevent hardcoded credentials from ever being committed to Git or embedded in containers?',
        answer: 'Eliminate permanent static credentials using cloud-native Identity Federation: (1) For compute workloads (VMs, containers, Lambdas), use IAM Instance Profiles in AWS, Managed Identities in Azure, and Workload Identity in GCP. The cloud metadata service injects short-lived temporary tokens automatically rotated every hour. (2) For CI/CD runners (GitHub Actions), use OpenID Connect (OIDC) to exchange short-lived OIDC JWTs for cloud STS tokens without storing any client secrets in repository settings.'
      }}
    />
  );
};

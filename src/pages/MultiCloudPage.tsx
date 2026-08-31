import React from 'react';
import { GeneralTopicPage } from './GeneralTopicPage';

export const MultiCloudPage: React.FC = () => {
  return (
    <GeneralTopicPage
      levelNumber={10}
      category="Multi-Cloud Architecture"
      title="Pragmatic Multi-Cloud Architecture & Interconnectivity"
      subtitle="Understand when multi-cloud is truly justified, cross-cloud VPN tunnels, identity federation, Kubernetes portability, and data egress economics."
      iconType="multicloud"
      diagramAscii={`
┌──────────────────────────────────────────────────────────┐
│                   Tri-Cloud Architecture Model           │
│                                                          │
│  [ Global DNS / Cloudflare ]                             │
│       │                                                  │
│       ├────────────────────────┬────────────────────────┐│
│       ▼                        ▼                        ▼│
│  [ Primary: AWS ]        [ DR: Azure ]            [ AI: GCP ] │
│  • EKS Microservices     • AKS Standby            • BigQuery │
│  • Aurora PostgreSQL     • Failover PostgreSQL    • Vertex AI│
│       │                        │                        ││
│       └────────────────(Encrypted Inter-Cloud)──────────┘│
└──────────────────────────────────────────────────────────┘
      `}
      sections={[
        {
          heading: '1. The Golden Rule: Multi-Cloud is NOT Automatically Better',
          explanation: 'Running across multiple clouds multiplies operational complexity, requires multi-disciplinary talent, fractures security audit trails, and incurs severe data egress bandwidth fees. Multi-cloud should only be adopted for specific business drivers.',
          points: [
            'Legitimate Drivers: Regulatory compliance (e.g. European DORA requiring zero single-provider systemic risk), M&A company integration, and best-of-breed specialization (e.g. GCP BigQuery for analytics + AWS for core compute).',
            'False Drivers: "Avoiding vendor lock-in" by building to the lowest common denominator, which prevents using cloud-native managed databases, serverless features, and automated AI services.'
          ]
        },
        {
          heading: '2. Inter-Cloud Networking & Identity Federation',
          explanation: 'How AWS, Azure, and GCP talk to each other privately and securely.',
          points: [
            'IPSec VPN / Cloud Routers: Interconnect VPCs and VNets over redundant IPSec VPN tunnels with BGP routing (or private colocation cross-connects like Megaport/Equinix Fabric).',
            'Identity Federation: Use Microsoft Entra ID or Okta as central Identity Provider (IdP), issuing OIDC JWT tokens that are federated into AWS IAM and GCP Cloud IAM via Workload Identity.'
          ]
        }
      ]}
      interviewQuestion={{
        question: 'How would you architect a database replication strategy between AWS Aurora and Azure PostgreSQL without exposing database ports to the internet?',
        answer: 'Establish a redundant IPSec VPN connection between the AWS VPC and Azure VNet with BGP routing (e.g., AWS Virtual Private Gateway <-> Azure VPN Gateway). Place AWS Aurora in private subnets (10.1.0.0/16) and Azure Flexible PostgreSQL in private subnets (10.2.0.0/16). Configure an asynchronous Change Data Capture (CDC) replication tool like AWS Database Migration Service (DMS) or Debezium running in AWS, streaming WAL logs over the private VPN tunnel directly into the Azure PostgreSQL private endpoint IP with TLS encryption.'
      }}
    />
  );
};

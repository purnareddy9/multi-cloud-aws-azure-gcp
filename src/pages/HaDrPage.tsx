import React from 'react';
import { GeneralTopicPage } from './GeneralTopicPage';

export const HaDrPage: React.FC = () => {
  return (
    <GeneralTopicPage
      levelNumber={8}
      category="High Availability & Disaster Recovery"
      title="High Availability (HA) vs Disaster Recovery (DR)"
      subtitle="Master fault domain isolation, RPO and RTO trade-offs, Pilot Light vs Warm Standby vs Multi-Region Active/Active."
      iconType="hadr"
      diagramAscii={`
┌──────────────────────────────────────────────────────────┐
│                   DR Strategies: Cost vs Speed           │
├───────────────────┬──────────────┬──────────────┬────────┤
│ Strategy          │ RTO          │ RPO          │ Cost   │
├───────────────────┼──────────────┼──────────────┼────────┤
│ Backup & Restore  │ Hours - Days │ Hours (Lag)  │ $      │
│ Pilot Light       │ 10 - 30 mins │ Minutes      │ $$     │
│ Warm Standby      │ < 5 minutes  │ < 1 minute   │ $$$    │
│ Active / Active   │ Near Instant │ Real-Time    │ $$$$$  │
└───────────────────┴──────────────┴──────────────┴────────┘
      `}
      sections={[
        {
          heading: '1. High Availability (HA) vs Disaster Recovery (DR)',
          explanation: 'HA and DR protect against completely different failure modes. HA protects against localized hardware or data center failures in the same region. DR protects against catastrophic regional or multi-region blackouts.',
          points: [
            'High Availability: Deploy across 3 Availability Zones with synchronous replication and automated sub-minute failover (RPO = 0, RTO < 1min).',
            'Disaster Recovery: Replicate data asynchronously to a secondary region (or secondary cloud) to restore business operations after regional disaster.'
          ],
          comparisonRow: {
            aws: 'Multi-AZ RDS + Aurora Global Database + Route 53 Health Checks.',
            azure: 'Zone-Redundant Services + Azure SQL Failover Groups + Front Door.',
            gcp: 'Regional GKE + Cloud Spanner (Multi-Region) + Global Anycast LB.'
          }
        },
        {
          heading: '2. The 4 Disaster Recovery Strategies',
          explanation: 'Selecting a DR strategy is an economic equation balancing Recovery Time Objective (RTO) and Recovery Point Objective (RPO) against infrastructure costs.',
          points: [
            'Backup & Restore: Export snapshots to secondary region storage. Slowest recovery, lowest cost.',
            'Pilot Light: Core database data is replicated live, but compute servers are kept completely off and only provisioned on failover.',
            'Warm Standby: A scaled-down miniature version of the full stack runs 24/7 in secondary region, scaling up to 100% capacity during disaster.',
            'Active / Active (Multi-Region): Traffic is actively served from 2+ regions simultaneously. Maximum resilience, highest cost and complexity.'
          ]
        }
      ]}
      interviewQuestion={{
        question: 'What happens to data consistency during a network partition between two regions in an Active/Active database setup?',
        answer: 'By the CAP Theorem, in the presence of a network partition (P), a distributed database must choose between Consistency (C) and Availability (A). Systems like Amazon DynamoDB Global Tables or Azure Cosmos DB Multi-Region default to Eventual Consistency (AP), accepting temporary write divergence and resolving conflicts using Last-Write-Wins (LWW) or CRDTs. Systems like Google Cloud Spanner use synchronized atomic TrueTime clocks (CP) to enforce linearizable ACID consistency across regions at the cost of slight write latency.'
      }}
    />
  );
};

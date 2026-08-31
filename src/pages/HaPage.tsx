import React from 'react';
import { GeneralTopicPage } from './GeneralTopicPage';

export const HaPage: React.FC = () => {
  return (
    <GeneralTopicPage
      levelNumber={8}
      category="High Availability (HA)"
      title="High Availability (HA) Architecture Patterns"
      subtitle="Eliminate single points of failure across physical hosts, racks, data centers, and availability zones with automatic self-healing."
      iconType="hadr"
      diagramAscii={`
+-------------------------------------------------------------+
|               Multi-AZ High Availability Model              |
|                                                             |
|                   [ Global DNS / CDN ]                      |
|                            |                                |
|                            v                                |
|           [ Application Load Balancer (ALB) ]               |
|            /               |               \\                |
|           /                |                \\               |
|          v                 v                 v              |
|    +-----------+     +-----------+     +-----------+        |
|    | AZ 1 (1a) |     | AZ 2 (1b) |     | AZ 3 (1c) |        |
|    | App Server|     | App Server|     | App Server|        |
|    +-----+-----+     +-----+-----+     +-----+-----+        |
|          |                 |                 |              |
|          +--------+--------+--------+--------+              |
|                   | Synchronous     |                       |
|                   v Low-Latency     v Sync Standby          |
|            [ Primary DB (1a) ] <========> [ Standby DB (1b) ]|
+-------------------------------------------------------------+
`}
      sections={[
        {
          heading: '1. What is High Availability (HA)?',
          explanation: 'High Availability ensures a system remains operational and accessible with minimal downtime (99.99% = less than 52 minutes of downtime per year). It focuses on redundancy and automated failover within a single cloud region across physically isolated Availability Zones (AZs).',
          points: [
            'Multi-AZ Redundancy: Distribute compute across at least 3 Availability Zones.',
            'Health Checks & Auto-Healing: Load balancers remove unhealthy nodes automatically, while Auto Scaling groups launch healthy replacements in under 60 seconds.',
            'Synchronous Database Standby: Primary database continuously replicates to a standby instance in another AZ with zero data loss (RPO = 0).'
          ],
          comparisonRow: {
            aws: 'ALB + EC2 Auto Scaling (Multi-AZ) + RDS Multi-AZ Standby.',
            azure: 'Azure App Gateway + VM Scale Sets (Zones 1,2,3) + Azure SQL Zone Redundancy.',
            gcp: 'Global External LB + Regional MIG (3 Zones) + Cloud SQL HA.'
          }
        },
        {
          heading: '2. High Availability Architecture Rules of Thumb',
          explanation: 'Every tier of the architecture must be N+1 redundant so that taking down an entire data center causes zero degradation in performance.',
          points: [
            'Rule 1: Always provision N+1 capacity (e.g. if 2 instances handle 100% load, run 3 across 3 AZs so losing 1 AZ leaves 100% capacity).',
            'Rule 2: Never place databases in single-AZ mode in production.',
            'Rule 3: Ensure stateless compute layers so any instance can be terminated and replaced instantly.'
          ]
        }
      ]}
      interviewQuestion={{
        question: 'How do you design an application for 99.999% (Five Nines) availability?',
        answer: 'Five Nines allows only 5.26 minutes of total downtime per year. This requires: (1) Decoupled stateless microservices deployed across multiple Availability Zones with automated health-checked load balancing; (2) Multi-region active/active deployment with global Anycast or GeoDNS routing; (3) Distributed multi-master database with continuous replication (e.g. Cloud Spanner, DynamoDB Global Tables, Cosmos DB Multi-Region); (4) Automated canary deployments and automated rollback upon elevated error rates.'
      }}
    />
  );
};

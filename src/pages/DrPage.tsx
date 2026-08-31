import React from 'react';
import { GeneralTopicPage } from './GeneralTopicPage';

export const DrPage: React.FC = () => {
  return (
    <GeneralTopicPage
      levelNumber={9}
      category="Disaster Recovery (DR)"
      title="Disaster Recovery (DR) Strategies & RPO/RTO"
      subtitle="Architect cross-region and multi-cloud disaster recovery architectures: Backup & Restore, Pilot Light, Warm Standby, and Active/Active."
      iconType="hadr"
      diagramAscii={`
+-------------------------------------------------------------+
|               Disaster Recovery (DR) Strategies             |
+-------------------+--------------+--------------+-----------+
| Strategy          | RTO          | RPO          | Cost      |
+-------------------+--------------+--------------+-----------+
| 1. Backup/Restore | Hours - Days | Hours (Lag)  | $ (Low)   |
| 2. Pilot Light    | 10 - 30 mins | Minutes      | $$ (Med)  |
| 3. Warm Standby   | < 5 minutes  | < 1 minute   | $$$ (High)|
| 4. Active/Active  | Near Instant | Real-Time    | $$$$$ (2x)|
+-------------------+--------------+--------------+-----------+

[ Primary Region: US-East ]        [ Secondary Region: US-West ]
      (100% Traffic)                         (Standby)
             |                                   |
    [ Primary Database ] ---Asynchronous--------> [ Read Replica / ]
                            Replication           [ Warm Standby ]
`}
      sections={[
        {
          heading: '1. RPO vs RTO: The Foundational DR Metrics',
          explanation: 'Every disaster recovery plan is governed by two fundamental business SLA metrics: Recovery Point Objective (RPO) and Recovery Time Objective (RTO).',
          points: [
            'RPO (Recovery Point Objective): How much data in minutes/hours your business can afford to lose. Dictates how frequently data must be replicated.',
            'RTO (Recovery Time Objective): How long in minutes/hours the business can tolerate being down before service must be fully restored. Dictates compute readiness (cold vs warm vs active).'
          ],
          comparisonRow: {
            aws: 'Aurora Global Database + S3 Cross-Region Replication + Route 53 Failover.',
            azure: 'Azure SQL Failover Groups + GRS Storage + Azure Front Door.',
            gcp: 'Cloud Spanner Multi-Region + GCS Dual-Region + Global Anycast LB.'
          }
        },
        {
          heading: '2. The 4 Disaster Recovery Strategies In Detail',
          explanation: 'Choose the optimal strategy balancing cost against business impact:',
          points: [
            'Backup & Restore: Nightly snapshots sent to secondary region. Best for internal non-critical tools.',
            'Pilot Light: Core database replicates continuously; compute instances are off (or 0 nodes) and launched only during disaster.',
            'Warm Standby: A scaled-down version (e.g. 1 small instance + replica) runs 24/7 in secondary region, scaling up to 100% on failover in <5 minutes.',
            'Multi-Region Active/Active: Live user traffic served simultaneously from 2+ regions. Zero downtime on regional failure.'
          ]
        }
      ]}
      interviewQuestion={{
        question: 'How do you prevent Split-Brain scenario during a Disaster Recovery regional failover?',
        answer: 'Split-Brain occurs if both regions believe the other has died and both accept write traffic simultaneously, causing irreconcilable database corruption. To prevent it: (1) Use an odd number of voting quorum nodes or a managed cloud control plane (e.g. Route 53 / Azure Front Door) with definitive health-check thresholds; (2) Implement fencing (STONITH / Shoot The Other Node In The Head) or strictly lock the old primary database to read-only before promoting the replica in the secondary region.'
      }}
    />
  );
};

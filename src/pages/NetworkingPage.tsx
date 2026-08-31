import React from 'react';
import { GeneralTopicPage } from './GeneralTopicPage';

export const NetworkingPage: React.FC = () => {
  return (
    <GeneralTopicPage
      levelNumber={5}
      category="Cloud Networking & CIDR"
      title="Enterprise Cloud Networking Mastery"
      subtitle="Master CIDR calculation, subnets, routing tables, NAT gateways, peering meshes, Transit Gateways, and private hybrid connectivity."
      iconType="network"
      diagramAscii={`
┌──────────────────────────────────────────────────────────┐
│                   Multi-Cloud Networking Model           │
│                                                          │
│  [ On-Premises HQ ] ──(Direct Connect / ExpressRoute)──┐ │
│                                                        │ │
│                                  ┌─────────────────────┘ │
│                                  ▼                       │
│                        [ Transit Hub / VPN ]             │
│                                  │                       │
│            ┌─────────────────────┼─────────────────────┐ │
│            ▼                     ▼                     ▼ │
│      [ AWS VPC ]           [ Azure VNet ]        [ GCP VPC ] │
│     (10.100.0.0/16)       (10.200.0.0/16)       (10.300.0.0) │
│     Subnets: AZ-locked    Subnets: Regional     Subnets: Reg │
└──────────────────────────────────────────────────────────┘
      `}
      sections={[
        {
          heading: '1. CIDR Blocks & Subnet Math for Cloud Architects',
          explanation: 'CIDR (Classless Inter-Domain Routing) defines the size and range of IP address pools. A /16 block provides 65,536 IPs (ideal for a VPC), while a /24 provides 256 IPs (ideal for a subnet).',
          points: [
            'AWS reserves 5 IPs per subnet (.0 network, .1 router, .2 DNS, .3 future use, .255 broadcast).',
            'Azure reserves 5 IPs per subnet (.0 network, .1 default gateway, .2/.3 DNS mapping, .255 broadcast).',
            'GCP reserves 4 IPs per subnet (.0 network, .1 gateway, .2 second-to-last, .255 broadcast).',
            'Golden Rule: Never use overlapping CIDR blocks across VPCs that might ever peer or connect to on-premises networks.'
          ],
          comparisonRow: {
            aws: 'VPC is Regional; Subnets are locked to 1 specific AZ.',
            azure: 'VNet is Regional; Subnets span all AZs in that region.',
            gcp: 'VPC is Global; Subnets are Regional (span all AZs in that region).'
          }
        },
        {
          heading: '2. Public vs Private Subnets & NAT Gateways',
          explanation: 'A public subnet has a route to an Internet Gateway (IGW). A private subnet has no direct internet route; its outbound internet traffic (for security patching) is routed through a Network Address Translation (NAT) Gateway in a public subnet.',
          points: [
            'Inbound traffic cannot reach instances in private subnets from the internet.',
            'Outbound responses return seamlessly through stateful NAT connection tracking.',
            'For high availability in AWS, deploy 1 NAT Gateway per Availability Zone to prevent single-AZ outage from severing outbound internet.'
          ],
          comparisonRow: {
            aws: 'AWS NAT Gateway (managed, deployed in public subnet per AZ).',
            azure: 'Azure NAT Gateway (assigned at subnet level, highly available per zone).',
            gcp: 'Cloud NAT (fully software-defined, serverless gateway with zero VM deployment).'
          }
        }
      ]}
      interviewQuestion={{
        question: 'How do you design a private hybrid connection between an on-premises datacenter and multiple VPCs across AWS, Azure, and GCP?',
        answer: 'Deploy dedicated private circuits: AWS Direct Connect and Azure ExpressRoute terminating in a carrier-neutral colocation facility (e.g. Equinix). Use AWS Transit Gateway and Azure Virtual WAN with BGP dynamic routing. For GCP, connect via Cloud Interconnect. Enforce non-overlapping RFC1918 CIDR blocks (e.g., 10.0.0.0/16 for On-Prem, 10.1.0.0/16 for AWS, 10.2.0.0/16 for Azure, 10.3.0.0/16 for GCP) to prevent NAT IP collision and enable direct private routing.'
      }}
    />
  );
};

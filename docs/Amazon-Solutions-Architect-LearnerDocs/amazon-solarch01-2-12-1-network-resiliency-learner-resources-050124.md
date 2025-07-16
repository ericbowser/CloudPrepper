# Network resiliency and scalability

After completing this episode, you should be able to:

+ Explain basic disaster recovery (DR) and business continuity (BC) concepts.
+ Describe DR strategies in Amazon Web Services (AWS).
+ Use AWS regions and availability zones to ensure high availability (HA) of resources and connections.
+ Explain how to incorporate automation in designing resilient and scalable infrastructure.

## Key point 1

Services designed to support network scalability include Transit Gateway (up to 5,000 attachments), load balancing (direct traffic to auto-scaling groups), CloudFront (distribute content close to point of use), and thoughtful IP address space design that avoids overlap in Classless Inter-Domain Routing (CIDR) blocks for subnets and virtual private clouds (VPCs).

## Key point 2

Eliminate single points of failure by using multiple Availability Zones and multiple regions, where appropriate. A good compromise might be to back up data across regions but keep functionality in one region.

## Key point 3

Failover strategies include backup and restore, pilot light, warm standby, and multi-site active/active. Automated recovery tools in AWS include AWS Systems Manager (manage applications and infrastructure), AWS Config (assess, audit, and evaluate resource configurations), and AWS CloudFormation (automate deployment through Infrastructure as Code).

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Scalability: <https://docs.aws.amazon.com/whitepapers/latest/hybrid-connectivity/scalability>
+ Disaster Recovery of Workloads on AWS: Recovery in the Cloud: <https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws>
+ Business Continuity Plan (BCP): <https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/business-continuity-plan-bcp>
+ AWS Systems Manager Automation: <https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation>
+ AWS Config: <https://aws.amazon.com/config>
+ AWS CloudFormation: <https://aws.amazon.com/cloudformation>
+ Using redundant Site-to-Site VPN connections to provide failover: <https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-redundant-connection>

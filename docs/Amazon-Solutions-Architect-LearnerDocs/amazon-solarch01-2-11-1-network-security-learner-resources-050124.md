# Network security

After completing this episode, you should be able to:

+ Identify common threat vectors external to Amazon Web Services (AWS).
+ Configure network traffic controls for protocols and ports.
+ Compare AWS services used to ensure network traffic security.
+ Integrate security into virtual private cloud (VPC) design.

## Key point 1

Network access control lists (ACLs) provide subnet-level protection while security groups provide instance-level protection. NACLs are stateless and include allow or deny rules, where the highest priority match is applied to traffic. Security groups are stateful and include only allow rules with an implicit deny. All rules are evaluated to determine how to filter traffic.

## Key point 2

Network Firewall provides stateful and stateless firewall options, which also include intrusion protection system (IPS) features. Network Firewall can be distributed to work within a VPC or centralized to work through Transit Gateway.

## Key point 3

AWS Shield provides built-in distributed denial-of-service (DDoS) protection. The Standard version is free to all users and is always on. The Advanced version must be configured by the user, adds layer-7 protection, and includes cost protection, web application firewall (WAF) integration, real-time visibility, and health-based detection. Shield Advanced costs $3,000/month/organization plus data transfer and usage fees.

## Key point 4

WAFv2 provides web ACLs to block common web-based exploits, such as SQL injection, XSS attacks, and HTTP flood. The WAF stands between the internet and web app resources such as CloudFront (global protection), Application load balancers (regional protection), and API Gateway (regional protection).

## Key point 5

AWS Firewall Manager provides management oversight to WAF, Shield, security groups, Network Firewall, Domain Name System (DNS) Firewall, and Palo Alto next-generation firewalls (NGFWs) to handle policies across accounts within an Organization and organize policies hierarchically.

## Key point 6

Amazon GuardDuty examines logs from S3, CloudTrail, DNS, Elastic Block Storage (EBS) volumes, Amazon Elastic Kubernetes Service (Amazon EKS), and VPC. It provides threat intelligence to identify privilege escalation, exposed credentials, malicious IP addresses, and malware.

## Key point 7

Amazon Inspector continuously scans new Amazon Elastic Compute Cloud (EC2) instances and containers using eligible images from ECR for vulnerabilities. For network assessment, no agent is needed. For host assessment, the instance must be running the AWS Systems Manager Agent (SSM Agent).

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Internetwork traffic privacy in Amazon VPC: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security
+ AWS Network Firewall: <https://aws.amazon.com/network-firewall>
+ AWS Shield: <https://aws.amazon.com/shield>
+ Security Automations for AWS WAF: <https://aws.amazon.com/solutions/implementations/aws-waf-security-automations>
+ AWS Firewall Manager: <https://aws.amazon.com/firewall-manager>
+ AWS Firewall Manager: <https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html>
+ What is Amazon GuardDuty? <https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty>
+ Amazon Inspector: <https://aws.amazon.com/inspector/?nc=sn&loc=1>
+ CVE: <https://cve.mitre.org>

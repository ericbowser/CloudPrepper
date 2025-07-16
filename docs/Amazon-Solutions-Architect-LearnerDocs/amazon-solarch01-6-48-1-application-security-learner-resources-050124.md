# Application security

After completing this episode, you should be able to:

+ Describe options for securing application access.
+ Compare Amazon Web Services (AWS) application security services.
+ Explain security principles for AWS service endpoints.

## Key point 1

Web Application Firewall (WAF) is integrated with CloudFront, Application Load Balancer, API Gateway, and AppSync. It runs where those service endpoints are located, such as Edge locations when used with CloudFront. WAF includes a visual rule builder in JSON and can be used to protect against SQL injection and XSS attacks. It's monitored by CloudWatch and can process data with Kinesis Data Firehose.

## Key point 2

AWS Inspector provides automated vulnerability management. It examines Amazon Elastic Compute Cloud (EC2) and container workloads for software vulnerabilities or network exposure. Inspector also incorporates information from the Common Vulnerabilities and Exposures (CVE).

## Key point 3

Cognito provides secure web and mobile access through customer identity and access management (CIA), including an option for self-registration. Where AWS accounts are limited to 5,000 users, Cognito can support up to millions of users. Cognito authenticates users, then sends traffic on to ALB, API Gateway, S3, DynamoDB, or other services.

## Key point 4

Secrets Manager can securely store sensitive access information that applications need when creating containers or running functions, such as database credentials, software as a service (SaaS) app credentials, on-premises resource credentials, application programming interface (API) keys, and secure shell (SSH) keys. You can also manage the secret lifecycle, such as rotation, replication, and auditing.

## Key point 5

Detective generates graphs to show security-related relationships and user and resource interactions. It looks at CloudTrail logs, virtual private cloud (VPC) flow logs, GuardDuty findings, and Amazon Elastic Kubernetes Service (Amazon EKS) audit logs, and then it summarizes and analyzes the ingested data.

## Key point 6

Security Hub is a posture management service and can perform automated security checks. It performs security best practice checks, alerts on that data, and enables some automated remediation.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ AWS WAF: <https://aws.amazon.com/waf>
+ AWS WAF FAQs: <https://aws.amazon.com/waf/faqs>
+ Amazon Inspector: <https://aws.amazon.com/inspector>
+ Amazon Cognito: <https://aws.amazon.com/cognito>
+ What is Amazon Cognito? <https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito>
+ AWS Secrets Manager: <https://aws.amazon.com/secrets-manager>
+ Amazon Detective: <https://aws.amazon.com/detective>
+ AWS Security Hub: <https://aws.amazon.com/security-hub>

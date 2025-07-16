# Data security concepts

After completing this episode, you should be able to:

+ Explain how to secure data in various states.
+ Compare services used to secure various types of workloads.
+ Secure access to stored data.

## Key point 1

Encryption is often used to protect data at rest, in transit, and even in use. Data can also be classified for various levels of protective mechanisms.

## Key point 2

Amazon Macie uses machine learning and pattern matching to automate discovery and protection of sensitive data. It continuously evaluates the S3 environment, generating an inventory of S3 buckets that are unencrypted, publicly accessible, or shared with external accounts. Findings are sent to CloudWatch Events for event-driven remediation.

## Key point 3

Other Amazon Web Services (AWS) services that use automated reasoning for data security include Amazon CodeGuru, S3 Block Public Access, IAM Access Analyzer, VPC Network Access Analyzer, and VPC Reachability Analyzer.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Protecting data at rest: <https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/protecting-data-at-rest>
+ Protecting data in transit: <https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/protecting-data-in-transit>
+ Zero Trust on AWS: <https://aws.amazon.com/security/zero-trust>
+ How to protect sensitive data for its entire lifecycle in AWS: <https://aws.amazon.com/blogs/security/how-to-protect-sensitive-data-for-its-entire-lifecycle-in-aws>
+ Data classification: <https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/data-classification>
+ Amazon Macie: <https://aws.amazon.com/macie>
+ Provable Security: <https://aws.amazon.com/security/provable-security>

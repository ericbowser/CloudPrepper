# Storage resiliency and scalability

After completing this episode, you should be able to:

+ Compare back-up strategies.
+ Describe Amazon Web Services (AWS) best practices for designing backups.
+ Explain the role of replication in implementing backup systems.
+ Incorporate auto-scaling in storage systems.

## Key point 1

When storage auto-scaling is needed, consider quotas for storage services, such as maximum number of access points for each Amazon Elastic File System (EFS) file system.

## Key point 2

Keep in mind that durability might not cover all kinds of possible disasters. Backups are still needed.

## Key point 3

AWS Backups can automate backups of many types of resources, including on-premises VMware workloads. Create a backup plan to determine backup frequency and retention policies. AWS Backup Vault Lock is used to protect backups from deletions or changes.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Amazon S3 FAQs: <https://aws.amazon.com/s3/faqs>
+ AWS Backup: <https://aws.amazon.com/backup>
+ AWSBackup FAQs: <https://aws.amazon.com/backup/faqs>
+ AWS Backup features: <https://aws.amazon.com/backup/features>

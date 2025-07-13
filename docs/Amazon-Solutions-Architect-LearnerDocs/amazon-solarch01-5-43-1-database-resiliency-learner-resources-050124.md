# Database resiliency and scalability

After completing this episode, you should be able to:

+ Explain when and how to incorporate a read replica into database design.
+ Describe common data retention policies that can apply to databases.
+ Design appropriate backup and retention policies, such as configuring a snapshot schedule.

## Key point 1

Backups, snapshots, and read replicas are similar concepts with typically different use cases. There is also overlap. For example, a read replica starts as a snapshot of the primary database and can serve as a backup to the primary database.

## Key point 2

Read replicas improve read performance, availability, scalability, and security. Read replicas can reside in a different Availability Zones (AZs) or regions than the primary database.

## Key point 3

AWS Backup can be used to keep automatically updated backup copies of a database. A plain backup is not intended to improve database performance, only availability. AWS Backup can be configured to keep backups for a certain period of time, which is called a retention policy.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Backing up, restoring, and exporting data: <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore>
+ Amazon RDS Read Replicas: <https://aws.amazon.com/rds/features/read-replicas>
+ AWS Backup: <https://aws.amazon.com/backup>

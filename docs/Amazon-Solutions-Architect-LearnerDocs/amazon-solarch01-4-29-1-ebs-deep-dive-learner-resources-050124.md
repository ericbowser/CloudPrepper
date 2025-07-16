# EBS deep dive

After completing this episode, you should be able to:

+ Explain durability and availability configuration options for data stored in Amazon Elastic Block Store (EBS).
+ Compare performance options for EBS volumes.
+ Describe options for mounting EBS volumes to resources located in AWS.

## Key point 1

EBS volumes can hold a file system, a database, or other types of items. Solid-state drives (SSDs) are appropriate for transactional workloads (such as databases) and boot devices. Typical volumes are <= 16 terabytes (TB), while Block Express offers up to 64 TB. Hard disk drives (HDDs) are appropriate for throughput intensive workloads (st1) and cheap, cold storage (sc1). EBS volumes offer persistent storage while Instance Store offers temporary storage.

## Key point 2

EBS security includes snapshots for backups, encryption through Key Management Service (KMS(), automated monitoring, failure detection, and failover mechanisms. Snapshots can be handled through lifecycle management.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Amazon Elastic Block Store: <https://aws.amazon.com/ebs>
+ Amazon EC2 instance store: <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage>
+ Amazon EBS Snapshots: <https://aws.amazon.com/ebs/snapshots>
+ Amazon EBS volume types: <https://aws.amazon.com/ebs/volume-types>

# Storage concepts

After completing this episode, you should be able to:

+ Compare common storage types.
+ Identify commonly used storage technologies for each storage type.
+ Describe how to choose a storage type for a use case.
+ Compare cloud storage strategies with on-premises storage technologies.

## Key point 1

Different Amazon Web Services (AWS) data storage and transfer services are compatible with on-premises storage device types and connection technologies, such as Internet Small Computer System Interface (iSCSI), Server Message Block (SMB), and Network File System (NFS).

## Key point 2

File system storage, such as EFS (Elastic File System), supports a traditional file system folder hierarchy and mounting to instances. It's good for one user or a small group but doesn't scale well.

## Key point 3

Block storage, such as Elastic Block Store (EBS), provides pre-sized storage volumes that can be mounted to instances as a root volume or additional storage volumes. Block storage is a flat namespace.

## Key point 4
 
Object storage, such as Simple Storage Service (S3), provides object storage which auto-sizes to hold objects stored in buckets. Object storage is a cloud-native storage structure. It scales well and is inexpensive to deploy.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Cloud Storage on AWS: <https://aws.amazon.com/products/storage>

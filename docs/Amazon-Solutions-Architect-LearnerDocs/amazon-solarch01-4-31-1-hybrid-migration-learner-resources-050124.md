# Hybrid storage and storage migration

After completing this episode, you should be able to:

+ Compare services used for hybrid storage deployments.
+ Explain factors that determine data transfer costs.
+ Compare data migration services.

## Key point 1

AWS Storage Gateway offers hybrid cloud storage options. You can backup data to the cloud (even to tape backups), run apps on-premises, expand storage capacity, or provide data lake access. Create a virtual appliance gateway in Amazon Web Services (AWS) using File Gateway, Volume Gateway, or Tape Gateway; download the gateway files; and then run it on-premises in a virtual machine (VM) or physical server.

## Key point 2

AWS Transfer Family provides managed file transfer using File Transfer Protocol (FTP), File Transfer Protocol Secure (FTPS), or Secure File Transfer Protocol (SFTP), and stores data natively in S3 or Elastic File System (EFS) with the metadata intact. Use Active Directory or Lightweight Directory Access Protocol (LDAP) authentication, Identity and Access Management (IAM) permissions, encryption, and compliance auditing for security measures.

## Key point 3

AWS DataSync provides TB-scale online data transfer to deliver data from an on-prem network to Amazon Simple Storage Service (Amazon S3), EFS, or FSx. It includes validation of the data transferred, and keeps metadata intact. Common use cases are to migrate data, archive cold data, and replicate data. Further, DataSync can continue to sync data over time.

## Key point 4

AWS Snow Family is primarily intended for high-volume data migration (terabyte or petabyte scale) that can tolerate offline transfer. The Snow Family consists of a variety of physical data storage devices that can include some on-board compute. The data is encrypted with KMS keys.

## Key point 5

S3 Batch Operations can copy billions of objects in S3. An operation is a type of application programming interface (API) action, such as copy object. A Job contains all the information needed to run the operation, such as the list of objects (called a manifest). A task is an instance of executing a job on an object.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ AWS Storage Gateway: <https://aws.amazon.com/storagegateway>
+ AWS Transfer Family: <https://aws.amazon.com/aws-transfer-family>
+ AWS DataSync: <https://aws.amazon.com/datasync>
+ When to choose AWS DataSync: <https://aws.amazon.com/datasync/faqs/#When_to_choose_AWS_DataSync>
+ AWS Snow Family: <https://aws.amazon.com/snow>
+ Performing large-scale batch operations on Amazon S3 objects: <https://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops>

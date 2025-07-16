# File systems deep dive

After completing this episode, you should be able to:

+ Identify options for accessing an Amazon Web Services (AWS) file system across a hybrid deployment.
+ Explain how to protect access to data stored in a file system.

## Key point 1

AWS file systems services can scale throughput and input/output operations per second (IOPS).

## Key point 2

Elastic File System (EFS) is best for Linux systems or a heterogeneous environment. It's great to provide persistent storage for containers. However, EFS is generally more expensive than FSx for Windows.

## Key point 3

FSx for Windows File Server supports Server Message Block (SMB) and connects to New Technology File System (NTFS) or Active Directory environments. FSx for Lustre supports high-speed data processing, high throughput (100s of Gbps, sub-millisecond latency), and Linux compatibility. FSx for NetApp ONTAP supports Network File System (NFS), SMB, and Internet Small Computer System Interface (iSCSI)

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Amazon Elastic File System: <https://aws.amazon.com/efs>
+ Amazon FSx: <https://aws.amazon.com/fsx>
+ Choosing an Amazon FSx File System: <https://aws.amazon.com/fsx/when-to-choose-fsx>

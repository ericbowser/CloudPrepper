# Data lifecycle

After completing this episode, you should be able to:

+ Describe the principles of a data lifecycle.
+ Use storage access patterns to design a data lifecycle.
+ Use storage tiers to optimize storage costs.

## Key point 1

The data lifecycle includes phases such as data creation, storage, use, sharing, archival, and destruction. When data is initially created, it's typically accessed more often. As it gets older, it's typically accessed less often, but continues to take up space. Data storage pricing tiers can shift data costs as it moves through its lifecycle.

## Key point 2

Data storage tiers in S3 include Standard, which charges more for storage space but nothing for data access; Standard-IA, which charges for access but a bit less for storage space; and the Glacier tiers, which charge even less for storage space, but more for access, and access might not be immediate. 

Intelligent tiering can automatically determine the most cost effective storage tier for data based on historical access patterns. Intelligent tiering charges a slight premium, so it's best to use this feature only when access patterns are unknown, changing, or unpredictable.

## Key point 3

Automated lifecycle rules include transition actions to move data between tiers, and expiration actions, to label data as current or archived.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Managing your storage lifecycle: <https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt>
+ Lifecycle considerationsTransitioning objects using Amazon S3 Lifecycle: <https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations>

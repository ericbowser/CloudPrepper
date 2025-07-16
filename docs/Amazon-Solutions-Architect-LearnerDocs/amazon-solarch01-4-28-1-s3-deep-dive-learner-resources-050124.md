# S3 deep dive

After completing this episode, you should be able to:

+ Compare durability and availability for data stored in Amazon Simple Storage Service (Amazon S3).
+ Describe the purpose of storage tiers in S3.
+ Explain security and version configuration options for an S3 bucket.

## Key point 1

S3 offers 11 9s durability, which is not the same as availability that varies by storage class. S3 events include PUT, POST, COPY, and DELETE; these events can publish to EventBridge, social networking service (SNS), SQS, and Lambda. Transfer Acceleration uses CloudFront to deliver data over optimized network paths. You can host a static website in S3 that contains HTML, CSS, JavaScript, images, video, and other static files.

## Key point 2

S3 storage tiers offer a way to adjust storage costs according to how the data is used. Intelligent Tiering offers automated lifecycle shifting between tiers.

## Key point 3

S3 security includes access control, governance, encryption, key management, and backups/replication. Encryption can be accomplished through SSE-S3 (AWS managed keys), SSE-C (customer managed keys), SSE-KMS (KMS managed keys), or the client library, such as S3 Encryption Client.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Amazon S3: <https://aws.amazon.com/s3>
+ Host a Static Website: <https://aws.amazon.com/getting-started/hands-on/host-static-website/faq/?p=gsrc&c=ho_hsw>
+ Transitioning objects using Amazon S3 Lifecycle: <https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html>
+ Amazon S3 Replication: <https://aws.amazon.com/s3/features/replication>

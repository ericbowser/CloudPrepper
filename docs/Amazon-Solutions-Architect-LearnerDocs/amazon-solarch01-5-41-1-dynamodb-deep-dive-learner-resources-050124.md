# DynamoDB deep dive

After completing this episode, you should be able to:

+ Describe scenarios where Amazon DynamoDB is a good choice of database service.
+ Explain the role DynamoDB plays in a serverless, event-driven architecture.
+ Identify the basic steps of creating a DynamoDB table.

## Key point 1

DynamoDB can support key-value or document databases. It includes built-in security, backup, and restore features, along with multiregion replication and in-memory caching. DynamoDB can handle tens of millions of read and write requests per second. It defaults to eventually consistent (within 1 second) for maximum read throughput, but can be configured to be strongly consistent for ACID-compliant transactions.*ACID* is short for *Atomicity, Consistency, Isolation, and Durability*.

## Key point 2

DynamoDB is available in on-demand (more expensive and more flexible) or provisioned modes. DynamoDB Accelerator (DAX) offers in-memory caching to improve read performance by up to 10 times (from milliseconds to microseconds). No code changes are needed to use this feature.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Amazon DynamoDB: <https://aws.amazon.com/dynamodb>
+ Amazon DynamoDB Accelerator (DAX): <https://aws.amazon.com/dynamodb/dax>
+ In-memory acceleration with DynamoDB Accelerator (DAX): <https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX>
+ Choosing the Right DynamoDB Partition Key: <https://aws.amazon.com/blogs/database/choosing-the-right-dynamodb-partition-key>

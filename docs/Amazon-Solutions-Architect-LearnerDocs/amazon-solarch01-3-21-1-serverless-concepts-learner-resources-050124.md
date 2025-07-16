# Serverless concepts

After completing this episode, you should be able to:

+ Distinguish between server-based and serverless services.
+ Explain what serverless services are and the basics of how they work.
+ Identify a variety of serverless technologies and services (not just serverless compute).
+ Describe common serverless workflow patterns, such as queueing and messaging.

## Key point 1

Consider using serverless services when you just need to build your code, when you want to only pay for running your code, when you want to run code closer to the user, when you want a system that is inherently scalable, and when you want to focus on updating code instead of servers. 

Avoid using containers when the system tends to have troubleshooting issues, when there are requirements for long-running processes or cold starts, when there are security concerns, or when the origin system has an older legacy design that cannot be converted.

## Key point 2

Other serverless services include app integration services, such as Amazon Simple Queue Service (SQS), Amazon simple Notification Services (SNS), and Amazon Web Services (AWS) AppSync, and data store services, such as Amazon Simple Storage Service (Amazon S3), DynamoDB, and Aurora Serverless.

## Key point 3

Architectural messaging is provided by queueing services (SQS) and publish/subscribe services (SNS).

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Serverless on AWS: <https://aws.amazon.com/serverless/?nc=sn&loc=1>
+ Message Queues: <https://aws.amazon.com/message-queue>
+ What is Pub/Sub Messaging? <https://aws.amazon.com/pub-sub-messaging>

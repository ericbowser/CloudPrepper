# System design concepts

After completing this episode, you should be able to:

+ Choose an AWS-managed service for a given scenario.
+ Decouple workloads by replacing monolithic components with microservices.
+ Place microservices within an event-driven workflow.
+ Position workload components within a multi-tier architecture.

## Key point 1

Loose coupling principles support independent scalability in resources and separate development, maintenance, management of resources. Loose coupling design relies on purpose-built services, idempotent configurations, and asynchronous communication where possible to create a consistent workload for resources. CloudWatch EventBridge enables event management in a loosely coupled system.

## Key point 2

Amazon Web Services (AWS) that support cloud-native system design include:

+ AWS Application Discovery Service, which is used for discovering processes in an existing system and aiding in refactoring for AWS.
+ AWS Amplify, which is used to assist frontend web and mobile developers.
+ AWS Device Farm, which is used for testing a system in multiple device types.
+ AWS Elastic Beanstalk, which is used for deploying a cloud-native application's environment.

## Key point 3

Some legacy applications cannot be refactored for cloud migration. In other cases, however, many AWS services can assist with legacy application redesign, including AWS Application Migration Service (MGN), AWS App2Container, and AWS Mainframe Modernization.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Design interactions in a distributed system to prevent failures: <https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/design-interactions-in-a-distributed-system-to-prevent-failures>
+ AWS Application Discovery Service: <https://aws.amazon.com/application-discovery>
+ AWS Amplify: <https://aws.amazon.com/amplify>
+ AWS Device Farm: <https://aws.amazon.com/device-farm>
+ AWS Elastic Beanstalk: <https://aws.amazon.com/elasticbeanstalk>
+ AWS Application Migration Service: <https://aws.amazon.com/application-migration-service>
+ Demystifying Legacy Migration Options to the AWS Cloud: <https://aws.amazon.com/blogs/apn/demystifying-legacy-migration-options-to-the-aws-cloud>

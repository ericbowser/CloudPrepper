# Architecture messaging

After completing this episode, you should be able to:

+ Describe the roles of queueing and pub/sub messaging in event-driven architecture.
+ Define the representational state transfer application programming interface (REST API).
+ Compare messaging techniques and services available in Amazon Web Services (AWS).

## Key point 1

Distributed system design increases reliability and scalability. Stateful workloads require server-side information to establish sessions. Stateless workloads require encryption to ensure the client is still who they say they are.

## Key point 2

An API is similar in concept to sockets and ports on a motherboard--it provides a standardized way for systems to "talk" to each other. A common form of API is the REST API, which is stateless.

## Key point 3

API Gateway is a communication hub for API-powered communication between services, especially services from outside AWS to resources inside. It can include optional authentication with AWS Cognito, and it can coordinate with Lambda functions to perform some processing. AppSync serves as a single endpoint for GraphQL APIs and pub/sub APIs.

## Key point 4

Simple Queueing Service (SQS) provides a message queue, which buffers messages that are then pulled by clients when the client is ready for the next message. Simple Notification Service (SNS) is a publish/subscribe (pub/sub) service that broadcasts, or pushes, a message as soon as it is received. There is no buffer with SNS, although you can configure a short delay, and SNS can broadcast a message to multiple recipients.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ What is an API (Application Programming Interface)? <https://aws.amazon.com/what-is/api>
+ Amazon API Gateway: <https://aws.amazon.com/api-gateway>
+ API Gateway errors: <https://aws.amazon.com/premiumsupport/knowledge-center/api-gateway-5xx-error/#:~:text=A%20503%20error%20code%20is,server%20is%20under%20temporary%20maintenance>
+ AWS AppSync: <https://aws.amazon.com/appsync>
+ Amazon CloudWatch: <https://aws.amazon.com/cloudwatch>
+ Message Queues: <https://aws.amazon.com/message-queue>
+ Amazon MQ: <https://aws.amazon.com/amazon-mq>
+ What is Pub/Sub Messaging? <https://aws.amazon.com/pub-sub-messaging>
+ Gateway response types: <https://docs.aws.amazon.com/apigateway/latest/developerguide/supported-gateway-response-types>

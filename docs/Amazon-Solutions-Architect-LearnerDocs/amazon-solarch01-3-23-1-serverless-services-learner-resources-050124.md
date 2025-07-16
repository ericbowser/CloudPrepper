# Other serverless services

After completing this episode, you should be able to:

+ Explain the roles of various serverless services in overall system design.
+ Describe how to optimize the performance and costs of serverless resources.
+ Explain how to incorporate serverless technology into architectures that are not necessarily serverless by design.

## Key point 1

AWS AppSync supports GraphQL application programming interfaces (APIs), which are single endpoint to query or update data from databases, microservices, or other APIs, and pub/sub APIs that publish data updates from event source to subscribed web, mobile, and Internet of Things (IoT) clients via serverless WebSocket API connections. Use cases include offline data sync, real-time collaboration, real-time chat, and real-time IoT dashboards.

## Key point 2

AWS Serverless Application Repository offers pre-built applications, such as Alexa skills, chatbots, data processing, IoT, stream processing, web/mobile backends, and more. Share applications privately or publicly.

## Key point 3

AWS Step Functions provides a way to manage workflows with states; it validates the workflow, then it generates relevant code underneath. Step Functions uses Amazon States Language (ASL), which is based on JSON. States can include control flow (succeed, fail, wait, choice, parallel, map) or tasks (interact with a function, database, container, messaging, and more), or send notifications via email, social networking service (SNS), or both.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ AWS AppSync: <https://aws.amazon.com/appsync>
+ AWS Serverless Application Repository: <https://aws.amazon.com/serverless/serverlessrepo>
+ Step functions:
  + What is AWS Step Functions? <https://docs.aws.amazon.com/step-functions/latest/dg/welcome>
  + AWS Step Functions Workflow Studio: <https://docs.aws.amazon.com/step-functions/latest/dg/workflow-studio>
  + AWS Step Functions FAQs: <https://aws.amazon.com/step-functions/faqs>
  + Amazon States Language: <https://docs.aws.amazon.com/step-functions/latest/dg/concepts-amazon-states-language>
  + Data processing: <https://docs.aws.amazon.com/step-functions/latest/dg/use-cases-data-processing>

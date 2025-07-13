# Workflow performance

After completing this episode, you should be able to:

+ Describe methods for increasing workload visibility.
+ Apply workflow orchestration principles to improve performance.
+ Explain common caching strategies used to increase system performance.
+ Explain strategies to ensure workload resilience.

## Key point 1

Amazon Web Services (AWS) Step Functions lets you focus on the business logic in the Step Functions Workflow Studio and not so much on building the underlying infrastructure. Common use cases include data processing, DevOps, IT automation, e-commerce, and web apps.

## Key point 2

Caching can help achieve the consistent workflow ideal of cloud-native design. Current recommendations suggest using a dedicated caching layer, such as using API Gateway for application programming interface (API) caching. You can also use service quotas and throttling limitations to further optimize workflow performance and costs.

## Key point 3

A significant challenge of cloud-native, distributed systems is workload visibility and monitoring. AWS X-Ray is designed to passively monitor distributed systems. EventBridge can trigger behaviors in response to defined events. And CloudWatch can monitor metrics and generate an alarm when certain thresholds are crossed.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ AWS Step Functions: <https://aws.amazon.com/step-functions>
+ Amazon States Language: <https://states-language.net>
+ Caching Overview: <https://aws.amazon.com/caching>
+ Request throttling for the Amazon ECS API: <https://docs.aws.amazon.com/AmazonECS/latest/APIReference/request-throttling>
+ Best Practices - Operating Amazon ECS at scale: <https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/operating-at-scale>
+ Service Quotas Documentation: <https://docs.aws.amazon.com/servicequotas/index>
+ AWS X-Ray: <https://aws.amazon.com/xray>
+ Amazon CloudWatch: <https://aws.amazon.com/cloudwatch>
+ Amazon EventBridge: <https://aws.amazon.com/eventbridge>

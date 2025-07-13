# Compute resiliency and scalability

After completing this episode, you should be able to:

+ Compare availability requirements of various workload types.
+ Compare horizontal and vertical scaling.
+ Configure scaling strategies for compute resources.
+ Explain how to use scaling to optimize costs.

## Key point 1

Decoupled workloads allow microservices to be scaled independently. EC2 auto scaling scales an auto-scaling group (ASG) of instances in and out in response to shifting CloudWatch metrics. It can send a social networking service (SNS) notification when scaling occurs. Dynamic scaling can be set to respond to common metrics such as CPU utilization, traffic in or out, and group size.

## Key point 2

AWS Auto Scaling can scale other types of resources: EC2, Spot Fleets, ECS tasks, DynamoDB tables/indexes, and Aurora Replicas. Scaling can prioritize availability and performance, cost, or a balance of both. There is also a predictive scaling option.

## Key point 3

Auto scaling can improve availability and fault tolerance of resources. High availability refers to minimal service interruption while fault tolerance refers to no service interruption. Monitor resource health, replace unhealthy instances, and balance capacity across Availability Zones.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ EC2 Auto Scaling:
  + Amazon EC2 Auto Scaling: <https://aws.amazon.com/ec2/autoscaling>
  + What is Amazon EC2 Auto Scaling? <https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling>
  + Scaling cooldowns for Amazon EC2 Auto Scaling: <https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scaling-cooldowns>
  + Amazon EC2 Auto Scaling Warm Pools: <https://aws.amazon.com/about-aws/whats-new/2022/02/amazon-ec2-auto-scaling-warm-pools-supports-hibernating-returning-instances-warm-pools-scale-in>
  + Target tracking scaling policies for Amazon EC2 Auto Scaling: <https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking>
+ AWS Auto Scaling:
  + AWS Auto Scaling: <https://aws.amazon.com/autoscaling>
  + Spot Fleet: <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet>

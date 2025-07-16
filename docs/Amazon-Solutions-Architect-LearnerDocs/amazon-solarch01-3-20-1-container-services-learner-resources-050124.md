# Other container services

After completing this episode, you should be able to:

+ Explain how to migrate applications into containers.
+ Select appropriate container services for specific use cases.
+ Identify services used to monitor containers.

## Key point 1

When considering whether to migration an application to containers, red flags would include if the application is currently hosted on a mainframe, if there are legacy or hardware dependencies, and if there are security concerns.

## Key point 2

Amazon Elastic Container Service (Amazon ECS) Anywhere and Amazon Elastic Kubernetes Service (Amazon EKS) provide the option to deploy containers in an on-premises network on bare metal servers or in virtual machines (VMs), specifically, VMware vSphere for EKS. Under the hood for EKS Anywhere is EKS Distro, which is the Amazon Web Services (AWS) version of Kubernetes.

## Key point 3

AWS Fargate provides serverless compute for container hosting and works with either ECS or EKS. AWS Managed Service for Prometheus provides integration with Prometheus project monitoring and alerting for containers into AWS infrastructure and security.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Containers at AWS: <https://aws.amazon.com/containers/?contd_rr2>
+ Amazon ECS Anywhere: <https://aws.amazon.com/ecs/anywhere>
+ Getting started with Amazon ECS Anywhere: <https://aws.amazon.com/ecs/anywhere/getting-started>
+ Amazon EKS Anywhere: <https://aws.amazon.com/eks/eks-anywhere>
+ Amazon EKS Distro: <https://distro.eks.amazonaws.com>
+ AWS Fargate: <https://aws.amazon.com/fargate>
+ Compute and EC2 Instance Savings Plans: <https://aws.amazon.com/savingsplans/compute-pricing>
+ Amazon Managed Service for Prometheus: <https://aws.amazon.com/prometheus>

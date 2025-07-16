# ECS deep dive

After completing this episode, you should be able to:

+ Explain the role of Amazon Elastic Container Service (Amazon ECS) in the container lifecycle.
+ Choose appropriate ECS container configuration options for workload needs.
+ Explain how to limit and monitor container costs in ECS.

## Key point 1

To create a container cluster, create an image, store it in a registry/repository, and then deploy in a hosting service, such as ECS.

## Key point 2

Tasks define security for containers, such as the task Identity and Access Management (IAM) role, define one or more containers, and define related resources. This is the information required for a specific application to run on containers. Services define the number of task copies, handle scaling and recovery when a task fails, and provide high-availability (HA) configuration, such as a load balancer.

## Key point 3

ECS Anywhere and Amazon Elastic Kubernetes Service (Amazon EKS) Anywhere provide options for deploying containers in a hybrid infrastructure.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ What is Amazon Elastic Container Service? <https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome>
+ Container Migration Methodology: <https://d1.awsstatic.com/whitepapers/container-migration-methodology.pdf?did=wp_card&trk=wp_card>

# Cloud-native design

After completing this episode, you should be able to:

+ Compare monolithic application design with decoupled, microservice application design.
+ Explain the role of Application Programming Interfaces (APIs) in application design.
+ Explain how multi-tier architectures and event-driven architectures support cloud-native network design.

## Key point 1

Cloud-native design decouples system components to function as microservices.

## Key point 2

Purpose-built Amazon Web Services (AWS) services can be selected to support each individual microservice.

## Key point 3

Event-driven architecture relies on events to trigger actions and communication between microservices and other resources.

## Key point 4

A multi-tier architecture places resources in subnets according to the types of security protections that the resources need. An example is the placement of databases in a private subnet with no access to the internet, while web servers might reside in a public subnet with direct access from the internet. Specifically, a three-tier architecture defines the presentation (client) tier, the logic (server) tier, and the data (database) tier.

## Key point 5

The Well-Architected Framework defines standards for AWS deployments related to operational excellence, security, reliability, performance, cost optimization, and sustainability.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ What is an Event-Driven Architecture? <https://aws.amazon.com/event-driven-architecture>
+ Three-tier architecture overview: <https://docs.aws.amazon.com/whitepapers/latest/serverless-multi-tier-architectures-api-gateway-lambda/three-tier-architecture-overview>
+ AWS Well-Architected Framework links:
  + AWS Well-Architected: <https://aws.amazon.com/architecture/well-architected>
  + AWS Well-Architected Framework: <https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome>
  + AWS Well-Architected Tool: <https://aws.amazon.com/well-architected-tool>
+ Purpose-built AWS services:
  + AWS Cloud Databases: <https://aws.amazon.com/products/databases>
  + Web Hosting Services on AWS: <https://aws.amazon.com/websites>
  + Discover, deploy, and manage software that runs on AWS: <https://aws.amazon.com/marketplace>

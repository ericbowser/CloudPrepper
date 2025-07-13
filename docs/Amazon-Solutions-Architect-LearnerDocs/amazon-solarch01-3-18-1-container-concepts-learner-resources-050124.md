## Container concepts

After completing this episode, you should be able to:

+ Explain what containers are and the basics of how they work.
+ Compare Amazon Web Services (AWS) container services.
+ Describe when containers are the appropriate compute selection for a workload.

## Key point 1

To configure a container cluster, you start with an operating system (OS) image, often created in Docker. The image includes required components from a specific OS. When deployed as an active container, the image adds a read/write layer at the top that is the only difference between containers deployed from that image.

## Key point 2

A container registry is a collection of container repositories. A container repository is a collection of related container images. Registries and repositories can be public or private. Repositories include a method of source control and versioning. Vendor images obtained from public registries might include support services.

## Key point 3

Container hosting can be accomplished with Docker Swarm, Kubernetes, or AWS's ECS (good for smaller deployments) or EKS (good for larger or hybrid deployments--this is essentially managed Kubernetes in AWS).

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Lab to break monolithic application into microservices: <https://aws.amazon.com/getting-started/hands-on/break-monolith-app-microservices-ecs-docker-ec2/?contd_bm3>

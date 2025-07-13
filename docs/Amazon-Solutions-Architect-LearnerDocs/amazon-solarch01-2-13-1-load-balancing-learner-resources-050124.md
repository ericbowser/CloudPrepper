# Load balancing

After completing this episode, you should be able to:

+ Explain how load balancing works.
+ Compare Amazon Web Services (AWS) load balancing services and configuration options.
+ Choose an appropriate load-balancing strategy for a given scenario.

## Key point 1

Elastic Load Balancers can be Application Load Balancers, Network Load Balancers, or Gateway Load Balancers. Network Load Balancers function at layer 4, target IP addresses/instances/other load balancers, and provide high-speed performance.

## Key point 2

Application Load Balancers function at layer 7, can route to specific and multiple ports on a target, can route to Lambda, and can handle user authentication processes.

## Key point 3

Gateway Load Balancers direct traffic to a virtual private cloud (VPC) endpoint. It's a transparent device, sometimes called a *bump in the line*.

## Key point 4

Load Balancer architecture includes listeners, rules, actions, target groups, and health checks.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Load Balancer types:
  + Elastic Load Balancing: <https://aws.amazon.com/elasticloadbalancing>
  + Elastic Load Balancing features: <https://aws.amazon.com/elasticloadbalancing/features>
  + Data protection in Elastic Load Balancing: <https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/data-protection>
  + Elastic Load Balancing pricing: <https://aws.amazon.com/elasticloadbalancing/pricing>

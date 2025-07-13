# VPC deep dive

After completing this episode, you should be able to:

+ Design IP address spaces and subnets in Amazon Web Services (AWS).
+ Manage route tables in virtual private clouds (VPCs) to control traffic into and out of network spaces.
+ Design network topologies to support various system architectures.

## Key point 1

Resources in a public subnet must have a route to an internet gateway and a public IP address to access the internet. The public IP address is assigned to an instance's virtual network interface, not within the operating system (OS). Resources in a private subnet must have a route to a network address translation (NAT) gateway, which should have its own public IP address and a route to an internet gateway for the private subnet resources to have access to the Internet.

## Key point 2

Each VPC has a main route table that subnets can use. Every subnet must have exactly one route table associated with it. Each route table can be associated with multiple subnets. When evaluating traffic, the most specific route applies.

## Key point 3

You can use VPC peering connections or a transit gateway to connect VPCs across regions. VPC peering is a one-to-one connection that isn't transitive. A transit gateway is more scalable to support multiple connections to VPCs and other networks.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Amazon Virtual Private Cloud Documentation: <https://docs.aws.amazon.com/vpc>
+ Configure route tables: <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables>
+ AWS Transit Gateway: <https://aws.amazon.com/transit-gateway>
+ Hybrid Cloud with AWS: <https://aws.amazon.com/hybrid>

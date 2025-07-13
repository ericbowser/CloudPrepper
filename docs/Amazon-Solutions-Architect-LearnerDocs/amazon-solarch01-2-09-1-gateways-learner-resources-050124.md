# A deep dive on gateways

After completing this episode, you should be able to:

+ Explain the purpose of network address translation (NAT) gateways.
+ Compare NAT gateways and NAT instances.
+ Explain the purpose of Transit Gateway.
+ Describe the role of internet gateways in network segmentation.
+ Identify virtual private network (VPN) gateway types.

## Key point 1

Internet Gateways (IGWs) are inherently redundant and highly available. Create a route in a public subnet's route table to send internet traffic to the IGW. An IGW is automatically included in your default virtual private cloud (VPC) in a region. However, you'll have to create one for nondefault VPCs. With IPv4 traffic, the IGW also provides NAT services.

## Key point 2

NAT gateways provide a route to the internet for resources in private subnets while protecting those resources from incoming traffic. A NAT gateway resides in an Availability Zone is a single point of failure. For IPv6 traffic, an egress-only IGW can support outgoing traffic only to provide protected access from private subnet resources to the internet in lieu of a NAT gateway.

## Key point 3

A Transit Gateway can connect VPCs and on-prem networks through VPNs or Direct Connect. It can also peer with another Transit Gateway. Routes propagate across attachments through Border Gateway Protocol (BGP). You only need one Transit Gateway per region.

## Key point 4

For VPNs, a virtual private gateway is attached to a VPC and requires a private autonomous system number (ASN). A customer gateway resource is also created in AWS to represent the physical device in the customer's on-premises network.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ NAT gateways: <https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway>
+ NAT instances: <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance>
+ Transit Gateway:
  + What is a transit gateway? <https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway>
  + Hybrid Cloud with AWS: <https://aws.amazon.com/hybrid>
+ How AWS Site-to-Site VPN works: <https://docs.aws.amazon.com/vpn/latest/s2svpn/how_it_works>

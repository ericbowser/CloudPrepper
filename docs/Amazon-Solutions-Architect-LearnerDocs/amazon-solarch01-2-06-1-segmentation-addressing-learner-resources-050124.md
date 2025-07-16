# Network segmentation and addressing

After completing this episode, you should be able to:

+ Explain the role of IP addressing in networks.
+ Use subnet tiers to segment network spaces.
+ Describe the organization of the AWS Solutions Architect exam objectives.
+ Explain how Domain Name System (DNS) and Dynamic Host Configuration Protocol (DHCP) network services support IP addressing.
5. Describe network address translation (NAT).

## Key point 1

Addressing at various layers of the Open Systems Interconnection (OSI) model include media access control (MAC) addresses at the Data Link layer, IP addresses at the Network layer, and Transmission Control Protocol (TCP) or User Datagram Protocol (UDP) ports at the Transport layer. Public IP addresses can be used for communication on the Internet, while private IP addresses cannot. Private IP address ranges include 10.0.0.0 through 10.255.255.255, 172.16.0.0 through 172.31.255.255, and 192.168.0.0 through 192.168.255.255.

## Key point 2

The DNS is used to resolve website addresses to IP addresses. In AWS, Route 53 can be used to provide this service. DHCP is used to assign IP addresses within a network space. DHCP configurations are provided by DHCP option sets in AWS, and DHCP option sets can also be used to assign DNS servers to instances based on the virtual private cloud (VPC).

## Key point 3

Subnetting is the process of dividing IP address spaces for subnets in a network space. Internet gateways can be used to provide internet connectivity to public subnets, and NAT gateways can be used for internet connectivity to private subnets.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).
# Network Services

After completing this episode, you should be able to:

+ Discuss the various network services that are typically made available in cloud 

**Description:** In this episode, you will learn about just some of the network services that are made available virtually in the cloud. These components include virtual private clouds, subnets, VLANs, and more.    

## Network Services        

Virtual Private Cloud - A Virtual Private Cloud (VPC) is a logically isolated section of a public cloud provider's infrastructure where users can deploy their virtual networks, subnets, and resources with customizable network configurations. By offering dedicated resources and network segmentation, VPCs enable organizations to create secure and scalable environments within the public cloud, ensuring data privacy, network isolation, and controlled access to cloud resources.

VPC Peering - VPC peering in cloud networking enables direct communication between Virtual Private Clouds (VPCs) within the same cloud provider's infrastructure, allowing seamless exchange of traffic without traversing the public internet. This facilitates interconnectivity between different VPCs, enabling organizations to build complex architectures and share resources while maintaining network isolation and security boundaries.

VPC Transit Gateway - A VPC transit gateway in cloud networking acts as a centralized hub that facilitates communication between multiple Virtual Private Clouds (VPCs) and on-premises networks, streamlining network connectivity and management across complex architectures. By providing scalable and efficient routing between interconnected networks, VPC transit gateways simplify network configuration, improve performance, and enhance security in cloud environments.

Subnets - A subnet in cloud networking is a segmented portion of an IP network, typically within a Virtual Private Cloud (VPC), that contains a subset of available IP addresses reserved for specific purposes or resource allocation. Subnets enable organizations to organize and manage their cloud resources efficiently, facilitating network segmentation, security, and efficient resource utilization within the cloud environment.

VLANs - VLANs, or Virtual Local Area Networks, in cloud networking are logical segmentation of a physical network into distinct broadcast domains, allowing for isolation and control of network traffic within a cloud environment. By assigning devices to VLANs based on their function, VLANs facilitate efficient resource utilization, security policies, and network management in cloud-based infrastructures.

SDN - Software-Defined Networking (SDN) is a networking approach that separates the control plane from the data plane, allowing network administrators to centrally manage and orchestrate network resources through software-based controllers. By decoupling network intelligence from physical infrastructure, SDN enables dynamic and programmable network configurations, improving agility, scalability, and automation in modern network environments.

BGP - BGP, or Border Gateway Protocol, is a standardized routing protocol used to exchange routing information between different autonomous systems (ASes) on the internet. It enables routers to dynamically learn and advertise the best paths to reach destination networks, facilitating scalable and efficient routing across diverse network topologies.

Static routes - Static routes are manually configured routes in a network device's routing table that specify how to reach specific destination networks. Unlike dynamic routing protocols, static routes do not dynamically adapt to changes in network topology and require manual intervention to update, making them suitable for simple network configurations with stable routes.

Route tables - Route tables are tables maintained by network devices that contain information about the best paths to reach destination networks, including next-hop routers and interface associations. By using routing protocols or static configurations, route tables enable routers to make forwarding decisions and efficiently route packets through the network.

## Additional resources

+ Amazon Virtual Private Cloud: <https://aws.amazon.com/vpc/>
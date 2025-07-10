# Network Types

After completing this episode, you should be able to:

+ Discuss network types seen today in virtualization environments   

**Description:** In this episode, you will learn about network types often seen in virtualized environments. This includes a discussion of overlay networks and virtual machine (VM) networks.       

## Network Types      

Overlay network - a virtual network that is built on top of an existing physical network infrastructure, enabling the creation of logical connections and the implementation of network services without altering the underlying hardware. This is achieved by encapsulating the overlay network's data packets inside the standard packets of the underlying network, allowing for features such as enhanced security, improved scalability, and efficient resource management. Overlay networks are commonly used in applications such as virtual private networks (VPNs), content delivery networks (CDNs), and peer-to-peer (P2P) networks, providing a flexible and adaptable way to optimize network performance and functionality beyond the capabilities of the base infrastructure.

Virtual machine (VM) networks - specialized network configurations that enable communication between virtual machines within a virtualized environment. These networks are established through software-defined networking (SDN) within a hypervisor, allowing VMs to interact as if they were part of a physical network, despite being hosted on a single or multiple physical servers. VM networks provide isolation, security, and flexibility, supporting various network topologies and facilitating the management of network resources dynamically. They allow for advanced features such as VLANs (Virtual Local Area Networks), which segment traffic to enhance security and efficiency, and virtual network interfaces, which enable VMs to connect to both internal and external networks seamlessly. This setup is crucial in data centers and cloud computing environments, where resource optimization and agility are paramount.

## Additional resources

+ Overlay Networks: <https://www.techtarget.com/searchnetworking/definition/overlay-network>
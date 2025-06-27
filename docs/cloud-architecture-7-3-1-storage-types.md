# Storage Types

After completing this episode, you should be able to:

+ Discuss various storage types used in virtualization environments   

**Description:** In this episode, you will learn about some of the various storage types that are found in virtualized environments today. These include local storage, network attached storage (NAS), and storage area network (SAN) type technologies.       

## Storage Types      

Local storage - in a virtualized server environment, local storage refers to the use of physical storage devices, such as hard drives or SSDs, that are directly attached to the physical servers hosting the virtual machines (VMs). This type of storage is leveraged to store VM images, data, and applications, offering high performance and low latency due to its proximity to the compute resources. Local storage is particularly beneficial for workloads that require fast data access and minimal latency, such as databases and high-performance applications. However, it lacks the flexibility and redundancy provided by network-attached storage (NAS) or storage area networks (SANs). To mitigate this, virtualization platforms often incorporate features like storage virtualization and replication to enhance reliability and availability, ensuring that VMs can maintain continuity and performance even if a single physical storage device fails.

Network attached storage (NAS) - in a virtualized server environment, a Network-Attached Storage (NAS) system provides centralized, shared storage accessible over the network, enabling multiple virtual machines (VMs) to store and retrieve data efficiently. NAS offers several advantages, including simplified storage management, enhanced data sharing, and improved scalability, as storage capacity can be easily expanded without disrupting the VMs. This centralized approach also facilitates data backup, disaster recovery, and high availability, ensuring that critical data remains accessible and protected. By decoupling storage from individual physical servers, NAS helps optimize resource utilization and supports dynamic workload management in virtualized environments.

Storage area network (SAN) - in a virtualized server environment, a Storage Area Network (SAN) provides a high-performance, highly available, and scalable storage solution by connecting multiple servers to a centralized pool of storage devices over a dedicated network. SANs are designed for speed and efficiency, supporting demanding applications and large-scale virtual machine (VM) deployments with minimal latency and high throughput. They enable advanced storage management features such as snapshots, replication, and thin provisioning, which enhance data protection, disaster recovery, and resource utilization. By decoupling storage from individual physical servers, SANs facilitate flexible and dynamic allocation of storage resources, improving overall system efficiency and scalability in virtualized infrastructures.

## Additional resources

+ What is a SAN: <https://www.snia.org/education/storage_networking_primer/san/what_san>
# Networking concepts

After completing this episode, you should be able to:

+ Describe the open systems intercommunication (OSI) model.
+ Compare regions and availability zones in the Amazon Web Services (AWS) global infrastructure.
+ Identify commonly-used network protocols and their ports.
+ Explain how route tables support routing in AWS.
+ Describe basic load balancing and proxy concepts.

## Key point 1

Network protocols function as various layers in the OSI model. Many of these protocols are identified by specific port numbers. Secure versions of protocols use different ports than their non-secure versions. For example, HTTP uses port 80 while HTTPS uses port 443.

## Key point 2

Routing connects devices across networks. If a device doesn't know where to find a packet's destination device, the packet is sent to the default gateway for that network. Gateway devices (i.e., routers) use route tables to find destination networks.

## Key point 3

AWS offers many regions throughout the world. Each region contains multiple Availability Zones (AZs). Edge Locations place AWS infrastructure closer to users.

## Key point 4

Load balancers are used to distribute traffic across nodes in a cluster, which supports cloud scalability. Common load-balancing algorithms include round robin, least connections, least time, and weighted, which is a form of round robin.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

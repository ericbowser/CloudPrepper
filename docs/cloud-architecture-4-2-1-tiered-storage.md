# Tiered Storage

After completing this episode, you should be able to:

+ Discuss storage tiering in cloud environments  

**Description:** In this episode, you will learn about the ability to tier storage using cloud-based technologies. This includes a discussion of various tiers including hot, warm, cold, and archive storage.      

## Tiered Storage      

Storage tiering in cloud environments involves categorizing data based on its access frequency and performance requirements, with different tiers offering varying levels of performance and cost. By dynamically moving data between tiers based on usage patterns, organizations can optimize storage costs while ensuring that data remains accessible and responsive to application needs.

Typical storage tiers include: 

+ Hot - A hot storage tier refers to a high-performance storage layer optimized for frequently accessed data that requires low-latency access and high throughput.
+ Warm - A warm storage tier denotes a storage layer designed for data that is accessed less frequently than hot data but still requires moderate performance and relatively fast access times.
+ Cold - A cold storage tier is a low-cost storage layer intended for long-term retention of infrequently accessed data that prioritizes cost-efficiency over immediate accessibility or performance.
+ Archive - An archive storage tier is a cost-effective storage solution designed for long-term retention of data that is rarely accessed and requires minimal performance, often with additional features for compliance and data preservation.

## Additional resources

+ Storage Classes: <https://cloud.google.com/storage/docs/storage-classes>
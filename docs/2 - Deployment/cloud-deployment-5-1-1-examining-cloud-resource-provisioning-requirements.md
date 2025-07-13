# 5-1-1: Examining Cloud Resource Provisioning Requirements

After completing this episode, you should be able to:

+ Identify and explain the appropriate cloud resource provisioning solution, given a scenario.

**Description:** In this episode, the learner will examine scenarios for provisioning requirements in the cloud. We will explore examples of computing, networking, storage, availability, compliance, and security requirements.


+ **Scenario 1**
  + A cloud storage solution is experiencing high costs due to inefficient use of resources. Which of the following is the best strategy to reduce costs while maintaining operational efficiency?
    1. Increase storage redundancy to ensure data safety in all scenarios.
    2. Migrate data to a high-performance storage tier to improve access times.
    3. Implement data compression and deduplication to minimize storage space.
    4. Replicate all data across multiple regions to enhance availability.
  + **Answer:** 3. Implement data compression and deduplication to minimize storage space.
  + **Explanation** This strategy reduces the overall storage footprint by compressing files and removing redundant data, helping to reduce costs while optimizing efficiency.
+ **Scenario 2**
  + An e-commerce platform is experiencing slow response times due to network congestion and insufficient computing resources. What is the best strategy to improve both network and compute performance while minimizing costs?
    1. Upgrade to a higher bandwidth network and increase the compute resources to handle the increased load.
    2. Use a Content Delivery Network \(CDN\), auto-scaling, and automation to adjust resources dynamically and offload network traffic.
    3. Implement network redundancy and deploy additional servers to avoid single points of failure.
    4. Move the platform to a cloud region with better infrastructure to improve performance.
  + **Answer:** 2. Use a Content Delivery Network \(CDN\), auto-scaling, and automation to adjust resources dynamically and offload network traffic.
  + **Explanation:** This strategy combines content caching, dynamic scaling of compute resources, and automation to automatically adjust capacity based on traffic patterns. This approach optimizes both network and compute resources, ensuring efficient performance while controlling costs.
+ **Scenario 3**
  + A healthcare organization is transitioning to a cloud-based system to store sensitive patient data, ensuring compliance with GDPR and HIPAA. Which of the following strategies would best meet the security and compliance requirements?
     1. Implement end-to-end encryption and maintain audit logs for all data access and changes.
     2. Increase password complexity requirements for system access.
     3. Regularly update antivirus software on all client machines.
     4. Conduct bi-annual security training for all employees.
  + **Answer:** 1. Implement end-to-end encryption and maintain audit logs for all data access and changes.
  + **Explanation:** Implementing end-to-end encryption ensures that data is secured at all stages of its lifecycle. Encryption will be crucial for meeting the strict data protection requirements of GDPR and HIPAA. Maintaining audit logs helps track data access and changes, further ensuring compliance and the ability to verify security measures are effective. Answers 2, 3, and 4 are all security practices but not the best choices.
+ **Scenario 4**
  + A technology company relies on cloud-based services for critical business operations. It needs to ensure high availability of resources according to the Recovery Time Objective \(RTO\) in its business continuity and disaster recovery \(BCDR\) plan. Which of the following strategies best meets these availability goals while managing costs?
    1. Implement a multi-region failover strategy with automated replication and redundancy to ensure availability in case of regional failures.
    2. Use a load balancer with automated scaling and backups to maintain service continuity during peak traffic times.
    3. Perform regular manual backups to external storage devices to ensure data is not lost during outages.
    4. Use a single region with a high-availability setup for cost-effective redundancy.
  + **Answer:** 1. Implement a multi-region failover strategy with automated replication and redundancy.
  + **Explanation:** A multi-region failover strategy with automated replication and redundancy provides robust availability by ensuring resources are duplicated across regions. This approach offers the best balance of cost and acceptable RTO, allowing for quick recovery during regional failures.

  
  
  
## Additional References

+ The scenarios above covered the following cloud resource provisioning considerations:
  + Scenario 1 - storage, performance, and cost requirements
  + Scenario 2 - compute, networking, and automation requirements
  + Scenario 3 - security and compliance requirements
  + Scenario 4 - availability and cost requirements

 
  


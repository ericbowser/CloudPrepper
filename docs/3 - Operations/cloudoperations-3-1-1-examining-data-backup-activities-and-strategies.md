# 3-1-1: Examining Data Backup Activities and Strategies

After completing this episode, you should be able to:

+ Identify and explain the significance of implementing backup strategies, given a scenario.

**Description:** In this episode, the learner will examine strategies used in data backups, such as scheduling, replication, backup locations, and testing. We will also explore backup retention strategies, such as Grandfather-Father-Son (GFS), Tower of Hanoi, time-based retention, and more.


+ Describe common activities and components of data backups
  + Scheduling
    + Regularly scheduled backups ensure data is frequently updated and reflects recent changes, minimizing potential data loss in a recovery scenario.
  + Replication  
    + Replicating backups in multiple locations, including across different cloud regions or providers, increases redundancy and resilience against data loss.
  + Backup locations  
    + On-Site - Backups stored on-site offer quick access for recovery but can be vulnerable to local disasters\.  
    + Off-Site - Storing backups at a different location enhances data safety by protecting against site-specific risks.
  + Backup encryption  
    + Crucial for protecting sensitive information against unauthorized access, both at rest and during transmission.
  + Backup testing  
    + Ensuring data recoverability
      + Regular tests of backup systems are essential, ensuring data can be effectively restored when needed.  
    + Maintaining data integrity 
      + Checking the integrity of backups confirms that the data is accurate and has not been corrupted during storage or transfer.
+ Describe the significance of backup retention
  + Defines how long backup copies are kept before being deleted or archived, balancing between accessibility, compliance requirements, and cost of storage.
+ Describe backup retention strategies
  + Grandfather-Father-Son \(GFS\)
    + This is a popular method for managing backup cycles. 
    + It involves three levels of backups: daily \(son\), weekly \(father\), and monthly \(grandfather\).
    + This strategy helps in reducing the storage space by having less frequent backups as the data ages, while still allowing for different recovery points.
  + Tower of Hanoi
    + A complex scheme sequences of backups based on the mathematical puzzle,  so newer ones are more frequent.
    + Lengthens retention periods without proportionately expanding storage requirements;
    + Optimizes storage use by reducing the frequency of older backups.
  + Time-based retention
    + A straightforward approach simply retaining backups for a defined period, such as 30, 60, or 90 days. 
    + Backups are automatically deleted or archived after this period. 
    + Suitable for environments where regulatory requirements define data retention periods.
  + Legal and compliance-driven retention
    + Often, the retention periods are dictated by legal or compliance requirements specific to an industry or type of data. For example, financial records need to be kept for a minimum number of years according to regulatory standards.

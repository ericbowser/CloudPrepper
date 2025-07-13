# 3-2-1: Examining Backup Types

After completing this episode, you should be able to:

+ Identify and explain data backup types, given a scenario

**Description:** In this episode, the learner will examine backup types such as full, incremental, and differential backups. We will also explore archive attributes, the pros and cons of choosing a backup type, and more.

+ Describe the significance of the archive bit in backups
  + A file attribute used by some backup software to indicate whether a file has been modified since the last backup, helping to determine which files need to be included in differential and incremental backups.
  + Viewing archive bits using Windows Command Prompt
    ```
    attrib <filename>.txt
    
    attrib doc1.txt
    ```
+ Describe common backup types
  + Full Backup  
    + Captures all files and data within a system at the point of backup.
    + Archive bit
      + Does not rely on the archive bit, copies all data regardless of changes.  
    + Usage
      + It is the most comprehensive type of backup available.
    + Pros - Simplifies recovery as it contains a complete dataset.  
    + Cons - Requires substantial storage space and longer execution time, increasing operational costs.
  + Incremental Backup  
    + Backs up only the files that have changed since the last backup
    + Archive bit
      + Utilizes the archive bit to identify modified files. 
    + Usage
      + This method only captures the changes made after the most recent backup, making it highly efficient in terms of storage.  
    + Pros - Faster and uses less storage space than full backups.  
    + Cons - Restoration can be time-consuming as it requires the last full backup and all subsequent incremental backups.
  + Differential Backup  
    + Stores all changes made since the last full backup
    + Archive bit
      + Utilizes the archive bit to determine which files have changed during the period. 
    + Usage
      + A balance \(or compromise\) between full and incremental backups, offering moderate storage accrual
    + Pros - Quicker recovery than incremental as only the last full backup and the last differential backup are needed.  
    + Cons - Uses more storage than incremental backups, as data volume can grow until the next full backup.
  + Incremental Forever
    + Uses a full backup initially, and from that point onwards, only incremental backups are made. 
    + Older incremental backups are consolidated over time. 
    + Can significantly reduce storage needs but may require more complex management to ensure data recoverability.
+ Describe snapshots 
  + A read-only point-in-time copy of a data set or disk state, often used for virtual environments
  + Archive bit
    + Snapshots do not directly interact with the archive bi
  + Usage
    + Serve as a quick reference point for system states and changes.  
  + Pros - Quick to create and often used for system restores, testing, or backup verifications.  
  + Cons - Not a substitute for traditional backups, as they depend on the source data's integrity.
+ Describe the role backups play in an RPO
  + Recovery Point Objective \(RPO\) - the maximum amount of data you can afford to lose if there's a failure
  + The RPO defines how often to back up the company's data to ensure that you can recover your files and keep your operations running smoothly.
  + Aligning backup intervals and methods with RPO ensures that data loss is minimized, supporting rapid recovery and maintaining continuity in business operations.

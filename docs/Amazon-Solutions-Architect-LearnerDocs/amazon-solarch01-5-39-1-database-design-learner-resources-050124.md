# Database design

After completing this episode, you should be able to:

+ Explain common database design structures..
+ Describe the role of a primary key and an index in managing data stored in a database.
+ Compare database access patterns.
+ Explain how caching can be used to increase database performance.

## Key point 1

A database's capacity is determined by its structure, its allocated storage space, and its allocated throughput. Configuration options for database hosting, such as choosing an instance type or choosing provisioned input/output operations per second (IOPS), help determine that database's overall performance capacity.

## Key point 2

Database access patterns might be write-intensive, measured in write capacity units (WCUs), or read-intensive, measured in read capacity units (RCUs). Each emphasis requires different configurations to optimize performance and costs.

## Key point 3

Read replicas can increase a database's read performance, but not its write performance). Read replicas are often placed in different Availability Zones or even different Regions from the primary database. In contrast, database caching can improve both read and write performance by storing portions of the database's data in a cache, closer to the point of use. Caching types include in-database (integrated in Aurora), in-app (isolated when spread across multiple instances), and remote (offered by ElastiCache).

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Database Caching: <https://aws.amazon.com/caching/database-caching>
+ Types of database caching: <https://docs.aws.amazon.com/whitepapers/latest/database-caching-strategies-using-redis/types-of-database-caching>
+ Amazon ElastiCache: <https://aws.amazon.com/elasticache>
+ Comparing Redis and Memcached: <https://aws.amazon.com/elasticache/redis-vs-memcached>

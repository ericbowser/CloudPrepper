# Other database services

After completing this episode, you should be able to:

+ Compare database services in Amazon Web Services (AWS).
+ Compare database migration strategies.
+ Choose an appropriate database engine for a given scenario.

## Key point 1

Amazon DocumentDB is used to store, query, and index JSON data. You can use Amazon Web Services (AWS) Database Migration Service (DMS) to migrate from MongoDB to DocumentDB. Use the same MongoDB drivers and tools with little or no modification.

## Key point 2

Amazon Keyspaces is used to store:

+ Keyspaces, which are collections of tables that represent table groupings.
+ App data, such as user profile information, internet of things (IoT) device metadata, or event records.
+ Time series data, such as log entries or chat message history. 

Keyspaces uses Cassandra Query Language (CQL).

## Key point 3

Neptune supports highly connected datasets called graph databases, such as recommendation engines, fraud detection, knowledge graphs, drug discovery, and network security. Neptune is ACID-compliant with immediate consistency. *ACID* is short for *Atomicity, Consistency, Isolation, and Durability*.

## Key point 4

Quantum Ledge Database (QLDB) is an append-only, ledger database service that provides a transparent, immutable, cryptographically verifiable transaction log. It is not blockchain or a distributed ledger, because there is only a single owner, but it is deployed with multiple copies in multiple Availability Zones (AZs).

## Key point 5

Redshift if a data warehousing service that can be used to analyzed data across databases, data lakes, other data warehouses, and third-party datasets.

## Key point 6

Timestream supports storage of a sequence of data points over time for constantly shifting states, such as stock prices, temperature measurements, or CPU utilization. Timestream keeps recent data in memory for quick access, and moves historical data to a cost-optimized storage tier.

## Key point 7

Database Migration Service (DMS) is used to move database schemas and data to different locations or even different database engines. It can be used alone or in conjunction with AWS Migration Hub and AWS Application Migration Service.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Amazon DocumentDB (with MongoDB compatibility): <https://aws.amazon.com/documentdb>
+ Amazon Keyspaces (for Apache Cassandra): <https://aws.amazon.com/keyspaces>
+ What is Apache Cassandra: <https://aws.amazon.com/keyspaces/what-is-cassandra>
+ Amazon Neptune: <https://aws.amazon.com/neptune>
+ Amazon Quantum Ledger Database: <https://aws.amazon.com/qldb>
+ Amazon Redshift: <https://aws.amazon.com/redshift>
+ Amazon Timestream: <https://aws.amazon.com/timestream>
+ AWS Database Migration Service: <https://aws.amazon.com/dms>
+ AWS Migration Hub: <https://aws.amazon.com/migration-hub>

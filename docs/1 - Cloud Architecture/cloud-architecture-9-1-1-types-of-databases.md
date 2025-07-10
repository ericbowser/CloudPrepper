# Types of Databases

After completing this episode, you should be able to:

+ Discuss the different types of databases that are found in cloud environments today 

**Description:** In this episode, you will learn about the variety of databases in use in cloud technologies today. This includes a discussion of relational and non-relational databases.       

## Types of Databases       

Relational databases - relational databases are a type of database management system (DBMS) that store data in structured formats using tables, which are composed of rows and columns. Each table, representing a specific entity type, can be linked to others through foreign keys, establishing relationships between different data entities. This model supports SQL (Structured Query Language) for defining, manipulating, and querying data, enabling efficient organization, retrieval, and integrity of data. Relational databases ensure data accuracy and consistency through constraints, such as primary keys, and support transactions to maintain data integrity in multi-user environments. Examples include MySQL, PostgreSQL, and Oracle Database.

NoSQL databases - NoSQL databases are a class of database management systems designed to handle large volumes of unstructured or semi-structured data, providing flexible schemas and scalability beyond the capabilities of traditional relational databases. They eschew the fixed table structure of relational databases, instead offering diverse data models including document, key-value, column-family, and graph formats. NoSQL databases are optimized for distributed systems, enabling horizontal scaling across many servers, which makes them ideal for big data applications and real-time web analytics. They prioritize performance, availability, and fault tolerance, often at the expense of immediate consistency. 

Time-based databases - time-based databases, also known as time series databases, are specialized databases optimized for storing, querying, and analyzing time-stamped data points, which are typically generated sequentially over time. These databases are designed to efficiently handle large volumes of time series data, which can come from various sources such as IoT devices, financial transactions, server logs, and monitoring systems. They provide advanced features for time-based queries, such as aggregations, downsampling, and time windowing, which are essential for analyzing trends, patterns, and anomalies over time. Time-based databases often support high write and query performance, retention policies to manage data lifecycle, and seamless integration with data visualization tools. 

Graph databases - a graph database is a type of database designed to store and query data modeled as nodes (entities) and edges (relationships), making it ideal for handling complex, interconnected data structures such as social networks, recommendation systems, and fraud detection.

Memory cache databases - memory cache databases are high-performance data storage systems that temporarily hold frequently accessed data in memory (RAM) to accelerate read and write operations, thereby reducing latency and improving application performance. Unlike traditional disk-based databases, memory cache databases prioritize speed and are typically used to store transient data that can be quickly retrieved or updated, such as session information, user profiles, and temporary computational results. They support various caching strategies, such as Least Recently Used (LRU) and time-to-live (TTL) policies, to manage data lifecycle efficiently. Common use cases include web caching, database query results caching, and in-memory data grids. Examples of memory cache databases include Redis, Memcached, and Apache Ignite.

## Additional resources

+ Types of Databases: <https://www.geeksforgeeks.org/types-of-databases/>
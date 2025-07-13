import {Question} from "@/types/preptypes";

export const QUESTIONS: Question[] = [
    // DOMAIN 1 - CLOUD ARCHITECTURE
    {
        id: 1,
        questionNumber: 1,
        category: 'Cloud Architecture - Service Models',
        difficulty: 'Knowledge',
        domain: 'Domain 1',
        questionText: 'Which cloud service model provides virtualized computing resources over the internet, allowing users to rent servers, storage, and networking without purchasing physical hardware?',
        options: [
            { text: 'A) Software as a Service (SaaS)', isCorrect: false },
            { text: 'B) Platform as a Service (PaaS)', isCorrect: false },
            { text: 'C) Infrastructure as a Service (IaaS)', isCorrect: true },
            { text: 'D) Function as a Service (FaaS)', isCorrect: false }
        ],
        explanation: 'IaaS provides virtualized computing resources including servers, storage, and networking infrastructure.',
        explanationDetails: {
            summary: 'IaaS characteristics include:',
            breakdown: [
                'Virtualized computing resources over the internet',
                'Users rent infrastructure components rather than buying hardware',
                'Control over operating systems and applications',
                'Examples: AWS EC2, Azure VMs, Google Compute Engine'
            ],
            otherOptions: 'A) SaaS delivers complete software applications\nB) PaaS provides development platforms\nD) FaaS provides serverless function execution'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 1 clicked")
    },
    {
        id: 2,
        questionNumber: 2,
        category: 'Cloud Architecture - Shared Responsibility',
        difficulty: 'Comprehension',
        domain: 'Domain 1',
        questionText: 'In the shared responsibility model, a customer using Amazon RDS (managed database service) is responsible for which of the following?',
        options: [
            { text: 'A) Database engine patching and updates', isCorrect: false },
            { text: 'B) Physical security of the data center', isCorrect: false },
            { text: 'C) Data encryption and access control configuration', isCorrect: true },
            { text: 'D) Hardware maintenance and replacement', isCorrect: false }
        ],
        explanation: 'In managed services like RDS, customers are responsible for data security, access controls, and encryption configuration.',
        explanationDetails: {
            summary: 'Customer responsibilities in managed database services:',
            breakdown: [
                'Data encryption at rest and in transit',
                'User access management and IAM policies',
                'Network security groups and firewall rules',
                'Backup retention and recovery testing'
            ],
            otherOptions: 'A) AWS manages engine patching\nB) AWS handles physical security\nD) AWS manages hardware infrastructure'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 2 clicked")
    },
    {
        id: 3,
        questionNumber: 3,
        category: 'Cloud Architecture - Availability',
        difficulty: 'Application',
        domain: 'Domain 1',
        questionText: 'Your application requires 99.99% uptime and must survive the failure of an entire data center. Which architecture approach best meets these requirements?',
        options: [
            { text: 'A) Deploy in a single availability zone with multiple instances', isCorrect: false },
            { text: 'B) Deploy across multiple availability zones in the same region', isCorrect: true },
            { text: 'C) Use larger instance types for better reliability', isCorrect: false },
            { text: 'D) Implement only vertical scaling', isCorrect: false }
        ],
        explanation: 'Multi-AZ deployment provides data center-level fault tolerance while maintaining low latency.',
        explanationDetails: {
            summary: 'Multi-AZ deployment benefits:',
            breakdown: [
                'Survives entire data center failures',
                'Maintains low latency within region',
                'Automatic failover capabilities',
                'Meets high availability requirements (99.99%)'
            ],
            otherOptions: 'A) Single AZ cannot survive data center failure\nC) Instance size doesn\'t address availability zones\nD) Vertical scaling doesn\'t provide fault tolerance'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 3 clicked")
    },
    {
        id: 4,
        questionNumber: 4,
        category: 'Cloud Architecture - Storage',
        difficulty: 'Knowledge',
        domain: 'Domain 1',
        questionText: 'Which storage type is best suited for frequently accessed data requiring low latency and high throughput?',
        options: [
            { text: 'A) Cold storage tier', isCorrect: false },
            { text: 'B) Archive storage tier', isCorrect: false },
            { text: 'C) Hot storage tier', isCorrect: true },
            { text: 'D) Warm storage tier', isCorrect: false }
        ],
        explanation: 'Hot storage tier is optimized for frequently accessed data with low latency requirements.',
        explanationDetails: {
            summary: 'Hot storage characteristics:',
            breakdown: [
                'Optimized for frequent access patterns',
                'Provides low latency data retrieval',
                'Higher cost but better performance',
                'Ideal for production application data'
            ],
            otherOptions: 'A) Cold storage for infrequent access\nB) Archive for long-term retention\nD) Warm storage for moderate access'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 4 clicked")
    },

    // DOMAIN 2 - DEPLOYMENTS  
    {
        id: 5,
        questionNumber: 5,
        category: 'Deployments - Migration Types',
        difficulty: 'Comprehension',
        domain: 'Domain 2',
        questionText: 'Which migration strategy involves moving applications to the cloud with minimal changes, often called "lift and shift"?',
        options: [
            { text: 'A) Rehosting', isCorrect: true },
            { text: 'B) Refactoring', isCorrect: false },
            { text: 'C) Rearchitecting', isCorrect: false },
            { text: 'D) Rebuilding', isCorrect: false }
        ],
        explanation: 'Rehosting (lift and shift) moves applications to cloud with minimal modification.',
        explanationDetails: {
            summary: 'Rehosting characteristics:',
            breakdown: [
                'Minimal application changes required',
                'Fastest migration approach',
                'Lower initial cost and complexity',
                'May not fully utilize cloud benefits'
            ],
            otherOptions: 'B) Refactoring modifies applications for cloud\nC) Rearchitecting redesigns for cloud-native\nD) Rebuilding creates new applications'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 5 clicked")
    },
    {
        id: 6,
        questionNumber: 6,
        category: 'Deployments - Infrastructure as Code',
        difficulty: 'Application',
        domain: 'Domain 2',
        questionText: 'Your team needs to deploy identical environments across development, staging, and production. Which approach ensures consistency and reduces manual errors?',
        options: [
            { text: 'A) Manual deployment through cloud console', isCorrect: false },
            { text: 'B) Infrastructure as Code (IaC) templates', isCorrect: true },
            { text: 'C) Copying virtual machine images', isCorrect: false },
            { text: 'D) Using different configurations for each environment', isCorrect: false }
        ],
        explanation: 'IaC templates ensure consistent, repeatable, and version-controlled infrastructure deployments.',
        explanationDetails: {
            summary: 'IaC benefits for environment consistency:',
            breakdown: [
                'Version-controlled infrastructure definitions',
                'Automated and repeatable deployments',
                'Eliminates configuration drift',
                'Enables testing of infrastructure changes'
            ],
            otherOptions: 'A) Manual processes are error-prone\nC) VM images don\'t cover full infrastructure\nD) Different configs create inconsistency'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 6 clicked")
    },

    // DOMAIN 3 - OPERATIONS
    {
        id: 7,
        questionNumber: 7,
        category: 'Operations - Scaling',
        difficulty: 'Application',
        domain: 'Domain 3',
        questionText: 'Your web application experiences predictable traffic spikes every weekday from 9 AM to 5 PM. Which scaling approach would be most cost-effective?',
        options: [
            { text: 'A) Vertical scaling with larger instances', isCorrect: false },
            { text: 'B) Horizontal auto-scaling based on schedule and metrics', isCorrect: true },
            { text: 'C) Manual scaling during business hours', isCorrect: false },
            { text: 'D) Keeping maximum capacity running at all times', isCorrect: false }
        ],
        explanation: 'Scheduled auto-scaling with metric triggers optimizes both cost and performance for predictable patterns.',
        explanationDetails: {
            summary: 'Auto-scaling advantages for predictable traffic:',
            breakdown: [
                'Proactive scaling before traffic spikes',
                'Automatic scale-down during off-hours',
                'Combines scheduled and reactive scaling',
                'Optimizes cost while maintaining performance'
            ],
            otherOptions: 'A) Vertical scaling requires downtime\nC) Manual scaling is reactive and error-prone\nD) Maximum capacity wastes money during off-hours'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 7 clicked")
    },
    {
        id: 8,
        questionNumber: 8,
        category: 'Operations - Monitoring',
        difficulty: 'Knowledge',
        domain: 'Domain 3',
        questionText: 'Which type of monitoring provides insights into application performance and user experience?',
        options: [
            { text: 'A) Infrastructure monitoring', isCorrect: false },
            { text: 'B) Application Performance Monitoring (APM)', isCorrect: true },
            { text: 'C) Network monitoring', isCorrect: false },
            { text: 'D) Security monitoring', isCorrect: false }
        ],
        explanation: 'APM focuses on application behavior, response times, and user experience metrics.',
        explanationDetails: {
            summary: 'APM monitoring includes:',
            breakdown: [
                'Application response times and throughput',
                'Error rates and exception tracking',
                'User experience and transaction traces',
                'Code-level performance insights'
            ],
            otherOptions: 'A) Infrastructure monitors servers and resources\nC) Network monitoring focuses on connectivity\nD) Security monitoring tracks threats and vulnerabilities'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 8 clicked")
    },

    // DOMAIN 4 - SECURITY
    {
        id: 9,
        questionNumber: 9,
        category: 'Security - IAM',
        difficulty: 'Application',
        domain: 'Domain 4',
        questionText: 'A developer needs temporary access to debug a production issue in a specific S3 bucket. What is the most secure approach following the principle of least privilege?',
        options: [
            { text: 'A) Add developer to administrators group', isCorrect: false },
            { text: 'B) Create IAM user with permanent S3 full access', isCorrect: false },
            { text: 'C) Create time-limited IAM role with bucket-specific permissions', isCorrect: true },
            { text: 'D) Share root account credentials', isCorrect: false }
        ],
        explanation: 'Time-limited IAM roles with specific permissions minimize security exposure while providing necessary access.',
        explanationDetails: {
            summary: 'Secure temporary access principles:',
            breakdown: [
                'Time-bound access that automatically expires',
                'Scope limited to specific resources needed',
                'No permanent credentials to manage',
                'Audit trail of role assumption'
            ],
            otherOptions: 'A) Administrative access violates least privilege\nB) Permanent access creates long-term security risk\nD) Root credentials should never be shared'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 9 clicked")
    },
    {
        id: 10,
        questionNumber: 10,
        category: 'Security - Encryption',
        difficulty: 'Comprehension',
        domain: 'Domain 4',
        questionText: 'Which encryption approach protects data while it is being transmitted between your application and cloud storage?',
        options: [
            { text: 'A) Encryption at rest', isCorrect: false },
            { text: 'B) Encryption in transit', isCorrect: true },
            { text: 'C) Database encryption', isCorrect: false },
            { text: 'D) File system encryption', isCorrect: false }
        ],
        explanation: 'Encryption in transit protects data during transmission using protocols like TLS/SSL.',
        explanationDetails: {
            summary: 'Encryption in transit protects:',
            breakdown: [
                'Data moving between client and server',
                'API calls and responses',
                'File uploads and downloads',
                'Database connections and queries'
            ],
            otherOptions: 'A) At rest protects stored data\nC) Database encryption protects stored database data\nD) File system encryption protects local storage'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 10 clicked")
    },

    // DOMAIN 5 - DEVOPS
    {
        id: 11,
        questionNumber: 11,
        category: 'DevOps - CI/CD',
        difficulty: 'Knowledge',
        domain: 'Domain 5',
        questionText: 'What is the primary purpose of Continuous Integration (CI) in a DevOps pipeline?',
        options: [
            { text: 'A) Automatically deploy to production', isCorrect: false },
            { text: 'B) Integrate code changes frequently and run automated tests', isCorrect: true },
            { text: 'C) Monitor application performance', isCorrect: false },
            { text: 'D) Manage infrastructure as code', isCorrect: false }
        ],
        explanation: 'CI focuses on frequently integrating code changes and running automated builds and tests.',
        explanationDetails: {
            summary: 'Continuous Integration benefits:',
            breakdown: [
                'Early detection of integration issues',
                'Automated build and test execution',
                'Frequent code integration reduces conflicts',
                'Faster feedback to development teams'
            ],
            otherOptions: 'A) Production deployment is Continuous Deployment\nC) Performance monitoring is separate from CI\nD) IaC management is infrastructure automation'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 11 clicked")
    },
    {
        id: 12,
        questionNumber: 12,
        category: 'DevOps - Containers',
        difficulty: 'Comprehension',
        domain: 'Domain 5',
        questionText: 'Which container orchestration approach is best for production environments requiring automated scaling and service discovery?',
        options: [
            { text: 'A) Standalone containers managed manually', isCorrect: false },
            { text: 'B) Container orchestration platform like Kubernetes', isCorrect: true },
            { text: 'C) Virtual machines with containers installed', isCorrect: false },
            { text: 'D) Containers running on a single host', isCorrect: false }
        ],
        explanation: 'Container orchestration platforms provide automated management, scaling, and service discovery for production workloads.',
        explanationDetails: {
            summary: 'Orchestration platform benefits:',
            breakdown: [
                'Automated container lifecycle management',
                'Built-in scaling and load balancing',
                'Service discovery and networking',
                'Rolling updates and rollback capabilities'
            ],
            otherOptions: 'A) Manual management doesn\'t scale for production\nC) VMs add unnecessary overhead\nD) Single host creates single point of failure'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 12 clicked")
    },

    // DOMAIN 6 - TROUBLESHOOTING
    {
        id: 13,
        questionNumber: 13,
        category: 'Troubleshooting - Performance',
        difficulty: 'Application',
        domain: 'Domain 6',
        questionText: 'Users report slow application response times. Your monitoring shows high CPU utilization but normal memory and disk usage. What should be your first troubleshooting step?',
        options: [
            { text: 'A) Increase memory allocation', isCorrect: false },
            { text: 'B) Analyze CPU-intensive processes and optimize or scale CPU resources', isCorrect: true },
            { text: 'C) Restart all application servers', isCorrect: false },
            { text: 'D) Increase disk storage capacity', isCorrect: false }
        ],
        explanation: 'High CPU utilization directly correlates with the performance issue, making CPU analysis the logical first step.',
        explanationDetails: {
            summary: 'CPU troubleshooting approach:',
            breakdown: [
                'Identify CPU-intensive processes or queries',
                'Analyze application code for optimization opportunities',
                'Consider vertical scaling for more CPU power',
                'Implement horizontal scaling to distribute load'
            ],
            otherOptions: 'A) Memory is not the bottleneck here\nC) Restart is temporary and doesn\'t address root cause\nD) Disk capacity is not related to CPU issues'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 13 clicked")
    },
    {
        id: 14,
        questionNumber: 14,
        category: 'Troubleshooting - Network',
        difficulty: 'Comprehension',
        domain: 'Domain 6',
        questionText: 'An application cannot connect to a database in another subnet. The database is running and accessible from other sources. What is the most likely cause?',
        options: [
            { text: 'A) Database server is down', isCorrect: false },
            { text: 'B) Network security group or firewall blocking the connection', isCorrect: true },
            { text: 'C) DNS resolution failure', isCorrect: false },
            { text: 'D) Application code error', isCorrect: false }
        ],
        explanation: 'Network connectivity issues between subnets typically involve security group or firewall configuration problems.',
        explanationDetails: {
            summary: 'Network troubleshooting for subnet connectivity:',
            breakdown: [
                'Check security group rules for required ports',
                'Verify network ACL configurations',
                'Ensure route table entries for subnet communication',
                'Confirm firewall rules on both source and destination'
            ],
            otherOptions: 'A) Database is confirmed running and accessible\nC) DNS would affect name resolution, not subnet connectivity\nD) Code error wouldn\'t be subnet-specific'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 14 clicked")
    },
    {
        id: 15,
        questionNumber: 15,
        category: 'Cloud Architecture - Disaster Recovery',
        difficulty: 'Application',
        domain: 'Domain 1',
        questionText: 'Your organization has an RTO of 2 hours and RPO of 30 minutes for a critical application. Which disaster recovery strategy best meets these requirements?',
        options: [
            { text: 'A) Cold site with daily backups', isCorrect: false },
            { text: 'B) Warm site with automated failover', isCorrect: true },
            { text: 'C) Hot site with real-time replication', isCorrect: false },
            { text: 'D) Backup and restore only', isCorrect: false }
        ],
        explanation: 'Warm site provides the right balance of cost and recovery time to meet 2-hour RTO requirements.',
        explanationDetails: {
            summary: 'Warm site characteristics for this scenario:',
            breakdown: [
                'Can achieve 2-hour RTO with quick startup',
                '30-minute RPO achievable with frequent backups',
                'More cost-effective than hot site',
                'Automated failover reduces manual intervention'
            ],
            otherOptions: 'A) Cold site takes too long for 2-hour RTO\nC) Hot site exceeds requirements and increases cost\nD) Backup/restore cannot meet 2-hour RTO'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 15 clicked")
    },
    {
        id: 16,
        questionNumber: 16,
        category: 'Operations - Backup Strategies',
        difficulty: 'Knowledge',
        domain: 'Domain 3',
        questionText: 'Which backup type only captures changes made since the last full backup?',
        options: [
            { text: 'A) Full backup', isCorrect: false },
            { text: 'B) Incremental backup', isCorrect: false },
            { text: 'C) Differential backup', isCorrect: true },
            { text: 'D) Snapshot backup', isCorrect: false }
        ],
        explanation: 'Differential backups capture all changes since the last full backup, not since the last backup of any type.',
        explanationDetails: {
            summary: 'Differential backup characteristics:',
            breakdown: [
                'Captures changes since last full backup',
                'Faster than full backup, slower than incremental',
                'Requires only full backup + latest differential for restore',
                'Size grows until next full backup'
            ],
            otherOptions: 'A) Full backup captures everything\nB) Incremental captures changes since last backup\nD) Snapshot is point-in-time image'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 16 clicked")
    },

    // ADDITIONAL QUESTIONS (17-32)
    {
        id: 17,
        questionNumber: 17,
        category: 'Cloud Architecture - Service Models',
        difficulty: 'Comprehension',
        domain: 'Domain 1',
        questionText: 'Your company wants to deploy a web application without managing the underlying servers, operating systems, or runtime environments. Which service model best fits this requirement?',
        options: [
            { text: 'A) Infrastructure as a Service (IaaS)', isCorrect: false },
            { text: 'B) Platform as a Service (PaaS)', isCorrect: true },
            { text: 'C) Software as a Service (SaaS)', isCorrect: false },
            { text: 'D) Function as a Service (FaaS)', isCorrect: false }
        ],
        explanation: 'PaaS abstracts away infrastructure management while providing a platform for application development and deployment.',
        explanationDetails: {
            summary: 'PaaS characteristics for this scenario:',
            breakdown: [
                'Eliminates server and OS management overhead',
                'Provides development tools and runtime environments',
                'Allows focus on application code and business logic',
                'Examples: Azure App Service, Google App Engine, Heroku'
            ],
            otherOptions: 'A) IaaS requires managing servers and OS\nC) SaaS provides complete applications\nD) FaaS is for event-driven functions'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 17 clicked")
    },
    {
        id: 18,
        questionNumber: 18,
        category: 'Cloud Architecture - Multicloud',
        difficulty: 'Application',
        domain: 'Domain 1',
        questionText: 'Your organization wants to avoid vendor lock-in while leveraging best-of-breed services from multiple cloud providers. What strategy should you implement?',
        options: [
            { text: 'A) Single cloud deployment with multiple regions', isCorrect: false },
            { text: 'B) Multicloud tenancy strategy', isCorrect: true },
            { text: 'C) Hybrid cloud with on-premises integration', isCorrect: false },
            { text: 'D) Private cloud deployment only', isCorrect: false }
        ],
        explanation: 'Multicloud tenancy allows using services from multiple providers, avoiding vendor lock-in while accessing optimal services.',
        explanationDetails: {
            summary: 'Multicloud tenancy benefits:',
            breakdown: [
                'Avoids dependency on a single cloud provider',
                'Enables selection of best services from each provider',
                'Provides redundancy and improved reliability',
                'Allows cost optimization through competitive pricing'
            ],
            otherOptions: 'A) Single cloud still creates vendor dependency\nC) Hybrid focuses on on-premises integration\nD) Private cloud limits service options'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 18 clicked")
    },
    {
        id: 19,
        questionNumber: 19,
        category: 'Cloud Architecture - Network Components',
        difficulty: 'Knowledge',
        domain: 'Domain 1',
        questionText: 'Which network component helps reduce latency for global users by caching content at edge locations closest to them?',
        options: [
            { text: 'A) Application load balancer', isCorrect: false },
            { text: 'B) Network load balancer', isCorrect: false },
            { text: 'C) Content Delivery Network (CDN)', isCorrect: true },
            { text: 'D) Application gateway', isCorrect: false }
        ],
        explanation: 'CDNs distribute content across geographically dispersed servers to minimize latency for end users.',
        explanationDetails: {
            summary: 'CDN functionality:',
            breakdown: [
                'Caches static content at edge locations globally',
                'Routes requests to nearest geographic server',
                'Reduces bandwidth usage and server load',
                'Improves website performance and user experience'
            ],
            otherOptions: 'A) ALB distributes traffic to backend servers\nB) NLB handles network layer traffic\nD) Application gateway provides secure access'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 19 clicked")
    },
    {
        id: 20,
        questionNumber: 20,
        category: 'Cloud Architecture - Storage Types',
        difficulty: 'Comprehension',
        domain: 'Domain 1',
        questionText: 'An application requires high IOPS for database operations and low-level access to storage blocks. Which storage combination is most appropriate?',
        options: [
            { text: 'A) Object storage with HDD', isCorrect: false },
            { text: 'B) File storage with SSD', isCorrect: false },
            { text: 'C) Block storage with SSD', isCorrect: true },
            { text: 'D) Object storage with SSD', isCorrect: false }
        ],
        explanation: 'Block storage provides low-level access ideal for databases, while SSDs deliver the high IOPS required.',
        explanationDetails: {
            summary: 'Block storage with SSD advantages:',
            breakdown: [
                'Block-level access optimal for database workloads',
                'SSD provides high IOPS and low latency',
                'Direct attachment to compute instances',
                'Suitable for transactional applications'
            ],
            otherOptions: 'A) Object storage lacks low-level access; HDD has lower IOPS\nB) File storage not optimal for databases\nD) Object storage doesn\'t provide block-level access'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 20 clicked")
    },
    {
        id: 21,
        questionNumber: 21,
        category: 'Deployments - CI/CD',
        difficulty: 'Application',
        domain: 'Domain 2',
        questionText: 'Your development team wants to automatically deploy code changes to production after passing all tests in the staging environment. Which CI/CD practice should be implemented?',
        options: [
            { text: 'A) Continuous Integration only', isCorrect: false },
            { text: 'B) Continuous Delivery only', isCorrect: false },
            { text: 'C) Continuous Deployment', isCorrect: true },
            { text: 'D) Manual deployment with CI', isCorrect: false }
        ],
        explanation: 'Continuous Deployment automatically releases code changes to production after passing all pipeline stages.',
        explanationDetails: {
            summary: 'Continuous Deployment characteristics:',
            breakdown: [
                'Fully automated pipeline from code to production',
                'No manual intervention required for deployment',
                'Requires robust testing and monitoring',
                'Enables rapid feature delivery to users'
            ],
            otherOptions: 'A) CI only handles code integration\nB) CD deploys to staging but requires manual production release\nD) Manual deployment contradicts automation goals'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 21 clicked")
    },
    {
        id: 22,
        questionNumber: 22,
        category: 'Deployments - Version Control',
        difficulty: 'Knowledge',
        domain: 'Domain 2',
        questionText: 'Which version control operation allows developers to propose changes for review before merging into the main branch?',
        options: [
            { text: 'A) Git push', isCorrect: false },
            { text: 'B) Git commit', isCorrect: false },
            { text: 'C) Pull request', isCorrect: true },
            { text: 'D) Git merge', isCorrect: false }
        ],
        explanation: 'Pull requests enable code review and discussion before changes are merged into the main codebase.',
        explanationDetails: {
            summary: 'Pull request benefits:',
            breakdown: [
                'Facilitates peer code review process',
                'Enables discussion and feedback on changes',
                'Maintains code quality through review gates',
                'Provides audit trail of changes and approvals'
            ],
            otherOptions: 'A) Push uploads code to repository\nB) Commit saves changes locally\nD) Merge combines branches without review'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 22 clicked")
    },
    {
        id: 23,
        questionNumber: 23,
        category: 'Operations - Observability',
        difficulty: 'Comprehension',
        domain: 'Domain 3',
        questionText: 'Your application is experiencing intermittent performance issues. Which observability practice would best help trace the request flow through your microservices architecture?',
        options: [
            { text: 'A) Log aggregation', isCorrect: false },
            { text: 'B) Metrics monitoring', isCorrect: false },
            { text: 'C) Distributed tracing', isCorrect: true },
            { text: 'D) Alert configuration', isCorrect: false }
        ],
        explanation: 'Distributed tracing tracks request paths through multiple services, identifying bottlenecks and failures.',
        explanationDetails: {
            summary: 'Distributed tracing advantages:',
            breakdown: [
                'Visualizes request journey across microservices',
                'Identifies latency bottlenecks in service chain',
                'Correlates spans across distributed components',
                'Enables root cause analysis for performance issues'
            ],
            otherOptions: 'A) Logs provide events but not request flow\nB) Metrics show performance but not trace paths\nD) Alerts notify of issues but don\'t trace flow'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 23 clicked")
    },
    {
        id: 24,
        questionNumber: 24,
        category: 'Operations - Backup Strategies',
        difficulty: 'Application',
        domain: 'Domain 3',
        questionText: 'Your organization has an RPO of 4 hours for a critical database. The database receives constant updates throughout business hours. Which backup strategy best meets this requirement?',
        options: [
            { text: 'A) Daily full backups at midnight', isCorrect: false },
            { text: 'B) Weekly full backups with daily differentials', isCorrect: false },
            { text: 'C) Full backup weekly with 4-hour incremental backups', isCorrect: true },
            { text: 'D) Monthly full backups with weekly incrementals', isCorrect: false }
        ],
        explanation: 'Incremental backups every 4 hours ensure data loss is limited to the RPO requirement of 4 hours.',
        explanationDetails: {
            summary: 'Backup strategy for 4-hour RPO:',
            breakdown: [
                'Incremental backups every 4 hours meet RPO exactly',
                'Weekly full backups provide baseline restore point',
                'Captures all changes within acceptable data loss window',
                'Balances storage efficiency with recovery requirements'
            ],
            otherOptions: 'A) Daily backups allow up to 24 hours data loss\nB) Daily differentials still allow 24 hours data loss\nD) Weekly incrementals allow up to 7 days data loss'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 24 clicked")
    },
    {
        id: 25,
        questionNumber: 25,
        category: 'Operations - Scaling',
        difficulty: 'Application',
        domain: 'Domain 3',
        questionText: 'A web application experiences 50% increased traffic every Friday during flash sales. Which scaling approach would be most cost-effective?',
        options: [
            { text: 'A) Vertical scaling with larger instances', isCorrect: false },
            { text: 'B) Manual horizontal scaling on Fridays', isCorrect: false },
            { text: 'C) Scheduled horizontal auto-scaling', isCorrect: true },
            { text: 'D) Continuous horizontal scaling based on load', isCorrect: false }
        ],
        explanation: 'Scheduled scaling proactively adds resources before predictable load increases, optimizing both cost and performance.',
        explanationDetails: {
            summary: 'Scheduled scaling benefits:',
            breakdown: [
                'Anticipates predictable traffic patterns',
                'Avoids delay in response to load spikes',
                'Scales down automatically after events',
                'More cost-effective than maintaining peak capacity'
            ],
            otherOptions: 'A) Vertical scaling requires downtime and limits scale\nB) Manual scaling is reactive and error-prone\nD) Continuous scaling may overreact to temporary spikes'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 25 clicked")
    },
    {
        id: 26,
        questionNumber: 26,
        category: 'Security - Encryption',
        difficulty: 'Knowledge',
        domain: 'Domain 4',
        questionText: 'Which type of encryption should be implemented to protect sensitive data stored in cloud databases?',
        options: [
            { text: 'A) Encryption in transit only', isCorrect: false },
            { text: 'B) Encryption at rest only', isCorrect: false },
            { text: 'C) Both encryption at rest and in transit', isCorrect: true },
            { text: 'D) Application-level encryption only', isCorrect: false }
        ],
        explanation: 'Comprehensive data protection requires encrypting data both when stored (at rest) and when transmitted (in transit).',
        explanationDetails: {
            summary: 'Complete encryption strategy includes:',
            breakdown: [
                'Encryption at rest protects stored database files',
                'Encryption in transit secures data movement',
                'Protects against both storage and network attacks',
                'Meets compliance requirements for data protection'
            ],
            otherOptions: 'A) Transit-only leaves stored data vulnerable\nB) Rest-only leaves network traffic vulnerable\nD) Application-level alone insufficient for comprehensive protection'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 26 clicked")
    },
    {
        id: 27,
        questionNumber: 27,
        category: 'Security - IAM',
        difficulty: 'Comprehension',
        domain: 'Domain 4',
        questionText: 'An application needs to access multiple AWS services. What is the most secure way to provide these permissions?',
        options: [
            { text: 'A) Hard-code AWS access keys in the application', isCorrect: false },
            { text: 'B) Use IAM roles with temporary credentials', isCorrect: true },
            { text: 'C) Share root account credentials', isCorrect: false },
            { text: 'D) Create IAM user with permanent access keys', isCorrect: false }
        ],
        explanation: 'IAM roles provide temporary, automatically rotating credentials without storing long-term keys in applications.',
        explanationDetails: {
            summary: 'IAM roles security advantages:',
            breakdown: [
                'Temporary credentials reduce exposure risk',
                'Automatic credential rotation eliminates key management',
                'No storage of long-term secrets in code',
                'Fine-grained permissions based on principle of least privilege'
            ],
            otherOptions: 'A) Hard-coded keys create security vulnerabilities\nC) Root credentials violate security best practices\nD) Permanent keys require manual rotation and storage'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 27 clicked")
    },
    {
        id: 28,
        questionNumber: 28,
        category: 'DevOps - Containers',
        difficulty: 'Comprehension',
        domain: 'Domain 5',
        questionText: 'Your team needs to deploy a microservices application that can automatically scale, handle failures, and manage service discovery. Which approach is most suitable?',
        options: [
            { text: 'A) Standalone containers on virtual machines', isCorrect: false },
            { text: 'B) Container orchestration with Kubernetes', isCorrect: true },
            { text: 'C) Virtual machines with manual deployment', isCorrect: false },
            { text: 'D) Serverless functions only', isCorrect: false }
        ],
        explanation: 'Kubernetes provides comprehensive container orchestration with auto-scaling, self-healing, and service discovery capabilities.',
        explanationDetails: {
            summary: 'Kubernetes orchestration features:',
            breakdown: [
                'Automatic scaling based on resource utilization',
                'Self-healing with pod restart and rescheduling',
                'Built-in service discovery and load balancing',
                'Rolling updates and rollback capabilities'
            ],
            otherOptions: 'A) Standalone containers lack orchestration features\nC) VMs with manual deployment don\'t provide automation\nD) Serverless alone insufficient for complex microservices'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 28 clicked")
    },
    {
        id: 29,
        questionNumber: 29,
        category: 'DevOps - Infrastructure as Code',
        difficulty: 'Application',
        domain: 'Domain 5',
        questionText: 'Your organization wants to ensure infrastructure deployments are consistent, version-controlled, and can be replicated across environments. Which practice should be implemented?',
        options: [
            { text: 'A) Manual infrastructure configuration through web console', isCorrect: false },
            { text: 'B) Shell scripts for infrastructure setup', isCorrect: false },
            { text: 'C) Infrastructure as Code (IaC) with declarative templates', isCorrect: true },
            { text: 'D) Infrastructure documentation with manual procedures', isCorrect: false }
        ],
        explanation: 'IaC with declarative templates ensures consistent, version-controlled, and reproducible infrastructure deployments.',
        explanationDetails: {
            summary: 'IaC declarative template benefits:',
            breakdown: [
                'Version control for infrastructure changes',
                'Consistent deployments across environments',
                'Code review process for infrastructure changes',
                'Automated rollback and deployment capabilities'
            ],
            otherOptions: 'A) Manual processes are inconsistent and error-prone\nB) Shell scripts lack declarative benefits and state management\nD) Documentation doesn\'t ensure consistency or automation'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 29 clicked")
    },
    {
        id: 30,
        questionNumber: 30,
        category: 'Troubleshooting - Application Performance',
        difficulty: 'Application',
        domain: 'Domain 6',
        questionText: 'Users report that a web application loads slowly during peak hours, but infrastructure monitoring shows normal CPU and memory usage. What should be your next troubleshooting step?',
        options: [
            { text: 'A) Increase CPU and memory resources', isCorrect: false },
            { text: 'B) Analyze database query performance and network latency', isCorrect: true },
            { text: 'C) Restart the application servers', isCorrect: false },
            { text: 'D) Implement additional load balancers', isCorrect: false }
        ],
        explanation: 'Normal infrastructure metrics suggest the bottleneck is likely in database queries or network latency, not compute resources.',
        explanationDetails: {
            summary: 'Performance troubleshooting approach:',
            breakdown: [
                'Database queries may be inefficient or blocking',
                'Network latency could affect user experience',
                'External service dependencies might be slow',
                'Application-level bottlenecks not visible in infrastructure metrics'
            ],
            otherOptions: 'A) CPU/memory normal indicates no resource constraint\nC) Restart addresses symptoms, not root cause\nD) Load balancers won\'t help if backend is slow'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 30 clicked")
    },
    {
        id: 31,
        questionNumber: 31,
        category: 'Troubleshooting - Security',
        difficulty: 'Comprehension',
        domain: 'Domain 6',
        questionText: 'An application suddenly cannot access a cloud storage bucket that worked fine yesterday. No code changes were made. What is the most likely cause?',
        options: [
            { text: 'A) Storage bucket has been deleted', isCorrect: false },
            { text: 'B) Network connectivity issues', isCorrect: false },
            { text: 'C) IAM permissions or security policies changed', isCorrect: true },
            { text: 'D) Application server hardware failure', isCorrect: false }
        ],
        explanation: 'Sudden access failures without code changes typically indicate permission or security policy modifications.',
        explanationDetails: {
            summary: 'Common causes of sudden access loss:',
            breakdown: [
                'IAM role permissions modified or revoked',
                'Security group rules changed',
                'Access keys expired or rotated',
                'Bucket policies or ACLs updated'
            ],
            otherOptions: 'A) Deletion would affect all access, not just this app\nB) Network issues would show connectivity errors\nD) Hardware failure would cause broader application issues'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 31 clicked")
    },
    {
        id: 32,
        questionNumber: 32,
        category: 'Troubleshooting - Network',
        difficulty: 'Application',
        domain: 'Domain 6',
        questionText: 'A multi-tier application can communicate between web and application tiers, but the application tier cannot reach the database tier. What should you check first?',
        options: [
            { text: 'A) Web server configuration', isCorrect: false },
            { text: 'B) Application server logs', isCorrect: false },
            { text: 'C) Network security groups and routing between application and database tiers', isCorrect: true },
            { text: 'D) Database server hardware status', isCorrect: false }
        ],
        explanation: 'Network connectivity issues between specific tiers typically involve security group rules or routing configuration.',
        explanationDetails: {
            summary: 'Network troubleshooting for tier connectivity:',
            breakdown: [
                'Security groups may block database port access',
                'Subnet routing tables might be misconfigured',
                'Network ACLs could prevent tier communication',
                'VPC peering or transit gateway issues possible'
            ],
            otherOptions: 'A) Web tier communication works, not a web server issue\nB) App logs won\'t show network configuration problems\nD) Hardware status wouldn\'t be tier-specific'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log("Question 32 clicked")
    }
];

// Helper functions for question management
export const getQuestionsByDomain = (domain: string): Question[] => {
    return QUESTIONS.filter(q => q.domain === domain);
};

export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
    return QUESTIONS.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByCategory = (category: string): Question[] => {
    return QUESTIONS.filter(q => q.category.includes(category));
};

export const getRandomQuestions = (count: number): Question[] => {
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Statistics for dashboard
export const getQuestionStats = () => {
    const domains = [...new Set(QUESTIONS.map(q => q.domain))];
    const difficulties = [...new Set(QUESTIONS.map(q => q.difficulty))];
    const categories = [...new Set(QUESTIONS.map(q => q.category))];
    
    return {
        total: QUESTIONS.length,
        byDomain: domains.map(domain => ({
            domain,
            count: QUESTIONS.filter(q => q.domain === domain).length
        })),
        byDifficulty: difficulties.map(difficulty => ({
            difficulty,
            count: QUESTIONS.filter(q => q.difficulty === difficulty).length
        })),
        categories: categories.length,
        domainBreakdown: domains.map(domain => ({
            domain,
            categories: [...new Set(QUESTIONS
                .filter(q => q.domain === domain)
                .map(q => q.category)
            )],
            difficulties: difficulties.map(difficulty => ({
                difficulty,
                count: QUESTIONS.filter(q => q.domain === domain && q.difficulty === difficulty).length
            }))
        }))
    };
};

// Helper function to get domain-specific practice set
export const getDomainPracticeSet = (domain: string, count: number): Question[] => {
    const domainQuestions = getQuestionsByDomain(domain);
    const shuffled = [...domainQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, domainQuestions.length));
};

// Helper function to get mixed difficulty practice set
export const getMixedDifficultySet = (count: number): Question[] => {
    const knowledge = QUESTIONS.filter(q => q.difficulty === 'Knowledge');
    const comprehension = QUESTIONS.filter(q => q.difficulty === 'Comprehension');
    const application = QUESTIONS.filter(q => q.difficulty === 'Application');
    
    const questionsPerDifficulty = Math.floor(count / 3);
    const remainder = count % 3;
    
    const selected = [
        ...knowledge.sort(() => 0.5 - Math.random()).slice(0, questionsPerDifficulty + (remainder > 0 ? 1 : 0)),
        ...comprehension.sort(() => 0.5 - Math.random()).slice(0, questionsPerDifficulty + (remainder > 1 ? 1 : 0)),
        ...application.sort(() => 0.5 - Math.random()).slice(0, questionsPerDifficulty)
    ];
    
    return selected.sort(() => 0.5 - Math.random());
};
                '
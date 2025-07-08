import {Question} from "../types/preptypes";

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

    // Additional questions for comprehensive coverage
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
    }
];

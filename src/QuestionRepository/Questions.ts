import { Question } from "@/types/preptypes";

export const QUESTIONS: Question[] = [
    // DOMAIN 1 - CLOUD ARCHITECTURE (40+ questions)

    // Service Models
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
        }
    },
    {
        id: 2,
        questionNumber: 2,
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
        }
    },
    {
        id: 3,
        questionNumber: 3,
        category: 'Cloud Architecture - Service Models',
        difficulty: 'Application',
        domain: 'Domain 1',
        questionText: 'A developer needs to execute code in response to events without managing any infrastructure. The code should automatically scale and only run when triggered. Which service model is most appropriate?',
        options: [
            { text: 'A) Infrastructure as a Service (IaaS)', isCorrect: false },
            { text: 'B) Platform as a Service (PaaS)', isCorrect: false },
            { text: 'C) Software as a Service (SaaS)', isCorrect: false },
            { text: 'D) Function as a Service (FaaS)', isCorrect: true }
        ],
        explanation: 'FaaS allows developers to execute code in response to events without managing infrastructure, with automatic scaling.',
        explanationDetails: {
            summary: 'FaaS characteristics for this scenario:',
            breakdown: [
                'Event-driven execution model',
                'No server management required',
                'Automatic scaling based on demand',
                'Pay-per-execution pricing model'
            ],
            otherOptions: 'A) IaaS requires infrastructure management\nB) PaaS still requires some platform management\nC) SaaS provides complete applications, not custom code execution'
        }
    },
    {
        id: 4,
        questionNumber: 4,
        category: 'Cloud Architecture - Service Models',
        difficulty: 'Knowledge',
        domain: 'Domain 1',
        questionText: 'Which service model is represented by applications like Salesforce, Office 365, and Gmail?',
        options: [
            { text: 'A) Infrastructure as a Service (IaaS)', isCorrect: false },
            { text: 'B) Platform as a Service (PaaS)', isCorrect: false },
            { text: 'C) Software as a Service (SaaS)', isCorrect: true },
            { text: 'D) Function as a Service (FaaS)', isCorrect: false }
        ],
        explanation: 'SaaS delivers complete software applications over the internet that users access through web browsers.',
        explanationDetails: {
            summary: 'SaaS characteristics:',
            breakdown: [
                'Complete software applications delivered over internet',
                'No software installation or maintenance required',
                'Subscription-based pricing model',
                'Multi-tenant architecture'
            ],
            otherOptions: 'A) IaaS provides infrastructure components\nB) PaaS provides development platforms\nD) FaaS provides serverless function execution'
        }
    },

    // Shared Responsibility Model
    {
        id: 5,
        questionNumber: 5,
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
        }
    },
    {
        id: 6,
        questionNumber: 6,
        category: 'Cloud Architecture - Shared Responsibility',
        difficulty: 'Application',
        domain: 'Domain 1',
        questionText: 'Your organization is using IaaS virtual machines. According to the shared responsibility model, which security aspect is the customer responsible for?',
        options: [
            { text: 'A) Physical security of the data center', isCorrect: false },
            { text: 'B) Hypervisor security and maintenance', isCorrect: false },
            { text: 'C) Operating system patches and configuration', isCorrect: true },
            { text: 'D) Network infrastructure hardware security', isCorrect: false }
        ],
        explanation: 'In IaaS, customers are responsible for securing the guest operating system, including patching and configuration.',
        explanationDetails: {
            summary: 'Customer responsibilities in IaaS:',
            breakdown: [
                'Guest operating system security and patching',
                'Application security and configuration',
                'Network traffic protection (encryption)',
                'Identity and access management'
            ],
            otherOptions: 'A) Physical security is provider responsibility\nB) Hypervisor is managed by cloud provider\nD) Network hardware is provider responsibility'
        }
    },

    // Availability and Regions
    {
        id: 7,
        questionNumber: 7,
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
        }
    },
    {
        id: 8,
        questionNumber: 8,
        category: 'Cloud Architecture - Availability',
        difficulty: 'Knowledge',
        domain: 'Domain 1',
        questionText: 'What is the primary purpose of availability zones in cloud computing?',
        options: [
            { text: 'A) To provide different pricing tiers', isCorrect: false },
            { text: 'B) To separate different cloud services', isCorrect: false },
            { text: 'C) To provide redundancy and fault tolerance', isCorrect: true },
            { text: 'D) To comply with data sovereignty requirements', isCorrect: false }
        ],
        explanation: 'Availability zones provide redundancy and fault tolerance by isolating failures to specific geographic locations.',
        explanationDetails: {
            summary: 'Availability zone characteristics:',
            breakdown: [
                'Isolated data center locations within a region',
                'Independent power, cooling, and networking',
                'Designed to prevent cascading failures',
                'Enable high availability architecture design'
            ],
            otherOptions: 'A) Pricing is not determined by AZ\nB) Services can span multiple AZs\nD) Data sovereignty is handled at region level'
        }
    },
    {
        id: 9,
        questionNumber: 9,
        category: 'Cloud Architecture - Availability',
        difficulty: 'Comprehension',
        domain: 'Domain 1',
        questionText: 'Which cloud strategy allows an organization to handle sudden traffic spikes by temporarily using public cloud resources while maintaining their private cloud for normal operations?',
        options: [
            { text: 'A) Multi-cloud deployment', isCorrect: false },
            { text: 'B) Hybrid cloud architecture', isCorrect: false },
            { text: 'C) Cloud bursting', isCorrect: true },
            { text: 'D) Edge computing', isCorrect: false }
        ],
        explanation: 'Cloud bursting allows organizations to scale from private to public cloud during peak demand periods.',
        explanationDetails: {
            summary: 'Cloud bursting characteristics:',
            breakdown: [
                'Temporary use of public cloud resources',
                'Handles unexpected traffic spikes',
                'Cost-effective scaling approach',
                'Maintains private cloud for normal operations'
            ],
            otherOptions: 'A) Multi-cloud uses multiple providers simultaneously\nB) Hybrid cloud is permanent architecture\nD) Edge computing brings processing closer to users'
        }
    },

    // Storage Types
    {
        id: 10,
        questionNumber: 10,
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
        }
    },
    {
        id: 11,
        questionNumber: 11,
        category: 'Cloud Architecture - Storage',
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
        }
    },
    {
        id: 12,
        questionNumber: 12,
        category: 'Cloud Architecture - Storage',
        difficulty: 'Application',
        domain: 'Domain 1',
        questionText: 'Your organization needs to store 100TB of archived data that is accessed once per year for compliance purposes. Which storage solution offers the best cost optimization?',
        options: [
            { text: 'A) Hot storage tier', isCorrect: false },
            { text: 'B) Warm storage tier', isCorrect: false },
            { text: 'C) Cold storage tier', isCorrect: false },
            { text: 'D) Archive storage tier', isCorrect: true }
        ],
        explanation: 'Archive storage tier is designed for long-term retention of rarely accessed data with lowest cost.',
        explanationDetails: {
            summary: 'Archive storage characteristics:',
            breakdown: [
                'Lowest cost storage option',
                'Designed for long-term retention',
                'Higher retrieval times and costs',
                'Ideal for compliance and backup data'
            ],
            otherOptions: 'A) Hot storage too expensive for rarely accessed data\nB) Warm storage still higher cost than needed\nC) Cold storage more expensive than archive'
        }
    },

    // Network Components
    {
        id: 13,
        questionNumber: 13,
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
        }
    },
    {
        id: 14,
        questionNumber: 14,
        category: 'Cloud Architecture - Network Components',
        difficulty: 'Comprehension',
        domain: 'Domain 1',
        questionText: 'What is the primary difference between an application load balancer and a network load balancer?',
        options: [
            { text: 'A) Application load balancer works at Layer 7, network load balancer at Layer 4', isCorrect: true },
            { text: 'B) Network load balancer is more expensive than application load balancer', isCorrect: false },
            { text: 'C) Application load balancer only works with HTTP, network load balancer with HTTPS', isCorrect: false },
            { text: 'D) Network load balancer provides SSL termination, application load balancer does not', isCorrect: false }
        ],
        explanation: 'Application load balancers operate at Layer 7 (application layer) while network load balancers operate at Layer 4 (transport layer).',
        explanationDetails: {
            summary: 'Load balancer layer differences:',
            breakdown: [
                'ALB: Layer 7 - can route based on HTTP headers, URLs, cookies',
                'NLB: Layer 4 - routes based on IP protocol data',
                'ALB: Content-based routing capabilities',
                'NLB: Higher performance, lower latency'
            ],
            otherOptions: 'B) Pricing varies by provider and usage\nC) Both can handle HTTP and HTTPS\nD) Both can provide SSL termination'
        }
    },
    {
        id: 15,
        questionNumber: 15,
        category: 'Cloud Architecture - Network Components',
        difficulty: 'Application',
        domain: 'Domain 1',
        questionText: 'Your web application needs to route traffic based on URL paths (/api/* to API servers, /images/* to image servers). Which load balancer type should you use?',
        options: [
            { text: 'A) Network load balancer', isCorrect: false },
            { text: 'B) Application load balancer', isCorrect: true },
            { text: 'C) Classic load balancer', isCorrect: false },
            { text: 'D) Gateway load balancer', isCorrect: false }
        ],
        explanation: 'Application load balancers can route traffic based on URL paths, headers, and other application-layer information.',
        explanationDetails: {
            summary: 'Application load balancer routing capabilities:',
            breakdown: [
                'Path-based routing (/api, /images, etc.)',
                'Header-based routing',
                'Query parameter-based routing',
                'Cookie-based routing'
            ],
            otherOptions: 'A) Network load balancer routes at Layer 4, cannot inspect URLs\nC) Classic load balancer has limited routing capabilities\nD) Gateway load balancer is for traffic inspection'
        }
    },

    // Disaster Recovery
    {
        id: 16,
        questionNumber: 16,
        category: 'Cloud Architecture - Disaster Recovery',
        difficulty: 'Knowledge',
        domain: 'Domain 1',
        questionText: 'What does RTO (Recovery Time Objective) represent in disaster recovery planning?',
        options: [
            { text: 'A) The amount of data that can be lost during a disaster', isCorrect: false },
            { text: 'B) The maximum acceptable downtime after a disaster', isCorrect: true },
            { text: 'C) The cost of implementing disaster recovery', isCorrect: false },
            { text: 'D) The frequency of disaster recovery testing', isCorrect: false }
        ],
        explanation: 'RTO defines the maximum acceptable duration within which a system must be restored after a disruption.',
        explanationDetails: {
            summary: 'RTO characteristics:',
            breakdown: [
                'Maximum acceptable downtime duration',
                'Measured in hours, minutes, or seconds',
                'Drives disaster recovery strategy selection',
                'Affects cost and complexity of DR solutions'
            ],
            otherOptions: 'A) That describes RPO (Recovery Point Objective)\nC) Cost is a factor but not what RTO measures\nD) Testing frequency is separate from RTO'
        }
    },
    {
        id: 17,
        questionNumber: 17,
        category: 'Cloud Architecture - Disaster Recovery',
        difficulty: 'Comprehension',
        domain: 'Domain 1',
        questionText: 'What is the difference between RPO and RTO in disaster recovery?',
        options: [
            { text: 'A) RPO is about data loss, RTO is about downtime', isCorrect: true },
            { text: 'B) RPO is about downtime, RTO is about data loss', isCorrect: false },
            { text: 'C) RPO and RTO both measure downtime but in different units', isCorrect: false },
            { text: 'D) RPO is for applications, RTO is for infrastructure', isCorrect: false }
        ],
        explanation: 'RPO (Recovery Point Objective) measures acceptable data loss, while RTO (Recovery Time Objective) measures acceptable downtime.',
        explanationDetails: {
            summary: 'RPO vs RTO:',
            breakdown: [
                'RPO: Maximum tolerable data loss (measured in time)',
                'RTO: Maximum tolerable downtime',
                'RPO drives backup frequency requirements',
                'RTO drives disaster recovery strategy selection'
            ],
            otherOptions: 'B) This reverses the definitions\nC) They measure different aspects of recovery\nD) Both apply to applications and infrastructure'
        }
    },
    {
        id: 18,
        questionNumber: 18,
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
        }
    },

    // Multicloud
    {
        id: 19,
        questionNumber: 19,
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
        }
    },
    {
        id: 20,
        questionNumber: 20,
        category: 'Cloud Architecture - Multicloud',
        difficulty: 'Comprehension',
        domain: 'Domain 1',
        questionText: 'Which scenario best represents a valid use case for multicloud strategy?',
        options: [
            { text: 'A) Using AWS for compute and Azure for AI/ML services', isCorrect: true },
            { text: 'B) Using the same cloud provider in multiple regions', isCorrect: false },
            { text: 'C) Using private cloud for all applications', isCorrect: false },
            { text: 'D) Using on-premises servers with cloud storage', isCorrect: false }
        ],
        explanation: 'Multicloud involves using different cloud providers for different services based on their strengths.',
        explanationDetails: {
            summary: 'Multicloud strategy benefits:',
            breakdown: [
                'Best-of-breed service selection',
                'Avoid vendor lock-in',
                'Improved negotiating position',
                'Reduced single point of failure risk'
            ],
            otherOptions: 'B) Multiple regions with same provider is not multicloud\nC) Private cloud only is not multicloud\nD) Hybrid cloud, not multicloud'
        }
    },

    // DOMAIN 2 - DEPLOYMENTS (30+ questions)

    // Migration Types
    {
        id: 21,
        questionNumber: 21,
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
        }
    },
    {
        id: 22,
        questionNumber: 22,
        category: 'Deployments - Migration Types',
        difficulty: 'Application',
        domain: 'Domain 2',
        questionText: 'Your legacy application needs significant changes to take advantage of cloud-native features like auto-scaling and managed services. Which migration approach is most appropriate?',
        options: [
            { text: 'A) Rehosting', isCorrect: false },
            { text: 'B) Refactoring', isCorrect: true },
            { text: 'C) Retiring', isCorrect: false },
            { text: 'D) Retaining', isCorrect: false }
        ],
        explanation: 'Refactoring involves modifying applications to take advantage of cloud-native features and services.',
        explanationDetails: {
            summary: 'Refactoring characteristics:',
            breakdown: [
                'Modifies applications for cloud optimization',
                'Enables use of managed services',
                'Improves scalability and performance',
                'Higher effort than rehosting but better ROI'
            ],
            otherOptions: 'A) Rehosting doesn\'t modify applications\nC) Retiring eliminates the application\nD) Retaining keeps app on-premises'
        }
    },
    {
        id: 23,
        questionNumber: 23,
        category: 'Deployments - Migration Types',
        difficulty: 'Knowledge',
        domain: 'Domain 2',
        questionText: 'Which migration strategy involves completely redesigning an application to be cloud-native from the ground up?',
        options: [
            { text: 'A) Rehosting', isCorrect: false },
            { text: 'B) Refactoring', isCorrect: false },
            { text: 'C) Rearchitecting', isCorrect: true },
            { text: 'D) Replacing', isCorrect: false }
        ],
        explanation: 'Rearchitecting involves completely redesigning applications to be cloud-native and take full advantage of cloud capabilities.',
        explanationDetails: {
            summary: 'Rearchitecting characteristics:',
            breakdown: [
                'Complete application redesign',
                'Full utilization of cloud-native features',
                'Highest development effort and cost',
                'Maximum long-term benefits and flexibility'
            ],
            otherOptions: 'A) Rehosting moves with minimal changes\nB) Refactoring makes modifications but not complete redesign\nD) Replacing uses different software'
        }
    },

    // Infrastructure as Code
    {
        id: 24,
        questionNumber: 24,
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
        }
    },
    {
        id: 25,
        questionNumber: 25,
        category: 'Deployments - Infrastructure as Code',
        difficulty: 'Comprehension',
        domain: 'Domain 2',
        questionText: 'What is the primary benefit of using declarative Infrastructure as Code templates?',
        options: [
            { text: 'A) Faster execution than imperative scripts', isCorrect: false },
            { text: 'B) Describes desired end state rather than step-by-step instructions', isCorrect: true },
            { text: 'C) Requires less storage space than imperative code', isCorrect: false },
            { text: 'D) Works only with specific cloud providers', isCorrect: false }
        ],
        explanation: 'Declarative IaC describes the desired end state, allowing the system to determine how to achieve it.',
        explanationDetails: {
            summary: 'Declarative IaC benefits:',
            breakdown: [
                'Describes desired infrastructure state',
                'System determines implementation steps',
                'Idempotent operations (safe to run multiple times)',
                'Easier to understand and maintain'
            ],
            otherOptions: 'A) Execution speed depends on implementation\nC) Storage size not a primary consideration\nD) Many tools work across multiple providers'
        }
    },
    {
        id: 26,
        questionNumber: 26,
        category: 'Deployments - Infrastructure as Code',
        difficulty: 'Knowledge',
        domain: 'Domain 2',
        questionText: 'Which of the following is a key characteristic of Infrastructure as Code (IaC)?',
        options: [
            { text: 'A) Infrastructure is managed manually through web consoles', isCorrect: false },
            { text: 'B) Infrastructure is defined in code and version controlled', isCorrect: true },
            { text: 'C) Infrastructure changes require physical hardware installation', isCorrect: false },
            { text: 'D) Infrastructure is managed by third-party vendors only', isCorrect: false }
        ],
        explanation: 'IaC treats infrastructure as code that can be version controlled, tested, and deployed programmatically.',
        explanationDetails: {
            summary: 'IaC key characteristics:',
            breakdown: [
                'Infrastructure defined in code files',
                'Version control for infrastructure changes',
                'Automated deployment and provisioning',
                'Repeatable and consistent deployments'
            ],
            otherOptions: 'A) IaC eliminates manual console management\nC) IaC works with virtual/cloud infrastructure\nD) IaC can be managed by internal teams'
        }
    },

    // Deployment Strategies
    {
        id: 27,
        questionNumber: 27,
        category: 'Deployments - Deployment Strategies',
        difficulty: 'Application',
        domain: 'Domain 2',
        questionText: 'Your application needs zero-downtime deployment with the ability to quickly rollback if issues occur. Which deployment strategy is most appropriate?',
        options: [
            { text: 'A) Blue-green deployment', isCorrect: true },
            { text: 'B) In-place deployment', isCorrect: false },
            { text: 'C) Rolling deployment', isCorrect: false },
            { text: 'D) Recreate deployment', isCorrect: false }
        ],
        explanation: 'Blue-green deployment provides zero downtime and instant rollback capabilities by maintaining two identical environments.',
        explanationDetails: {
            summary: 'Blue-green deployment characteristics:',
            breakdown: [
                'Two identical production environments',
                'Instant traffic switching between environments',
                'Zero downtime during deployment',
                'Quick rollback by switching traffic back'
            ],
            otherOptions: 'B) In-place deployment causes downtime\nC) Rolling deployment has slower rollback\nD) Recreate deployment causes downtime'
        }
    },
    {
        id: 28,
        questionNumber: 28,
        category: 'Deployments - Deployment Strategies',
        difficulty: 'Comprehension',
        domain: 'Domain 2',
        questionText: 'What is the primary advantage of canary deployment strategy?',
        options: [
            { text: 'A) Fastest deployment method', isCorrect: false },
            { text: 'B) Lowest resource requirements', isCorrect: false },
            { text: 'C) Limits impact of issues to small user subset', isCorrect: true },
            { text: 'D) Simplest to implement', isCorrect: false }
        ],
        explanation: 'Canary deployment gradually releases changes to small user groups, limiting the impact of potential issues.',
        explanationDetails: {
            summary: 'Canary deployment benefits:',
            breakdown: [
                'Gradual rollout to subset of users',
                'Early detection of issues with limited impact',
                'Ability to monitor and validate changes',
                'Reduced risk of widespread problems'
            ],
            otherOptions: 'A) Not the fastest method\nB) Requires additional monitoring infrastructure\nD) More complex than simple deployments'
        }
    },
    {
        id: 29,
        questionNumber: 29,
        category: 'Deployments - Deployment Strategies',
        difficulty: 'Knowledge',
        domain: 'Domain 2',
        questionText: 'In a rolling deployment strategy, how are application instances updated?',
        options: [
            { text: 'A) All instances are updated simultaneously', isCorrect: false },
            { text: 'B) Instances are updated one at a time or in small batches', isCorrect: true },
            { text: 'C) New instances are created while old ones remain', isCorrect: false },
            { text: 'D) All instances are shut down before updates', isCorrect: false }
        ],
        explanation: 'Rolling deployment updates instances gradually, one at a time or in small batches, maintaining service availability.',
        explanationDetails: {
            summary: 'Rolling deployment characteristics:',
            breakdown: [
                'Gradual instance updates',
                'Maintains service availability',
                'Lower resource requirements than blue-green',
                'Slower rollback process'
            ],
            otherOptions: 'A) That describes in-place deployment\nC) That describes blue-green deployment\nD) That would cause service interruption'
        }
    },

    // CI/CD
    {
        id: 30,
        questionNumber: 30,
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
        }
    },

    // DOMAIN 3 - OPERATIONS (25+ questions)

    // Scaling
    {
        id: 31,
        questionNumber: 31,
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
        }
    },
    {
        id: 32,
        questionNumber: 32,
        category: 'Operations - Scaling',
        difficulty: 'Comprehension',
        domain: 'Domain 3',
        questionText: 'What is the primary difference between horizontal and vertical scaling?',
        options: [
            { text: 'A) Horizontal adds more instances, vertical increases instance size', isCorrect: true },
            { text: 'B) Horizontal is cheaper, vertical is more expensive', isCorrect: false },
            { text: 'C) Horizontal is automatic, vertical is manual', isCorrect: false },
            { text: 'D) Horizontal works with databases, vertical works with web servers', isCorrect: false }
        ],
        explanation: 'Horizontal scaling adds more instances (scale out), while vertical scaling increases the capacity of existing instances (scale up).',
        explanationDetails: {
            summary: 'Scaling approach differences:',
            breakdown: [
                'Horizontal: Scale out - add more instances',
                'Vertical: Scale up - increase instance capacity',
                'Horizontal: Better for distributed applications',
                'Vertical: Simpler but has hardware limits'
            ],
            otherOptions: 'B) Cost depends on specific implementation\nC) Both can be automated\nD) Both work with various application types'
        }
    },
    {
        id: 33,
        questionNumber: 33,
        category: 'Operations - Scaling',
        difficulty: 'Knowledge',
        domain: 'Domain 3',
        questionText: 'Which scaling trigger would be most appropriate for a CPU-intensive application?',
        options: [
            { text: 'A) Memory utilization', isCorrect: false },
            { text: 'B) Network bandwidth', isCorrect: false },
            { text: 'C) CPU utilization', isCorrect: true },
            { text: 'D) Storage capacity', isCorrect: false }
        ],
        explanation: 'CPU-intensive applications should scale based on CPU utilization metrics to ensure adequate processing power.',
        explanationDetails: {
            summary: 'Scaling trigger selection:',
            breakdown: [
                'CPU utilization for compute-intensive workloads',
                'Memory utilization for memory-intensive applications',
                'Network bandwidth for high-throughput applications',
                'Custom metrics for application-specific needs'
            ],
            otherOptions: 'A) Memory not primary bottleneck for CPU-intensive apps\nB) Network may not be bottleneck\nD) Storage not relevant for CPU-intensive scaling'
        }
    },

    // Monitoring
    {
        id: 34,
        questionNumber: 34,
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
        }
    },
    {
        id: 35,
        questionNumber: 35,
        category: 'Operations - Monitoring',
        difficulty: 'Comprehension',
        domain: 'Domain 3',
        questionText: 'What is the primary purpose of distributed tracing in microservices architecture?',
        options: [
            { text: 'A) Monitor individual service performance', isCorrect: false },
            { text: 'B) Track requests across multiple services', isCorrect: true },
            { text: 'C) Collect application logs', isCorrect: false },
            { text: 'D) Measure network latency', isCorrect: false }
        ],
        explanation: 'Distributed tracing tracks request paths through multiple services, identifying bottlenecks and failures.',
        explanationDetails: {
            summary: 'Distributed tracing benefits:',
            breakdown: [
                'Visualizes request journey across microservices',
                'Identifies latency bottlenecks in service chain',
                'Correlates spans across distributed components',
                'Enables root cause analysis for performance issues'
            ],
            otherOptions: 'A) That\'s service-level monitoring\nC) That\'s log aggregation\nD) That\'s network monitoring'
        }
    },
    {
        id: 36,
        questionNumber: 36,
        category: 'Operations - Monitoring',
        difficulty: 'Application',
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
        }
    },

    // Backup Strategies
    {
        id: 37,
        questionNumber: 37,
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
        }
    },
    {
        id: 38,
        questionNumber: 38,
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
        }
    },
    {
        id: 39,
        questionNumber: 39,
        category: 'Operations - Backup Strategies',
        difficulty: 'Comprehension',
        domain: 'Domain 3',
        questionText: 'What is the primary advantage of incremental backups over full backups?',
        options: [
            { text: 'A) Faster restore times', isCorrect: false },
            { text: 'B) Better data compression', isCorrect: false },
            { text: 'C) Less storage space and faster backup time', isCorrect: true },
            { text: 'D) Higher reliability', isCorrect: false }
        ],
        explanation: 'Incremental backups only capture changes since the last backup, requiring less storage and time.',
        explanationDetails: {
            summary: 'Incremental backup advantages:',
            breakdown: [
                'Only backs up changed data since last backup',
                'Significantly less storage space required',
                'Faster backup execution time',
                'Reduced network bandwidth usage'
            ],
            otherOptions: 'A) Restore times are actually slower\nB) Compression depends on backup software\nD) Reliability depends on backup chain integrity'
        }
    },

    // DOMAIN 4 - SECURITY (25+ questions)

    // IAM
    {
        id: 40,
        questionNumber: 40,
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
        }
    },
    {
        id: 41,
        questionNumber: 41,
        category: 'Security - IAM',
        difficulty: 'Comprehension',
        domain: 'Domain 4',
        questionText: 'What is the primary difference between Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC)?',
        options: [
            { text: 'A) RBAC uses job functions, ABAC uses multiple attributes', isCorrect: true },
            { text: 'B) RBAC is more secure than ABAC', isCorrect: false },
            { text: 'C) RBAC works with cloud, ABAC works with on-premises', isCorrect: false },
            { text: 'D) RBAC is newer technology than ABAC', isCorrect: false }
        ],
        explanation: 'RBAC assigns permissions based on job roles, while ABAC uses multiple attributes like location, time, and resource sensitivity.',
        explanationDetails: {
            summary: 'RBAC vs ABAC comparison:',
            breakdown: [
                'RBAC: Access based on predefined roles',
                'ABAC: Access based on multiple dynamic attributes',
                'RBAC: Simpler to implement and manage',
                'ABAC: More flexible and granular control'
            ],
            otherOptions: 'B) Security depends on implementation\nC) Both work in cloud and on-premises\nD) ABAC is actually newer than RBAC'
        }
    },
    {
        id: 42,
        questionNumber: 42,
        category: 'Security - IAM',
        difficulty: 'Knowledge',
        domain: 'Domain 4',
        questionText: 'Which authentication method provides the highest level of security for cloud access?',
        options: [
            { text: 'A) Username and password only', isCorrect: false },
            { text: 'B) Multi-factor authentication (MFA)', isCorrect: true },
            { text: 'C) Single sign-on (SSO)', isCorrect: false },
            { text: 'D) API keys', isCorrect: false }
        ],
        explanation: 'MFA requires multiple authentication factors, significantly increasing security by requiring something you know, have, or are.',
        explanationDetails: {
            summary: 'MFA security benefits:',
            breakdown: [
                'Requires multiple authentication factors',
                'Protects against credential theft',
                'Combines knowledge, possession, and inherence factors',
                'Significantly reduces unauthorized access risk'
            ],
            otherOptions: 'A) Single factor is easily compromised\nC) SSO is about convenience, not necessarily security\nD) API keys are single factor'
        }
    },

    // Encryption
    {
        id: 43,
        questionNumber: 43,
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
        }
    },
    {
        id: 44,
        questionNumber: 44,
        category: 'Security - Encryption',
        difficulty: 'Application',
        domain: 'Domain 4',
        questionText: 'Your organization requires that sensitive data be encrypted both when stored and when transmitted. Which encryption strategy should be implemented?',
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
                'Encryption at rest protects stored data',
                'Encryption in transit secures data movement',
                'Protects against both storage and network attacks',
                'Meets compliance requirements for data protection'
            ],
            otherOptions: 'A) Transit-only leaves stored data vulnerable\nB) Rest-only leaves network traffic vulnerable\nD) Application-level alone insufficient for comprehensive protection'
        }
    },
    {
        id: 45,
        questionNumber: 45,
        category: 'Security - Encryption',
        difficulty: 'Knowledge',
        domain: 'Domain 4',
        questionText: 'What is the primary purpose of key management in cloud encryption?',
        options: [
            { text: 'A) To reduce encryption costs', isCorrect: false },
            { text: 'B) To securely store, rotate, and control access to encryption keys', isCorrect: true },
            { text: 'C) To improve encryption performance', isCorrect: false },
            { text: 'D) To eliminate the need for encryption', isCorrect: false }
        ],
        explanation: 'Key management ensures encryption keys are securely stored, regularly rotated, and access is properly controlled.',
        explanationDetails: {
            summary: 'Key management responsibilities:',
            breakdown: [
                'Secure key storage and protection',
                'Regular key rotation and lifecycle management',
                'Access control and audit logging',
                'Key recovery and backup procedures'
            ],
            otherOptions: 'A) Cost reduction is not primary purpose\nC) Performance optimization is secondary\nD) Key management supports encryption, not eliminates it'
        }
    },

    // DOMAIN 5 - DEVOPS (20+ questions)

    // CI/CD
    {
        id: 46,
        questionNumber: 46,
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
        }
    },
    {
        id: 47,
        questionNumber: 47,
        category: 'DevOps - CI/CD',
        difficulty: 'Comprehension',
        domain: 'Domain 5',
        questionText: 'What is the difference between Continuous Delivery and Continuous Deployment?',
        options: [
            { text: 'A) Continuous Delivery deploys automatically, Continuous Deployment requires manual approval', isCorrect: false },
            { text: 'B) Continuous Delivery requires manual approval for production, Continuous Deployment is fully automated', isCorrect: true },
            { text: 'C) They are the same thing with different names', isCorrect: false },
            { text: 'D) Continuous Delivery is for testing, Continuous Deployment is for production', isCorrect: false }
        ],
        explanation: 'Continuous Delivery prepares code for production deployment but requires manual approval, while Continuous Deployment automatically deploys to production.',
        explanationDetails: {
            summary: 'CD vs CD comparison:',
            breakdown: [
                'Continuous Delivery: Automated pipeline with manual production approval',
                'Continuous Deployment: Fully automated pipeline to production',
                'Both require robust testing and quality gates',
                'Continuous Deployment requires higher confidence in automation'
            ],
            otherOptions: 'A) This reverses the definitions\nC) They have different automation levels\nD) Both involve production deployment'
        }
    },
    {
        id: 48,
        questionNumber: 48,
        category: 'DevOps - CI/CD',
        difficulty: 'Application',
        domain: 'Domain 5',
        questionText: 'Your development team wants to catch integration issues early and run automated tests on every code commit. Which DevOps practice should be implemented first?',
        options: [
            { text: 'A) Continuous Deployment', isCorrect: false },
            { text: 'B) Continuous Integration', isCorrect: true },
            { text: 'C) Infrastructure as Code', isCorrect: false },
            { text: 'D) Configuration Management', isCorrect: false }
        ],
        explanation: 'Continuous Integration should be implemented first to establish automated builds and testing on every code commit.',
        explanationDetails: {
            summary: 'CI as foundation practice:',
            breakdown: [
                'Establishes automated build processes',
                'Runs tests on every code commit',
                'Provides immediate feedback to developers',
                'Foundation for more advanced DevOps practices'
            ],
            otherOptions: 'A) CD builds on CI foundation\nC) IaC is infrastructure focused\nD) Configuration management is separate concern'
        }
    },

    // Containers
    {
        id: 49,
        questionNumber: 49,
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
        }
    },
    {
        id: 50,
        questionNumber: 50,
        category: 'DevOps - Containers',
        difficulty: 'Application',
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
        }
    },

    // DOMAIN 6 - TROUBLESHOOTING (15+ questions)

    // Performance
    {
        id: 51,
        questionNumber: 51,
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
        }
    },
    {
        id: 52,
        questionNumber: 52,
        category: 'Troubleshooting - Performance',
        difficulty: 'Comprehension',
        domain: 'Domain 6',
        questionText: 'What is the most likely cause of high IOPS (Input/Output Operations Per Second) in a cloud environment?',
        options: [
            { text: 'A) Network latency issues', isCorrect: false },
            { text: 'B) Database queries or file system operations', isCorrect: true },
            { text: 'C) CPU overutilization', isCorrect: false },
            { text: 'D) Memory leaks', isCorrect: false }
        ],
        explanation: 'High IOPS typically indicates intensive database operations or file system read/write activities.',
        explanationDetails: {
            summary: 'Common causes of high IOPS:',
            breakdown: [
                'Database queries and transactions',
                'File system read/write operations',
                'Application logging activities',
                'Backup and data replication processes'
            ],
            otherOptions: 'A) Network latency affects throughput, not IOPS\nC) CPU issues don\'t directly cause IOPS\nD) Memory leaks affect memory usage, not IOPS'
        }
    },

    // Network
    {
        id: 53,
        questionNumber: 53,
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
        }
    },
    {
        id: 54,
        questionNumber: 54,
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
        }
    },

    // Security
    {
        id: 55,
        questionNumber: 55,
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
        }
    },

    // Additional Domain Coverage Questions to reach 100+
    // More Cloud Architecture questions
    {
        id: 56,
        questionNumber: 56,
        category: 'Cloud Architecture - Microservices',
        difficulty: 'Comprehension',
        domain: 'Domain 1',
        questionText: 'What is the primary benefit of using microservices architecture in cloud environments?',
        options: [
            { text: 'A) Reduced development complexity', isCorrect: false },
            { text: 'B) Lower infrastructure costs', isCorrect: false },
            { text: 'C) Independent scaling and deployment of services', isCorrect: true },
            { text: 'D) Simplified monitoring and logging', isCorrect: false }
        ],
        explanation: 'Microservices allow each service to be developed, deployed, and scaled independently, providing flexibility and resilience.',
        explanationDetails: {
            summary: 'Microservices benefits:',
            breakdown: [
                'Independent service deployment and scaling',
                'Technology diversity across services',
                'Fault isolation and resilience',
                'Team autonomy and faster development cycles'
            ],
            otherOptions: 'A) Actually increases complexity\nB) May increase infrastructure costs\nD) Monitoring becomes more complex'
        }
    },
    {
        id: 57,
        questionNumber: 57,
        category: 'Cloud Architecture - Managed Services',
        difficulty: 'Application',
        domain: 'Domain 1',
        questionText: 'Your organization wants to reduce operational overhead for database management while maintaining high availability. Which approach is most suitable?',
        options: [
            { text: 'A) Self-managed database on virtual machines', isCorrect: false },
            { text: 'B) Managed database service with multi-AZ deployment', isCorrect: true },
            { text: 'C) Containerized database with manual orchestration', isCorrect: false },
            { text: 'D) On-premises database with cloud backup', isCorrect: false }
        ],
        explanation: 'Managed database services with multi-AZ deployment provide high availability while reducing operational overhead.',
        explanationDetails: {
            summary: 'Managed database benefits:',
            breakdown: [
                'Automated patching and maintenance',
                'Built-in high availability with multi-AZ',
                'Automated backups and point-in-time recovery',
                'Reduced operational overhead'
            ],
            otherOptions: 'A) Self-managed increases operational overhead\nC) Manual orchestration increases complexity\nD) On-premises doesn\'t reduce overhead'
        }
    },

    // More Deployment questions
    {
        id: 58,
        questionNumber: 58,
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
        }
    },

    // More Operations questions
    {
        id: 59,
        questionNumber: 59,
        category: 'Operations - Lifecycle Management',
        difficulty: 'Comprehension',
        domain: 'Domain 3',
        questionText: 'What is the primary purpose of patch management in cloud environments?',
        options: [
            { text: 'A) Improve application performance', isCorrect: false },
            { text: 'B) Reduce infrastructure costs', isCorrect: false },
            { text: 'C) Address security vulnerabilities and bugs', isCorrect: true },
            { text: 'D) Increase storage capacity', isCorrect: false }
        ],
        explanation: 'Patch management primarily addresses security vulnerabilities and software bugs to maintain system security and stability.',
        explanationDetails: {
            summary: 'Patch management objectives:',
            breakdown: [
                'Address security vulnerabilities',
                'Fix software bugs and issues',
                'Maintain system stability',
                'Ensure compliance with security standards'
            ],
            otherOptions: 'A) Performance improvements are secondary\nB) Cost reduction is not primary purpose\nD) Storage capacity is unrelated to patching'
        }
    },

    // More Security questions
    {
        id: 60,
        questionNumber: 60,
        category: 'Security - Compliance',
        difficulty: 'Knowledge',
        domain: 'Domain 4',
        questionText: 'Which compliance framework is specifically designed for organizations handling credit card data?',
        options: [
            { text: 'A) SOC 2', isCorrect: false },
            { text: 'B) GDPR', isCorrect: false },
            { text: 'C) PCI DSS', isCorrect: true },
            { text: 'D) HIPAA', isCorrect: false }
        ],
        explanation: 'PCI DSS (Payment Card Industry Data Security Standard) is specifically designed for organizations that handle credit card data.',
        explanationDetails: {
            summary: 'PCI DSS requirements:',
            breakdown: [
                'Secure network and system configuration',
                'Protect cardholder data',
                'Maintain vulnerability management program',
                'Implement access control measures'
            ],
            otherOptions: 'A) SOC 2 is for service organizations\nB) GDPR is for data privacy\nD) HIPAA is for healthcare data'
        }
    }
];

// Helper functions for question management
export const getQuestionsByDomain = (domain: string): Question[] => {
    return COMPTIA_CLOUD_QUESTIONS.filter(q => q.domain === domain);
};

export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
    return COMPTIA_CLOUD_QUESTIONS.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByCategory = (category: string): Question[] => {
    return COMPTIA_CLOUD_QUESTIONS.filter(q => q.category.includes(category));
};

export const getRandomQuestions = (count: number): Question[] => {
    const shuffled = [...COMPTIA_CLOUD_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Get balanced 10-question practice test
export const getPracticeTest = (): Question[] => {
    return getRandomQuestions(10);
};

// Get domain-specific practice test
export const getDomainPracticeTest = (domain: string): Question[] => {
    const domainQuestions = getQuestionsByDomain(domain);
    const shuffled = [...domainQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(10, domainQuestions.length));
};

// Get difficulty-specific practice test
export const getDifficultyPracticeTest = (difficulty: string): Question[] => {
    const difficultyQuestions = getQuestionsByDifficulty(difficulty);
    const shuffled = [...difficultyQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(10, difficultyQuestions.length));
};

// Statistics for dashboard
export const getQuestionStats = () => {
    const domains = [...new Set(COMPTIA_CLOUD_QUESTIONS.map(q => q.domain))];
    const difficulties = [...new Set(COMPTIA_CLOUD_QUESTIONS.map(q => q.difficulty))];
    const categories = [...new Set(COMPTIA_CLOUD_QUESTIONS.map(q => q.category))];

    return {
        total: COMPTIA_CLOUD_QUESTIONS.length,
        byDomain: domains.map(domain => ({
            domain,
            count: COMPTIA_CLOUD_QUESTIONS.filter(q => q.domain === domain).length
        })),
        byDifficulty: difficulties.map(difficulty => ({
            difficulty,
            count: COMPTIA_CLOUD_QUESTIONS.filter(q => q.difficulty === difficulty).length
        })),
        categories: categories.length,
        domainBreakdown: domains.map(domain => ({
            domain,
            categories: [...new Set(COMPTIA_CLOUD_QUESTIONS
                .filter(q => q.domain === domain)
                .map(q => q.category)
            )],
            difficulties: difficulties.map(difficulty => ({
                difficulty,
                count: COMPTIA_CLOUD_QUESTIONS.filter(q => q.domain === domain && q.difficulty === difficulty).length
            }))
        }))
    };
};
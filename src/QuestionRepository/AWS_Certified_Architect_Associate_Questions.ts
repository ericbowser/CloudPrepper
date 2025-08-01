import { Question } from "@/types/preptypes";

export const AWS_QUESTIONS: Question[] = [
    // DOMAIN 1 - DESIGN RESILIENT ARCHITECTURES (26%)
    
    // Multi-AZ and High Availability
    {
        id: 101,
        questionNumber: 1,
        category: 'AWS Architecture - High Availability',
        difficulty: 'Application',
        domain: 'Domain 1: Design Resilient Architectures',
        questionText: 'A company runs a critical e-commerce application on a single EC2 instance in us-east-1a. The application must achieve 99.99% uptime and automatically recover from AZ failures. Which solution provides the MOST cost-effective approach to meet these requirements?',
        options: [
            { text: 'A) Deploy a larger EC2 instance type in the same AZ', isCorrect: false },
            { text: 'B) Create an AMI and manually launch instances in other AZs when needed', isCorrect: false },
            { text: 'C) Use Auto Scaling Group with instances across multiple AZs behind an ALB', isCorrect: true },
            { text: 'D) Use Elastic Beanstalk with a single instance', isCorrect: false }
        ],
        explanation: 'Auto Scaling Groups with multiple AZs provide automatic failure detection and recovery, while ALB distributes traffic and handles health checks.',
        explanationDetails: {
            summary: 'Multi-AZ Auto Scaling provides automated resilience:',
            breakdown: [
                'Auto Scaling Group automatically replaces failed instances',
                'Multiple AZs protect against entire AZ failures',
                'ALB provides health checks and traffic distribution',
                'Most cost-effective as it only runs minimum required instances'
            ],
            otherOptions: 'A) Larger instance doesn\'t solve AZ failure\nB) Manual process doesn\'t meet automation requirement\nD) Single instance still has single point of failure'
        }
    },
    {
        id: 102,
        questionNumber: 2,
        category: 'AWS Architecture - Data Resilience',
        difficulty: 'Application',
        domain: 'Domain 1: Design Resilient Architectures',
        questionText: 'A financial services company stores critical transaction data in RDS MySQL. They need to ensure data can be recovered with RPO of 5 minutes and RTO of 15 minutes in case of primary database failure. Which combination of solutions meets these requirements? (Choose TWO)',
        options: [
            { text: 'A) Enable automated backups with 5-minute backup frequency', isCorrect: false },
            { text: 'B) Configure RDS Multi-AZ deployment', isCorrect: true },
            { text: 'C) Create hourly manual snapshots', isCorrect: false },
            { text: 'D) Enable point-in-time recovery', isCorrect: true }
        ],
        explanation: 'Multi-AZ provides automatic failover within minutes, while point-in-time recovery enables restoration to any second within the backup retention period.',
        explanationDetails: {
            summary: 'Meeting RPO/RTO requirements:',
            breakdown: [
                'Multi-AZ: Automatic failover typically completes in 60-120 seconds',
                'Point-in-time recovery: Can restore to any second (meets 5-min RPO)',
                'Automated backups: Only daily, can\'t meet 5-minute RPO',
                'Manual snapshots: Too infrequent for RPO requirement'
            ],
            otherOptions: 'A) Automated backups are daily, not every 5 minutes\nC) Hourly snapshots exceed 5-minute RPO requirement'
        }
    },
    {
        id: 103,
        questionNumber: 3,
        category: 'AWS Architecture - Cross-Region Resilience',
        difficulty: 'Expert',
        domain: 'Domain 1: Design Resilient Architectures',
        questionText: 'A media company streams video content globally and needs to ensure service availability even if an entire AWS region becomes unavailable. The application uses ALB, EC2 Auto Scaling, and RDS MySQL. Which design provides the MOST comprehensive disaster recovery solution?',
        options: [
            { text: 'A) Create read replicas in multiple regions with manual failover', isCorrect: false },
            { text: 'B) Use Route 53 health checks with cross-region ALBs and RDS cross-region automated backups', isCorrect: false },
            { text: 'C) Deploy identical infrastructure in two regions with Route 53 failover routing and RDS cross-region read replicas with promotion capability', isCorrect: true },
            { text: 'D) Use CloudFormation to deploy infrastructure in multiple regions manually when needed', isCorrect: false }
        ],
        explanation: 'Full cross-region deployment with automated DNS failover and database replica promotion provides the fastest recovery from regional failures.',
        explanationDetails: {
            summary: 'Comprehensive multi-region DR strategy:',
            breakdown: [
                'Active-passive setup in multiple regions',
                'Route 53 automatic failover based on health checks',
                'RDS read replicas can be promoted to standalone databases',
                'Infrastructure already running in secondary region'
            ],
            otherOptions: 'A) Manual failover too slow for video streaming\nB) Cross-region backups take too long to restore\nD) Manual deployment during disaster is too slow'
        }
    },

    // Domain 1 - Storage and Backup
    {
        id: 104,
        questionNumber: 4,
        category: 'AWS Storage - Backup Strategy',
        difficulty: 'Application',
        domain: 'Domain 1: Design Resilient Architectures',
        questionText: 'A company needs to backup 50TB of data from on-premises to AWS. The data must be available within 4 hours during a disaster, and they want to minimize ongoing costs. The initial backup can take up to 2 weeks. Which solution is MOST appropriate?',
        options: [
            { text: 'A) AWS Storage Gateway with Tape Gateway to S3 Glacier', isCorrect: false },
            { text: 'B) AWS Snowball Edge to S3, then lifecycle policy to S3 Intelligent-Tiering', isCorrect: true },
            { text: 'C) Direct upload to S3 Standard over internet connection', isCorrect: false },
            { text: 'D) AWS DataSync to S3 Glacier Deep Archive', isCorrect: false }
        ],
        explanation: 'Snowball Edge handles the initial 50TB transfer efficiently, while S3 Intelligent-Tiering automatically optimizes costs and meets the 4-hour recovery requirement.',
        explanationDetails: {
            summary: 'Large data backup strategy considerations:',
            breakdown: [
                'Snowball Edge: Cost-effective for 50TB initial transfer',
                'S3 Intelligent-Tiering: Automatic cost optimization',
                'Standard tier availability: Immediate access for 4-hour RTO',
                '2-week initial timeline: Perfect for Snowball shipping'
            ],
            otherOptions: 'A) Tape Gateway too slow for 4-hour recovery\nC) 50TB over internet too slow and expensive\nD) Glacier Deep Archive takes 12+ hours to retrieve'
        }
    },

    // DOMAIN 2 - DESIGN HIGH-PERFORMING ARCHITECTURES (24%)

    // Performance and Scaling
    {
        id: 105,
        questionNumber: 5,
        category: 'AWS Performance - Database Optimization',
        difficulty: 'Application',
        domain: 'Domain 2: Design High-Performing Architectures',
        questionText: 'An application experiences slow database performance during peak hours. The RDS MySQL instance shows 95% CPU utilization, and 80% of queries are read operations. The application cannot tolerate any downtime. Which solution provides the BEST performance improvement with minimal operational overhead?',
        options: [
            { text: 'A) Create a larger RDS instance and schedule maintenance window for upgrade', isCorrect: false },
            { text: 'B) Enable RDS Performance Insights to identify slow queries', isCorrect: false },
            { text: 'C) Create RDS read replicas and modify application to use them for read queries', isCorrect: true },
            { text: 'D) Migrate to Amazon Aurora MySQL with automatic scaling', isCorrect: false }
        ],
        explanation: 'Read replicas directly address the 80% read workload without downtime, providing immediate performance relief for read-heavy applications.',
        explanationDetails: {
            summary: 'Read replica benefits for read-heavy workloads:',
            breakdown: [
                '80% read queries can be offloaded to replicas',
                'No downtime required for setup',
                'Immediate performance improvement',
                'Cost-effective solution for read scaling'
            ],
            otherOptions: 'A) Instance upgrade requires downtime\nB) Performance Insights only identifies issues, doesn\'t solve them\nD) Migration requires significant effort and testing'
        }
    },
    {
        id: 106,
        questionNumber: 6,
        category: 'AWS Performance - Caching Strategy',
        difficulty: 'Expert',
        domain: 'Domain 2: Design High-Performing Architectures',
        questionText: 'A social media application serves user profiles stored in DynamoDB. The same profiles are accessed frequently by millions of users, causing high read costs and occasional throttling. The application requires sub-millisecond response times. Which caching strategy provides the BEST performance and cost optimization?',
        options: [
            { text: 'A) Implement application-level caching with Redis ElastiCache', isCorrect: false },
            { text: 'B) Enable DynamoDB DAX (DynamoDB Accelerator)', isCorrect: true },
            { text: 'C) Use CloudFront to cache DynamoDB API responses', isCorrect: false },
            { text: 'D) Increase DynamoDB provisioned read capacity', isCorrect: false }
        ],
        explanation: 'DAX provides microsecond-level response times specifically designed for DynamoDB, with automatic cache management and no application changes required.',
        explanationDetails: {
            summary: 'DAX advantages for DynamoDB caching:',
            breakdown: [
                'Microsecond response times (sub-millisecond requirement)',
                'Transparent to application (no code changes)',
                'Automatic cache invalidation and management',
                'Reduces DynamoDB read costs significantly'
            ],
            otherOptions: 'A) Redis requires application code changes and cache management\nC) CloudFront can\'t cache DynamoDB API calls\nD) Increasing capacity doesn\'t solve latency, only costs more'
        }
    },
    {
        id: 107,
        questionNumber: 7,
        category: 'AWS Performance - Content Delivery',
        difficulty: 'Comprehension',
        domain: 'Domain 2: Design High-Performing Architectures',
        questionText: 'A global news website serves static content (images, videos, articles) to users worldwide. Users in Asia report slow page load times, while users in the US experience good performance. The origin servers are located in us-east-1. Which solution provides the MOST effective performance improvement for Asian users?',
        options: [
            { text: 'A) Deploy additional EC2 instances in ap-southeast-1', isCorrect: false },
            { text: 'B) Implement CloudFront distribution with edge locations in Asia', isCorrect: true },
            { text: 'C) Use Transfer Acceleration for S3 uploads', isCorrect: false },
            { text: 'D) Create Route 53 latency-based routing to multiple regions', isCorrect: false }
        ],
        explanation: 'CloudFront edge locations cache static content closer to Asian users, dramatically reducing latency for static content delivery.',
        explanationDetails: {
            summary: 'CloudFront benefits for global content delivery:',
            breakdown: [
                'Edge locations in Asia cache content locally',
                'Reduces latency from us-east-1 to Asia',
                'Handles static content (images, videos, articles) efficiently',
                'Automatic cache management and optimization'
            ],
            otherOptions: 'A) Additional instances help dynamic content, not static\nC) Transfer Acceleration for uploads, not downloads\nD) Latency routing helps with dynamic content, not static'
        }
    },

    // DOMAIN 3 - DESIGN SECURE APPLICATIONS (30%)

    // Security and Access Control
    {
        id: 108,
        questionNumber: 8,
        category: 'AWS Security - IAM Policies',
        difficulty: 'Expert',
        domain: 'Domain 3: Design Secure Applications',
        questionText: 'A company has multiple AWS accounts and needs to grant developers access to specific S3 buckets based on their team assignment. Developers should only access buckets prefixed with their team name (e.g., team-alpha-*). Which approach provides the MOST secure and scalable solution?',
        options: [
            { text: 'A) Create individual IAM users in each account with specific S3 bucket policies', isCorrect: false },
            { text: 'B) Use AWS Organizations with SCPs and cross-account IAM roles with dynamic policy conditions', isCorrect: true },
            { text: 'C) Create shared IAM users with different access keys for each team', isCorrect: false },
            { text: 'D) Use S3 bucket policies with IAM user conditions for each team', isCorrect: false }
        ],
        explanation: 'Organizations with SCPs provide account-level governance, while cross-account roles with dynamic conditions enable secure, scalable team-based access.',
        explanationDetails: {
            summary: 'Multi-account secure access strategy:',
            breakdown: [
                'SCPs provide organization-wide security boundaries',
                'Cross-account roles eliminate need for multiple IAM users',
                'Dynamic conditions based on user attributes (team tags)',
                'Centralized access management across accounts'
            ],
            otherOptions: 'A) Individual users don\'t scale across multiple accounts\nC) Shared users violate security best practices\nD) Bucket policies alone can\'t handle multi-account scenarios efficiently'
        }
    },
    {
        id: 109,
        questionNumber: 9,
        category: 'AWS Security - Data Encryption',
        difficulty: 'Application',
        domain: 'Domain 3: Design Secure Applications',
        questionText: 'A healthcare company must encrypt all data at rest and in transit. They need to maintain full control over encryption keys and meet HIPAA compliance requirements. The solution must integrate with RDS, S3, and EBS. Which key management approach is MOST appropriate?',
        options: [
            { text: 'A) Use AWS managed keys (SSE-S3, default RDS encryption)', isCorrect: false },
            { text: 'B) Use AWS KMS customer managed keys with CloudTrail logging', isCorrect: true },
            { text: 'C) Use client-side encryption with application-managed keys', isCorrect: false },
            { text: 'D) Use AWS KMS AWS managed keys with detailed monitoring', isCorrect: false }
        ],
        explanation: 'Customer managed KMS keys provide full control over key policies, rotation, and access, while CloudTrail provides complete audit trails required for HIPAA compliance.',
        explanationDetails: {
            summary: 'HIPAA-compliant key management requirements:',
            breakdown: [
                'Customer managed keys: Full control over key policies and access',
                'CloudTrail: Complete audit trail of key usage',
                'Cross-service integration: Works with RDS, S3, EBS',
                'HIPAA compliance: Meets regulatory requirements for key control'
            ],
            otherOptions: 'A) AWS managed keys don\'t provide sufficient control for HIPAA\nC) Client-side encryption complex and doesn\'t integrate well\nD) AWS managed keys still don\'t give customer full control'
        }
    },
    {
        id: 110,
        questionNumber: 10,
        category: 'AWS Security - Network Security',
        difficulty: 'Application',
        domain: 'Domain 3: Design Secure Applications',
        questionText: 'A three-tier web application (web, app, database) needs to be secured according to the principle of least privilege. The web tier must be accessible from the internet, app tier only from web tier, and database tier only from app tier. Which security group configuration is CORRECT?',
        options: [
            { text: 'A) Web SG: 0.0.0.0/0:80,443 | App SG: Web-SG:8080 | DB SG: App-SG:3306', isCorrect: true },
            { text: 'B) Web SG: 0.0.0.0/0:80,443 | App SG: 0.0.0.0/0:8080 | DB SG: 0.0.0.0/0:3306', isCorrect: false },
            { text: 'C) All tiers: VPC CIDR:All ports for internal communication', isCorrect: false },
            { text: 'D) Web SG: 0.0.0.0/0:All | App SG: VPC CIDR:All | DB SG: VPC CIDR:All', isCorrect: false }
        ],
        explanation: 'Security groups should reference other security groups for internal communication, implementing true least privilege access between tiers.',
        explanationDetails: {
            summary: 'Proper three-tier security group design:',
            breakdown: [
                'Web tier: Internet access on standard web ports (80, 443)',
                'App tier: Only accepts traffic from web security group',
                'Database tier: Only accepts traffic from app security group',
                'Security group references: More secure than IP-based rules'
            ],
            otherOptions: 'B) App and DB exposed to internet\nC) Too broad access within VPC\nD) Overly permissive on all tiers'
        }
    },

    // Domain 3 - Advanced Security
    {
        id: 111,
        questionNumber: 11,
        category: 'AWS Security - Advanced Threats',
        difficulty: 'Expert',
        domain: 'Domain 3: Design Secure Applications',
        questionText: 'A company\'s web application experiences DDoS attacks and SQL injection attempts. They need comprehensive protection that automatically adapts to new attack patterns. The solution must integrate with CloudFront and ALB. Which combination provides the MOST comprehensive protection?',
        options: [
            { text: 'A) AWS Shield Standard + CloudFront + Security Groups', isCorrect: false },
            { text: 'B) AWS Shield Advanced + AWS WAF + AWS Firewall Manager', isCorrect: true },
            { text: 'C) AWS Shield Standard + AWS WAF + VPC Flow Logs', isCorrect: false },
            { text: 'D) Network ACLs + AWS Inspector + CloudWatch', isCorrect: false }
        ],
        explanation: 'Shield Advanced provides enhanced DDoS protection, WAF blocks application-layer attacks, and Firewall Manager centrally manages security policies across resources.',
        explanationDetails: {
            summary: 'Comprehensive web application protection stack:',
            breakdown: [
                'Shield Advanced: Enhanced DDoS protection with attack response team',
                'WAF: Blocks SQL injection, XSS, and other application attacks',
                'Firewall Manager: Centralized security policy management',
                'Auto-adaptation: Machine learning capabilities for new threats'
            ],
            otherOptions: 'A) Shield Standard insufficient for advanced DDoS\nC) VPC Flow Logs don\'t provide active protection\nD) Inspector scans instances, doesn\'t provide runtime protection'
        }
    },

    // DOMAIN 4 - DESIGN COST-OPTIMIZED ARCHITECTURES (20%)

    // Cost Optimization
    {
        id: 112,
        questionNumber: 12,
        category: 'AWS Cost Optimization - Instance Selection',
        difficulty: 'Application',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A batch processing workload runs predictably every night from 2 AM to 6 AM for data analytics. The workload can tolerate interruptions and can resume from checkpoints. Current costs using On-Demand instances are $500/month. Which pricing model combination provides the MAXIMUM cost savings?',
        options: [
            { text: 'A) Reserved Instances for consistent baseline capacity', isCorrect: false },
            { text: 'B) Spot Instances with Auto Scaling groups across multiple AZs', isCorrect: true },
            { text: 'C) Savings Plans for compute usage commitment', isCorrect: false },
            { text: 'D) Dedicated Hosts for workload isolation', isCorrect: false }
        ],
        explanation: 'Spot Instances can provide up to 90% savings for fault-tolerant batch workloads, and multiple AZs reduce interruption risk.',
        explanationDetails: {
            summary: 'Spot Instances optimal for batch processing:',
            breakdown: [
                'Up to 90% cost savings vs On-Demand',
                'Workload tolerates interruptions (checkpoint resume)',
                'Predictable 4-hour window reduces interruption risk',
                'Multiple AZs provide capacity diversification'
            ],
            otherOptions: 'A) Reserved Instances only ~75% savings, overkill for 4-hour workload\nC) Savings Plans better for consistent 24/7 usage\nD) Dedicated Hosts most expensive option'
        }
    },
    {
        id: 113,
        questionNumber: 13,
        category: 'AWS Cost Optimization - Storage Lifecycle',
        difficulty: 'Application',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A company stores application logs in S3. Logs are actively analyzed for 30 days, occasionally accessed for 90 days, and must be retained for 7 years for compliance. Current storage costs are $1000/month in S3 Standard. Which lifecycle policy provides the BEST cost optimization?',
        options: [
            { text: 'A) Transition to S3 IA after 30 days, then S3 Glacier after 90 days, then Deep Archive after 1 year', isCorrect: true },
            { text: 'B) Keep all data in S3 Standard for quick access when needed', isCorrect: false },
            { text: 'C) Move everything to S3 Glacier immediately after upload', isCorrect: false },
            { text: 'D) Use S3 Intelligent-Tiering for automatic optimization', isCorrect: false }
        ],
        explanation: 'Lifecycle policy matching access patterns: S3 Standard for active use, S3 IA for occasional access, Glacier for long-term retention, Deep Archive for compliance.',
        explanationDetails: {
            summary: 'Optimal lifecycle transitions for log data:',
            breakdown: [
                'Days 1-30: S3 Standard for active analysis',
                'Days 31-90: S3 IA for occasional access (50% savings)',
                'Days 91-365: S3 Glacier for backup (68% savings)',
                'Years 1-7: Deep Archive for compliance (77% savings)'
            ],
            otherOptions: 'B) Standard storage most expensive for long-term retention\nC) Glacier immediate transition prevents active analysis\nD) Intelligent-Tiering adds overhead for predictable patterns'
        }
    },
    {
        id: 114,
        questionNumber: 14,
        category: 'AWS Cost Optimization - Database Costs',
        difficulty: 'Expert',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A startup\'s MySQL database experiences unpredictable traffic patterns ranging from 5% to 95% CPU utilization throughout the day. Current RDS costs are $800/month with frequent over-provisioning during low-traffic periods. Which solution provides the BEST cost optimization while maintaining performance?',
        options: [
            { text: 'A) Migrate to Aurora Serverless v2 with automatic scaling', isCorrect: true },
            { text: 'B) Use RDS with scheduled Auto Scaling based on time patterns', isCorrect: false },
            { text: 'C) Switch to smaller RDS instance and add read replicas', isCorrect: false },
            { text: 'D) Migrate to DynamoDB with on-demand billing', isCorrect: false }
        ],
        explanation: 'Aurora Serverless v2 automatically scales compute capacity based on actual demand, eliminating over-provisioning costs during low-traffic periods.',
        explanationDetails: {
            summary: 'Aurora Serverless v2 benefits for variable workloads:',
            breakdown: [
                'Automatic scaling from 0.5 to 128 ACUs based on demand',
                'Pay only for actual compute used (per-second billing)',
                'No over-provisioning during low-traffic periods',
                'MySQL compatibility maintains application compatibility'
            ],
            otherOptions: 'B) Scheduled scaling can\'t handle unpredictable patterns\nC) Smaller instance may cause performance issues during peaks\nD) DynamoDB requires application rewrite from MySQL'
        }
    },

    // Additional Domain Coverage
    {
        id: 115,
        questionNumber: 15,
        category: 'AWS Cost Optimization - Data Transfer',
        difficulty: 'Application',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A company transfers 100TB of data monthly from EC2 instances to users worldwide. Current data transfer costs are $9,000/month. The data consists of software downloads that rarely change. Which solution provides the MOST significant cost reduction?',
        options: [
            { text: 'A) Use VPC endpoints to reduce data transfer charges', isCorrect: false },
            { text: 'B) Implement CloudFront CDN with S3 origin', isCorrect: true },
            { text: 'C) Move EC2 instances to regions with lower data transfer costs', isCorrect: false },
            { text: 'D) Compress all data before transmission', isCorrect: false }
        ],
        explanation: 'CloudFront eliminates most internet data transfer charges and caches static content globally, dramatically reducing costs for software downloads.',
        explanationDetails: {
            summary: 'CloudFront cost optimization for static content:',
            breakdown: [
                'No data transfer charges between S3 and CloudFront',
                'Reduced CloudFront to internet rates vs EC2 to internet',
                'Caching reduces origin data transfer for repeated downloads',
                'Global edge locations improve performance and reduce costs'
            ],
            otherOptions: 'A) VPC endpoints help AWS service costs, not internet transfer\nC) Regional pricing differences minimal for internet transfer\nD) Compression helps but doesn\'t address core transfer costs'
        }
    },

    // Domain 1 Additional Questions
    {
        id: 116,
        questionNumber: 16,
        category: 'AWS Architecture - Decoupling',
        difficulty: 'Application',
        domain: 'Domain 1: Design Resilient Architectures',
        questionText: 'A photo processing application receives images via API, processes them, and stores results. During peak times, the processing queue becomes backlogged and API requests start failing. Which decoupling strategy provides the BEST resilience?',
        options: [
            { text: 'A) Increase EC2 instance size for faster processing', isCorrect: false },
            { text: 'B) Use SQS queue between API and processing with Auto Scaling based on queue depth', isCorrect: true },
            { text: 'C) Add more API Gateway throttling to reduce incoming requests', isCorrect: false },
            { text: 'D) Use Lambda functions instead of EC2 for processing', isCorrect: false }
        ],
        explanation: 'SQS decouples components allowing the API to accept requests even when processing is slow, with Auto Scaling adding capacity based on queue backlog.',
        explanationDetails: {
            summary: 'SQS decoupling benefits:',
            breakdown: [
                'API remains responsive during processing delays',
                'Queue acts as buffer for variable processing times',
                'Auto Scaling responds to actual demand (queue depth)',
                'No lost requests during traffic spikes'
            ],
            otherOptions: 'A) Larger instances don\'t solve architecture coupling\nC) Throttling causes request failures\nD) Lambda has 15-minute timeout limit for processing'
        }
    },

    // Domain 2 Additional Questions  
    {
        id: 117,
        questionNumber: 17,
        category: 'AWS Performance - Auto Scaling',
        difficulty: 'Expert',
        domain: 'Domain 2: Design High-Performing Architectures',
        questionText: 'An application experiences sudden traffic spikes that cause Auto Scaling to launch instances, but by the time instances are ready, traffic has decreased. This causes unnecessary costs. Which scaling strategy provides the BEST optimization?',
        options: [
            { text: 'A) Use predictive scaling with machine learning to anticipate traffic patterns', isCorrect: true },
            { text: 'B) Decrease Auto Scaling cooldown periods for faster scaling', isCorrect: false },
            { text: 'C) Use larger instance types that can handle traffic spikes', isCorrect: false },
            { text: 'D) Implement step scaling with smaller scaling increments', isCorrect: false }
        ],
        explanation: 'Predictive scaling uses machine learning to forecast traffic and pre-scale capacity, avoiding the lag time of reactive scaling.',
        explanationDetails: {
            summary: 'Predictive scaling advantages:',
            breakdown: [
                'ML forecasts traffic patterns to pre-scale capacity',
                'Reduces lag time between traffic spike and available capacity',
                'Prevents over-scaling by understanding traffic duration',
                'Works with historical patterns and scheduled events'
            ],
            otherOptions: 'B) Faster scaling still reactive, doesn\'t solve core timing issue\nC) Over-provisioning increases costs unnecessarily\nD) Step scaling still reactive to traffic changes'
        }
    },

    // Domain 3 Additional Questions
    {
        id: 118,
        questionNumber: 18,
        category: 'AWS Security - Secrets Management',
        difficulty: 'Application',
        domain: 'Domain 3: Design Secure Applications',
        questionText: 'A microservices application needs to securely store and rotate database passwords, API keys, and certificates. The solution must integrate with RDS automatic rotation and provide audit trails. Which service combination is MOST appropriate?',
        options: [
            { text: 'A) Store secrets in S3 with bucket encryption and versioning', isCorrect: false },
            { text: 'B) Use AWS Secrets Manager with CloudTrail logging', isCorrect: true },
            { text: 'C) Store secrets in Systems Manager Parameter Store with SecureString', isCorrect: false },
            { text: 'D) Use AWS KMS to encrypt secrets stored in DynamoDB', isCorrect: false }
        ],
        explanation: 'Secrets Manager provides automatic rotation for RDS, integration with AWS services, and complete audit trails through CloudTrail.',
        explanationDetails: {
            summary: 'Secrets Manager comprehensive benefits:',
            breakdown: [
                'Automatic rotation for RDS, Redshift, DocumentDB',
                'Native integration with AWS services',
                'Complete audit trail through CloudTrail',
                'Secure retrieval with fine-grained IAM permissions'
            ],
            otherOptions: 'A) S3 not designed for secrets management\nC) Parameter Store lacks automatic rotation for databases\nD) Custom solution requires building rotation logic'
        }
    },

    // Tricky Edge Cases
    {
        id: 119,
        questionNumber: 19,
        category: 'AWS Architecture - Service Limits',
        difficulty: 'Expert',
        domain: 'Domain 2: Design High-Performing Architectures',
        questionText: 'An application needs to upload files up to 500GB to S3. Users report upload failures and timeouts. The application currently uses single PUT requests. Which solution addresses the root cause of the upload failures?',
        options: [
            { text: 'A) Enable S3 Transfer Acceleration for faster uploads', isCorrect: false },
            { text: 'B) Implement S3 multipart upload for large files', isCorrect: true },
            { text: 'C) Use CloudFront for upload optimization', isCorrect: false },
            { text: 'D) Increase application timeout settings', isCorrect: false }
        ],
        explanation: 'S3 has a 5GB limit for single PUT operations. Files larger than 5GB require multipart upload, which is recommended for files over 100MB.',
        explanationDetails: {
            summary: 'S3 upload limits and best practices:',
            breakdown: [
                'Single PUT limit: 5GB maximum file size',
                'Multipart upload: Required for files >5GB, recommended >100MB',
                '500GB files: Must use multipart upload',
                'Improves reliability with retry capability per part'
            ],
            otherOptions: 'A) Transfer Acceleration helps speed, doesn\'t solve size limit\nC) CloudFront not designed for large file uploads\nD) Timeouts don\'t solve the 5GB PUT limit'
        }
    },

    {
        id: 120,
        questionNumber: 20,
        category: 'AWS Architecture - Lambda Limitations',
        difficulty: 'Expert',
        domain: 'Domain 1: Design Resilient Architectures',
        questionText: 'A data processing function needs to run for 20 minutes to process large datasets. The current Lambda function times out after 15 minutes. Which solution provides the BEST architecture for this requirement?',
        options: [
            { text: 'A) Increase Lambda timeout to maximum 15 minutes and optimize code', isCorrect: false },
            { text: 'B) Break processing into smaller Lambda functions using Step Functions', isCorrect: true },
            { text: 'C) Use Lambda with SQS to process data in smaller chunks', isCorrect: false },
            { text: 'D) Migrate to ECS Fargate for longer-running tasks', isCorrect: false }
        ],
        explanation: 'Lambda has a hard 15-minute timeout limit. Step Functions can orchestrate multiple Lambda functions to handle longer workflows.',
        explanationDetails: {
            summary: 'Lambda timeout limits and solutions:',
            breakdown: [
                'Lambda maximum timeout: 15 minutes (hard limit)',
                'Step Functions: Can orchestrate multi-step workflows',
                'Break down processing: Multiple Lambda functions in sequence',
                'State management: Step Functions handles workflow state'
            ],
            otherOptions: 'A) 15 minutes is the maximum timeout\nC) SQS helps with async processing but doesn\'t solve timeout\nD) ECS Fargate valid but Step Functions more serverless-native'
        }
    },
    // Additional questions for AWS_QUESTIONS array

    // DOMAIN 4 - COST OPTIMIZATION (Priority - Under-represented)

    {
        id: 121,
        questionNumber: 21,
        category: 'AWS Cost Optimization - Compute Savings',
        difficulty: 'Expert',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A company runs a web application with the following pattern: 2 instances minimum 24/7, scales to 10 instances during business hours (9 AM-5 PM weekdays), and spikes to 50 instances during monthly sales (first 3 days). Current monthly On-Demand costs are $15,000. Which purchasing strategy provides MAXIMUM cost savings while maintaining performance?',
        options: [
            { text: 'A) All-Upfront Reserved Instances for 10 instances, On-Demand for the rest', isCorrect: false },
            { text: 'B) Reserved Instances for 2 instances, Savings Plans for business hours capacity, Spot for sales spikes', isCorrect: true },
            { text: 'C) Compute Savings Plans for all capacity needs', isCorrect: false },
            { text: 'D) Scheduled Reserved Instances for business hours, On-Demand for spikes', isCorrect: false }
        ],
        explanation: 'Layered purchasing strategy: RIs for baseline (70% savings), Savings Plans for predictable scaling (66% savings), Spot for spikes (up to 90% savings).',
        explanationDetails: {
            summary: 'Optimal cost strategy for variable workloads:',
            breakdown: [
                'Reserved Instances: 2 baseline instances (24/7) - 70% savings',
                'Savings Plans: 8 additional instances for business hours - 66% savings',
                'Spot Instances: 40 instances for monthly sales - up to 90% savings',
                'Total savings: Approximately 75% reduction from $15,000'
            ],
            otherOptions: 'A) Over-provisioning RIs for 10 instances wastes money nights/weekends\nC) Savings Plans less discount than RIs for baseline\nD) Scheduled RIs discontinued, wouldn\'t cover spikes'
        }
    },

    {
        id: 122,
        questionNumber: 22,
        category: 'AWS Cost Optimization - Data Processing',
        difficulty: 'Application',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A data analytics company processes 10TB of log files daily using EMR clusters. Processing takes 4 hours and runs once daily at 2 AM. The current approach uses On-Demand instances costing $8,000/month. Which architecture change provides the BEST cost optimization?',
        options: [
            { text: 'A) Migrate to AWS Glue for serverless ETL processing', isCorrect: false },
            { text: 'B) Use EMR on Spot Instances with diverse instance types across multiple AZs', isCorrect: true },
            { text: 'C) Pre-process data with Lambda before EMR to reduce cluster size', isCorrect: false },
            { text: 'D) Use smaller EMR cluster running 24/7 with Reserved Instances', isCorrect: false }
        ],
        explanation: 'EMR on Spot Instances can provide 50-80% cost savings for batch processing workloads that can tolerate interruptions.',
        explanationDetails: {
            summary: 'EMR Spot Instance optimization:',
            breakdown: [
                'Spot savings: 50-80% reduction from On-Demand pricing',
                'Instance diversity: Reduces interruption risk',
                'Multiple AZs: Ensures capacity availability',
                '4-hour processing window: Perfect for Spot reliability'
            ],
            otherOptions: 'A) Glue more expensive for 10TB daily processing\nC) Lambda timeout and cost limitations for TB-scale data\nD) 24/7 cluster wasteful for 4-hour daily job'
        }
    },

    {
        id: 123,
        questionNumber: 23,
        category: 'AWS Cost Optimization - Storage Optimization',
        difficulty: 'Expert',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A media company stores 500TB of video content in S3 Standard. Analytics show: 10% accessed daily (hot), 30% accessed weekly (warm), 60% accessed rarely but unpredictably. Retrieval must complete within 12 hours. Current cost is $11,500/month. Which storage strategy provides optimal cost reduction?',
        options: [
            { text: 'A) S3 Intelligent-Tiering for all content with archive configuration', isCorrect: true },
            { text: 'B) S3 Standard for hot, S3 IA for warm, S3 Glacier for cold data', isCorrect: false },
            { text: 'C) S3 One Zone-IA for all content to reduce costs', isCorrect: false },
            { text: 'D) S3 Standard for hot, S3 Glacier Instant Retrieval for all other content', isCorrect: false }
        ],
        explanation: 'S3 Intelligent-Tiering automatically optimizes storage costs for unpredictable access patterns without retrieval fees, perfect for this use case.',
        explanationDetails: {
            summary: 'Intelligent-Tiering benefits for unpredictable access:',
            breakdown: [
                'Automatic tiering: No manual lifecycle policies needed',
                'No retrieval fees: Critical for unpredictable access',
                'Archive configuration: Moves rarely accessed objects to archive tiers',
                'Cost savings: Up to 70% reduction while maintaining performance'
            ],
            otherOptions: 'B) Manual lifecycle rules don\'t handle unpredictable access well\nC) One Zone-IA risky for 500TB of valuable content\nD) Glacier Instant Retrieval has retrieval fees for 60% of content'
        }
    },

    // DOMAIN 3 - SECURITY (Including new ML services)

    {
        id: 124,
        questionNumber: 24,
        category: 'AWS Security - ML Data Protection',
        difficulty: 'Application',
        domain: 'Domain 3: Design Secure Applications',
        questionText: 'A healthcare company uses Amazon Comprehend Medical to analyze patient records and Amazon Textract for insurance form processing. They must ensure HIPAA compliance and data isolation. Which security configuration is MOST appropriate?',
        options: [
            { text: 'A) Use default service encryption and enable CloudTrail logging', isCorrect: false },
            { text: 'B) Enable VPC endpoints, use customer-managed KMS keys, and create separate IAM roles per service', isCorrect: true },
            { text: 'C) Process all data in a single private subnet with network ACLs', isCorrect: false },
            { text: 'D) Use AWS managed keys and restrict access with S3 bucket policies', isCorrect: false }
        ],
        explanation: 'VPC endpoints ensure private connectivity, customer-managed KMS keys provide encryption control, and separate IAM roles enable least privilege access for HIPAA compliance.',
        explanationDetails: {
            summary: 'HIPAA-compliant ML service configuration:',
            breakdown: [
                'VPC endpoints: Keep data traffic within AWS network',
                'Customer-managed KMS: Full control over encryption keys',
                'Separate IAM roles: Least privilege per service',
                'Audit trail: CloudTrail logs all API calls for compliance'
            ],
            otherOptions: 'A) Default encryption insufficient for HIPAA requirements\nC) Network ACLs don\'t provide service-level isolation\nD) AWS managed keys don\'t provide sufficient control'
        }
    },

    {
        id: 125,
        questionNumber: 25,
        category: 'AWS Security - Container Security',
        difficulty: 'Expert',
        domain: 'Domain 3: Design Secure Applications',
        questionText: 'A fintech application runs on EKS with sensitive payment processing workloads. The security team requires pod-level network isolation, secrets rotation every 30 days, and runtime threat detection. Which solution meets ALL requirements?',
        options: [
            { text: 'A) Calico network policies, AWS Secrets Manager, and Amazon Inspector', isCorrect: false },
            { text: 'B) AWS App Mesh, Systems Manager Parameter Store, and CloudWatch Container Insights', isCorrect: false },
            { text: 'C) EKS security groups for pods, AWS Secrets Manager with rotation, and Amazon GuardDuty EKS protection', isCorrect: true },
            { text: 'D) Network ACLs, HashiCorp Vault, and AWS Config rules', isCorrect: false }
        ],
        explanation: 'EKS security groups provide pod-level isolation, Secrets Manager handles automatic rotation, and GuardDuty EKS protection offers runtime threat detection.',
        explanationDetails: {
            summary: 'Comprehensive EKS security architecture:',
            breakdown: [
                'Security groups for pods: Fine-grained network isolation at pod level',
                'Secrets Manager: Automatic 30-day rotation with EKS integration',
                'GuardDuty EKS: Runtime threat detection and anomaly detection',
                'Native AWS integration: Simplified management and compliance'
            ],
            otherOptions: 'A) Inspector scans vulnerabilities, not runtime threats\nB) App Mesh is service mesh, not security focused\nD) Network ACLs too coarse for pod-level control'
        }
    },

    // DOMAIN 1 - RESILIENT ARCHITECTURES (Modern patterns)

    {
        id: 126,
        questionNumber: 26,
        category: 'AWS Architecture - Event-Driven Resilience',
        difficulty: 'Expert',
        domain: 'Domain 1: Design Resilient Architectures',
        questionText: 'An e-commerce platform must process orders from multiple channels (web, mobile, partners) with different formats. The system must handle 50,000 orders/hour during sales, ensure no order loss, and enable new channel integration without affecting existing ones. Which architecture provides the BEST resilience and scalability?',
        options: [
            { text: 'A) API Gateway with Lambda functions writing directly to DynamoDB', isCorrect: false },
            { text: 'B) Amazon EventBridge with channel-specific rules routing to SQS queues and containerized processors', isCorrect: true },
            { text: 'C) Kinesis Data Streams with Lambda consumers for each channel', isCorrect: false },
            { text: 'D) Application Load Balancer with Auto Scaling EC2 instances', isCorrect: false }
        ],
        explanation: 'EventBridge provides event routing with schema registry, SQS ensures message durability, and containerized processors enable independent scaling per channel.',
        explanationDetails: {
            summary: 'Event-driven architecture benefits:',
            breakdown: [
                'EventBridge: Central event router with content-based filtering',
                'Schema Registry: Validates events and enables discovery',
                'SQS queues: Guaranteed message delivery and buffering',
                'Container isolation: Each channel processor scales independently'
            ],
            otherOptions: 'A) Direct writes risk data loss during high load\nC) Kinesis overkill for transactional data, complex scaling\nD) Monolithic approach, difficult to add new channels'
        }
    },

    {
        id: 127,
        questionNumber: 27,
        category: 'AWS Architecture - Disaster Recovery',
        difficulty: 'Application',
        domain: 'Domain 1: Design Resilient Architectures',
        questionText: 'A financial services application requires RPO of 1 hour and RTO of 4 hours. The application uses Aurora PostgreSQL, EC2 instances with custom AMIs, and stores documents in S3. The DR solution must be cost-effective. Which approach meets these requirements?',
        options: [
            { text: 'A) Aurora Global Database with standby EC2 instances in secondary region', isCorrect: false },
            { text: 'B) Aurora backups to secondary region, AMIs copied cross-region, S3 cross-region replication, and AWS Backup', isCorrect: true },
            { text: 'C) Multi-region active-active deployment with Route 53 failover', isCorrect: false },
            { text: 'D) Database snapshots and EC2 snapshots copied hourly to secondary region', isCorrect: false }
        ],
        explanation: 'Backup-based DR meets RPO/RTO requirements cost-effectively: Aurora automated backups (continuous), AMIs ready for quick launch, S3 CRR for documents.',
        explanationDetails: {
            summary: 'Cost-effective DR strategy components:',
            breakdown: [
                'Aurora backups: Point-in-time recovery within 5 minutes (meets 1-hour RPO)',
                'Cross-region AMI copies: Ready for quick EC2 launch',
                'S3 CRR: Near real-time replication for documents',
                'AWS Backup: Centralized backup management and compliance'
            ],
            otherOptions: 'A) Global Database expensive for 4-hour RTO requirement\nC) Active-active overkill and complex for these requirements\nD) Manual snapshots miss continuous data changes'
        }
    },

    // DOMAIN 2 - HIGH-PERFORMING ARCHITECTURES (Modern services)

    {
        id: 128,
        questionNumber: 28,
        category: 'AWS Performance - API Optimization',
        difficulty: 'Application',
        domain: 'Domain 2: Design High-Performing Architectures',
        questionText: 'A mobile app backend serves personalized content to 10 million users globally. The API Gateway shows high latency for data aggregation from multiple microservices. Each request makes 5-7 service calls with 200ms average latency per call. Which solution provides the BEST performance improvement?',
        options: [
            { text: 'A) Implement API Gateway caching for all endpoints', isCorrect: false },
            { text: 'B) Use AWS AppSync with GraphQL to batch and parallelize service calls', isCorrect: true },
            { text: 'C) Add ElastiCache in front of each microservice', isCorrect: false },
            { text: 'D) Increase Lambda memory allocation for faster processing', isCorrect: false }
        ],
        explanation: 'AppSync with GraphQL reduces API calls through query batching and parallel resolution, dramatically reducing overall latency for aggregated data.',
        explanationDetails: {
            summary: 'AppSync optimization benefits:',
            breakdown: [
                'Query batching: Single request instead of 5-7 calls',
                'Parallel resolution: Service calls execute simultaneously',
                'Reduced latency: From 1000-1400ms to 200-300ms total',
                'Caching built-in: Further performance improvements'
            ],
            otherOptions: 'A) Caching doesn\'t help with personalized content\nC) Still requires serial service calls\nD) Lambda memory doesn\'t solve aggregation latency'
        }
    },

    {
        id: 129,
        questionNumber: 29,
        category: 'AWS Performance - ML Inference',
        difficulty: 'Expert',
        domain: 'Domain 2: Design High-Performing Architectures',
        questionText: 'A video streaming platform needs real-time content moderation using computer vision ML models. They process 1,000 concurrent streams with <100ms inference latency requirement. Current SageMaker endpoint shows 300ms latency. Which optimization provides the required performance?',
        options: [
            { text: 'A) Use larger SageMaker instance types with more GPUs', isCorrect: false },
            { text: 'B) Deploy models to Lambda with Provisioned Concurrency', isCorrect: false },
            { text: 'C) Implement SageMaker multi-model endpoints with edge deployment using AWS IoT Greengrass', isCorrect: false },
            { text: 'D) Use Amazon EC2 Inf1 instances with AWS Neuron for optimized inference', isCorrect: true }
        ],
        explanation: 'EC2 Inf1 instances with AWS Inferentia chips provide the lowest latency and highest throughput for real-time ML inference at scale.',
        explanationDetails: {
            summary: 'Inf1 instance optimization benefits:',
            breakdown: [
                'AWS Inferentia chips: Purpose-built for ML inference',
                'Sub-100ms latency: Achievable with optimized models',
                'High throughput: Handle 1,000 concurrent streams',
                'Cost-effective: Up to 70% lower cost than GPU instances'
            ],
            otherOptions: 'A) Larger instances don\'t guarantee latency reduction\nB) Lambda cold starts and limits prevent consistent <100ms\nC) Edge deployment adds complexity without meeting core requirement'
        }
    },

    // DOMAIN 4 - Additional Cost Optimization

    {
        id: 130,
        questionNumber: 30,
        category: 'AWS Cost Optimization - Hybrid Architecture',
        difficulty: 'Expert',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A company wants to modernize their on-premises data warehouse (50TB) to AWS. They need to maintain some on-premises reporting tools while enabling cloud analytics. Budget is limited to $5,000/month. Query patterns: 20% hot data (daily), 30% warm (weekly), 50% cold (monthly). Which architecture provides the BEST cost optimization?',
        options: [
            { text: 'A) Migrate everything to Redshift with Reserved Instances', isCorrect: false },
            { text: 'B) Use Redshift for hot data, Redshift Spectrum for warm/cold data in S3, with AWS Direct Connect', isCorrect: true },
            { text: 'C) Keep all data on-premises and use Athena federated queries', isCorrect: false },
            { text: 'D) Use RDS PostgreSQL with read replicas for all data', isCorrect: false }
        ],
        explanation: 'Tiered approach with Redshift for hot data and Spectrum for S3-based warm/cold data provides optimal price-performance within budget constraints.',
        explanationDetails: {
            summary: 'Hybrid data warehouse optimization:',
            breakdown: [
                'Redshift (10TB): ~$2,500/month for hot data performance',
                'S3 + Spectrum (40TB): ~$1,000/month for warm/cold storage',
                'Direct Connect: ~$1,500/month for reliable hybrid connectivity',
                'Total: ~$5,000/month within budget with optimal performance'
            ],
            otherOptions: 'A) Full Redshift for 50TB exceeds budget significantly\nC) Athena federated queries too slow for hot data needs\nD) RDS not optimized for analytics workloads, would exceed budget'
        }
    },
    // AWS SAA-C03 Additional Questions (Focus on Domain 4 and Modern Services)

    {
        id: 131,
        questionNumber: 31,
        category: 'AWS Cost Optimization - Serverless Economics',
        difficulty: 'Expert',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A news aggregation service processes 50 million articles monthly with unpredictable spikes during breaking news (up to 10x normal load). Current EC2-based architecture costs $12,000/month and struggles with spike handling. Articles average 5KB, require text analysis, and must be searchable within 1 minute. Which serverless architecture provides the best cost optimization while meeting requirements?',
        options: [
            { text: 'A) API Gateway → Lambda → DynamoDB with ElasticSearch', isCorrect: false },
            { text: 'B) EventBridge → SQS → Lambda with concurrent execution limits → S3 → Athena with Glue crawlers', isCorrect: true },
            { text: 'C) Kinesis Data Streams → Kinesis Analytics → RDS', isCorrect: false },
            { text: 'D) Step Functions orchestrating multiple Lambda functions → Aurora Serverless', isCorrect: false }
        ],
        explanation: 'EventBridge with SQS provides event buffering for spikes, Lambda with concurrency limits controls costs, S3 offers cheap storage, and Athena enables SQL searches without database costs.',
        explanationDetails: {
            summary: 'Serverless architecture cost optimization:',
            breakdown: [
                'EventBridge + SQS: Handles 10x spikes without over-provisioning',
                'Lambda concurrency limits: Prevents runaway costs during spikes',
                'S3 storage: $0.023/GB vs database storage at $0.10/GB',
                'Athena queries: Pay-per-query ($5/TB scanned) vs always-on database'
            ],
            otherOptions: 'A) ElasticSearch cluster costs $3000+/month minimum\nC) Kinesis Analytics expensive for sporadic spikes\nD) Aurora Serverless still has minimum capacity costs'
        }
    },

    {
        id: 132,
        questionNumber: 32,
        category: 'AWS Cost Optimization - Container Right-Sizing',
        difficulty: 'Application',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A microservices application runs 40 containers on ECS with varying resource needs: 10 containers need 4 vCPU/8GB (API servers), 20 need 1 vCPU/2GB (workers), and 10 need 0.5 vCPU/1GB (sidecars). Current costs using m5.4xlarge instances are $8,000/month with 35% CPU utilization. Which optimization strategy provides maximum cost savings?',
        options: [
            { text: 'A) Switch to larger instances for better CPU:memory ratio', isCorrect: false },
            { text: 'B) Use ECS capacity providers with mixed instance types and Spot for workers', isCorrect: true },
            { text: 'C) Migrate all containers to Fargate with right-sized task definitions', isCorrect: false },
            { text: 'D) Implement cluster auto-scaling based on CPU utilization', isCorrect: false }
        ],
        explanation: 'Capacity providers enable mixing instance types optimized for different workloads, while Spot instances for stateless workers can reduce costs by 70-90%.',
        explanationDetails: {
            summary: 'Container cost optimization strategy:',
            breakdown: [
                'Mixed instances: c5 for CPU-intensive, r5 for memory-intensive',
                'Spot for workers: 70% savings on 20 containers (stateless)',
                'Better bin packing: Increases utilization from 35% to 75%',
                'Total savings: Approximately 60% reduction from $8,000'
            ],
            otherOptions: 'A) Larger instances worsen utilization problems\nC) Fargate more expensive for predictable workloads\nD) Auto-scaling doesn\'t address instance type mismatch'
        }
    },

    {
        id: 133,
        questionNumber: 33,
        category: 'AWS ML Services Integration',
        difficulty: 'Application',
        domain: 'Domain 3: Design Secure Applications',
        questionText: 'A social media platform needs to detect inappropriate content in user posts (text and images) in real-time. They process 1 million posts daily and must comply with COPPA regulations for users under 13. Which combination of AWS services provides comprehensive content moderation with compliance controls?',
        options: [
            { text: 'A) Amazon Comprehend for text and custom SageMaker model for images', isCorrect: false },
            { text: 'B) Amazon Rekognition Content Moderation, Amazon Comprehend toxicity detection, with Lambda age-gating logic', isCorrect: true },
            { text: 'C) Amazon Textract for text extraction and Amazon Personalize for content filtering', isCorrect: false },
            { text: 'D) AWS Glue for data preparation and Amazon Forecast for predicting inappropriate content', isCorrect: false }
        ],
        explanation: 'Rekognition provides pre-trained image moderation, Comprehend detects toxic text, and Lambda implements age-appropriate filtering logic for COPPA compliance.',
        explanationDetails: {
            summary: 'Content moderation architecture components:',
            breakdown: [
                'Rekognition: Detects inappropriate images (violence, adult content)',
                'Comprehend: Identifies toxic text, PII, and sentiment',
                'Lambda age-gating: Applies stricter rules for users under 13',
                'Real-time processing: Sub-second moderation decisions'
            ],
            otherOptions: 'A) Custom models require training data and maintenance\nC) Textract is for document processing, not moderation\nD) Forecast predicts time-series data, not content issues'
        }
    },

    {
        id: 134,
        questionNumber: 34,
        category: 'AWS Architecture - IoT and Edge',
        difficulty: 'Expert',
        domain: 'Domain 1: Design Resilient Architectures',
        questionText: 'A manufacturing company operates 500 factories with 100 IoT sensors each, generating 1KB messages every second. They need local anomaly detection with sub-second response, cloud-based analytics, and must operate during internet outages. Which architecture provides the required edge computing capabilities?',
        options: [
            { text: 'A) Direct IoT Core ingestion with Kinesis Analytics for anomaly detection', isCorrect: false },
            { text: 'B) AWS IoT Greengrass with Lambda functions, local message routing, and intermittent cloud sync', isCorrect: true },
            { text: 'C) EC2 instances in each factory with VPN connections to cloud', isCorrect: false },
            { text: 'D) AWS Outposts in each factory for local processing', isCorrect: false }
        ],
        explanation: 'IoT Greengrass enables local Lambda execution for sub-second anomaly detection, continues operating offline, and synchronizes with cloud when connected.',
        explanationDetails: {
            summary: 'Edge computing with IoT Greengrass benefits:',
            breakdown: [
                'Local Lambda: Sub-second anomaly detection at edge',
                'Offline operation: Continues processing during outages',
                'Efficient sync: Batches data for cloud analytics when connected',
                'Cost-effective: No need for servers in 500 locations'
            ],
            otherOptions: 'A) Requires constant internet, no local processing\nC) Managing 500 EC2 instances operationally complex\nD) Outposts overkill and expensive for IoT workloads'
        }
    },

    {
        id: 135,
        questionNumber: 35,
        category: 'AWS Cost Optimization - Streaming Data',
        difficulty: 'Application',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A ride-sharing app ingests 100,000 location updates per second during peak hours (6-9 AM, 5-8 PM) but only 5,000 per second during off-peak. Current Kinesis Data Streams with provisioned shards costs $15,000/month. Real-time processing is required only during peak hours; batch processing is acceptable off-peak. Which architecture reduces costs while meeting requirements?',
        options: [
            { text: 'A) Kinesis Data Streams with auto-scaling shards based on traffic', isCorrect: false },
            { text: 'B) Kinesis Data Streams On-Demand for peaks, Kinesis Firehose to S3 for off-peak batch', isCorrect: true },
            { text: 'C) Replace with SQS queues and Lambda functions', isCorrect: false },
            { text: 'D) DynamoDB Streams with Lambda triggers', isCorrect: false }
        ],
        explanation: 'Kinesis On-Demand eliminates over-provisioning costs while Firehose to S3 provides cost-effective batch processing during off-peak hours.',
        explanationDetails: {
            summary: 'Streaming cost optimization strategy:',
            breakdown: [
                'Kinesis On-Demand: Pay only for actual throughput',
                'Peak hours: Real-time processing as required',
                'Off-peak Firehose: 90% cheaper than real-time streams',
                'Estimated savings: 65% reduction from $15,000/month'
            ],
            otherOptions: 'A) Auto-scaling still requires minimum shards\nC) SQS lacks streaming semantics for real-time\nD) DynamoDB Streams tied to table operations'
        }
    },

    {
        id: 136,
        questionNumber: 36,
        category: 'AWS Architecture - Multi-Region',
        difficulty: 'Expert',
        domain: 'Domain 1: Design Resilient Architectures',
        questionText: 'A global trading platform requires <10ms latency for 99% of users across US, EU, and APAC regions. The platform processes 1 million trades daily with strict consistency requirements. Each trade must be reflected globally within 100ms. Current single-region deployment shows 150ms+ latency for distant users. Which multi-region architecture best meets these requirements?',
        options: [
            { text: 'A) Deploy full stack in each region with eventual consistency', isCorrect: false },
            { text: 'B) Aurora Global Database with local read replicas, Route 53 geolocation routing, and DynamoDB Global Tables for session data', isCorrect: true },
            { text: 'C) Single region with CloudFront caching for static content', isCorrect: false },
            { text: 'D) Active-active regions with asynchronous replication', isCorrect: false }
        ],
        explanation: 'Aurora Global Database provides <1 second replication with strong consistency, local read replicas ensure <10ms reads, while DynamoDB Global Tables handle session state with automatic conflict resolution.',
        explanationDetails: {
            summary: 'Multi-region architecture for low latency trading:',
            breakdown: [
                'Aurora Global: <1 second cross-region replication',
                'Local read replicas: <10ms read latency per region',
                'Write forwarding: Maintains consistency for trades',
                'DynamoDB Global Tables: Multi-master for session data'
            ],
            otherOptions: 'A) Eventual consistency violates trade requirements\nC) CloudFront doesn\'t help with dynamic trade data\nD) Async replication can\'t guarantee 100ms consistency'
        }
    },

    {
        id: 137,
        questionNumber: 37,
        category: 'AWS Security - Zero Trust Architecture',
        difficulty: 'Expert',
        domain: 'Domain 3: Design Secure Applications',
        questionText: 'A financial services company needs to implement zero-trust access to their AWS environment for 500 developers across 50 teams. Requirements include: no long-lived credentials, audit trail of all actions, team-based access boundaries, and integration with existing Okta SSO. Which solution provides the most comprehensive zero-trust implementation?',
        options: [
            { text: 'A) IAM users with MFA and IP restrictions for each developer', isCorrect: false },
            { text: 'B) AWS SSO with Okta integration, Permission Sets with session tags, and CloudTrail with EventBridge rules', isCorrect: true },
            { text: 'C) Cognito user pools with custom authorizers', isCorrect: false },
            { text: 'D) IAM roles with external ID and session policies', isCorrect: false }
        ],
        explanation: 'AWS SSO provides temporary credentials, Okta integration enables SAML-based authentication, Permission Sets with session tags enforce team boundaries, while CloudTrail ensures complete audit trails.',
        explanationDetails: {
            summary: 'Zero-trust implementation components:',
            breakdown: [
                'AWS SSO: No long-lived credentials, automatic rotation',
                'Permission Sets: Team-based access with session tags',
                'Okta SAML: Leverages existing identity provider',
                'CloudTrail + EventBridge: Real-time audit and alerting'
            ],
            otherOptions: 'A) IAM users require long-lived access keys\nC) Cognito designed for application users, not AWS access\nD) Missing centralized management for 500 developers'
        }
    },

    {
        id: 138,
        questionNumber: 38,
        category: 'AWS Performance - Hybrid Networking',
        difficulty: 'Application',
        domain: 'Domain 2: Design High-Performing Architectures',
        questionText: 'A media company needs to transfer 50TB of daily video content from on-premises editing stations to S3 for processing. Current internet upload takes 20 hours, causing production delays. The solution must complete transfers within 4 hours and support 100 concurrent editor workstations. Which approach best meets these performance requirements?',
        options: [
            { text: 'A) Multiple Site-to-Site VPN connections with ECMP', isCorrect: false },
            { text: 'B) AWS Direct Connect with Virtual Interfaces and S3 Transfer Acceleration', isCorrect: true },
            { text: 'C) Storage Gateway File Gateway with local cache', isCorrect: false },
            { text: 'D) Daily AWS Snowball Edge shipments', isCorrect: false }
        ],
        explanation: 'Direct Connect provides dedicated bandwidth for consistent transfer speeds, VIFs enable private S3 connectivity, and Transfer Acceleration optimizes the upload path for concurrent workstations.',
        explanationDetails: {
            summary: 'High-performance hybrid transfer solution:',
            breakdown: [
                'Direct Connect: 10Gbps dedicated bandwidth',
                'VIF to S3: Private connectivity, no internet congestion',
                'Transfer Acceleration: Optimizes for 100 concurrent uploads',
                '50TB in 4 hours: Requires ~3.5Gbps sustained throughput'
            ],
            otherOptions: 'A) VPN limited to ~1.25Gbps aggregate bandwidth\nC) File Gateway adds latency and cache limitations\nD) Snowball shipping time exceeds 4-hour requirement'
        }
    },

    {
        id: 139,
        questionNumber: 39,
        category: 'AWS Architecture - Event-Driven Serverless',
        difficulty: 'Expert',
        domain: 'Domain 2: Design High-Performing Architectures',
        questionText: 'An e-commerce platform needs to process order events with multiple downstream systems: inventory (must process once), shipping (at-least-once), analytics (can tolerate duplicates), and email (exactly-once). Order volume varies from 100/minute to 10,000/minute during flash sales. Which event-driven architecture ensures correct delivery semantics for each consumer?',
        options: [
            { text: 'A) SNS with SQS queues for all consumers', isCorrect: false },
            { text: 'B) EventBridge with rules routing to SQS FIFO for inventory, standard SQS for shipping, Kinesis for analytics, and Step Functions for email', isCorrect: true },
            { text: 'C) Kinesis Data Streams with Lambda consumers', isCorrect: false },
            { text: 'D) Direct Lambda invocations with error handling', isCorrect: false }
        ],
        explanation: 'EventBridge provides content-based routing, SQS FIFO ensures exactly-once processing, standard SQS handles at-least-once, Kinesis supports analytics replay, and Step Functions manages email workflow state.',
        explanationDetails: {
            summary: 'Event delivery semantics per consumer:',
            breakdown: [
                'SQS FIFO: Exactly-once for critical inventory updates',
                'Standard SQS: At-least-once with retry for shipping',
                'Kinesis: Replay capability for analytics reprocessing',
                'Step Functions: Manages email state to prevent duplicates'
            ],
            otherOptions: 'A) SNS+SQS doesn\'t provide exactly-once semantics\nC) Kinesis requires all consumers to process in order\nD) Direct invocations lack delivery guarantees'
        }
    },

    {
        id: 140,
        questionNumber: 40,
        category: 'AWS Cost Optimization - Modern Architectures',
        difficulty: 'Expert',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A SaaS company runs 200 customer environments, each with identical architecture: ALB, 2-10 EC2 instances, RDS MySQL, and 50GB of S3 storage. Monthly costs are $400,000 with only 30% resource utilization. Customers require isolation for compliance. Which modernization approach provides maximum cost reduction while maintaining isolation?',
        options: [
            { text: 'A) Containerize applications and run all customers on shared EKS cluster', isCorrect: false },
            { text: 'B) AWS App Runner with customer-specific environments, Aurora Serverless v2, and S3 bucket policies', isCorrect: true },
            { text: 'C) Lambda functions with RDS Proxy and separate VPCs', isCorrect: false },
            { text: 'D) Consolidate all customers into a single multi-tenant application', isCorrect: false }
        ],
        explanation: 'App Runner provides serverless compute with environment isolation, Aurora Serverless v2 scales database resources based on actual usage, eliminating overprovisioning while maintaining compliance isolation.',
        explanationDetails: {
            summary: 'Serverless multi-tenant cost optimization:',
            breakdown: [
                'App Runner: Pay-per-request pricing, no idle EC2 costs',
                'Aurora Serverless v2: Scales down to 0.5 ACU when idle',
                'Environment isolation: Separate App Runner services per customer',
                'Estimated savings: 70% reduction through utilization-based pricing'
            ],
            otherOptions: 'A) Shared cluster violates compliance isolation requirements\nC) Lambda cold starts problematic for web applications\nD) Multi-tenant architecture breaks compliance requirements'
        }
    },
    {
        id: 141,
        questionNumber: 41,
        category: 'Design Resilient Architectures - Multi-AZ Deployments',
        difficulty: 'Knowledge',
        domain: 'Domain 1',
        questionText: 'A company wants to ensure their RDS database can automatically failover to another Availability Zone in case of an outage. Which feature should they enable?',
        options: [
            { text: 'A) Read Replicas', isCorrect: false },
            { text: 'B) Multi-AZ Deployment', isCorrect: true },
            { text: 'C) Cross-Region Replication', isCorrect: false },
            { text: 'D) Database Snapshots', isCorrect: false }
        ],
        explanation: 'Multi-AZ deployment provides automatic failover capability by maintaining a synchronous standby replica in a different Availability Zone.',
        explanationDetails: {
            summary: 'Multi-AZ provides automatic failover for high availability:',
            breakdown: [
                'Synchronous data replication to standby instance',
                'Automatic failover in case of primary instance failure',
                'Minimal downtime during failover (typically 60-120 seconds)',
                'No manual intervention required for failover'
            ],
            otherOptions: 'A) Read Replicas provide scaling, not automatic failover\nC) Cross-Region is for disaster recovery, not automatic failover\nD) Snapshots are for backup, not high availability'
        }
    },
    {
        id: 142,
        questionNumber: 42,
        category: 'Design Resilient Architectures - Load Balancing',
        difficulty: 'Comprehension',
        domain: 'Domain 1',
        questionText: 'An application requires load balancing at the network layer (Layer 4) with ultra-low latency and the ability to handle millions of requests per second. Which AWS service is most appropriate?',
        options: [
            { text: 'A) Application Load Balancer (ALB)', isCorrect: false },
            { text: 'B) Network Load Balancer (NLB)', isCorrect: true },
            { text: 'C) Classic Load Balancer', isCorrect: false },
            { text: 'D) CloudFront', isCorrect: false }
        ],
        explanation: 'Network Load Balancer operates at Layer 4, provides ultra-low latency, and can handle millions of requests per second with static IP addresses.',
        explanationDetails: {
            summary: 'NLB characteristics for high-performance applications:',
            breakdown: [
                'Operates at Layer 4 (Transport layer)',
                'Ultra-low latency performance',
                'Handles millions of requests per second',
                'Provides static IP addresses',
                'Preserves source IP address'
            ],
            otherOptions: 'A) ALB operates at Layer 7, higher latency\nC) Classic LB is legacy, not optimized for high performance\nD) CloudFront is a CDN, not a load balancer'
        }
    },
    {
        id: 143,
        questionNumber: 43,
        category: 'Design Resilient Architectures - Auto Scaling',
        difficulty: 'Application',
        domain: 'Domain 1',
        questionText: 'Your web application experiences predictable traffic spikes every weekday from 9 AM to 5 PM. What Auto Scaling strategy would be most cost-effective?',
        options: [
            { text: 'A) Reactive scaling based on CPU utilization', isCorrect: false },
            { text: 'B) Scheduled scaling with time-based policies', isCorrect: true },
            { text: 'C) Manual scaling during business hours', isCorrect: false },
            { text: 'D) Maintaining constant high capacity', isCorrect: false }
        ],
        explanation: 'Scheduled scaling allows you to proactively scale based on predictable patterns, ensuring capacity is available before demand increases.',
        explanationDetails: {
            summary: 'Scheduled scaling benefits for predictable workloads:',
            breakdown: [
                'Proactive scaling before demand increases',
                'Eliminates lag time of reactive scaling',
                'More cost-effective than maintaining constant capacity',
                'Ensures adequate capacity during known peak periods'
            ],
            otherOptions: 'A) Reactive scaling has lag time, may not handle sudden spikes\nC) Manual scaling is not automated and error-prone\nD) Constant high capacity wastes money during low-demand periods'
        }
    },

    // Design High-Performing Architectures
    {
        id: 144,
        questionNumber: 44,
        category: 'Design High-Performing Architectures - Storage',
        difficulty: 'Knowledge',
        domain: 'Domain 2',
        questionText: 'Which EBS volume type provides the highest IOPS performance for latency-sensitive workloads?',
        options: [
            { text: 'A) General Purpose SSD (gp3)', isCorrect: false },
            { text: 'B) Provisioned IOPS SSD (io2)', isCorrect: true },
            { text: 'C) Throughput Optimized HDD (st1)', isCorrect: false },
            { text: 'D) Cold HDD (sc1)', isCorrect: false }
        ],
        explanation: 'Provisioned IOPS SSD (io2) provides the highest IOPS performance with consistent, low-latency performance for I/O-intensive applications.',
        explanationDetails: {
            summary: 'io2 volume characteristics:',
            breakdown: [
                'Up to 64,000 IOPS per volume',
                'Consistent, low-latency performance',
                'Designed for I/O-intensive applications',
                '99.999% durability',
                'Sub-millisecond latency'
            ],
            otherOptions: 'A) gp3 provides good performance but lower max IOPS\nC) st1 is optimized for throughput, not IOPS\nD) sc1 is designed for infrequent access'
        }
    },
    {
        id: 145,
        questionNumber: 45,
        category: 'Design High-Performing Architectures - Caching',
        difficulty: 'Comprehension',
        domain: 'Domain 2',
        questionText: 'An application needs to cache frequently accessed database query results with sub-millisecond latency. Which AWS service is most appropriate?',
        options: [
            { text: 'A) Amazon S3', isCorrect: false },
            { text: 'B) Amazon ElastiCache', isCorrect: true },
            { text: 'C) Amazon RDS Read Replicas', isCorrect: false },
            { text: 'D) Amazon CloudFront', isCorrect: false }
        ],
        explanation: 'ElastiCache provides in-memory caching with sub-millisecond latency, perfect for caching database query results.',
        explanationDetails: {
            summary: 'ElastiCache for database caching:',
            breakdown: [
                'In-memory data store with sub-millisecond latency',
                'Supports Redis and Memcached engines',
                'Reduces database load by caching frequent queries',
                'Scales to handle millions of requests per second'
            ],
            otherOptions: 'A) S3 is object storage, not designed for caching\nC) Read Replicas reduce load but still have database latency\nD) CloudFront caches static content, not database queries'
        }
    },
    {
        id: 146,
        questionNumber: 46,
        category: 'Design High-Performing Architectures - CDN',
        difficulty: 'Application',
        domain: 'Domain 2',
        questionText: 'A global e-commerce website wants to reduce latency for users worldwide while reducing bandwidth costs. The site serves both static content and dynamic API responses. What combination provides the best solution?',
        options: [
            { text: 'A) CloudFront for static content only', isCorrect: false },
            { text: 'B) CloudFront for static content + API Gateway caching for dynamic content', isCorrect: true },
            { text: 'C) Multiple S3 buckets in different regions', isCorrect: false },
            { text: 'D) ElastiCache in multiple regions', isCorrect: false }
        ],
        explanation: 'CloudFront reduces latency for static content globally, while API Gateway caching handles dynamic content caching close to users.',
        explanationDetails: {
            summary: 'Comprehensive caching strategy:',
            breakdown: [
                'CloudFront edge locations serve static content globally',
                'API Gateway caching reduces backend load for dynamic content',
                'Combined solution addresses both static and dynamic content',
                'Reduces bandwidth costs and improves user experience'
            ],
            otherOptions: 'A) Doesn\'t address dynamic content caching\nC) S3 alone doesn\'t provide edge caching\nD) ElastiCache doesn\'t provide global edge locations'
        }
    },

    // Design Secure Applications and Architectures
    {
        id: 147,
        questionNumber: 47,
        category: 'Design Secure Applications - IAM',
        difficulty: 'Knowledge',
        domain: 'Domain 3',
        questionText: 'Which IAM feature allows you to grant temporary credentials to external users without creating permanent IAM users?',
        options: [
            { text: 'A) IAM Groups', isCorrect: false },
            { text: 'B) IAM Roles with Trust Policies', isCorrect: true },
            { text: 'C) IAM Policies', isCorrect: false },
            { text: 'D) Access Keys', isCorrect: false }
        ],
        explanation: 'IAM Roles with Trust Policies allow external entities to assume temporary credentials without permanent IAM users.',
        explanationDetails: {
            summary: 'IAM Roles for temporary access:',
            breakdown: [
                'Temporary credentials with configurable expiration',
                'Trust policies define who can assume the role',
                'No permanent credentials to manage',
                'Supports cross-account access and federated users'
            ],
            otherOptions: 'A) Groups organize users, don\'t provide external access\nC) Policies define permissions, not temporary access\nD) Access Keys are permanent credentials'
        }
    },
    {
        id: 148,
        questionNumber: 48,
        category: 'Design Secure Applications - Encryption',
        difficulty: 'Comprehension',
        domain: 'Domain 3',
        questionText: 'A company needs to encrypt sensitive data in S3 with customer-managed encryption keys and audit trails of key usage. Which solution meets these requirements?',
        options: [
            { text: 'A) S3 Server-Side Encryption with Amazon S3-Managed Keys (SSE-S3)', isCorrect: false },
            { text: 'B) S3 Server-Side Encryption with AWS KMS (SSE-KMS)', isCorrect: true },
            { text: 'C) S3 Client-Side Encryption', isCorrect: false },
            { text: 'D) S3 Bucket Policies', isCorrect: false }
        ],
        explanation: 'SSE-KMS provides customer-managed keys through AWS KMS with detailed audit trails via CloudTrail.',
        explanationDetails: {
            summary: 'SSE-KMS benefits for compliance:',
            breakdown: [
                'Customer-managed encryption keys in AWS KMS',
                'Detailed audit trails through CloudTrail',
                'Automatic key rotation capabilities',
                'Fine-grained access control for encryption keys'
            ],
            otherOptions: 'A) SSE-S3 uses AWS-managed keys, not customer-managed\nC) Client-side encryption requires application changes\nD) Bucket policies control access, not encryption'
        }
    },
    {
        id: 149,
        questionNumber: 49,
        category: 'Design Secure Applications - Network Security',
        difficulty: 'Application',
        domain: 'Domain 3',
        questionText: 'You need to implement defense-in-depth for a web application with the following requirements: DDoS protection, WAF capabilities, and SSL termination. What combination provides the most comprehensive solution?',
        options: [
            { text: 'A) CloudFront + AWS Shield + AWS WAF + ALB', isCorrect: true },
            { text: 'B) Just AWS WAF on ALB', isCorrect: false },
            { text: 'C) CloudFront + ALB only', isCorrect: false },
            { text: 'D) AWS Shield Advanced only', isCorrect: false }
        ],
        explanation: 'This combination provides comprehensive protection: CloudFront for global distribution and basic DDoS protection, Shield for advanced DDoS protection, WAF for application-layer filtering, and ALB for SSL termination and load balancing.',
        explanationDetails: {
            summary: 'Defense-in-depth architecture:',
            breakdown: [
                'CloudFront: Global edge locations and basic DDoS protection',
                'AWS Shield: Advanced DDoS protection',
                'AWS WAF: Application-layer attack filtering',
                'ALB: SSL termination and intelligent load balancing'
            ],
            otherOptions: 'B) WAF alone doesn\'t provide DDoS protection\nC) Missing WAF and Shield protection\nD) Shield alone doesn\'t provide WAF or SSL termination'
        }
    },

    // Design Cost-Optimized Architectures
    {
        id: 150,
        questionNumber: 50,
        category: 'Design Cost-Optimized Architectures - Instance Types',
        difficulty: 'Knowledge',
        domain: 'Domain 4',
        questionText: 'Which EC2 pricing model offers the highest discount for steady-state workloads with flexible instance types?',
        options: [
            { text: 'A) On-Demand Instances', isCorrect: false },
            { text: 'B) Reserved Instances', isCorrect: false },
            { text: 'C) Savings Plans', isCorrect: true },
            { text: 'D) Spot Instances', isCorrect: false }
        ],
        explanation: 'Savings Plans offer the highest discounts (up to 72%) with flexibility across instance types, sizes, and regions.',
        explanationDetails: {
            summary: 'Savings Plans advantages:',
            breakdown: [
                'Up to 72% discount compared to On-Demand pricing',
                'Flexibility across instance types, sizes, OS, and regions',
                'Automatic application to eligible usage',
                'Lower commitment complexity than Reserved Instances'
            ],
            otherOptions: 'A) On-Demand has no discount\nB) Reserved Instances have less flexibility\nD) Spot Instances can be interrupted'
        }
    },
    {
        id: 151,
        questionNumber: 51,
        category: 'Design Cost-Optimized Architectures - Storage',
        difficulty: 'Comprehension',
        domain: 'Domain 4',
        questionText: 'A company has 100 TB of data that is accessed once per year for compliance purposes. Which S3 storage class provides the most cost-effective solution?',
        options: [
            { text: 'A) S3 Standard', isCorrect: false },
            { text: 'B) S3 Standard-IA', isCorrect: false },
            { text: 'C) S3 Glacier Deep Archive', isCorrect: true },
            { text: 'D) S3 One Zone-IA', isCorrect: false }
        ],
        explanation: 'S3 Glacier Deep Archive is the most cost-effective storage class for long-term archival with retrieval times of 12 hours or less.',
        explanationDetails: {
            summary: 'Glacier Deep Archive for compliance data:',
            breakdown: [
                'Lowest cost storage class in S3',
                'Designed for data accessed once or twice per year',
                'Retrieval time of 12 hours or less',
                '99.999999999% (11 9s) durability'
            ],
            otherOptions: 'A) Standard is for frequent access\nB) Standard-IA for monthly access\nD) One Zone-IA for infrequent but faster access'
        }
    },
    {
        id: 152,
        questionNumber: 52,
        category: 'Design Cost-Optimized Architectures - Monitoring',
        difficulty: 'Application',
        domain: 'Domain 4',
        questionText: 'Your organization wants to implement cost monitoring and automatically stop resources when budgets are exceeded. What combination of AWS services accomplishes this?',
        options: [
            { text: 'A) AWS Budgets + Lambda functions + CloudWatch Events', isCorrect: true },
            { text: 'B) Cost Explorer only', isCorrect: false },
            { text: 'C) CloudWatch Alarms only', isCorrect: false },
            { text: 'D) AWS Config Rules', isCorrect: false }
        ],
        explanation: 'AWS Budgets can trigger alerts, Lambda functions can execute cost control actions, and CloudWatch Events coordinates the automation.',
        explanationDetails: {
            summary: 'Automated cost control architecture:',
            breakdown: [
                'AWS Budgets: Set spending thresholds and alerts',
                'Lambda functions: Execute automated responses (stop instances, etc.)',
                'CloudWatch Events: Trigger actions based on budget alerts',
                'Comprehensive automation for cost control'
            ],
            otherOptions: 'B) Cost Explorer only provides reporting, no automation\nC) CloudWatch Alarms don\'t monitor costs directly\nD) Config Rules are for compliance, not cost control'
        }
    },

    // Additional Mixed Domain Questions
    {
        id: 153,
        questionNumber: 53,
        category: 'Design Resilient Architectures - Disaster Recovery',
        difficulty: 'Application',
        domain: 'Domain 1',
        questionText: 'A critical application requires an RTO of 1 hour and RPO of 15 minutes. The application runs on EC2 instances with data stored in RDS. What disaster recovery strategy is most appropriate?',
        options: [
            { text: 'A) Backup and Restore', isCorrect: false },
            { text: 'B) Pilot Light', isCorrect: false },
            { text: 'C) Warm Standby', isCorrect: true },
            { text: 'D) Multi-Site Active/Active', isCorrect: false }
        ],
        explanation: 'Warm Standby meets the 1-hour RTO requirement while being more cost-effective than Multi-Site Active/Active.',
        explanationDetails: {
            summary: 'Warm Standby characteristics:',
            breakdown: [
                'Scaled-down version of production running in DR region',
                'Can meet RTO of minutes to hours',
                'Continuous data replication for low RPO',
                'More cost-effective than full active/active setup'
            ],
            otherOptions: 'A) Backup/Restore takes hours, exceeds RTO\nB) Pilot Light might not meet 1-hour RTO\nD) Multi-Site is more expensive than needed'
        }
    },
    {
        id: 154,
        questionNumber: 54,
        category: 'Design High-Performing Architectures - Database',
        difficulty: 'Comprehension',
        domain: 'Domain 2',
        questionText: 'An application performs mostly read operations with occasional writes. The read workload is 10x higher than writes. What database configuration optimizes performance?',
        options: [
            { text: 'A) Single RDS instance with Multi-AZ', isCorrect: false },
            { text: 'B) RDS with Read Replicas', isCorrect: true },
            { text: 'C) DynamoDB with Global Tables', isCorrect: false },
            { text: 'D) ElastiCache only', isCorrect: false }
        ],
        explanation: 'Read Replicas distribute read traffic across multiple database instances while the primary handles writes.',
        explanationDetails: {
            summary: 'Read Replicas for read-heavy workloads:',
            breakdown: [
                'Offload read traffic from primary database',
                'Multiple read replicas can scale read capacity',
                'Primary instance dedicated to write operations',
                'Improves overall application performance'
            ],
            otherOptions: 'A) Single instance can\'t handle high read volume\nC) DynamoDB Global Tables are for multi-region, not read scaling\nD) ElastiCache alone can\'t handle writes'
        }
    },
    {
        id: 155,
        questionNumber: 55,
        category: 'Design Secure Applications - Data Protection',
        difficulty: 'Application',
        domain: 'Domain 3',
        questionText: 'A healthcare application must ensure PHI (Protected Health Information) is encrypted in transit and at rest, with detailed access logging. Which combination meets HIPAA compliance requirements?',
        options: [
            { text: 'A) HTTPS + S3 SSE-S3 + CloudTrail', isCorrect: false },
            { text: 'B) HTTPS + S3 SSE-KMS + CloudTrail + VPC Flow Logs', isCorrect: true },
            { text: 'C) TLS + S3 Default Encryption', isCorrect: false },
            { text: 'D) HTTPS + S3 Bucket Policies', isCorrect: false }
        ],
        explanation: 'This combination provides comprehensive encryption and logging: HTTPS for transit, SSE-KMS for detailed key management, CloudTrail for API logging, and VPC Flow Logs for network monitoring.',
        explanationDetails: {
            summary: 'HIPAA-compliant architecture components:',
            breakdown: [
                'HTTPS: Encryption in transit',
                'SSE-KMS: Customer-managed encryption at rest',
                'CloudTrail: Detailed API access logging',
                'VPC Flow Logs: Network traffic monitoring'
            ],
            otherOptions: 'A) SSE-S3 doesn\'t provide customer key management\nC) Missing comprehensive logging\nD) Bucket policies don\'t provide encryption'
        }
    },
    // Add these questions to your AWS_Certified_Architect_Associate_Questions.ts file

    {
        id: 156,
        questionNumber: 56,
        category: 'AWS Cost Optimization - Storage Lifecycle',
        difficulty: 'Application',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A media production company generates 5TB of raw video footage daily. This footage is actively accessed by editors for the first 7 days, then rarely accessed for the next 90 days, and must be retained for 5 years for legal compliance. Which S3 lifecycle policy and storage class combination provides the most cost-effective solution?',
        options: [
            { text: 'A) S3 Standard for 7 days, then S3 One Zone-IA for 90 days, then S3 Glacier Deep Archive for 5 years.', isCorrect: false },
            { text: 'B) S3 Intelligent-Tiering with Archival Access Tier for 5 years.', isCorrect: false },
            { text: 'C) S3 Standard for 7 days, then S3 Standard-IA for 90 days, then S3 Glacier Flexible Retrieval for 5 years.', isCorrect: true },
            { text: 'D) Direct upload to S3 Glacier Deep Archive for all footage.', isCorrect: false }
        ],
        explanation: 'S3 Standard-IA is cost-effective for infrequently accessed data. S3 Glacier Flexible Retrieval (formerly S3 Glacier) is suitable for long-term archives that are rarely accessed but need retrieval within hours, meeting the 5-year retention requirement cost-effectively. S3 Intelligent-Tiering adds a small monitoring fee, and while it automates tiering, for predictable access patterns, explicit lifecycle rules are often more cost-efficient. S3 One Zone-IA lacks multi-AZ resilience. Direct upload to Glacier Deep Archive would make active editing impractical due to retrieval times and costs.',
        explanationDetails: {
            summary: 'Optimizing video storage costs based on access patterns and compliance:',
            breakdown: [
                '**S3 Standard (Days 1-7):** For active editing and frequent access, ensuring low latency.',
                '**S3 Standard-IA (Days 8-97):** For infrequently accessed but readily available data, offering lower storage costs per GB.',
                '**S3 Glacier Flexible Retrieval (Days 98-5 years):** For long-term archiving with flexible retrieval times (minutes to hours), providing the lowest storage costs while meeting compliance for 5 years.',
                'This tiered approach minimizes overall costs by matching storage class to access frequency.',
            ],
            otherOptions: 'A) S3 One Zone-IA is not recommended for critical data due to lower durability (single AZ). \nB) S3 Intelligent-Tiering is good for unknown or changing access patterns, but for *predictable* patterns, explicit lifecycle rules can be more cost-optimized. \nD) Direct upload to Glacier Deep Archive has retrieval times of hours to days, which is incompatible with the first 7 days of active access.'
        }
    },
    {
        id: 157,
        questionNumber: 57/* Assign next sequential number */,
        category: 'AWS Cost Optimization - Compute Instance Selection',
        difficulty: 'Expert',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A media rendering farm needs to process large video files. The jobs are interruptible and can be restarted from checkpoints. They require massive parallel processing capacity, but only during off-peak hours (10 PM - 6 AM local time). Which EC2 purchasing option offers the most significant cost savings for this workload?',
        options: [
            { text: 'A) Reserved Instances with a 1-year No Upfront payment option.', isCorrect: false },
            { text: 'B) On-Demand Instances with Auto Scaling based on queue depth.', isCorrect: false },
            { text: 'C) Spot Instances across multiple Availability Zones with diversified instance types.', isCorrect: true },
            { text: 'D) Dedicated Hosts for maximum performance isolation.', isCorrect: false }
        ],
        explanation: 'Spot Instances provide the largest discount (up to 90%) and are ideal for fault-tolerant, flexible workloads that can handle interruptions and specific time windows. Using them across multiple AZs and with diverse instance types further minimizes the risk of interruption by allowing the Auto Scaling Group to acquire capacity from various pools.',
        explanationDetails: {
            summary: 'Spot Instances for interruptible, flexible workloads:',
            breakdown: [
                '**Cost Savings:** Spot Instances can offer up to 90% savings compared to On-Demand prices.',
                '**Fault Tolerance:** The workload is interruptible and can resume from checkpoints, making it suitable for Spot Instances.',
                '**Capacity Diversification:** Using multiple AZs and diversified instance types increases the likelihood of obtaining and maintaining Spot capacity.',
                '**Time-Specific Needs:** The off-peak hour requirement aligns well with the availability of Spot capacity.',
            ],
            otherOptions: 'A) Reserved Instances offer significant savings (up to 75%) but are for *consistent*, predictable usage, and are less flexible for burstable or interruptible workloads. \nB) On-Demand instances are expensive and do not offer the substantial savings needed for a massive, cost-optimized rendering farm. \nD) Dedicated Hosts are the most expensive option, primarily used for licensing or strict compliance requirements, not cost optimization for this type of workload.'
        }
    },
    {
        id: 158,
        questionNumber: 58,
        category: 'AWS Cost Optimization - Data Transfer',
        difficulty: 'Comprehension',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'An application hosted on EC2 instances in `us-east-1` frequently retrieves large static files (several GBs each) stored in an S3 bucket in the same region. Users accessing the application globally complain about high latency and slow downloads, contributing to increased data transfer costs. Which solution provides the best balance of performance improvement and cost reduction for serving these files to global users?',
        options: [
            { text: 'A) Move the S3 bucket to a region closer to the majority of users (e.g., `eu-central-1`).', isCorrect: false },
            { text: 'B) Implement Amazon CloudFront with the S3 bucket as the origin.', isCorrect: true },
            { text: 'C) Use S3 Transfer Acceleration for file downloads.', isCorrect: false },
            { text: 'D) Increase the bandwidth of the EC2 instances.', isCorrect: false }
        ],
        explanation: 'Amazon CloudFront, a Content Delivery Network (CDN), caches static content at edge locations globally. This reduces latency by serving content closer to users and significantly reduces data transfer costs out of AWS regions by leveraging CloudFront\'s lower egress rates and caching efficiencies.',
        explanationDetails: {
            summary: 'CloudFront benefits for global static content delivery:',
            breakdown: [
                '**Reduced Latency:** Content is served from CloudFront edge locations, geographically closer to users, improving download speeds.',
                '**Cost Reduction:** CloudFront egress rates are typically lower than direct EC2 or S3 egress rates to the internet. Caching also reduces repeated requests to the S3 origin, further lowering costs.',
                '**Scalability:** CloudFront automatically scales to handle large numbers of concurrent users and traffic spikes.',
                '**Security:** Integrates with AWS WAF and Shield for DDoS protection.',
            ],
            otherOptions: 'A) Moving the S3 bucket helps users in one specific region but does not solve global latency or cost issues for users in other regions. \nC) S3 Transfer Acceleration is primarily for *uploading* data to S3 over long distances, not for serving content for download. \nD) Increasing EC2 instance bandwidth would increase costs without addressing global latency, as data would still egress directly from the EC2 region across the internet to distant users.'
        }
    },
    {
        id: 160,
        questionNumber: 60,
        category: 'AWS Cost Optimization - Right-Sizing',
        difficulty: 'Application',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A development team is using an Amazon RDS PostgreSQL database for their non-production environment. Usage patterns show that the database is actively used during business hours (9 AM - 6 PM weekdays) but remains almost entirely idle overnight and on weekends. Current costs are high due to continuous running of a `db.m5.large` instance. Which cost optimization strategy provides the most significant savings while ensuring availability during active development periods?',
        options: [
            { text: 'A) Migrate to a larger `db.r5.xlarge` instance for better performance during peak times.', isCorrect: false },
            { text: 'B) Implement RDS Scheduled Scaling to scale down the instance size overnight and on weekends.', isCorrect: false },
            { text: 'C) Migrate to Amazon Aurora Serverless v2 for automatic start/stop and scaling based on demand.', isCorrect: true },
            { text: 'D) Take daily snapshots of the database and restore it only when needed.', isCorrect: false }
        ],
        explanation: 'Aurora Serverless v2 is specifically designed for unpredictable and intermittent workloads, offering automatic start/stop and scaling based on actual demand, which eliminates costs during idle periods and scales up instantly when needed. This is far more cost-effective for non-production environments with variable usage than continuously running provisioned instances or even scheduled scaling, which might still incur costs during low-use periods if not perfectly tuned.',
        explanationDetails: {
            summary: 'Aurora Serverless v2 for unpredictable non-production workloads:',
            breakdown: [
                '**Automatic Start/Stop:** Eliminates costs during idle periods (nights and weekends) when the database is not in use.',
                '**Fine-grained Scaling:** Scales compute capacity up and down very quickly (from 0.5 ACU) based on real-time demand, preventing over-provisioning.',
                '**PostgreSQL Compatibility:** Maintains compatibility with the existing database engine.',
                '**Cost Savings:** Significant cost reduction compared to continuously running a provisioned instance for intermittent workloads.',
            ],
            otherOptions: 'A) A larger instance would increase costs, not reduce them, and would still be running 24/7. \nB) RDS Scheduled Scaling can help, but it requires manual configuration of schedules and may not be as granular or cost-effective as Aurora Serverless v2, which can scale to zero compute units when idle. \nD) Taking daily snapshots and manually restoring is a high operational overhead and would not meet the "ensuring availability during active development periods" requirement due to restoration time.'
        }
    } 
];

// Helper functions for AWS question management
export const getAWSQuestionsByDomain = (domain: string): Question[] => {
    return AWS_QUESTIONS.filter(q => q.domain.includes(domain));
};

export const getAWSQuestionsByDifficulty = (difficulty: string): Question[] => {
    return AWS_QUESTIONS.filter(q => q.difficulty === difficulty);
};

export const getAWSQuestionsByService = (service: string): Question[] => {
    return AWS_QUESTIONS.filter(q => 
        q.category.toLowerCase().includes(service.toLowerCase()) ||
        q.questionText.toLowerCase().includes(service.toLowerCase())
    );
};

export const getRandomAWSQuestions = (count: number): Question[] => {
    const shuffled = [...AWS_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Get AWS domain-specific practice test
export const getAWSDomainPracticeTest = (domainNumber: number): Question[] => {
    const domainQuestions = getAWSQuestionsByDomain(`Domain ${domainNumber}`);
    const shuffled = [...domainQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(10, domainQuestions.length));
};

// Get balanced AWS practice test (following actual exam distribution)
export const getAWSPracticeTest = (): Question[] => {
    const domain1 = getRandomAWSQuestions(17).filter(q => q.domain.includes('Domain 1')); // 26%
    const domain2 = getRandomAWSQuestions(15).filter(q => q.domain.includes('Domain 2')); // 24%  
    const domain3 = getRandomAWSQuestions(20).filter(q => q.domain.includes('Domain 3')); // 30%
    const domain4 = getRandomAWSQuestions(13).filter(q => q.domain.includes('Domain 4')); // 20%
    
    return [...domain1, ...domain2, ...domain3, ...domain4].slice(0, 65); // SAA exam is 65 questions
};

// AWS-specific statistics
export const getAWSQuestionStats = () => {
    const domains = [...new Set(AWS_QUESTIONS.map(q => q.domain))];
    const difficulties = [...new Set(AWS_QUESTIONS.map(q => q.difficulty))];
    const services = [...new Set(AWS_QUESTIONS.map(q => q.category))];
    
    return {
        total: AWS_QUESTIONS.length,
        byDomain: domains.map(domain => ({
            domain,
            count: AWS_QUESTIONS.filter(q => q.domain === domain).length,
            percentage: Math.round((AWS_QUESTIONS.filter(q => q.domain === domain).length / AWS_QUESTIONS.length) * 100)
        })),
        byDifficulty: difficulties.map(difficulty => ({
            difficulty,
            count: AWS_QUESTIONS.filter(q => q.difficulty === difficulty).length
        })),
        awsServices: services.length,
        examSimulation: {
            questionsPerDomain: {
                'Domain 1': 17, // 26% of 65
                'Domain 2': 16, // 24% of 65  
                'Domain 3': 19, // 30% of 65
                'Domain 4': 13  // 20% of 65
            },
            totalExamQuestions: 65,
            passingScore: 720 // out of 1000
        }
    };
};
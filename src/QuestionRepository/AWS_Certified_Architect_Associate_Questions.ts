/*
import { Question } from "@/types/preptypes";

export const AWS_QUESTIONS: Question[] = [
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
    // STORAGE CONCEPTS
    {
        id: 141,
        questionNumber: 41,
        category: 'AWS Storage Concepts',
        difficulty: 'Knowledge',
        domain: 'Domain 3: Design High-Performing Architectures',
        questionText: 'A company needs to choose between different AWS storage types for various workloads. Which statement BEST describes the appropriate use cases for each storage type?',
        options: [
            { text: 'A) Use object storage for databases, block storage for file shares, file storage for web content', isCorrect: false },
            { text: 'B) Use block storage for databases, file storage for shared access, object storage for web content', isCorrect: true },
            { text: 'C) Use file storage for databases, object storage for shared access, block storage for web content', isCorrect: false },
            { text: 'D) All storage types can be used interchangeably for any workload', isCorrect: false }
        ],
        explanation: 'Block storage (EBS) provides high IOPS for databases, file storage (EFS) enables shared access, object storage (S3) scales for web content.',
        explanationDetails: {
            summary: 'AWS storage type characteristics:',
            breakdown: [
                'Block storage (EBS): High IOPS, low latency, ideal for databases and boot volumes',
                'File storage (EFS): POSIX-compliant, shared access, good for content repositories',
                'Object storage (S3): Auto-scaling, REST API, perfect for web content and backups',
                'Each type optimized for specific access patterns and performance requirements'
            ],
            otherOptions: 'A) Object storage not suitable for database IOPS requirements\nC) File storage lacks the IOPS performance needed for databases\nD) Each storage type has specific use cases and limitations'
        }
    },
    {
        id: 142,
        questionNumber: 42,
        category: 'AWS Storage Concepts',
        difficulty: 'Application',
        domain: 'Domain 2: Design Resilient Architectures',
        questionText: 'An enterprise is migrating from on-premises and needs to maintain compatibility with existing storage protocols. They use NFS for Unix systems, SMB for Windows, and iSCSI for SAN storage. Which AWS services provide the BEST protocol compatibility?',
        options: [
            { text: 'A) S3 for all protocols using third-party gateways', isCorrect: false },
            { text: 'B) EFS for NFS, FSx for Windows for SMB, Storage Gateway for iSCSI', isCorrect: true },
            { text: 'C) EBS for all protocols using EC2 instance configuration', isCorrect: false },
            { text: 'D) DataSync for protocol translation across all storage types', isCorrect: false }
        ],
        explanation: 'AWS provides native protocol support: EFS (NFS), FSx for Windows (SMB), Storage Gateway (iSCSI) for seamless migration.',
        explanationDetails: {
            summary: 'Native AWS protocol support:',
            breakdown: [
                'EFS: Native NFS v4.1, POSIX-compliant, Linux/Unix compatibility',
                'FSx for Windows: Native SMB, Active Directory integration',
                'Storage Gateway: iSCSI interface, hybrid cloud connectivity',
                'No application changes required for protocol compatibility'
            ],
            otherOptions: 'A) S3 doesn\'t natively support NFS/SMB/iSCSI protocols\nC) EBS provides block storage but not protocol-level compatibility\nD) DataSync is for data transfer, not protocol translation'
        }
    },

    // S3 DEEP DIVE
    {
        id: 143,
        questionNumber: 43,
        category: 'AWS S3 Deep Dive',
        difficulty: 'Application',
        domain: 'Domain 2: Design Resilient Architectures',
        questionText: 'A media company requires 99.999999999% (11 9s) data durability for their video assets. They need to understand the difference between S3 durability and availability for their SLA reporting. Which statement is CORRECT about S3 durability vs availability?',
        options: [
            { text: 'A) Durability and availability are identical metrics across all S3 storage classes', isCorrect: false },
            { text: 'B) Durability (11 9s) represents data loss protection, while availability varies by storage class', isCorrect: true },
            { text: 'C) Availability is always higher than durability in S3', isCorrect: false },
            { text: 'D) Only S3 Standard provides 11 9s durability', isCorrect: false }
        ],
        explanation: 'S3 provides 11 9s durability (data loss protection) across ALL storage classes, but availability (uptime) varies by class.',
        explanationDetails: {
            summary: 'S3 durability vs availability:',
            breakdown: [
                'Durability (11 9s): Probability of NOT losing data over a year',
                'Availability varies: Standard (99.99%), IA (99.9%), Glacier (variable)',
                'All storage classes: Same durability guarantee',
                'Durability: Data integrity protection through redundancy'
            ],
            otherOptions: 'A) Different metrics with different SLA percentages\nC) Availability percentages are typically lower than durability\nD) All S3 storage classes maintain 11 9s durability'
        }
    },
    {
        id: 144,
        questionNumber: 44,
        category: 'AWS S3 Deep Dive',
        difficulty: 'Application',
        domain: 'Domain 1: Design Secure Architectures',
        questionText: 'A healthcare organization stores patient records in S3 and needs to maintain full control over encryption keys while ensuring HIPAA compliance. They want to minimize key management overhead but need complete audit trails. Which encryption approach provides the BEST balance?',
        options: [
            { text: 'A) SSE-S3 with AWS-managed keys', isCorrect: false },
            { text: 'B) SSE-KMS with customer-managed keys', isCorrect: true },
            { text: 'C) SSE-C with customer-provided keys', isCorrect: false },
            { text: 'D) Client-side encryption with S3 Encryption Client', isCorrect: false }
        ],
        explanation: 'SSE-KMS with customer-managed keys provides control over keys, audit trails via CloudTrail, and AWS handles key management infrastructure.',
        explanationDetails: {
            summary: 'SSE-KMS benefits for HIPAA compliance:',
            breakdown: [
                'Customer control: Create, rotate, and manage encryption keys',
                'Audit trails: CloudTrail logs all key usage and access',
                'AWS management: Infrastructure and availability handled by AWS',
                'HIPAA compliant: Meets regulatory requirements for key control'
            ],
            otherOptions: 'A) AWS-managed keys don\'t provide sufficient customer control\nC) SSE-C requires managing key storage and availability\nD) Client-side encryption adds complexity without AWS integration benefits'
        }
    },
    {
        id: 145,
        questionNumber: 45,
        category: 'AWS S3 Deep Dive',
        difficulty: 'Expert',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A content delivery platform stores 200TB of video files with unpredictable access patterns. Analytics show some videos remain popular for months while others are rarely accessed after the first week. They need cost optimization without performance penalties for popular content. Which S3 storage strategy provides optimal cost savings?',
        options: [
            { text: 'A) Lifecycle policy transitioning all content to S3 IA after 30 days', isCorrect: false },
            { text: 'B) S3 Intelligent-Tiering with Deep Archive Access tier enabled', isCorrect: true },
            { text: 'C) Keep popular content in Standard, move others to Glacier based on view counts', isCorrect: false },
            { text: 'D) Use S3 One Zone-IA for all content to reduce costs', isCorrect: false }
        ],
        explanation: 'S3 Intelligent-Tiering automatically optimizes costs based on access patterns without retrieval fees for frequent/infrequent tiers, perfect for unpredictable patterns.',
        explanationDetails: {
            summary: 'Intelligent-Tiering benefits for unpredictable access:',
            breakdown: [
                'Automatic optimization: No manual lifecycle policies needed',
                'No retrieval fees: For frequent and infrequent access tiers',
                'Deep Archive tier: Additional savings for rarely accessed content',
                'Performance maintained: Popular content stays in frequent tier'
            ],
            otherOptions: 'A) Fixed lifecycle doesn\'t handle unpredictable patterns\nC) Manual management based on view counts is complex and error-prone\nD) One Zone-IA lacks resilience for valuable content'
        }
    },

    // EBS DEEP DIVE
    {
        id: 146,
        questionNumber: 46,
        category: 'AWS EBS Deep Dive',
        difficulty: 'Application',
        domain: 'Domain 3: Design High-Performing Architectures',
        questionText: 'A database application requires consistent 20,000 IOPS with low latency for transaction processing. The database size is 8TB and growing. Which EBS volume type and configuration provides the BEST performance while supporting future growth?',
        options: [
            { text: 'A) gp3 volumes with 20,000 provisioned IOPS', isCorrect: false },
            { text: 'B) io2 Block Express volumes with 20,000 provisioned IOPS', isCorrect: true },
            { text: 'C) gp2 volumes in RAID 0 configuration', isCorrect: false },
            { text: 'D) st1 throughput optimized volumes for cost savings', isCorrect: false }
        ],
        explanation: 'io2 Block Express provides consistent IOPS up to 256,000, supports volumes up to 64TB, and offers sub-millisecond latency for databases.',
        explanationDetails: {
            summary: 'io2 Block Express advantages for databases:',
            breakdown: [
                'Consistent IOPS: 20,000 IOPS guaranteed regardless of volume size',
                'Sub-millisecond latency: Optimal for transaction processing',
                'Scalability: Supports up to 64TB volumes for future growth',
                'Durability: 99.999% annual durability vs 99.9% for gp3'
            ],
            otherOptions: 'A) gp3 IOPS can vary with volume size and burst credits\nC) RAID 0 increases failure risk and management complexity\nD) st1 optimized for throughput, not IOPS-intensive workloads'
        }
    },
    {
        id: 147,
        questionNumber: 47,
        category: 'AWS EBS Deep Dive',
        difficulty: 'Application',
        domain: 'Domain 2: Design Resilient Architectures',
        questionText: 'A production database uses EBS volumes and requires point-in-time recovery capability with minimal data loss. The current snapshot strategy creates daily snapshots, but the RPO requirement is 4 hours. Which enhancement provides the BEST backup strategy improvement?',
        options: [
            { text: 'A) Increase snapshot frequency to every 4 hours using scheduled snapshots', isCorrect: true },
            { text: 'B) Enable EBS Fast Snapshot Restore on existing daily snapshots', isCorrect: false },
            { text: 'C) Configure EBS Multi-Attach to create live replicas', isCorrect: false },
            { text: 'D) Use AWS Backup service with continuous backup enabled', isCorrect: false }
        ],
        explanation: 'Scheduling snapshots every 4 hours directly meets the RPO requirement by ensuring maximum data loss is limited to 4 hours.',
        explanationDetails: {
            summary: 'Snapshot strategy for 4-hour RPO:',
            breakdown: [
                'Scheduled snapshots: Every 4 hours meets exact RPO requirement',
                'Incremental backups: Only changed blocks stored, cost-effective',
                'Point-in-time recovery: Can restore to any snapshot timestamp',
                'Automated lifecycle: Can retain snapshots based on retention policy'
            ],
            otherOptions: 'B) Fast Snapshot Restore improves RTO, not RPO\nC) Multi-Attach doesn\'t provide backup functionality\nD) Continuous backup overkill for 4-hour RPO requirement'
        }
    },
    {
        id: 148,
        questionNumber: 48,
        category: 'AWS EBS Deep Dive',
        difficulty: 'Expert',
        domain: 'Domain 1: Design Secure Architectures',
        questionText: 'A financial application stores sensitive data on EBS volumes and requires encryption in transit and at rest. The application accesses data across multiple AZs and needs to ensure encryption keys remain under customer control with automatic rotation. Which configuration provides comprehensive encryption coverage?',
        options: [
            { text: 'A) EBS encryption with AWS managed keys and HTTPS application protocols', isCorrect: false },
            { text: 'B) EBS encryption with customer-managed KMS keys, automatic rotation enabled, and application-level TLS', isCorrect: true },
            { text: 'C) Instance store volumes with client-side encryption', isCorrect: false },
            { text: 'D) EBS encryption with customer-provided keys (SSE-C)', isCorrect: false }
        ],
        explanation: 'Customer-managed KMS keys provide control with automatic rotation, EBS encryption handles data at rest, and TLS provides encryption in transit.',
        explanationDetails: {
            summary: 'Comprehensive EBS encryption strategy:',
            breakdown: [
                'Customer-managed KMS keys: Full control over encryption keys',
                'Automatic rotation: Annual key rotation without service interruption',
                'EBS encryption: All data at rest encrypted including snapshots',
                'Application TLS: Encrypts data in transit between instances'
            ],
            otherOptions: 'A) AWS managed keys don\'t provide customer control\nC) Instance store data is temporary, not suitable for persistent financial data\nD) Customer-provided keys require manual key management'
        }
    },

    // FILE SYSTEMS DEEP DIVE
    {
        id: 149,
        questionNumber: 49,
        category: 'AWS File Systems Deep Dive',
        difficulty: 'Application',
        domain: 'Domain 3: Design High-Performing Architectures',
        questionText: 'A video editing company needs shared storage accessible from 50 EC2 instances across multiple AZs for collaborative editing projects. Files range from 1GB to 50GB, and editors require low-latency access. Performance needs vary from 1 GB/s during off-hours to 10 GB/s during production. Which file system solution provides the BEST performance and scalability?',
        options: [
            { text: 'A) Amazon EFS with General Purpose performance mode', isCorrect: false },
            { text: 'B) Amazon EFS with Max I/O performance mode and Provisioned Throughput', isCorrect: true },
            { text: 'C) Amazon FSx for Lustre with scratch file system', isCorrect: false },
            { text: 'D) Multiple EBS volumes shared using NFS on EC2', isCorrect: false }
        ],
        explanation: 'EFS Max I/O mode supports higher IOPS for concurrent access, while Provisioned Throughput ensures consistent 10 GB/s performance regardless of file system size.',
        explanationDetails: {
            summary: 'EFS configuration for video editing workloads:',
            breakdown: [
                'Max I/O mode: Higher IOPS limit for 50 concurrent clients',
                'Provisioned Throughput: Guarantees 10 GB/s during peak production',
                'Multi-AZ access: Native support across availability zones',
                'POSIX compliance: Standard file system semantics for editing software'
            ],
            otherOptions: 'A) General Purpose mode has lower IOPS limits for concurrent access\nC) Lustre scratch file system designed for HPC, not collaborative editing\nD) EBS volumes can\'t be natively shared between instances'
        }
    },
    {
        id: 150,
        questionNumber: 50,
        category: 'AWS File Systems Deep Dive',
        difficulty: 'Expert',
        domain: 'Domain 2: Design High-Performing Architectures',
        questionText: 'A Windows-based application requires high-performance file storage with Active Directory integration, SMB protocol support, and sub-millisecond latencies. The workload involves intensive random I/O operations on small files. Current on-premises Windows File Server achieves 100,000 IOPS. Which AWS solution provides equivalent performance?',
        options: [
            { text: 'A) Amazon FSx for Windows File Server with SSD storage', isCorrect: true },
            { text: 'B) Amazon EFS with Windows file gateway', isCorrect: false },
            { text: 'C) EC2 Windows instance with attached io2 EBS volumes', isCorrect: false },
            { text: 'D) Amazon FSx for Lustre with Windows connectivity', isCorrect: false }
        ],
        explanation: 'FSx for Windows File Server provides native SMB, Active Directory integration, SSD storage for high IOPS, and sub-millisecond latencies specifically optimized for Windows workloads.',
        explanationDetails: {
            summary: 'FSx for Windows File Server benefits:',
            breakdown: [
                'Native SMB: Full Windows file system compatibility',
                'Active Directory: Seamless user authentication and authorization',
                'SSD storage: Up to 100,000+ IOPS for random I/O workloads',
                'Sub-millisecond latency: Optimized for Windows application performance'
            ],
            otherOptions: 'B) EFS doesn\'t natively support SMB or Active Directory\nC) Self-managed solution lacks native SMB optimization\nD) FSx for Lustre designed for Linux HPC workloads, not Windows'
        }
    },

    // HYBRID STORAGE AND MIGRATION
    {
        id: 151,
        questionNumber: 51,
        category: 'AWS Hybrid Storage Migration',
        difficulty: 'Application',
        domain: 'Domain 1: Design Resilient Architectures',
        questionText: 'A company needs to migrate 500TB of archival data from on-premises tape storage to AWS. The data is rarely accessed but must be retrievable within 12 hours when needed. The migration must complete within 3 months with minimal impact on existing network bandwidth. Which migration strategy is MOST efficient?',
        options: [
            { text: 'A) AWS DataSync over Direct Connect for gradual migration', isCorrect: false },
            { text: 'B) Multiple AWS Snowball Edge devices shipped in batches to S3 Glacier Deep Archive', isCorrect: true },
            { text: 'C) Storage Gateway Tape Gateway for gradual cloud migration', isCorrect: false },
            { text: 'D) AWS Transfer Family for secure file transfer', isCorrect: false }
        ],
        explanation: 'Snowball Edge devices handle large data volumes efficiently without network impact, while Glacier Deep Archive provides cost-effective storage with 12-hour retrieval.',
        explanationDetails: {
            summary: 'Large-scale archival migration strategy:',
            breakdown: [
                'Snowball Edge capacity: 80TB per device, 7 devices for 500TB',
                'No network impact: Physical data transfer bypasses internet',
                'Glacier Deep Archive: Lowest cost storage for rarely accessed data',
                '12-hour retrieval: Meets business requirement for archive access'
            ],
            otherOptions: 'A) DataSync over network would take months and impact bandwidth\nC) Tape Gateway for ongoing hybrid, not one-time migration\nD) Transfer Family not optimized for 500TB bulk migration'
        }
    },
    {
        id: 152,
        questionNumber: 52,
        category: 'AWS Hybrid Storage Migration',
        difficulty: 'Expert',
        domain: 'Domain 3: Design High-Performing Architectures',
        questionText: 'A media company operates a hybrid architecture where video editors work on-premises but need seamless access to cloud storage for rendering jobs. Local performance must remain unaffected while providing transparent cloud storage scalability. Frequently accessed files should be available locally. Which hybrid storage solution provides the BEST user experience?',
        options: [
            { text: 'A) AWS Storage Gateway File Gateway with local cache', isCorrect: true },
            { text: 'B) AWS DataSync scheduled sync between on-premises and S3', isCorrect: false },
            { text: 'C) Direct Connect with EFS mounted on workstations', isCorrect: false },
            { text: 'D) S3 bucket mounted using third-party NFS gateway', isCorrect: false }
        ],
        explanation: 'Storage Gateway File Gateway provides NFS interface with intelligent local caching, transparent S3 integration, and optimal performance for frequently accessed files.',
        explanationDetails: {
            summary: 'File Gateway hybrid benefits:',
            breakdown: [
                'Local cache: Frequently accessed files available at local speeds',
                'Transparent scaling: Files automatically stored in S3',
                'NFS interface: Standard file system access for editing applications',
                'Intelligent caching: Recently and frequently used files cached locally'
            ],
            otherOptions: 'B) DataSync requires scheduled sync, not transparent access\nC) EFS over Direct Connect has latency for large video files\nD) Third-party solutions lack AWS service integration and support'
        }
    },

    // DATA SECURITY CONCEPTS
    {
        id: 153,
        questionNumber: 53,
        category: 'AWS Data Security Concepts',
        difficulty: 'Application',
        domain: 'Domain 1: Design Secure Architectures',
        questionText: 'A financial services company needs to automatically discover and protect sensitive data across 200 S3 buckets containing customer documents. They require automated classification, policy enforcement, and immediate alerts for data exposure risks. Which combination provides comprehensive data security automation?',
        options: [
            { text: 'A) AWS Config rules for bucket policies and CloudWatch for monitoring', isCorrect: false },
            { text: 'B) Amazon Macie for discovery and classification, EventBridge for alerts, and S3 Block Public Access', isCorrect: true },
            { text: 'C) AWS Inspector for vulnerability scanning and GuardDuty for threats', isCorrect: false },
            { text: 'D) Custom Lambda functions with CloudTrail for access monitoring', isCorrect: false }
        ],
        explanation: 'Macie uses ML to discover sensitive data, provides automatic classification, EventBridge enables real-time alerts, and Block Public Access prevents exposure.',
        explanationDetails: {
            summary: 'Automated data security components:',
            breakdown: [
                'Amazon Macie: ML-powered sensitive data discovery and classification',
                'EventBridge integration: Real-time alerts for policy violations',
                'S3 Block Public Access: Prevents accidental public exposure',
                'Automated findings: Continuous monitoring across all 200 buckets'
            ],
            otherOptions: 'A) Config and CloudWatch don\'t provide sensitive data discovery\nC) Inspector and GuardDuty focus on infrastructure, not data classification\nD) Custom solutions require significant development and maintenance'
        }
    },
    {
        id: 154,
        questionNumber: 54,
        category: 'AWS Data Security Concepts',
        difficulty: 'Expert',
        domain: 'Domain 1: Design Secure Architectures',
        questionText: 'A healthcare organization must implement data classification and protection for patient records across multiple AWS services (S3, RDS, DynamoDB). They need automated discovery of PHI, policy-based access controls, and audit trails meeting HIPAA requirements. Which architecture provides comprehensive data protection?',
        options: [
            { text: 'A) Amazon Macie for S3, database activity streams for RDS, and VPC Flow Logs', isCorrect: false },
            { text: 'B) Amazon Macie for S3, AWS CloudTrail data events, and customer-managed KMS keys across all services', isCorrect: true },
            { text: 'C) AWS Config for compliance monitoring and GuardDuty for threat detection', isCorrect: false },
            { text: 'D) Custom data loss prevention (DLP) solution with third-party tools', isCorrect: false }
        ],
        explanation: 'Macie discovers PHI in S3, CloudTrail data events provide comprehensive audit trails, and customer-managed KMS keys ensure encryption control across all services.',
        explanationDetails: {
            summary: 'HIPAA-compliant data protection architecture:',
            breakdown: [
                'Macie: Automated PHI discovery and classification in S3',
                'CloudTrail data events: Complete audit trail of data access',
                'Customer-managed KMS: Encryption control across S3, RDS, DynamoDB',
                'Policy-based access: IAM policies with resource-based conditions'
            ],
            otherOptions: 'A) Missing encryption control and comprehensive audit coverage\nC) Config and GuardDuty don\'t provide PHI discovery and classification\nD) Custom solutions require extensive compliance validation'
        }
    },

    // ENCRYPTION
    {
        id: 155,
        questionNumber: 55,
        category: 'AWS Encryption',
        difficulty: 'Expert',
        domain: 'Domain 1: Design Secure Architectures',
        questionText: 'A multinational corporation needs end-to-end encryption for data stored across AWS services in multiple regions. They require customer control over encryption keys, automatic rotation, cross-region access, and integration with their existing HSM infrastructure. Which encryption strategy provides the MOST comprehensive solution?',
        options: [
            { text: 'A) AWS KMS customer-managed keys with automatic rotation in each region', isCorrect: false },
            { text: 'B) AWS CloudHSM cluster with custom key management application', isCorrect: true },
            { text: 'C) Client-side encryption with application-managed keys', isCorrect: false },
            { text: 'D) AWS KMS with imported key material from on-premises HSM', isCorrect: false }
        ],
        explanation: 'CloudHSM provides dedicated hardware security modules with full customer control, integrates with existing HSM infrastructure, and supports cross-region key management.',
        explanationDetails: {
            summary: 'CloudHSM comprehensive encryption benefits:',
            breakdown: [
                'Dedicated HSM: Full customer control over encryption operations',
                'FIPS 140-2 Level 3: Highest security certification available',
                'Cross-region clustering: Keys available across multiple regions',
                'HSM integration: Compatible with existing on-premises HSM infrastructure'
            ],
            otherOptions: 'A) KMS keys are region-specific and don\'t integrate with existing HSM\nC) Application-managed keys lack HSM security and are difficult to manage at scale\nD) Imported key material in KMS doesn\'t provide full HSM integration'
        }
    },
    {
        id: 156,
        questionNumber: 56,
        category: 'AWS Encryption',
        difficulty: 'Application',
        domain: 'Domain 1: Design Secure Architectures',
        questionText: 'A development team needs to encrypt application data before storing it in DynamoDB. They want to minimize performance impact while ensuring field-level encryption for sensitive columns (SSN, credit card numbers) but allow searching on encrypted email addresses. Which encryption approach provides the BEST balance of security and functionality?',
        options: [
            { text: 'A) DynamoDB encryption at rest with AWS managed keys', isCorrect: false },
            { text: 'B) AWS DynamoDB Encryption Client with deterministic encryption for emails, probabilistic for sensitive fields', isCorrect: true },
            { text: 'C) Application-level AES encryption for all fields', isCorrect: false },
            { text: 'D) AWS KMS encryption for entire DynamoDB table', isCorrect: false }
        ],
        explanation: 'DynamoDB Encryption Client provides field-level encryption with deterministic encryption for searchable fields and probabilistic encryption for maximum security on sensitive data.',
        explanationDetails: {
            summary: 'Field-level encryption strategy:',
            breakdown: [
                'Deterministic encryption: Same email always produces same ciphertext (searchable)',
                'Probabilistic encryption: Different ciphertext each time (maximum security)',
                'Client-side encryption: Data encrypted before sending to DynamoDB',
                'Performance optimized: Only sensitive fields encrypted, not entire records'
            ],
            otherOptions: 'A) Table-level encryption doesn\'t provide field-level control\nC) Application encryption without library optimization impacts performance\nD) KMS table encryption encrypts all data, doesn\'t enable selective searching'
        }
    },

    // GOVERNANCE AND COMPLIANCE
    {
        id: 157,
        questionNumber: 57,
        category: 'AWS Governance Compliance',
        difficulty: 'Expert',
        domain: 'Domain 1: Design Secure Architectures',
        questionText: 'A regulated financial institution must demonstrate continuous compliance with SOC 2 requirements for data storage. They need automated policy enforcement, compliance reporting, and evidence collection across 50 AWS accounts. Non-compliant resources must be automatically remediated. Which governance framework provides comprehensive compliance automation?',
        options: [
            { text: 'A) AWS Config with custom rules and SNS notifications', isCorrect: false },
            { text: 'B) AWS Organizations with SCPs, Config Conformance Packs, and Systems Manager Automation', isCorrect: true },
            { text: 'C) AWS CloudFormation with compliance templates', isCorrect: false },
            { text: 'D) AWS Security Hub with manual remediation workflows', isCorrect: false }
        ],
        explanation: 'Organizations provides account governance, Conformance Packs enable SOC 2 compliance checks, and Systems Manager Automation handles remediation across all accounts.',
        explanationDetails: {
            summary: 'Comprehensive compliance automation:',
            breakdown: [
                'Organizations + SCPs: Account-level policy enforcement',
                'Config Conformance Packs: Pre-built SOC 2 compliance rules',
                'Systems Manager Automation: Automatic remediation of non-compliant resources',
                'Centralized reporting: Compliance status across all 50 accounts'
            ],
            otherOptions: 'A) Config alone lacks account-level governance and automated remediation\nC) CloudFormation provides deployment compliance, not ongoing monitoring\nD) Security Hub requires manual remediation, not automated'
        }
    },
    {
        id: 158,
        questionNumber: 58,
        category: 'AWS Governance Compliance',
        difficulty: 'Application',
        domain: 'Domain 1: Design Secure Architectures',
        questionText: 'A global company must ensure S3 buckets across all regions comply with data residency requirements. EU data must stay in EU regions, US data in US regions, with automatic policy enforcement and compliance reporting. Which solution provides the MOST effective governance?',
        options: [
            { text: 'A) IAM policies restricting S3 actions based on user location', isCorrect: false },
            { text: 'B) S3 bucket policies with aws:RequestedRegion condition keys', isCorrect: false },
            { text: 'C) AWS Organizations SCPs with region restrictions based on data classification tags', isCorrect: true },
            { text: 'D) AWS Config rules monitoring bucket creation across regions', isCorrect: false }
        ],
        explanation: 'Organizations SCPs provide account-level enforcement that cannot be overridden, with tag-based conditions enabling automatic data residency compliance.',
        explanationDetails: {
            summary: 'Data residency governance with SCPs:',
            breakdown: [
                'SCPs: Cannot be overridden by account-level permissions',
                'Tag-based conditions: Automatically enforce based on data classification',
                'Region restrictions: Prevent EU data creation in non-EU regions',
                'Organization-wide: Applies to all current and future accounts'
            ],
            otherOptions: 'A) IAM policies can be overridden by account administrators\nB) Bucket policies only apply after bucket creation\nD) Config rules detect violations but don\'t prevent them'
        }
    },

    // STORAGE RESILIENCY AND SCALABILITY
    {
        id: 159,
        questionNumber: 59,
        category: 'AWS Storage Resiliency Scalability',
        difficulty: 'Expert',
        domain: 'Domain 2: Design Resilient Architectures',
        questionText: 'A video streaming platform stores 1PB of content with global distribution requirements. They need 99.99% availability, automatic failover, and the ability to handle 10x traffic spikes during major events. Current single-region S3 architecture shows latency issues for international users. Which architecture provides optimal resiliency and global performance?',
        options: [
            { text: 'A) S3 Cross-Region Replication with CloudFront distribution', isCorrect: true },
            { text: 'B) Multi-region S3 buckets with Route 53 latency-based routing', isCorrect: false },
            { text: 'C) S3 Transfer Acceleration with single-region storage', isCorrect: false },
            { text: 'D) EFS with VPC peering across regions', isCorrect: false }
        ],
        explanation: 'S3 CRR provides data resilience and regional availability, while CloudFront edge locations ensure global low-latency access and can handle traffic spikes automatically.',
        explanationDetails: {
            summary: 'Global content delivery architecture:',
            breakdown: [
                'S3 CRR: Automatic replication across regions for resilience',
                'CloudFront: 400+ edge locations for global low-latency delivery',
                'Auto-scaling: CloudFront handles 10x traffic spikes automatically',
                '99.99% availability: S3 + CloudFront combined SLA exceeds requirement'
            ],
            otherOptions: 'B) Route 53 doesn\'t provide edge caching for content delivery\nC) Transfer Acceleration only helps uploads, not global content delivery\nD) EFS not designed for 1PB content delivery workloads'
        }
    },
    {
        id: 160,
        questionNumber: 60,
        category: 'AWS Storage Resiliency Scalability',
        difficulty: 'Application',
        domain: 'Domain 2: Design Resilient Architectures',
        questionText: 'An e-commerce platform experiences seasonal traffic patterns with 50x increase during holiday sales. Their product catalog and user-generated content storage must scale automatically without performance degradation. Current EBS-based storage architecture requires manual intervention during peaks. Which storage architecture provides automatic scalability?',
        options: [
            { text: 'A) Auto Scaling EBS volumes with CloudWatch metrics', isCorrect: false },
            { text: 'B) Amazon S3 with CloudFront for content delivery and Lambda for processing', isCorrect: true },
            { text: 'C) Amazon EFS with Provisioned Throughput mode', isCorrect: false },
            { text: 'D) Multiple EBS volumes in RAID configuration', isCorrect: false }
        ],
        explanation: 'S3 provides unlimited automatic scaling, CloudFront handles traffic spikes through edge caching, and Lambda scales processing automatically with demand.',
        explanationDetails: {
            summary: 'Auto-scaling storage architecture:',
            breakdown: [
                'S3 unlimited scaling: Handles any amount of data and requests',
                'CloudFront edge caching: Reduces origin load during traffic spikes',
                'Lambda auto-scaling: Processing scales from 0 to thousands of concurrent executions',
                'No manual intervention: All components scale automatically'
            ],
            otherOptions: 'A) EBS volumes cannot auto-scale capacity\nC) EFS requires pre-provisioned throughput planning\nD) RAID configuration still requires manual capacity planning'
        }
    },

    // DATA LIFECYCLE
    {
        id: 161,
        questionNumber: 61,
        category: 'AWS Data Lifecycle',
        difficulty: 'Application',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A research institution stores genomics data with the following access pattern: analyzed intensively for 30 days, occasionally referenced for 6 months, and archived for 10 years for compliance. Current costs are $50,000/month in S3 Standard. Which lifecycle policy provides maximum cost optimization while meeting access requirements?',
        options: [
            { text: 'A) Standard for 30 days → IA at 30 days → Glacier at 180 days → Deep Archive at 1 year', isCorrect: true },
            { text: 'B) Intelligent-Tiering for all data with Deep Archive enabled', isCorrect: false },
            { text: 'C) Standard for 30 days → Glacier immediately at 30 days', isCorrect: false },
            { text: 'D) One Zone-IA for all data to reduce costs', isCorrect: false }
        ],
        explanation: 'Lifecycle transitions match access patterns: Standard for intensive analysis, IA for occasional access, Glacier for long-term storage, Deep Archive for compliance.',
        explanationDetails: {
            summary: 'Optimized lifecycle transitions for research data:',
            breakdown: [
                'Days 1-30: S3 Standard for intensive analysis',
                'Days 31-180: S3 IA for occasional reference (68% cost reduction)',
                'Days 181-365: S3 Glacier for backup storage (77% cost reduction)',
                'Years 1-10: Deep Archive for compliance (80% cost reduction)'
            ],
            otherOptions: 'B) Intelligent-Tiering adds overhead for predictable access patterns\nC) Early Glacier transition makes occasional access expensive\nD) One Zone-IA lacks resilience for valuable research data'
        }
    },
    {
        id: 162,
        questionNumber: 62,
        category: 'AWS Data Lifecycle',
        difficulty: 'Expert',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A media company has complex data lifecycle needs: news content (hot for 7 days, cold afterwards), evergreen content (unpredictable access), and archived footage (rare access but immediate retrieval when needed). They want automated optimization without management overhead. Which strategy handles all three patterns optimally?',
        options: [
            { text: 'A) Separate buckets with different lifecycle policies for each content type', isCorrect: false },
            { text: 'B) S3 Intelligent-Tiering with object tagging and tag-based lifecycle policies', isCorrect: true },
            { text: 'C) Manual lifecycle management based on content metadata', isCorrect: false },
            { text: 'D) Single lifecycle policy with shortest transition times', isCorrect: false }
        ],
        explanation: 'Intelligent-Tiering with object tags enables different optimization strategies per content type while maintaining automation and handling unpredictable access patterns.',
        explanationDetails: {
            summary: 'Tag-based intelligent lifecycle management:',
            breakdown: [
                'Object tagging: Classify content types (news, evergreen, archive)',
                'Intelligent-Tiering: Automatic optimization for unpredictable evergreen content',
                'Tag-based policies: Specific rules for news (7-day pattern) and archive content',
                'No management overhead: All transitions automated based on access patterns'
            ],
            otherOptions: 'A) Multiple buckets increase management complexity\nC) Manual management doesn\'t scale and introduces errors\nD) Single policy can\'t optimize for different access patterns'
        }
    },

    // STORAGE COST MANAGEMENT
    {
        id: 163,
        questionNumber: 63,
        category: 'AWS Storage Cost Management',
        difficulty: 'Expert',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A data analytics company spends $100,000/month on storage across S3, EBS, and EFS for various workloads. They need comprehensive cost optimization while maintaining performance. Analysis shows: 40% rarely accessed, 30% predictable patterns, 20% unpredictable access, 10% high-performance needs. Which multi-service optimization strategy provides maximum savings?',
        options: [
            { text: 'A) Move all data to cheapest storage classes regardless of access patterns', isCorrect: false },
            { text: 'B) S3 lifecycle policies for rarely accessed, Intelligent-Tiering for unpredictable, gp3 optimization for EBS, EFS IA for infrequent file access', isCorrect: true },
            { text: 'C) Consolidate all storage to S3 with single lifecycle policy', isCorrect: false },
            { text: 'D) Implement Reserved Capacity for all storage services', isCorrect: false }
        ],
        explanation: 'Tailored optimization per access pattern: lifecycle for predictable patterns, Intelligent-Tiering for unpredictable, gp3 for cost-effective EBS performance, EFS IA for infrequent access.',
        explanationDetails: {
            summary: 'Multi-service cost optimization strategy:',
            breakdown: [
                '40% rarely accessed: S3 lifecycle to Glacier/Deep Archive (75% savings)',
                '20% unpredictable: S3 Intelligent-Tiering (40% average savings)',
                'EBS optimization: gp3 volumes with right-sized IOPS (20% savings)',
                'EFS optimization: IA storage class for infrequent access (85% savings)'
            ],
            otherOptions: 'A) Ignoring access patterns can cause performance issues and retrieval costs\nC) Not all workloads suit object storage architecture\nD) Reserved Capacity not available for all storage types and may not match usage patterns'
        }
    },
    {
        id: 164,
        questionNumber: 64,
        category: 'AWS Storage Cost Management',
        difficulty: 'Application',
        domain: 'Domain 4: Design Cost-Optimized Architectures',
        questionText: 'A startup\'s S3 storage costs have grown to $25,000/month with 80% of objects never accessed after 90 days. They also have high data transfer costs from direct client downloads. The application serves user-uploaded images and documents globally. Which combination provides the most comprehensive cost reduction?',
        options: [
            { text: 'A) S3 lifecycle policy to Glacier and CloudFront distribution', isCorrect: true },
            { text: 'B) S3 Intelligent-Tiering and S3 Transfer Acceleration', isCorrect: false },
            { text: 'C) Move all data to S3 One Zone-IA with direct client access', isCorrect: false },
            { text: 'D) Compress all objects and implement client-side caching', isCorrect: false }
        ],
        explanation: 'Lifecycle policy to Glacier reduces storage costs by 68% for unused objects, while CloudFront eliminates data transfer costs and provides global acceleration.',
        explanationDetails: {
            summary: 'Comprehensive S3 cost optimization:',
            breakdown: [
                'Lifecycle to Glacier: 68% storage cost reduction for 80% of objects',
                'CloudFront: Eliminates data transfer costs from S3 to internet',
                'Global caching: Improves performance while reducing origin costs',
                'Combined savings: Approximately 70% total cost reduction'
            ],
            otherOptions: 'B) Intelligent-Tiering adds overhead for predictable 90-day pattern\nC) One Zone-IA lacks resilience and doesn\'t address transfer costs\nD) Compression helps but doesn\'t address core storage lifecycle and transfer costs'
        }
    },

    // QUIZ LESSON 5 - COMPREHENSIVE STORAGE QUESTIONS
    {
        id: 165,
        questionNumber: 65,
        category: 'AWS Storage Comprehensive',
        difficulty: 'Expert',
        domain: 'Domain 3: Design High-Performing Architectures',
        questionText: 'A large enterprise needs a comprehensive storage strategy for their cloud migration. Requirements include: 500TB database storage with 50,000 IOPS, 2PB file shares for 1000 users, 10PB object storage with global access, and hybrid connectivity to on-premises. Which architecture provides optimal performance, cost, and integration?',
        options: [
            { text: 'A) io2 Block Express EBS, EFS Max I/O, S3 with CloudFront, and Storage Gateway', isCorrect: true },
            { text: 'B) gp3 EBS, FSx for Lustre, S3 Intelligent-Tiering, and Direct Connect', isCorrect: false },
            { text: 'C) Aurora storage, EFS General Purpose, S3 Standard, and VPN connections', isCorrect: false },
            { text: 'D) Instance store, FSx for Windows, S3 Glacier, and AWS Outposts', isCorrect: false }
        ],
        explanation: 'io2 Block Express provides required IOPS, EFS Max I/O handles concurrent users, S3+CloudFront scales globally, Storage Gateway enables hybrid integration.',
        explanationDetails: {
            summary: 'Enterprise storage architecture components:',
            breakdown: [
                'io2 Block Express: 50,000 IOPS with sub-millisecond latency for databases',
                'EFS Max I/O: Scales to 1000+ concurrent users with higher IOPS',
                'S3 + CloudFront: Unlimited object storage with global low-latency access',
                'Storage Gateway: Seamless hybrid connectivity with caching'
            ],
            otherOptions: 'B) gp3 may not provide consistent 50,000 IOPS, FSx Lustre not ideal for general file shares\nC) Aurora storage limits database choice, VPN insufficient for 500TB+ workloads\nD) Instance store temporary, FSx Windows not mentioned as requirement, Glacier too slow'
        }
    },
    {
        id: 166,
        questionNumber: 66,
        category: 'AWS Storage Comprehensive',
        difficulty: 'Expert',
        domain: 'Domain 1: Design Secure Architectures',
        questionText: 'A financial services firm requires end-to-end security for their storage infrastructure handling sensitive customer data across S3, EBS, and EFS. Requirements include: customer-controlled encryption, automated compliance monitoring, data classification, and audit trails meeting regulatory standards. Which comprehensive security architecture meets all requirements?',
        options: [
            { text: 'A) AWS managed encryption, GuardDuty monitoring, and CloudTrail logging', isCorrect: false },
            { text: 'B) Customer-managed KMS keys, Amazon Macie, Config Conformance Packs, and CloudTrail data events', isCorrect: true },
            { text: 'C) CloudHSM encryption, Security Hub, and VPC Flow Logs', isCorrect: false },
            { text: 'D) Client-side encryption, Inspector scanning, and AWS Config rules', isCorrect: false }
        ],
        explanation: 'Customer-managed KMS provides encryption control, Macie classifies sensitive data, Conformance Packs ensure compliance, CloudTrail data events provide complete audit trails.',
        explanationDetails: {
            summary: 'Comprehensive security architecture for financial services:',
            breakdown: [
                'Customer-managed KMS: Full control over encryption keys across all storage services',
                'Amazon Macie: Automated discovery and classification of sensitive financial data',
                'Config Conformance Packs: Continuous compliance monitoring for financial regulations',
                'CloudTrail data events: Complete audit trail of all data access activities'
            ],
            otherOptions: 'A) AWS managed encryption lacks customer control required for financial services\nC) CloudHSM overkill, Security Hub doesn\'t provide data classification\nD) Client-side encryption complex to manage, Inspector focuses on vulnerabilities not data classification'
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
};*/

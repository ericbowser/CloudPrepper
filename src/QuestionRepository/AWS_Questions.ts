import { Question } from "@/types/preptypes";

export const AWS_SAA_QUESTIONS: Question[] = [
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
    }
];

// Helper functions for AWS question management
export const getAWSQuestionsByDomain = (domain: string): Question[] => {
    return AWS_SAA_QUESTIONS.filter(q => q.domain.includes(domain));
};

export const getAWSQuestionsByDifficulty = (difficulty: string): Question[] => {
    return AWS_SAA_QUESTIONS.filter(q => q.difficulty === difficulty);
};

export const getAWSQuestionsByService = (service: string): Question[] => {
    return AWS_SAA_QUESTIONS.filter(q => 
        q.category.toLowerCase().includes(service.toLowerCase()) ||
        q.questionText.toLowerCase().includes(service.toLowerCase())
    );
};

export const getRandomAWSQuestions = (count: number): Question[] => {
    const shuffled = [...AWS_SAA_QUESTIONS].sort(() => 0.5 - Math.random());
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
    const domains = [...new Set(AWS_SAA_QUESTIONS.map(q => q.domain))];
    const difficulties = [...new Set(AWS_SAA_QUESTIONS.map(q => q.difficulty))];
    const services = [...new Set(AWS_SAA_QUESTIONS.map(q => q.category))];
    
    return {
        total: AWS_SAA_QUESTIONS.length,
        byDomain: domains.map(domain => ({
            domain,
            count: AWS_SAA_QUESTIONS.filter(q => q.domain === domain).length,
            percentage: Math.round((AWS_SAA_QUESTIONS.filter(q => q.domain === domain).length / AWS_SAA_QUESTIONS.length) * 100)
        })),
        byDifficulty: difficulties.map(difficulty => ({
            difficulty,
            count: AWS_SAA_QUESTIONS.filter(q => q.difficulty === difficulty).length
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
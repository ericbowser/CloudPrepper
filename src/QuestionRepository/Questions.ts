import {Question} from "@/types/preptypes";

// MOCK DATA REPOSITORY (Unchanged)
export const QUESTIONS: Question[] = [
    {
        id: 1,
        questionNumber: 1,
        category: 'Cloud Operations - Scaling',
        difficulty: 'Application',
        domain: 'Domain 3',
        questionText: 'Your organization runs a web application that experiences predictable traffic spikes every weekday from 9 AM to 5 PM, with traffic increasing by 300% during these hours. The application currently uses a single large EC2 instance that struggles during peak hours but is oversized during off-hours. Which scaling approach would be most cost-effective while maintaining performance?',
        options: [
            {
                text: 'A) Implement vertical scaling by upgrading to a larger instance size during business hours',
                isCorrect: false
            },
            {
                text: 'B) Configure horizontal auto-scaling with smaller instances that scale based on CPU utilization',
                isCorrect: true
            },
            {text: 'C) Use reserved instances to handle peak capacity at all times', isCorrect: false},
            {text: 'D) Deploy multiple large instances and use a load balancer to distribute traffic', isCorrect: false}
        ],
        explanation: 'Horizontal auto-scaling with smaller instances is the most cost-effective solution for predictable traffic patterns. This approach allows you to scale out during peak hours and scale in during off-hours, optimizing both performance and cost.',
        explanationDetails: {
            summary: 'This approach allows you to:',
            breakdown: [
                'Scale out during peak hours to handle increased load',
                'Scale in during off-hours to minimize costs',
                'Use smaller, more cost-efficient instance types',
                'Improve fault tolerance through distribution'
            ],
            otherOptions: 'A) Vertical scaling requires downtime and doesn\'t optimize for off-peak costs\nC) Reserved instances for peak capacity waste money during off-hours\nD) Multiple large instances running continuously are unnecessarily expensive'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: function (): void {
            console.log("Question 1 clicked");
        }
    },
    {
        id: 2,
        questionNumber: 2,
        category: 'Cloud Security - IAM',
        difficulty: 'Knowledge',
        domain: 'Domain 4',
        questionText: 'A new developer needs temporary access to a specific S3 bucket to debug an issue. Which of the following is the most secure way to grant this access according to the principle of least privilege?',
        options: [
            {text: 'A) Add the developer to the "Administrators" group.', isCorrect: false},
            {
                text: 'B) Create a new IAM user with a long-term access key and a policy granting full S3 access.',
                isCorrect: false
            },
            {
                text: 'C) Create an IAM role with a narrowly scoped policy for the required S3 bucket and allow the developer to assume this role for a limited time.',
                isCorrect: true
            },
            {text: 'D) Share the root user credentials with the developer.', isCorrect: false}
        ],
        explanation: 'Using an IAM role with a temporary, narrowly scoped policy is the most secure method. It adheres to the principle of least privilege and avoids the use of long-term credentials.',
        explanationDetails: {
            summary: 'This approach ensures:',
            breakdown: [
                'Access is temporary and automatically expires.',
                'Permissions are restricted to only what is necessary.',
                'No long-term credentials need to be managed or shared.'
            ],
            otherOptions: 'A) Grants excessive permissions.\nB) Creates unnecessary long-term credentials.\nD) Is a major security risk and should never be done.'
        },
        children: undefined,
        isCurrentQuestion: false,
        onClick: function (): void {
            console.log("Question 2 clicked");
        }
    }
];

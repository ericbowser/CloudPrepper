# Distributed computing

After completing this episode, you should be able to:

+ Describe the Amazon Web Services (AWS) global infrastructure, including edge locations.
+ Explain the purposes of distributed computing, edge computing, and hybrid computing.
+ Explain how the AWS global infrastructure supports distributed, edge, and hybrid computing.

## Key point 1

Distributed compute can do small, targeted tasks in any operating system (OS) environment and collaborate their work across a cluster. Offline distributed systems can perform batch processing, big data analysis, and video rendering. Distributed compute challenges include how to handle failures, how to test before deployment, and how to identify and mitigate bugs.

## Key point 2

AWS Batch provides managed batch job processing. It distributes the job across a cluster for processing, and it provisions and scales the underlying instances in EC2, Spot Instances, Fargate, or Fargate Spot.

## Key point 3

Amazon EMR (Elastic MapReduce) moves data into and out of data stores (like S3) and databases (like DynamoDB). MapReduce is a technology that maps data, reshuffles to organize the data, and reduces the data to an efficient list. A key point is that EMR pulls data from distributed systems, transforms the data across a cluster, and deposits processed data to distributed locations.

## Key point 4

AWS Outposts is managed cloud hardware to extend AWS to an on-premises datacenter. It provides either temporary (such as during a migration while supporting legacy apps) or long-term hybrid deployment.

## Key point 5

AWS Wavelength provides mobile edge computing using 5G integration to embed compute and storage into wireless networks. Use cases include industrial automation, smart cities, IoT, and autonomous vehicles.

## Key point 6

Snowball Edge provides portable AWS cloud in a rugged, luggage-size device. A job includes 10 days use for a rate such as $300 and can offer long-term use discounts.

## Key point 7

AWS X-Ray is a troubleshooting tool for distributed applications. It maps requests through underlying components and an end-to-end view of a request's journey through an app.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ AWS Batch: <https://aws.amazon.com/batch>
+ Amazon EMR: <https://aws.amazon.com/emr>
+ AWS Outposts Family: <https://aws.amazon.com/outposts>
+ AWS Wavelength: <https://aws.amazon.com/wavelength>
+ What is AWS Snowball Edge? <https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge>
+ AWS X-Ray: <https://aws.amazon.com/xray>

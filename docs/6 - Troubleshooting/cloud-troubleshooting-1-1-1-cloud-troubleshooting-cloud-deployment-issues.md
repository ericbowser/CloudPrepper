Troubleshooting Cloud Deployment Issues
=======================================================

*6.3 Given a scenario, troubleshoot network issues*
--------------------------


Description
--------------------------
+ In this episode, we will delve into common cloud deployment issues and look into tools and techniques that are useful when troubleshooting said issues. 


Resources
--------------------------
+ https://health.aws.amazon.com/health/status
+ https://docs.aws.amazon.com/cli/latest/reference/ec2/create-launch-template.html
+ https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/
  

Learning Objectives
--------------------------
+ List and describe common cloud deployment issues
+ List and describe common tools and techniques to troubleshoot cloud deployment issues


Notes
--------------------------
+ Incompatibility
  - Technology used in your deployment doesn't work well or at all with other technology used in your deployment
  - Symptoms
    + Errors/Crashes
    + Poor Performance
  - Example
    + Web app is developed using Python3 and Django
    + Back end DB relies on PostgreSQL 11
    + Cloud deployed using AWS Elasitc Beanstalk
      - Elastic Beanstalk is utilizing PostgreSQL 12
+ Misconfigurations
  - Insufficient Resource Allocation
  - Permission Issues
  - Oversubscription
    + Cloud Provider over sells resources betting that tenents won't need all of it at one time
      - Noisy Neighbor Effect
  - Sizing Issues
+ Outdated component definitions
  - The specifications, configurations, and parameters that define various elements within a cloud environment like...
    + VMs
    + Containers
    + Storage
    + Networks
  - These definitions can become outdated, leading to issues
    + Example: VM Templates
      - Definitions in the Template could include
        + OS and software versions
        + Resource allocation (CPU, RAM, Disk Space)
        + Network config
        + Security policy
        + Custom actions (scripts and other configurations)
          - [AWS Launch Template Docs](https://docs.aws.amazon.com/cli/latest/reference/ec2/create-launch-template.html)
          - See "aws-launch-template.txt"
      - Issues
        + Performance
        + System stability (Crashes)
        + Inconsistent behavior
        + Errors
+ Deprecation of functionality
+ Outages
  - Full
  - Partial
    + Responsibility?
      - Cloud Provider
        + [AWS Health Status](https://health.aws.amazon.com/health/status)
      - Tenent
+ Resource Limits
  - API Throttling
  - Service Quotas
+ Regional Service Availability
  - [Azure Regional Product Availability](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/)

# 1-1-1: Examining Cloud Deployment Models

After completing this episode, you should be able to:

+ Identify, explain, and select the appropriate cloud deployment model, given a scenario

**Description:** In this episode, the learner will examine various cloud deployment models. We will explore public, private, hybrid clouds, and more.

+ Describe cloud computing
  + NIST SP 800-145 
    + A model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (e.g., networks, servers, storage, applications, and services) that can be rapidly provisioned and released with minimal management effort or service provider interaction. This cloud model is composed of five essential characteristics, three service models, and four deployment models.
+ Describe various cloud deployment models
  + NIST SP 800-145: Public cloud
    + The cloud infrastructure is provisioned for open use by the general public. It may be 
    owned, managed, and operated by a business, academic, or government organization, or some combination of them.
    + Cloud service provider examples - Azure, AWS, and GCP
    + Pay-as-you-go billing
    + Use case examples
      + A business using production, testing, and development environments requiring rapid deployment and scalability options.
     + A small business with limited infrastructure cost
  + NIST SP 800-145: Private cloud
    + The cloud infrastructure is provisioned for exclusive use by a single organization comprising multiple consumers \(e.g., business units\). It may be owned, managed, and operated by the organization, a third party, or some combination of them, and it may exist on or off premises.
    + Example use case - a business with specific computing needs and requiring direct control over their environments and sensitive data
  + NIST SP 800-145: Hybrid cloud
    + The cloud infrastructure is a composition of two or more distinct cloud infrastructures (private, community, or public) that remain unique entities but are bound together by standardized or proprietary technology that enables data and application portability \(e.g., cloud bursting for load balancing between clouds\).
    + Example use case - ideal for a business requiring secure handling of sensitive data while utilizing public cloud resources for non-sensitive functions.
  + NIST SP 800-145: "Community cloud
    + The cloud infrastructure is provisioned for exclusive use by a specific community of consumers from organizations that have shared concerns \(e.g., mission, security requirements, policy, and compliance considerations\)"
    + Example use cases - Applicable for government entities, healthcare organizations, and financial services firms needing a secure, shared platform.
+ Describe scenarios around cloud deployment models 
  + Scenario 1 - Web application deployment in the public cloud.
    + Objective - Utilize public cloud resources to support a scalable web application, manage increased traffic, and ensure data redundancy.
  + Scenario 2 - Private cloud setup for processing sensitive data.
    + Objective - Configure a secure, private cloud environment on-premises for processing sensitive data in compliance with regulations.
  + Scenario 3 - Hybrid cloud strategy for a financial institution.
    + Objective - Design a system combining a private cloud for storing sensitive financial data and a public cloud for computational tasks.
  + Scenario 4 - Community cloud for government agencies.
    + Objective - Create a shared infrastructure for government bodies to facilitate secure data sharing and comply with regulations.
+ Describe the importance of selecting the proper cloud deployment models
  + The selection is based on the business or application's specific requirements and constraints
  + Knowledge of these models and their components is crucial for informed decision-making in cloud architecture design.


## Additional References

+ NIST SP 800-145: The definitions presented are from the following: https://csrc.nist.gov/pubs/sp/800/145/final#pubs-documentation
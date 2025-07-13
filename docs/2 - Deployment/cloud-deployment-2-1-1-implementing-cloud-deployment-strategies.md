# 2-1-1: Implementing Cloud Deployment Strategies

After completing this episode, you should be able to:

+ Identify and explain cloud deployment strategies, given a scenario 

**Description:** In this episode, the learner will examine various deployment strategies. We will explore the process and considerations for Blue-Green, Rolling, In-Place, Canary deployments, and more.

+ Describe the importance of using a deployment strategy
  + A methodology applied during the software release process to deploy new versions of an application with minimal downtime and risk
  + Understanding these strategies is crucial for ensuring smooth transitions between application versions
  + Can enhance the user experience
  + Helps in maintaining system reliability
+ Describe common deployment strategies
  + Blue-Green deployment
    + A method involving two identical environments, with one hosting the current application version \(blue\) and the other the new version \(green\)
    + Process
      + The new version is deployed to the green environment for testing
      + Upon successful validation, traffic is shifted from blue to green
    + Considerations
      + Can reduce downtime
      + Allows for quick rollback if needed
    + Cloud deployments
      + Can simplify the creation of identical environments and provide integrated traffic routing services
      + Implement automation to create exact replicas of each environment
      + Implement Infrastructure-as-Code, Configuration-as-Code, and version control solutions for rapid
  + Canary deployment
    + A strategy that releases the new application version to a small subset of users initially, followed by a gradual rollout to the entire user base.
    + Process
      + The new version is incrementally released to a larger group of users
      + Continuous monitoring is implemented to ensure stability and performance
    + Considerations
      + Limits the impact of potential issues to small or incremental user groups
    + Cloud deployments
      + Supports dynamic scaling and segmentation
      + Implement traffic management and monitoring solutions are critical for tracking, controlling, monitoring, and logging the deployments 
  + Rolling deployment
    + Gradually replaces the old version of an application with the new one across servers or containers without taking the system offline.
    + Process
      + Servers are updated one by one
      + Ensures that some part of the application remains available at all times
    + Considerations 
      + Maintains operational continuity
      + Can be complex if issues occur.
    + Cloud deployments
      + Cloud services facilitate Rolling deployments by automating the update process across distributed resources
      + Minimizes manual effort
      + Increases system stability, reducing the risk of downtime
  + In-Place Deployment
    + Directly updates the application on the existing infrastructure, typically resulting in some downtime.
    + Process
      + The current environment is directly updated to the new version
      + Commonly leads to temporary unavailability
    + Considerations
      + Simplicity and suitability for smaller or less critical applications
    + Cloud deployments
      + Can minimize downtime through rapid deployment capabilities
    + Implement automation and monitoring solutions
+ Scenario 1: Blue-Green Deployment
  + Objective
    + Implement a low-latency, non-disruptive deployment for a critical cloud-hosted application
    + Ensure the new version is fully operational before switching traffic
    + Provide a seamless user experience
  + Cloud considerations
    + Fast, automated switching between environments
    + Utilize cloud-based load balancers to minimize downtime and risk
+ Scenario 2: Canary Deployment
  + Objective
    + Gradually release a new feature in a cloud application to a segmented group of users 
    + Closely monitoring performance and user feedback to adjust the rollout.
  + Cloud considerations
    + Dynamic resource allocation in response to real-time feedback and performance data 
    + Ensure that the infrastructure can adapt to user demand and application needs efficiently
+ Scenario 3: Rolling Deployment
  + Objective
    + Update a cloud-based e-commerce platform with minimal impact on user experience    
    + Use a rolling update to ensure continuous operation
  + Cloud considerations
    + Automated scaling and management of instances across different geographic locations 
    + Ensure that updates are seamlessly applied without impacting the global user experience
    + Maintaining service quality and availability
+ Scenario 4: In-Place Deployment
  + Objective
    + Conduct an update on a proprietary on-premise system 
    + Plan for a short downtime window
  + Cloud considerations
    + Implement accelerated provisioning, automated deployment and monitoring capabilities
+ Describe some considerations when choosing a  deployment strategy
  + Ensure application requirements can be meet
  + The organization's tolerance for risk and downtime
  + Available resources for managing the deployment process 
  


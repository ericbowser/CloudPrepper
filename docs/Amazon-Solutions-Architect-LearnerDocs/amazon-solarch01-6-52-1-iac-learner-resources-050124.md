# Infrastructure as Code or IaC

After completing this episode, you should be able to:

+ Explain the purpose of Infrastructure as Code (IaC).
+ Interpret information given in an IaC template.
+ Explain the interdependency between a template and the resources it creates and manages.
+ Compare immutable and idempotent principles.

## Key point 1

Automation through code provides repeatability, version control, and documentation of changes.

## Key point 2

With imperative tools, you describe the steps you want the tool to take to reach an outcome. With a declarative tool, you describe the outcome you want, and the tool figures out the details of how to get there. CloudFormation is declarative.

## Key point 3

To create a stack in CloudFormation, you first create a template in code (YAML or JSON). You then create a stack of resources from the template. With Proton, you can share IaC templates with developers in your account, and you continue to own the resources created from that template. With Service Catalog, you can share IaC templates with internal or external customers using separate accounts, and they can use the shared template to create their own resource stack in their accounts.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ CloudFormation: https://aws.amazon.com/cloudformation
+ CloudFormation best practices: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/best-practices
+ Proton: https://aws.amazon.com/proton
+ AWS Service Catalog: <https://aws.amazon.com/servicecatalog>

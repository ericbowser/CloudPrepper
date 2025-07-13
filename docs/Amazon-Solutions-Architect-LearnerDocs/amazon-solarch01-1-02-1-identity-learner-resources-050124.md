# Identity concepts

After completing this episode, you should be able to:

+ Explain the importance of the AWS shared responsibility model in securing cloud resources.
+ Describe the principle of least privilege.
+ Compare various AWS access types.
+ Compare resource policies, IAM roles, and IAM policies.

## Key point 1

Security in Amazon Web Services (AWS) is structured by the shared responsibility model, in which AWS is responsible for some layers of security while the customer is responsible for the other layers. The dividing line of responsibility varies by the service used.

## Key point 2

Cloud security works in layers, with various security tools working together to provide thorough coverage of all resources and services. Security layers are applied to resources, network spaces, and access controls.

## Key point 3

AWS resources can be accessed through the Management Console, the command-line interface (CLI), CloudShell, and various software developer kit (SDK) tools. You can use identity federation to provide authentication through other identity providers.

## Key point 4

The CLI and SDKs use AWS Service Endpoints to direct application programming interface (API) messaging.

## Key point 5

Users represent humans or services with access to your AWS account. Users can be collected in groups for easier permission management. You can't "sign into" a group. Roles can define temporary permissions and are the best-practice method of giving permissions to resources and, in some cases, to users. You can use policies to group permissions for assignment. Resource-based policies apply to specific resources, while identity-based policies apply to users, groups, and roles.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ AWS service endpoints: <https://docs.aws.amazon.com/general/latest/gr/rande>
+ AWS Identity and Access Management: <https://aws.amazon.com/iam>
+ What is IAM? https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction
+ IAM roles: <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles>
+ Policies and permissions in IAM: <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies>
+ Internetwork traffic privacy in Amazon VPC: <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security>

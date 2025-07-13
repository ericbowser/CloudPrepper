# Managing multiple AWS accounts

After completing this episode, you should be able to:

+ Deploy access controls across multiple Amazon Web Services (AWS) accounts.
+ Explain the roles of Control Tower and service control policies (SCPs) in managing account access from other accounts.
+ Design role-based access control (RBAC) across accounts.

## Key point 1

AWS Organizations is free to use, and the Organizations management account is charged for resources used by users and roles within those accounts. You can create new users within the account, or invite existing accounts to join the Organization.

## Key point 2

SCPs filter, or remove/limit, permissions, never add permissions. Identity-based or resource-based policies are still required to grant permissions to resources or services. Effective permissions exist in the overlap between SCP restrictions and identity or resource policy permissions. SCP effects are inherited by everything below where the SCP is applied.

## Key point 3

AWS IAM Identity Center provides access controls for organization accounts. It previously was called *AWS SSO*. AWS Control Tower incorporates functions from Organizations, Identity Center, CloudFormation, CloudTrail, and other services into a single service in addition to more robust features. Control Tower includes the following components: Landing Zone, Account Factory, Guardrails, and Dashboard.

## Key point 4

AWS Resource Access Manager (RAM) allows users to share resources across accounts, organizations, organizational units (OUs), and in some cases, Identity Access Management (IAM) users or roles. AWS License Manager is used for managing software licenses and to enforce licensing rules to reflect the terms of the company's agreement with the vendor.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ Service Control Policies:
  + Service control policies (SCPs): <https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps>
  + SCP Syntax: <https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_syntax>
+ AWS IAM Identity Center Features: <https://aws.amazon.com/iam/identity-center/features>
+ AWS Control Tower Features: <https://aws.amazon.com/controltower/features>
+ AWS Service Catalog: <https://aws.amazon.com/servicecatalog>
+ AWS Resource Access Manager (RAM): <https://aws.amazon.com/ram>
+ AWS License Manager: <https://aws.amazon.com/license-manager>

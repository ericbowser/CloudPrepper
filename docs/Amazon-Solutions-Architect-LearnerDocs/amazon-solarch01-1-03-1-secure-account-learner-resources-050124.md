# Securing AWS accounts

After completing this episode, you should be able to:

+ Explain federated access and single sign-on (SSO).
+ Compare root users and Identity Access Management (IAM) users.
+ Configure multi-factor authentication (MFA) requirements.
+ Design an authorization model that includes IAM users, groups, roles, and policies.

## Key point 1

Best practice is to create an IAM user with full administrative access and other user accounts with more limited access, and then never again use the root account for anything. Never create programmatic access keys for the root account.

## Key point 2

Always enable MFA on all Amazon Web Services (AWS) accounts.

## Key point 3

Within an IAM role, the *trust policy* defines who can use the role while the *permissions policy* defines what they can do with the role.

## Key point 4

You can create up to 5,000 users within your account. These users represent specific entities and require long-term access. In contrast, a role represents unspecified entities and provides short-term access or emergency access. Roles rely on Security Token Service (STS)) for authorization. Identity providers can be used through Web Identity Federation (OIDC), SAML 2.0, or Amazon Cognito.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ AWS security credentials: <https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys>
+ Setting up Active Directory to federate access to AMS IAM roles: <https://docs.aws.amazon.com/managedservices/latest/onboardingguide/set-up-ad-to-federate-iam-roles>
+ AWS Directory Service:
  + What is AWS Directory Service? <https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is>
  + AWS Directory Service: <https://aws.amazon.com/directoryservice>
+ Identity providers and federation: <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers>
+ Amazon Cognito: <https://aws.amazon.com/cognito>

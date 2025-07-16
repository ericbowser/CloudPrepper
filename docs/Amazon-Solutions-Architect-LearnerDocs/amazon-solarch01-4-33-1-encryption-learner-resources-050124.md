# Encryption

After completing this episode, you should be able to:

+ Explain how basic encryption processes work to secure data at rest and in transit.
+ Describe best practices for key management.
+ Compare services used to secure and manage encryption keys and certificates.

## Key point 1

Symmetric encryption uses the same key both for encryption and decryption. The key must be kept private and it must be shared between both parties safely. Asymmetric encryption uses two related keys, one for encryption and the other for decryption. One key is kept private and never shared while the other key can be posted publicly. Key management includes generating, rotating, renewing, and retiring keys.

## Key point 2

Amazon Web Services (AWS) KMS (Key Management Service) can create and control keys. It stores keys on hardware security modules (HSMs) that are FIPS 140-2 validated. Key monitoring is provided through CloudTrail and CloudWatch. Use Identity Access Management (IAM) permissions to control who can generate keys, who can encrypt with a particular key, and who can decrypt with a particular key. AWS CloudHSM (Hardware Security Modules) can provide single-tenant HSM key storage.

## Key point 3

AWS ACM (Certificate Manager) supports public, private, and imported TLS certificates. It can also provide a private CA (certificate authority).

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ AWS Key Management Service: <https://aws.amazon.com/kms>
+ AWS CloudHSM: <https://aws.amazon.com/cloudhsm>
+ AWS Certificate Manager: <https://aws.amazon.com/certificate-manager>
+ AWS Private CA: <https://aws.amazon.com/certificate-manager/private-certificate-authority>

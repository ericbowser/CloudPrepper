# External network connections

After completing this episode, you should be able to:

+ Compare external network connection options for performance, security, and costs.
+ Configure virtual private network (VPN) resources in Amazon Web Services (AWS).
+ Explain options for AWS Direct Connect.
+ Explain the benefits of AWS PrivateLink.
+ Configure virtual private cloud (VPC) peering.

## Key point 1

External network connection options include the internet, VPN connections, and Direct Connect. You can establish a VPN as a client VPN to a single user or as a site-to-site VPN, which is always on and connects to the on-premises network and not just to a single user. A VPN connection requires a virtual VPN gateway on the AWS side and a physical customer gateway on the customer network.

## Key point 2

A Direct Connect connection is established through a colocation facility. To get a Direct Connect connection, you first configure the DX connection in your AWS account, download the LOA+CFA (letter of authorization + connecting facility assignment), and take that documentation to a colocation facility where you have a connection through your ISP or through a partner service. A Direct Connect connection is not inherently redundant.

## Key point 3

VPC endpoints provide access to AWS services from within a VPC. Gateway endpoints are highly available and connect to S3 or DynamoDB. Interface endpoints are not inherently redundant and can be used to connect to many other AWS services using PrivateLink. PrivateLink can be used to keep your traffic within the AWS infrastructure and off the internet. It can also be used to connect to AWS resources owned by other customers.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ AWS Direct Connect: <https://aws.amazon.com/directconnect>
+ AWS Direct Connect Resiliency Recommendations: <https://aws.amazon.com/directconnect/resiliency-recommendation/?nc=sn&loc=4&dn=2>
+ PrivateLink:
  + What is AWS PrivateLink?: <https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink>
  + Access AWS services through AWS PrivateLink: <https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services>
  + Control access to VPC endpoints using endpoint policies: <https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access>

# Route 53 deep dive

After completing this episode, you should be able to:

+ Explain how Domain Name System (DNS) works.
+ Compare DNS record types.
+ Configure Amazon Route 53 to support AWS-hosted DNS records.

## Key point 1

You can use Route 53 to register a domain, create hosted zones and DNS records, set health checks and failover, and set a DNS resolver for your virtual private clouds (VPCs). Hosted zones can be public for routing internet traffic, private for routing VPC traffic, or split-view/split-horizon for routing both public and private traffic. To set up a split horizon hosted zone, create both a public zone and a private zone with the same name for both, then associate the private zone with at least one VPC.

## Key point 2

Common types of DNS records include A, AAAA, Canonical Name (CNAME), mail exchange (MX), pointer record (PTR), and start of authority (SOA). In Amazon Web Services (AWS), you often need to use an alias DNS record in place of a CNAME record because a CNAME record can't be posted to the zone apex. Alias records are the AWS solution to this limitation.

## Key point 3

Commonly used Route 53 routing policies include simple routing, failover routing, geolocation routing, geoproximity routing, latency routing, IP-based routing, multivalue answer routing, and weighted routing. You can use health checks to check endpoint health or check group resources, CloudWatch data stream status, and recover status after failover.

## Additional resources

If additional resources are used during the episode, they can be obtained using the download link on the overview episode (e.g. diagrams, no PowerPoints).

## External resources

You can reference the following external resources for supplementary tools and information:

+ What is Amazon Route 53? <https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome>
+ Routing traffic to your resources: <https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-routing-traffic-to-resources>
+ Choosing between alias and non-alias records: <https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias>
+ Solving DNS zone apex challenges with third-party DNS providers using AWS: <https://aws.amazon.com/blogs/networking-and-content-delivery/solving-dns-zone-apex-challenges-with-third-party-dns-providers-using-aws>
+ Choosing a routing policy: <https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy>
+ Creating Amazon Route 53 health checks and configuring DNS failover: <https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover>

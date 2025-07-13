Troubleshooting Cloud Networking Issues
=======================================================

*6.3 Given a scenario, troubleshoot network issues*
--------------------------


Description
--------------------------
+ In this episode, we will delve into common cloud networking issues and look into tools and techniques that are useful when troubleshooting these types of issues.


Resources
--------------------------
+ https://datatracker.ietf.org/doc/html/rfc7231#section-6.5
+ https://www.nist.gov/news-events/news/2022/12/nist-retires-sha-1-cryptographic-algorithm
+ https://datatracker.ietf.org/doc/rfc8996/
  

Learning Objectives
--------------------------
+ List and describe common cloud networking issues
+ List and describe common tools and techniques for troubleshooting cloud network issues


Notes
--------------------------
+ Network Service Unavailablity
  - DHCP
  - DNS
  - NTP
  - NAT
  - HTTP
    + Status Codes
      - Client Errors: 400 - 499
      - Server Errors: 500 - 599
        + [RFC 7231 HTTP](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5)
+ Protocol Incompatibilty
+ Protocol Deprecations
  - SSL/TLS
    + [IETF Advisory](https://datatracker.ietf.org/doc/rfc8996/)
  - SSH
    + SHA1
      - [NIST Advisory](https://www.nist.gov/news-events/news/2022/12/nist-retires-sha-1-cryptographic-algorithm)
  - FTP
+ IP Addressing Issues
  - Scope Exhaustion
  - Network Overlap
    + Review IP assignment
    + Check routing/switch configs that may allow for overlap
    + Use network sniffer to see where overlap may be occuring
+ Routing Issues
  - Missing Routes
  - Misconfigured Routes
+ Switching Issues
  - VLAN Issues
    + Dead port
    + Misconfigured tags
    + Routing between VLANs
  - Access vs. Trunk ports

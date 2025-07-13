Secure Access to Management and Resources
=======================================================

*4.3 Given a Scenario, Implement Identity and Access Management*
--------------------------


Description
--------------------------
+ In this episode, we will take a look at some of the ways in which we can securely access our cloud resources and management environments.


Resources
--------------------------
+ https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
+ https://cloud.google.com/sdk?hl=en
+ https://learn.microsoft.com/en-us/rest/api/azure/#create-the-request
+ https://ecma-international.org/publications-and-standards/standards/ecma-335/
  

Learning Objectives
--------------------------
+ List and describe secure ways to access cloud resources
+ List and describe secure ways to access cloud management environments


Notes
--------------------------
+ Secure access to the cloud resources
  - Web Portal
  - API
  - Secure Shell (SSH)
  - Remote Desktop Protocol (RDP) 
  - Bastion host
    + Hardened device accessible from the internet
    + aka Jump Box
      - "Jump" from bastion host to access servers and other sensitive devices/data
+ Secure access to the cloud management environment
  - Web portal
  - Programmatic access
    + Software development kit (SDK)
      - [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
      - [GPC Cloud SDK](https://cloud.google.com/sdk?hl=en)
    + Application programming interface (API)
      - [Azure REST API](https://learn.microsoft.com/en-us/rest/api/azure/#create-the-request)
      - [AWS API Reference](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html#api-reference)
  - Common Language Infrastructure (CLI)
    + [CLI Standards Doc](https://ecma-international.org/publications-and-standards/standards/ecma-335/)
    + A platform that makes it possible to utilize many high-level programming languages regardless of the environment
      - A component of the .NET Framework
      - Aims to promote language interoperability
        + allowing developers to choose the best language for a particular task 
        + ensuring that the various components can work together seamlessly
      - Core components
        + Common Type System (CTS)
          - Shared data types
        + Metadata
          - Describes the types that are defined
        + Common Intermediate Language (CIL)
          - Whatever language is being used gets transformed into CIL
        + Virtual Execution System
          - Loads and executes the CIL code
        + Base Class Library (BCL)
          - A set of standard classes that can be used across different CLI-compliant languages

/**
 * Chapter 10 Quiz (cloudComputing)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 10,
  "title": "Chapter 10: Major Cloud Platforms (AWS, Azure, GCP) Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "Which major cloud provider pioneered the modern public cloud market with the commercial release of Simple Storage Service (S3) and Elastic Compute Cloud (EC2) in 2006?",
      "options": [
        {
          "label": "A",
          "text": "Amazon Web Services (AWS)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Microsoft Azure",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Google Cloud Platform (GCP)",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "IBM Cloud",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "What is the primary architectural differentiator that makes Google Cloud Platform (GCP) popular for Big Data, AI/ML, and containerized workloads?",
      "options": [
        {
          "label": "A",
          "text": "Google's deep heritage in inventing Kubernetes, global low-latency fiber network infrastructure (B4 network), and cutting-edge data services like BigQuery and custom Tensor Processing Units (TPUs).",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "GCP servers run on battery power.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "GCP is the only cloud that supports Windows Server.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "GCP does not charge any money for computing.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "What strategic advantage does Microsoft Azure possess that drives rapid enterprise adoption among established Fortune 500 corporations?",
      "options": [
        {
          "label": "A",
          "text": "Seamless integration with existing enterprise Microsoft ecosystems (Active Directory / Entra ID, Windows Server, Office 365, SQL Server) and flexible hybrid licensing (Azure Hybrid Benefit).",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Azure does not require any passwords or authentication.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Azure can only run applications written in Visual Basic.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Azure does not use virtualization.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "Match the equivalent Virtual Machine Infrastructure as a Service (IaaS) products across the Big Three cloud providers:",
      "options": [
        {
          "label": "A",
          "text": "AWS VPC ⟷ Azure Cosmos DB ⟷ Google Cloud Run",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "AWS Lambda ⟷ Azure Disk ⟷ Google Cloud Storage",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "AWS S3 ⟷ Azure Blob ⟷ Google BigQuery",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "AWS EC2 ⟷ Azure Virtual Machines ⟷ Google Compute Engine (GCE)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 5,
      "questionText": "Match the equivalent Object Storage services across the Big Three cloud providers:",
      "options": [
        {
          "label": "A",
          "text": "AWS SQS ⟷ Azure Event Hubs ⟷ Google Pub/Sub",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "AWS Aurora ⟷ Azure SQL ⟷ Google Cloud SQL",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "AWS EBS ⟷ Azure Files ⟷ Google Spanner",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "AWS S3 ⟷ Azure Blob Storage ⟷ Google Cloud Storage (GCS)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 6,
      "questionText": "Match the equivalent managed Kubernetes (K8s) container services across the Big Three cloud providers:",
      "options": [
        {
          "label": "A",
          "text": "AWS Elastic Kubernetes Service (EKS) ⟷ Azure Kubernetes Service (AKS) ⟷ Google Kubernetes Engine (GKE)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "AWS EC2 ⟷ Azure VM ⟷ Google App Engine",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "AWS RDS ⟷ Azure Cosmos DB ⟷ Google Bigtable",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "AWS CloudFormation ⟷ Azure Logic Apps ⟷ Google Dataproc",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "Match the equivalent serverless Function as a Service (FaaS) offerings across the Big Three cloud providers:",
      "options": [
        {
          "label": "A",
          "text": "AWS Lambda ⟷ Azure Functions ⟷ Google Cloud Functions",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "AWS CloudTrail ⟷ Azure Monitor ⟷ Google Cloud Logging",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "AWS Redshift ⟷ Azure Synapse ⟷ Google Spanner",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "AWS Fargate ⟷ Azure App Service ⟷ Google Anthos",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "What architectural capability makes Google Cloud Spanner unique in the cloud database landscape?",
      "options": [
        {
          "label": "A",
          "text": "It runs without an operating system.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It does not support SQL queries.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It is a globally distributed relational database providing external consistency and ACID transactions across continents at scale, synchronized using TrueTime API atomic clocks and GPS receivers.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "It can only store up to 100 megabytes of data.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "What is Azure Cosmos DB?",
      "options": [
        {
          "label": "A",
          "text": "A globally distributed, multi-model NoSQL database service offering turnkey multi-region replication and five well-defined consistency levels (Strong, Bounded Staleness, Session, Consistent Prefix, Eventual).",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A tool for managing employee email addresses.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A database that stores data exclusively on physical magnetic tapes.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "An astronomical telescope simulator for scientists.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What is Amazon DynamoDB?",
      "options": [
        {
          "label": "A",
          "text": "An open-source desktop word processor.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A fully managed, serverless, single-digit-millisecond latency NoSQL key-value and document database service with automatic multi-AZ replication, continuous backups, and in-memory caching (DAX).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A physical server rack cooling unit.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A video streaming service for mobile games.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What is Google BigQuery?",
      "options": [
        {
          "label": "A",
          "text": "A tool for drawing network diagrams.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A text editor designed for compiling C code.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A fully managed, serverless, highly-scalable cloud enterprise data warehouse that enables ultra-fast SQL querying over petabytes of data using Google's Dremel distributed execution engine.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A search engine for finding large fonts.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "How is resource organization structured hierarchically in Google Cloud Platform (GCP)?",
      "options": [
        {
          "label": "A",
          "text": "Organization Node ➔ Folders (optional business units/environments) ➔ Projects (the core boundary container for resources, billing, and IAM) ➔ Individual Resources.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "All resources in GCP must be placed in a single flat global folder.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Resources are organized by employee birth dates.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Projects cannot be grouped under organizations.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "How is identity and access governed across multi-subscription enterprise environments in Microsoft Azure?",
      "options": [
        {
          "label": "A",
          "text": "Using Linux shadow password files.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Using a single shared admin password saved on a USB stick.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Azure does not support identity hierarchies.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Using Microsoft Entra ID (formerly Azure Active Directory), organized hierarchically into Management Groups, Subscriptions, Resource Groups, and Resources with Azure Policy and RBAC.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 14,
      "questionText": "How does Amazon Aurora achieve up to 5x the throughput of standard MySQL and 3x of PostgreSQL on identical hardware?",
      "options": [
        {
          "label": "A",
          "text": "By decoupling compute and storage, using a distributed log-structured storage engine that replicates write-ahead logs across 6 copies across 3 Availability Zones without full-page write overhead.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "By disabling all ACID transaction guarantees.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "By running on quantum microchips.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "By discarding unindexed database rows.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "What is Google Cloud Run?",
      "options": [
        {
          "label": "A",
          "text": "A command line tool for running Windows batch files.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A fitness application for monitoring running mileage.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A fully managed serverless platform that automatically scales arbitrary OCI container images from zero to thousands of instances in response to web requests or events, abstracting all K8s infrastructure.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A physical server with wheels for moving between offices.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "What is AWS Fargate?",
      "options": [
        {
          "label": "A",
          "text": "An operating system kernel compiled by Amazon.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A database table partition method.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A serverless compute engine for containers that works with both Amazon ECS and EKS, running containers without requiring users to provision, configure, patch, or manage underlying EC2 virtual machines.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A network gateway connecting on-premises servers to satellite internet.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "What hybrid cloud solution allows customers to run AWS infrastructure and services directly inside their own physical on-premises data centers using Amazon-delivered hardware racks?",
      "options": [
        {
          "label": "A",
          "text": "AWS CodeDeploy",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "AWS Outposts",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "AWS CloudFormation",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "AWS Elastic Beanstalk",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What hybrid management platform developed by Microsoft extends Azure governance, resource management (ARM), and Azure services to servers running in on-premises data centers, AWS, and GCP?",
      "options": [
        {
          "label": "A",
          "text": "Azure Front Door",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Azure Virtual WAN",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Azure DevOps Server",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Azure Arc",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What hybrid and multi-cloud platform developed by Google allows organizations to build, deploy, and manage applications across on-premises data centers, Google Cloud, AWS, and Azure using managed GKE?",
      "options": [
        {
          "label": "A",
          "text": "Google Workspace",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Google Anthos (GKE Enterprise)",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Google Cloud Dataprep",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Google App Engine Standard",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "Why do organizations utilize open-source infrastructure-as-code (IaC) tools like HashiCorp Terraform when managing multi-cloud deployments across AWS, Azure, and GCP?",
      "options": [
        {
          "label": "A",
          "text": "It guarantees that cloud servers will never experience power outages.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It eliminates the need for paying cloud bills.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It provides a single, declarative configuration language (HCL) and unified state management workflow to provision and version infrastructure across all cloud providers through provider plugins.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "It automatically translates Python code into Java code.",
          "isCorrect": false
        }
      ]
    }
  ]
};

/**
 * Chapter 3 Quiz (cloudComputing)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 3,
  "title": "Chapter 3: Cloud Service Models (IaaS, PaaS, SaaS) Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "What fundamental framework defines the division of security, operational, and maintenance obligations between the cloud provider and the consumer across service models?",
      "options": [
        {
          "label": "A",
          "text": "The Zero-Sum Game Principle",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The OSI 7-Layer Networking Model",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The Agile Manifesto",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The Shared Responsibility Model",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 2,
      "questionText": "In an Infrastructure as a Service (IaaS) model (such as AWS EC2 or Google Compute Engine), which layer is strictly the CUSTOMER'S responsibility to manage and patch?",
      "options": [
        {
          "label": "A",
          "text": "The physical facility cooling and diesel generators.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The guest Operating System (OS), installed middleware, runtime, and security updates/patches.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "The physical server motherboard firmware.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The Type-1 hypervisor software running on the physical host.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "In an IaaS deployment, which component is maintained and secured by the Cloud Service Provider (CSP)?",
      "options": [
        {
          "label": "A",
          "text": "Physical data center facilities, hardware host servers, storage infrastructure, and the core virtualization hypervisor layer.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "The customer's database passwords and session tokens.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The application source code written by the customer's developers.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The customer's IAM user permissions.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "Which service model provides customers with a managed application runtime environment (including OS, web server, and execution engine) allowing developers to deploy code without managing VMs?",
      "options": [
        {
          "label": "A",
          "text": "PaaS (Platform as a Service, such as AWS Elastic Beanstalk or Heroku)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Bare-metal leasing",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "IaaS (Infrastructure as a Service)",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Colocation hosting",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "In a Platform as a Service (PaaS) deployment, who is responsible for applying security patches to the underlying Linux/Windows operating system?",
      "options": [
        {
          "label": "A",
          "text": "The customer must connect via SSH and run \"apt-get upgrade\" manually.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The Cloud Service Provider (CSP) automatically handles underlying OS and runtime maintenance.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Operating systems are never patched in cloud environments.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The hardware manufacturer (e.g., Intel or Dell).",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "Which of the following is the best example of a Software as a Service (SaaS) application?",
      "options": [
        {
          "label": "A",
          "text": "A raw unformatted Amazon EBS block volume",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "An Amazon EC2 Ubuntu virtual machine instance",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Google Workspace (Gmail, Google Docs) or Microsoft 365",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A local Dockerfile script on a laptop",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "In a Software as a Service (SaaS) model, what remains the primary operational responsibility of the customer organization?",
      "options": [
        {
          "label": "A",
          "text": "Replacing failed power supply units in data centers.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Upgrading the database server CPU cores.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Re-compiling the application source code each week.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Configuring user access permissions, managing credentials, managing data classification, and ensuring appropriate device security.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 8,
      "questionText": "How does Function as a Service (FaaS / Serverless Computing, such as AWS Lambda or Google Cloud Functions) extend beyond traditional PaaS?",
      "options": [
        {
          "label": "A",
          "text": "It provides dedicated physical mainframe computers.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It requires customers to manage their own hypervisors.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It can only run programs written in assembly language.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It executes discrete, stateless code snippets in response to event triggers, scaling down to absolute zero when idle with billing strictly per millisecond of compute time consumed.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 9,
      "questionText": "Which service model provides the HIGHEST level of architectural control and customization to the customer, but also demands the GREATEST operational management overhead?",
      "options": [
        {
          "label": "A",
          "text": "SaaS (Software as a Service)",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "PaaS (Platform as a Service)",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "FaaS (Function as a Service)",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "IaaS (Infrastructure as a Service)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 10,
      "questionText": "Which service model offers the FASTEST time-to-market for end-user functionality with the LOWEST operational management burden on the enterprise?",
      "options": [
        {
          "label": "A",
          "text": "On-premises private data center",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Bare-metal hosting",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "SaaS (Software as a Service)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "IaaS (Infrastructure as a Service)",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What is Database as a Service (DBaaS, such as Amazon RDS or Azure SQL Database)?",
      "options": [
        {
          "label": "A",
          "text": "Installing MySQL manually on a bare-metal server.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A software company that sells customer phone numbers.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Storing spreadsheets on an external USB flash drive.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A specialized PaaS offering where the cloud provider manages database provisioning, OS patching, high availability replication, and automatic backups while the customer manages database schemas and queries.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 12,
      "questionText": "If a vulnerability is discovered in the Linux kernel of an Amazon EC2 instance provisioned by a company, who is responsible for applying the kernel patch according to the Shared Responsibility Model?",
      "options": [
        {
          "label": "A",
          "text": "Amazon Web Services (AWS) automatically and silently modifies the customer's guest kernel.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The United Nations Cybersecurity Council.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The domain registrar.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The customer organization (because guest OS maintenance on IaaS is customer-owned).",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 13,
      "questionText": "If a vulnerability is discovered in the physical hypervisor layer of an AWS data center host, who is responsible for patching it?",
      "options": [
        {
          "label": "A",
          "text": "Every customer running virtual machines on that host.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "AWS (because hypervisor and underlying physical infrastructure are provider-owned).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "The open-source Linux community.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The end-user using the website.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "Why might an enterprise choose IaaS over PaaS despite the higher management overhead of IaaS?",
      "options": [
        {
          "label": "A",
          "text": "IaaS eliminates all software security risks.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "PaaS requires physical server rack assembly.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The application requires legacy operating system versions, specialized kernel modules, specific network device drivers, or custom file system configurations not supported by PaaS runtimes.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "IaaS is always completely free of charge.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "In which service model does the customer have ZERO access or visibility into the underlying infrastructure, operating system, or application source code?",
      "options": [
        {
          "label": "A",
          "text": "PaaS (Platform as a Service)",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "IaaS (Infrastructure as a Service)",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "SaaS (Software as a Service)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Colocation",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "What risk is commonly associated with deploying applications to proprietary PaaS environments that use vendor-specific SDKs and APIs?",
      "options": [
        {
          "label": "A",
          "text": "Immediate hardware overheating.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Loss of all internet connectivity.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Automatic transformation of code into binary assembly.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Vendor lock-in, where migrating the application to another cloud provider requires significant code rewriting.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 17,
      "questionText": "In a traditional on-premises enterprise data center (private hosting), who is responsible for physical security, hypervisor management, OS patching, runtime maintenance, and data backups?",
      "options": [
        {
          "label": "A",
          "text": "The enterprise customer manages 100% of all layers across the entire stack.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "The ISP providing internet routing.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The public cloud provider.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The municipal electric utility company.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 18,
      "questionText": "Which cloud service model classification best describes container orchestration management platforms like Amazon EKS or Google Kubernetes Engine (GKE)?",
      "options": [
        {
          "label": "A",
          "text": "Container as a Service (CaaS) / Managed PaaS",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Pure SaaS",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Bare-metal colocation",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Storage as a Service",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "Under the Shared Responsibility Model, who is responsible for backing up customer application data stored inside an IaaS database or object storage bucket?",
      "options": [
        {
          "label": "A",
          "text": "The customer's local internet service provider.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The customer is responsible for defining backup policies, retention schedules, and verifying restore procedures.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "The cloud provider automatically restores deleted tables at no cost.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Data in the cloud is physically impossible to delete or lose.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "How does the billing model typically differ between IaaS and FaaS (Serverless)?",
      "options": [
        {
          "label": "A",
          "text": "IaaS cannot be paid with credit cards.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "IaaS bills continuously for provisioned VM uptime (even when idle); FaaS bills strictly for the actual execution duration (in milliseconds) and memory consumed while handling an active event.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "IaaS bills per byte; FaaS bills per kilometer of fiber.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "FaaS requires a minimum 3-year upfront commitment.",
          "isCorrect": false
        }
      ]
    }
  ]
};

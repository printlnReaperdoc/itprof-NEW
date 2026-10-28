/**
 * Chapter 8 Quiz (cloudComputing)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 8,
  "title": "Chapter 8: Cloud Security and Privacy Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "What security principle dictates that users, applications, and services should be granted only the minimum permissions strictly necessary to perform their legitimate tasks, and nothing more?",
      "options": [
        {
          "label": "A",
          "text": "The Principle of Symmetric Trust",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The Rule of Abundance",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The Principle of Least Privilege (PoLP)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "The Open Door Policy",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "What fundamental security paradigm assumes that threats exist both inside and outside the network perimeter, requiring strict verification for every user and device (\"Never trust, always verify\")?",
      "options": [
        {
          "label": "A",
          "text": "Implicit Intranet Trust",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Perimeter Castle-and-Moat Security",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Single-Sign-On Exemption",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Zero Trust Architecture (ZTA)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 3,
      "questionText": "In cloud Identity and Access Management (IAM), how does an \"IAM Role\" differ fundamentally from an \"IAM User\"?",
      "options": [
        {
          "label": "A",
          "text": "An IAM Role is only available to employees who have worked at the company for 5 years.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "An IAM Role cannot be granted permissions to S3 buckets.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "An IAM User can only access resources through a mobile phone.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "An IAM Role does not have permanent long-term credentials (like passwords or access keys); instead, it is assumed temporarily by authorized entities to obtain short-lived security tokens (STS).",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 4,
      "questionText": "Why should the \"Root User\" account of a cloud organization NEVER be used for routine daily administrative tasks?",
      "options": [
        {
          "label": "A",
          "text": "Root accounts can only execute commands in Python.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The root user is charged a $10 fee every time it logs in.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Root accounts lose network connectivity after 10 minutes.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The root user has unrestricted, irrevocable access to all account resources, billing, and closure controls; compromising root credentials risks total, unrecoverable account takeover.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 5,
      "questionText": "What security mechanism requires a user to supply two or more distinct verification factors (e.g., password + time-based one-time code from an authenticator app) before logging in?",
      "options": [
        {
          "label": "A",
          "text": "Kerberos Ticket Granting",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "DNSSEC Validation",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Multi-Factor Authentication (MFA)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Single-Factor Encryption",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "What is \"Envelope Encryption\" in cloud cryptographic key management systems (such as AWS KMS or Azure Key Vault)?",
      "options": [
        {
          "label": "A",
          "text": "A technique used exclusively by postal services.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Encrypting email envelopes while leaving message contents in plaintext.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A practice where raw data is encrypted using a unique local Data Encryption Key (DEK), and the DEK itself is then encrypted under a root Key Encryption Key (KEK / Master Key) stored securely in the KMS.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Mailing paper cryptographic keys in sealed envelopes to data centers.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "What is a \"Hardware Security Module\" (HSM, such as AWS CloudHSM)?",
      "options": [
        {
          "label": "A",
          "text": "A USB security dongle used to play video games.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A metal lock placed on a server rack door.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A dedicated, tamper-resistant physical computing device certified to standards like FIPS 140-2 Level 3 that generates, stores, and manages cryptographic keys exclusively in hardware.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A software algorithm for calculating MD5 hashes.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "What is the role of an API auditing service like AWS CloudTrail in cloud governance and forensics?",
      "options": [
        {
          "label": "A",
          "text": "It measures the physical temperature of the data center.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It speeds up CPU clock frequency.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It continuously records, audits, and archives every API call and user action across the account (capturing actor identity, timestamp, source IP, and parameters) into tamper-evident log files.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "It tests web applications for spelling errors in HTML.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "What is the role of a Web Application Firewall (WAF) in cloud application defense?",
      "options": [
        {
          "label": "A",
          "text": "It prevents employees from accessing social media.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It monitors and filters HTTP/HTTPS web traffic at Layer 7 to protect web applications against common web exploits like SQL Injection (SQLi), Cross-Site Scripting (XSS), and automated bot scraping.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "It acts as an antivirus scanner for employee PDF files.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It blocks incoming power surges during lightning storms.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What type of cyberattack is mitigated by services like AWS Shield or Cloudflare by absorbing massive volumetric packet floods at global edge locations?",
      "options": [
        {
          "label": "A",
          "text": "Cross-Site Scripting (XSS)",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "SQL injection attacks",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Phishing emails",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Distributed Denial of Service (DDoS) attacks (e.g., SYN floods, UDP reflection attacks)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 11,
      "questionText": "In AWS IAM policy evaluation logic, what takes absolute precedence when multiple policies apply to the same request?",
      "options": [
        {
          "label": "A",
          "text": "An Explicit Allow always overrides an Explicit Deny.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "An Explicit Deny always overrides any Explicit Allow.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "The policy created most recently takes precedence.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Permissions are averaged using a weighted sum.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "What is a \"Side-Channel Attack\" in shared virtualized multi-tenant cloud hardware (such as Spectre or Meltdown)?",
      "options": [
        {
          "label": "A",
          "text": "Unplugging network cables from the side of a rack.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Attacking a server through an open side window in the data center.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "An attack that exploits physical CPU microarchitectural implementation quirks (like speculative execution, cache timing, or power fluctuations) to infer secret data across VM boundaries.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Intercepting radio signals from a computer mouse.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "What automated vulnerability assessment service scans EC2 instances and container images for software vulnerabilities and unintended network exposure against the CVE database?",
      "options": [
        {
          "label": "A",
          "text": "Amazon CloudFront",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Amazon Polly",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Amazon S3 Glacier",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Amazon Inspector",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What is the function of intelligent threat detection services like Amazon GuardDuty?",
      "options": [
        {
          "label": "A",
          "text": "Physically guarding data center gates with security dogs.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Analyzing billions of cloud events (CloudTrail logs, VPC Flow Logs, DNS logs) using machine learning and threat intelligence feeds to identify unauthorized behavior, cryptojacking, and compromised accounts.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Calculating the company's quarterly tax return.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Writing unit tests for developer code.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "What is \"Secrets Management\" (such as AWS Secrets Manager or HashiCorp Vault) designed to eliminate in cloud software engineering?",
      "options": [
        {
          "label": "A",
          "text": "Hardcoding plaintext database credentials, API keys, and private certificates in application source code, config files, or Git repositories.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Using open-source software libraries.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Writing comments inside software functions.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Employees talking about company products outside the office.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "In cloud security auditing, what does a \"SOC 2 Type II\" compliance report demonstrate to prospective enterprise clients?",
      "options": [
        {
          "label": "A",
          "text": "An independent CPA audit verifying that the service provider's internal controls (security, availability, processing integrity, confidentiality, and privacy) were effectively designed and operated over an extended testing period (typically 6-12 months).",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "That the data center operates with 100% renewable wind energy.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "That all employees hold university degrees in computer science.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "That the cloud provider has zero software bugs.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "What is \"VPC Flow Logs\" in cloud network monitoring?",
      "options": [
        {
          "label": "A",
          "text": "A feature that captures metadata about the IP traffic going to and from network interfaces in a VPC, logging source/destination IPs, ports, protocol, packets, and ACCEPT/REJECT status.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "An audio recording of data center server fans.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A plumbing diagnostic tool for data center water cooling.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A visual diagram showing application user click paths.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What security feature is provided by AWS Certificate Manager (ACM)?",
      "options": [
        {
          "label": "A",
          "text": "Printing physical diplomas for students who complete cloud courses.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Provisioning, managing, and automatically renewing SSL/TLS X.509 certificates for secure encrypted HTTPS communication across load balancers and CDNs without manual intervention.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Issuing drivers licenses to cloud engineers.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Auditing company financial balance sheets.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What is a \"Service Control Policy\" (SCP) in AWS Organizations?",
      "options": [
        {
          "label": "A",
          "text": "A software setting that locks keyboard keys.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A rule that prohibits running servers after 5:00 PM.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A contract specifying employee vacation days.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A policy applied at the organization or organizational unit (OU) level that sets the absolute maximum guardrail permissions that any IAM user or role within member accounts can possibly exercise.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 20,
      "questionText": "Why is Transport Layer Security (TLS 1.3) considered the modern standard for data in transit across public networks?",
      "options": [
        {
          "label": "A",
          "text": "It mandates perfect forward secrecy (PFS), removes insecure legacy cipher suites (like RC4, SHA-1, MD5), and accelerates the handshake from two round trips to a single round trip (1-RTT).",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "It works without any network connection.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It eliminates the need for IP routing.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It compresses web pages by 90%.",
          "isCorrect": false
        }
      ]
    }
  ]
};

/**
 * Chapter 4 Quiz (cloudComputing)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 4,
  "title": "Chapter 4: Cloud Deployment Models Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "According to NIST SP 800-145, what defines a \"Public Cloud\" deployment model?",
      "options": [
        {
          "label": "A",
          "text": "A municipal Wi-Fi hotspot in a city park.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Cloud infrastructure provisioned for open use by the general public, owned, managed, and operated by a commercial, academic, or government organization on its premises.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A data center owned exclusively by a single family.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A network connecting computers without passwords.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "What defines a \"Private Cloud\" deployment model?",
      "options": [
        {
          "label": "A",
          "text": "A shared server running torrent software.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A desktop computer disconnected from the internet.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Cloud infrastructure provisioned for exclusive use by a single organization comprising multiple consumers (e.g., business units), which may be owned, managed, and operated by the organization or a third party.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A public cloud account with a secret username.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "What constitutes a \"Hybrid Cloud\" deployment model?",
      "options": [
        {
          "label": "A",
          "text": "A data center powered by both solar and diesel generators.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A composition of two or more distinct cloud infrastructures (private, community, or public) that remain unique entities but are bound together by standardized technology that enables data and application portability.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "An operating system that runs both 32-bit and 64-bit applications.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A network using both Wi-Fi and Bluetooth.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "What defines a \"Community Cloud\" deployment model?",
      "options": [
        {
          "label": "A",
          "text": "Cloud infrastructure provisioned for exclusive use by a specific community of consumers from organizations that have shared concerns (e.g., mission, security requirements, policy, and compliance considerations).",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A social media platform for sharing neighborhood photos.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A public cloud region located in a residential neighborhood.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "An open-source Linux software repository.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "What is \"Cloud Bursting\" in hybrid cloud architecture?",
      "options": [
        {
          "label": "A",
          "text": "A catastrophic hardware failure of a data center cooling tower.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "An application deployment configuration where baseline workloads run on a private cloud, but automatically \"burst\" into a public cloud to provision on-demand capacity when demand exceeds capacity.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A cybersecurity attack that exhausts RAM memory.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A sudden burst of packet loss during fiber optic line degradation.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "What legal and compliance concept mandates that digital data is subject to the laws and regulations of the geographic country in which it is physically collected and processed?",
      "options": [
        {
          "label": "A",
          "text": "The Digital Millennium Copyright Act (DMCA)",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The Law of Demeter",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The Open Source Initiative Charter",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Data Sovereignty (and Data Residency)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 7,
      "questionText": "Which US federal government compliance standard authorizes cloud service providers to process federal agency workloads with standardized security assessments?",
      "options": [
        {
          "label": "A",
          "text": "PCI-DSS",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "FedRAMP (Federal Risk and Authorization Management Program)",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "SOX (Sarbanes-Oxley)",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "OSHA Regulations",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "Which regulatory standard specifically governs the protection and privacy of electronic Protected Health Information (ePHI) in cloud systems?",
      "options": [
        {
          "label": "A",
          "text": "HIPAA (Health Insurance Portability and Accountability Act)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "FERPA",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "IEEE 802.3",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "BGP RFC 4271",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "Which security compliance certification is mandatory for any cloud application that stores, processes, or transmits credit card numbers and cardholder data?",
      "options": [
        {
          "label": "A",
          "text": "Cisco CCNA Certification",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "NIST SP 800-145",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "PCI-DSS (Payment Card Industry Data Security Standard)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "ANSI SQL-92 Standard",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "How does an IPsec Site-to-Site VPN differ from a dedicated private physical interconnect (such as AWS Direct Connect or Azure ExpressRoute)?",
      "options": [
        {
          "label": "A",
          "text": "Site-to-Site VPN requires installing satellite dishes.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Site-to-Site VPN traverses the public internet over encrypted tunnels with variable latency; dedicated interconnects use a private physical fiber cross-connect bypassing the public internet with guaranteed bandwidth and consistent latency.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Site-to-Site VPN is a hardware cable; Direct Connect is software only.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Direct Connect can only transmit plain unencrypted text.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What is a \"Multi-Cloud\" strategy in modern enterprise IT?",
      "options": [
        {
          "label": "A",
          "text": "Creating multiple user accounts under the same email address.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Deploying code during cloudy weather conditions.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Architecting and operating systems across services from two or more distinct public cloud vendors (e.g., AWS and Azure) to mitigate vendor lock-in and optimize pricing and feature sets.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Hosting a server on multiple floors of the same office building.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "What is a major operational complexity and trade-off introduced by adopting a Multi-Cloud strategy?",
      "options": [
        {
          "label": "A",
          "text": "Fragmented security policies, differing identity management systems, increased staff training costs across multiple proprietary CLIs, and high inter-cloud data egress fees.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Mandatory payment in foreign currencies.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Computers running out of hard drive space immediately.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Operating systems refusing to boot.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "Why do highly regulated organizations (such as intelligence agencies or military branches) frequently deploy dedicated Private Clouds or isolated Air-Gapped Clouds (e.g., AWS GovCloud / Secret Region)?",
      "options": [
        {
          "label": "A",
          "text": "To ensure physical isolation, absolute sovereign control over hardware, compliance with strict national security clearances, and physical separation from commercial internet infrastructure.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Because private cloud hardware never degrades.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Because private clouds run 100 times faster than all public clouds.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Because public clouds are prohibited from using the Linux operating system.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What is the role of OpenStack in cloud infrastructure engineering?",
      "options": [
        {
          "label": "A",
          "text": "A database index optimization algorithm.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A proprietary Microsoft programming language.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A commercial web browser developed by Google.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A popular open-source software platform used to build and manage private and public Infrastructure as a Service (IaaS) clouds on enterprise commodity hardware.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 15,
      "questionText": "In a Community Cloud deployed for European academic research universities (e.g., GEANT), what is a key benefit over individual university private data centers?",
      "options": [
        {
          "label": "A",
          "text": "Elimination of all network cables across Europe.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Exemption from all data protection laws.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Shared financial cost of specialized high-performance computing (HPC) infrastructure and unified research data access while meeting common EU academic policies.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Free unlimited electricity supplied by the European Union.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "How does an \"Air-Gapped\" private cloud environment enforce physical security?",
      "options": [
        {
          "label": "A",
          "text": "Large industrial fans blow air between server racks.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The network is physically isolated and has zero network connections (either wired or wireless) to the public internet or any unclassified external networks.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Network cables are insulated with foam.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Servers are placed in vacuum sealed chambers.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "What is a \"Hosted Private Cloud\" (also known as a Dedicated Cloud)?",
      "options": [
        {
          "label": "A",
          "text": "A web server hosted on an employee's home broadband connection.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A private cloud where dedicated, single-tenant physical hardware is housed and managed within a third-party service provider's data center facility.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A cloud environment that requires no authentication.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A public cloud that can only be accessed on weekends.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 18,
      "questionText": "Under the General Data Protection Regulation (GDPR), what mechanism is required if a European enterprise transfers personal citizen data to a public cloud data center located in the United States?",
      "options": [
        {
          "label": "A",
          "text": "Paying a 10% tax on all internet packets.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Deleting all consonants from user names.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A verbal agreement between company CEOs.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Appropriate legal safeguards such as Standard Contractual Clauses (SCCs), data adequacy decisions, or explicit binding corporate rules ensuring equivalent privacy protections.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What financial factor typically makes the Public Cloud more cost-effective for variable, uncertain, or seasonal business workloads than building a Private Cloud?",
      "options": [
        {
          "label": "A",
          "text": "Zero upfront CapEx investment, economies of scale from hyper-scale providers, and the ability to terminate unneeded instances immediately without owning depreciating hardware.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Public cloud providers do not charge for electricity.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Public clouds provide free unlimited bandwidth.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Private clouds require paying royalties to the United Nations.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "In a Hybrid Cloud deployment, what is the primary role of software-defined networking (SDN) overlay technologies (such as VMware NSX or Cisco ACI)?",
      "options": [
        {
          "label": "A",
          "text": "To increase the physical clock speed of CPU cores.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "To extend virtual subnets, routing rules, and security policies seamlessly across on-premises data centers and public cloud VPCs under a single management plane.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "To eliminate the need for network IP addresses.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "To convert digital signals into analog telephone tones.",
          "isCorrect": false
        }
      ]
    }
  ]
};

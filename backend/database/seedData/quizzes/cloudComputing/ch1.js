/**
 * Chapter 1 Quiz (cloudComputing)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 1,
  "title": "Chapter 1: Introduction to Cloud Computing Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "According to the formal NIST definition (SP 800-145), how many essential characteristics must a system possess to be classified as cloud computing?",
      "options": [
        {
          "label": "A",
          "text": "Three characteristics",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Four characteristics",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Five characteristics",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Seven characteristics",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "Which NIST essential characteristic allows consumers to unilaterally provision computing capabilities without requiring human interaction with the service provider?",
      "options": [
        {
          "label": "A",
          "text": "Resource Pooling",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Rapid Elasticity",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Broad Network Access",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "On-Demand Self-Service",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 3,
      "questionText": "Which of the following best describes the transition from CapEx to OpEx in cloud adoption?",
      "options": [
        {
          "label": "A",
          "text": "Replacing software licenses with hardware ownership.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Depreciating servers over a 20-year fixed schedule.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Converting large upfront data center capital investments into variable, metered operational expenses.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Eliminating all network connections in favor of local disks.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "What is the primary mechanism of \"Resource Pooling\" in cloud infrastructure?",
      "options": [
        {
          "label": "A",
          "text": "Purchasing dedicated physical servers for every individual employee.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Backing up files to an uncompressed tape drive.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Serving multiple consumers using a multi-tenant model with dynamically assigned physical and virtual resources.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Connecting local hard drives with external USB hubs.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "Which NIST characteristic guarantees that cloud resource usage is automatically monitored, controlled, and reported for transparent billing?",
      "options": [
        {
          "label": "A",
          "text": "Broad Network Access",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Measured Service",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Ubiquitous Delivery",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Rapid Elasticity",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "What is the primary difference between horizontal scaling (scaling out) and vertical scaling (scaling up)?",
      "options": [
        {
          "label": "A",
          "text": "Horizontal scaling replaces Linux with Windows.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Vertical scaling requires purchasing multiple new physical data center buildings.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Horizontal scaling only works with magnetic floppy disks.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Horizontal scaling adds more instances/nodes, while vertical scaling adds more CPU/RAM to an existing instance.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 7,
      "questionText": "Which technology was a direct architectural predecessor to modern cloud computing?",
      "options": [
        {
          "label": "A",
          "text": "VCR Magnetic Tape Storage",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Grid and Utility Computing",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Dial-up Acoustic Couplers",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Vacuum Tube Colossus",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "What does \"Rapid Elasticity\" enable a cloud-hosted e-commerce application to do during Black Friday?",
      "options": [
        {
          "label": "A",
          "text": "Automatically spin up extra compute instances during traffic surges and terminate them when traffic subsides.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Downgrade all user screens to monochrome.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Disable database transactions to prevent memory usage.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Permanently lock customers out until manual approval is granted.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "Which business risk is introduced if an organization relies entirely on proprietary APIs of a single cloud vendor without abstraction?",
      "options": [
        {
          "label": "A",
          "text": "Instant bankruptcy",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Vendor Lock-in",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Hardware demagnetization",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Exceeding TCP socket limits",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "Which NIST essential characteristic ensures services are accessible across diverse client platforms including smartphones, laptops, and tablets?",
      "options": [
        {
          "label": "A",
          "text": "Broad Network Access",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Physical Port Binding",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Localized Loopback Interface",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Single Tenant Protocol",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What term describes an organization's ability to expand into global cloud data centers within minutes?",
      "options": [
        {
          "label": "A",
          "text": "Global Footprint / Worldwide Availability",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Hardware colocation lease",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Subnet containment",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Local loopback latency",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "What is \"idle capacity waste\" in traditional on-premises enterprise data centers?",
      "options": [
        {
          "label": "A",
          "text": "Unused Ethernet cables stored in boxes.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Surplus cardboard boxes from server deliveries.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Servers running at 10-15% utilization outside peak hours while consuming full electricity and cooling.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Leaving empty hard drive bays unpainted.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "Which cloud characteristic prevents one tenant from knowing the exact physical server room where their virtual machine is running?",
      "options": [
        {
          "label": "A",
          "text": "DNS Poisoning",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Location Independence (a facet of Resource Pooling)",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Subnet Obfuscation",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "BGP Routing Hijacking",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What is utility pricing in cloud economics?",
      "options": [
        {
          "label": "A",
          "text": "Subsidies paid to municipal water utilities.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Paying a fixed 10-year contract regardless of usage.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Paying only for the computing units (compute hours, GB storage, data egress) actually consumed.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Free hosting provided by non-profit organizations.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "In a multi-tenant cloud environment, what guarantees that Tenant A cannot access Tenant B's in-memory data?",
      "options": [
        {
          "label": "A",
          "text": "Hypervisor isolation, hardware virtualization rings, and kernel memory segmentation.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Physical padlocks on rack doors.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Turning off CPU caches entirely.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Gentlemen's agreements between system administrators.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "Why do startups frequently choose cloud infrastructure over purchasing physical servers?",
      "options": [
        {
          "label": "A",
          "text": "Cloud providers write their product code for free.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Cloud servers never experience software bugs.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The law prohibits startups from buying computers.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Minimal upfront capital barrier, rapid experimentation speed, and instant global scaling.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 17,
      "questionText": "What is a \"Service Level Agreement\" (SLA) in cloud computing?",
      "options": [
        {
          "label": "A",
          "text": "An employee background check protocol.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A hardware user manual for server assembly.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A contractual commitment specifying service uptime percentage and financial penalties for outages.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "An operating system license agreement.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What uptime percentage corresponds to \"Three Nines\" availability over a year?",
      "options": [
        {
          "label": "A",
          "text": "99.9% (approx. 8.76 hours downtime/year)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "99.999% (approx. 5 minutes downtime/year)",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "90.0%",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "99.0%",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What uptime percentage corresponds to \"Five Nines\" (high availability gold standard)?",
      "options": [
        {
          "label": "A",
          "text": "99.999% (approx. 5.26 minutes downtime/year)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "95.555%",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "99.5%",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "100% with absolute zero failure possibility",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "Which metric measures the speed at which cloud resources can be provisioned after an API call?",
      "options": [
        {
          "label": "A",
          "text": "Packet MTU size",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Disk rotational latency",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Baud rate",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Provisioning latency / Time-to-service",
          "isCorrect": true
        }
      ]
    }
  ]
};

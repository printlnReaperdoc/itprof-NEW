/**
 * Chapter 2 Quiz (cloudComputing)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 2,
  "title": "Chapter 2: Cloud Architecture and Core Concepts Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "In cloud infrastructure topology, what is the architectural definition of an \"Availability Zone\" (AZ)?",
      "options": [
        {
          "label": "A",
          "text": "One or more discrete, physically separated data centers within a region, equipped with independent power, cooling, and low-latency redundant network connectivity.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A software user role in an IAM directory.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A single server rack inside an office closet.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A geographic continent such as North America or Europe.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "What constitutes a \"Region\" in major cloud service providers (such as AWS, Azure, or GCP)?",
      "options": [
        {
          "label": "A",
          "text": "An IP address range assigned to a home router.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A software container image stored on Docker Hub.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A separate physical geographic area worldwide that contains multiple, isolated Availability Zones interconnected via a private high-bandwidth fiber network.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A single physical server running multiple virtual machines.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "What is the role of \"Edge Locations\" (Points of Presence / PoP) in a cloud provider's global network?",
      "options": [
        {
          "label": "A",
          "text": "To compile Linux operating system kernels.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "To store cold archival backups on magnetic tape.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "To host the main corporate headquarters of the cloud provider.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "To cache content locally close to end-users (via Content Delivery Networks / CDNs) to minimize round-trip latency for web assets and API requests.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 4,
      "questionText": "What is the critical distinction between \"Scalability\" and \"Elasticity\" in cloud system design?",
      "options": [
        {
          "label": "A",
          "text": "Scalability applies only to RAM; Elasticity applies only to hard drives.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Scalability is automatic; Elasticity requires manual human server installation.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "There is no difference; they are interchangeable terms.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Scalability is the system's ability to handle increasing load by adding resources; Elasticity is the ability to automatically scale resources up AND down dynamically in real-time to match fluctuating demand.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 5,
      "questionText": "How does High Availability (HA) differ fundamentally from Fault Tolerance (FT)?",
      "options": [
        {
          "label": "A",
          "text": "HA operates only on weekends; FT operates on weekdays.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "HA systems minimize operational downtime (e.g., 99.99%) through automated failover with possible brief interruption, whereas FT guarantees zero downtime and zero data loss through active hardware redundancy.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "HA guarantees 100% continuous uptime with zero milliseconds interruption.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "FT is cheaper and requires fewer redundant components than HA.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "In Disaster Recovery (DR) planning, what does the Recovery Point Objective (RPO) define?",
      "options": [
        {
          "label": "A",
          "text": "The speed of the network gateway interface.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The monetary cost of replacing damaged network cables.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The time required to physically reboot a server chassis.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The maximum acceptable age of files or volume of data loss measured in time that an organization can tolerate after a disaster (data loss boundary).",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 7,
      "questionText": "In Disaster Recovery planning, what does the Recovery Time Objective (RTO) define?",
      "options": [
        {
          "label": "A",
          "text": "The maximum acceptable duration of clock time permitted to restore business processes, applications, and systems following a service disruption.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "The time taken to run unit tests.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The timestamp when the last database backup was initiated.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The total lifetime of a solid-state disk drive.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "Which Disaster Recovery strategy features an RPO and RTO near zero, maintaining a fully redundant replica environment actively handling production traffic simultaneously across two regions?",
      "options": [
        {
          "label": "A",
          "text": "Pilot Light",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Backup and Restore (Cold Standby)",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Warm Standby",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Multi-Region Active-Active failover",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 9,
      "questionText": "In the Twelve-Factor App methodology for cloud-native software architecture, how should application processes handle state?",
      "options": [
        {
          "label": "A",
          "text": "State should be kept in static global in-memory variables.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Processes should write user session state directly to local server filesystems.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Processes must never restart under any circumstances.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Processes should be stateless and share-nothing, offloading any persistent state to backing services (such as databases or distributed caches).",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What is the role of an API Gateway in microservices cloud architectures?",
      "options": [
        {
          "label": "A",
          "text": "It assigns physical IP addresses to data center racks.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It compiles source code into machine binaries.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It acts as the single reverse-proxy entry point for client requests, handling protocol translation, request routing, rate limiting, authentication/authorization, and SSL termination.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "It replaces all database tables with flat text files.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What resilience problem does the \"Circuit Breaker\" design pattern solve in distributed cloud microservices?",
      "options": [
        {
          "label": "A",
          "text": "It decrypts HTTPS traffic in hardware.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It physically cuts electrical power to servers during thunderstorms.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It detects recurring failures when calling a remote dependency and temporarily halts all subsequent calls to prevent cascading system-wide resource exhaustion and crash loops.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "It prevents developers from making Git commits.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "When a microservice retries failed remote HTTP requests, why is adding \"Jitter\" (randomization) to Exponential Backoff critical?",
      "options": [
        {
          "label": "A",
          "text": "To compress TCP packet headers.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "To satisfy GDPR cookie regulations.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "To prevent the \"Thundering Herd\" problem, where hundreds of synchronized client instances retry simultaneously and repeatedly overwhelm the recovering server.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "To encrypt the payload against packet sniffing.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "What is the purpose of the \"Bulkhead\" pattern in cloud software engineering?",
      "options": [
        {
          "label": "A",
          "text": "Isolating critical elements and resource pools (e.g., connection pools or thread pools) into distinct partitions so that the failure of one component cannot drain resources and sink the entire application.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Installing watertight doors in submarine data centers.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Binding server ports to localhost only.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Merging all microservices back into a single monolith.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "How does asynchronous message queuing (e.g., using SQS, RabbitMQ, or Kafka) decouple cloud microservices?",
      "options": [
        {
          "label": "A",
          "text": "It buffers requests between producer and consumer services, allowing producers to return instant responses while consumers process workloads at their own pace without temporal dependency.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "It forces producers and consumers to share the same CPU core.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It translates SQL queries into NoSQL commands.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It eliminates the need for message validation.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "What is \"Multi-Tenancy\" in modern cloud software architectures?",
      "options": [
        {
          "label": "A",
          "text": "Assigning multiple IP addresses to a single network interface card.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A data center housing multiple distinct brands of server racks.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Renting office space to multiple IT companies.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A single software instance or infrastructure pool serving multiple independent customer organizations (tenants), with logical isolation guaranteeing data privacy and security.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 16,
      "questionText": "In cloud load balancing, what is the role of periodic \"Health Checks\"?",
      "options": [
        {
          "label": "A",
          "text": "Checking if server power supplies are plugged in.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Verifying that data center room humidity is below 40%.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Continuously polling registered target instances (e.g., HTTP GET /health) and automatically routing incoming traffic away from failing or unresponsive instances.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Scanning employee workstations for antivirus updates.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "What is the \"CQRS\" (Command Query Responsibility Segregation) architectural pattern often used in cloud data systems?",
      "options": [
        {
          "label": "A",
          "text": "Dividing SQL databases into separate tables for vowels and consonants.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Requiring two separate passwords to log into the cloud management console.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Restricting database queries to read-only during daylight hours.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Separating the data model used for executing state-altering write operations (Commands) from the data model used for high-throughput read operations (Queries).",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What is \"Eventual Consistency\" in distributed cloud databases and storage systems (governed by the CAP theorem)?",
      "options": [
        {
          "label": "A",
          "text": "Transactions are executed in random non-deterministic order.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The database is only consistent on the first day of every month.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Data writes are guaranteed to be discarded after 30 seconds.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "If no new updates are made to a given data item, all replicas will eventually converge and return the latest updated value over time.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What is the \"Strangler Fig\" pattern in enterprise cloud migration?",
      "options": [
        {
          "label": "A",
          "text": "Shutting down the legacy server on Friday night and hoping the new server works Monday morning.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Incrementally replacing specific features of a legacy monolithic application with microservices until the new cloud-native system completely replaces the monolith.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Compressing the database using bzip2.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Encrypting all source code with RSA-4096 keys.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "In cloud elasticity, what trigger mechanism causes an Auto Scaling Group to increase its minimum instance count?",
      "options": [
        {
          "label": "A",
          "text": "A scheduled server reboot at midnight.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A user clicking the \"Log Out\" button.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A metric alarm (such as average CPU utilization exceeding 75% for 3 consecutive minutes or high request queue depth).",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A physical temperature drop in the building.",
          "isCorrect": false
        }
      ]
    }
  ]
};

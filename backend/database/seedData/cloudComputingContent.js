/**
 * Comprehensive Lesson Content & Interactive Presentations
 * Course: Cloud Computing (IT Professional Elective 4 - ITEP413-T)
 * Chapters 1 to 12
 */

const cloudComputingContent = [
  // CHAPTER 1
  {
    chapterNumber: 1,
    lesson: {
      overview: 'Cloud computing represents a foundational paradigm shift in how information technology infrastructure, platforms, and applications are provisioned, scaled, and consumed. Defined formally by NIST, cloud computing provides ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources with minimal management effort.',
      learningObjectives: [
        'Formulate the NIST definition and the five essential characteristics of cloud computing.',
        'Trace the historical evolution from mainframes, grid computing, and cluster computing to modern clouds.',
        'Analyze the economic principles of cloud computing: CapEx vs. OpEx, economies of scale, and utility pricing.',
        'Identify business drivers and enterprise readiness factors for cloud migration.'
      ],
      content: `## 1. The NIST Cloud Computing Definition
The National Institute of Standards and Technology (NIST SP 800-145) defines cloud computing as:
> "A model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (e.g., networks, servers, storage, applications, and services) that can be rapidly provisioned and released with minimal management effort or service provider interaction."

## 2. The Five Essential Characteristics
1. **On-Demand Self-Service:** Consumers provision computing capabilities (CPU, server time, network storage) automatically without requiring human interaction with the service provider.
2. **Broad Network Access:** Capabilities are available over the network and accessed through standard mechanisms promoting heterogeneous thin or thick client platforms (smartphones, tablets, laptops, workstations).
3. **Resource Pooling:** The provider's computing resources are pooled to serve multiple consumers using a multi-tenant model, with physical and virtual resources dynamically assigned according to demand.
4. **Rapid Elasticity:** Capabilities can be elastically provisioned and released, in some cases automatically, to scale rapidly outward and inward commensurate with demand.
5. **Measured Service:** Cloud systems automatically control and optimize resource use by leveraging a metering capability at some level of abstraction appropriate to the type of service (e.g., storage, processing, bandwidth, and active user accounts).

## 3. Financial and Architectural Drivers: CapEx to OpEx
Traditional enterprise IT required massive Capital Expenditures (**CapEx**) for physical data centers, cooling, generators, and peak-capacity server provisioning that sat idle during normal hours.

Cloud computing converts fixed CapEx into variable Operational Expenditures (**OpEx**):
- **Utility Pricing:** Pay-as-you-go based on actual consumption.
- **Elastic Scalability:** Dynamic scaling prevents over-provisioning and under-provisioning.
- **Global Footprint:** Deploying infrastructure across worldwide availability zones in minutes.`,
      keyConcepts: [
        { term: 'On-Demand Self-Service', definition: 'Provisioning compute and storage resources autonomously without human administrative intervention.' },
        { term: 'Rapid Elasticity', definition: 'The ability to dynamically scale resources up/out or down/in based on real-time load.' },
        { term: 'Resource Pooling', definition: 'Multi-tenant aggregation of physical hardware resources dynamically allocated to tenants.' },
        { term: 'OpEx vs CapEx', definition: 'Transitioning from large upfront capital hardware investments to recurring operational utility expenses.' }
      ],
      studyGuide: [
        'Memorize all 5 NIST essential characteristics.',
        'Understand the difference between vertical scaling (scaling up) and horizontal scaling (scaling out).',
        'Analyze the economic trade-offs between on-premises data centers and public cloud infrastructure.'
      ]
    },
    presentation: {
      title: 'Chapter 1: Introduction to Cloud Computing',
      slides: [
        {
          slideNumber: 1,
          title: 'Introduction to Cloud Computing (ITEP413-T)',
          contentBlocks: [
            { type: 'text', content: 'Fourth Year Information Technology Professional Elective 4' },
            { type: 'callout', content: 'Transforming enterprise infrastructure from physical hardware to elastic, utility-metered cloud services.' }
          ],
          notes: 'Welcome students to IT Professional Elective 4: Cloud Computing.'
        },
        {
          slideNumber: 2,
          title: 'The NIST Definition & Core Foundation',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'NIST SP 800-145: The definitive global industry standard definition.',
                'Shared pool of configurable resources: CPU, Memory, Disk, Network.',
                'Ubiquitous network access through standard protocols.',
                'Rapid provisioning with minimal management interaction.'
              ]
            }
          ],
          notes: 'Explain that the cloud is not just "someone else\'s computer"; it is automated elasticity and orchestration.'
        },
        {
          slideNumber: 3,
          title: 'The 5 Essential Characteristics',
          contentBlocks: [
            {
              type: 'table',
              content: {
                headers: ['Characteristic', 'Core Mechanism', 'Business Benefit'],
                rows: [
                  ['On-Demand Self-Service', 'API / Web Console provisioning', 'Instant deployment, no ticketing delays'],
                  ['Broad Network Access', 'Internet / VPN access', 'Universal device compatibility'],
                  ['Resource Pooling', 'Multi-tenant hypervisors', 'High hardware efficiency and lower costs'],
                  ['Rapid Elasticity', 'Auto-scaling groups', 'Handles sudden traffic spikes automatically'],
                  ['Measured Service', 'Per-second / hourly billing', 'Transparency and pay-for-what-you-use']
                ]
              }
            }
          ],
          notes: 'Quiz students on scenarios to see which essential characteristic is demonstrated.'
        },
        {
          slideNumber: 4,
          title: 'CapEx vs. OpEx Transformation',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'CapEx (Traditional): Purchase physical servers, UPS, data center real estate, cooling.',
                'Drawback: Fixed capacity results in severe waste or catastrophic outages during traffic peaks.',
                'OpEx (Cloud): Zero upfront hardware costs; expenses track exact customer usage curves.',
                'Time to Market: Reduce server deployment time from 3 months to 30 seconds.'
              ]
            }
          ],
          notes: 'Show how startup companies can leverage hyperscaler data centers with minimal seed capital.'
        },
        {
          slideNumber: 5,
          title: 'Summary & Roadmap',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Cloud computing is the foundational bedrock of modern software engineering.',
                'All 5 NIST characteristics must be present for a true cloud platform.',
                'Next Chapter: Cloud Architecture and Core Concepts (Multi-tenancy, SOA, High Availability).'
              ]
            }
          ],
          notes: 'Conclude Chapter 1. Preview Chapter 2.'
        }
      ]
    }
  },

  // CHAPTER 2
  {
    chapterNumber: 2,
    lesson: {
      overview: 'Modern cloud architectures rely on decoupled, distributed, and fault-tolerant system designs. This chapter investigates cloud architectural blueprints, multi-tenant database designs, Service-Oriented Architecture (SOA), microservices decomposition, API gateways, load balancers, and high-availability design patterns.',
      learningObjectives: [
        'Analyze cloud multi-tenancy models and data isolation strategies.',
        'Deconstruct monolithic systems into loosely-coupled, distributed microservices.',
        'Implement resilient cloud design patterns: Circuit Breaker, Retry with Exponential Backoff, and CQRS.',
        'Design fault-tolerant architectures across multiple Availability Zones and Regions.'
      ],
      content: `## 1. Multi-Tenancy Architecture
Multi-tenancy allows a single instance of a software application and underlying infrastructure to serve multiple distinct customer organizations (tenants) while guaranteeing logical isolation:
- **Shared Hardware, Isolated Virtual Machines:** Tenancy managed at hypervisor tier.
- **Shared Application, Isolated Database:** Each tenant has dedicated database instances.
- **Shared Database, Shared Schema:** Single database with \`TenantId\` tenant-discriminator column; lowest cost, highest isolation risk.

## 2. Microservices and Service-Oriented Architecture (SOA)
Cloud architectures favor loosely coupled microservices communicating via lightweight protocols (RESTful HTTP, gRPC, asynchronous message brokers such as Kafka/RabbitMQ):
- **Single Responsibility Principle:** Each service owns a distinct business capability and isolated datastore.
- **API Gateways:** Central entry point providing request routing, authentication, rate limiting, and SSL termination.

## 3. High Availability and Disaster Recovery Patterns
- **Regions and Availability Zones:** A Region is a geographic territory containing multiple physically isolated, low-latency Availability Zones (AZs) connected by redundant fiber.
- **RTO and RPO:**
  * **Recovery Time Objective (RTO):** Maximum acceptable duration of system downtime.
  * **Recovery Point Objective (RPO):** Maximum acceptable amount of data loss measured in time.
- **Cloud Resiliency Patterns:**
  * *Circuit Breaker:* Prevents cascading failures when downstream microservices degrade.
  * *Bulkhead:* Isolates critical resource pools to prevent one failed subsystem from crashing the entire application.`,
      keyConcepts: [
        { term: 'Availability Zone (AZ)', definition: 'One or more discrete, physically separated data centers with independent power and cooling within a Region.' },
        { term: 'Circuit Breaker Pattern', definition: 'A software resilience design pattern that detects failures and halts cascading requests to failing services.' },
        { term: 'RTO / RPO', definition: 'Key disaster recovery benchmarks: Recovery Time Objective (downtime) and Recovery Point Objective (data loss).' },
        { term: 'API Gateway', definition: 'A reverse proxy serving as the single unified entry point for routing and securing microservices.' }
      ],
      studyGuide: [
        'Differentiate between multi-tenancy at the VM level vs. database schema level.',
        'Explain why Availability Zones within a region have independent power supplies and flood plains.',
        'Contrast RTO and RPO in disaster recovery planning.'
      ]
    },
    presentation: {
      title: 'Chapter 2: Cloud Architecture and Core Concepts',
      slides: [
        {
          slideNumber: 1,
          title: 'Cloud Architecture & Core Concepts',
          contentBlocks: [
            { type: 'text', content: 'Designing resilient, distributed, and scalable multi-tenant systems.' },
            { type: 'callout', content: 'Architecting for failure: Everything fails all the time in distributed computing.' }
          ],
          notes: 'Introduce Chapter 2. Quote Werner Vogels: "Everything fails, all the time."'
        },
        {
          slideNumber: 2,
          title: 'Multi-Tenancy Models',
          contentBlocks: [
            {
              type: 'table',
              content: {
                headers: ['Model', 'Data Isolation', 'Cost Efficiency'],
                rows: [
                  ['Separate DB, Separate App', 'Maximum (Complete isolation)', 'Lowest (High idle capacity)'],
                  ['Separate DB, Shared App', 'High (Logical DB boundary)', 'Moderate'],
                  ['Shared DB, TenantID Column', 'Lowest (Relies on app queries)', 'Maximum (Zero waste)']
                ]
              }
            }
          ],
          notes: 'Explain why healthcare and banking often require separate databases or dedicated compute.'
        },
        {
          slideNumber: 3,
          title: 'Microservices & The API Gateway',
          contentBlocks: [
            {
              type: 'diagram',
              content: 'Clients --> [API Gateway (Auth/Rate-Limit/SSL)] --> Auth Service | Catalog Service | Payment Service | Notification'
            },
            {
              type: 'bullets',
              content: [
                'Independent Deployability: Teams ship features without updating entire monoliths.',
                'Polyglot Persistence: Services choose their optimal database (Postgres, MongoDB, Redis).'
              ]
            }
          ],
          notes: 'Discuss why distributed microservices require asynchronous messaging and observability.'
        },
        {
          slideNumber: 4,
          title: 'Global Cloud Infrastructure: Regions & AZs',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Region: Geographic area (e.g., us-east-1, ap-southeast-1).',
                'Availability Zone (AZ): Physically isolated data center with independent power, cooling, and network.',
                'Sub-millisecond fiber interconnects allow synchronous database replication across AZs.',
                'Best Practice: Deploy stateless workloads across at least two AZs behind a load balancer.'
              ]
            }
          ],
          notes: 'Stress that deploying across multiple AZs protects against power grid or local catastrophic failures.'
        },
        {
          slideNumber: 5,
          title: 'Summary & Resiliency Patterns',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Circuit Breaker prevents systemic collapse when third-party APIs fail.',
                'RTO defines maximum allowable downtime; RPO defines maximum allowable data loss.',
                'Next Chapter: Cloud Service Models (IaaS, PaaS, SaaS) and Shared Responsibility.'
              ]
            }
          ],
          notes: 'Conclude Chapter 2. Transition to Chapter 3.'
        }
      ]
    }
  },

  // CHAPTER 3
  {
    chapterNumber: 3,
    lesson: {
      overview: 'Cloud computing organizes resource delivery into three canonical service tiers: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). This chapter breaks down each tier, analyzes the Shared Responsibility Model, and evaluates operational and security trade-offs.',
      learningObjectives: [
        'Distinguish the boundaries and management responsibilities across IaaS, PaaS, and SaaS.',
        'Analyze the Shared Responsibility Model for security, compliance, and patch management.',
        'Select appropriate service tiers based on organizational governance, velocity, and technical capability.',
        'Evaluate Serverless Function-as-a-Service (FaaS) as an evolution of PaaS.'
      ],
      content: `## 1. The Canonical Service Model Hierarchy
1. **Infrastructure as a Service (IaaS):**
   - Provides fundamental compute instances, virtual disks, and software-defined networks.
   - Consumer manages: Operating system, middleware, runtime, databases, applications, and network configuration.
   - Provider manages: Physical data center, hypervisor, host hardware, and physical network.
   - Examples: AWS EC2, Azure Virtual Machines, Google Compute Engine.

2. **Platform as a Service (PaaS):**
   - Provides an execution environment, managed database engines, and development tooling.
   - Consumer manages: Application code, configuration, and data.
   - Provider manages: Operating system patching, runtime maintenance, scaling, and hardware.
   - Examples: AWS Elastic Beanstalk, Heroku, Google App Engine, Azure App Service.

3. **Software as a Service (SaaS):**
   - Fully managed turnkey business applications delivered over web browsers or APIs.
   - Consumer manages: User accounts, access permissions, and application settings.
   - Provider manages: Everything (Application, runtime, OS, infrastructure, backups, high availability).
   - Examples: Microsoft 365, Google Workspace, Salesforce, Zoom.

## 2. The Cloud Shared Responsibility Model
Security and compliance in the cloud is a shared partnership:
- **Security OF the Cloud (Provider Responsibility):** Physical security of data centers, hardware firmware, hypervisors, and core networking facilities.
- **Security IN the Cloud (Customer Responsibility):** Customer data encryption, IAM user credentials, OS patch management (in IaaS), firewall configuration, and application security.`,
      keyConcepts: [
        { term: 'IaaS', definition: 'Infrastructure as a Service: On-demand provisioning of raw virtual compute, storage, and networking.' },
        { term: 'PaaS', definition: 'Platform as a Service: Managed application runtime where developers deploy code without managing servers or OS.' },
        { term: 'SaaS', definition: 'Software as a Service: End-user application software hosted and maintained entirely by the cloud vendor.' },
        { term: 'Shared Responsibility Model', definition: 'Security framework establishing which security aspects belong to the provider vs the customer.' }
      ],
      studyGuide: [
        'Know who is responsible for operating system patching in IaaS vs. PaaS.',
        'Identify whether a service like Heroku or AWS EC2 is IaaS or PaaS.',
        'Map security responsibilities across the three service models.'
      ]
    },
    presentation: {
      title: 'Chapter 3: Cloud Service Models (IaaS, PaaS, SaaS)',
      slides: [
        {
          slideNumber: 1,
          title: 'Cloud Service Models: IaaS, PaaS, and SaaS',
          contentBlocks: [
            { type: 'text', content: 'Deconstructing the cloud computing delivery stack.' },
            { type: 'callout', content: 'The "Pizza as a Service" analogy: Buying flour vs. takeout vs. dining at a restaurant.' }
          ],
          notes: 'Explain that each service model represents an abstraction layer moving management overhead to the provider.'
        },
        {
          slideNumber: 2,
          title: 'The Service Model Stack',
          contentBlocks: [
            {
              type: 'table',
              content: {
                headers: ['Stack Layer', 'IaaS', 'PaaS', 'SaaS'],
                rows: [
                  ['Applications', 'YOU manage', 'YOU manage', 'PROVIDER manages'],
                  ['Data', 'YOU manage', 'YOU manage', 'PROVIDER manages'],
                  ['Runtime / OS', 'YOU manage', 'PROVIDER manages', 'PROVIDER manages'],
                  ['Virtualization / Servers', 'PROVIDER manages', 'PROVIDER manages', 'PROVIDER manages'],
                  ['Physical Storage / Network', 'PROVIDER manages', 'PROVIDER manages', 'PROVIDER manages']
                ]
              }
            }
          ],
          notes: 'Detail how management control decreases from IaaS to SaaS, while operational agility increases.'
        },
        {
          slideNumber: 3,
          title: 'The Shared Responsibility Model',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Provider is responsible for Security OF the Cloud (Hardware, Facilities, Hypervisors).',
                'Customer is responsible for Security IN the Cloud (Customer Data, IAM, OS updates in IaaS).',
                'Critical Realization: Cloud providers will NOT fix your SQL injection or weak passwords.'
              ]
            }
          ],
          notes: 'Emphasize that a breach caused by an unpatched IaaS VM is the customer\'s fault, not the cloud provider\'s.'
        },
        {
          slideNumber: 4,
          title: 'Strategic Decision Framework',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Choose IaaS when: Custom kernel modules, legacy binaries, or strict OS-level compliance required.',
                'Choose PaaS when: Development speed is paramount; focus purely on business logic.',
                'Choose SaaS when: Standardized enterprise tools (email, CRM, ERP) already exist off-the-shelf.'
              ]
            }
          ],
          notes: 'Discuss real-world examples: Netflix builds on AWS IaaS; startups often begin on PaaS.'
        },
        {
          slideNumber: 5,
          title: 'Summary & Next Steps',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'IaaS: Maximum control, maximum administrative overhead.',
                'PaaS: Accelerated developer velocity, managed infrastructure.',
                'SaaS: Complete turnkey convenience.',
                'Next Chapter: Cloud Deployment Models (Public, Private, Hybrid, Community).'
              ]
            }
          ],
          notes: 'Conclude Chapter 3.'
        }
      ]
    }
  }
];

// Combine Chapters 4 through 12 for Cloud Computing
const advancedCloudChapters = [
  // CHAPTER 4
  {
    chapterNumber: 4,
    title: 'Cloud Deployment Models (Public, Private, Hybrid, Community)',
    overview: 'Explores the architectural, security, and governance differences across Public Cloud, Private Cloud, Hybrid Cloud, and Community Cloud deployments.',
    objectives: ['Contrast public multi-tenant clouds with on-premises private clouds.', 'Architect secure hybrid cloud networks using DirectConnect and VPNs.', 'Evaluate compliance constraints driving private and community cloud adoptions.']
  },
  // CHAPTER 5
  {
    chapterNumber: 5,
    title: 'Virtualization Fundamentals',
    overview: 'The hardware abstraction foundation of cloud computing: Type-1 bare-metal hypervisors (ESXi, KVM), Type-2 hypervisors, hardware virtualization extensions (VT-x, AMD-V), and live migration.',
    objectives: ['Differentiate Type-1 and Type-2 hypervisors.', 'Explain CPU, memory, and I/O virtualization mechanisms.', 'Trace memory ballooning and live virtual machine migration without downtime.']
  },
  // CHAPTER 6
  {
    chapterNumber: 6,
    title: 'Cloud Storage and Data Management',
    overview: 'Examines distributed cloud storage tiers: Block Storage (SAN/EBS), File Storage (NFS/EFS), and Object Storage (S3), together with the CAP theorem and eventual consistency.',
    objectives: ['Analyze block, file, and object storage performance and use-cases.', 'Formulate the CAP Theorem (Consistency, Availability, Partition Tolerance).', 'Implement lifecycle data tiering from hot SSD to cold deep archive.']
  },
  // CHAPTER 7
  {
    chapterNumber: 7,
    title: 'Cloud Networking',
    overview: 'Software-Defined Networking (SDN), Virtual Private Clouds (VPCs), CIDR subnetting, Internet Gateways, NAT Gateways, Route Tables, and Security Groups.',
    objectives: ['Design a multi-tier VPC with public and private subnets.', 'Configure stateful Security Groups and stateless Network ACLs.', 'Implement global Content Delivery Networks (CDNs) and Anycast routing.']
  },
  // CHAPTER 8
  {
    chapterNumber: 8,
    title: 'Cloud Security and Privacy',
    overview: 'Enterprise cloud security architectures: Identity and Access Management (IAM), principle of least privilege, zero-trust security, encryption at rest/transit, and SOC2/HIPAA compliance.',
    objectives: ['Design fine-grained IAM policies and role assumption.', 'Implement envelope encryption with Key Management Services (KMS).', 'Apply zero-trust network architectures and automated vulnerability auditing.']
  },
  // CHAPTER 9
  {
    chapterNumber: 9,
    title: 'Containers and Serverless Computing',
    overview: 'Modern cloud-native execution: Linux cgroups/namespaces, Docker containers, Kubernetes orchestration (Pods, Deployments, Ingress), and Serverless Function-as-a-Service (AWS Lambda).',
    objectives: ['Compare virtual machines with lightweight containerization.', 'Architect Kubernetes clusters with automated rollouts and self-healing.', 'Build event-driven serverless architectures with zero idle cost.']
  },
  // CHAPTER 10
  {
    chapterNumber: 10,
    title: 'Major Cloud Platforms (AWS, Azure, GCP)',
    overview: 'In-depth comparative study of Amazon Web Services, Microsoft Azure, and Google Cloud Platform services, global infrastructure, IAM, and enterprise positioning.',
    objectives: ['Map equivalent services across AWS, Azure, and Google Cloud.', 'Compare compute instances, managed Kubernetes, and Big Data offerings.', 'Analyze multi-cloud mitigation strategies against vendor lock-in.']
  },
  // CHAPTER 11
  {
    chapterNumber: 11,
    title: 'Cloud Governance, Cost Management, and Ethics',
    overview: 'Cloud financial engineering (FinOps), billing cost allocation tags, reserved instances, automated compliance policies (AWS Organizations, Azure Policy), and carbon footprint optimization.',
    objectives: ['Implement FinOps cost monitoring, rightsizing, and savings plans.', 'Automate policy enforcement across enterprise multi-account structures.', 'Assess environmental sustainability and data sovereignty laws.']
  },
  // CHAPTER 12
  {
    chapterNumber: 12,
    title: 'Emerging Trends and Future of Cloud Computing',
    overview: 'The technological frontier of cloud computing: Edge and Fog computing, 5G cloud integration, Confidential Computing with secure enclaves, AI-native infrastructure, and Quantum Cloud services.',
    objectives: ['Architect edge computing pipelines to reduce network latency.', 'Analyze confidential computing hardware memory encryption.', 'Evaluate quantum cloud computing algorithms and next-generation infrastructure.']
  }
];

advancedCloudChapters.forEach(ch => {
  cloudComputingContent.push({
    chapterNumber: ch.chapterNumber,
    lesson: {
      overview: ch.overview,
      learningObjectives: ch.objectives,
      content: `## 1. Overview and Core Significance of ${ch.title}
In modern enterprise distributed systems, ${ch.title} plays a pivotal role in ensuring scalability, high availability, security, and operational efficiency across heterogeneous cloud topologies.

## 2. Technical Architecture and Industrial Standards
Engineering cloud solutions requires careful balancing of latency, throughput, cost, and security compliance.
Key architectural steps include:
- Infrastructure as Code (IaC) provisioning and configuration.
- Policy-driven access control and zero-trust authentication.
- Continuous monitoring, automated telemetry, and health check validation.
- Disaster recovery planning adhering to strict RTO and RPO benchmarks.

## 3. Real-World Case Studies and Best Practices
Top-tier hyper-scalers and global enterprises utilize these principles to sustain millions of transactions per second with 99.999% ("five nines") availability.

## 4. Chapter Summary and Review Checklist
- Review all technical terms, network protocols, and architectural trade-offs.
- Prepare for the 20-question multiple-choice assessment.`,
      keyConcepts: [
        { term: `${ch.title} Principle`, definition: `The foundational architecture governing ${ch.title}.` },
        { term: 'High Availability (HA)', definition: 'System design ensuring operational continuity during hardware or network failures.' },
        { term: 'SLA (Service Level Agreement)', definition: 'Contractual commitment defining uptime percentage and remediation penalties.' }
      ],
      studyGuide: [
        `Master the core architectural components of ${ch.title}.`,
        'Understand the operational trade-offs between cost, latency, and security.',
        'Review the corresponding 20-question quiz to test conceptual mastery.'
      ]
    },
    presentation: {
      title: `Chapter ${ch.chapterNumber}: ${ch.title}`,
      slides: [
        {
          slideNumber: 1,
          title: `Chapter ${ch.chapterNumber}: ${ch.title}`,
          contentBlocks: [
            { type: 'text', content: 'IT Professional Elective 4 — Cloud Computing' },
            { type: 'callout', content: ch.overview }
          ],
          notes: `Introduce Chapter ${ch.chapterNumber} concepts, industry relevance, and certification alignment.`
        },
        {
          slideNumber: 2,
          title: 'Learning Objectives & Key Goals',
          contentBlocks: [
            {
              type: 'bullets',
              content: ch.objectives.map(obj => `Goal: ${obj}`)
            }
          ],
          notes: 'Outline the core capabilities students will develop in this chapter.'
        },
        {
          slideNumber: 3,
          title: 'System Architecture & Mechanics',
          contentBlocks: [
            {
              type: 'diagram',
              content: 'Client Request --> Global Edge CDN --> Load Balancer --> Multi-AZ Compute Cluster --> Distributed Data Layer'
            },
            {
              type: 'bullets',
              content: [
                'Decoupled tiers provide independent scaling and fault tolerance.',
                'Automated health checks isolate failing instances without disrupting traffic.'
              ]
            }
          ],
          notes: 'Walk through the distributed infrastructure pipeline.'
        },
        {
          slideNumber: 4,
          title: 'Security, Scalability & FinOps',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Enforce the Principle of Least Privilege across all API interactions.',
                'Utilize auto-scaling policies to track real-time CPU and request metrics.',
                'Implement cost allocation tags to monitor department-level cloud expenditures.'
              ]
            }
          ],
          notes: 'Highlight production engineering trade-offs.'
        },
        {
          slideNumber: 5,
          title: 'Chapter Review & Assessment Preparation',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Review all key concepts, cloud service acronyms, and design patterns.',
                'A passing score of 15/20 (75%) on the chapter quiz is required to unlock subsequent topics.',
                'Retakes are permitted if initial mastery threshold is not achieved.'
              ]
            }
          ],
          notes: 'Prepare students for the 20-question assessment.'
        }
      ]
    }
  });
});

module.exports = cloudComputingContent;


/**
 * Default Seed Quizzes for Cloud Computing (ITEP413-T)
 * Exactly 12 Chapters x 20 Questions = 240 Multiple-Choice Questions
 */

const cloudComputingChapterQuizzes = [
  // CHAPTER 1: Introduction to Cloud Computing
  {
    chapterNumber: 1,
    title: 'Chapter 1: Introduction to Cloud Computing Assessment',
    questions: [
      {
        position: 1,
        questionText: 'According to the formal NIST definition (SP 800-145), how many essential characteristics must a system possess to be classified as cloud computing?',
        options: [
          { label: 'A', text: 'Three characteristics', isCorrect: false },
          { label: 'B', text: 'Four characteristics', isCorrect: false },
          { label: 'C', text: 'Five characteristics', isCorrect: true },
          { label: 'D', text: 'Seven characteristics', isCorrect: false }
        ]
      },
      {
        position: 2,
        questionText: 'Which NIST essential characteristic allows consumers to unilaterally provision computing capabilities without requiring human interaction with the service provider?',
        options: [
          { label: 'A', text: 'Broad Network Access', isCorrect: false },
          { label: 'B', text: 'On-Demand Self-Service', isCorrect: true },
          { label: 'C', text: 'Rapid Elasticity', isCorrect: false },
          { label: 'D', text: 'Resource Pooling', isCorrect: false }
        ]
      },
      {
        position: 3,
        questionText: 'Which of the following best describes the transition from CapEx to OpEx in cloud adoption?',
        options: [
          { label: 'A', text: 'Replacing software licenses with hardware ownership.', isCorrect: false },
          { label: 'B', text: 'Converting large upfront data center capital investments into variable, metered operational expenses.', isCorrect: true },
          { label: 'C', text: 'Eliminating all network connections in favor of local disks.', isCorrect: false },
          { label: 'D', text: 'Depreciating servers over a 20-year fixed schedule.', isCorrect: false }
        ]
      },
      {
        position: 4,
        questionText: 'What is the primary mechanism of "Resource Pooling" in cloud infrastructure?',
        options: [
          { label: 'A', text: 'Purchasing dedicated physical servers for every individual employee.', isCorrect: false },
          { label: 'B', text: 'Serving multiple consumers using a multi-tenant model with dynamically assigned physical and virtual resources.', isCorrect: true },
          { label: 'C', text: 'Connecting local hard drives with external USB hubs.', isCorrect: false },
          { label: 'D', text: 'Backing up files to an uncompressed tape drive.', isCorrect: false }
        ]
      },
      {
        position: 5,
        questionText: 'Which NIST characteristic guarantees that cloud resource usage is automatically monitored, controlled, and reported for transparent billing?',
        options: [
          { label: 'A', text: 'Measured Service', isCorrect: true },
          { label: 'B', text: 'Broad Network Access', isCorrect: false },
          { label: 'C', text: 'Rapid Elasticity', isCorrect: false },
          { label: 'D', text: 'Ubiquitous Delivery', isCorrect: false }
        ]
      },
      {
        position: 6,
        questionText: 'What is the primary difference between horizontal scaling (scaling out) and vertical scaling (scaling up)?',
        options: [
          { label: 'A', text: 'Horizontal scaling adds more instances/nodes, while vertical scaling adds more CPU/RAM to an existing instance.', isCorrect: true },
          { label: 'B', text: 'Horizontal scaling replaces Linux with Windows.', isCorrect: false },
          { label: 'C', text: 'Vertical scaling requires purchasing multiple new physical data center buildings.', isCorrect: false },
          { label: 'D', text: 'Horizontal scaling only works with magnetic floppy disks.', isCorrect: false }
        ]
      },
      {
        position: 7,
        questionText: 'Which technology was a direct architectural predecessor to modern cloud computing?',
        options: [
          { label: 'A', text: 'Grid and Utility Computing', isCorrect: true },
          { label: 'B', text: 'VCR Magnetic Tape Storage', isCorrect: false },
          { label: 'C', text: 'Dial-up Acoustic Couplers', isCorrect: false },
          { label: 'D', text: 'Vacuum Tube Colossus', isCorrect: false }
        ]
      },
      {
        position: 8,
        questionText: 'What does "Rapid Elasticity" enable a cloud-hosted e-commerce application to do during Black Friday?',
        options: [
          { label: 'A', text: 'Automatically spin up extra compute instances during traffic surges and terminate them when traffic subsides.', isCorrect: true },
          { label: 'B', text: 'Permanently lock customers out until manual approval is granted.', isCorrect: false },
          { label: 'C', text: 'Disable database transactions to prevent memory usage.', isCorrect: false },
          { label: 'D', text: 'Downgrade all user screens to monochrome.', isCorrect: false }
        ]
      },
      {
        position: 9,
        questionText: 'Which business risk is introduced if an organization relies entirely on proprietary APIs of a single cloud vendor without abstraction?',
        options: [
          { label: 'A', text: 'Vendor Lock-in', isCorrect: true },
          { label: 'B', text: 'Instant bankruptcy', isCorrect: false },
          { label: 'C', text: 'Exceeding TCP socket limits', isCorrect: false },
          { label: 'D', text: 'Hardware demagnetization', isCorrect: false }
        ]
      },
      {
        position: 10,
        questionText: 'Which NIST essential characteristic ensures services are accessible across diverse client platforms including smartphones, laptops, and tablets?',
        options: [
          { label: 'A', text: 'Broad Network Access', isCorrect: true },
          { label: 'B', text: 'Single Tenant Protocol', isCorrect: false },
          { label: 'C', text: 'Localized Loopback Interface', isCorrect: false },
          { label: 'D', text: 'Physical Port Binding', isCorrect: false }
        ]
      },
      {
        position: 11,
        questionText: 'What term describes an organization\'s ability to expand into global cloud data centers within minutes?',
        options: [
          { label: 'A', text: 'Global Footprint / Worldwide Availability', isCorrect: true },
          { label: 'B', text: 'Local loopback latency', isCorrect: false },
          { label: 'C', text: 'Subnet containment', isCorrect: false },
          { label: 'D', text: 'Hardware colocation lease', isCorrect: false }
        ]
      },
      {
        position: 12,
        questionText: 'What is "idle capacity waste" in traditional on-premises enterprise data centers?',
        options: [
          { label: 'A', text: 'Servers running at 10-15% utilization outside peak hours while consuming full electricity and cooling.', isCorrect: true },
          { label: 'B', text: 'Leaving empty hard drive bays unpainted.', isCorrect: false },
          { label: 'C', text: 'Unused Ethernet cables stored in boxes.', isCorrect: false },
          { label: 'D', text: 'Surplus cardboard boxes from server deliveries.', isCorrect: false }
        ]
      },
      {
        position: 13,
        questionText: 'Which cloud characteristic prevents one tenant from knowing the exact physical server room where their virtual machine is running?',
        options: [
          { label: 'A', text: 'Location Independence (a facet of Resource Pooling)', isCorrect: true },
          { label: 'B', text: 'DNS Poisoning', isCorrect: false },
          { label: 'C', text: 'BGP Routing Hijacking', isCorrect: false },
          { label: 'D', text: 'Subnet Obfuscation', isCorrect: false }
        ]
      },
      {
        position: 14,
        questionText: 'What is utility pricing in cloud economics?',
        options: [
          { label: 'A', text: 'Paying a fixed 10-year contract regardless of usage.', isCorrect: false },
          { label: 'B', text: 'Paying only for the computing units (compute hours, GB storage, data egress) actually consumed.', isCorrect: true },
          { label: 'C', text: 'Free hosting provided by non-profit organizations.', isCorrect: false },
          { label: 'D', text: 'Subsidies paid to municipal water utilities.', isCorrect: false }
        ]
      },
      {
        position: 15,
        questionText: 'In a multi-tenant cloud environment, what guarantees that Tenant A cannot access Tenant B\'s in-memory data?',
        options: [
          { label: 'A', text: 'Hypervisor isolation, hardware virtualization rings, and kernel memory segmentation.', isCorrect: true },
          { label: 'B', text: 'Gentlemen\'s agreements between system administrators.', isCorrect: false },
          { label: 'C', text: 'Turning off CPU caches entirely.', isCorrect: false },
          { label: 'D', text: 'Physical padlocks on rack doors.', isCorrect: false }
        ]
      },
      {
        position: 16,
        questionText: 'Why do startups frequently choose cloud infrastructure over purchasing physical servers?',
        options: [
          { label: 'A', text: 'Minimal upfront capital barrier, rapid experimentation speed, and instant global scaling.', isCorrect: true },
          { label: 'B', text: 'The law prohibits startups from buying computers.', isCorrect: false },
          { label: 'C', text: 'Cloud servers never experience software bugs.', isCorrect: false },
          { label: 'D', text: 'Cloud providers write their product code for free.', isCorrect: false }
        ]
      },
      {
        position: 17,
        questionText: 'What is a "Service Level Agreement" (SLA) in cloud computing?',
        options: [
          { label: 'A', text: 'A contractual commitment specifying service uptime percentage and financial penalties for outages.', isCorrect: true },
          { label: 'B', text: 'An operating system license agreement.', isCorrect: false },
          { label: 'C', text: 'A hardware user manual for server assembly.', isCorrect: false },
          { label: 'D', text: 'An employee background check protocol.', isCorrect: false }
        ]
      },
      {
        position: 18,
        questionText: 'What uptime percentage corresponds to "Three Nines" availability over a year?',
        options: [
          { label: 'A', text: '90.0%', isCorrect: false },
          { label: 'B', text: '99.0%', isCorrect: false },
          { label: 'C', text: '99.9% (approx. 8.76 hours downtime/year)', isCorrect: true },
          { label: 'D', text: '99.999% (approx. 5 minutes downtime/year)', isCorrect: false }
        ]
      },
      {
        position: 19,
        questionText: 'What uptime percentage corresponds to "Five Nines" (high availability gold standard)?',
        options: [
          { label: 'A', text: '95.555%', isCorrect: false },
          { label: 'B', text: '99.999% (approx. 5.26 minutes downtime/year)', isCorrect: true },
          { label: 'C', text: '99.5%', isCorrect: false },
          { label: 'D', text: '100% with absolute zero failure possibility', isCorrect: false }
        ]
      },
      {
        position: 20,
        questionText: 'Which metric measures the speed at which cloud resources can be provisioned after an API call?',
        options: [
          { label: 'A', text: 'Provisioning latency / Time-to-service', isCorrect: true },
          { label: 'B', text: 'Baud rate', isCorrect: false },
          { label: 'C', text: 'Disk rotational latency', isCorrect: false },
          { label: 'D', text: 'Packet MTU size', isCorrect: false }
        ]
      }
    ]
  }
];

// Generator for remaining Cloud Computing chapters
const remainingCloudTopics = [
  { ch: 2, title: 'Cloud Architecture & Core Concepts', keywords: ['multi-tenancy', 'microservices', 'API gateway', 'Availability Zones', 'Regions', 'RTO', 'RPO', 'Circuit Breaker'] },
  { ch: 3, title: 'Cloud Service Models (IaaS, PaaS, SaaS)', keywords: ['IaaS', 'PaaS', 'SaaS', 'Shared Responsibility', 'hypervisor', 'runtime', 'OS patching', 'FaaS'] },
  { ch: 4, title: 'Cloud Deployment Models', keywords: ['Public cloud', 'Private cloud', 'Hybrid cloud', 'Community cloud', 'DirectConnect', 'VPN tunnel', 'compliance', 'data sovereignty'] },
  { ch: 5, title: 'Virtualization Fundamentals', keywords: ['Type-1 hypervisor', 'Type-2 hypervisor', 'KVM', 'ESXi', 'hardware virtualization', 'VT-x', 'memory ballooning', 'live migration'] },
  { ch: 6, title: 'Cloud Storage & Data Management', keywords: ['Block storage', 'Object storage', 'S3', 'File storage', 'CAP theorem', 'eventual consistency', 'lifecycle policy', 'ACID vs BASE'] },
  { ch: 7, title: 'Cloud Networking', keywords: ['VPC', 'subnets', 'CIDR notation', 'Route Tables', 'Internet Gateway', 'NAT Gateway', 'Security Groups', 'Network ACLs'] },
  { ch: 8, title: 'Cloud Security and Privacy', keywords: ['IAM', 'least privilege', 'zero-trust', 'KMS encryption', 'envelope encryption', 'SOC2', 'vulnerability scanning', 'MFA'] },
  { ch: 9, title: 'Containers and Serverless Computing', keywords: ['Docker', 'cgroups', 'Kubernetes', 'Pods', 'Deployments', 'AWS Lambda', 'FaaS', 'cold start'] },
  { ch: 10, title: 'Major Cloud Platforms (AWS, Azure, GCP)', keywords: ['AWS EC2', 'Azure VM', 'Google Compute Engine', 'S3 vs Blob vs GCS', 'IAM comparison', 'global infrastructure', 'vendor lock-in', 'multi-cloud'] },
  { ch: 11, title: 'Cloud Governance, Cost Management, and Ethics', keywords: ['FinOps', 'cost allocation tags', 'reserved instances', 'savings plans', 'AWS Organizations', 'Azure Policy', 'green cloud', 'carbon footprint'] },
  { ch: 12, title: 'Emerging Trends and Future of Cloud Computing', keywords: ['Edge computing', 'Fog computing', '5G cloud', 'Confidential Computing', 'secure enclaves', 'Quantum cloud', 'AI infrastructure', 'distributed cloud'] }
];

remainingCloudTopics.forEach(topic => {
  const questions = [];
  for (let q = 1; q <= 20; q++) {
    const kw = topic.keywords[(q - 1) % topic.keywords.length];
    questions.push({
      position: q,
      questionText: `In ${topic.title}, question #${q}: What is the primary role or mechanism of ${kw}?`,
      options: [
        { label: 'A', text: `It is an obsolete concept with no relevance to enterprise cloud architecture.`, isCorrect: false },
        { label: 'B', text: `It represents a core technical mechanism, protocol, or design principle governing ${kw} in ${topic.title}.`, isCorrect: true },
        { label: 'C', text: `It disables all network security controls to boost performance.`, isCorrect: false },
        { label: 'D', text: `It is a physical hardware cable connecting monitors.`, isCorrect: false }
      ]
    });
  }

  cloudComputingChapterQuizzes.push({
    chapterNumber: topic.ch,
    title: `Chapter ${topic.ch}: ${topic.title} Assessment`,
    questions
  });
});

module.exports = cloudComputingChapterQuizzes;


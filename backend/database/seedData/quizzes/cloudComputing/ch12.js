/**
 * Chapter 12 Quiz (cloudComputing)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 12,
  "title": "Chapter 12: Emerging Trends and Future of Cloud Computing Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "What fundamental architectural shift defines \"Edge Computing\" in the modern cloud-to-edge continuum?",
      "options": [
        {
          "label": "A",
          "text": "Storing database backups on external USB flash drives.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Eliminating all software encryption.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Processing and analyzing data locally near the physical edge where it is generated (e.g., IoT sensors, factories, autonomous vehicles) to minimize network latency and bandwidth consumption.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Moving all cloud servers to coastal regions near the ocean.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "How does \"Fog Computing\" differ from both centralized Cloud Computing and decentralized Edge Computing?",
      "options": [
        {
          "label": "A",
          "text": "Fog computing acts as an intermediate architectural layer situated between edge devices and the centralized cloud, performing localized aggregation, filtering, and pre-processing on regional gateways.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Fog computing requires liquid nitrogen cooling.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Fog computing operates only when weather visibility is low.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Fog computing is used exclusively for military aircraft.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "What 5G telecommunications capability enables cloud service providers and telecom operators to deliver sub-10ms latency for autonomous vehicles and smart robotics?",
      "options": [
        {
          "label": "A",
          "text": "Replacing fiber optic cables with copper telephone lines.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Dial-up acoustic modems.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Multi-Access Edge Computing (MEC) combined with Ultra-Reliable Low-Latency Communication (URLLC) and network slicing.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Converting 5G towers into Wi-Fi routers.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "What is the primary breakthrough capability provided by \"Confidential Computing\"?",
      "options": [
        {
          "label": "A",
          "text": "Protecting data \"in use\" (while active in CPU registers and RAM memory) using hardware-based Trusted Execution Environments (TEEs) / Secure Enclaves, preventing even the hypervisor, OS, or cloud provider admins from accessing it.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Encrypting data only after it has been deleted.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Requiring biometric fingerprint scans to view website URLs.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Hiding cloud bills from the accounting department.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "Which hardware technologies implement hardware-level Trusted Execution Environments (TEEs) for Confidential Computing?",
      "options": [
        {
          "label": "A",
          "text": "Intel SGX (Software Guard Extensions), AMD SEV (Secure Encrypted Virtualization), and AWS Nitro Enclaves",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Ethernet RJ-45 connectors",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "SATA hard drive controllers",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Standard VGA graphics cards",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "What is \"Quantum Cloud Computing\" (such as Amazon Braket, IBM Quantum, or Azure Quantum)?",
      "options": [
        {
          "label": "A",
          "text": "A marketing term for very fast traditional Intel servers.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Cloud-accessible quantum hardware platforms that allow researchers and developers to design, simulate, and execute quantum algorithms on real quantum processors (QPUs) using qubits, superposition, and entanglement.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A cloud service that predicts future stock prices with 100% certainty.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "An operating system that runs in zero gravity.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "What is the primary computational unit in quantum computing that can exist in a superposition of states |0⟩ and |1⟩ simultaneously, unlike classical binary bits?",
      "options": [
        {
          "label": "A",
          "text": "A Transistor gate",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A Floating-point register",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A Byte",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A Qubit (Quantum Bit)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 8,
      "questionText": "What specialized hardware accelerator chips are engineered into modern cloud AI clusters to train trillion-parameter Large Language Models (LLMs)?",
      "options": [
        {
          "label": "A",
          "text": "Legacy dial-up modem DSP chips.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "High-bandwidth Tensor Processing Units (TPUs) and specialized AI GPUs (such as NVIDIA H100/B200) interconnected with ultra-fast interconnects (NVLink, InfiniBand).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Standard 8-bit microcontrollers used in microwave ovens.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Floppy disk drive stepper motors.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "What is \"Serverless WebAssembly\" (Wasm) at the Edge (such as Cloudflare Workers or Fastly Compute@Edge)?",
      "options": [
        {
          "label": "A",
          "text": "A secure, sandboxed, high-performance binary code format that executes functions at global edge locations with sub-millisecond cold starts and negligible memory footprints, bypassing traditional container overhead.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "An extension that blocks ads in web browsers.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A programming language designed exclusively for 3D video games.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A protocol for sending emails without internet access.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What is \"Decentralized Cloud Storage\" (such as IPFS, Filecoin, or Arweave)?",
      "options": [
        {
          "label": "A",
          "text": "A backup tape stored in a bank safe deposit box.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Deleting all database records to save space.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A peer-to-peer network where data is cryptographically content-addressed, sharded, and stored redundantly across thousands of independent nodes worldwide rather than in centralized corporate data centers.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A single hard drive shared by multiple employees.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "In decentralized storage, what is \"Content Addressing\" (as used in IPFS) compared to traditional Location Addressing (URLs)?",
      "options": [
        {
          "label": "A",
          "text": "Data is retrieved based on a cryptographic hash of its actual content (Content Identifier / CID) regardless of where it is physically hosted, rather than by IP address or DNS domain location.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "All files are saved under the filename \"index.html\".",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Files are named using Roman numerals.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Data is organized by the home address of the user who uploaded it.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "What is \"Autonomous Cloud Infrastructure\" (AIOps / Self-Healing Cloud)?",
      "options": [
        {
          "label": "A",
          "text": "Self-driving delivery vans that transport computer parts.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Servers that run without electricity.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A robot that replaces mechanical hard drives in server racks.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Leveraging machine learning algorithms to continuously analyze telemetry metrics, detect anomalies, predict component failures, and automatically execute remediation workflows without human intervention.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 13,
      "questionText": "What is \"Neuromorphic Computing\" in next-generation cloud AI hardware research?",
      "options": [
        {
          "label": "A",
          "text": "A psychological therapy technique for programmers.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Connecting human brains directly to Ethernet cables.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Writing software using voice commands.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Silicon processors designed to physically mimic the architecture of biological human brains (using artificial spiking neurons and synapses) to process sensory data with ultra-low power consumption.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What is \"Space-Based Cloud Computing\" (such as satellite edge computing projects by AWS, Microsoft Azure Space, and Starlink)?",
      "options": [
        {
          "label": "A",
          "text": "Pressing the spacebar key on a keyboard to reboot a server.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Deploying edge compute servers and satellite constellations in Low Earth Orbit (LEO) to process earth observation data, remote sensing, and communications directly in space before transmitting to ground stations.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Deleting empty space on hard drives.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A science fiction movie about computers.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "What is \"Post-Quantum Cryptography\" (PQC) and why are cloud providers currently implementing it across their networks?",
      "options": [
        {
          "label": "A",
          "text": "A protocol that completely eliminates passwords.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Cryptography that can only be understood by quantum physicists.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Cryptographic algorithms (such as lattice-based cryptography) mathematically resistant to attacks by future fault-tolerant quantum computers running Shor's algorithm (which breaks RSA and ECC).",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Encrypting data using sunlight.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "What is the \"Harvest Now, Decrypt Later\" threat that drives early adoption of Post-Quantum Cryptography in cloud communications?",
      "options": [
        {
          "label": "A",
          "text": "A malware attack that locks computer monitors.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Deleting backup logs before audits.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Agricultural automation software collecting crop data.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Adversaries intercepting and storing encrypted high-value sensitive data today, intending to decrypt it years in the future when sufficiently powerful quantum computers become available.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 17,
      "questionText": "What is \"Composable Infrastructure\" (Disaggregated Cloud Data Centers)?",
      "options": [
        {
          "label": "A",
          "text": "Writing software using multiple programming languages.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A data center built inside an old shipping container.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Decoupling physical compute, storage, GPU accelerators, and memory into independent pools interconnected by ultra-fast PCIe/CXL fabrics, dynamically assembled by software to match precise workload needs.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Building computers using LEGO bricks.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What role does the Compute Express Link (CXL) open standard play in future cloud hardware architectures?",
      "options": [
        {
          "label": "A",
          "text": "An optical cable used exclusively for home televisions.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A protocol for sending text messages.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A high-speed interconnect standard enabling cache-coherent memory sharing and pooling between host CPUs, GPUs, and memory expansion devices over PCIe Gen 5/6.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A replacement for HTML web links.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What is \"Data Clean Rooms\" technology in modern multi-cloud collaborative analytics?",
      "options": [
        {
          "label": "A",
          "text": "A physical cleanroom in a silicon chip manufacturing foundry.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Secure multi-party computing environments where multiple organizations can collaboratively analyze combined datasets (e.g., ad targeting or healthcare) without exposing raw underlying personal data to each other.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A janitorial service that vacuums data center server rooms.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A software program that deletes temporary browser cookies.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "What is the expected long-term impact of \"Distributed Cloud\" (where cloud services run in multiple physical locations managed centrally by the public cloud provider)?",
      "options": [
        {
          "label": "A",
          "text": "The internet will be replaced by satellite radio.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "All personal computers will be banned by law.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The boundaries between on-premises data centers, telecom edge networks, branch offices, and public cloud regions dissolve into a single unified, provider-managed operational continuum.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "The complete elimination of all software engineers.",
          "isCorrect": false
        }
      ]
    }
  ]
};

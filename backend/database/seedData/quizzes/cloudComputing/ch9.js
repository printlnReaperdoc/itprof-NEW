/**
 * Chapter 9 Quiz (cloudComputing)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 9,
  "title": "Chapter 9: Containers and Serverless Computing Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "What fundamental architectural difference distinguishes OS-level Containers (such as Docker) from traditional Hardware Virtual Machines (VMs)?",
      "options": [
        {
          "label": "A",
          "text": "Containers can only execute programs written in the C language.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Virtual machines boot up in 10 milliseconds, while containers take 10 minutes.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Containers require physical server hardware for each individual application.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Containers share the host operating system kernel and isolate user spaces using Linux kernel primitives, whereas VMs each run a complete, independent guest operating system atop a hypervisor.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 2,
      "questionText": "Which two core Linux kernel technologies form the foundational building blocks of container isolation and resource limitation?",
      "options": [
        {
          "label": "A",
          "text": "FAT32 and NTFS file systems.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Namespaces (for process, network, and mount isolation) and Control Groups / cgroups (for CPU, memory, and I/O resource limiting).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "DirectX and OpenGL drivers.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "BGP routing tables and ARP cache.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "What type of filesystem allows Docker to build images as a stack of immutable, read-only layers with a single writable container layer on top?",
      "options": [
        {
          "label": "A",
          "text": "ISO 9660 CD-ROM filesystem",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "ExFAT",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Union File System (such as OverlayFS or AUFS) using Copy-on-Write (CoW)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Swap partition",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "In a Dockerfile, what is the primary benefit of using a \"Multi-Stage Build\"?",
      "options": [
        {
          "label": "A",
          "text": "It runs the container on multiple physical computers simultaneously.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It separates build-time dependencies (compilers, SDKs, dev tools) from the final runtime container, resulting in vastly smaller, more secure production images containing only compiled binaries and runtime artifacts.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "It eliminates the need for a Docker daemon.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It converts Docker images into virtual machine OVA files.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "In Dockerfile syntax, how does the ENTRYPOINT instruction differ fundamentally from the CMD instruction?",
      "options": [
        {
          "label": "A",
          "text": "ENTRYPOINT defines the immutable executable command to run when the container starts, whereas CMD provides default arguments that can be easily overridden by command-line arguments at runtime.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "There is no difference; they are exact aliases.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "CMD runs during image build; ENTRYPOINT runs only during image push.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "ENTRYPOINT is only supported on Windows; CMD is only supported on Linux.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "What is the smallest deployable atomic computing unit in Kubernetes (K8s)?",
      "options": [
        {
          "label": "A",
          "text": "An individual Docker image layer",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A virtual machine node",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A cluster namespace",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A Pod (a group of one or more tightly coupled containers sharing network IP, storage volumes, and IPC specifications).",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 7,
      "questionText": "In the Kubernetes Control Plane architecture, what component acts as the consistent, highly-available distributed key-value store for all cluster state data and configuration?",
      "options": [
        {
          "label": "A",
          "text": "kube-scheduler",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "etcd",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "kube-proxy",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "kubelet",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "In the Kubernetes Control Plane, what is the responsibility of the \"kube-scheduler\"?",
      "options": [
        {
          "label": "A",
          "text": "Compiling Go source code into Docker images.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Shutting down worker nodes at the end of the business day.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Watching for newly created Pods with no assigned node, and selecting the optimal worker node for them to run on based on resource requirements, affinity/anti-affinity, and constraints.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Sending calendar meeting invites to developers.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "What primary agent runs on every worker node in a Kubernetes cluster to ensure containers described in PodSpecs are running and healthy?",
      "options": [
        {
          "label": "A",
          "text": "kube-apiserver",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "kubelet",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "kubectl",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "etcd",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "How does a Kubernetes \"Deployment\" controller manage rolling updates without application downtime?",
      "options": [
        {
          "label": "A",
          "text": "It creates a new ReplicaSet with updated container images, incrementally launching new Pods while terminating old Pods in a controlled sequence according to maxSurge and maxUnavailable parameters.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "It prompts website visitors to reload their browsers.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It reboots all physical servers simultaneously.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It deletes all user data and restores from last night's backup.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What is the function of a Kubernetes \"Service\" object (such as ClusterIP or LoadBalancer)?",
      "options": [
        {
          "label": "A",
          "text": "A billing invoice sent by the cloud provider.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A maintenance window scheduled for hardware repair.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "An abstract way to expose an application running on a dynamic set of ephemeral Pods as a single, stable network service with a persistent internal IP address, DNS name, and load balancing.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A technical support ticket opened with a cloud vendor.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "In Kubernetes networking, how does an \"Ingress Controller\" (e.g., NGINX Ingress or Traefik) differ from a standard NodePort service?",
      "options": [
        {
          "label": "A",
          "text": "Ingress is used exclusively for UDP video streaming.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Ingress manages external HTTP/HTTPS access to multiple cluster services using Layer 7 routing rules (based on hostnames and URL paths) with centralized SSL termination behind a single external load balancer IP.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "NodePort is a hardware cable connecting servers.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Ingress blocks all outgoing network traffic from Pods.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "What is a \"Sidecar Container\" pattern in Kubernetes Pod design?",
      "options": [
        {
          "label": "A",
          "text": "A secondary helper container running alongside the primary application container in the same Pod to enhance it with supporting functionality (such as logging agents, proxying, or metrics scraping) sharing the same network namespace.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A backup virtual machine stored on a separate cloud provider.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A mobile application installed on an engineer's phone.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A physical motorcycle used by data center technicians.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What is the \"Cold Start\" problem in Serverless Function as a Service (FaaS, such as AWS Lambda)?",
      "options": [
        {
          "label": "A",
          "text": "Servers failing to boot during freezing winter weather.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A server crash caused by liquid nitrogen cooling failure.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A function that fails to execute because the programmer forgot to type \"return\".",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The initial startup latency incurred when an invocation arrives for an idle function, requiring the cloud provider to provision a new container runtime environment, download code, and initialize runtimes before executing the function.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 15,
      "questionText": "How can developers minimize Cold Start latency in serverless architectures?",
      "options": [
        {
          "label": "A",
          "text": "Setting the function timeout to 0 milliseconds.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Using lightweight runtimes (like Go, Rust, or Node.js over heavy JVMs), minimizing package bundle sizes and imports, and utilizing Provisioned Concurrency to keep pre-initialized warm execution environments ready.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Running the function on physical mainframe computers.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Writing all function code inside an infinite loop.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "What is the maximum execution time limit for a single invocation of an AWS Lambda serverless function?",
      "options": [
        {
          "label": "A",
          "text": "15 minutes (900 seconds)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Unlimited; it can run perpetually as a background daemon.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "24 hours",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "1 minute (60 seconds)",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "Why must serverless functions adhere strictly to a \"Stateless\" design philosophy?",
      "options": [
        {
          "label": "A",
          "text": "Because serverless platforms do not have physical RAM.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Because individual execution containers are ephemeral and can be terminated, recycled, or scaled across hundreds of independent concurrent instances at any time; local in-memory or filesystem state is lost between invocations.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Because serverless functions can only execute read operations.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Because stateful applications are prohibited by international cyber laws.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What pricing model governs serverless Function as a Service (FaaS)?",
      "options": [
        {
          "label": "A",
          "text": "Billing based on the number of lines of source code written.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A fixed monthly fee of $500 per function.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Pay-per-use billed on the exact execution duration (measured in milliseconds) and configured memory capacity, with zero charge when the application is idle receiving zero traffic.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Billing based on the physical weight of server racks.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What role does an event source mapping (e.g., S3 Event Notifications or DynamoDB Streams) play in serverless architectures?",
      "options": [
        {
          "label": "A",
          "text": "It automatically invokes a designated serverless function in response to specific cloud events (such as a file upload, a database row update, or a message posted to a queue).",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "It converts JSON records into binary audio signals.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It tracks the geographical GPS location of developers.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It prints a paper receipt for every database query.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "What is a \"Container Registry\" (such as Amazon ECR, Docker Hub, or Google Artifact Registry)?",
      "options": [
        {
          "label": "A",
          "text": "A secure, scalable managed storage repository used to store, manage, version, scan for vulnerabilities, and distribute container images to deployment clusters.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A paper logbook where data center visitors sign their names.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A database that records shipping container movements at sea ports.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A desktop application used to create zip archives.",
          "isCorrect": false
        }
      ]
    }
  ]
};

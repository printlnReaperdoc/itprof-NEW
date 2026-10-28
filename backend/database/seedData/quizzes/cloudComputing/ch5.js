/**
 * Chapter 5 Quiz (cloudComputing)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 5,
  "title": "Chapter 5: Virtualization Fundamentals Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "What is a \"Type-1 (Bare-Metal)\" hypervisor in cloud infrastructure virtualization?",
      "options": [
        {
          "label": "A",
          "text": "A script that generates synthetic benchmark data.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A web browser extension for running JavaScript.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A virtualization platform that runs directly on the physical host hardware without an underlying host operating system (e.g., VMware ESXi, KVM, Microsoft Hyper-V).",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "An application software running on top of a standard desktop operating system (e.g., VirtualBox).",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "What is a \"Type-2 (Hosted)\" hypervisor?",
      "options": [
        {
          "label": "A",
          "text": "A hypervisor etched permanently onto physical motherboard ROM chips.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A hypervisor that runs as a software application on top of an existing host operating system (e.g., Oracle VirtualBox, VMware Workstation).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A hypervisor that only supports mainframe tape drives.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A hypervisor that requires zero electricity.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "Why are Type-1 bare-metal hypervisors universally preferred over Type-2 hypervisors in enterprise cloud data centers?",
      "options": [
        {
          "label": "A",
          "text": "Type-1 hypervisors are always completely open source.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Type-2 hypervisors cannot connect to the internet.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Direct hardware access provides significantly superior I/O throughput, minimal CPU virtualization overhead, lower latency, and higher security isolation without relying on a general-purpose host OS.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Type-1 hypervisors can only run on 32-bit hardware.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "What hardware virtualization CPU instruction set extensions were developed by Intel and AMD to eliminate the need for complex software binary translation?",
      "options": [
        {
          "label": "A",
          "text": "Intel VT-x (with VMX root/non-root modes) and AMD-V (SVM)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "IEEE 754 Floating Point",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "SSE4 and AVX-512",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "DirectX 12 and Vulkan",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "What is \"Paravirtualization\" (as originally implemented in early Xen architectures)?",
      "options": [
        {
          "label": "A",
          "text": "A hardware standard that replaces Ethernet cables.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A technique that requires two physical monitors.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A virtualization technique where the guest operating system kernel is explicitly modified to be aware of the underlying hypervisor and communicates via specialized software \"hypercalls\".",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Virtualizing hardware without using any CPU.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "What is \"Full Virtualization\"?",
      "options": [
        {
          "label": "A",
          "text": "Converting all text files into binary machine code.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Allocating 100% of a data center's RAM to a single user.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Deleting all virtual switches.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A technique that provides complete binary simulation/abstraction of the underlying physical hardware, allowing completely unmodified guest operating systems to execute without awareness of virtualization.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 7,
      "questionText": "What is a \"vCPU\" (virtual CPU) in modern cloud hypervisors?",
      "options": [
        {
          "label": "A",
          "text": "A time-sliced execution thread scheduled by the hypervisor onto an underlying physical CPU core or hyperthread (e.g., Intel Hyper-Threading thread).",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A software compiler for Python.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A physical processor shipped in a cardboard box.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A mathematical formula stored in a database.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "What is \"Memory Overcommitment\" in hypervisor memory management?",
      "options": [
        {
          "label": "A",
          "text": "Allocating a total amount of virtual RAM across all running virtual machines that exceeds the actual physical RAM installed in the host server, banking on the fact that not all VMs utilize their full allocation simultaneously.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Writing memory contents to an uncompressed tape drive.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Purchasing more RAM sticks than can physically fit on the motherboard.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A fatal hardware error that causes memory chips to smoke.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "How does the \"Memory Ballooning\" mechanism reclaim unused physical RAM from a virtual machine when host memory pressure occurs?",
      "options": [
        {
          "label": "A",
          "text": "A specialized balloon driver inside the guest OS requests and pins idle memory pages from the guest OS, allowing the hypervisor to reclaim and reallocate the underlying physical host frames.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "By forcing the VM to crash and restart immediately.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "By compressing the guest OS kernel with gzip.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "By filling server racks with helium gas.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What is \"Transparent Page Sharing\" (TPS) in hypervisor memory optimization?",
      "options": [
        {
          "label": "A",
          "text": "Deduplicating identical memory pages (e.g., identical OS kernel binaries across multiple VMs running the same OS) so they share a single read-only physical frame, using copy-on-write (COW) when modified.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Streaming video frames over an unencrypted Wi-Fi connection.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Allowing all users to view passwords on the screen.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Sharing social media profiles across company intranets.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What hardware technology accelerates memory address translation from Guest Virtual Address (GVA) directly to Host Physical Address (HPA)?",
      "options": [
        {
          "label": "A",
          "text": "ECC RAM Parity Checking",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "FAT32 File Allocation Tables",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Direct Memory Access (DMA) channel 4",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Extended Page Tables (EPT) in Intel / Nested Page Tables (NPT) in AMD (Two-Dimensional Paging)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 12,
      "questionText": "What is \"Live Migration\" (e.g., VMware vMotion or KVM live migration) in enterprise virtualization?",
      "options": [
        {
          "label": "A",
          "text": "Upgrading the firmware of a network switch during business hours.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Exporting a database to a CSV spreadsheet.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Moving an active, running virtual machine from one physical host server to another across a shared storage network with zero perceivable downtime or loss of network connections.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Powering off a server, moving it on a cart to a new rack, and powering it back on.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "During the iterative pre-copy phase of live migration, how does the hypervisor track memory pages modified by the VM while earlier pages were being transferred?",
      "options": [
        {
          "label": "A",
          "text": "By maintaining a \"dirty page\" tracking bitmap and iteratively transmitting modified pages in successive rounds until the remaining dirty set is small enough for a sub-second final stun/switchover.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "By restarting the guest operating system.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "By freezing the VM's CPU clock for 4 hours.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "By writing all RAM contents to DVD discs.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What is a \"Virtual Switch\" (vSwitch) in hypervisor networking?",
      "options": [
        {
          "label": "A",
          "text": "A software firewall that blocks all incoming traffic.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A physical toggle switch located on the front of a server chassis.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A software program running inside the hypervisor that switches and routes Ethernet frame traffic between virtual machines on the host and connects them to physical network interface cards (pNICs).",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A specialized optical cable for fiber channels.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "What is Single Root I/O Virtualization (SR-IOV) in high-performance cloud virtualization?",
      "options": [
        {
          "label": "A",
          "text": "An encryption protocol for Wi-Fi networks.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A software algorithm for compressing JPEG images.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A hardware specification that allows a single PCIe network device to present multiple virtual functions (VFs) directly to individual VMs, bypassing the hypervisor software switch for ultra-low latency.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A method for connecting 10 hard drives to one SATA cable.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "What security risk is known as a \"Virtual Machine Escape\" (VM Escape)?",
      "options": [
        {
          "label": "A",
          "text": "An attacker exploiting a vulnerability in the hypervisor to break out of a restricted guest virtual machine and execute arbitrary malicious code on the host operating system or access neighboring VMs.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A virtual machine shutting down unexpectedly during a power outage.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A user accidentally deleting an ISO installation image.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A virtual machine consuming more than 80% of its disk quota.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "What is \"Storage Virtualization\" in cloud data centers (such as Storage Area Networks / SAN or Software-Defined Storage)?",
      "options": [
        {
          "label": "A",
          "text": "Pooling multiple physical hard drive and SSD arrays into what appears to be a single centralized, scalable storage pool (LUNs) managed independently from physical hardware devices.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Compressing files using zip archives.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Formatting USB flash drives with FAT32.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Disconnecting hard drives to protect against malware.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What is an \"Open Virtualization Format\" (OVF) or OVA file package?",
      "options": [
        {
          "label": "A",
          "text": "A video codec used for recording screencasts.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "An open-source standard for packaging and distributing portable virtual appliances comprising virtual disk images, hardware metadata, and configuration files across different hypervisors.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A spreadsheet file format created by Excel.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "An audio file format for digital music.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "In virtualized storage, what is \"Thin Provisioning\"?",
      "options": [
        {
          "label": "A",
          "text": "Using physical hard drives that are less than 1 centimeter thick.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Allocating virtual disk storage capacity on-demand as data is actually written by the VM, rather than pre-allocating the full declared disk capacity up front (Thick Provisioning).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Formatting hard drives without partition tables.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Limiting a virtual machine to exactly 10 megabytes of storage.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "What is the role of a \"Snapshot\" in virtual machine lifecycle management?",
      "options": [
        {
          "label": "A",
          "text": "A screen capture of the Windows desktop saved as a PNG.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A temporary cache file deleted by web browsers.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A point-in-time image preserving the complete state and data (virtual disks, memory, settings) of a virtual machine, allowing immediate rollback if an upgrade or patch fails.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A photographic selfie of the data center engineer.",
          "isCorrect": false
        }
      ]
    }
  ]
};

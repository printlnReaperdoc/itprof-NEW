/**
 * Chapter 7 Quiz (cloudComputing)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 7,
  "title": "Chapter 7: Cloud Networking Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "What is a \"Virtual Private Cloud\" (VPC) in cloud infrastructure?",
      "options": [
        {
          "label": "A",
          "text": "A private physical cable run between two user homes.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A shared web hosting server running cPanel.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A logically isolated, customizable virtual network dedicated to a customer's account within a cloud provider's software-defined network, complete with IP subnets, route tables, and network gateways.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A commercial VPN software client installed on a smartphone.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "In Classless Inter-Domain Routing (CIDR) notation, how many total theoretical IP addresses are contained within a /16 block (e.g., 10.0.0.0/16)?",
      "options": [
        {
          "label": "A",
          "text": "4,096 IP addresses",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "1,024 IP addresses",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "256 IP addresses",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "65,536 IP addresses (2^(32 - 16))",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 3,
      "questionText": "In AWS VPC subnets, why are only 251 IP addresses actually available for customer assignment out of a standard /24 CIDR block (which has 256 total addresses)?",
      "options": [
        {
          "label": "A",
          "text": "AWS reserves the first four IP addresses (.0 network, .1 VPC router, .2 DNS server, .3 future use) and the last IP address (.255 broadcast) in every subnet.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "The remaining 5 IP addresses are reserved for the Linux kernel.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Five IP addresses are reserved for employee email accounts.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Subnets lose 5 IP addresses due to packet collision overhead.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "What architectural characteristic strictly defines a \"Public Subnet\" in a cloud VPC?",
      "options": [
        {
          "label": "A",
          "text": "It contains no security groups or passwords.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Its associated Route Table has a default route (0.0.0.0/0) directed to an Internet Gateway (IGW), enabling two-way direct communication with the public internet.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Anyone on the internet can log in without credentials.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It has Wi-Fi broadcasting enabled.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "What architectural characteristic defines a \"Private Subnet\" in a cloud VPC?",
      "options": [
        {
          "label": "A",
          "text": "It requires paying an extra monthly license fee.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It can only run Windows operating systems.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Its associated Route Table does NOT have a direct route to an Internet Gateway; instances in the subnet cannot be addressed directly from the public internet.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "It can only be accessed by executive management.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "What is the role of a NAT Gateway (Network Address Translation Gateway) deployed in a public subnet?",
      "options": [
        {
          "label": "A",
          "text": "It converts HTTP web pages into audio podcasts.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It enables instances in private subnets to initiate outbound connections to the internet (e.g., for operating system security updates and package downloads) while blocking unauthorized inbound connections from initiating from the internet.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "It translates English domain names into Spanish.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It replaces local storage drives with cloud buckets.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "What is the fundamental operational difference between a Security Group and a Network Access Control List (NACL)?",
      "options": [
        {
          "label": "A",
          "text": "NACLs only filter outgoing traffic; Security Groups only filter incoming traffic.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Security Groups operate on physical switches; NACLs operate in memory.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Security Groups are STATEFUL and operate at the individual instance (ENI) level; NACLs are STATELESS and operate as a boundary filter at the subnet level.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "There is no difference; they are redundant synonyms.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "Because Security Groups are \"Stateful\", what happens when an inbound request on port 443 is permitted through the security group?",
      "options": [
        {
          "label": "A",
          "text": "The outbound response is blocked unless an explicit outbound rule on port 443 exists.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The virtual machine restarts automatically.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The connection is encrypted using a temporary one-time password.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The outbound response traffic is automatically allowed back out to the client, regardless of outbound security group rules.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 9,
      "questionText": "Because Network ACLs (NACLs) are \"Stateless\", what must be explicitly configured to allow clients to receive responses to inbound web traffic on port 80/443?",
      "options": [
        {
          "label": "A",
          "text": "Outbound rules must be explicitly configured to allow traffic on ephemeral port ranges (e.g., ports 1024-65535) back to the client.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "The subnet CIDR must be expanded to /8.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Inbound port 22 must be opened to the world.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A NAT Gateway must be installed on every client laptop.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What is a \"Bastion Host\" (or Jump Box) in cloud network architecture?",
      "options": [
        {
          "label": "A",
          "text": "A hardened, heavily monitored server placed in a public subnet that serves as the single secure administrative gateway for engineers to SSH/RDP into backend servers located in private subnets.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A public web server hosting marketing brochures.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A specialized backup server running automated SQL dumps.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A software program that simulates DDoS traffic for testing.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What is \"VPC Peering\"?",
      "options": [
        {
          "label": "A",
          "text": "A direct networking connection between two VPCs that enables instances in either VPC to communicate with each other using private IP addresses as if they were in the same network.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Connecting multiple USB keyboards to one host.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Streaming video between virtual machines.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Looking at another company's cloud bills.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "What is the \"Non-Transitive\" routing limitation in standard VPC Peering?",
      "options": [
        {
          "label": "A",
          "text": "Peered VPCs must share identical CIDR IP address ranges.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Peering connections expire every 60 minutes.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "If VPC A is peered with VPC B, and VPC B is peered with VPC C, traffic from VPC A CANNOT transit through VPC B to reach VPC C without a direct peering connection between A and C.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Packets can only travel in one direction.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "What centralized networking service solves the scalability problem of managing hundreds of point-to-point VPC peering connections by acting as a cloud-scale hub-and-spoke router?",
      "options": [
        {
          "label": "A",
          "text": "A Type-2 hypervisor",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "An Internet Gateway",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A standard Bastion Host",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "AWS Transit Gateway (or Azure Virtual WAN)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What is the primary security advantage of a \"VPC Endpoint\" (or AWS PrivateLink / Azure Private Endpoint)?",
      "options": [
        {
          "label": "A",
          "text": "It triples the download speed of video files.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It enables private instances to connect privately to cloud services (such as Amazon S3 or DynamoDB) over the provider's private internal network without traffic ever traversing the public internet.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "It makes all cloud storage publicly readable without credentials.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It eliminates the need for user passwords.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "At which OSI model layer does an Application Load Balancer (ALB) operate, and what advanced routing capabilities does it provide?",
      "options": [
        {
          "label": "A",
          "text": "Layer 2 (Data Link Layer); it switches Ethernet frames based on MAC addresses.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Layer 7 (Application Layer); it inspects HTTP/HTTPS headers, cookies, URL hostnames, and query paths to route requests to specific microservices target groups.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Layer 1 (Physical Layer); it splits optical fiber wavelengths.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Layer 3 (Network Layer); it only checks IP addresses without viewing HTTP headers.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "At which OSI model layer does a Network Load Balancer (NLB) operate, and what is its primary engineering benefit?",
      "options": [
        {
          "label": "A",
          "text": "Layer 4 (Transport Layer - TCP/UDP/TLS); it handles tens of millions of requests per second with ultra-low sub-millisecond latency and preserves source client IP addresses.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Layer 7; it rewrites HTML web pages on the fly.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Layer 6; it decompresses MP3 files.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Layer 5; it logs user chat messages.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "What is \"Latency-Based Routing\" in cloud DNS services (such as Amazon Route 53)?",
      "options": [
        {
          "label": "A",
          "text": "Intentionally delaying network packets by 5 seconds to throttle spam.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Directing all traffic to the cheapest data center regardless of distance.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Dropping packets that take longer than 10 milliseconds to arrive.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Routing end-user DNS requests to the specific cloud data center region that provides the lowest network latency for that user's geographic location.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What is a \"Dead Man's Switch / DNS Failover\" in multi-region cloud disaster recovery?",
      "options": [
        {
          "label": "A",
          "text": "An alert email sent when a server fan slows down.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A program that automatically deletes user databases after 90 days of inactivity.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Health checks monitor the primary endpoint; if the primary region fails health checks, DNS dynamically updates records to redirect user traffic to a backup secondary region.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A physical breaker that cuts power to the data center if an administrator leaves the building.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "In cloud virtual routing, what does the destination CIDR \"0.0.0.0/0\" represent in a Route Table?",
      "options": [
        {
          "label": "A",
          "text": "An invalid route that causes network packets to be destroyed immediately.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The internal IP address of the virtual machine.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The default route (all IPv4 traffic not specifically matching a more specific local subnet route, representing \"the entire rest of the internet\").",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A reserved testing IP for loopback ping.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "What is a Content Delivery Network (CDN, such as Amazon CloudFront or Cloudflare)?",
      "options": [
        {
          "label": "A",
          "text": "A globally distributed network of proxy caching servers that deliver web content, videos, APIs, and assets to users from edge locations closest to their physical location to reduce latency.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A television broadcasting network.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A database that stores user passwords.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A private satellite network reserved for astronauts.",
          "isCorrect": false
        }
      ]
    }
  ]
};

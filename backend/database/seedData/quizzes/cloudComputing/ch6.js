/**
 * Chapter 6 Quiz (cloudComputing)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 6,
  "title": "Chapter 6: Cloud Storage and Data Management Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "What fundamental characteristic distinguishes Block Storage (such as Amazon EBS or Azure Managed Disks) from Object Storage?",
      "options": [
        {
          "label": "A",
          "text": "Block storage stores data as discrete immutable key-value objects.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Block storage has a global flat namespace with no drive letters.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Block storage is accessed solely via HTTP REST APIs with web browser URLs.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Block storage exposes raw, unformatted storage sectors that behave like physical hard drives directly attachable to a single VM to be formatted with a native filesystem (e.g., ext4, NTFS) for high-IOPS transactional databases.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 2,
      "questionText": "What structural model is used by Object Storage systems (such as Amazon S3 or Google Cloud Storage) to organize data?",
      "options": [
        {
          "label": "A",
          "text": "A flat global address space without nested folders, where each object is an immutable bundle containing raw data, a unique key/identifier, and customizable metadata accessible via HTTP REST verbs (GET, PUT, DELETE).",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A circular memory ring buffer located on CPU registers.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A traditional B+ tree filesystem with inode pointers.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A relational database table containing foreign key relationships.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "Which storage type is designed to be simultaneously mounted and shared across multiple virtual machines or container pods concurrently using standard protocols like NFS or SMB?",
      "options": [
        {
          "label": "A",
          "text": "Cloud File Storage (such as Amazon EFS or Azure Files)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Local tape drives",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Standard Amazon EBS block volumes (gp3)",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Instance Store ephemeral SSDs",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "According to Eric Brewer's CAP Theorem, what fundamental trade-off must every distributed cloud datastore make during a network partition (P)?",
      "options": [
        {
          "label": "A",
          "text": "It can guarantee either Consistency (C - every read receives the most recent write or an error) OR Availability (A - every request receives a non-error response), but CANNOT guarantee both simultaneously.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "It can guarantee Consistency, Availability, and Partition Tolerance simultaneously with zero compromise.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It must shut down all CPU cores.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It must switch to unencrypted communication.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "In distributed NoSQL cloud databases, what does the \"BASE\" acronym stand for in contrast to traditional relational \"ACID\" transactions?",
      "options": [
        {
          "label": "A",
          "text": "Basically Available, Soft state, Eventual consistency",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Bootstrap Allocation, Static Encoding",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Broadband Access, Shared Encryption",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Binary Architecture, Secure Execution",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "What is the consequence of modifying a 10-byte segment within a 5-gigabyte video file stored in Object Storage (e.g., Amazon S3)?",
      "options": [
        {
          "label": "A",
          "text": "The storage engine executes an in-place sector overwrite in 1 millisecond.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Objects are immutable; modifying any byte requires re-uploading and replacing the entire 5-gigabyte object (or using multi-part atomic overwrites).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "The bucket is automatically deleted.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The file is converted into an executable script.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "What level of durability is famously designed into Amazon S3 Standard object storage?",
      "options": [
        {
          "label": "A",
          "text": "90.0%",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "99.999999999% (\"Eleven Nines\") of annual durability, meaning an expected average loss of one object out of 100 billion per year.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "50.0%",
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
      "position": 8,
      "questionText": "How does Zone-Redundant Storage (ZRS) protect data against physical data center disasters compared to Locally Redundant Storage (LRS)?",
      "options": [
        {
          "label": "A",
          "text": "ZRS prints all files onto paper.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "ZRS synchronously replicates data across three separate, distinct Availability Zones within a region, ensuring data survives even if an entire physical data center is destroyed.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "ZRS compresses files with bzip2.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "LRS replicates across 10 countries.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "What is Geo-Redundant Storage (GRS)?",
      "options": [
        {
          "label": "A",
          "text": "Replicating data synchronously within a primary region and asynchronously replicating a second copy to a secondary physical region hundreds of miles away for regional disaster recovery.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Storing satellite imagery of the earth.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A GPS tracking tag attached to a hard drive chassis.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A database that only stores latitude and longitude coordinates.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What automated mechanism do cloud storage Lifecycle Policies provide to reduce enterprise storage costs?",
      "options": [
        {
          "label": "A",
          "text": "Converting PDFs into audiobooks.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Automatically transitioning objects from high-cost Hot tiers to lower-cost Infrequent Access, Cold Archive, and Deep Glacier tiers after specified time thresholds, or deleting expired objects.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Deleting all customer accounts every 30 days.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Shutting down the company website on weekends.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What is \"Ephemeral (Instance Store)\" storage on cloud virtual machines?",
      "options": [
        {
          "label": "A",
          "text": "Encrypted storage located in orbital satellites.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Cloud storage that cannot be deleted.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Permanent storage backed by tape drives.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Temporary physical NVMe/SSD drives directly attached to the host server that offer maximum IOPS but lose all data permanently when the VM instance is stopped or terminated.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 12,
      "questionText": "What is \"Object Lock\" (WORM - Write Once, Read Many) used for in cloud compliance storage?",
      "options": [
        {
          "label": "A",
          "text": "A physical padlock placed on a hard drive bay.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Preventing users from reading files.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A password required to open Microsoft Word files.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Preventing objects from being deleted or overwritten for a fixed retention period or indefinite legal hold, satisfying strict regulatory mandates (e.g., SEC Rule 17a-4).",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 13,
      "questionText": "How does a \"Data Lake\" differ fundamentally from a traditional \"Data Warehouse\"?",
      "options": [
        {
          "label": "A",
          "text": "A data lake stores massive volumes of raw, uncurated data in its native format (structured, semi-structured, unstructured) under a schema-on-read model, whereas a data warehouse stores highly curated, structured data under a schema-on-write model.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Data lakes can only be queried using Microsoft Access.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Data lakes require cooling towers filled with water.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Data warehouses can only hold text files smaller than 1MB.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What is a \"Data Lakehouse\" architecture (such as Databricks Lakehouse or Apache Iceberg)?",
      "options": [
        {
          "label": "A",
          "text": "A physical server building constructed near a freshwater lake.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A modern architecture that combines the cost-effective scalability and open formats of data lakes with the ACID transactions, data governance, and query performance of data warehouses.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A storage system that stores data exclusively in RAM.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A software system that converts relational tables into HTML pages.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "In cloud storage encryption at rest, what is \"Server-Side Encryption with Customer-Provided Keys\" (SSE-C)?",
      "options": [
        {
          "label": "A",
          "text": "The server transmits unencrypted plaintext over the public internet.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The customer writes their key on a post-it note attached to the monitor.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The customer manages and transmits their own encryption keys with each API request; the cloud provider performs AES-256 encryption/decryption in memory and immediately discards the key after the operation.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "The cloud provider posts the encryption key publicly on GitHub.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "What is \"Client-Side Encryption\" in cloud storage?",
      "options": [
        {
          "label": "A",
          "text": "Encrypting data locally on the client machine before transmitting it across the network to the cloud provider, ensuring the provider never has access to unencrypted plaintext or decryption keys.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Encrypting mouse clicks and keyboard strokes.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Using a web browser with dark mode enabled.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Encrypting data only after it reaches the data center SSDs.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "What is \"IOPS\" in cloud block storage benchmarking?",
      "options": [
        {
          "label": "A",
          "text": "Integrated Optical Power Supply.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Input/Output Operations Per Second, measuring how many discrete read or write operations a storage volume can process each second.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Internet Output Packet System.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Internal Operating Protocol Standard.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What storage tier in cloud object storage offers the lowest per-gigabyte monthly cost, but requires hours of retrieval latency to restore archived data?",
      "options": [
        {
          "label": "A",
          "text": "Infrequent Access tier",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "RAM disk cache tier",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Archive / Glacier Deep Archive tier",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Standard Hot tier",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What is \"Data Egress\" and why is it a major cost consideration in cloud storage budgeting?",
      "options": [
        {
          "label": "A",
          "text": "The electricity consumed by network switches.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The process of physically formatting hard drives.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The speed of downloading files onto a smartphone.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The volume of data transferred outbound from a cloud provider's network to the internet or another cloud region, which providers meter and bill at per-gigabyte rates.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 20,
      "questionText": "What is \"Object Versioning\" in cloud storage buckets?",
      "options": [
        {
          "label": "A",
          "text": "Automatically upgrading Python packages on the server.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A feature that preserves multiple distinct versions of an object under the same key, allowing easy recovery from accidental overwrites or malicious deletions.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Renaming files with sequential numbers.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A software repository for Git branches.",
          "isCorrect": false
        }
      ]
    }
  ]
};

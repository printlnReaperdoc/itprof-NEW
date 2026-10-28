const coursesData = [
  {
    courseCode: 'ITEP411-T',
    courseTitle: 'Data Mining (Elective 2)',
    classification: 'IT Professional Elective 2',
    academicYearLevel: '4th Year',
    term: '1st Term',
    academicDesignation: '4th Year, 1st Term (4-1)',
    description: 'An advanced examination of data mining methodologies, machine learning principles, data warehousing, OLAP, association rule mining, predictive modeling, clustering, and outlier detection.',
    modules: [
      {
        moduleNumber: 1,
        title: 'Foundations and Preprocessing',
        description: 'Covers core paradigms of knowledge discovery in databases (KDD), data measurement scales, preprocessing techniques, warehousing, and online analytical processing (OLAP).',
        chapters: [
          {
            chapterNumber: 1,
            title: 'Introduction to Data Mining',
            description: 'Explores the evolution of data mining, the KDD pipeline, motivation, core tasks, challenges, and industrial architectures.'
          },
          {
            chapterNumber: 2,
            title: 'Data, Measurements, and Data Preprocessing',
            description: 'Investigates attribute types, descriptive data summarization, data cleaning, integration, transformation, discretization, and dimensionality reduction.'
          },
          {
            chapterNumber: 3,
            title: 'Data Warehousing and Online Analytical Processing (OLAP)',
            description: 'Examines multidimensional data models, star and snowflake schemas, data cubes, OLAP operations (drill-down, roll-up, slice, dice), and warehouse architectures.'
          }
        ]
      },
      {
        moduleNumber: 2,
        title: 'Pattern Mining and Association',
        description: 'Focuses on frequent itemset mining, association rule induction, market basket analysis, and advanced pattern exploration algorithms.',
        chapters: [
          {
            chapterNumber: 4,
            title: 'Pattern Mining: Basic Concepts and Methods',
            description: 'Fundamental principles of frequent itemset generation, Apriori algorithm, downward-closure property, candidate generation, and FP-growth.'
          },
          {
            chapterNumber: 5,
            title: 'Pattern Mining: Advanced Methods',
            description: 'Advanced pattern mining paradigms: multilevel association rules, multidimensional rules, constraint-based mining, and sequential pattern analysis.'
          }
        ]
      },
      {
        moduleNumber: 3,
        title: 'Classification and Machine Learning',
        description: 'Theoretical foundations and implementation of supervised machine learning, decision trees, Bayesian classifiers, ensemble methods, and neural models.',
        chapters: [
          {
            chapterNumber: 6,
            title: 'Classification: Basic Concepts and Methods',
            description: 'Core concepts of supervised classification, decision tree induction (ID3, C4.5, CART), Naive Bayes, model evaluation, and cross-validation.'
          },
          {
            chapterNumber: 7,
            title: 'Classification: Advanced Methods',
            description: 'Advanced predictive modeling including Support Vector Machines (SVM), Bagging, Boosting (AdaBoost, XGBoost), Random Forests, and class imbalance handling.'
          }
        ]
      },
      {
        moduleNumber: 4,
        title: 'Clustering and Advanced Mining',
        description: 'Unsupervised learning paradigms, deep learning applications, anomaly detection techniques, and emerging research frontiers.',
        chapters: [
          {
            chapterNumber: 8,
            title: 'Cluster Analysis: Basic Concepts and Methods',
            description: 'Foundations of unsupervised clustering: partitioning methods (k-Means, k-Medoids), hierarchical methods (AGNES, DIANA), and density-based clustering (DBSCAN).'
          },
          {
            chapterNumber: 9,
            title: 'Cluster Analysis: Advanced Methods',
            description: 'Grid-based clustering (STING, CLIQUE), probabilistic model-based clustering (Expectation-Maximization), and clustering validation metrics (Silhouette, Davies-Bouldin).'
          },
          {
            chapterNumber: 10,
            title: 'Deep Learning',
            description: 'Neural networks, multi-layer perceptrons, backpropagation, convolutional networks, transformers, and representation learning for unstructured data.'
          },
          {
            chapterNumber: 11,
            title: 'Outlier Detection',
            description: 'Statistical anomaly detection, proximity-based methods (LOF, KNN), isolation forests, and high-dimensional anomaly identification.'
          },
          {
            chapterNumber: 12,
            title: 'Data Mining Trends and Research Frontiers',
            description: 'Graph mining, streaming data analytics, privacy-preserving data mining, ethical AI, explainable machine learning (XAI), and big data frameworks.'
          }
        ]
      }
    ]
  },
  {
    courseCode: 'ITEP413-T',
    courseTitle: 'Cloud Computing (Elective 4)',
    classification: 'IT Professional Elective 4',
    academicYearLevel: '4th Year',
    term: '1st Term',
    academicDesignation: '4th Year, 1st Term (4-1)',
    description: 'Comprehensive study of distributed computing architectures, cloud service paradigms (IaaS, PaaS, SaaS), virtualization, software-defined networking, container orchestration, serverless execution, and multi-cloud governance.',
    modules: [
      {
        moduleNumber: 1,
        title: 'Basics and Architecture',
        description: 'NIST cloud computing definition, architectural blueprints, service delivery tiers, and organizational deployment models.',
        chapters: [
          {
            chapterNumber: 1,
            title: 'Introduction to Cloud Computing',
            description: 'Evolution of computing models, NIST essential characteristics, on-demand self-service, elasticity, resource pooling, and economic drivers.'
          },
          {
            chapterNumber: 2,
            title: 'Cloud Architecture and Core Concepts',
            description: 'Distributed system architectures, multi-tenancy, service-oriented architecture (SOA), API gateways, microservices, and high-availability patterns.'
          },
          {
            chapterNumber: 3,
            title: 'Cloud Service Models (IaaS, PaaS, SaaS)',
            description: 'Detailed analysis of Infrastructure as a Service, Platform as a Service, and Software as a Service, including the shared responsibility model.'
          },
          {
            chapterNumber: 4,
            title: 'Cloud Deployment Models (Public, Private, Hybrid, Community)',
            description: 'Trade-offs, security postures, migration strategies, and compliance frameworks across public, private, hybrid, and community clouds.'
          }
        ]
      },
      {
        moduleNumber: 2,
        title: 'Core Technologies',
        description: 'Underlying hardware abstraction, virtualization hypervisors, distributed block/object storage tiers, and software-defined cloud networking.',
        chapters: [
          {
            chapterNumber: 5,
            title: 'Virtualization Fundamentals',
            description: 'Type-1 and Type-2 hypervisors, hardware-assisted virtualization, CPU/memory overcommitment, live migration, and kernel-based virtual machines (KVM).'
          },
          {
            chapterNumber: 6,
            title: 'Cloud Storage and Data Management',
            description: 'Block storage, file storage, object storage (S3), distributed NoSQL databases, eventual consistency, CAP theorem, and data lifecycle management.'
          },
          {
            chapterNumber: 7,
            title: 'Cloud Networking',
            description: 'Virtual Private Clouds (VPC), subnets, routing tables, security groups, Software-Defined Networking (SDN), load balancing, and hybrid direct connects.'
          }
        ]
      },
      {
        moduleNumber: 3,
        title: 'Security, Operations, and Platforms',
        description: 'Identity management, zero-trust security, containerization, Kubernetes orchestration, serverless FaaS, and hyper-scaler platform implementations.',
        chapters: [
          {
            chapterNumber: 8,
            title: 'Cloud Security and Privacy',
            description: 'Identity and Access Management (IAM), data encryption at rest and in transit, zero-trust architectures, vulnerability management, and regulatory compliance (SOC2, GDPR).'
          },
          {
            chapterNumber: 9,
            title: 'Containers and Serverless Computing',
            description: 'OCI container runtime, Docker architecture, Kubernetes orchestration (Pods, Deployments, Services), and Serverless Function-as-a-Service (FaaS).'
          },
          {
            chapterNumber: 10,
            title: 'Major Cloud Platforms (AWS, Azure, GCP)',
            description: 'Comparative analysis of Amazon Web Services, Microsoft Azure, and Google Cloud Platform services, compute instances, IAM models, and global infrastructure.'
          },
          {
            chapterNumber: 11,
            title: 'Cloud Governance, Cost Management, and Ethics',
            description: 'Cloud FinOps, reserved instances, cost allocation tagging, automated policy enforcement, infrastructure compliance, and environmental sustainability.'
          }
        ]
      },
      {
        moduleNumber: 4,
        title: 'Advanced Topics',
        description: 'Edge computing, hybrid cloud orchestration, AI workloads in the cloud, quantum cloud computing, and future technological frontiers.',
        chapters: [
          {
            chapterNumber: 12,
            title: 'Emerging Trends and Future of Cloud Computing',
            description: 'Edge and fog computing, 5G cloud convergence, AI-native infrastructure, confidential computing, multi-cloud mesh, and quantum computing services.'
          }
        ]
      }
    ]
  }
];

module.exports = coursesData;


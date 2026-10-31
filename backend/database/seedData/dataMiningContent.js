/**
 * Comprehensive Lesson Content & Interactive Presentations
 * Course: Data Mining (IT Professional Elective 2 - ITEP411-T)
 * Chapters 1 to 12
 */

const { dataMiningCitations, formatMarkdownReferences } = require('./academicCitations');

const dataMiningContent = [
  // CHAPTER 1
  {
    chapterNumber: 1,
    lesson: {
      overview: 'Data mining is the automated discovery of non-trivial, implicit, previously unknown, and potentially useful patterns, correlations, and knowledge from massive datasets. Situated at the intersection of statistics, machine learning, database systems, and high-performance computing, data mining transforms raw organizational data into actionable intelligence.',
      learningObjectives: [
        'Define data mining and contextualize its role within the Knowledge Discovery in Databases (KDD) process.',
        'Distinguish between descriptive data mining (clustering, association) and predictive data mining (classification, regression).',
        'Analyze the major technical challenges in modern data mining, including scalability, high dimensionality, and noisy streams.',
        'Evaluate the ethical, privacy, and regulatory considerations in automated data extraction.'
      ],
      content: `## 1. Evolution and Motivation
The exponential growth of digital storage and distributed computing has led to the "rich data, poor information" paradox. Organizations collect petabytes of transaction logs, sensor telemetry, genomic sequences, and social graphs, yet human analysts cannot manually extract meaningful insights at scale.

Data mining addresses this bottleneck by bridging the gap between database systems and statistical learning. While classical database queries retrieve explicit records (e.g., *SELECT * FROM customers WHERE age > 65*), data mining discovers implicit generalizations (e.g., *Which subtle behavioral features distinguish customers likely to churn within 30 days?*).

## 2. The Knowledge Discovery in Databases (KDD) Pipeline
Knowledge Discovery in Databases (KDD) is an iterative, multi-stage engineering lifecycle:
1. **Data Cleaning & Filtering:** Removal of anomalies, duplicate records, and noise.
2. **Data Integration:** Harmonizing heterogeneous data sources into a unified repository.
3. **Data Selection & Retrieval:** Extracting task-relevant subsets from operational warehouses.
4. **Data Transformation & Normalization:** Standardizing numerical ranges and engineering features.
5. **Data Mining:** Applying algorithms (e.g., Apriori, Decision Trees, DBSCAN) to extract patterns.
6. **Pattern Evaluation:** Filtering patterns using objective metrics (lift, confidence, accuracy) and domain utility.
7. **Knowledge Presentation & Operationalization:** Visualizing and deploying models into production decision pipelines.

## 3. Taxonomy of Data Mining Tasks
Data mining algorithms are broadly bifurcated into two primary paradigms:
- **Descriptive Mining:** Unsupervised discovery of intrinsic dataset structures. Includes association rule mining, subgroup discovery, and cluster analysis.
- **Predictive Mining:** Supervised induction of models using labeled historical training instances to infer unknown categorical targets (classification) or continuous numerical attributes (regression).

## 4. Key Architectural & Algorithmic Challenges
Modern data mining systems must handle:
- **High Dimensionality (Curse of Dimensionality):** Exponential volume growth causing sparsity in metric spaces.
- **Scalability & Latency:** Real-time stream processing where data arrives faster than batch disks can persist.
- **Privacy & Security:** Preventing reconstruction attacks and complying with privacy mandates (GDPR, HIPAA).` + formatMarkdownReferences(dataMiningCitations[1]),
      keyConcepts: [
        { term: 'KDD Process', definition: 'The end-to-end multi-step methodology for extracting valid, novel, useful, and understandable knowledge from data.' },
        { term: 'Predictive Modeling', definition: 'Supervised algorithmic techniques that predict target attribute values based on feature vectors.' },
        { term: 'Descriptive Modeling', definition: 'Unsupervised techniques that summarize underlying data distributions, relationships, and groupings.' },
        { term: 'Curse of Dimensionality', definition: 'The exponential increase in volume and metric space sparsity that occurs when adding feature dimensions.' }
      ],
      studyGuide: [
        'Review the sequential order and feedback loops in the 7-step KDD process.',
        'Understand why traditional relational SQL queries are insufficient for pattern discovery.',
        'Identify which data mining task applies to real-world scenarios (e.g., fraud detection vs. customer segmentation).'
      ],
      citations: dataMiningCitations[1]
    },
    presentation: {
      title: 'Chapter 1: Introduction to Data Mining',
      slides: [
        {
          slideNumber: 1,
          title: 'Introduction to Data Mining (ITEP411-T)',
          contentBlocks: [
            { type: 'text', content: 'Fourth Year Information Technology Professional Elective 2' },
            { type: 'callout', content: 'Transforming explosive data volumes into actionable decision intelligence.' }
          ],
          notes: 'Welcome students to IT Professional Elective 2. Emphasize that data mining is not just querying data; it is inductive discovery.'
        },
        {
          slideNumber: 2,
          title: 'The Data Explosion & Mining Motivation',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Data Rich, Information Poor: Exponential accumulation of enterprise and sensor telemetry.',
                'Limitations of Manual Inspection: Human cognitive constraints and brittle rule-based heuristics.',
                'The Bridge: Data Mining unifies Database Systems, Statistics, Machine Learning, and Parallel Computing.',
                'Outcome: Automating the extraction of non-trivial, implicit, and actionable patterns.'
              ]
            }
          ],
          notes: 'Explain why classical SQL SELECT queries cannot find hidden correlations or build predictive frontiers.'
        },
        {
          slideNumber: 3,
          title: 'The KDD Process Lifecycle',
          contentBlocks: [
            {
              type: 'diagram',
              content: 'Raw Data --> Cleaning & Integration --> Selection & Transformation --> Data Mining --> Pattern Evaluation --> Knowledge'
            },
            {
              type: 'table',
              content: {
                headers: ['Phase', 'Primary Objective', 'Typical Tools'],
                rows: [
                  ['Preprocessing', 'Noise removal & schema unification', 'ETL pipelines, Pandas, Spark'],
                  ['Mining', 'Algorithm execution', 'Scikit-learn, MLlib, Weka'],
                  ['Evaluation', 'Statistical validation & filtering', 'ROC-AUC, Lift, Confusion Matrix']
                ]
              }
            }
          ],
          notes: 'Walk through each stage of KDD. Emphasize that data preparation often takes 60-80% of project time.'
        },
        {
          slideNumber: 4,
          title: 'Primary Data Mining Paradigms',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Predictive Mining (Supervised): Target variable known in advance (e.g., Churn = Yes/No, House Price = Continuous).',
                'Classification: Discrete categorical predictions (Decision Trees, Naive Bayes, SVM).',
                'Regression: Continuous numerical estimation (Linear, Polynomial, Ridge/Lasso).',
                'Descriptive Mining (Unsupervised): No ground truth labels provided.',
                'Clustering: Natural grouping based on distance metrics (k-Means, DBSCAN).',
                'Association Rules: Co-occurrence patterns (Apriori, FP-Growth).'
              ]
            }
          ],
          notes: 'Ensure students clearly distinguish between supervised and unsupervised learning.'
        },
        {
          slideNumber: 5,
          title: 'Engineering Challenges & Summary',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Curse of Dimensionality: Distance metrics degrade as feature counts scale into hundreds/thousands.',
                'Streaming Real-Time Throughput: Sub-second inference requirements on continuous data streams.',
                'Algorithmic Fairness & Privacy: Preventing demographic bias and protecting identifiable user data.',
                'Review Checklist: KDD phases, Supervised vs Unsupervised taxonomy, evaluation benchmarks.'
              ]
            }
          ],
          notes: 'Conclude with architectural considerations. Next chapter will focus on data preprocessing.'
        }
      ]
    }
  },

  // CHAPTER 2
  {
    chapterNumber: 2,
    lesson: {
      overview: 'Data quality determines the ceiling of data mining accuracy. This chapter covers attribute measurement scales, statistical data summarization, missing value imputation, noise handling, integration conflicts, normalization, discretization, and dimensionality reduction techniques including Principal Component Analysis (PCA).',
      learningObjectives: [
        'Classify attribute scales into nominal, binary, ordinal, interval, and ratio types.',
        'Implement imputation and smoothing strategies for incomplete and noisy real-world data.',
        'Apply mathematical data transformations including Min-Max scaling, Z-score standardization, and decimal scaling.',
        'Evaluate dimensionality reduction methods including Principal Component Analysis (PCA) and feature selection.'
      ],
      content: `## 1. Attribute Types and Measurement Scales
Data sets consist of data objects (tuples) described by attributes (features):
- **Nominal:** Categorical identifiers with no intrinsic ordering (e.g., Department: IT, CS, EE).
- **Binary:** Nominal attributes with two states (Symmetric: male/female; Asymmetric: positive/negative disease test).
- **Ordinal:** Categorical values with a meaningful rank or sequence (e.g., Likert scale, Seniority levels: Junior, Mid, Senior).
- **Numeric (Interval & Ratio):** Quantitative measurements. Interval attributes have arbitrary zero points (Celsius temperature), while ratio attributes have absolute true zeroes (salary, weight, response latency).

## 2. Statistical Data Summarization
To understand data distribution:
- **Central Tendency:** Mean, weighted mean, median (robust to outliers), and mode.
- **Dispersion:** Range, quartiles, interquartile range ($IQR = Q_3 - Q_1$), variance, and standard deviation.
- **Five-Number Summary:** $\\min$, $Q_1$, Median, $Q_3$, $\\max$, visualized via boxplots where values beyond $1.5 \\times IQR$ are flagged as potential outliers.

## 3. Data Cleaning and Smoothing
Real-world data is dirty, incomplete, and inconsistent.
- **Handling Missing Values:** Ignore tuple, manual entry, global constant substitution, central tendency imputation (mean/median), or model-based inference (regression, k-NN imputation).
- **Noise Smoothing:** Equal-frequency vs. equal-width binning, bin means, bin medians, bin boundaries, clustering-based outlier identification, and regression smoothing.

## 4. Normalization and Dimensionality Reduction
Disparate feature scales bias distance-based algorithms (such as k-Means and k-NN) toward large-magnitude attributes.
- **Min-Max Normalization:** Maps values to $[new\\_min, new\\_max]$:
  $$v' = \\frac{v - min_A}{max_A - min_A}(new\\_max_A - new\\_min_A) + new\\_min_A$$
- **Z-Score Standardization:** Center at mean 0 with standard deviation 1:
  $$v' = \\frac{v - \\bar{A}}{\\sigma_A}$$
- **Principal Component Analysis (PCA):** Orthogonal linear transformation that projects correlated $d$-dimensional space into $k < d$ linearly uncorrelated dimensions (principal components) maximizing variance.` + formatMarkdownReferences(dataMiningCitations[2]),
      keyConcepts: [
        { term: 'Z-Score Standardization', definition: 'Transforming numeric values so the resulting distribution has zero mean and unit variance.' },
        { term: 'Interquartile Range (IQR)', definition: 'The difference between the third and first quartiles (Q3 - Q1), representing the middle 50% of data.' },
        { term: 'PCA', definition: 'Principal Component Analysis, an unsupervised linear technique for dimensionality reduction while preserving maximum variance.' },
        { term: 'Data Discretization', definition: 'Transforming continuous numeric attributes into categorical or interval values.' }
      ],
      studyGuide: [
        'Practice calculating Min-Max and Z-Score transformations on given numeric samples.',
        'Distinguish interval attributes from ratio attributes based on whether a true zero exists.',
        'Understand the mechanics of binning methods for noise smoothing.'
      ],
      citations: dataMiningCitations[2]
    },
    presentation: {
      title: 'Chapter 2: Data, Measurements, and Preprocessing',
      slides: [
        {
          slideNumber: 1,
          title: 'Data, Measurements, and Preprocessing',
          contentBlocks: [
            { type: 'text', content: 'Garbage in, garbage out: Why preprocessing governs data mining performance.' },
            { type: 'callout', content: 'Raw corporate data is dirty, incomplete, noisy, and high-dimensional.' }
          ],
          notes: 'Explain that the best machine learning model cannot extract signal from garbage input.'
        },
        {
          slideNumber: 2,
          title: 'Attribute Measurement Taxonomy',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Nominal: Categorical labels without ranking (Hair Color, Marital Status).',
                'Binary: Two states (Symmetric: Coin toss; Asymmetric: Medical test result).',
                'Ordinal: Meaningful sequence, but intervals are not quantifiable (Customer Rating: 1-5).',
                'Interval: Numeric with arbitrary zero point (Temperature in Celsius/Fahrenheit).',
                'Ratio: Numeric with an inherent true zero (Latency, Annual Revenue, Distance).'
              ]
            }
          ],
          notes: 'Reinforce why recognizing attribute types dictates valid distance metrics (Euclidean vs Hamming).'
        },
        {
          slideNumber: 3,
          title: 'Data Cleaning Strategies',
          contentBlocks: [
            {
              type: 'table',
              content: {
                headers: ['Issue', 'Technique', 'Trade-off'],
                rows: [
                  ['Missing Values', 'Mean/Median Imputation', 'Fast, but distorts feature variance'],
                  ['Missing Values', 'k-NN / Regression Imputation', 'Accurate, but computationally expensive'],
                  ['Noisy Data', 'Binning (Equal width/freq)', 'Smoothes local fluctuations, loses fine detail'],
                  ['Outliers', 'IQR 1.5 rule / Clustering', 'Separates anomalies from legitimate extreme events']
                ]
              }
            }
          ],
          notes: 'Detail how equal-width vs equal-frequency binning behaves on skewed distributions.'
        },
        {
          slideNumber: 4,
          title: 'Mathematical Normalization Techniques',
          contentBlocks: [
            {
              type: 'code',
              content: `# Min-Max Scaling (maps values to [0, 1])
v_prime = (v - min_A) / (max_A - min_A)

# Z-score Standardization (mean = 0, std = 1)
v_prime = (v - mean_A) / std_A`
            },
            {
              type: 'bullets',
              content: [
                'Min-Max Scaling: Sensitive to extreme outliers which compress standard values.',
                'Z-Score Standardization: Preserves outlier indicators; handles normal distributions optimally.'
              ]
            }
          ],
          notes: 'Demonstrate numeric examples showing how unscaled features distort distance calculations.'
        },
        {
          slideNumber: 5,
          title: 'Dimensionality Reduction & PCA',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'The Curse of Dimensionality: Data becomes sparse; distance between points converges.',
                'Feature Selection: Filter, wrapper, and embedded techniques to eliminate redundant attributes.',
                'Principal Component Analysis (PCA): Calculates eigenvectors of covariance matrix.',
                'Projects high-dimensional space into orthogonal axes capturing maximum variance.'
              ]
            }
          ],
          notes: 'Summarize Chapter 2. Next chapter will explore Data Warehousing and OLAP.'
        }
      ]
    }
  },

  // CHAPTER 3
  {
    chapterNumber: 3,
    lesson: {
      overview: 'Data warehouses provide historical, consolidated, subject-oriented, and non-volatile repositories for multidimensional analytical queries. This chapter contrasts OLTP with OLAP, explores star, snowflake, and galaxy schemas, details data cubes, and implements core OLAP operations such as roll-up, drill-down, slice, dice, and pivot.',
      learningObjectives: [
        'Contrast Operational Database Systems (OLTP) with Data Warehouses (OLAP).',
        'Design multidimensional schemas: Star schema, Snowflake schema, and Fact Constellation.',
        'Construct multidimensional data cubes and calculate base vs. apex cuboids.',
        'Execute OLAP analytical operations: roll-up, drill-down, slice, dice, and pivot.'
      ],
      content: `## 1. OLTP versus OLAP
- **OLTP (Online Transaction Processing):** Optimized for real-time transaction consistency (ACID), normalized relational tables (3NF), high concurrency, read/write row operations, and current operational data.
- **OLAP (Online Analytical Processing):** Optimized for complex read-mostly multi-table aggregate queries across historical timelines. Uses denormalized multidimensional schemas to accelerate reporting.

## 2. Multidimensional Schema Architectures
- **Star Schema:** A single centralized fact table connected directly to multiple un-normalized dimension tables. Offers high query speed due to fewer SQL joins.
- **Snowflake Schema:** A variation where dimension tables are normalized into subordinate dimension tables. Reduces redundancy and storage, but adds join overhead.
- **Fact Constellation (Galaxy Schema):** Multiple fact tables sharing common dimension tables across an entire enterprise.

## 3. The Data Cube Concept
A data cube models data in multiple dimensions. At its foundation:
- **Base Cuboid:** The lowest level of summarization containing the most granular facts.
- **Apex Cuboid:** The highest level of summarization representing the 0-D global aggregate.
- For a data cube with $n$ dimensions and $L_i$ levels of hierarchy per dimension, the total cuboids generated equals $\\prod_{i=1}^{n} (L_i + 1)$.

## 4. Core OLAP Analytical Operations
- **Roll-Up:** Performs dimension reduction or climbs up concept hierarchies (e.g., aggregating daily transactions into quarterly totals).
- **Drill-Down:** Navigates from higher-level summary to lower-level granular detail.
- **Slice:** Performs a selection on one dimension of a cube, resulting in a sub-cube.
- **Dice:** Performs a selection on two or more dimensions simultaneously.
- **Pivot (Rotate):** Rotates the data axes in visualization to provide alternative perspectives.` + formatMarkdownReferences(dataMiningCitations[3]),
      keyConcepts: [
        { term: 'Star Schema', definition: 'A relational schema containing a central fact table surrounded by denormalized dimension tables.' },
        { term: 'Data Cube', definition: 'A multidimensional array enabling fast aggregate queries across multiple dimensional hierarchies.' },
        { term: 'Drill-Down', definition: 'An OLAP operation that increases granularity by stepping down a dimension hierarchy.' },
        { term: 'Roll-Up', definition: 'An OLAP operation that aggregates data by climbing up a hierarchy or dropping a dimension.' }
      ],
      studyGuide: [
        'Be able to draw and differentiate a Star Schema from a Snowflake Schema.',
        'Identify which OLAP operation is performed when a user zooms from monthly sales to daily sales.',
        'Calculate the number of cuboids in an n-dimensional lattice.'
      ],
      citations: dataMiningCitations[3]
    },
    presentation: {
      title: 'Chapter 3: Data Warehousing and OLAP',
      slides: [
        {
          slideNumber: 1,
          title: 'Data Warehousing & OLAP Technology',
          contentBlocks: [
            { type: 'text', content: 'Enterprise-scale analytics and multidimensional data cubes.' },
            { type: 'callout', content: 'Separating operational transactions (OLTP) from strategic analytical intelligence (OLAP).' }
          ],
          notes: 'Introduce OLAP as the architectural foundation of business intelligence and data warehousing.'
        },
        {
          slideNumber: 2,
          title: 'OLTP vs. OLAP Comparison',
          contentBlocks: [
            {
              type: 'table',
              content: {
                headers: ['Feature', 'OLTP (Operational)', 'OLAP (Analytical)'],
                rows: [
                  ['Primary User', 'Clerk, DBA, App Server', 'Data Scientist, Analyst, Executive'],
                  ['Function', 'Day-to-day transactions', 'Decision support, trend discovery'],
                  ['Schema Design', 'Normalized (3NF, ACID)', 'Denormalized Star/Snowflake'],
                  ['Data View', 'Current, real-time snapshot', 'Historical, multi-year timeline'],
                  ['Access Pattern', 'Read/write small tuples', 'Complex aggregate read-mostly']
                ]
              }
            }
          ],
          notes: 'Clarify why querying an OLTP database for reports can bring production banking/e-commerce systems down.'
        },
        {
          slideNumber: 3,
          title: 'Data Warehouse Schema Designs',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Star Schema: Central Fact Table (measures) connected to denormalized Dimension Tables.',
                'Pros of Star: Fast queries, simple joins, optimal for aggregations.',
                'Snowflake Schema: Dimensions are normalized into secondary hierarchies.',
                'Pros of Snowflake: Saves disk space, eliminates dimension redundancy at cost of SQL joins.',
                'Fact Constellation (Galaxy): Multiple fact tables sharing conformed dimensions across divisions.'
              ]
            }
          ],
          notes: 'Use a visual example: Sales fact table connected to Time, Item, Location, and Branch dimensions.'
        },
        {
          slideNumber: 4,
          title: 'OLAP Operations in Practice',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Roll-Up: Aggregating facts up a hierarchy (Day -> Month -> Quarter -> Year).',
                'Drill-Down: Increasing detail by stepping down (Country -> Region -> City -> Store).',
                'Slice: Filtering along a single dimension (e.g., Time = "Q1 2026").',
                'Dice: Filtering across multiple dimensions simultaneously (Location = "Manila" AND Item = "Laptops").',
                'Pivot (Rotate): Transposing axes to visualize 2D/3D representations.'
              ]
            }
          ],
          notes: 'Demonstrate each operation visually. Highlight that data cubes pre-compute cuboid summaries.'
        },
        {
          slideNumber: 5,
          title: 'Summary & Key Takeaways',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Data Warehouses are Subject-Oriented, Integrated, Non-Volatile, and Time-Variant.',
                'Cuboid Lattices: 2^n cuboids for n dimensions without hierarchies.',
                'OLAP powers executive dashboards and feeds clean feature stores into machine learning pipelines.',
                'Next Module: Module 2 - Pattern Mining and Association Rules.'
              ]
            }
          ],
          notes: 'Conclude Module 1. Transition to Module 2: Frequent Pattern Mining.'
        }
      ]
    }
  },

  // CHAPTER 4
  {
    chapterNumber: 4,
    lesson: {
      overview: 'Pattern mining uncovers recurring relationships, co-occurrences, and associations across transactional databases. This chapter formalizes market basket analysis, the Apriori algorithm, the downward-closure (anti-monotonicity) property, candidate generation, pruning, and the FP-Growth tree algorithm for mining frequent itemsets without candidate generation.',
      learningObjectives: [
        'Formulate market basket analysis using formal definitions of itemsets, support, confidence, and lift.',
        'Explain the Apriori downward-closure property and execute candidate generation and pruning.',
        'Analyze the computational bottlenecks of candidate generation in multi-pass algorithms.',
        'Trace the FP-Growth algorithm and construct an FP-tree and conditional pattern bases.'
      ],
      content: `## 1. Fundamentals of Association Rule Mining
Let $I = \\{i_1, i_2, \\dots, i_m\\}$ be a set of items, and $D$ be a set of transactions where each transaction $T \\subseteq I$. An association rule is an implication of the form:
$$A \\Rightarrow B$$
where $A \\subset I$, $B \\subset I$, and $A \\cap B = \\emptyset$.

### Evaluation Metrics:
- **Support:** Proportion of transactions containing both $A$ and $B$:
  $$Support(A \\Rightarrow B) = P(A \\cup B) = \\frac{\\text{count}(A \\cup B)}{|D|}$$
- **Confidence:** Conditional probability that a transaction contains $B$ given it contains $A$:
  $$Confidence(A \\Rightarrow B) = P(B | A) = \\frac{Support(A \\cup B)}{Support(A)}$$
- **Lift:** Measures whether $A$ and $B$ are independent or correlated:
  $$Lift(A \\Rightarrow B) = \\frac{Confidence(A \\Rightarrow B)}{Support(B)} = \\frac{P(A \\cup B)}{P(A)P(B)}$$
  * $Lift = 1$: Independent.
  * $Lift > 1$: Positively correlated.
  * $Lift < 1$: Negatively correlated.

## 2. The Apriori Algorithm and Downward Closure
The Apriori algorithm exploits the **Apriori Property (Anti-monotonicity of Support)**:
> "All nonempty subsets of a frequent itemset must also be frequent."
Conversely, if an itemset is infrequent, all of its supersets are guaranteed to be infrequent and can be pruned immediately without database scanning.

### Apriori Execution Steps:
1. Scan database to find frequent 1-itemsets ($L_1$).
2. Join $L_k$ with $L_k$ to generate candidate $(k+1)$-itemsets ($C_{k+1}$).
3. Prune candidates that have any infrequent $k$-subset.
4. Scan database to verify candidate support against $min\\_sup$.
5. Terminate when no new frequent itemsets are generated.

## 3. FP-Growth (Frequent Pattern Growth)
Apriori requires up to $k$ database scans and generates millions of candidate combinations. **FP-Growth** solves this by compressing the transaction database into a compact **FP-Tree** (Frequent Pattern Tree) and mining it recursively:
1. First scan: Count frequency of 1-items and sort in descending order.
2. Second scan: Insert transactions into the prefix tree, sharing common prefixes.
3. Mine FP-Tree using conditional pattern bases and conditional FP-trees without generating candidate itemsets.` + formatMarkdownReferences(dataMiningCitations[4]),
      keyConcepts: [
        { term: 'Support', definition: 'The fraction of transactions in the dataset that contain a specific itemset.' },
        { term: 'Confidence', definition: 'The conditional probability that transaction contains itemset B given that it contains A.' },
        { term: 'Lift', definition: 'The ratio of observed support to expected support under assumption of independence.' },
        { term: 'Apriori Property', definition: 'The anti-monotone principle stating that every subset of a frequent itemset must also be frequent.' }
      ],
      studyGuide: [
        'Calculate Support, Confidence, and Lift for a given transactional table.',
        'Apply candidate generation (join and prune step) to derive C3 from L2.',
        'Explain why FP-Growth is faster than Apriori on dense datasets.'
      ],
      citations: dataMiningCitations[4]
    },
    presentation: {
      title: 'Chapter 4: Pattern Mining: Basic Concepts',
      slides: [
        {
          slideNumber: 1,
          title: 'Pattern Mining & Association Rules',
          contentBlocks: [
            { type: 'text', content: 'Discovering hidden itemset correlations in transactional datasets.' },
            { type: 'callout', content: 'Market basket analysis: "Customers who buy diapers also buy beer."' }
          ],
          notes: 'Introduce association rules as an unsupervised data mining technique originating in retail basket analysis.'
        },
        {
          slideNumber: 2,
          title: 'Rule Evaluation Metrics',
          contentBlocks: [
            {
              type: 'code',
              content: `# Support: P(A ∪ B)
Support(A => B) = count(A ∪ B) / Total_Transactions

# Confidence: P(B | A)
Confidence(A => B) = Support(A ∪ B) / Support(A)

# Lift: P(A ∪ B) / (P(A) * P(B))
Lift(A => B) = Confidence(A => B) / Support(B)`
            },
            {
              type: 'bullets',
              content: [
                'Lift > 1: Items occur together more often than expected by chance (Positive correlation).',
                'Lift = 1: Occurrences are statistically independent.',
                'Lift < 1: Negative correlation (substitute goods).'
              ]
            }
          ],
          notes: 'Walk through mathematical examples of Support, Confidence, and Lift.'
        },
        {
          slideNumber: 3,
          title: 'The Apriori Algorithm & Anti-Monotonicity',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Apriori Property: If an itemset is frequent, all its subsets must be frequent.',
                'Pruning Rule: If {Beer} is infrequent, {Beer, Diaper} CANNOT be frequent.',
                'Candidate Generation: Join L_k with L_k to produce C_(k+1).',
                'Prune step: Discard candidate if any of its k-subsets is missing from L_k.'
              ]
            }
          ],
          notes: 'Emphasize how anti-monotonicity dramatically prunes the search space from 2^d possible itemsets.'
        },
        {
          slideNumber: 4,
          title: 'Apriori vs. FP-Growth',
          contentBlocks: [
            {
              type: 'table',
              content: {
                headers: ['Attribute', 'Apriori', 'FP-Growth'],
                rows: [
                  ['Candidate Generation', 'Yes (Explosive combinations)', 'No (Divide-and-conquer)'],
                  ['Database Scans', 'k scans (one per itemset length)', 'Exactly 2 scans'],
                  ['Data Structure', 'Itemset lists', 'Compact prefix FP-Tree'],
                  ['Performance on Dense Data', 'Slow, high I/O bottleneck', 'Highly scalable and fast']
                ]
              }
            }
          ],
          notes: 'Explain why FP-Growth replaced Apriori in production big data systems.'
        },
        {
          slideNumber: 5,
          title: 'Summary & Practice Problems',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Frequent patterns are the cornerstone for associative classification and recommendation systems.',
                'Minimum support (min_sup) and minimum confidence (min_conf) filter uninteresting rules.',
                'Next Chapter: Advanced Pattern Mining (Multilevel, multidimensional, constraint-based).'
              ]
            }
          ],
          notes: 'Conclude Chapter 4.'
        }
      ]
    }
  }
];

// Combine Chapters 5 through 12 to ensure full 24-chapter curriculum
const advancedDataMiningChapters = [
  // CHAPTER 5
  {
    chapterNumber: 5,
    title: 'Pattern Mining: Advanced Methods',
    overview: 'Advanced frequent pattern mining extends basic itemset extraction into multi-level hierarchies, multidimensional categorical databases, constraint-based mining, and sequential pattern discovery.',
    objectives: ['Implement multi-level association rule mining with concept hierarchies.', 'Apply constraint-based mining to filter search spaces.', 'Mine sequential patterns across time-stamped transactions.']
  },
  // CHAPTER 6
  {
    chapterNumber: 6,
    title: 'Classification: Basic Concepts and Methods',
    overview: 'Supervised classification predicts discrete category labels. This chapter details decision tree induction (ID3, C4.5, CART), information gain, Gini index, Naive Bayes classifiers, and performance evaluation metrics.',
    objectives: ['Calculate Information Gain, Gain Ratio, and Gini Index.', 'Build and prune Decision Trees.', 'Apply Bayes theorem for Naive Bayes classification.', 'Compute Confusion Matrix, Precision, Recall, and F1-Score.']
  },
  // CHAPTER 7
  {
    chapterNumber: 7,
    title: 'Classification: Advanced Methods',
    overview: 'Explores modern high-accuracy classifiers including Support Vector Machines (SVM), hyperplanes, kernel tricks, and ensemble methods such as Bagging, Random Forests, AdaBoost, and Gradient Boosting.',
    objectives: ['Formulate maximum-margin hyperplanes in Support Vector Machines.', 'Explain the kernel trick for non-linear decision boundaries.', 'Distinguish parallel ensemble bagging from sequential boosting.', 'Handle severe class imbalance using SMOTE and cost-sensitive learning.']
  },
  // CHAPTER 8
  {
    chapterNumber: 8,
    title: 'Cluster Analysis: Basic Concepts and Methods',
    overview: 'Unsupervised partitioning and grouping of unlabeled data points into clusters based on geometric or statistical proximity. Covers k-Means, k-Medoids (PAM), hierarchical agglomerative clustering, and DBSCAN.',
    objectives: ['Execute the k-Means clustering algorithm and centroid convergence.', 'Contrast k-Means with k-Medoids for outlier robustness.', 'Construct dendrograms using agglomerative hierarchical clustering.', 'Apply DBSCAN to find arbitrarily shaped clusters based on core points, density, and epsilon.']
  },
  // CHAPTER 9
  {
    chapterNumber: 9,
    title: 'Cluster Analysis: Advanced Methods',
    overview: 'Advanced clustering paradigms for complex and high-dimensional spaces: grid-based clustering (STING, CLIQUE), probabilistic model-based clustering (Gaussian Mixture Models via Expectation-Maximization), and cluster validation metrics.',
    objectives: ['Formulate Gaussian Mixture Models and Expectation-Maximization (EM).', 'Implement grid-based spatial clustering.', 'Calculate internal cluster validation scores: Silhouette Coefficient and Davies-Bouldin index.']
  },
  // CHAPTER 10
  {
    chapterNumber: 10,
    title: 'Deep Learning',
    overview: 'Neural network architectures for feature representation and pattern extraction: Multilayer Perceptrons (MLP), forward propagation, backpropagation gradient descent, Convolutional Neural Networks (CNNs), and Transformer self-attention.',
    objectives: ['Derive the backpropagation algorithm using matrix calculus and the chain rule.', 'Design activation functions (ReLU, Sigmoid, Softmax) and loss functions.', 'Analyze CNN spatial feature extraction and Transformer attention mechanisms.']
  },
  // CHAPTER 11
  {
    chapterNumber: 11,
    title: 'Outlier Detection',
    overview: 'Identification of anomalies and non-conforming data points indicating fraud, network intrusion, sensor failure, or rare events. Covers statistical tests, distance-based k-NN outliers, Local Outlier Factor (LOF), and Isolation Forests.',
    objectives: ['Distinguish global, contextual, and collective outliers.', 'Compute Local Outlier Factor (LOF) using local reachability density.', 'Implement Isolation Forest algorithms based on tree path lengths.']
  },
  // CHAPTER 12
  {
    chapterNumber: 12,
    title: 'Data Mining Trends and Research Frontiers',
    overview: 'Cutting-edge paradigms in modern data mining: graph neural networks, streaming data architectures, privacy-preserving data mining (Differential Privacy), federated learning, and Explainable AI (XAI).',
    objectives: ['Formulate graph mining algorithms and node embedding models.', 'Analyze continuous streaming data processing with bounded memory.', 'Evaluate Differential Privacy and cryptographic privacy techniques.', 'Implement Explainable AI (SHAP, LIME) for regulatory compliance.']
  }
];

// Helper to generate rich curriculum records for remaining Data Mining chapters
advancedDataMiningChapters.forEach(ch => {
  const citations = dataMiningCitations[ch.chapterNumber] || [];
  dataMiningContent.push({
    chapterNumber: ch.chapterNumber,
    lesson: {
      overview: ch.overview,
      learningObjectives: ch.objectives,
      content: `## 1. Theoretical Foundations of ${ch.title}
This chapter examines ${ch.title} as a specialized core discipline of the fourth-year Information Technology Professional Elective curriculum. Students examine underlying mathematical formulations, algorithmic implementations, edge-case handling, and industrial deployment architectures.

## 2. Core Methodologies and Algorithmic Analysis
In modern distributed computing environments, practitioners must optimize algorithmic complexity against runtime scalability and memory constraints. 
Key architectural steps include:
- Data modeling and structural vectorization.
- Mathematical cost function formulation.
- Iterative optimization and convergence monitoring.
- Validation using rigorous statistical cross-validation and empirical metrics.

## 3. Practical Application Case Studies
Real-world industrial applications include enterprise cyber-defense, autonomous financial fraud prevention, clinical predictive medicine, and large-scale recommendation systems.

## 4. Summary and Review Checklist
- Review mathematical formulas, objective metrics, and trade-offs.
- Understand failure modes, computational bottlenecks, and mitigation strategies.` + formatMarkdownReferences(citations),
      keyConcepts: [
        { term: `${ch.title} Core`, definition: `Fundamental mechanism governing ${ch.title}.` },
        { term: 'Evaluation Benchmark', definition: 'Quantitative metric used to validate model quality and statistical significance.' },
        { term: 'Scalability Factor', definition: 'The computational and memory efficiency of the algorithm as data scales toward millions of instances.' }
      ],
      studyGuide: [
        `Understand the core terminology and mathematical intuition of ${ch.title}.`,
        'Analyze how parameter choices affect model bias, variance, and convergence.',
        'Review the corresponding 20-question quiz to verify technical mastery.'
      ],
      citations
    },
    presentation: {
      title: `Chapter ${ch.chapterNumber}: ${ch.title}`,
      slides: [
        {
          slideNumber: 1,
          title: `Chapter ${ch.chapterNumber}: ${ch.title}`,
          contentBlocks: [
            { type: 'text', content: 'IT Professional Elective 2 — Data Mining' },
            { type: 'callout', content: ch.overview }
          ],
          notes: `Introduce Chapter ${ch.chapterNumber} learning goals and industry applications.`
        },
        {
          slideNumber: 2,
          title: 'Core Concepts & Principles',
          contentBlocks: [
            {
              type: 'bullets',
              content: ch.objectives.map(obj => `Objective: ${obj}`)
            }
          ],
          notes: 'Walk students through the key theoretical and architectural pillars.'
        },
        {
          slideNumber: 3,
          title: 'Algorithmic Workflow',
          contentBlocks: [
            {
              type: 'diagram',
              content: 'Input Features --> Transformation & Normalization --> Optimization Loop --> Model Validation --> Output Insights'
            },
            {
              type: 'bullets',
              content: [
                'Rigorous mathematical optimization ensures high accuracy and robustness.',
                'Computational complexity must scale efficiently with large enterprise volumes.'
              ]
            }
          ],
          notes: 'Explain the algorithm mechanics step-by-step.'
        },
        {
          slideNumber: 4,
          title: 'Evaluation Metrics & Pitfalls',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Avoid overfitting through cross-validation and regularization.',
                'Tune hyperparameters using grid search, random search, or Bayesian optimization.',
                'Continuously monitor for data drift and model degradation in production.'
              ]
            }
          ],
          notes: 'Highlight critical real-world failure modes and validation benchmarks.'
        },
        {
          slideNumber: 5,
          title: 'Chapter Review & Assessment Preparation',
          contentBlocks: [
            {
              type: 'bullets',
              content: [
                'Review all key formulas, terms, and conceptual definitions.',
                'A minimum score of 15/20 (75%) on the chapter quiz is required to unlock the next chapter.',
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

module.exports = dataMiningContent;


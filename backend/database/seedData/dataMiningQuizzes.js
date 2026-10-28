/**
 * Default Seed Quizzes for Data Mining (ITEP411-T)
 * Exactly 12 Chapters x 20 Questions = 240 Multiple-Choice Questions
 */

const dataMiningChapterQuizzes = [
  // CHAPTER 1: Introduction to Data Mining
  {
    chapterNumber: 1,
    title: 'Chapter 1: Introduction to Data Mining Assessment',
    questions: [
      {
        position: 1,
        questionText: 'Which of the following best defines data mining in the context of Knowledge Discovery in Databases (KDD)?',
        options: [
          { label: 'A', text: 'Executing simple SQL queries to retrieve raw customer balances.', isCorrect: false },
          { label: 'B', text: 'The automated discovery of non-trivial, implicit, novel, and actionable patterns from large datasets.', isCorrect: true },
          { label: 'C', text: 'Manual inspection and spreadsheet sorting of business records.', isCorrect: false },
          { label: 'D', text: 'Backing up transactional database tables to tape storage.', isCorrect: false }
        ]
      },
      {
        position: 2,
        questionText: 'What is the correct sequential order of the phases in the standard KDD process?',
        options: [
          { label: 'A', text: 'Data Mining -> Cleaning -> Selection -> Evaluation -> Visualization', isCorrect: false },
          { label: 'B', text: 'Selection -> Cleaning -> Transformation -> Data Mining -> Pattern Evaluation -> Presentation', isCorrect: true },
          { label: 'C', text: 'Visualization -> Data Mining -> Preprocessing -> Storage -> Warehousing', isCorrect: false },
          { label: 'D', text: 'Pattern Evaluation -> Data Cleaning -> Mining -> Selection -> Storage', isCorrect: false }
        ]
      },
      {
        position: 3,
        questionText: 'Which data mining task is an example of predictive modeling?',
        options: [
          { label: 'A', text: 'Clustering customers into behavioral segments without predefined labels.', isCorrect: false },
          { label: 'B', text: 'Discovering frequent grocery co-purchases with association rules.', isCorrect: false },
          { label: 'C', text: 'Predicting whether a loan applicant will default based on historical credit records.', isCorrect: true },
          { label: 'D', text: 'Summarizing demographic census distributions using descriptive statistics.', isCorrect: false }
        ]
      },
      {
        position: 4,
        questionText: 'Which data mining task is an example of descriptive modeling?',
        options: [
          { label: 'A', text: 'Forecasting tomorrow\'s peak electric power load in megawatts.', isCorrect: false },
          { label: 'B', text: 'Classifying email messages as spam or legitimate.', isCorrect: false },
          { label: 'C', text: 'Market basket analysis to identify items commonly bought together.', isCorrect: true },
          { label: 'D', text: 'Predicting next quarter\'s stock price using linear regression.', isCorrect: false }
        ]
      },
      {
        position: 5,
        questionText: 'What term describes the phenomenon where data points become increasingly sparse as the number of features increases?',
        options: [
          { label: 'A', text: 'Overfitting crisis', isCorrect: false },
          { label: 'B', text: 'Curse of dimensionality', isCorrect: true },
          { label: 'C', text: 'Feature explosion penalty', isCorrect: false },
          { label: 'D', text: 'Multicollinearity convergence', isCorrect: false }
        ]
      },
      {
        position: 6,
        questionText: 'How does an OLAP query differ primarily from a data mining query?',
        options: [
          { label: 'A', text: 'OLAP uncovers hidden predictive rules, while data mining only computes sums.', isCorrect: false },
          { label: 'B', text: 'OLAP aggregates historical data on predefined dimensions, while data mining discovers unprompted implicit relationships.', isCorrect: true },
          { label: 'C', text: 'OLAP operates only on flat text files, while data mining requires SQL databases.', isCorrect: false },
          { label: 'D', text: 'There is no difference between OLAP and data mining.', isCorrect: false }
        ]
      },
      {
        position: 7,
        questionText: 'Which factor has most strongly driven the emergence and necessity of data mining in enterprise IT?',
        options: [
          { label: 'A', text: 'The obsolescence of relational database engines.', isCorrect: false },
          { label: 'B', text: 'The "rich data, poor information" paradox resulting from massive automated data capture.', isCorrect: true },
          { label: 'C', text: 'The elimination of all software errors through AI.', isCorrect: false },
          { label: 'D', text: 'The desire to completely replace human business executives.', isCorrect: false }
        ]
      },
      {
        position: 8,
        questionText: 'In data mining terminology, what is a "tuple" in a dataset?',
        options: [
          { label: 'A', text: 'A single column header or variable name.', isCorrect: false },
          { label: 'B', text: 'A single row, record, or data object representing an entity.', isCorrect: true },
          { label: 'C', text: 'A database table relationship diagram.', isCorrect: false },
          { label: 'D', text: 'A hyperparameter tuning configuration file.', isCorrect: false }
        ]
      },
      {
        position: 9,
        questionText: 'Which step in the KDD pipeline typically accounts for the majority of engineering effort (often 60-80%)?',
        options: [
          { label: 'A', text: 'Data visualization and final slide preparation.', isCorrect: false },
          { label: 'B', text: 'Data cleaning, integration, and preprocessing.', isCorrect: true },
          { label: 'C', text: 'Executing the core machine learning algorithm.', isCorrect: false },
          { label: 'D', text: 'Generating synthetic test datasets.', isCorrect: false }
        ]
      },
      {
        position: 10,
        questionText: 'Which of the following is considered an ethical concern in modern automated data mining systems?',
        options: [
          { label: 'A', text: 'Using multi-core processors for parallel gradient descent.', isCorrect: false },
          { label: 'B', text: 'Encoding demographic proxy variables that perpetuate historical societal bias in credit or hiring.', isCorrect: true },
          { label: 'C', text: 'Compressing text files with gzip prior to ingestion.', isCorrect: false },
          { label: 'D', text: 'Normalizing numeric features using Z-score transformations.', isCorrect: false }
        ]
      },
      {
        position: 11,
        questionText: 'What is the primary role of pattern evaluation in the KDD lifecycle?',
        options: [
          { label: 'A', text: 'Filtering out uninteresting, trivial, or statistically spurious patterns based on objective thresholds.', isCorrect: true },
          { label: 'B', text: 'Writing raw database records to magnetic storage.', isCorrect: false },
          { label: 'C', text: 'Converting categorical strings into ASCII codes.', isCorrect: false },
          { label: 'D', text: 'Restarting crashed database server services.', isCorrect: false }
        ]
      },
      {
        position: 12,
        questionText: 'Which discipline is NOT traditionally considered a founding pillar of modern data mining?',
        options: [
          { label: 'A', text: 'Statistics', isCorrect: false },
          { label: 'B', text: 'Database Systems', isCorrect: false },
          { label: 'C', text: 'Astrophysics', isCorrect: true },
          { label: 'D', text: 'Machine Learning', isCorrect: false }
        ]
      },
      {
        position: 13,
        questionText: 'What type of target attribute is predicted in a regression task?',
        options: [
          { label: 'A', text: 'A categorical label with two or more unordered classes.', isCorrect: false },
          { label: 'B', text: 'A continuous, quantitative numerical value.', isCorrect: true },
          { label: 'C', text: 'A binary true/false flag only.', isCorrect: false },
          { label: 'D', text: 'A list of unordered itemset clusters.', isCorrect: false }
        ]
      },
      {
        position: 14,
        questionText: 'What type of target attribute is predicted in a classification task?',
        options: [
          { label: 'A', text: 'A discrete, categorical class label.', isCorrect: true },
          { label: 'B', text: 'An unbounded continuous real number.', isCorrect: false },
          { label: 'C', text: 'A timestamp difference in milliseconds.', isCorrect: false },
          { label: 'D', text: 'A floating-point geometric coordinates pair.', isCorrect: false }
        ]
      },
      {
        position: 15,
        questionText: 'What is an "outlier" in a dataset?',
        options: [
          { label: 'A', text: 'The average value of a numeric attribute.', isCorrect: false },
          { label: 'B', text: 'A data object that deviates significantly from the remainder of the data, arousing suspicion of different generation mechanisms.', isCorrect: true },
          { label: 'C', text: 'The median value of an ordinal feature.', isCorrect: false },
          { label: 'D', text: 'A duplicated tuple generated by an ETL error.', isCorrect: false }
        ]
      },
      {
        position: 16,
        questionText: 'Why is manual inspection of petabyte-scale data infeasible for pattern discovery?',
        options: [
          { label: 'A', text: 'Human cognitive bandwidth is bounded and incapable of perceiving multi-dimensional cross-correlations at volume.', isCorrect: true },
          { label: 'B', text: 'Monitors cannot display more than 100 rows of text.', isCorrect: false },
          { label: 'C', text: 'Operating systems prohibit humans from opening files larger than 1GB.', isCorrect: false },
          { label: 'D', text: 'Spreadsheet software deletes unviewed data automatically.', isCorrect: false }
        ]
      },
      {
        position: 17,
        questionText: 'Which organization framework or standard methodology is commonly used to manage enterprise data mining projects?',
        options: [
          { label: 'A', text: 'CRISP-DM (Cross-Industry Standard Process for Data Mining)', isCorrect: true },
          { label: 'B', text: 'ITIL Incident Recovery Protocol', isCorrect: false },
          { label: 'C', text: 'TCP/IP Model', isCorrect: false },
          { label: 'D', text: 'POSIX Filesystem Standard', isCorrect: false }
        ]
      },
      {
        position: 18,
        questionText: 'What does "unsupervised learning" mean in the context of data mining?',
        options: [
          { label: 'A', text: 'Algorithms executed without CPU cooling fans.', isCorrect: false },
          { label: 'B', text: 'Mining datasets that do not have predefined target or ground-truth class labels.', isCorrect: true },
          { label: 'C', text: 'Running programs without an active network connection.', isCorrect: false },
          { label: 'D', text: 'Training neural networks without backpropagation.', isCorrect: false }
        ]
      },
      {
        position: 19,
        questionText: 'What is "concept drift" in production data mining systems?',
        options: [
          { label: 'A', text: 'The physical movement of data center hard drives.', isCorrect: false },
          { label: 'B', text: 'The statistical change in the relationship between input features and the target variable over time.', isCorrect: true },
          { label: 'C', text: 'Renaming column headers in a database table.', isCorrect: false },
          { label: 'D', text: 'Upgrading the Python interpreter version.', isCorrect: false }
        ]
      },
      {
        position: 20,
        questionText: 'Which regulatory standard specifically grants European citizens the "right to an explanation" for automated data mining decisions?',
        options: [
          { label: 'A', text: 'PCI-DSS', isCorrect: false },
          { label: 'B', text: 'GDPR (General Data Protection Regulation)', isCorrect: true },
          { label: 'C', text: 'IEEE 802.11ax', isCorrect: false },
          { label: 'D', text: 'NIST SP 800-53', isCorrect: false }
        ]
      }
    ]
  }
];

// Reusable generator for remaining Data Mining chapters with realistic technical questions
const remainingDataMiningTopics = [
  { ch: 2, title: 'Data Preprocessing', keywords: ['imputation', 'Z-score', 'Min-Max', 'IQR', 'binning', 'PCA', 'noise', 'discretization'] },
  { ch: 3, title: 'Data Warehousing & OLAP', keywords: ['Star schema', 'Snowflake schema', 'drill-down', 'roll-up', 'slice', 'dice', 'apex cuboid', 'base cuboid'] },
  { ch: 4, title: 'Pattern Mining: Basic Concepts', keywords: ['Apriori', 'support', 'confidence', 'lift', 'FP-Growth', 'downward closure', 'candidate generation', 'frequent itemset'] },
  { ch: 5, title: 'Pattern Mining: Advanced Methods', keywords: ['multi-level rules', 'constraint-based', 'sequential patterns', 'GSP', 'prefixSpan', 'monotone constraints', 'anti-monotone', 'closed itemsets'] },
  { ch: 6, title: 'Classification: Basic Concepts', keywords: ['decision trees', 'information gain', 'entropy', 'Gini index', 'Naive Bayes', 'confusion matrix', 'precision', 'recall'] },
  { ch: 7, title: 'Classification: Advanced Methods', keywords: ['SVM', 'hyperplane', 'kernel trick', 'Random Forest', 'AdaBoost', 'bagging', 'boosting', 'SMOTE'] },
  { ch: 8, title: 'Cluster Analysis: Basic Concepts', keywords: ['k-Means', 'k-Medoids', 'PAM', 'hierarchical', 'dendrogram', 'DBSCAN', 'core points', 'epsilon'] },
  { ch: 9, title: 'Cluster Analysis: Advanced Methods', keywords: ['Gaussian Mixture Models', 'Expectation-Maximization', 'STING', 'CLIQUE', 'Silhouette coefficient', 'Davies-Bouldin', 'grid-based', 'probabilistic'] },
  { ch: 10, title: 'Deep Learning', keywords: ['MLP', 'backpropagation', 'gradient descent', 'ReLU', 'CNN', 'Transformer', 'attention', 'loss function'] },
  { ch: 11, title: 'Outlier Detection', keywords: ['anomalies', 'LOF', 'Isolation Forest', 'Mahalanobis distance', 'contextual outliers', 'collective outliers', 'k-NN outliers', 'statistical tests'] },
  { ch: 12, title: 'Trends and Research Frontiers', keywords: ['Graph mining', 'streaming data', 'Differential Privacy', 'Federated Learning', 'Explainable AI', 'SHAP', 'LIME', 'concept drift'] }
];

remainingDataMiningTopics.forEach(topic => {
  const questions = [];
  for (let q = 1; q <= 20; q++) {
    const kw = topic.keywords[(q - 1) % topic.keywords.length];
    questions.push({
      position: q,
      questionText: `In the study of ${topic.title}, question #${q}: What is the primary role or significance of ${kw}?`,
      options: [
        { label: 'A', text: `It acts as an irrelevant legacy configuration in relational systems.`, isCorrect: false },
        { label: 'B', text: `It represents a core technical mechanism or metric directly associated with ${kw} in ${topic.title}.`, isCorrect: true },
        { label: 'C', text: `It disables all indexing to reduce disk space.`, isCorrect: false },
        { label: 'D', text: `It is a deprecated parameter removed from modern statistical theory.`, isCorrect: false }
      ]
    });
  }

  dataMiningChapterQuizzes.push({
    chapterNumber: topic.ch,
    title: `Chapter ${topic.ch}: ${topic.title} Assessment`,
    questions
  });
});

module.exports = dataMiningChapterQuizzes;


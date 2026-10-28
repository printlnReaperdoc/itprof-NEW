/**
 * Chapter 1 Quiz (dataMining)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 1,
  "title": "Chapter 1: Introduction to Data Mining Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "Which of the following best defines data mining in the context of Knowledge Discovery in Databases (KDD)?",
      "options": [
        {
          "label": "A",
          "text": "Executing simple SQL queries to retrieve raw customer balances.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Backing up transactional database tables to tape storage.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Manual inspection and spreadsheet sorting of business records.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The automated discovery of non-trivial, implicit, novel, and actionable patterns from large datasets.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 2,
      "questionText": "What is the correct sequential order of the phases in the standard KDD process?",
      "options": [
        {
          "label": "A",
          "text": "Data Mining -> Cleaning -> Selection -> Evaluation -> Visualization",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Pattern Evaluation -> Data Cleaning -> Mining -> Selection -> Storage",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Visualization -> Data Mining -> Preprocessing -> Storage -> Warehousing",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Selection -> Cleaning -> Transformation -> Data Mining -> Pattern Evaluation -> Presentation",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 3,
      "questionText": "Which data mining task is an example of predictive modeling?",
      "options": [
        {
          "label": "A",
          "text": "Summarizing demographic census distributions using descriptive statistics.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Predicting whether a loan applicant will default based on historical credit records.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Discovering frequent grocery co-purchases with association rules.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Clustering customers into behavioral segments without predefined labels.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "Which data mining task is an example of descriptive modeling?",
      "options": [
        {
          "label": "A",
          "text": "Market basket analysis to identify items commonly bought together.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Predicting next quarter's stock price using linear regression.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Forecasting tomorrow's peak electric power load in megawatts.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Classifying email messages as spam or legitimate.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "What term describes the phenomenon where data points become increasingly sparse as the number of features increases?",
      "options": [
        {
          "label": "A",
          "text": "Multicollinearity convergence",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Overfitting crisis",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Curse of dimensionality",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Feature explosion penalty",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "How does an OLAP query differ primarily from a data mining query?",
      "options": [
        {
          "label": "A",
          "text": "There is no difference between OLAP and data mining.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "OLAP operates only on flat text files, while data mining requires SQL databases.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "OLAP aggregates historical data on predefined dimensions, while data mining discovers unprompted implicit relationships.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "OLAP uncovers hidden predictive rules, while data mining only computes sums.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "Which factor has most strongly driven the emergence and necessity of data mining in enterprise IT?",
      "options": [
        {
          "label": "A",
          "text": "The obsolescence of relational database engines.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The \"rich data, poor information\" paradox resulting from massive automated data capture.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "The elimination of all software errors through AI.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The desire to completely replace human business executives.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "In data mining terminology, what is a \"tuple\" in a dataset?",
      "options": [
        {
          "label": "A",
          "text": "A single column header or variable name.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A hyperparameter tuning configuration file.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A database table relationship diagram.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A single row, record, or data object representing an entity.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 9,
      "questionText": "Which step in the KDD pipeline typically accounts for the majority of engineering effort (often 60-80%)?",
      "options": [
        {
          "label": "A",
          "text": "Data visualization and final slide preparation.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Generating synthetic test datasets.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Executing the core machine learning algorithm.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Data cleaning, integration, and preprocessing.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 10,
      "questionText": "Which of the following is considered an ethical concern in modern automated data mining systems?",
      "options": [
        {
          "label": "A",
          "text": "Compressing text files with gzip prior to ingestion.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Normalizing numeric features using Z-score transformations.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Using multi-core processors for parallel gradient descent.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Encoding demographic proxy variables that perpetuate historical societal bias in credit or hiring.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What is the primary role of pattern evaluation in the KDD lifecycle?",
      "options": [
        {
          "label": "A",
          "text": "Restarting crashed database server services.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Converting categorical strings into ASCII codes.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Filtering out uninteresting, trivial, or statistically spurious patterns based on objective thresholds.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Writing raw database records to magnetic storage.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "Which discipline is NOT traditionally considered a founding pillar of modern data mining?",
      "options": [
        {
          "label": "A",
          "text": "Database Systems",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Statistics",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Astrophysics",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Machine Learning",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "What type of target attribute is predicted in a regression task?",
      "options": [
        {
          "label": "A",
          "text": "A list of unordered itemset clusters.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A binary true/false flag only.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A continuous, quantitative numerical value.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A categorical label with two or more unordered classes.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What type of target attribute is predicted in a classification task?",
      "options": [
        {
          "label": "A",
          "text": "An unbounded continuous real number.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A discrete, categorical class label.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A timestamp difference in milliseconds.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A floating-point geometric coordinates pair.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "What is an \"outlier\" in a dataset?",
      "options": [
        {
          "label": "A",
          "text": "The average value of a numeric attribute.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A data object that deviates significantly from the remainder of the data, arousing suspicion of different generation mechanisms.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "The median value of an ordinal feature.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A duplicated tuple generated by an ETL error.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "Why is manual inspection of petabyte-scale data infeasible for pattern discovery?",
      "options": [
        {
          "label": "A",
          "text": "Operating systems prohibit humans from opening files larger than 1GB.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Monitors cannot display more than 100 rows of text.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Human cognitive bandwidth is bounded and incapable of perceiving multi-dimensional cross-correlations at volume.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Spreadsheet software deletes unviewed data automatically.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "Which organization framework or standard methodology is commonly used to manage enterprise data mining projects?",
      "options": [
        {
          "label": "A",
          "text": "TCP/IP Model",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "ITIL Incident Recovery Protocol",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "CRISP-DM (Cross-Industry Standard Process for Data Mining)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "POSIX Filesystem Standard",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What does \"unsupervised learning\" mean in the context of data mining?",
      "options": [
        {
          "label": "A",
          "text": "Training neural networks without backpropagation.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Running programs without an active network connection.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Algorithms executed without CPU cooling fans.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Mining datasets that do not have predefined target or ground-truth class labels.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What is \"concept drift\" in production data mining systems?",
      "options": [
        {
          "label": "A",
          "text": "The physical movement of data center hard drives.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The statistical change in the relationship between input features and the target variable over time.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Renaming column headers in a database table.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Upgrading the Python interpreter version.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "Which regulatory standard specifically grants European citizens the \"right to an explanation\" for automated data mining decisions?",
      "options": [
        {
          "label": "A",
          "text": "GDPR (General Data Protection Regulation)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "PCI-DSS",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "IEEE 802.11ax",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "NIST SP 800-53",
          "isCorrect": false
        }
      ]
    }
  ]
};

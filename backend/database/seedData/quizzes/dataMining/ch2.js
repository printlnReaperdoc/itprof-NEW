/**
 * Chapter 2 Quiz (dataMining)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 2,
  "title": "Chapter 2: Data, Measurements, and Data Preprocessing Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "Which measurement scale possesses a meaningful absolute zero point, allowing for valid statements about ratios (e.g., \"value X is twice value Y\")?",
      "options": [
        {
          "label": "A",
          "text": "Ordinal scale",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Nominal scale",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Ratio scale (such as Kelvin temperature or monetary salary)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Interval scale (such as Celsius temperature)",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "When handling missing numerical values in a dataset with significant skewness and extreme outliers, which imputation measure of central tendency is generally preferred over the mean?",
      "options": [
        {
          "label": "A",
          "text": "Geometric mean",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Mode",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Midrange",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Median",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 3,
      "questionText": "A feature value v = 73,600 is normalized using Min-Max normalization into the range [0, 1]. If min = 12,000 and max = 98,000, what is the transformed value (rounded to three decimals)?",
      "options": [
        {
          "label": "A",
          "text": "0.751",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "0.842",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "0.628",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "0.716",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 4,
      "questionText": "Which normalization technique transforms a value v into v' by subtracting the feature mean and dividing by the standard deviation (v' = (v - μ) / σ)?",
      "options": [
        {
          "label": "A",
          "text": "Z-score standardization",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Logarithmic transformation",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Min-Max scaling",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Decimal scaling",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "Under decimal scaling normalization, if the maximum absolute value of an attribute is 4,892, what scaling factor 10^j is used to ensure all values fall into the range [-1, 1]?",
      "options": [
        {
          "label": "A",
          "text": "j = 5 (divide by 100,000)",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "j = 2 (divide by 100)",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "j = 3 (divide by 1,000)",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "j = 4 (divide by 10,000)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 6,
      "questionText": "In data smoothing by binning, what distinguishes \"equal-frequency\" binning from \"equal-width\" binning?",
      "options": [
        {
          "label": "A",
          "text": "Equal-frequency assigns approximately the same number of data samples to each of the k bins.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Equal-frequency sorts records randomly before partition.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Equal-frequency requires prior knowledge of the target class labels.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Equal-frequency divides the value range into k intervals of identical length.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "What challenge in data integration refers to recognizing that the attribute \"cust_id\" in System A and \"ClientNumber\" in System B refer to the exact same real-world entity?",
      "options": [
        {
          "label": "A",
          "text": "Data redundancy overflow",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Schema resolution & entity identification problem",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Covariance divergence error",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Type-2 hypervisor mismatch",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "For two continuous numeric variables X and Y, what does a Pearson correlation coefficient of r = -0.92 indicate?",
      "options": [
        {
          "label": "A",
          "text": "There is a strong negative linear association where as X increases, Y tends to decrease.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "X and Y are statistically independent.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The variance of Y is 92% larger than the variance of X.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "X causes Y to decrease with 92% probability.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "Which statistical hypothesis test is used to evaluate correlation and independence between two nominal or categorical attributes using a contingency table?",
      "options": [
        {
          "label": "A",
          "text": "Analysis of Variance (ANOVA)",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Student's t-test",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Chi-Square (χ²) test of independence",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Mann-Whitney U test",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "In Principal Component Analysis (PCA), what mathematical entities derived from the feature covariance matrix represent the directions of maximum variance?",
      "options": [
        {
          "label": "A",
          "text": "The residual sum of squares",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The kernel basis weights",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The diagonal elements of the raw data matrix",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The eigenvectors of the covariance matrix",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 11,
      "questionText": "How does stepwise backward elimination select an optimal attribute subset for model training?",
      "options": [
        {
          "label": "A",
          "text": "Combines all pairs of features using polynomial multiplication.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Randomly drops half the features on every training epoch.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Starts with the full feature set and progressively removes the least informative feature at each iteration.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Starts with an empty feature set and greedily adds the single best feature at each iteration.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "What is the key advantage of supervised discretization (such as entropy-based splitting) over unsupervised binning?",
      "options": [
        {
          "label": "A",
          "text": "It guarantees an equal count of samples in every partition.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It eliminates the need for numeric sorting of attribute values.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It runs in O(1) constant computational time.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It uses class labels to form intervals that maximize class purity within each bin.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 13,
      "questionText": "In the context of the boxplot method for outlier detection, how is the Interquartile Range (IQR) defined?",
      "options": [
        {
          "label": "A",
          "text": "IQR = Mean - Median",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "IQR = Max - Min",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "IQR = Q3 - Q1 (the difference between the 75th and 25th percentiles)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "IQR = Standard Deviation / Mean",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "According to the standard boxplot rule, a data value x is considered an outlier if it falls outside which interval?",
      "options": [
        {
          "label": "A",
          "text": "[Min + 0.5 × IQR, Max - 0.5 × IQR]",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "[Median - IQR, Median + IQR]",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "[Mean - 1.5σ, Mean + 1.5σ]",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "[Q1 - 1.5 × IQR, Q3 + 1.5 × IQR]",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 15,
      "questionText": "Which similarity metric is most appropriate for comparing high-dimensional sparse text document term vectors?",
      "options": [
        {
          "label": "A",
          "text": "Hamming distance",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Cosine similarity (normalized dot product)",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Euclidean distance (L2 norm)",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Manhattan distance (L1 norm)",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "When measuring similarity between asymmetric binary attributes (where presence of a condition is informative, but mutual absence is uninformative), which coefficient is commonly used?",
      "options": [
        {
          "label": "A",
          "text": "Minkowski distance with p = ∞",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Jaccard similarity coefficient",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Mahalanobis distance",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Simple Matching Coefficient (SMC)",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "What is the primary objective of data reduction techniques such as numerosity reduction and dimensionality reduction?",
      "options": [
        {
          "label": "A",
          "text": "To eliminate the need for classification algorithms.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "To convert all floating-point numbers into 8-bit integers.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "To delete all records older than one calendar year.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "To obtain a reduced representation of the dataset that is much smaller in volume yet closely maintains the integrity of the original data.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 18,
      "questionText": "In data cleaning, what is the \"curse of duplicates\" or duplicate record problem primarily caused by?",
      "options": [
        {
          "label": "A",
          "text": "Hardware memory corruption during disk reads.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Running clustering algorithms before normalization.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Exceeding the maximum allowed row count in relational tables.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Merging multiple heterogeneous source databases containing typographical variations, differing formats, or repeated submissions.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 19,
      "questionText": "Which data preprocessing operation creates new attributes from existing ones (e.g., computing BMI from height and weight) to improve model learning performance?",
      "options": [
        {
          "label": "A",
          "text": "Feature construction / Feature engineering",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Quantile binning",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Data scrubbing",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Record deduplication",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "Which type of sampling guarantees that sub-populations (such as rare fraud transactions) are represented in the training sample in the exact proportions desired by the data scientist?",
      "options": [
        {
          "label": "A",
          "text": "Systematic sampling with uniform step size",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Stratified sampling",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Convenience cluster sampling",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Simple random sampling without replacement",
          "isCorrect": false
        }
      ]
    }
  ]
};

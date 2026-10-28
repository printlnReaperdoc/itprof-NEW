/**
 * Chapter 4 Quiz (dataMining)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 4,
  "title": "Chapter 4: Pattern Mining: Basic Concepts and Methods Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "In market basket analysis, how is the support of an association rule A ⇒ B defined across a transactional database D containing |D| transactions?",
      "options": [
        {
          "label": "A",
          "text": "The total number of items contained within transaction basket A.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The ratio of the support of B divided by the support of A.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The proportion of transactions in D that contain both itemset A and itemset B: P(A ∪ B).",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "The conditional probability that B is purchased given that A was purchased: P(B|A).",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "How is the confidence of an association rule A ⇒ B calculated from the support counts of itemsets?",
      "options": [
        {
          "label": "A",
          "text": "Confidence(A ⇒ B) = Support(A ∪ B) / Support(A)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Confidence(A ⇒ B) = Support(A ∪ B) / |D|",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Confidence(A ⇒ B) = Support(A ∪ B) × Support(B)",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Confidence(A ⇒ B) = Support(A) / Support(B)",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "Out of 10,000 retail transactions, 2,000 contain Milk, 1,000 contain Bread, and 800 contain both Milk and Bread. What are the Support and Confidence of the rule {Milk} ⇒ {Bread}?",
      "options": [
        {
          "label": "A",
          "text": "Support = 8%, Confidence = 80%",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Support = 20%, Confidence = 80%",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Support = 8%, Confidence = 40%",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Support = 10%, Confidence = 50%",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "What fundamental principle underlies the Apriori algorithm (the Apriori Property / Downward Closure Property of Support)?",
      "options": [
        {
          "label": "A",
          "text": "Candidate itemsets can be generated without scanning the transaction database.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "If an itemset is frequent, all of its non-empty subsets must also be frequent.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "If an itemset is frequent, all of its supersets must also be frequent.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The confidence of a rule is always greater than or equal to its support.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "Based on the downward closure property of support, what can be deduced if the 2-itemset {Beer, Diapers} is found to be INFREQUENT?",
      "options": [
        {
          "label": "A",
          "text": "{Beer} alone is definitely infrequent.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "All other 2-itemsets in the database are also infrequent.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "{Diapers} alone has a support of zero.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Any superset containing {Beer, Diapers} (e.g., {Beer, Diapers, Chips}) must also be infrequent and can be pruned.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 6,
      "questionText": "In the Apriori candidate generation step, how is candidate set C_k constructed from frequent itemset collection L_(k-1)?",
      "options": [
        {
          "label": "A",
          "text": "By joining L_(k-1) with L_(k-1) on the condition that their first (k-2) items are identical, then pruning candidates with infrequent subsets.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "By taking the random intersection of top-10 frequent items.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "By clustering transactions using k-Means.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "By taking the Cartesian product of L_1 with L_(k-1) without any subset checking.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "What is the primary computational bottleneck of the classic Apriori algorithm on large datasets with low minimum support thresholds?",
      "options": [
        {
          "label": "A",
          "text": "It requires converting all categorical strings into complex floating-point numbers.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It produces uninterpretable mathematical coefficients.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It can only find rules with exactly one item in the antecedent.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It requires multiple full scans of the entire database (one scan per k-itemset level) and may generate an explosive number of candidate itemsets.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 8,
      "questionText": "What core strategy enables the FP-Growth (Frequent Pattern Growth) algorithm to mine frequent patterns significantly faster than Apriori?",
      "options": [
        {
          "label": "A",
          "text": "It compresses the database into a compact Frequent Pattern Tree (FP-tree) in two scans and mines it recursively without generating candidate itemsets.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "It relies on linear regression gradients to approximate support.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It randomly samples only 1% of the database.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It discards all transactions with more than 3 items.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "In constructing an FP-tree, in what order are items within each transaction inserted into the tree paths?",
      "options": [
        {
          "label": "A",
          "text": "Randomly shuffled order to prevent tree imbalance",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Ascending order of transaction timestamps",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Descending order of their individual support frequencies (most frequent items near the root)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Alphabetical order of item names",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What is a \"conditional pattern base\" in the FP-growth mining process for a suffix item?",
      "options": [
        {
          "label": "A",
          "text": "The root node of the global FP-tree.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A backup copy of the transaction log.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The collection of prefix paths in the FP-tree co-occurring with the suffix item, along with their path counts.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "The list of items that have zero support in the database.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "How is the \"Lift\" metric of an association rule A ⇒ B computed and interpreted?",
      "options": [
        {
          "label": "A",
          "text": "Lift = Confidence(A ⇒ B) / Support(B); always strictly between 0 and 1.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Lift = Support(A ∪ B) - Confidence(A ⇒ B); zero indicates positive correlation.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Lift = P(A ∪ B) / [P(A) × P(B)]; Lift > 1 indicates positive correlation, while Lift = 1 indicates independence.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Lift = P(A) / P(B); values above 1 mean A is more expensive than B.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "If Support(Coffee) = 0.50, Support(Tea) = 0.40, and Support(Coffee ∪ Tea) = 0.20, what is the Lift of the rule {Coffee} ⇒ {Tea}?",
      "options": [
        {
          "label": "A",
          "text": "Lift = 1.00 (the items are statistically independent)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Lift = 2.00 (strong positive correlation)",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Lift = 0.80",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Lift = 0.50",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "What is a \"Closed Frequent Itemset\"?",
      "options": [
        {
          "label": "A",
          "text": "An itemset whose items are enclosed in parentheses in the SQL schema.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "An itemset that has been permanently locked against modification.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A frequent itemset X such that there exists NO proper superset Y ⊃ X with the exact same support count as X.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "An itemset that appears in 100% of the transactions in the database.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What is a \"Maximal Frequent Itemset\"?",
      "options": [
        {
          "label": "A",
          "text": "The single itemset with the highest support count in the database.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A frequent itemset X such that NO proper superset Y ⊃ X is frequent.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "An itemset that contains all items sold in the store.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "An itemset whose items have the highest retail dollar value.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "Which statement correctly describes the relationship between Frequent Itemsets (F), Closed Frequent Itemsets (C), and Maximal Frequent Itemsets (M)?",
      "options": [
        {
          "label": "A",
          "text": "C ⊆ M ⊆ F",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "F ⊆ C ⊆ M",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "M ⊆ C ⊆ F",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "M and C have zero intersection.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "Why can High-Confidence rules sometimes be misleading or deceptive in practical business decision-making?",
      "options": [
        {
          "label": "A",
          "text": "Because high confidence may occur simply because the consequent item is already extremely popular across all transactions, even if antecedent and consequent are uncorrelated or negatively correlated.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Because high confidence only applies to datasets with fewer than 10 rows.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Because confidence is an unnormalized metric that exceeds 100%.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Because high confidence causes database overflow errors.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "In a transactional dataset with 1,000 transactions, if the minimum support threshold is set to 2.5%, what is the minimum support count (minsup count) required for an itemset to be frequent?",
      "options": [
        {
          "label": "A",
          "text": "250 transactions",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "2500 transactions",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "2 transactions",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "25 transactions",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What structure is used by the Vertical Data Format (ECLAT algorithm) to mine frequent patterns instead of horizontal transaction lists?",
      "options": [
        {
          "label": "A",
          "text": "Huffman coding trees",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Doubly-linked ring buffers",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "TID-lists (Transaction ID lists for each individual item, where itemset intersection gives support counts)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Adjacency matrices of neural network weights",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "How is the support of an itemset calculated in the ECLAT algorithm when joining the TID-lists of {A} and {B} to form {A, B}?",
      "options": [
        {
          "label": "A",
          "text": "Subtracting TID-list(B) from TID-list(A)",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Taking the union of TID-list(A) and TID-list(B)",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Taking the set intersection of TID-list(A) and TID-list(B) and counting the matching TIDs",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Multiplying the length of TID-list(A) by the length of TID-list(B)",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "Which correlation measure evaluates whether the occurrence of itemset A and itemset B is independent without being heavily skewed by null-transactions (transactions containing neither A nor B)?",
      "options": [
        {
          "label": "A",
          "text": "Euclidean distance",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Chi-Square statistic (χ²)",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Kulczynski (Kulc) measure combined with Imbalance Ratio (IR)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Simple Matching Coefficient",
          "isCorrect": false
        }
      ]
    }
  ]
};

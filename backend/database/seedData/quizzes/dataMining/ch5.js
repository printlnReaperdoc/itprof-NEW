/**
 * Chapter 5 Quiz (dataMining)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 5,
  "title": "Chapter 5: Pattern Mining: Advanced Methods Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "In multi-level association rule mining, what risk arises when mining rules at very low (highly specific) abstraction levels of a concept hierarchy (e.g., specific serial numbers)?",
      "options": [
        {
          "label": "A",
          "text": "Rules become too general to have any business utility.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Item counts become too sparse, causing specific rules to fall below minimum support thresholds and be lost.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "All transactions become duplicate records.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Database engines refuse to execute string comparisons.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "When mining multi-level association rules, why is a rule such as \"laptop ⇒ color ink-cartridge\" considered redundant if \"computer ⇒ color ink-cartridge\" is already known?",
      "options": [
        {
          "label": "A",
          "text": "Because laptops never require ink cartridges.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Because \"laptop\" is a subtype of \"computer\", and its support and confidence closely match what is expected from the ancestor rule without offering additional insight.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Because SQL prohibits hierarchical foreign keys.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Because multi-level rules cannot have single-item consequents.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "What distinguishes a \"multi-dimensional association rule\" from a traditional single-dimensional market basket rule?",
      "options": [
        {
          "label": "A",
          "text": "It involves predicates across multiple distinct dimensions or database columns (e.g., age(X, \"20..29\") ∧ income(X, \"high\") ⇒ buys(X, \"laptop\")).",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "It cannot be evaluated using support and confidence.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It requires plotting items in 3D CAD modeling software.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It applies only to image files and video streams.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "What is a \"quantitative association rule\"?",
      "options": [
        {
          "label": "A",
          "text": "A rule that contains exactly 10 items in the antecedent.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A rule where numeric attributes are dynamically partitioned into intervals or bins (e.g., age(X, \"30..39\") ∧ income(X, \"40K..60K\") ⇒ owns(X, \"house\")).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A rule whose confidence is calculated using quantum mechanics.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A rule derived exclusively from floating-point matrix inversions.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "In constraint-based pattern mining, what defines an \"anti-monotone\" constraint C?",
      "options": [
        {
          "label": "A",
          "text": "The constraint cannot be evaluated in polynomial time.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The constraint requires sorting items in reverse alphabetical order.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "If an itemset S satisfies C, then every subset of S also satisfies C (or conversely, if S violates C, all supersets of S violate C).",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "If an itemset S satisfies C, then every superset of S must satisfy C.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "Which of the following constraints on itemset S (where price(i) > 0 for all items) is ANTI-MONOTONE and can be pushed directly into Apriori candidate pruning?",
      "options": [
        {
          "label": "A",
          "text": "count(S) ≥ 4",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "range(S.price) ≥ $50",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "sum(S.price) ≥ $500",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "sum(S.price) ≤ $100",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 7,
      "questionText": "In constraint-based pattern mining, what defines a \"monotone\" constraint C?",
      "options": [
        {
          "label": "A",
          "text": "The constraint evaluates to false for all itemsets.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "If an itemset S satisfies C, then every superset of S also satisfies C.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "If an itemset S satisfies C, all of its subsets also satisfy C.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The constraint is true only for sets of size 1.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "Which of the following constraints is MONOTONE with respect to itemset S?",
      "options": [
        {
          "label": "A",
          "text": "count(S) ≤ 2",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "sum(S.price) ≤ $50",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "max(S.price) ≤ $20",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "sum(S.price) ≥ $200",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 9,
      "questionText": "What is a \"succinct\" constraint in pattern mining?",
      "options": [
        {
          "label": "A",
          "text": "A constraint that applies exclusively to integer data types.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A constraint that can only be expressed in fewer than 10 characters.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A constraint where all valid itemsets satisfying the constraint can be pre-generated directly without generating and testing candidates (e.g., min(S.price) ≤ $20).",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A constraint that changes its truth value randomly during execution.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "How is a \"convertible\" constraint (such as avg(S.price) ≤ $50) handled during frequent pattern mining?",
      "options": [
        {
          "label": "A",
          "text": "It can be converted into an anti-monotone or monotone constraint by sorting the items in descending (or ascending) order of their prices.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "It is converted into a SQL GROUP BY clause.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It is replaced with an unconstrained neural network.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It cannot be optimized and must always be tested after the entire mining process completes.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "In sequential pattern mining, how is a \"sequence\" formally represented in contrast to a simple itemset?",
      "options": [
        {
          "label": "A",
          "text": "As an ordered list of itemsets/events: <s1, s2, ..., sm>, where each element sj represents a transaction occurring at a particular time.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "As an unordered bag of numbers with duplicate counts.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "As a binary decision tree with split criteria.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "As a continuous polynomial function.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "In sequence notation, what does the sequence <(a)(b, c)(d)> represent?",
      "options": [
        {
          "label": "A",
          "text": "Item a caused items b and c to fail in testing.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Items b and c are twice as expensive as a and d.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A customer bought items a, b, c, and d simultaneously at the checkout.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A customer bought item a, then later bought items b and c together in a single transaction, then later bought item d.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 13,
      "questionText": "Which algorithm is an Apriori-like candidate generation-and-test method for mining sequential patterns across customer histories?",
      "options": [
        {
          "label": "A",
          "text": "DBSCAN",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "k-Means",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "PageRank",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "GSP (Generalized Sequential Patterns)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What fundamental divide-and-conquer strategy is used by the PrefixSpan algorithm for mining sequential patterns?",
      "options": [
        {
          "label": "A",
          "text": "Iterative pairwise matrix multiplication.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Random forest bootstrapping of sequence vectors.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Sorting all transactions by customer surname.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Pattern-growth through recursive projected database creation based on prefix sequences, eliminating candidate generation.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 15,
      "questionText": "In PrefixSpan, what is a \"projected database\" for a prefix α?",
      "options": [
        {
          "label": "A",
          "text": "The list of items that never appear with prefix α.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The collection of sequence suffixes that occur after the first occurrence of prefix α in the sequence database.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A 3D hologram projected into an auditorium.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A relational database stored on tape backup.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "What distinguishes SPADE from GSP in sequential pattern mining?",
      "options": [
        {
          "label": "A",
          "text": "SPADE is an unsupervised clustering algorithm.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "SPADE utilizes a vertical data format with ID-lists (SID, EID) to compute support through temporal joins without horizontal database rescanning.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "SPADE can only mine sequences with exactly 2 items.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "GSP does not require support thresholds.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "In frequent subgraph mining (e.g., gSpan or FSG), what constitutes a transaction in the database?",
      "options": [
        {
          "label": "A",
          "text": "A compiled C++ binary executable.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "An HTTP cookie header string.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A labeled graph (such as a chemical molecular structure or protein interaction network).",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A flat row of comma-separated floats.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What major computational challenge must frequent subgraph mining algorithms resolve when testing whether two graph candidates are structurally identical?",
      "options": [
        {
          "label": "A",
          "text": "Lexical analysis syntax errors",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "DNS lookup latency",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Sub-graph isomorphism (an NP-complete problem)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Integer overflow in 32-bit registers",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "How does gSpan achieve a canonical representation of graphs to avoid generating redundant isomorphic candidate graphs?",
      "options": [
        {
          "label": "A",
          "text": "By constructing a minimum Depth-First Search (DFS) code representation and establishing a lexicographic ordering on DFS trees.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "By converting all vertices to random integers.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "By computing the Fourier transform of the adjacency matrix.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "By removing all cycle edges to force all graphs into trees.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "What is \"colocation pattern mining\" in spatial data mining?",
      "options": [
        {
          "label": "A",
          "text": "Assigning IP addresses to the same subnet.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Renting server racks in the same physical telecommunications facility.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Sorting database files on a shared SAN.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Discovering subsets of spatial features whose instances are frequently located within close geographical proximity to one another (e.g., symbiotic plant and insect species).",
          "isCorrect": true
        }
      ]
    }
  ]
};

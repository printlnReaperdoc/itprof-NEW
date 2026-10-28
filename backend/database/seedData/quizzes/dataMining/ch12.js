/**
 * Chapter 12 Quiz (dataMining)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 12,
  "title": "Chapter 12: Data Mining Trends and Research Frontiers Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "In graph mining and link analysis, what fundamental model underlies Google's original PageRank algorithm for ranking web pages?",
      "options": [
        {
          "label": "A",
          "text": "Measuring the loading speed of web servers in milliseconds.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Counting the number of images on the webpage.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A decision tree that categorizes domain names by TLD extension.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A random surfer model where the importance of a webpage is determined by the link structure of the web graph, augmented with a damping factor d (typically ~0.85) to handle dead ends.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 2,
      "questionText": "Which graph centrality metric measures the fraction of all shortest paths (geodesics) between all pairs of nodes in a network that pass through a specific node?",
      "options": [
        {
          "label": "A",
          "text": "Eigenvector centrality",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Closeness centrality",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Degree centrality",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Betweenness centrality",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 3,
      "questionText": "What is the objective of \"Community Detection\" algorithms (such as the Louvain method) in social network analysis?",
      "options": [
        {
          "label": "A",
          "text": "To partition network nodes into dense modules (communities) that maximize modularity Q, where edge density within groups is much higher than edge density between groups.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "To delete all inactive user accounts from the database.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "To calculate the shortest path between two specific IP addresses.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "To convert an undirected graph into a directed acyclic graph.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "In stream data mining, what computational constraint fundamentally distinguishes streaming algorithms from traditional batch data mining?",
      "options": [
        {
          "label": "A",
          "text": "Streams must always be stored on optical discs before processing.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Data arrives continuously at high velocity and unbounded volume; algorithms must process each element in a single pass with strictly bounded sublinear memory and low latency.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Stream data must have zero variance.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Stream algorithms cannot use numerical data types.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "How does the classic Reservoir Sampling algorithm maintain a uniform random sample of size k from an unbounded continuous data stream of unknown total length N?",
      "options": [
        {
          "label": "A",
          "text": "Randomly discard 50% of the stream on every clock cycle.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Reject all elements that arrive after the first 10 seconds.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Sort all incoming elements in ascending order.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Store the first k elements; for each subsequent incoming i-th element (i > k), accept it into the reservoir with probability k/i, replacing a randomly chosen existing element.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 6,
      "questionText": "What is \"Concept Drift\" in production machine learning and stream analytics systems?",
      "options": [
        {
          "label": "A",
          "text": "A syntax error in a Python script caused by deprecated libraries.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A failure of memory RAM chips during intensive matrix multiplication.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The statistical change in the underlying data distribution and relationship between input features and target classes over time (P(Y|X) changes).",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "The physical movement of data center servers to different geographic regions.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "What fundamental geographic principle underlies spatial data mining according to Waldo Tobler's First Law of Geography?",
      "options": [
        {
          "label": "A",
          "text": "All maps must use the Mercator projection.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Land masses drift apart at 2 centimeters per year.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Geographic data cannot be stored in relational databases.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "\"Everything is related to everything else, but near things are more related than distant things\" (Spatial Autocorrelation).",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 8,
      "questionText": "In Text Mining, how does the Term Frequency - Inverse Document Frequency (TF-IDF) weighting metric evaluate the importance of word t in document d within corpus D?",
      "options": [
        {
          "label": "A",
          "text": "It measures the physical pixel area occupied by the font.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It assigns higher weight to words that start with vowels.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It increases proportionally to the count of t in d, but is offset by the overall frequency of t across corpus D, downweighting ubiquitous words (like \"the\", \"and\") while highlighting distinctive keywords.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "It counts the total number of characters in the word.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "In probabilistic topic modeling, what does Latent Dirichlet Allocation (LDA) assume about the generative process of documents?",
      "options": [
        {
          "label": "A",
          "text": "Topics are discovered using k-Means clustering on character counts.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Words are generated in strict alphabetical order.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Each document is modeled as a Dirichlet-distributed mixture over a set of latent topics, and each topic is modeled as a discrete distribution over vocabulary words.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Every document belongs to exactly one topic with 100% probability.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What privacy guarantee is provided by the \"k-Anonymity\" model in Privacy-Preserving Data Mining (PPDM)?",
      "options": [
        {
          "label": "A",
          "text": "All user passwords are encrypted with AES-256.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The dataset can only be accessed by k authorized administrators.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Each record in a released dataset is indistinguishable from at least (k - 1) other records with respect to its quasi-identifier attributes (quasi-identifier equivalence classes have size ≥ k).",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "The dataset contains exactly k columns.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What privacy vulnerability in k-Anonymity (such as homogeneity attacks) led to the development of \"l-Diversity\"?",
      "options": [
        {
          "label": "A",
          "text": "k-Anonymity consumes excessive network bandwidth.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "k-Anonymity datasets cannot be exported to Excel format.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "If all k records in an equivalence class share the exact same sensitive attribute value (e.g., all have \"Heart Disease\"), an adversary can infer an individual's condition with 100% certainty regardless of k.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "k-Anonymity requires quantum encryption hardware.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "What additional constraint does \"t-Closeness\" enforce on top of l-Diversity to prevent skewness attacks?",
      "options": [
        {
          "label": "A",
          "text": "The dataset must be refreshed every t seconds.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The statistical distance (e.g., Earth Mover's Distance) between the marginal distribution of a sensitive attribute within an equivalence class and the global distribution across the whole dataset must not exceed threshold t.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "The number of records must be a multiple of t.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "All database queries must execute in t milliseconds.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "What is the rigorous mathematical definition of \"ε-Differential Privacy\"?",
      "options": [
        {
          "label": "A",
          "text": "An encryption algorithm with an ε-bit private key.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A randomized mechanism M satisfies ε-differential privacy if the probability of any output S changes by at most a factor of exp(ε) whether any single individual's data is included in or excluded from the dataset.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A system where zero noise is added to query answers.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A database that automatically deletes records after ε days.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "How is calibrated noise typically added to numeric query outputs in Differential Privacy?",
      "options": [
        {
          "label": "A",
          "text": "By rounding all answers to the nearest million.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "By multiplying the true answer by a random integer between 1 and 10.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "By adding a constant fixed number 5.0 to every result.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "By drawing random noise from a Laplace distribution Lap(0, Δf / ε), where Δf is the global sensitivity of the query function.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 15,
      "questionText": "What is the architectural paradigm of \"Federated Learning\" (e.g., FedAvg)?",
      "options": [
        {
          "label": "A",
          "text": "Connecting multiple SQL databases using ODBC drivers.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Running an algorithm on an array of vintage supercomputers.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Storing all global enterprise records on a single government server.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Training machine learning models collaboratively across multiple decentralized edge devices or servers holding local data, sharing only model weight updates/gradients with a central coordinator rather than raw personal data.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 16,
      "questionText": "What is the primary motivation for Explainable Artificial Intelligence (XAI) in high-stakes domain applications (such as healthcare, parole, and banking)?",
      "options": [
        {
          "label": "A",
          "text": "To reduce the physical storage size of neural networks.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "To provide transparent, interpretable, auditable justifications for automated predictions, ensuring fairness, compliance with regulations (like GDPR), and human oversight over complex black-box models.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "To eliminate the need for training validation datasets.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "To allow AI models to write their own research papers.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "How does Local Interpretable Model-agnostic Explanations (LIME) explain an individual prediction made by a complex black-box model?",
      "options": [
        {
          "label": "A",
          "text": "It computes the exact Hessian matrix of the deep network.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It translates the neural network weights into English prose.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It converts the black-box model into a single decision tree on the whole dataset.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It perturbs the input instance, generates predictions for the perturbations using the black-box model, and fits an interpretable sparse linear surrogate model locally weighted around the instance.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What game-theoretic concept provides the mathematical foundation for SHAP (SHapley Additive exPlanations) values in feature attribution?",
      "options": [
        {
          "label": "A",
          "text": "The Prisoner's Dilemma payoff matrix.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The Nash equilibrium of zero-sum games.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Pareto optimality in auction design.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Shapley values from cooperative game theory, which fairly allocate total payoff among players based on their average marginal contributions across all possible player coalitions.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What is a \"Counterfactual Explanation\" in Explainable AI?",
      "options": [
        {
          "label": "A",
          "text": "An error message returned when an API key is revoked.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "An explanation that describes the minimum change required in the input features to alter the model's prediction to a desired alternative outcome (e.g., \"If your annual income were $5,000 higher, your loan would have been approved\").",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A deliberate lie generated by an adversarial network.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "An explanation formatted as a comic strip.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "What is \"Data Poisoning\" in adversarial machine learning and security research?",
      "options": [
        {
          "label": "A",
          "text": "Physical contamination of silicon chips in fabrication cleanrooms.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Accidentally inserting null values into SQL tables.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Overheating a GPU by training too many epochs.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "An attack where an adversary injects maliciously crafted data into the training pipeline to degrade model accuracy or introduce specific backdoors/trojans into the trained model.",
          "isCorrect": true
        }
      ]
    }
  ]
};

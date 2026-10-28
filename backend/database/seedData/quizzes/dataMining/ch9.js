/**
 * Chapter 9 Quiz (dataMining)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 9,
  "title": "Chapter 9: Cluster Analysis: Advanced Methods Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "What fundamental premise distinguishes Density-Based clustering algorithms (such as DBSCAN) from distance-based partitioning algorithms (such as k-Means)?",
      "options": [
        {
          "label": "A",
          "text": "Density-based methods require training labels for 10% of the dataset.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Density-based methods only function on 1-dimensional data.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Clusters are regarded as dense regions of objects in data space separated by regions of low density (noise), allowing discovery of arbitrary non-spherical shapes without requiring k.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Density-based methods require all clusters to have equal variance and spherical boundaries.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "In the DBSCAN algorithm, what definition characterizes a \"Core Point\" given neighborhood radius ε and threshold MinPts?",
      "options": [
        {
          "label": "A",
          "text": "A point that lies within distance ε of zero other points.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A point with the lowest Euclidean coordinate in the dataset.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The point that minimizes the global Sum of Squared Errors.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A point p whose ε-neighborhood contains at least MinPts points: |N_ε(p)| ≥ MinPts.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 3,
      "questionText": "In DBSCAN, what defines a \"Border Point\"?",
      "options": [
        {
          "label": "A",
          "text": "A point that is not a core point (|N_ε(p)| < MinPts), but falls within the ε-neighborhood of another core point.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A point whose attributes are all equal to zero.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A point that belongs to multiple clusters simultaneously.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A point located exactly on the boundary of the computer screen.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "How does DBSCAN classify a data point that is neither a core point nor a border point (i.e., not reachable from any core point)?",
      "options": [
        {
          "label": "A",
          "text": "As Noise / Outlier",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "As an apex centroid",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "As a medoid",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "As a support vector",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "In DBSCAN terminology, what does it mean for point p to be \"directly density-reachable\" from point q?",
      "options": [
        {
          "label": "A",
          "text": "p and q have identical coordinate values.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "q is a core point, and p belongs to the ε-neighborhood of q: p ∈ N_ε(q).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "The distance between p and q is greater than 2ε.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "p was processed immediately after q in the database index.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "Why is the relation \"density-reachable\" asymmetric between a core point and a border point in DBSCAN?",
      "options": [
        {
          "label": "A",
          "text": "Because DBSCAN reverses edge directions after each cluster merge.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Because border points are filtered out prior to neighborhood searches.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A border point is density-reachable from a core point, but a core point cannot be density-reachable from a border point because a border point lacks sufficient neighbors to initiate reachability.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Because Euclidean distance is an asymmetric metric.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "What primary challenge does OPTICS (Ordering Points To Identify the Clustering Structure) address that limits DBSCAN?",
      "options": [
        {
          "label": "A",
          "text": "DBSCAN produces only hierarchical tree dendrograms.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "DBSCAN requires calculating matrix inverses in memory.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "DBSCAN struggles with datasets containing clusters of widely differing densities, because a single global (ε, MinPts) parameter set cannot detect both sparse and dense clusters simultaneously.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "DBSCAN cannot compute Euclidean distances.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "What two distance values does the OPTICS algorithm compute for each object to generate its cluster-ordering reachability plot?",
      "options": [
        {
          "label": "A",
          "text": "Core-distance (minimum radius ε' to make the object a core point) and Reachability-distance (with respect to a generating core object).",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Eigenvalue distance and Mahalanobis residual.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Cosine similarity and Jaccard coefficient.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Manhattan distance and Chebyshev distance.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "What is the architectural structure of the STING (Statistical Information Grid) clustering algorithm?",
      "options": [
        {
          "label": "A",
          "text": "It constructs a neural network with 10 recurrent layers.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It divides the spatial area into hierarchical rectangular cells at multiple resolution levels, storing statistical summary parameters (count, mean, stdev, min, max, distribution) in each cell.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "It connects all data points with Delaunay triangulation edges.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It projects high-dimensional data onto random 1D lines.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What is a major performance benefit of STING for large-scale spatial database queries?",
      "options": [
        {
          "label": "A",
          "text": "It eliminates the need for computer monitors.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It requires zero disk storage space.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Query processing time is O(K), where K is the number of grid cells at the bottom layer, making it completely independent of the total number of data objects n.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "It guarantees finding the global maximum margin hyperplane.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "Which algorithm combines grid-based and density-based techniques to find clusters in arbitrary subspaces of high-dimensional data using the Apriori property?",
      "options": [
        {
          "label": "A",
          "text": "BIRCH",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "k-Means++",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "AdaBoost",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "CLIQUE (Clustering In QUEst)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 12,
      "questionText": "In CLIQUE, how is the Apriori (monotonicity) property applied to high-dimensional grid units?",
      "options": [
        {
          "label": "A",
          "text": "Units with more than 5 dimensions are automatically pruned.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Dense units cannot contain any missing values.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "If a grid cell is dense, its coordinates must sum to an even number.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "If a k-dimensional grid cell is dense (exceeding density threshold τ), then all of its projections into (k-1)-dimensional subspaces must also be dense.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 13,
      "questionText": "In a Gaussian Mixture Model (GMM), what does each component cluster k represent mathematically?",
      "options": [
        {
          "label": "A",
          "text": "A support vector hyperplane equation.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A hard discrete boundary polygon in 2D space.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A multivariate Gaussian (normal) probability distribution parameterized by mean vector μ_k, covariance matrix Σ_k, and mixing weight π_k.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A leaf node in a decision tree.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What is the role of the Expectation (E) step in the Expectation-Maximization (EM) algorithm for GMMs?",
      "options": [
        {
          "label": "A",
          "text": "Delete points with probabilities lower than 0.50.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Invert the global covariance matrix to find singular values.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Calculate the posterior probability (responsibility) γ_ik that data point x_i was generated by cluster component k given current parameter estimates.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Randomly shuffle the order of input feature columns.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "What is the role of the Maximization (M) step in the EM algorithm for GMMs?",
      "options": [
        {
          "label": "A",
          "text": "Convert all covariance matrices into identity matrices.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Prune leaf nodes whose variance exceeds a threshold.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Update the model parameters (weights π_k, means μ_k, and covariance matrices Σ_k) using the responsibilities calculated in the E-step to maximize expected log-likelihood.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Increase the learning rate by 10% on each iteration.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "What fundamentally distinguishes \"Soft (Fuzzy) Clustering\" (e.g., Fuzzy C-Means) from \"Hard Clustering\" (e.g., k-Means)?",
      "options": [
        {
          "label": "A",
          "text": "In soft clustering, each data point has a degree of membership u_ik ∈ [0, 1] in every cluster (summing to 1 across clusters), rather than strictly belonging to exactly one cluster.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Hard clustering creates circular clusters, whereas soft clustering creates only lines.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Hard clustering operates only on integer features, while soft clustering works on floats.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Soft clustering requires no distance calculations.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "How is the Davies-Bouldin Index (DBI) interpreted when evaluating clustering quality across different candidate partitionings?",
      "options": [
        {
          "label": "A",
          "text": "DBI values must be negative for valid clusterings.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Higher values always indicate better clustering.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "DBI is independent of cluster compactness.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Lower values indicate superior clustering, reflecting compact clusters with large separation between cluster centers.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What ratio does the Dunn Index measure to evaluate the validity of a clustering partition?",
      "options": [
        {
          "label": "A",
          "text": "The ratio between the smallest inter-cluster distance and the largest intra-cluster diameter (higher values indicate superior clustering).",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "The ratio of training samples to test samples.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The count of clusters divided by the feature dimension count.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The percentage of points classified as noise in DBSCAN.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What is an \"External\" measure of clustering validation (such as Adjusted Rand Index or Normalized Mutual Information)?",
      "options": [
        {
          "label": "A",
          "text": "An audit log check performed by system administrators.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A metric computed solely from the distances between points within the dataset.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A validation metric that compares the discovered clusters against an externally provided, independent ground-truth class labeling.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "A benchmark run on an external cloud server.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "What is an \"Internal\" measure of clustering validation (such as Silhouette Coefficient or Calinski-Harabasz Index)?",
      "options": [
        {
          "label": "A",
          "text": "A validation metric that evaluates the quality of clustering structure using only intrinsic geometric properties of the dataset (compactness and separation) without external labels.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A metric measuring the internal temperature of the CPU.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A validation check comparing student IDs against the university registrar database.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A metric measuring the internal RAM utilization of the database.",
          "isCorrect": false
        }
      ]
    }
  ]
};

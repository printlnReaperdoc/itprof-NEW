/**
 * Chapter 8 Quiz (dataMining)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 8,
  "title": "Chapter 8: Cluster Analysis: Basic Concepts and Methods Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "What is the primary defining characteristic of Cluster Analysis (Clustering) compared to Classification?",
      "options": [
        {
          "label": "A",
          "text": "Clustering requires labeled ground-truth training records to compute gradients.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Clustering is used exclusively for time-series forecasting.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Clustering models cannot be visualized on a 2D plane.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Clustering is an unsupervised learning technique that groups objects based solely on intrinsic similarity without using predefined target class labels.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 2,
      "questionText": "What objective function does the classic k-Means clustering algorithm seek to iteratively minimize?",
      "options": [
        {
          "label": "A",
          "text": "Sum of Squared Errors (SSE) / Within-Cluster Sum of Squares (WCSS) between points and their assigned cluster centroid.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "The maximum Manhattan distance between cluster boundaries.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The cross-entropy loss across all data dimensions.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The total number of non-zero entries in the covariance matrix.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "What are the two alternating steps executed in each iteration of the standard Lloyd's k-Means algorithm?",
      "options": [
        {
          "label": "A",
          "text": "Forward Pass: calculate activations; Backward Pass: compute backpropagation gradients.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Feature Selection Step: drop irrelevant columns; Tree Pruning Step: remove leaf nodes.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Assignment Step: assign each data point to its nearest centroid; Update Step: recompute the centroid of each cluster as the mean of its assigned points.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Sampling Step: extract 10% bootstrap sample; Voting Step: aggregate majority predictions.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "Why is the standard k-Means algorithm sensitive to the initial choice of cluster centroids?",
      "options": [
        {
          "label": "A",
          "text": "Because the algorithm crashes if centroids are not initialized at the origin (0, 0).",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Because centroid coordinates must be prime numbers.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Because k-Means requires manual entry of centroid coordinates by the user.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Because it uses a greedy heuristic that converges to a local minimum of the SSE, which can result in sub-optimal clusterings depending on the starting seed points.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 5,
      "questionText": "How does the k-Means++ initialization algorithm improve upon standard random centroid initialization?",
      "options": [
        {
          "label": "A",
          "text": "It places all k centroids along the main diagonal of the dataset.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It chooses the first centroid uniformly at random, then selects subsequent centroids with probability proportional to the squared distance from the closest already-chosen centroid.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "It trains an SVM classifier to predict optimal initial centroid positions.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It sorts data points by their primary key and selects the first k rows.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "Which cluster shapes and characteristics pose the greatest challenge for standard k-Means algorithms?",
      "options": [
        {
          "label": "A",
          "text": "Globular, well-separated, spherical clusters of equal density.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "2D datasets with fewer than 100 points.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Datasets whose features are all measured in standardized Z-scores.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Non-spherical clusters (e.g., concentric circles or interlocking spirals), clusters of widely varying sizes/densities, and datasets with extreme outliers.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 7,
      "questionText": "What fundamentally distinguishes the k-Medoids algorithm (e.g., PAM) from k-Means?",
      "options": [
        {
          "label": "A",
          "text": "k-Medoids chooses actual representative data objects from the dataset as cluster centers (medoids) rather than calculating an artificial mean point, making it far more robust to outliers.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "k-Medoids creates tree-structured dendrograms.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "k-Medoids operates only on binary categorical data.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "k-Medoids does not require specifying the parameter k.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "What is the computational complexity of the Partitioning Around Medoids (PAM) algorithm per iteration with n objects and k clusters?",
      "options": [
        {
          "label": "A",
          "text": "O(n × k) linear time.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "O(k × (n - k)²), which makes it computationally expensive for very large datasets.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "O(1) constant time.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "O(log n) logarithmic time.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "How does the CLARA (Clustering Large Applications) algorithm enable k-Medoids clustering to scale to large datasets?",
      "options": [
        {
          "label": "A",
          "text": "It converts the entire dataset into a 1-bit hash table.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It draws multiple small representative random samples from the dataset, applies PAM to each sample to find medoids, and selects the medoid set that yields the minimum total cost across the entire dataset.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "It deletes all records with an index greater than 1,000.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It forces k to always equal 2.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What is the difference between Agglomerative and Divisive hierarchical clustering?",
      "options": [
        {
          "label": "A",
          "text": "Agglomerative uses decision trees; Divisive uses neural networks.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Agglomerative is a bottom-up approach that starts with each object as an individual cluster and successively merges closest pairs; Divisive is top-down, starting with all objects in one cluster and recursively splitting.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Agglomerative creates overlapping clusters; Divisive creates non-overlapping clusters.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Agglomerative operates on text data; Divisive operates on numeric data.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What is a \"Dendrogram\" in hierarchical clustering?",
      "options": [
        {
          "label": "A",
          "text": "A histogram displaying the frequency of words in a document.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A network diagram showing database table foreign key relationships.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A scatter plot of residuals from a regression model.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A tree diagram showing the sequence of nested cluster merges (or splits) and the distance/similarity level at which each merge occurred.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 12,
      "questionText": "In agglomerative hierarchical clustering, how does \"Single Linkage\" define the distance between two clusters A and B?",
      "options": [
        {
          "label": "A",
          "text": "The average distance between all pairs of points in A and B.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The maximum distance between any point in A and any point in B.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The minimum distance between any single point in A and any single point in B: dist(A, B) = min { d(x, y) : x ∈ A, y ∈ B }.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "The distance between the coordinate origins of A and B.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "What well-known undesirable phenomenon is Single Linkage agglomerative clustering susceptible to?",
      "options": [
        {
          "label": "A",
          "text": "The \"chaining effect\", where a thin chain of noisy intermediate points causes two distinct elongated clusters to erroneously merge.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "The vanishing gradient problem.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Generating only perfectly circular spherical clusters.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Deadlocks in database transactions.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "How does \"Complete Linkage\" define the distance between two clusters A and B in hierarchical clustering?",
      "options": [
        {
          "label": "A",
          "text": "The Euclidean distance between medoids.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The minimum distance between nearest neighbors.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The maximum distance between any point in A and any point in B: dist(A, B) = max { d(x, y) : x ∈ A, y ∈ B }.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "The difference between the cluster sample sizes.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "What is the objective of \"Ward's Method\" in agglomerative hierarchical clustering?",
      "options": [
        {
          "label": "A",
          "text": "To minimize the count of categorical attributes.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "To ensure all clusters contain an odd number of data samples.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "To merge the pair of clusters that leads to the minimum increase in total within-cluster variance (Sum of Squared Errors).",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "To maximize the total perimeter of bounding boxes.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "How is the \"Elbow Method\" used to help select an appropriate number of clusters k in k-Means?",
      "options": [
        {
          "label": "A",
          "text": "By running the algorithm until CPU temperature exceeds 70°C.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "By counting the number of columns in the raw CSV file.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "By plotting the Sum of Squared Errors (SSE) against increasing values of k and identifying the \"elbow\" point where the rate of decrease abruptly bends and levels off.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "By finding the value of k where SSE reaches exactly 0.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "How is the Silhouette Coefficient s(i) for an individual data point i calculated, given its average intra-cluster distance a(i) and smallest average distance to another cluster b(i)?",
      "options": [
        {
          "label": "A",
          "text": "s(i) = a(i) / b(i)",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "s(i) = b(i) - a(i)",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "s(i) = [ a(i) + b(i) ] / 2",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "s(i) = [ b(i) - a(i) ] / max(a(i), b(i))",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What does a Silhouette Coefficient close to +1.0 for a data point indicate regarding its cluster assignment?",
      "options": [
        {
          "label": "A",
          "text": "The point is highly well-clustered, lying deep inside its own cluster and far away from neighboring clusters.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "The point lies directly on the border between two clusters.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The point was misclassified and belongs in a neighboring cluster.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The point is a missing value that should be discarded.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What does a negative Silhouette Coefficient (near -1.0) for a data point indicate?",
      "options": [
        {
          "label": "A",
          "text": "The distance metric was computed using Manhattan distance instead of Euclidean.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The point is closer to objects in a neighboring cluster than to objects in its assigned cluster, indicating likely misclustering.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "The point is the perfect centroid of the entire dataset.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The point has zero distance to all other points.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "In BIRCH (Balanced Iterative Reducing and Clustering using Hierarchies), what compact data structure summarizes cluster subclusters in memory?",
      "options": [
        {
          "label": "A",
          "text": "Clustering Feature (CF) Tree storing 3-tuples: (N, LS, SS) where N is number of points, LS is linear sum, and SS is square sum of data points.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Adjacency list of support vectors.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Recurrent Neural Network hidden states.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "B+ Tree index of string labels.",
          "isCorrect": false
        }
      ]
    }
  ]
};

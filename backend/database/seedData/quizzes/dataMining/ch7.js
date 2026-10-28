/**
 * Chapter 7 Quiz (dataMining)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 7,
  "title": "Chapter 7: Classification: Advanced Methods Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "What is the primary geometric objective of a linear Support Vector Machine (SVM) when finding a separating hyperplane between two classes?",
      "options": [
        {
          "label": "A",
          "text": "To ensure that all training points lie on the exact same coordinate axis.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "To minimize the total number of features used in the equation.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "To maximize the entropy of the decision boundary.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "To maximize the margin (the perpendicular distance between the hyperplane and the closest training points of any class).",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 2,
      "questionText": "In SVM terminology, what are \"support vectors\"?",
      "options": [
        {
          "label": "A",
          "text": "The weights assigned to the neural network bias nodes.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The training instances that lie closest to the decision boundary and directly define the orientation and position of the optimal hyperplane.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "The columns of the dataset with the highest correlation to the target.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The outliers that are removed before model training starts.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "In soft-margin SVM, what does the regularization parameter C control?",
      "options": [
        {
          "label": "A",
          "text": "The learning rate of the gradient descent optimizer.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The trade-off between maximizing the margin width and minimizing training classification errors (slack variable penalties).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "The number of trees in the random forest.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The maximum depth of decision trees.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "What is the \"Kernel Trick\" in Support Vector Machines?",
      "options": [
        {
          "label": "A",
          "text": "Replacing support vectors with random cluster centroids.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Deleting all non-linear features before solving convex quadratic programming.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Bypassing the operating system kernel to accelerate GPU calculations.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Computing dot products in a high-dimensional feature space using an implicit kernel function K(x, z) without explicitly transforming data into that higher-dimensional space.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 5,
      "questionText": "Which kernel function maps input vectors into an infinite-dimensional Hilbert feature space based on Euclidean distance: K(x, z) = exp(-γ ||x - z||²)?",
      "options": [
        {
          "label": "A",
          "text": "Radial Basis Function (RBF / Gaussian) kernel",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Polynomial kernel",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Linear kernel",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Sigmoid kernel",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "What is the core principle of Ensemble Learning?",
      "options": [
        {
          "label": "A",
          "text": "Training one very complex model until training error reaches zero.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Combining the predictions of multiple base models to produce a single final prediction that is generally more accurate, robust, and stable than any individual constituent model.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Converting numerical features into text strings before training.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Running an algorithm on an ensemble of different operating systems.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "How are training datasets created for individual base learners in Bagging (Bootstrap Aggregating)?",
      "options": [
        {
          "label": "A",
          "text": "By discarding 50% of the minority class instances.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "By splitting the dataset into non-overlapping sequential chunks.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "By sampling n instances uniformly at random WITH replacement from the original dataset of size n.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "By selecting only the top-10 principal components.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "In a standard bootstrap sample of size n drawn with replacement, approximately what percentage of unique original training instances are included in each sample?",
      "options": [
        {
          "label": "A",
          "text": "Exactly 75.0%",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "100% of all instances",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "About 50.0%",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "About 63.2% (with the remaining ~36.8% forming the Out-Of-Bag / OOB set)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 9,
      "questionText": "What additional randomization mechanism does Random Forest introduce on top of standard Bagging to decorrelate individual decision trees?",
      "options": [
        {
          "label": "A",
          "text": "It randomly assigns trees to use regression instead of classification.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It shuffles the order of training epochs.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "At each candidate split node, it considers only a random subset of m features (typically m ≈ √p) rather than all p features.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "It randomly flips 10% of the training labels.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "How can the Out-Of-Bag (OOB) samples in Random Forest be utilized without requiring a separate validation dataset?",
      "options": [
        {
          "label": "A",
          "text": "To re-train the root node of the forest.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "To estimate out-of-sample generalization error and feature importance, because each tree never saw its corresponding OOB samples during training.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "To replace missing database records.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "To compute the learning rate of the neural network.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What is the fundamental difference between Bagging and Boosting ensemble paradigms?",
      "options": [
        {
          "label": "A",
          "text": "Bagging trains base learners in parallel on independent bootstrap samples; Boosting trains base learners sequentially, where each new learner focuses on instances misclassified by earlier learners.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "There is no difference; Bagging is just another term for Boosting.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Boosting averages predictions equally, while Bagging uses genetic algorithms.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Bagging works only for regression, whereas Boosting works only for clustering.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "How does the AdaBoost algorithm adaptively adjust instance weights after each round of base classifier training?",
      "options": [
        {
          "label": "A",
          "text": "It increases the weights of misclassified instances and decreases the weights of correctly classified instances.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "It doubles the weights of all training records.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It sets all instance weights to 1.0.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It randomly deletes misclassified instances.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "In Gradient Boosting Machines (GBM), what target does each successive decision tree attempt to predict?",
      "options": [
        {
          "label": "A",
          "text": "The original raw class labels.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The pseudo-residuals (negative gradient of the loss function with respect to the current ensemble model predictions).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A random Gaussian noise vector.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The eigenvalues of the input data matrix.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What algorithmic enhancement enables XGBoost to achieve superior speed and accuracy over traditional Gradient Boosting?",
      "options": [
        {
          "label": "A",
          "text": "Restricting model training to exactly 10 iterations.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Eliminating all tree depth limits.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Second-order Taylor expansion (gradients and Hessians) of the objective function, formal tree complexity regularization (L1/L2), and parallelized quantile histogram sketch finding.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Replacing decision trees with single-layer perceptrons.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "What tree growth strategy is employed by LightGBM to accelerate training compared to traditional depth-wise level-by-level growth?",
      "options": [
        {
          "label": "A",
          "text": "Exhaustive combinatorial branch search.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Depth-first search restricted to left children only.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Leaf-wise (best-first) tree growth, expanding the leaf that provides the largest loss reduction.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Random breadth-first traversal.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "How does the Synthetic Minority Over-sampling Technique (SMOTE) address class imbalance without creating exact duplicate minority records?",
      "options": [
        {
          "label": "A",
          "text": "It flips majority class labels to minority class labels.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It randomly duplicates existing minority samples with replacement.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It creates synthetic instances along the line segments connecting minority class instances to their k-nearest minority neighbors in feature space.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "It deletes all instances of the majority class.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "What is a major drawback of Random Under-Sampling (RUS) when dealing with severely imbalanced datasets?",
      "options": [
        {
          "label": "A",
          "text": "It creates synthetic data points with corrupted feature labels.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It increases training time by a factor of 100.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It causes severe overfitting on the training set.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It discards potentially valuable informative samples from the majority class, potentially causing the model to underfit.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 18,
      "questionText": "In cost-sensitive classification, how is the learning process modified to handle imbalanced or asymmetric mistake costs (e.g., missing a cancer diagnosis vs. false alarm)?",
      "options": [
        {
          "label": "A",
          "text": "The classification threshold is permanently locked at 0.50.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A cost matrix C(i, j) is integrated into the loss function to heavily penalize high-consequence classification errors (such as False Negatives).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "All mistakes are penalized by exactly $1.00.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The model outputs predictions without computing probabilities.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What is \"Stacking\" (Stacked Generalization) in ensemble learning?",
      "options": [
        {
          "label": "A",
          "text": "Piling multiple hard drives on top of each other in a server rack.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Training multiple heterogeneous base models, whose out-of-fold predictions are used as input features to train a higher-level meta-classifier.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Running decision trees in reverse order.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Averaging the weights of neural networks with identical architectures.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "What does the \"bias-variance tradeoff\" dictate regarding model complexity in classification algorithms?",
      "options": [
        {
          "label": "A",
          "text": "High variance indicates the model is too simple.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Bias is a hardware clock error in GPUs.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Models with high bias underfit the data (oversimplified), while models with high variance overfit the data (excessively sensitive to training noise); optimal models minimize the sum of both.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Bias and variance can both be reduced to zero simultaneously with sufficient data.",
          "isCorrect": false
        }
      ]
    }
  ]
};

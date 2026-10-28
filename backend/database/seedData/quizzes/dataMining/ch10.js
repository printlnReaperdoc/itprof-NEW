/**
 * Chapter 10 Quiz (dataMining)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 10,
  "title": "Chapter 10: Deep Learning Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "What fundamental limitation of the single-layer perceptron, demonstrated by Marvin Minsky and Seymour Papert in 1969, temporarily stalled neural network research?",
      "options": [
        {
          "label": "A",
          "text": "Its inability to process floating-point arithmetic.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Its requirement for quantum computing hardware.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Its inability to execute the AND logic gate.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Its mathematical inability to learn non-linearly separable logic functions such as the XOR (Exclusive OR) problem.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 2,
      "questionText": "What does the Universal Approximation Theorem state regarding Multilayer Perceptrons (feedforward networks)?",
      "options": [
        {
          "label": "A",
          "text": "A feedforward network with a single hidden layer containing a finite number of non-linear neurons can approximate any continuous function on compact subsets of R^n to arbitrary accuracy.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Deep networks never suffer from overfitting.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Any neural network can compute output values in zero time.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Neural networks eliminate the need for training data.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "What is the \"Vanishing Gradient Problem\" that historically impeded training of deep neural networks using Sigmoid or Tanh activation functions?",
      "options": [
        {
          "label": "A",
          "text": "The loss function becomes non-differentiable at the origin.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The network forgets its learning rate.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "During backpropagation, error gradients computed via the chain rule are repeatedly multiplied by derivatives that saturate near zero for extreme inputs, causing gradients to shrink exponentially as they propagate back to early layers.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "The weights of the output layer explode to positive infinity.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "Why did the Rectified Linear Unit (ReLU: f(x) = max(0, x)) become the dominant activation function in deep neural network hidden layers?",
      "options": [
        {
          "label": "A",
          "text": "It is a smooth, differentiable sigmoid curve everywhere.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It bounds all neuron activations between -1 and +1.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It completely prevents all model overfitting.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Its derivative is a constant 1.0 for all positive inputs (x > 0), avoiding gradient saturation and dramatically speeding up gradient descent convergence with cheap computation.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 5,
      "questionText": "What is the \"Dying ReLU\" problem, and how does the Leaky ReLU activation function mitigate it?",
      "options": [
        {
          "label": "A",
          "text": "Neurons whose inputs become negative output zero and have zero gradient, permanently disabling weight updates; Leaky ReLU introduces a small non-zero slope (e.g., 0.01x) for x < 0 to keep gradients alive.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Neurons consume excessive electricity; Leaky ReLU limits power draw.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Network weights drift to NaN; Leaky ReLU rounds numbers to 32 bits.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The learning rate decays to zero too quickly.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "Which activation function is standardly applied to the output layer of a multi-class neural network classifier with K mutually exclusive classes to output a normalized probability distribution?",
      "options": [
        {
          "label": "A",
          "text": "Hyperbolic Tangent (Tanh)",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Standard ReLU",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Softmax: σ(z)_i = exp(z_i) / ∑ exp(z_j)",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Sigmoid",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "Which loss function is the standard choice when training a multi-class classification neural network paired with a Softmax output layer?",
      "options": [
        {
          "label": "A",
          "text": "Cosine Distance Loss",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Hinge Loss",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Categorical Cross-Entropy Loss: L = -∑ [y_i × log(p_i)]",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Mean Squared Error (MSE)",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "What mathematical rule from differential calculus serves as the foundation for the Backpropagation algorithm to compute partial derivatives of the loss with respect to every weight in the network?",
      "options": [
        {
          "label": "A",
          "text": "The Chain Rule of Calculus",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "L'Hôpital's Rule",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The Product Rule for prime numbers",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Cauchy's Integral Formula",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "In neural network optimization, how does Stochastic Gradient Descent (SGD) with Mini-Batches balance computational efficiency and gradient stability?",
      "options": [
        {
          "label": "A",
          "text": "It computes the gradient and updates weights over a small subset (e.g., 32, 64, or 128 samples) of the training set at each step, balancing the speed of SGD with the smoothed variance of full-batch descent.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "It calculates gradients on only one sample per training year.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It computes gradients over the entire test dataset.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It requires calculating the full Hessian matrix at every step.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What is the key mechanism of the Adam (Adaptive Moment Estimation) optimizer that makes it widely popular in deep learning?",
      "options": [
        {
          "label": "A",
          "text": "It fixes the learning rate at 0.50 regardless of data scale.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It eliminates the need for computing gradients entirely.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It adjusts the weights using genetic evolution crossover.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "It computes adaptive learning rates for each parameter by maintaining exponentially decaying moving averages of both past gradients (first moment) and squared gradients (second uncentered moment).",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What is the primary role of a Convolutional Layer in a Convolutional Neural Network (CNN)?",
      "options": [
        {
          "label": "A",
          "text": "To extract local spatial features (such as edges, textures, and patterns) using learnable filter kernels that slide across the input with shared weights, preserving 2D/3D spatial topology.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "To sort pixels in ascending order of brightness.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "To convert color images into monochrome sound waves.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "To connect every single pixel to every single output neuron.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "What is the purpose of Max Pooling layers in CNN architectures?",
      "options": [
        {
          "label": "A",
          "text": "To downsample spatial dimensions (reducing width and height) of feature maps, which reduces computational parameters and provides a degree of spatial translation invariance.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "To encrypt feature vectors before disk storage.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "To compute the loss gradient with respect to input pixels.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "To initialize the neural network weights to maximum values.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "In a CNN with a 32×32 input image and a 5×5 convolution filter with stride = 1 and NO padding (\"valid\" padding), what are the spatial dimensions of the resulting feature map?",
      "options": [
        {
          "label": "A",
          "text": "32×32",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "28×28 (Formula: (W - F + 2P)/S + 1 = (32 - 5 + 0)/1 + 1 = 28)",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "30×30",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "27×27",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "How does Dropout regularization prevent overfitting in deep neural networks during training?",
      "options": [
        {
          "label": "A",
          "text": "By randomly setting a fraction p (e.g., 20% to 50%) of neuron activations to zero during each forward training pass, forcing neurons to learn robust features without co-adapting.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "By stopping training after exactly 5 minutes.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "By dropping the lowest 10% of training data samples.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "By permanently deleting layers from the neural network architecture.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "What fundamental capability enables Recurrent Neural Networks (RNNs) to process sequential data such as natural language or time series?",
      "options": [
        {
          "label": "A",
          "text": "Converting text into random integer hashes.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Requiring all input sequences to have identical length of 10 tokens.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Cyclical internal feedback connections that maintain a hidden state vector h_t acting as an internal memory of past inputs.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "The use of decision tree split rules.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "What specific mechanism in Long Short-Term Memory (LSTM) networks prevents the vanishing gradient problem across long temporal dependencies?",
      "options": [
        {
          "label": "A",
          "text": "Applying Batch Normalization directly to output tokens.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A linear Cell State (C_t) governed by regulated multiplicative gating mechanisms (Forget gate, Input gate, and Output gate).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Replacing backpropagation with simulated annealing.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Eliminating all hidden state vectors.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "How does a Gated Recurrent Unit (GRU) differ structurally from a standard LSTM?",
      "options": [
        {
          "label": "A",
          "text": "A GRU cannot process sequential text data.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A GRU contains 5 additional gates.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A GRU can only be trained on CPU hardware.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A GRU merges the cell state and hidden state, and replaces the three gates with two gates (Reset gate and Update gate), making it computationally simpler and faster.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What revolutionary architectural paradigm introduced in the paper \"Attention Is All You Need\" (Vaswani et al., 2017) completely replaced recurrence in state-of-the-art NLP models?",
      "options": [
        {
          "label": "A",
          "text": "Self-Organizing Maps (SOM)",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Radial Basis Function Networks",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Deep Belief Networks (DBN)",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The Transformer architecture based entirely on Self-Attention mechanisms without any recurrent or convolutional layers.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 19,
      "questionText": "In the Scaled Dot-Product Attention equation Attention(Q, K, V) = softmax((Q K^T) / √d_k) V, what do Q, K, and V represent?",
      "options": [
        {
          "label": "A",
          "text": "Quality score, Knowledge base, and Verification flag.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Queries (Q), Keys (K), and Values (V) vectors projected from the input embeddings.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Quantum state, Kinetic energy, and Velocity.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Quantization factor, Kernel width, and Variance.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "Why is Positional Encoding injected into input embeddings in Transformer models?",
      "options": [
        {
          "label": "A",
          "text": "Because self-attention operations are permutation-equivariant and possess no inherent concept of word order or sequence position without explicit positional signals.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "To reduce the vocabulary size of the language model.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "To encrypt token embeddings against adversarial attacks.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "To convert words into geographical GPS coordinates.",
          "isCorrect": false
        }
      ]
    }
  ]
};

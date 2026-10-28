/**
 * Chapter 3 Quiz (dataMining)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 3,
  "title": "Chapter 3: Data Warehousing and Online Analytical Processing (OLAP) Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "According to William H. Inmon, which four key characteristics define a data warehouse?",
      "options": [
        {
          "label": "A",
          "text": "Subject-oriented, integrated, time-variant, and non-volatile",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Distributed, ACID-compliant, real-time, and volatile",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Unstructured, schema-less, federated, and dynamic",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Normalized, transactional, low-latency, and row-oriented",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 2,
      "questionText": "How does an Online Transaction Processing (OLTP) database differ fundamentally from an Online Analytical Processing (OLAP) data warehouse?",
      "options": [
        {
          "label": "A",
          "text": "OLTP focuses on day-to-day operations with highly normalized short transactions, whereas OLAP supports complex decision-support queries over historical multidimensional data.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "OLTP is optimized for heavy ad-hoc aggregations across millions of rows, while OLAP handles small insert/update transactions.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "OLTP stores historical snapshots, while OLAP retains only currently active records.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "OLTP uses multidimensional arrays, while OLAP uses flat text files exclusively.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 3,
      "questionText": "In a Star Schema design for a data warehouse, what is the architectural relationship between tables?",
      "options": [
        {
          "label": "A",
          "text": "A hierarchy of normalized dimension tables with no centralized fact table.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A single centralized fact table directly referenced by multiple de-normalized dimension tables.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A peer-to-peer network of flat tables connected by circular foreign keys.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A collection of independent entity tables with no foreign key references.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 4,
      "questionText": "What is the primary architectural difference between a Snowflake Schema and a Star Schema?",
      "options": [
        {
          "label": "A",
          "text": "The star schema normalizes all dimensions, whereas the snowflake schema stores everything in one table.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The snowflake schema normalizes its dimension tables into sub-dimension hierarchies to reduce redundancy.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Snowflake schemas can only be queried using Python rather than SQL.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The snowflake schema completely eliminates the centralized fact table.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "What constitutes a \"Fact Constellation\" or galaxy schema?",
      "options": [
        {
          "label": "A",
          "text": "A single dimension table shared across multiple unrelated transactional applications.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Multiple fact tables sharing common (\"conformed\") dimension tables across business processes.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A data warehouse model with zero dimension tables.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "An unstructured document store modeled after graph databases.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "Which OLAP operation performs aggregation along a dimension by climbing up a concept hierarchy or reducing dimensions (e.g., aggregating daily sales into quarterly sales)?",
      "options": [
        {
          "label": "A",
          "text": "Slice",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Pivot",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Drill-down",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Roll-up (drill-up)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 7,
      "questionText": "Which OLAP operation navigates from less detailed data to more detailed data along a dimension hierarchy (e.g., viewing monthly sales broken down by individual stores)?",
      "options": [
        {
          "label": "A",
          "text": "Roll-up",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Dice",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Consolidation",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Drill-down",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 8,
      "questionText": "What does the \"Slice\" operation perform on a multidimensional data cube?",
      "options": [
        {
          "label": "A",
          "text": "Rotates the axes of the cube to give an alternative presentation.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Performs a selection on one dimension resulting in a sub-cube with one fewer dimension.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Selects a sub-cube by specifying conditions on two or more dimensions.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Calculates the overall sum of all fact records in the warehouse.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "What does the \"Dice\" operation perform on a multidimensional data cube?",
      "options": [
        {
          "label": "A",
          "text": "Sorts dimension attributes in descending alphabetical order.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Replaces missing numerical measures with zeros.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Defines a sub-cube by applying predicate selections across two or more dimensions.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Converts categorical dimension keys into hash indices.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "Which OLAP operation rotates the data axes in view to provide an alternative visual presentation of the multidimensional data?",
      "options": [
        {
          "label": "A",
          "text": "Drill-across",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Pivot (rotate)",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Slicing",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Drill-through",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "In a multidimensional data cube with n dimensions, how many total cuboids exist in the complete lattice of cuboids?",
      "options": [
        {
          "label": "A",
          "text": "2^n",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "n²",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "2n + 1",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "n!",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "What is the \"apex cuboid\" (0-D cuboid) in a multidimensional data cube lattice?",
      "options": [
        {
          "label": "A",
          "text": "The error log table created during ETL extraction.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "The dimension table with the highest cardinality.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The highest-level summary containing the grand total across all dimensions (often labeled \"all\").",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "The base cuboid holding the raw, unaggregated transaction rows.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 13,
      "questionText": "Which OLAP architecture physically stores multidimensional data using dedicated multidimensional array storage structures rather than relational tables?",
      "options": [
        {
          "label": "A",
          "text": "HOLAP (Hybrid OLAP)",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "ROLAP (Relational OLAP)",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "DOLAP (Desktop OLAP)",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "MOLAP (Multidimensional OLAP)",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What is the defining characteristic of ROLAP (Relational OLAP) servers?",
      "options": [
        {
          "label": "A",
          "text": "They store both detailed and aggregated data inside relational database tables (using star/snowflake schemas) and translate OLAP operations into SQL.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "They load all raw data into precomputed memory matrix arrays only.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "They require no relational DBMS and execute queries using direct filesystem offsets.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "They cannot handle historical time-variant data.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "Why are surrogate keys (system-generated artificial integer keys) used as primary keys in dimension tables instead of operational natural keys?",
      "options": [
        {
          "label": "A",
          "text": "Database engines cannot execute join operations on text strings.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Operational keys frequently change, get reused, or lack historical versioning across slowly changing dimensions.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Surrogate keys eliminate the need for foreign key constraints in fact tables.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Natural keys are prohibited under ANSI SQL standards.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "In Slowly Changing Dimensions (SCD), which technique (Type 2) preserves complete historical accuracy when an attribute changes (e.g., an employee moves departments)?",
      "options": [
        {
          "label": "A",
          "text": "Deleting all past transactions associated with the customer.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Adding a \"previous_value\" column to the existing row without adding new rows.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Inserting a new dimension row with a new surrogate key, effective start date, and end date.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Overwriting the existing value in-place, losing all historical context.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "Which category of fact measures can be summed up across any and all dimensions in the data cube (e.g., dollars_sold, units_sold)?",
      "options": [
        {
          "label": "A",
          "text": "Derived qualitative metrics",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Non-additive measures (e.g., unit price or ratio)",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Semi-additive measures (e.g., account balance across time)",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Additive measures",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What indexing structure is highly efficient in data warehousing for dimension attributes with low cardinality (few distinct values, such as gender or marital status)?",
      "options": [
        {
          "label": "A",
          "text": "R-Tree Index",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Hash Index",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Bitmap Index",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "B+ Tree Index",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What is a \"Data Mart\"?",
      "options": [
        {
          "label": "A",
          "text": "A staging area where raw data is dumped before virus scanning.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A departmental subset of a data warehouse focused on a specific business unit or single functional area (e.g., Marketing or Payroll).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A commercial retail website where organizations sell datasets to the public.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "An archival tape drive stored offsite for disaster recovery.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "In data warehousing ETL pipelines, what does the \"Transformation\" stage accomplish?",
      "options": [
        {
          "label": "A",
          "text": "Generating final PDF reports for corporate executives.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Compressing database backups into encrypted zip archives.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Physically purchasing additional server hardware.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Cleaning, normalizing, reconciling discrepancies, deduplicating, and standardizing diverse source data into a unified schema.",
          "isCorrect": true
        }
      ]
    }
  ]
};

/**
 * Chapter 11 Quiz (cloudComputing)
 * Exactly 20 Questions
 */

module.exports = {
  "chapterNumber": 11,
  "title": "Chapter 11: Cloud Governance, Cost Management, and Ethics Assessment",
  "questions": [
    {
      "position": 1,
      "questionText": "What is \"FinOps\" (Cloud Financial Operations) in enterprise cloud management?",
      "options": [
        {
          "label": "A",
          "text": "An algorithm that automatically invests company funds into the stock market.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A cloud provider department that audits employee tax returns.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A specialized accounting spreadsheet macro created in Excel.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "An operational cultural framework and practice that brings financial accountability to the variable spend model of cloud, enabling cross-functional teams (engineering, finance, business) to make data-driven spending decisions.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 2,
      "questionText": "What are the three iterative phases of the standard FinOps lifecycle?",
      "options": [
        {
          "label": "A",
          "text": "Audit, Penalize, Terminate.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Design, Code, Test.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Purchase, Deploy, Discard.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Inform (visibility & allocation), Optimize (rates & usage), and Operate (continuous execution & governance).",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 3,
      "questionText": "Which cloud purchasing model offers the highest flexibility with zero upfront commitment and hourly/per-second billing, but charges the highest standard baseline rate?",
      "options": [
        {
          "label": "A",
          "text": "3-Year Standard Reserved Instances",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Spot Instances",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Compute Savings Plans",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "On-Demand / Pay-As-You-Go pricing",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 4,
      "questionText": "How do \"Reserved Instances\" (RIs) and \"Savings Plans\" achieve significant cloud cost discounts (often up to 72%) over On-Demand rates?",
      "options": [
        {
          "label": "A",
          "text": "By committing to a consistent amount of compute usage or monetary spend (measured in $/hour) for a 1-year or 3-year term.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "By limiting internet bandwidth to 10 Mbps.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "By displaying cloud provider advertisements on the company website.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "By agreeing to run servers only on national holidays.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 5,
      "questionText": "What defines a \"Spot Instance\" (or Spot VM) in cloud compute economics?",
      "options": [
        {
          "label": "A",
          "text": "An instance that only runs during nighttime hours.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Purchasing unused spare cloud computing capacity at steep discounts (up to 90%), with the trade-off that the cloud provider can reclaim the instance with a 2-minute warning when capacity is needed by On-Demand users.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A physical server with painted polka dots.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A dedicated server reserved permanently for a single employee.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 6,
      "questionText": "Which type of workload is ideal for deployment on Spot Instances?",
      "options": [
        {
          "label": "A",
          "text": "Mission-critical relational database master nodes (e.g., healthcare core database).",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Stateless, fault-tolerant, batch processing, or distributed big data jobs (such as video rendering, CI/CD builds, or scientific simulations) that can withstand unexpected instance termination.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Real-time financial payment transaction processing engines.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Hardware emergency 911 dispatch telephony servers.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 7,
      "questionText": "Why is a comprehensive \"Cost Allocation Tagging\" policy (e.g., Environment, Owner, CostCenter, Project) critical for enterprise cloud governance?",
      "options": [
        {
          "label": "A",
          "text": "It prevents hard drives from running out of disk space.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "It increases CPU clock speed by 15%.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "It allows organizations to accurately attribute, categorize, and track cloud infrastructure costs down to specific departments, applications, or business units for showback/chargeback accounting.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Tags are mandatory for the Linux kernel to boot.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 8,
      "questionText": "What is the difference between \"Showback\" and \"Chargeback\" in enterprise cloud cost reporting?",
      "options": [
        {
          "label": "A",
          "text": "Showback applies to public clouds; Chargeback applies to private clouds.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Showback provides visibility by showing business units their actual cloud spend without billing them; Chargeback actually debits/transfers financial costs against each department's internal budget ledger.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Showback requires manual cash payments.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Chargeback is an illegal banking practice.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 9,
      "questionText": "In cloud governance, how do \"Guardrails\" differ from traditional bureaucratic \"Gates\"?",
      "options": [
        {
          "label": "A",
          "text": "Guardrails are automated, policy-as-code boundaries (e.g., SCPs, Azure Policies) that let developers deploy rapidly within safe parameters; Gates are manual approval bottlenecks that halt deployment workflows.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Guardrails only apply to software written in JavaScript.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Guardrails are physical metal fences built around server buildings.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Gates are software programs that automatically delete code.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 10,
      "questionText": "What is \"Power Usage Effectiveness\" (PUE) in data center energy efficiency benchmarking?",
      "options": [
        {
          "label": "A",
          "text": "The ratio of total facility energy consumed (including cooling, lighting, and power distribution) to the energy consumed specifically by the computing IT equipment: PUE = Total Energy / IT Energy.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "The number of power cords plugged into a server rack.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "The price of electricity charged per kilowatt-hour.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "The voltage rating of server power supplies.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 11,
      "questionText": "What is the theoretical ideal Power Usage Effectiveness (PUE) score for a perfectly efficient data center?",
      "options": [
        {
          "label": "A",
          "text": "0.0",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "1.0 (indicating that 100% of all electrical power entering the facility goes directly to powering computing hardware with zero overhead waste).",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "10.0",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "100.0",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 12,
      "questionText": "Under the Greenhouse Gas (GHG) Protocol, how are \"Scope 3\" carbon emissions defined in the context of cloud computing adoption?",
      "options": [
        {
          "label": "A",
          "text": "Carbon emissions captured by trees planted around the office.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Emissions produced by employee personal automobiles.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Direct emissions from burning fuel in company-owned delivery trucks.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Indirect value-chain emissions, including the embodied carbon from manufacturing, transporting, and disposing of cloud server hardware and data center infrastructure.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 13,
      "questionText": "Why do major cloud hyper-scalers (AWS, Microsoft, Google) achieve dramatically lower carbon footprints than average on-premises corporate data centers?",
      "options": [
        {
          "label": "A",
          "text": "Public clouds are exempt from environmental reporting laws.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Cloud data centers do not use any electricity.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Aggressive purchasing of 100% renewable energy (wind, solar), highly optimized PUE (often ~1.1 vs ~1.7 industry average), custom efficient server designs, and server utilization rates of 65%+ vs 15% on-prem.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "Cloud providers run servers only when temperatures are cold.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 14,
      "questionText": "What metric evaluates the volume of water consumed for evaporative cooling per kilowatt-hour of IT equipment energy in data centers?",
      "options": [
        {
          "label": "A",
          "text": "Water Usage Effectiveness (WUE)",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Hydraulic Flow Coefficient",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Carbon Utilization Index (CUI)",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Power Usage Effectiveness (PUE)",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 15,
      "questionText": "What is \"Zombie / Idle Resource Waste\" in cloud infrastructure management?",
      "options": [
        {
          "label": "A",
          "text": "Orphaned or unattached cloud resources (e.g., unattached EBS volumes, unassociated Elastic IPs, idle test VMs left running indefinitely) that generate monthly charges while delivering zero business value.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "A hard drive that has been physically shredded.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Dead servers stored in an IT graveyard.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Malware that infects computers on Halloween.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 16,
      "questionText": "What is the role of Policy-as-Code tools (such as Open Policy Agent / OPA or AWS CloudFormation Guard) in automated cloud governance?",
      "options": [
        {
          "label": "A",
          "text": "To encrypt employee chat messages.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "To format source code indentation according to PEP 8.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "To programmatically define, enforce, and validate compliance rules (e.g., \"All S3 buckets must be encrypted\" or \"No instances in public subnets\") directly in CI/CD deployment pipelines before infrastructure is provisioned.",
          "isCorrect": true
        },
        {
          "label": "D",
          "text": "To write marketing press releases for new software features.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 17,
      "questionText": "What is \"Data Center E-Waste\" (electronic waste) and what ethical circular economy practice do responsible cloud providers follow to mitigate it?",
      "options": [
        {
          "label": "A",
          "text": "Corrupted database records caused by syntax errors.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "Discarded electronic server hardware; providers sanitize, refurbish, resell usable server components, and recycle raw precious metals rather than dumping decommissioned hardware in landfills.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "Unused emails left in customer inboxes.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Temporary internet cache files stored on hard drives.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 18,
      "questionText": "What is a \"Cloud Cost Anomaly Detection\" system designed to alert engineering teams about?",
      "options": [
        {
          "label": "A",
          "text": "A keyboard key sticking on an employee laptop.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A drop in the company stock price.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "A change in corporate management.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "Sudden, unexpected spikes in daily spend (e.g., a runaway recursive lambda function or an unindexed database query) that deviate statistically from baseline historical spending patterns.",
          "isCorrect": true
        }
      ]
    },
    {
      "position": 19,
      "questionText": "What ethical and technical concern arises when cloud AI training clusters consume megawatts of electricity in regions with fossil-fuel-heavy electric grids?",
      "options": [
        {
          "label": "A",
          "text": "Substantial localized carbon emissions and environmental impact, driving the need for \"green computing\" initiatives and scheduling intensive training runs in regions with surplus renewable energy.",
          "isCorrect": true
        },
        {
          "label": "B",
          "text": "Servers losing their mathematical accuracy.",
          "isCorrect": false
        },
        {
          "label": "C",
          "text": "Fiber optic cables melting under high data throughput.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "AI models becoming hostile toward human operators.",
          "isCorrect": false
        }
      ]
    },
    {
      "position": 20,
      "questionText": "What is a \"Landing Zone\" in cloud enterprise architectural governance (such as AWS Control Tower or Azure Landing Zone)?",
      "options": [
        {
          "label": "A",
          "text": "A helipad built on top of a corporate data center.",
          "isCorrect": false
        },
        {
          "label": "B",
          "text": "A well-architected, multi-account baseline environment configured with automated security guardrails, centralized identity, logging, network topologies, and cost monitoring ready for workload deployment.",
          "isCorrect": true
        },
        {
          "label": "C",
          "text": "A temporary folder on the desktop where downloads are saved.",
          "isCorrect": false
        },
        {
          "label": "D",
          "text": "A designated website where customers download software.",
          "isCorrect": false
        }
      ]
    }
  ]
};

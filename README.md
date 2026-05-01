# LaborGuard: Predictive Labor Law Compliance Engine Through RAG & NLP

Specialized framework developed in **TypeScript** to bridge the gap between administrative legal support and automated compliance auditing. The project addresses the operational challenge of ensuring labor law adherence within complex corporate environments through **Natural Language Processing (NLP)** and **Retrieval-Augmented Generation (RAG)**.

> **Core Argument:** Legal compliance at industrial and corporate scales is only achievable through the integration of domain-specific legal expertise and high-performance data engineering.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Open_Source-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

[![ODS 8](https://img.shields.io/badge/SDG-8_Decent_Work-A21942?style=for-the-badge)](https://sdgs.un.org/goals/goal8)
[![ODS 9](https://img.shields.io/badge/SDG-9_Innovation-orange?style=for-the-badge)](https://sdgs.un.org/goals/goal9)
[![ODS 16](https://img.shields.io/badge/SDG-16_Justice-00689D?style=for-the-badge)](https://sdgs.un.org/goals/goal16)

---

## Objectives & Research Context

The primary goal is to evaluate the compliance level of employment contracts and administrative procedures against the **Consolidação das Leis do Trabalho (CLT)**. By identifying "legal hiatuses"—discrepancies between contractual clauses and statutory mandates—this tool provides a proactive foundation for institutional risk mitigation.

### Key Research Focus:
* **Compliance Audit:** Analyzing if drafted clauses reflect the real protections guaranteed by the Federal Constitution and the CLT.
* **Risk Prediction:** Utilizing LLMs to simulate how specific clauses (e.g., overtime, 12x36 shifts) would be interpreted in a labor court.
* **Strategic Archiving:** Transforming unstructured legal documents into a searchable, high-integrity vector database for rapid institutional retrieval.

---

## Tech Stack

* **Language:** TypeScript — Chosen for its type-safety in modeling complex legal structures and hierarchical regulations.
* **AI Orchestration:** LangChain.js — Manages the RAG pipeline between the legal knowledge base and the Large Language Model.
* **Database:** PostgreSQL & Vector DB (Milvus/Pinecone) — Handles both transactional legal records and semantic vector embeddings.
* **Legal Core:** Brazilian Labor Law (CLT) & 2016 CNCT Technical Competencies.

---

## Technical Features

1. **Predictive Risk Scorer:** Generates a "Risk Coefficient" for contract clauses by comparing them against indexed jurisprudence and CLT articles.
2. **Automated Clause Parser:** Extracts rights and duties from complex legal prose using NLP to identify potential regulatory conflicts.
3. **Liability Calculator:** Integrates **Financial Math** to estimate potential fiscal impacts based on the formula: $Liability = \sum (Unpaid\_Benefits + Penalties)$.

---

## Project Structure
```text
├── src/
│   ├── engine/
│   │   └── labor-guard-core.ts   # Core RAG and Analysis logic
│   ├── database/
│   │   └── vector-store.ts       # Legal document indexing
│   ├── utils/
│   │   └── financial-math.ts     # Labor liability calculations
│   └── ui/
│       └── RiskDashboard.tsx     # React analysis interface
---


## How to Implement

### Prerequisites
*Node.js (LTS version).
*PostgreSQL instance.
*API Key for LLM provider (OpenAI / AWS Bedrock).

### Installation Steps
1. **Clone the Repo:**
   ```bash
   git clone https://github.com/ailton-santos/LaborGuard.git
2. Install dependences:**
   ```bash
   npm install
3. Ingest Legal Base:**
   ```bash
   npm run ingest:clt


# How It Works: The Architecture Behind the AI Assistant

This portfolio assistant isn't just a simple API wrapper. It is a custom-engineered RAG (Retrieval-Augmented Generation) system designed for speed, accuracy, and reliability.

### 1. The Dual-Model "Fast/Smart" Pipeline

To optimize for both cost and user experience, the system uses a tiered intelligence approach:

- **Fast Tier (e.g. Gemini 1.5 Flash):** Handles intent detection, query normalization, and initial classification.
- **Smart Tier (e.g. Mistral Large / Gemini Pro):** Engaged for complex questions where deep reasoning and brand alignment are required.

### 2. Intelligent Caching & Cost Efficiency

To minimize latency and preserve API resources, the system implements a caching layer:

- **Redis Caching:** Frequently asked questions and common queries are stored in an in-memory Redis database. This allows the assistant to deliver near-instantaneous responses for repeated
  interactions without re-triggering the full RAG pipeline, ensuring that valuable LLM credits aren't spent on redundant tasks.

### 3. Context Injection (RAG)

The AI doesn't "hallucinate" my experiences. When a question is asked:

1. **Vector Search:** All the data is tokenized and stored in a _Vector Database_.
2. **Contextual Querying:** When you ask a question, a _Fast-Tier LLM_ reformulates your query to ensure the most relevant embeddings are retrieved from the database.
3. **Augmentation:** This retrieved data is injected into the "System Prompt" as the single source of truth.
4. **Generation:** The final LLM generates a response strictly based on this provided context.

### 4. Resilience & Failover

Reliability is a core requirement. If a primary provider (like Mistral AI) hits a rate limit or experiences downtime, the backend automatically fails over to a secondary provider (Gemini) using a
custom-built provider abstraction layer.

### 5. Tech Stack

- **Frontend:** React, Vite, Tailwind CSS.
- **Backend:** Node.js & TypeScript.
- **Data & Caching:** Redis for high-speed caching & Vector Database for RAG.
- **Security:** Cloudflare SSL/TLS with forced HTTPS and strict CORS origin validation.
- **CI/CD:** Automated deployments via GitHub Actions.
- **Infrastructure:** Dokploy for container orchestration on a VPS.

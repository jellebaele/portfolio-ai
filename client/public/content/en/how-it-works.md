# How It Works: The Architecture Behind the AI Assistant

This portfolio assistant isn't just a simple API wrapper. It is a custom-engineered RAG (Retrieval-Augmented Generation) system designed for speed, accuracy, and reliability.

### 1. The Dual-Model "Fast/Smart" Pipeline

To optimize for both cost and user experience, the system uses a tiered intelligence approach:

- **Fast Tier (e.g. Gemini 1.5 Flash):** Handles intent detection, query normalization, and initial classification.
- **Smart Tier (e.g. Mistral Large / Gemini Pro):** Engaged for complex questions where deep reasoning and brand alignment are required.

### 2. Context Injection (RAG)

The AI doesn't "hallucinate" my experiences. When a question is asked:

1. The system retrieves relevant snippets from my verified `.md`. The data is stored in a `Vector Database` and the query makes use of a fast tier LLM to make sure context is considered when querying
   the vector db.
2. This data is injected into the "System Prompt" as the single source of truth.
3. The LLM generates a response strictly based on this provided context.
4. **Vector Search:** All the data is tokenized and stored in a Vector Database.
5. **Contextual Querying:** When you ask a question, a Fast-Tier LLM reformulates your query to ensure the most relevant embeddings are retrieved from the database.
6. **Augmentation:** This retrieved data is injected into the "System Prompt" as the single source of truth.
7. **Generation:** The final LLM generates a response strictly based on this provided context.

### 3. Resilience & Failover

Reliability is a core requirement. If a primary provider (like Mistral AI) hits a rate limit or experiences downtime, the backend automatically fails over to a secondary provider (Gemini) using a
custom-built provider abstraction layer.

### 4. Tech Stack

- **Frontend:** React, Vite, Tailwind CSS.
- **Backend:** Node.js & TypeScript.
- **Security:** Cloudflare SSL/TLS with forced HTTPS and strict CORS origin validation.
- **CI/CD:** Automated deployments via GitHub Actions.
- **Infrastructure:** Dokploy for container orchestration on a VPS.

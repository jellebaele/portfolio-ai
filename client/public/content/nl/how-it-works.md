# Hoe het werkt: De architectuur achter de AI-assistent

Deze portfolio-assistent is niet zomaar een simpele API-wrapper. Het is een op maat gemaakt **RAG-systeem (Retrieval-Augmented Generation)**, ontworpen voor snelheid, nauwkeurigheid en
betrouwbaarheid.

### 1. De "Fast/Smart" Pipeline

Om zowel de snelheid als de kwaliteit van de antwoorden te optimaliseren, maakt het systeem gebruik van een gelaagde aanpak:

- **Fast Tier (bijv. Gemini 1.5 Flash):** Verwerkt intentie-detectie, query-normalisatie en initiële classificatie.
- **Smart Tier (bijv. Mistral Large / Gemini Pro):** Wordt ingezet voor complexe vragen waarbij diepgaand redeneren en merkconsistentie cruciaal zijn.

### 2. Context Injectie (RAG)

De AI "fantasert" mijn ervaringen niet bij elkaar. Wanneer er een vraag wordt gesteld, volgt het systeem een strikt proces:

1. **Vector Search:** Alle data is getokeniseerd en opgeslagen in een `Vector Database`.
2. **Contextuele Querying:** Wanneer je een vraag stelt, herformuleert een _Fast-Tier LLM_ je zoekopdracht om ervoor te zorgen dat de meest relevante "embeddings" uit de database worden opgehaald.
3. **Augmentatie:** Deze opgehaalde data wordt in de "System Prompt" geïnjecteerd als de enige bron van waarheid.
4. **Generatie:** De uiteindelijke LLM genereert een antwoord dat strikt gebaseerd is op deze meegeleverde context.

### 3. Resilience & Failover

Betrouwbaarheid is een kernvereiste. Als een primaire provider (zoals Mistral AI) een limiet bereikt of downtime ervaart, schakelt de backend automatisch over naar een secundaire provider (Gemini).
Dit gebeurt via een zelfgebouwde _provider abstraction layer_, zonder dat de gebruiker hier iets van merkt.

### 4. Tech Stack

- **Frontend:** React, Vite, Tailwind CSS.
- **Backend:** Node.js & TypeScript.
- **Beveiliging:** Cloudflare SSL/TLS met geforceerde HTTPS en strikte CORS-validatie.
- **CI/CD:** Geautomatiseerde deployments via GitHub Actions.
- **Infrastructuur:** Dokploy voor container-orchestratie op een VPS.

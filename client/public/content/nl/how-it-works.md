# Hoe het werkt: De architectuur achter de AI-assistent

Deze portfolio-assistent is niet zomaar een simpele API-wrapper. Het is een op maat gemaakt **RAG-systeem (Retrieval-Augmented Generation)**, ontworpen voor snelheid, nauwkeurigheid en
betrouwbaarheid.

### 1. De "Fast/Smart" Pipeline

Om zowel de snelheid als de kwaliteit van de antwoorden te optimaliseren, maakt het systeem gebruik van een gelaagde aanpak:

- **Fast Tier (bijv. Gemini 1.5 Flash):** Verwerkt intentie-detectie, query-normalisatie en initiële classificatie.
- **Smart Tier (bijv. Mistral Large / Gemini Pro):** Wordt ingezet voor complexe vragen waarbij diepgaand redeneren en merkconsistentie cruciaal zijn.

### 2. Intelligente Caching & Kostenefficiëntie

Om de latentie te minimaliseren en API-middelen te sparen, is er een caching-laag geïmplementeerd:

- **Redis Caching:** Veelgestelde vragen en algemene queries worden opgeslagen in een in-memory Redis-database. Hierdoor kan de assistent vrijwel direct antwoorden geven op herhaalde interacties
  zonder de volledige RAG-pijplijn opnieuw te doorlopen. Dit voorkomt dat kostbare LLM-credits onnodig worden verbruikt voor dubbele taken.

### 3. Context Injectie (RAG)

De AI "fantasert" mijn ervaringen niet bij elkaar. Wanneer er een vraag wordt gesteld, volgt het systeem een strikt proces:

1. **Vector Search:** Alle data is getokeniseerd en opgeslagen in een _Vector Database_.
2. **Contextuele Querying:** Wanneer je een vraag stelt, herformuleert een _Fast-Tier LLM_ je zoekopdracht om ervoor te zorgen dat de meest relevante "embeddings" uit de database worden opgehaald.
3. **Augmentatie:** Deze opgehaalde data wordt in de "System Prompt" geïnjecteerd als de enige bron van waarheid.
4. **Generatie:** De uiteindelijke LLM genereert een antwoord dat strikt gebaseerd is op deze meegeleverde context.

### 4. Resilience & Failover

Betrouwbaarheid is een kernvereiste. Als een primaire provider (zoals Mistral AI) een limiet bereikt of downtime ervaart, schakelt de backend automatisch over naar een secundaire provider (Gemini).
Dit gebeurt via een zelfgebouwde _provider abstraction layer_, zonder dat de gebruiker hier iets van merkt.

### 5. Tech Stack

- **Frontend:** React, Vite, Tailwind CSS.
- **Backend:** Node.js & TypeScript.
- **Data & Caching:** Redis voor high-speed caching & Vector Database voor RAG.
- **Beveiliging:** Cloudflare SSL/TLS met geforceerde HTTPS en strikte CORS-validatie.
- **CI/CD:** Geautomatiseerde deployments via GitHub Actions.
- **Infrastructuur:** Dokploy voor container-orchestratie op een VPS.

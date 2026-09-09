
# Multi-Source RAG Assistant

A Retrieval-Augmented Generation (RAG) application that answers questions using data pulled live from three independent APIs — Harry Potter characters, daily horoscopes, and AI-generated absurdist products. Built with LangChain, Express, and React.

## Architecture

```
3 APIs → Loaders → Document conversion → Text Splitter → Embeddings → Chroma Cloud (vector store) → Retriever → LCEL Chain (Prompt + LLM) → Express API → React frontend
```

## Data Sources

| Source | What it provides |
|---|---|
| [HP-API](https://hp-api.onrender.com) | Harry Potter character data (house, species, patronus, etc.) |
| [CosmyDay](https://cosmyday.com) | Live daily horoscopes for all 12 zodiac signs |
| [Anycrap](https://anycrap.shop) | AI-generated absurdist product concepts, with images |

## Tech Stack

- **Backend:** Node.js, TypeScript, Express, LangChain
- **Embeddings:** Google Gemini (`gemini-embedding-001`)
- **LLM:** Groq (`openai/gpt-oss-20b`)
- **Vector store:** Chroma Cloud
- **Frontend:** React (Vite)

## Project Structure

```
backend/     — API server, RAG pipeline, data loaders
frontend/    — React UI (Home + category pages, chat interface)
```

## Setup

### Backend
```bash
cd backend
npm install
# Add .env — see Environment Variables below
npm run ingest   # one-time: fetches data, builds embeddings, stores in Chroma Cloud
npm run server   # starts the API on port 3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables (`backend/.env`)

```
GOOGLE_API_KEY=       # Gemini embeddings
GROQ_API_KEY=         # LLM
ANYCRAP_API_KEY=      # Anycrap data source
CHROMA_API_KEY=
CHROMA_TENANT=
CHROMA_DATABASE=
```

## API Endpoints

- `POST /ask` — `{ question, source? }` → `{ answer, images }`. `source` optionally scopes retrieval to one category (`potterdb`, `cosmyday`, `anycrap`).
- `GET /documents?source=X` — returns sample documents for a category (for browsing).

## Known Limitations

- Retrieval is single-vector semantic search — it cannot do multi-step reasoning (e.g., "what's the horoscope for the sign Harry Potter would be, based on his birthday").
- Slightly typo-sensitive, since matching relies on embedding similarity.
- Free-tier API constraints (Gemini/Groq rate limits) mean ingestion runs in small batches with delays.
```

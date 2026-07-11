# AI Investment Research Agent

An AI-powered investment research agent that analyzes public companies using LangChain.js, Google Gemini, and real-time financial data. Enter any company name and get a comprehensive investment recommendation with financial analysis, news sentiment, risk assessment, and detailed reasoning.

**Live Demo:** [ai-investment-research-agent-topaz.vercel.app](https://ai-investment-research-agent-topaz.vercel.app/)

![Tech Stack](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat&logo=langchain&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini-4285F4?style=flat&logo=google-gemini&logoColor=white)

---

## Features

- 🤖 **AI-Powered Analysis** — Uses LangChain.js with Gemini (gemini-2.0-flash / gemini-1.5-pro) for intelligent company research
- 📊 **Financial Analysis** — Real-time data from Yahoo Finance (revenue, margins, valuation)
- 📰 **News Sentiment** — Aggregates and analyzes recent news via Tavily Search
- ⚠️ **Risk Assessment** — SWOT analysis and comprehensive risk evaluation
- ✅ **Investment Recommendation** — Clear Invest/Pass decision with confidence score
- 📈 **Interactive Charts** — Recharts visualizations for scores, risks, and sentiment
- 🎨 **Premium UI** — Modern dashboard inspired by Linear/Vercel/Stripe design

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | UI framework |
| Tailwind CSS | Styling |
| React Router | Client-side routing |
| React Query (TanStack) | Server state management |
| Axios | HTTP client |
| Recharts | Data visualization |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API |
| LangChain.js | AI orchestration |
| Google Gemini | Language model (via @langchain/google-genai) |
| Tavily Search | Web search |
| yahoo-finance2 | Financial data |
| Zod | Schema validation |

---

## Installation

### Prerequisites
- Node.js 18+
- npm 9+
- Google Gemini API Key
- Tavily API Key

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-investment-research-agent.git
cd ai-investment-research-agent
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```bash
cp ../.env.example .env
```

Edit `.env` with your API keys:

```env
PORT=5000
NODE_ENV=development
GOOGLE_API_KEY=your-gemini-key-here
GEMINI_MODEL=gemini-2.0-flash
TAVILY_API_KEY=tvly-your-tavily-key-here
NEWS_API_KEY=your-newsapi-key-here  # Optional
```

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_API_KEY` | ✅ | Google AI Studio Gemini API key |
| `TAVILY_API_KEY` | ✅ | Tavily Search API key for web search |
| `NEWS_API_KEY` | ❌ | NewsAPI key (optional fallback for news) |
| `GEMINI_MODEL` | ❌ | Gemini model name (defaults to `gemini-2.0-flash`) |
| `PORT` | ❌ | Server port (defaults to `5000`) |

---

## Run the Project

### Start the Backend
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

### Start the Frontend
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`

Open your browser to `http://localhost:5173` and start researching companies.

---

## Architecture

```
┌──────────────┐    POST /api/research    ┌──────────────────┐
│              │ ───────────────────────── │                  │
│   React UI   │                          │   Express API    │
│   (Vite)     │ ◄─────────────────────── │                  │
│              │    Structured JSON        │                  │
└──────────────┘                          └─────────┬────────┘
                                                    │
                                           ┌────────▼─────────┐
                                           │  Research Service │
                                           │  (Orchestrator)   │
                                           └────────┬─────────┘
                                                    │
                         ┌──────────────────────────┼─────────────────────────┐
                         │                          │                         │
                ┌────────▼────────┐      ┌──────────▼──────────┐    ┌────────▼────────┐
                │  Company Search │      │   Financial Data     │    │   News Search   │
                │  (Tavily API)   │      │   (Yahoo Finance)    │    │  (Tavily/News)  │
                └────────┬────────┘      └──────────┬──────────┘    └────────┬────────┘
                         │                          │                         │
                         └──────────────────────────┼─────────────────────────┘
                                                    │
                                           ┌────────▼─────────┐
                                           │  LangChain Chains │
                                           │                   │
                                           │  • researchChain  │
                                           │  • financialChain │
                                           │  • newsChain      │
                                           │  • analysisChain  │
                                           │  • recommendation │
                                           └────────┬─────────┘
                                                    │
                                           ┌────────▼─────────┐
                                           │  ChatGoogle-      │
                                           │  GenerativeAI     │
                                           └────────┬─────────┘
                                                    │
                                           ┌────────▼─────────┐
                                           │  Structured JSON  │
                                           │  Response         │
                                           └──────────────────┘
```

---

## AI Workflow

The research pipeline follows a sequential chain architecture:

### 1. Company Search
- Uses **Tavily Search API** to gather company overview, business model, and market position
- Searches for recent information (2024-2025)

### 2. Financial Data Collection
- Resolves company name → ticker symbol via **yahoo-finance2**
- Fetches quote data (price, market cap, P/E)
- Fetches detailed financials (revenue, margins, cash flow, debt)

### 3. News Collection
- Searches for recent news via **Tavily** (primary) or **NewsAPI** (fallback)
- Collects up to 8 recent articles

### 4. AI Analysis (LangChain.js)
Each step uses a `RunnableSequence` piping a `PromptTemplate` into the shared `ChatGoogleGenerativeAI` instance:

| Chain | Input | Output |
|---|---|---|
| **researchChain** | Search data + financials | Business overview |
| **financialChain** | Raw financial data | Financial health assessment |
| **newsChain** | Raw news articles | Sentiment analysis |
| **analysisChain** | All previous outputs | SWOT + risk analysis |
| **recommendationChain** | Everything | Final Invest/Pass JSON |

### 5. Investment Recommendation
The final chain produces a structured JSON response with:
- **Invest** or **Pass** recommendation
- Confidence score (0-100)
- Investment score (0-100)
- Risk level (Low/Medium/High)
- Detailed reasoning, risks, and opportunities
- Chart data for visualizations

---

## Key Decisions & Trade-offs

| Decision | Rationale |
|---|---|
| **LangChain.js (not LangGraph)** | Sequential chains via `RunnableSequence` are simpler, more debuggable, and sufficient for a linear analysis pipeline |
| **Sequential LLM calls** | Each chain builds on previous outputs — parallelizing would lose context |
| **Parallel data gathering** | Tavily search, Yahoo Finance, and news search run in parallel since they're independent |
| **JSON output from LLM** | Custom parser handles markdown-wrapped JSON responses for robustness |
| **Tavily over direct scraping** | Tavily provides clean, structured search results optimized for LLMs |
| **Yahoo Finance** | Best free source for real-time financial data in Node.js |

### Current Limitations
- Relies on external APIs (Gemini, Tavily, Yahoo Finance) which may rate limit
- Research takes 30-60 seconds due to sequential LLM calls
- No caching — repeated research for the same company makes fresh API calls
- Financial data quality depends on Yahoo Finance coverage

---

## Example API Response

```json
{
  "success": true,
  "data": {
    "company": "Apple",
    "ticker": "AAPL",
    "recommendation": "Invest",
    "confidence": 88,
    "investmentScore": 85,
    "risk": "Low",
    "marketSentiment": "Bullish",
    "summary": "Apple remains a strong investment with consistent revenue growth...",
    "businessOverview": "Apple Inc. designs, manufactures, and markets...",
    "financialHealth": {
      "revenueGrowth": "5% YoY growth...",
      "profitMargin": "25.3% net margin...",
      "cashFlow": "$110B operating cash flow...",
      "debtLevel": "Moderate debt-to-equity of 1.5...",
      "score": 82
    },
    "risks": ["Market saturation in smartphones", "China regulatory risks"],
    "opportunities": ["AI/ML integration", "Services segment growth"],
    "reasoning": ["Strong brand moat and ecosystem lock-in", "..."]
  }
}
```

---

## Folder Structure

```
ai-investment-research-agent/
├── client/                         # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Route pages (Home, Results)
│   │   ├── hooks/                 # React Query hooks
│   │   ├── services/              # API service (Axios)
│   │   ├── context/               # React context (Research state)
│   │   ├── utils/                 # Constants, formatters
│   │   ├── App.jsx                # Root component with routes
│   │   └── main.jsx               # Entry point with providers
│   └── package.json
│
├── server/                         # Backend (Express + LangChain)
│   ├── src/
│   │   ├── chains/                # LangChain RunnableSequences
│   │   ├── prompts/               # PromptTemplate files
│   │   ├── tools/                 # Data gathering tools
│   │   ├── services/              # Business logic (research orchestrator)
│   │   ├── controllers/           # Request handlers
│   │   ├── routes/                # Express routes
│   │   ├── config/                # Environment config
│   │   ├── utils/                 # Errors, logger
│   │   ├── app.js                 # Express app setup
│   │   └── server.js              # Server entry point
│   └── package.json
│
├── .env.example                    # Environment variables template
└── README.md                       # This file
```

---

## Future Improvements

- 🔐 User authentication and saved research history
- 📋 Watchlists and portfolio tracking
- 📡 Real-time streaming responses (Server-Sent Events)
- 📄 PDF export of research reports
- 🔄 Multi-company comparison
- 📉 Historical trend analysis with charts
- 💾 Redis caching for repeated queries
- 🔔 Price alert notifications
- 🌐 Multi-language support
- 📱 Mobile-optimized PWA

---

## License

This project is for educational purposes. Not financial advice.

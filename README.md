# AI Engineer Hub

A static, dependency-free website that guides software engineers through the AI engineer path:
LLMs, prompt engineering, RAG, agentic AI, agent harnesses, open & local models, LLMOps and safety.

## Features
- **Roadmap**: 3 stages (Beginner → Intermediate → Professional) with steps linked to resources
- **Course library**: 135 curated resources, filterable by level, topic, provider, format, cost and status; search (`/` shortcut)
- **By provider**: Anthropic, Google, OpenAI, Microsoft, Meta, Hugging Face, DeepLearning.AI, AWS, NVIDIA, Mistral, LangChain, universities, community
- **Core concepts**: original explainers + flow diagrams + runnable code for LLMs, RAG, Agents and Harness
- **Local AI**: why it matters, VRAM calculator, hardware tiers, open model families, tools, deployment quick-starts (Ollama, Docker + Open WebUI, llama.cpp, vLLM, MLX) and a production checklist
- **Harness AI engineering**: everything around the model, as an interactive 7-layer stack (models → gateways → data → tools & protocols → agents → automation & workflows → apps) plus a cross-cutting ops layer (evals, observability, guardrails, security, cost); then a zoom into the agent harness, frameworks to study and design rules
- **Smart quiz**: 75 questions (incl. automation & harness); adaptive difficulty, topic drills, level challenges; level estimate + course recommendations + mistake review
- **Progress tracking**: done/saved items and quiz history in `localStorage` (never leaves the browser); export as JSON
- Dark/light theme, responsive, keyboard-friendly, `prefers-reduced-motion` support

## Run locally
Open `index.html` directly, or serve the folder:
```bash
npx serve .        # or: python -m http.server 8000
```

## Deploy
It's plain static files, so any static host works:
- **GitHub Pages**: push to a repo → Settings → Pages → deploy from branch `main` / root
- **Netlify / Vercel / Cloudflare Pages**: import the repo, no build command, output dir `.`

## Editing content
| What | File |
|---|---|
| Courses, providers, roadmap, models, hardware, news sources | `assets/js/data.js` |
| Quiz questions (`a` = index of correct option; options are shuffled at runtime) | `assets/js/quiz-data.js` |
| Concept explainers, deployment snippets, harness content | `assets/js/content.js` |

Add a course with one line in `data.js`:
```js
c("my-id", "Title", "providerKey", "beginner|intermediate|professional", ["rag", "agents"], "course", "free", "2h", "https://…", "Short description"),
```

## Copyright & legal notes
- The site **only links** to external resources. No third-party videos, thumbnails, logos or course content are hosted or embedded.
- Providers are shown as colored text monograms, not logos. Brand names are used for identification only.
- All illustrations (card art, diagrams, icons) are generated with CSS/SVG/emoji. No external fonts or trackers are used, which also keeps it GDPR-friendly.
- Quiz questions and explainers are original content.

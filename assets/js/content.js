/* Original explanatory content: concepts, deployment snippets, harness. */
window.AI_CONTENT = {
  concepts: [
    {
      id: "llm", icon: "🧠", title: "LLMs",
      tagline: "Giant next-token predictors that became general-purpose reasoning engines.",
      body: [
        "A Large Language Model is a transformer neural network trained on trillions of tokens to predict the next token. Scale + data turn this simple objective into broad abilities: writing, coding, translation, reasoning.",
        "Assistants are made in two phases: <b>pretraining</b> (learn language & world knowledge) then <b>post-training</b> (instruction tuning, preference optimization and RL to make the model helpful, honest and safe, and — for reasoning models — to think before answering).",
        "As an engineer you control the model through its <b>context</b>: system prompt, conversation, documents, tool definitions. Everything the model knows about your task must be in that window."
      ],
      flow: ["📝 Text", "✂️ Tokenizer", "🔢 Embeddings", "🔁 N × Transformer blocks (attention + MLP)", "📊 Next-token probabilities", "🎲 Sampling"],
      loop: "repeat until stop token",
      terms: [["Token", "Sub-word unit; billing & limits are counted in tokens."], ["Context window", "Max tokens per call (input + output)."], ["Temperature", "Randomness of sampling."], ["Reasoning / thinking", "Extra tokens spent deliberating before the answer."], ["Multimodal", "Accepts images, audio, PDFs…"], ["Prompt caching", "Reuse a processed prefix for lower cost & latency."]],
      code: `# Talk to any OpenAI-compatible endpoint — here a local Ollama model (free!)
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
resp = client.chat.completions.create(
    model="llama3.2",
    temperature=0.2,
    messages=[
        {"role": "system", "content": "You are a concise senior engineer."},
        {"role": "user", "content": "Explain the KV cache in 3 bullet points."},
    ],
)
print(resp.choices[0].message.content)`
    },
    {
      id: "rag", icon: "📚", title: "RAG",
      tagline: "Give the model the right knowledge at the right time.",
      body: [
        "Models don't know your private or recent data, and they hallucinate when unsure. <b>Retrieval-Augmented Generation</b> searches a knowledge base for relevant passages and inserts them into the prompt so the answer is grounded and citable.",
        "Quality lives in the <b>retrieval</b>: chunking, embeddings, hybrid keyword + vector search, reranking, metadata filters. Then <b>generation</b>: instruct the model to answer only from context and cite sources.",
        "Advanced variants: query rewriting, contextual retrieval, GraphRAG for global questions, and <b>agentic RAG</b> where an agent decides when and what to search, iterating until satisfied."
      ],
      flow: ["📄 Documents", "✂️ Chunk", "🔢 Embed", "🗄️ Vector + keyword index", "🔎 Retrieve + rerank", "🧩 Augment prompt", "💬 Grounded answer + citations"],
      loop: "offline indexing → online querying",
      terms: [["Embedding", "Vector capturing meaning."], ["Chunking", "Splitting docs into retrievable pieces."], ["Hybrid search", "BM25 + vectors."], ["Reranker", "Precise second-stage scoring."], ["Faithfulness", "Is the answer supported by context?"], ["Agentic RAG", "The agent drives retrieval as a tool."]],
      code: `# Minimal RAG with local embeddings (Ollama) — no vector DB needed to learn
import numpy as np
from openai import OpenAI
llm = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

docs = ["Our refund window is 30 days.", "Support is open 9am-6pm CET.", "Shipping to EU takes 3-5 days."]
embed = lambda texts: np.array([d.embedding for d in llm.embeddings.create(model="nomic-embed-text", input=texts).data])
D = embed(docs)

def ask(q, k=2):
    qv = embed([q])[0]
    scores = D @ qv / (np.linalg.norm(D, axis=1) * np.linalg.norm(qv))
    context = "\\n".join(f"[{i}] {docs[i]}" for i in scores.argsort()[::-1][:k])
    prompt = f"Answer ONLY from the context and cite [ids].\\n<context>\\n{context}\\n</context>\\nQ: {q}"
    return llm.chat.completions.create(model="llama3.2", messages=[{"role": "user", "content": prompt}]).choices[0].message.content

print(ask("How long do I have to return an item?"))`
    },
    {
      id: "agents", icon: "🤖", title: "Agentic AI",
      tagline: "LLMs that use tools in a loop to accomplish goals.",
      body: [
        "An <b>agent</b> is an LLM that decides its next action, calls a tool (search, code execution, API, database…), observes the result and repeats until the goal is met. Your code executes the tools; the model chooses them.",
        "Not everything needs an agent. Predictable tasks fit <b>workflows</b>: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer. Use autonomous agents for open-ended problems where steps can't be hard-coded.",
        "Protocols like <b>MCP</b> standardize how agents connect to tools and data, so one integration works across many AI applications."
      ],
      flow: ["🎯 Goal", "🧠 Model reasons", "🔧 Tool call", "⚙️ Your code executes", "👀 Observation", "✅ Done?"],
      loop: "loop until done or budget exhausted",
      terms: [["Tool / function calling", "Model emits structured calls your code runs."], ["ReAct", "Reason → Act → Observe loop."], ["MCP", "Open protocol for tools, resources & prompts."], ["Workflow", "Predefined code paths orchestrating LLM calls."], ["Multi-agent", "Orchestrator + specialized sub-agents."], ["Guardrails", "Checks on inputs, outputs & actions."]],
      code: `# A tiny agent loop with tool calling (works with OpenAI-compatible APIs)
import json
from openai import OpenAI
client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

def get_weather(city: str) -> str:
    return f"18°C and sunny in {city}"        # your real code here

tools = [{"type": "function", "function": {
    "name": "get_weather", "description": "Current weather for a city",
    "parameters": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"]}}}]

messages = [{"role": "user", "content": "Should I bring an umbrella in Paris today?"}]
for _ in range(5):                                   # always bound the loop
    msg = client.chat.completions.create(model="qwen3", messages=messages, tools=tools).choices[0].message
    messages.append(msg)
    if not msg.tool_calls:
        print(msg.content); break
    for call in msg.tool_calls:                      # the harness executes tools
        result = get_weather(**json.loads(call.function.arguments))
        messages.append({"role": "tool", "tool_call_id": call.id, "content": result})`
    },
    {
      id: "harness", icon: "🛠️", title: "AI Harness",
      tagline: "Everything that turns around the model: agents, tools, data, automation and ops.",
      body: [
        "A model alone only turns text into text. <b>Harness AI engineering</b> is building everything around it so it does useful, reliable work: how you <b>access</b> models (APIs, gateways, local servers), what <b>data</b> they see (RAG, memory), what <b>tools</b> they can use (function calling, MCP), how they're <b>orchestrated</b> (workflows, agents, multi-agent), how they plug into <b>automations</b> (triggers, schedules, CI, business processes), and how you <b>operate</b> them (evals, tracing, guardrails, cost).",
        "At the center of many systems sits an <b>agent harness</b>: the loop, context management, sub-agents, skills, permissions and verification that make an agent dependable. Claude Code, Codex, Gemini CLI or n8n's AI agents are all harnesses.",
        "This is where most AI engineering work happens now. Models improve every few months; a well-designed harness keeps working, and gets better, as you swap models in."
      ],
      flow: ["⚡ Trigger (user · event · schedule)", "🧭 Orchestrate (workflow or agent)", "🧠 LLM via gateway", "🔧 Tools · MCP · APIs", "📚 Data & memory", "🛡️ Guardrails & approval", "📈 Evals & tracing"],
      loop: "every layer is observable, testable and swappable",
      terms: [["Agent harness", "Loop + tools + context + permissions around a model."], ["Workflow automation", "Event-triggered pipelines with AI steps."], ["MCP / A2A", "Protocols for agent↔tool and agent↔agent."], ["LLM gateway", "One API, fallbacks, budgets, routing."], ["Guardrails", "Checks on inputs, outputs & actions."], ["Human-in-the-loop", "Approval before irreversible actions."]],
      code: `# An AI automation: webhook -> LLM triage -> tool action -> human approval
from fastapi import FastAPI
from openai import OpenAI
import json

app = FastAPI()
llm = OpenAI(base_url="http://localhost:11434/v1", api_key="local")  # or a gateway URL

@app.post("/webhooks/support-email")          # trigger: new email
def triage(email: dict):
    out = llm.chat.completions.create(
        model="qwen3", response_format={"type": "json_object"},
        messages=[{"role": "system", "content":
            'Classify the email. Reply JSON: {"category": "bug|billing|other", "urgent": bool, "summary": str}'},
            {"role": "user", "content": email["body"]}],
    ).choices[0].message.content
    t = json.loads(out)                        # validate structured output
    ticket = create_ticket(t["category"], t["summary"])     # tool call (your API)
    if t["urgent"]:
        request_human_approval(ticket, "Page on-call?")     # human-in-the-loop
    log_trace(email, t, ticket)                # observability
    return {"ticket": ticket}`
    }
  ],

  deploy: [
    { id: "ollama", label: "Ollama", level: "Beginner", lang: "bash", note: "Fastest path on macOS, Linux and Windows. Models are quantized GGUF by default.",
      code: `# 1) Install (macOS/Windows: download the app from ollama.com)
curl -fsSL https://ollama.com/install.sh | sh

# 2) Pull & chat with a model (pick a size that fits your RAM/VRAM)
ollama run llama3.2          # ~3B, runs on most laptops
ollama pull nomic-embed-text # embeddings for RAG

# 3) Use the local API (also OpenAI-compatible at /v1)
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [{"role": "user", "content": "Hello!"}],
  "stream": false
}'

# 4) See what's loaded and how much memory it uses
ollama ps` },
    { id: "compose", label: "Ollama + Open WebUI (Docker)", level: "Beginner", lang: "yaml", note: "A private ChatGPT-like stack for you or your team. Save as docker-compose.yml and run `docker compose up -d`, then open http://localhost:3000.",
      code: `services:
  ollama:
    image: ollama/ollama:latest
    volumes: [ "ollama:/root/.ollama" ]
    ports: [ "11434:11434" ]
    # NVIDIA GPU (requires nvidia-container-toolkit):
    deploy:
      resources:
        reservations:
          devices: [ { driver: nvidia, count: all, capabilities: [gpu] } ]

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    volumes: [ "open-webui:/app/backend/data" ]
    ports: [ "3000:8080" ]
    depends_on: [ ollama ]

volumes:
  ollama:
  open-webui:` },
    { id: "llamacpp", label: "llama.cpp server", level: "Intermediate", lang: "bash", note: "Maximum control and portability (CPU, CUDA, Metal, Vulkan). Download a .gguf file from Hugging Face.",
      code: `# Install (macOS/Linux with Homebrew) — or build from source / grab a release binary
brew install llama.cpp

# Serve a GGUF model with an OpenAI-compatible API on :8080
#   -c   context size      -ngl  layers offloaded to GPU (99 = all)
llama-server -m ./models/model-Q4_K_M.gguf -c 8192 -ngl 99 --port 8080

# Or let it download directly from Hugging Face
llama-server -hf <user>/<repo>-GGUF --port 8080

curl http://localhost:8080/v1/chat/completions -H "Content-Type: application/json" \\
  -d '{"messages":[{"role":"user","content":"Hi"}]}'` },
    { id: "vllm", label: "vLLM (production GPU)", level: "Professional", lang: "bash", note: "High-throughput serving for many users: continuous batching, PagedAttention, tensor parallelism. Needs a recent NVIDIA/AMD GPU.",
      code: `# Option A — pip (Linux + CUDA)
pip install vllm
vllm serve Qwen/Qwen2.5-7B-Instruct \\
  --max-model-len 16384 \\
  --gpu-memory-utilization 0.90 \\
  --api-key "$VLLM_API_KEY"

# Option B — Docker
docker run --gpus all -p 8000:8000 \\
  -v ~/.cache/huggingface:/root/.cache/huggingface \\
  -e HF_TOKEN=$HF_TOKEN \\
  vllm/vllm-openai:latest \\
  --model Qwen/Qwen2.5-7B-Instruct --tensor-parallel-size 1

# Multi-GPU for bigger models: --tensor-parallel-size 2 (or 4, 8)` },
    { id: "mlx", label: "MLX (Apple silicon)", level: "Intermediate", lang: "bash", note: "Uses the Mac's unified memory efficiently. Community-converted models live under mlx-community on Hugging Face.",
      code: `pip install mlx-lm

# One-off generation
mlx_lm.generate --model mlx-community/<model>-4bit --prompt "Explain RAG simply"

# OpenAI-compatible local server on :8080
mlx_lm.server --model mlx-community/<model>-4bit --port 8080

# LoRA fine-tuning on your own data (jsonl)
mlx_lm.lora --model mlx-community/<model>-4bit --train --data ./data` },
    { id: "client", label: "Use it from code", level: "All", lang: "python", note: "All of the above expose OpenAI-compatible APIs — switch between local and cloud by changing base_url.",
      code: `from openai import OpenAI

# Ollama: http://localhost:11434/v1   llama.cpp: http://localhost:8080/v1
# vLLM:   http://localhost:8000/v1    LM Studio: http://localhost:1234/v1
client = OpenAI(base_url="http://localhost:11434/v1", api_key="local")

stream = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "Write a haiku about GPUs"}],
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="", flush=True)` },
    { id: "checklist", label: "Production checklist", level: "Professional", lang: "text", note: "Before exposing a self-hosted model to real users.",
      code: `[ ] Pick the smallest model that passes YOUR evals (not leaderboards)
[ ] Choose quantization: FP8/AWQ on GPUs, GGUF Q4–Q6 on CPU/Mac
[ ] Size memory: weights + KV cache × context × concurrent users (+10–20%)
[ ] Put an auth'd reverse proxy (TLS, API keys, rate limits) in front
[ ] Never expose Ollama/llama.cpp ports directly to the internet
[ ] Log & trace requests (latency, tokens/s, errors) — Prometheus/OTel
[ ] Load-test with realistic prompts (time-to-first-token, throughput)
[ ] Pin model + runtime versions; keep a rollback path
[ ] Check the model LICENSE for commercial use & attribution
[ ] Add guardrails: input/output filters, prompt-injection defenses
[ ] Plan hybrid routing: local for common cases, frontier API for hard ones` }
  ],

  /* The AI engineering stack — top (closest to users) to bottom (models). */
  stack: [
    { id: "apps", icon: "🖥️", t: "Apps & interfaces", color: "#ec4899",
      d: "Where people meet AI: chat assistants, copilots inside products, coding agents in the terminal/IDE, voice agents, and AI features added to existing apps.",
      concepts: ["Chat UI & streaming", "Copilots in products", "Coding agents", "Voice & realtime", "Computer / browser use", "Generative UI"],
      tools: [["Claude Code", "https://docs.claude.com/en/docs/claude-code/overview"], ["AI SDK (TS)", "https://ai-sdk.dev"], ["Open WebUI", "https://github.com/open-webui/open-webui"], ["Gemini CLI", "https://github.com/google-gemini/gemini-cli"], ["OpenAI Codex", "https://developers.openai.com/codex"]],
      learn: ["anth-cc-best", "ai-sdk", "dlai-claude-code"] },
    { id: "automation", icon: "⚙️", t: "Automation & workflows", color: "#f97316",
      d: "AI steps built into processes: triggered by events (email, form, webhook, schedule, git push), chaining LLM calls with business APIs. Low-code platforms for speed; code and durable engines for scale and reliability.",
      concepts: ["Triggers & webhooks", "Deterministic workflows", "Human-in-the-loop approvals", "Idempotency & retries", "Scheduled / background agents", "AI in CI/CD"],
      tools: [["n8n", "https://docs.n8n.io"], ["Zapier", "https://zapier.com/ai"], ["Make", "https://www.make.com"], ["Power Automate", "https://learn.microsoft.com/en-us/power-automate/"], ["Temporal", "https://docs.temporal.io"], ["Claude Code GitHub Actions", "https://docs.claude.com/en/docs/claude-code/github-actions"]],
      learn: ["n8n-docs", "cc-actions", "temporal"] },
    { id: "agents", icon: "🤖", t: "Agents & orchestration", color: "#f59e0b",
      d: "The reasoning layer: an LLM plans, calls tools, observes and iterates. Frameworks and agent harnesses provide the loop, state, memory, handoffs, sub-agents and multi-agent topologies.",
      concepts: ["Agent loop (ReAct)", "Workflows vs. agents", "Multi-agent & handoffs", "Planning & reflection", "State & memory", "Context engineering"],
      tools: [["Claude Agent SDK", "https://docs.claude.com/en/docs/agent-sdk/overview"], ["OpenAI Agents SDK", "https://openai.github.io/openai-agents-python/"], ["LangGraph", "https://langchain-ai.github.io/langgraph/"], ["Google ADK", "https://google.github.io/adk-docs/"], ["Pydantic AI", "https://ai.pydantic.dev"], ["CrewAI", "https://docs.crewai.com"]],
      learn: ["anth-effective-agents", "dlai-agentic", "hf-agents"] },
    { id: "tools", icon: "🔧", t: "Tools & protocols", color: "#ef4444",
      d: "How models act on the world: function calling with JSON schemas, MCP servers that plug tools and data into any AI app, A2A for agent-to-agent collaboration, plus code execution, search and browsers.",
      concepts: ["Function calling", "Structured outputs", "MCP: tools, resources, prompts", "A2A protocol", "Code-execution sandboxes", "Tool design for agents"],
      tools: [["Model Context Protocol", "https://modelcontextprotocol.io"], ["MCP servers", "https://github.com/modelcontextprotocol/servers"], ["A2A Protocol", "https://a2a-protocol.org"], ["Hugging Face MCP course", "https://huggingface.co/learn/mcp-course"]],
      learn: ["mcp-docs", "anth-tools-agents", "dlai-mcp"] },
    { id: "data", icon: "📚", t: "Data, memory & retrieval", color: "#14b8a6",
      d: "Knowledge the model doesn't have: document parsing, embeddings, vector databases, hybrid search & reranking, RAG and GraphRAG, plus long-term memory for agents.",
      concepts: ["Embeddings", "Chunking & parsing", "Vector databases", "Hybrid search + rerank", "GraphRAG / agentic RAG", "Agent long-term memory"],
      tools: [["Chroma", "https://docs.trychroma.com"], ["Qdrant", "https://qdrant.tech/documentation/"], ["pgvector", "https://github.com/pgvector/pgvector"], ["Weaviate", "https://weaviate.io/developers/academy"], ["LlamaIndex", "https://docs.llamaindex.ai"]],
      learn: ["dlai-adv-rag", "pinecone-learn", "graphrag"] },
    { id: "access", icon: "🔌", t: "Model access & gateways", color: "#6366f1",
      d: "How you call models: provider APIs, cloud platforms (Bedrock, Vertex AI, Azure AI Foundry), gateways for fallbacks, budgets and routing, and self-hosted endpoints. Most speak the OpenAI-compatible format.",
      concepts: ["Provider APIs & SDKs", "OpenAI-compatible endpoints", "Gateways & fallbacks", "Routing small ↔ large", "Prompt caching", "Rate limits & cost"],
      tools: [["LiteLLM", "https://docs.litellm.ai"], ["OpenRouter", "https://openrouter.ai/docs"], ["Amazon Bedrock", "https://docs.aws.amazon.com/bedrock/"], ["vLLM", "https://docs.vllm.ai"], ["Ollama", "https://ollama.com"]],
      learn: ["litellm", "openrouter", "bedrock-docs"] },
    { id: "models", icon: "🧠", t: "Models", color: "#8b5cf6",
      d: "The engines: frontier closed models (Claude, GPT, Gemini), open-weight families (Llama, Qwen, Gemma, Mistral, DeepSeek, gpt-oss), reasoning, multimodal, embedding and small on-device models.",
      concepts: ["Frontier vs. open-weight", "Reasoning models", "Multimodal", "Embedding models", "Small / on-device models", "Fine-tuning & distillation"],
      tools: [["Hugging Face Hub", "https://huggingface.co/models"], ["LMArena", "https://lmarena.ai"], ["Artificial Analysis", "https://artificialanalysis.ai"], ["Ollama library", "https://ollama.com/library"]],
      learn: ["karpathy-intro-llm", "hf-llm-course", "mlabonne"] }
  ],
  stackOps: { id: "ops", icon: "📈", t: "Evals · Observability · Guardrails · Security · Cost", color: "#64748b",
    d: "This applies at every layer. You can't improve what you don't measure, and you can't ship what you can't secure: evals in CI, traces of every model and tool call, guardrails, prompt-injection defenses, least privilege, and cost/latency budgets.",
    concepts: ["Evals & LLM-as-judge", "Tracing (OpenTelemetry)", "Guardrails", "Prompt-injection defense", "Least privilege & sandboxing", "Cost & latency budgets"],
    tools: [["Langfuse", "https://langfuse.com/docs"], ["Arize Phoenix", "https://phoenix.arize.com"], ["Promptfoo", "https://www.promptfoo.dev"], ["NeMo Guardrails", "https://github.com/NVIDIA/NeMo-Guardrails"], ["Ragas", "https://docs.ragas.io"], ["OWASP LLM Top 10", "https://genai.owasp.org/llm-top-10/"]],
    learn: ["hamel-evals", "owasp-llm", "langfuse"] },

  harnessParts: [
    { icon: "🔁", t: "Agent loop", d: "Calls the model, executes tool calls, feeds back results, stops on success, error or budget." },
    { icon: "🔧", t: "Tools & MCP", d: "Purpose-built tools (read/edit files, shell, search, browser) and MCP servers for external systems." },
    { icon: "🧾", t: "Context management", d: "System prompt, memory files (CLAUDE.md/AGENTS.md), compaction, just-in-time file reading." },
    { icon: "👥", t: "Sub-agents", d: "Delegate exploration or parallel work to fresh contexts; return condensed results." },
    { icon: "📦", t: "Skills", d: "On-demand packages of instructions & scripts — progressive disclosure keeps context lean." },
    { icon: "🛡️", t: "Permissions & sandbox", d: "Allow/deny rules, approval prompts, containers, network limits — contain mistakes and injections." },
    { icon: "🪝", t: "Hooks", d: "Deterministic scripts at lifecycle events: format on edit, block risky commands, notify." },
    { icon: "🧪", t: "Verification", d: "Tests, linters, type-checkers, screenshots, evals — so the agent can check its own work." }
  ],

  harnessExamples: [
    { name: "Claude Code", desc: "Anthropic's agentic coding tool for terminal, IDE, desktop & web.", url: "https://docs.claude.com/en/docs/claude-code/overview", best: "Coding agent" },
    { name: "Claude Agent SDK", desc: "Build custom agents on the Claude Code harness.", url: "https://docs.claude.com/en/docs/agent-sdk/overview", best: "Build your own" },
    { name: "OpenAI Codex", desc: "OpenAI's coding agent (CLI, IDE, cloud).", url: "https://developers.openai.com/codex", best: "Coding agent" },
    { name: "Gemini CLI", desc: "Google's open-source terminal agent.", url: "https://github.com/google-gemini/gemini-cli", best: "Open source" },
    { name: "Aider", desc: "Git-aware pair programmer; works with local models.", url: "https://aider.chat", best: "Open source" },
    { name: "OpenHands", desc: "Open platform for software-dev agents with sandboxed runtime.", url: "https://github.com/All-Hands-AI/OpenHands", best: "Open source" },
    { name: "OpenAI Agents SDK", desc: "Agents, handoffs, guardrails, tracing.", url: "https://openai.github.io/openai-agents-python/", best: "Framework" },
    { name: "Google ADK", desc: "Agent Development Kit for multi-agent systems.", url: "https://google.github.io/adk-docs/", best: "Framework" }
  ],

  harnessRules: [
    "<b>Start simple.</b> One model, a few great tools, a clear loop. Add sub-agents and frameworks only when evals show the need.",
    "<b>Workflow first, agent when needed.</b> Predictable processes belong in deterministic automations; give autonomy only where steps can't be known in advance.",
    "<b>Keep models swappable.</b> Go through a gateway or OpenAI-compatible interface so you can switch providers, fall back, or route to local models.",
    "<b>Automate the boring, approve the irreversible.</b> Let AI draft, classify and prepare; require a human click to pay, delete, deploy or email customers.",
    "<b>Make automations idempotent.</b> Retries happen: an LLM step re-run must not create two tickets or send two emails.",
    "<b>Design tools for the model, not for your API.</b> Clear names, rich descriptions, helpful errors, concise outputs.",
    "<b>Budget the context.</b> Load information just-in-time, compact long histories, isolate noisy work in sub-agents.",
    "<b>Give the agent a way to verify.</b> Tests, linters and screenshots turn guessing into iterating.",
    "<b>Persist progress outside the context.</b> Notes, to-do files and git commits let work survive across sessions.",
    "<b>Least privilege by default.</b> Sandbox execution, require approval for irreversible or external actions, treat all fetched content as untrusted.",
    "<b>Make it observable.</b> Trace every model call and tool call; read transcripts — that's where improvements come from.",
    "<b>Evaluate the whole system.</b> Benchmark the harness + model on your real tasks, and re-run when models change."
  ]
};

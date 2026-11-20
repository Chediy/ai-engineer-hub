/* =========================================================================
   AI Engineer Hub — curated data
   All entries are LINKS to external, publicly available resources.
   No third-party content, logos, thumbnails or videos are re-hosted here.
   ========================================================================= */

window.AI_DATA = (() => {
  const topics = {
    foundations: { label: "ML & DL Foundations", icon: "🧮", color: "#8b5cf6" },
    llm:         { label: "LLMs & Transformers", icon: "🧠", color: "#6366f1" },
    prompt:      { label: "Prompt Engineering",  icon: "✍️", color: "#ec4899" },
    rag:         { label: "RAG & Retrieval",     icon: "📚", color: "#14b8a6" },
    agents:      { label: "Agentic AI",          icon: "🤖", color: "#f59e0b" },
    harness:     { label: "AI Harness & Tooling", icon: "🛠️", color: "#ef4444" },
    automation:  { label: "Automation & Workflows", icon: "⚙️", color: "#f97316" },
    local:       { label: "Open & Local Models", icon: "💻", color: "#22c55e" },
    finetune:    { label: "Fine-tuning",         icon: "🎛️", color: "#0ea5e9" },
    llmops:      { label: "Evals & LLMOps",      icon: "📈", color: "#a855f7" },
    safety:      { label: "Safety & Security",   icon: "🛡️", color: "#64748b" }
  };

  const levels = {
    beginner:     { label: "Beginner",     icon: "🌱", desc: "AI literacy, first API calls, prompting, how LLMs work at a high level." },
    intermediate: { label: "Intermediate", icon: "🚀", desc: "Build real apps: RAG, tool use, agents, MCP, evals, running local models." },
    professional: { label: "Professional", icon: "🏆", desc: "Production systems: harness & context engineering, serving at scale, training internals, security." }
  };

  const formats = {
    course:      { label: "Course",      icon: "🎓" },
    docs:        { label: "Docs",        icon: "📘" },
    video:       { label: "Video",       icon: "▶️" },
    repo:        { label: "Repo",        icon: "💻" },
    article:     { label: "Article",     icon: "📝" },
    book:        { label: "Book",        icon: "📚" },
    paper:       { label: "Paper",       icon: "📄" },
    interactive: { label: "Interactive", icon: "🧪" }
  };

  // Brand names are trademarks of their owners. We only use a text monogram + color.
  const providers = {
    anthropic:      { name: "Anthropic",        mono: "A",   color: "#d97757", site: "https://www.anthropic.com/learn", blurb: "Makers of Claude. Anthropic Academy, prompt-engineering tutorials, the Claude & Claude Code docs, MCP and excellent engineering articles on agents and context engineering." },
    google:         { name: "Google",           mono: "G",   color: "#4285f4", site: "https://ai.google.dev", blurb: "Gemini & Gemma. ML Crash Course, Cloud Skills Boost generative-AI paths, the Kaggle GenAI intensive, Agent Development Kit and Gemini cookbook." },
    openai:         { name: "OpenAI",           mono: "O",   color: "#10a37f", site: "https://academy.openai.com", blurb: "GPT models & gpt-oss open weights. OpenAI Academy, Cookbook, platform guides, Agents SDK and Codex." },
    microsoft:      { name: "Microsoft",        mono: "M",   color: "#00a4ef", site: "https://learn.microsoft.com/en-us/ai/", blurb: "Famous free GitHub curricula (Generative AI / AI Agents / ML for Beginners), Phi small models, GraphRAG and Microsoft Learn." },
    meta:           { name: "Meta",             mono: "∞",   color: "#0866ff", site: "https://www.llama.com/docs/overview", blurb: "Llama open-weight models with official docs and the Llama cookbook." },
    huggingface:    { name: "Hugging Face",     mono: "HF",  color: "#f5a524", site: "https://huggingface.co/learn", blurb: "The home of open models. Free LLM, Agents, MCP and Deep RL courses plus Transformers, PEFT and TRL libraries." },
    deeplearningai: { name: "DeepLearning.AI",  mono: "DL",  color: "#e8475f", site: "https://www.deeplearning.ai/short-courses/", blurb: "Andrew Ng's platform. Dozens of 1-2h short courses built with Anthropic, OpenAI, Google, LangChain, AWS and more." },
    aws:            { name: "AWS",              mono: "AWS", color: "#ff9900", site: "https://skillbuilder.aws", blurb: "AWS Skill Builder and Amazon Bedrock documentation for building GenAI on AWS." },
    nvidia:         { name: "NVIDIA",           mono: "NV",  color: "#76b900", site: "https://www.nvidia.com/en-us/training/", blurb: "Deep Learning Institute courses and high-performance inference stacks (TensorRT-LLM)." },
    mistral:        { name: "Mistral AI",       mono: "Mi",  color: "#fa520f", site: "https://docs.mistral.ai", blurb: "European open-weight and commercial models with clear developer docs." },
    langchain:      { name: "LangChain",        mono: "LC",  color: "#1f9e89", site: "https://academy.langchain.com", blurb: "LangChain & LangGraph frameworks, LangChain Academy courses for agents." },
    academia:       { name: "Universities",     mono: "U",   color: "#b31b1b", site: "https://web.stanford.edu/class/cs224n/", blurb: "Stanford, MIT and others publish world-class lectures and material for free." },
    community:      { name: "Community & Indie", mono: "★",  color: "#8b5cf6", site: "https://github.com/mlabonne/llm-course", blurb: "Independent educators and open-source projects: Karpathy, fast.ai, 3Blue1Brown, Raschka, Ollama, llama.cpp, vLLM..." }
  };

  // c(id, title, provider, level, topics[], format, cost, duration, url, desc)
  const c = (id, title, provider, level, t, format, cost, duration, url, desc) =>
    ({ id, title, provider, level, topics: t, format, cost, duration, url, desc });

  const courses = [
    /* ------------------------------ BEGINNER ------------------------------ */
    c("anth-academy", "Anthropic Academy (AI Fluency & more)", "anthropic", "beginner", ["foundations", "prompt"], "course", "free", "1–4h per course", "https://www.anthropic.com/learn", "Official Anthropic learning hub: AI Fluency framework, Claude for work, building with the API and Claude Code."),
    c("anth-prompt-tut", "Prompt Engineering Interactive Tutorial", "anthropic", "beginner", ["prompt"], "interactive", "free", "~4h", "https://github.com/anthropics/prompt-eng-interactive-tutorial", "9 chapters with exercises: clear instructions, roles, XML tags, examples, chaining, avoiding hallucinations."),
    c("claude-prompt-docs", "Claude Prompt Engineering Guide", "anthropic", "beginner", ["prompt"], "docs", "free", "1–2h", "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview", "Official best practices: be clear & direct, multishot examples, chain of thought, XML tags, system prompts."),
    c("google-ai-essentials", "Google AI Essentials", "google", "beginner", ["foundations", "prompt"], "course", "paid", "~10h", "https://grow.google/ai-essentials/", "Practical, non-technical intro to using generative AI tools productively and responsibly."),
    c("google-intro-genai", "Introduction to Generative AI (learning path)", "google", "beginner", ["foundations", "llm"], "course", "free", "~5h", "https://www.cloudskillsboost.google/paths/118", "Google Cloud Skills Boost path: intro to GenAI, LLMs, responsible AI, image generation, attention."),
    c("google-mlcc", "Machine Learning Crash Course", "google", "beginner", ["foundations"], "course", "free", "~15h", "https://developers.google.com/machine-learning/crash-course", "Regression, classification, embeddings, neural networks and LLM basics with interactive visualizations."),
    c("gemini-quickstart", "Gemini API Quickstart", "google", "beginner", ["llm"], "docs", "freemium", "30 min", "https://ai.google.dev/gemini-api/docs/quickstart", "Get an API key and make your first Gemini call in Python, JS, Go or REST."),
    c("ms-genai-beginners", "Generative AI for Beginners (21 lessons)", "microsoft", "beginner", ["llm", "prompt", "rag"], "repo", "free", "~20h", "https://github.com/microsoft/generative-ai-for-beginners", "Hugely popular free curriculum: prompting, chat apps, RAG, vector DBs, agents, fine-tuning, security."),
    c("ms-ai-beginners", "AI for Beginners (12 weeks)", "microsoft", "beginner", ["foundations"], "repo", "free", "12 weeks", "https://github.com/microsoft/AI-For-Beginners", "Classic AI, neural networks, computer vision, NLP and ethics with notebooks."),
    c("ms-ml-beginners", "ML for Beginners", "microsoft", "beginner", ["foundations"], "repo", "free", "12 weeks", "https://github.com/microsoft/ML-For-Beginners", "26 lessons of classic machine learning with Scikit-learn."),
    c("ms-learn-ai", "Microsoft Learn — AI hub", "microsoft", "beginner", ["foundations", "llm"], "course", "free", "self-paced", "https://learn.microsoft.com/en-us/ai/", "Learning paths and docs for Azure AI Foundry, Copilot and AI fundamentals."),
    c("dlai-ai-everyone", "AI for Everyone", "deeplearningai", "beginner", ["foundations"], "course", "freemium", "~6h", "https://www.deeplearning.ai/courses/ai-for-everyone/", "Andrew Ng's non-technical course on what AI can and cannot do and how to adopt it."),
    c("dlai-prompt-devs", "ChatGPT Prompt Engineering for Developers", "deeplearningai", "beginner", ["prompt"], "course", "free", "~1.5h", "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", "The classic short course (with OpenAI): prompting principles, summarizing, inferring, transforming."),
    c("dlai-ml-spec", "Machine Learning Specialization", "deeplearningai", "beginner", ["foundations"], "course", "freemium", "~2 months", "https://www.deeplearning.ai/courses/machine-learning-specialization/", "Andrew Ng's modern ML foundations: supervised, unsupervised, recommenders, RL."),
    c("openai-academy", "OpenAI Academy", "openai", "beginner", ["foundations", "prompt"], "course", "free", "self-paced", "https://academy.openai.com", "Free workshops, videos and guides from OpenAI for all levels."),
    c("openai-prompt-guide", "OpenAI Prompt Engineering Guide", "openai", "beginner", ["prompt"], "docs", "free", "1h", "https://platform.openai.com/docs/guides/prompt-engineering", "Official strategies for getting better results from GPT models."),
    c("elements-ai", "Elements of AI", "academia", "beginner", ["foundations"], "course", "free", "~30h", "https://www.elementsofai.com", "University of Helsinki's free online course, taken by more than a million people."),
    c("mit-6s191", "MIT 6.S191 Introduction to Deep Learning", "academia", "beginner", ["foundations", "llm"], "video", "free", "~10h", "http://introtodeeplearning.com", "MIT's yearly bootcamp: lectures + labs on deep learning, LLMs and generative models."),
    c("3b1b-nn", "Neural Networks series (3Blue1Brown)", "community", "beginner", ["foundations", "llm"], "video", "free", "~3h", "https://www.3blue1brown.com/topics/neural-networks", "Beautiful visual explanations of neural nets, backprop, GPT and attention."),
    c("karpathy-intro-llm", "Intro to Large Language Models (Karpathy)", "community", "beginner", ["llm"], "video", "free", "1h", "https://www.youtube.com/watch?v=zjkBMFhNj_g", "The best 1-hour overview of what LLMs are, how they're trained and where they're going."),
    c("karpathy-deep-dive", "Deep Dive into LLMs like ChatGPT (Karpathy)", "community", "beginner", ["llm"], "video", "free", "3.5h", "https://www.youtube.com/watch?v=7xTGNNLPyMI", "General-audience deep dive: pretraining, tokenization, post-training, RLHF, hallucinations."),
    c("promptingguide", "Prompt Engineering Guide (DAIR.AI)", "community", "beginner", ["prompt", "rag", "agents"], "docs", "free", "self-paced", "https://www.promptingguide.ai", "Encyclopedic open guide to prompting techniques, RAG and agents with paper references."),
    c("kaggle-intro-ml", "Kaggle Learn — Intro to Machine Learning", "google", "beginner", ["foundations"], "interactive", "free", "~3h", "https://www.kaggle.com/learn/intro-to-machine-learning", "Hands-on micro-course in browser notebooks."),
    c("llm-viz", "LLM Visualization (3D GPT walkthrough)", "community", "beginner", ["llm"], "interactive", "free", "1h", "https://bbycroft.net/llm", "Interactive 3D visualization of every step inside a GPT-style model."),
    c("ollama", "Ollama — run models locally", "community", "beginner", ["local"], "docs", "free", "15 min", "https://ollama.com", "The easiest way to download and run open models on your laptop with one command and an OpenAI-compatible API."),
    c("lmstudio", "LM Studio", "community", "beginner", ["local"], "docs", "free", "15 min", "https://lmstudio.ai/docs", "Desktop app to discover, download and chat with local models; includes a local server."),
    c("open-webui", "Open WebUI", "community", "beginner", ["local"], "repo", "free", "30 min", "https://github.com/open-webui/open-webui", "Self-hosted ChatGPT-like interface for Ollama & OpenAI-compatible backends, with RAG built in."),
    c("llama-docs", "Llama Docs — Getting Started", "meta", "beginner", ["local", "llm"], "docs", "free", "1h", "https://www.llama.com/docs/overview", "Official guides to download, run, prompt and fine-tune Llama models."),
    c("aws-skillbuilder", "AWS Skill Builder — Generative AI", "aws", "beginner", ["foundations", "llm"], "course", "freemium", "self-paced", "https://skillbuilder.aws", "Free and subscription courses on GenAI fundamentals and Amazon Bedrock."),
    c("bluedot", "AI Safety Fundamentals (BlueDot Impact)", "community", "beginner", ["safety"], "course", "free", "~8 weeks", "https://bluedot.org", "Cohort-based courses on AI alignment and governance."),

    /* ---------------------------- INTERMEDIATE ---------------------------- */
    c("anth-courses", "Anthropic Courses: API, Prompting, Evals, Tool Use", "anthropic", "intermediate", ["prompt", "llmops", "agents"], "repo", "free", "~10h", "https://github.com/anthropics/courses", "Five notebook courses: API fundamentals, prompt engineering, real-world prompting, prompt evaluations and tool use."),
    c("anth-cookbook", "Claude Cookbooks", "anthropic", "intermediate", ["rag", "agents", "llm"], "repo", "free", "self-paced", "https://github.com/anthropics/anthropic-cookbook", "Recipes for RAG, tool use, sub-agents, structured output, vision, prompt caching and more."),
    c("anth-effective-agents", "Building Effective Agents", "anthropic", "intermediate", ["agents"], "article", "free", "30 min", "https://www.anthropic.com/engineering/building-effective-agents", "Must-read: workflows vs. agents, prompt chaining, routing, orchestrator-workers, evaluator-optimizer."),
    c("anth-cc-best", "Claude Code: Best Practices for Agentic Coding", "anthropic", "intermediate", ["harness"], "article", "free", "30 min", "https://www.anthropic.com/engineering/claude-code-best-practices", "CLAUDE.md files, explore-plan-code-commit, TDD with agents, headless mode and multi-agent workflows."),
    c("claude-code-docs", "Claude Code Documentation", "anthropic", "intermediate", ["harness", "agents"], "docs", "freemium", "self-paced", "https://docs.claude.com/en/docs/claude-code/overview", "The agentic coding tool: memory, hooks, subagents, skills, MCP, permissions and the SDK."),
    c("mcp-docs", "Model Context Protocol (MCP)", "anthropic", "intermediate", ["agents", "harness"], "docs", "free", "2h", "https://modelcontextprotocol.io", "Open standard to connect AI apps to tools and data. Spec, SDKs and server/client tutorials."),
    c("dlai-mcp", "MCP: Build Rich-Context AI Apps with Anthropic", "deeplearningai", "intermediate", ["agents", "harness"], "course", "free", "~1.5h", "https://www.deeplearning.ai/short-courses/mcp-build-rich-context-ai-apps-with-anthropic/", "Build MCP servers and clients and connect them to a chatbot."),
    c("dlai-claude-code", "Claude Code: A Highly Agentic Coding Assistant", "deeplearningai", "intermediate", ["harness"], "course", "free", "~2h", "https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/", "Hands-on workflows with Claude Code: context, subagents, hooks, MCP, GitHub integration."),
    c("dlai-agentic", "Agentic AI (Andrew Ng)", "deeplearningai", "intermediate", ["agents"], "course", "freemium", "~6h", "https://www.deeplearning.ai/courses/agentic-ai/", "Design patterns: reflection, tool use, planning, multi-agent; plus evals and error analysis."),
    c("dlai-genai-llms", "Generative AI with Large Language Models", "deeplearningai", "intermediate", ["llm", "finetune"], "course", "freemium", "~16h", "https://www.deeplearning.ai/courses/generative-ai-with-llms/", "With AWS: LLM lifecycle, pretraining, scaling laws, fine-tuning, PEFT, RLHF."),
    c("dlai-langchain", "LangChain for LLM Application Development", "deeplearningai", "intermediate", ["rag", "agents"], "course", "free", "~1h", "https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/", "Models, prompts, memory, chains, Q&A over documents and agents."),
    c("dlai-adv-rag", "Building and Evaluating Advanced RAG", "deeplearningai", "intermediate", ["rag", "llmops"], "course", "free", "~1h", "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/", "Sentence-window and auto-merging retrieval plus the RAG triad of evaluation metrics."),
    c("dlai-langgraph", "AI Agents in LangGraph", "deeplearningai", "intermediate", ["agents"], "course", "free", "~1.5h", "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/", "Build an agent from scratch, then with LangGraph: persistence, human-in-the-loop, search tools."),
    c("dlai-short", "DeepLearning.AI Short Courses (catalog)", "deeplearningai", "intermediate", ["llm", "rag", "agents", "llmops"], "course", "free", "1–2h each", "https://www.deeplearning.ai/short-courses/", "Fresh 1–2h courses every month from top AI companies. Bookmark this one."),
    c("hf-llm-course", "Hugging Face LLM Course", "huggingface", "intermediate", ["llm", "finetune"], "course", "free", "~20h", "https://huggingface.co/learn/llm-course", "Transformers, tokenizers, datasets, fine-tuning, reasoning models — from the open-source leaders."),
    c("hf-agents", "Hugging Face Agents Course", "huggingface", "intermediate", ["agents"], "course", "free", "~15h", "https://huggingface.co/learn/agents-course", "Certified course: agent fundamentals, smolagents, LlamaIndex, LangGraph, final project."),
    c("hf-mcp", "Hugging Face MCP Course", "huggingface", "intermediate", ["agents", "harness"], "course", "free", "~6h", "https://huggingface.co/learn/mcp-course", "Learn MCP from basics to building and deploying MCP-powered apps."),
    c("hf-transformers", "Transformers Library Docs", "huggingface", "intermediate", ["llm", "local"], "docs", "free", "self-paced", "https://huggingface.co/docs/transformers", "Load, run and fine-tune thousands of open models in PyTorch."),
    c("kaggle-genai", "5-Day Gen AI Intensive (Google × Kaggle)", "google", "intermediate", ["llm", "rag", "agents", "llmops"], "course", "free", "5 days", "https://www.kaggle.com/learn-guide/5-day-genai", "Whitepapers, podcasts and codelabs: foundations, prompting, embeddings, agents, MLOps for GenAI."),
    c("gemini-cookbook", "Gemini Cookbook", "google", "intermediate", ["llm", "agents", "rag"], "repo", "free", "self-paced", "https://github.com/google-gemini/cookbook", "Notebooks for function calling, long context, multimodal, grounding and live API."),
    c("google-adk", "Agent Development Kit (ADK)", "google", "intermediate", ["agents"], "docs", "free", "self-paced", "https://google.github.io/adk-docs/", "Google's open-source framework to build, evaluate and deploy multi-agent systems."),
    c("gemma-docs", "Gemma Open Models Docs", "google", "intermediate", ["local", "finetune"], "docs", "free", "self-paced", "https://ai.google.dev/gemma", "Run and fine-tune Google's open Gemma family on laptops, phones and servers."),
    c("gemini-cli", "Gemini CLI", "google", "intermediate", ["harness"], "repo", "free", "1h", "https://github.com/google-gemini/gemini-cli", "Open-source terminal coding agent — a great harness to read the source of."),
    c("openai-cookbook", "OpenAI Cookbook", "openai", "intermediate", ["llm", "rag", "agents"], "docs", "free", "self-paced", "https://cookbook.openai.com", "Example code and guides: embeddings, RAG, function calling, evals, structured outputs."),
    c("openai-agents-sdk", "OpenAI Agents SDK", "openai", "intermediate", ["agents"], "docs", "free", "2h", "https://openai.github.io/openai-agents-python/", "Lightweight framework: agents, handoffs, guardrails, tracing."),
    c("openai-codex", "OpenAI Codex Docs", "openai", "intermediate", ["harness"], "docs", "freemium", "1h", "https://developers.openai.com/codex", "OpenAI's coding agent for CLI, IDE and cloud; learn AGENTS.md and agent workflows."),
    c("gpt-oss", "gpt-oss open-weight models", "openai", "intermediate", ["local"], "repo", "free", "1h", "https://github.com/openai/gpt-oss", "OpenAI's open-weight reasoning models with reference implementations and tool-use harmony format."),
    c("ms-agents-beginners", "AI Agents for Beginners", "microsoft", "intermediate", ["agents"], "repo", "free", "~12h", "https://github.com/microsoft/ai-agents-for-beginners", "Lessons on agentic design patterns, tool use, RAG agents, multi-agent, planning, production."),
    c("phi-cookbook", "Phi Cookbook (small language models)", "microsoft", "intermediate", ["local", "finetune"], "repo", "free", "self-paced", "https://github.com/microsoft/PhiCookbook", "Run, fine-tune and deploy Microsoft's Phi SLMs on edge devices and cloud."),
    c("llama-cookbook", "Llama Cookbook", "meta", "intermediate", ["local", "rag", "finetune"], "repo", "free", "self-paced", "https://github.com/meta-llama/llama-cookbook", "Official recipes for inference, fine-tuning, RAG and end-to-end apps with Llama."),
    c("mistral-docs", "Mistral AI Docs", "mistral", "intermediate", ["llm", "local"], "docs", "freemium", "self-paced", "https://docs.mistral.ai", "API and open-weight model guides: function calling, fine-tuning, self-deployment."),
    c("langchain-academy", "LangChain Academy — Intro to LangGraph", "langchain", "intermediate", ["agents"], "course", "free", "~6h", "https://academy.langchain.com", "Free official courses on building stateful agents with LangGraph."),
    c("langgraph-docs", "LangGraph Docs", "langchain", "intermediate", ["agents"], "docs", "free", "self-paced", "https://langchain-ai.github.io/langgraph/", "Low-level orchestration framework for controllable, durable agents."),
    c("llamaindex", "LlamaIndex Docs", "community", "intermediate", ["rag", "agents"], "docs", "free", "self-paced", "https://docs.llamaindex.ai", "Data framework for RAG: ingestion, indexing, query engines and agent workflows."),
    c("pinecone-learn", "Pinecone Learning Center", "community", "intermediate", ["rag"], "article", "free", "self-paced", "https://www.pinecone.io/learn/", "Great free articles on embeddings, vector search, chunking, hybrid search and reranking."),
    c("weaviate-academy", "Weaviate Academy", "community", "intermediate", ["rag"], "course", "free", "self-paced", "https://weaviate.io/developers/academy", "Short free courses on vector databases and semantic search."),
    c("illustrated-transformer", "The Illustrated Transformer", "community", "intermediate", ["llm"], "article", "free", "45 min", "https://jalammar.github.io/illustrated-transformer/", "The legendary visual explanation of self-attention and the transformer."),
    c("karpathy-zth", "Neural Networks: Zero to Hero (Karpathy)", "community", "intermediate", ["foundations", "llm"], "video", "free", "~20h", "https://karpathy.ai/zero-to-hero.html", "Build backprop, makemore and GPT from scratch in code. The best hands-on LLM internals course."),
    c("karpathy-gpt", "Let's build GPT: from scratch, in code", "community", "intermediate", ["llm"], "video", "free", "2h", "https://www.youtube.com/watch?v=kCc8FmEb1nY", "Code a transformer language model step by step."),
    c("3b1b-gpt", "But what is a GPT? (3Blue1Brown)", "community", "intermediate", ["llm"], "video", "free", "27 min", "https://www.youtube.com/watch?v=wjZofJX0v4M", "Visual intro to transformers, embeddings and next-token prediction."),
    c("3b1b-attention", "Attention in transformers, visually explained", "community", "intermediate", ["llm"], "video", "free", "26 min", "https://www.youtube.com/watch?v=eMlx5fFNoYc", "Queries, keys, values and multi-head attention — visually."),
    c("fastai", "Practical Deep Learning for Coders (fast.ai)", "community", "intermediate", ["foundations"], "course", "free", "~30h", "https://course.fast.ai", "Top-down, code-first deep learning course used by thousands of practitioners."),
    c("dlai-dl-spec", "Deep Learning Specialization", "deeplearningai", "intermediate", ["foundations"], "course", "freemium", "~3 months", "https://www.deeplearning.ai/courses/deep-learning-specialization/", "CNNs, RNNs, transformers and how to structure ML projects."),
    c("raschka-scratch", "Build a Large Language Model (From Scratch)", "community", "intermediate", ["llm", "finetune"], "repo", "free", "~30h", "https://github.com/rasbt/LLMs-from-scratch", "Code for Sebastian Raschka's book: tokenizer, attention, GPT, pretraining, fine-tuning (book is paid, code is free)."),
    c("mlabonne", "The LLM Course (Maxime Labonne)", "community", "intermediate", ["llm", "finetune", "local"], "repo", "free", "self-paced", "https://github.com/mlabonne/llm-course", "Roadmaps + notebooks: LLM fundamentals, the LLM scientist and the LLM engineer tracks."),
    c("unsloth", "Unsloth Docs — fast fine-tuning", "community", "intermediate", ["finetune", "local"], "docs", "free", "2h", "https://docs.unsloth.ai", "Fine-tune open models 2× faster with less VRAM; free Colab notebooks for LoRA/QLoRA."),
    c("llamacpp", "llama.cpp", "community", "intermediate", ["local"], "repo", "free", "1h", "https://github.com/ggml-org/llama.cpp", "The C/C++ engine behind most local AI: GGUF format, quantization, CPU/GPU/Metal inference, server."),
    c("mlx", "MLX & mlx-lm (Apple silicon)", "community", "intermediate", ["local", "finetune"], "repo", "free", "1h", "https://github.com/ml-explore/mlx-lm", "Run and fine-tune LLMs efficiently on Macs with unified memory."),
    c("jan", "Jan — offline ChatGPT alternative", "community", "beginner", ["local"], "docs", "free", "15 min", "https://jan.ai", "Open-source desktop app that runs models 100% offline."),
    c("aider", "Aider — AI pair programming in your terminal", "community", "intermediate", ["harness"], "docs", "free", "1h", "https://aider.chat", "Open-source coding agent that works with many models, including local ones."),
    c("agents-md", "AGENTS.md — instructions for coding agents", "community", "intermediate", ["harness"], "docs", "free", "15 min", "https://agents.md", "Open format to give coding agents project context, adopted by many tools."),
    c("weng-agents", "LLM Powered Autonomous Agents (Lilian Weng)", "community", "intermediate", ["agents"], "article", "free", "1h", "https://lilianweng.github.io/posts/2023-06-23-agent/", "Foundational overview: planning, memory, tool use, with references."),
    c("hamel-evals", "Your AI Product Needs Evals (Hamel Husain)", "community", "intermediate", ["llmops"], "article", "free", "45 min", "https://hamel.dev/blog/posts/evals/", "Practical guide to building eval systems: unit tests, LLM-as-judge, error analysis."),
    c("ragas", "Ragas — RAG evaluation", "community", "intermediate", ["rag", "llmops"], "docs", "free", "1h", "https://docs.ragas.io", "Metrics for faithfulness, answer relevancy, context precision/recall."),
    c("fsdl-llm", "Full Stack LLM Bootcamp", "community", "intermediate", ["llmops", "prompt", "rag"], "video", "free", "~10h", "https://fullstackdeeplearning.com/llm-bootcamp/", "Prompting, augmenting, UX, LLMOps, and shipping LLM products."),
    c("owasp-llm", "OWASP Top 10 for LLM Applications", "community", "intermediate", ["safety"], "docs", "free", "1h", "https://genai.owasp.org/llm-top-10/", "Prompt injection, data leakage, excessive agency... the security checklist every AI engineer needs."),
    c("cs229", "Stanford CS229 Machine Learning", "academia", "intermediate", ["foundations"], "course", "free", "~40h", "https://cs229.stanford.edu", "Rigorous ML theory: supervised learning, kernels, learning theory, unsupervised, RL."),
    c("bedrock-docs", "Amazon Bedrock User Guide", "aws", "intermediate", ["llm", "rag", "agents"], "docs", "freemium", "self-paced", "https://docs.aws.amazon.com/bedrock/", "Use foundation models, knowledge bases (RAG), agents and guardrails on AWS."),
    c("nvidia-dli", "NVIDIA Deep Learning Institute", "nvidia", "intermediate", ["foundations", "llm", "local"], "course", "freemium", "self-paced", "https://www.nvidia.com/en-us/training/", "Self-paced and instructor-led courses on GenAI, RAG, accelerated computing; some free."),
    c("qwen", "Qwen open models (GitHub)", "community", "intermediate", ["local"], "repo", "free", "1h", "https://github.com/QwenLM", "Alibaba's popular open-weight family: chat, coder, vision, reasoning in many sizes."),

    /* ---------------------------- PROFESSIONAL ---------------------------- */
    c("anth-context-eng", "Effective Context Engineering for AI Agents", "anthropic", "professional", ["harness", "agents"], "article", "free", "40 min", "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", "Treat context as a finite resource: compaction, note-taking, just-in-time retrieval, sub-agents."),
    c("anth-tools-agents", "Writing Effective Tools for Agents", "anthropic", "professional", ["harness", "agents"], "article", "free", "30 min", "https://www.anthropic.com/engineering/writing-tools-for-agents", "Design, evaluate and optimize tools (and MCP servers) with agents in the loop."),
    c("anth-skills", "Equipping Agents with Agent Skills", "anthropic", "professional", ["harness"], "article", "free", "20 min", "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills", "Progressive disclosure: package instructions, scripts and resources that agents load on demand."),
    c("anth-multiagent", "How We Built Our Multi-Agent Research System", "anthropic", "professional", ["agents", "harness"], "article", "free", "30 min", "https://www.anthropic.com/engineering/multi-agent-research-system", "Orchestrator + parallel subagents, prompting lessons, evals and production reliability."),
    c("anth-long-running", "Effective Harnesses for Long-Running Agents", "anthropic", "professional", ["harness"], "article", "free", "20 min", "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents", "How to keep agents productive across many context windows: progress files, initializer agents, testing."),
    c("agent-sdk", "Claude Agent SDK", "anthropic", "professional", ["harness", "agents"], "docs", "freemium", "self-paced", "https://docs.claude.com/en/docs/agent-sdk/overview", "Build your own agents on the same harness that powers Claude Code: tools, permissions, sessions, subagents."),
    c("cs224n", "Stanford CS224N: NLP with Deep Learning", "academia", "professional", ["llm", "foundations"], "course", "free", "~40h", "https://web.stanford.edu/class/cs224n/", "The reference NLP course: word vectors, transformers, pretraining, post-training, LLM topics."),
    c("cs336", "Stanford CS336: Language Modeling from Scratch", "academia", "professional", ["llm", "finetune"], "course", "free", "~60h", "https://stanford-cs336.github.io/", "Build every piece of an LLM: tokenizer, architecture, GPU kernels, scaling, data, alignment."),
    c("attention-paper", "Attention Is All You Need (2017)", "academia", "professional", ["llm"], "paper", "free", "2h", "https://arxiv.org/abs/1706.03762", "The paper that introduced the transformer."),
    c("rag-paper", "Retrieval-Augmented Generation (Lewis et al., 2020)", "academia", "professional", ["rag"], "paper", "free", "1.5h", "https://arxiv.org/abs/2005.11401", "The original RAG paper combining parametric and non-parametric memory."),
    c("react-paper", "ReAct: Reasoning + Acting (2022)", "academia", "professional", ["agents"], "paper", "free", "1h", "https://arxiv.org/abs/2210.03629", "The thought → action → observation loop at the heart of most agents."),
    c("graphrag", "Microsoft GraphRAG", "microsoft", "professional", ["rag"], "docs", "free", "2h", "https://microsoft.github.io/graphrag/", "Knowledge-graph-based RAG for global questions over large corpora."),
    c("vllm", "vLLM — high-throughput serving", "community", "professional", ["local", "llmops"], "docs", "free", "2h", "https://docs.vllm.ai", "PagedAttention, continuous batching, tensor parallelism, OpenAI-compatible server for production."),
    c("sglang", "SGLang", "community", "professional", ["local", "llmops"], "repo", "free", "2h", "https://github.com/sgl-project/sglang", "Fast serving framework with RadixAttention prefix caching and structured generation."),
    c("trtllm", "TensorRT-LLM", "nvidia", "professional", ["local", "llmops"], "repo", "free", "self-paced", "https://github.com/NVIDIA/TensorRT-LLM", "NVIDIA's optimized inference library for maximum GPU performance."),
    c("hf-peft", "PEFT — LoRA & parameter-efficient fine-tuning", "huggingface", "professional", ["finetune"], "docs", "free", "2h", "https://huggingface.co/docs/peft", "LoRA, QLoRA, adapters: fine-tune billions of parameters on a single GPU."),
    c("hf-trl", "TRL — RLHF, DPO, GRPO", "huggingface", "professional", ["finetune"], "docs", "free", "3h", "https://huggingface.co/docs/trl", "Post-training library for SFT, reward modeling, DPO and RL with verifiable rewards."),
    c("hf-deep-rl", "Hugging Face Deep RL Course", "huggingface", "professional", ["foundations", "finetune"], "course", "free", "~30h", "https://huggingface.co/learn/deep-rl-course", "Reinforcement learning from Q-learning to PPO — foundation for RLHF and reasoning models."),
    c("spinning-up", "Spinning Up in Deep RL", "openai", "professional", ["foundations"], "docs", "free", "~20h", "https://spinningup.openai.com", "OpenAI's educational resource on deep reinforcement learning."),
    c("chip-ai-eng", "AI Engineering (Chip Huyen, O'Reilly)", "community", "professional", ["llmops", "rag", "agents", "finetune"], "book", "paid", "book", "https://www.oreilly.com/library/view/ai-engineering/9781098166298/", "The reference book on building applications with foundation models: evals, RAG, agents, fine-tuning, inference."),
    c("eugene-patterns", "Patterns for Building LLM-based Systems", "community", "professional", ["llmops", "rag"], "article", "free", "1h", "https://eugeneyan.com/writing/llm-patterns/", "Evals, RAG, fine-tuning, caching, guardrails, defensive UX, user feedback."),
    c("langfuse", "Langfuse — open-source LLM observability", "community", "professional", ["llmops"], "docs", "free", "2h", "https://langfuse.com/docs", "Tracing, prompt management, evals and datasets; self-hostable."),
    c("phoenix", "Arize Phoenix — tracing & evals", "community", "professional", ["llmops"], "docs", "free", "2h", "https://phoenix.arize.com", "Open-source observability with OpenTelemetry tracing and LLM evals."),
    c("swebench", "SWE-bench", "academia", "professional", ["harness", "llmops"], "docs", "free", "1h", "https://www.swebench.com", "The benchmark for coding agents on real GitHub issues — study how harnesses are compared."),
    c("openhands", "OpenHands — open-source coding agent", "community", "professional", ["harness", "agents"], "repo", "free", "2h", "https://github.com/All-Hands-AI/OpenHands", "Read the source of a full agent harness: sandboxed runtime, tools, event stream, micro-agents."),
    c("deepseek", "DeepSeek open models (GitHub)", "community", "professional", ["local", "llm"], "repo", "free", "2h", "https://github.com/deepseek-ai", "Open MoE and reasoning models with detailed technical reports — great to study."),
    c("anth-research", "Anthropic Research (alignment & interpretability)", "anthropic", "professional", ["safety"], "article", "free", "self-paced", "https://www.anthropic.com/research", "Interpretability, alignment and societal-impact research papers."),
    c("lmarena", "LMArena leaderboard", "community", "professional", ["llmops"], "interactive", "free", "—", "https://lmarena.ai", "Crowd-sourced head-to-head model rankings. Use with other evals, never alone."),

    /* ------------------ AI HARNESS: automation, gateways, data, frameworks ------------------ */
    c("n8n-docs", "n8n — AI workflow automation", "community", "beginner", ["automation", "agents"], "docs", "freemium", "2h", "https://docs.n8n.io", "Open-source, self-hostable workflow automation with AI agent nodes, 400+ integrations, webhooks and schedules."),
    c("zapier-ai", "Zapier — AI automation", "community", "beginner", ["automation"], "docs", "freemium", "1h", "https://zapier.com/ai", "No-code automations connecting thousands of apps, with AI steps, agents and MCP."),
    c("make", "Make — visual automation", "community", "beginner", ["automation"], "docs", "freemium", "1h", "https://www.make.com", "Drag-and-drop scenarios mixing app integrations and AI modules."),
    c("power-automate", "Microsoft Power Automate", "microsoft", "beginner", ["automation"], "docs", "freemium", "self-paced", "https://learn.microsoft.com/en-us/power-automate/", "Enterprise workflow & RPA automation in the Microsoft ecosystem, with Copilot and AI Builder."),
    c("openrouter", "OpenRouter — one API, many models", "community", "beginner", ["llm"], "docs", "freemium", "30 min", "https://openrouter.ai/docs", "Access hundreds of closed and open models through a single OpenAI-compatible API."),
    c("chroma", "Chroma — open-source vector DB", "community", "beginner", ["rag"], "docs", "free", "1h", "https://docs.trychroma.com", "The simplest embedded vector database for prototyping RAG."),
    c("cc-actions", "Claude Code GitHub Actions", "anthropic", "intermediate", ["automation", "harness"], "docs", "freemium", "1h", "https://docs.claude.com/en/docs/claude-code/github-actions", "Run a coding agent in CI: answer @mentions, review PRs, implement issues automatically."),
    c("litellm", "LiteLLM — LLM gateway", "community", "intermediate", ["llmops", "llm"], "docs", "free", "1h", "https://docs.litellm.ai", "Open-source proxy for 100+ providers: unified API, fallbacks, budgets, rate limits, logging."),
    c("pydantic-ai", "Pydantic AI", "community", "intermediate", ["agents"], "docs", "free", "2h", "https://ai.pydantic.dev", "Type-safe Python agent framework with structured outputs, tools, dependency injection and evals."),
    c("crewai", "CrewAI", "community", "intermediate", ["agents", "automation"], "docs", "freemium", "2h", "https://docs.crewai.com", "Role-based multi-agent crews and event-driven flows for automating business processes."),
    c("ai-sdk", "AI SDK (TypeScript)", "community", "intermediate", ["agents", "llm"], "docs", "free", "2h", "https://ai-sdk.dev", "Build AI apps & agents in TypeScript: streaming UI, tool calling, structured outputs, any provider."),
    c("qdrant", "Qdrant Documentation", "community", "intermediate", ["rag"], "docs", "free", "2h", "https://qdrant.tech/documentation/", "High-performance open-source vector search engine with filtering and hybrid search."),
    c("pgvector", "pgvector — vectors in PostgreSQL", "community", "intermediate", ["rag"], "repo", "free", "1h", "https://github.com/pgvector/pgvector", "Keep embeddings next to your relational data — often all you need for RAG."),
    c("promptfoo", "Promptfoo — evals & red-teaming", "community", "intermediate", ["llmops", "safety"], "docs", "free", "2h", "https://www.promptfoo.dev", "Test prompts, models and agents in CI; automated red-teaming for injections and jailbreaks."),
    c("temporal", "Temporal — durable workflows", "community", "professional", ["automation", "agents"], "docs", "free", "3h", "https://docs.temporal.io", "Durable execution for long-running agents and automations: retries, state, resumption after crashes."),
    c("a2a", "Agent2Agent (A2A) Protocol", "community", "professional", ["agents"], "docs", "free", "1h", "https://a2a-protocol.org", "Open protocol for agents from different vendors to discover each other and collaborate (complements MCP)."),
    c("nemo-guardrails", "NeMo Guardrails", "nvidia", "professional", ["safety", "llmops"], "repo", "free", "2h", "https://github.com/NVIDIA/NeMo-Guardrails", "Programmable input/output/dialog rails for LLM apps and agents.")
  ];

  // Resources that also exist in French / German (official or maintained translations).
  const localized = {
    "elements-ai": ["fr", "de"], "ms-learn-ai": ["fr", "de"], "power-automate": ["fr", "de"],
    "ms-genai-beginners": ["fr", "de"], "ms-ai-beginners": ["fr", "de"], "ms-ml-beginners": ["fr", "de"], "ms-agents-beginners": ["fr", "de"],
    "claude-prompt-docs": ["fr", "de"], "claude-code-docs": ["fr", "de"], "promptingguide": ["fr", "de"], "hf-llm-course": ["fr"]
  };
  courses.forEach((x) => (x.langs = localized[x.id] || []));

  /* ----------------------------- Roadmap ----------------------------- */
  const roadmap = [
    {
      level: "beginner",
      title: "Stage 1 — AI-literate developer",
      duration: "≈ 4–6 weeks",
      steps: [
        { t: "AI & ML vocabulary", d: "Supervised vs. unsupervised, training vs. inference, overfitting, neural networks, embeddings.", res: ["elements-ai", "google-mlcc", "3b1b-nn"] },
        { t: "How LLMs work (intuition)", d: "Tokens, next-token prediction, pretraining vs. post-training, context window, temperature, hallucinations.", res: ["karpathy-intro-llm", "karpathy-deep-dive", "llm-viz"] },
        { t: "Prompt engineering", d: "Clear instructions, roles/system prompts, few-shot examples, XML/structured prompts, chain of thought.", res: ["anth-prompt-tut", "claude-prompt-docs", "dlai-prompt-devs"] },
        { t: "Your first API call", d: "API keys, messages format, streaming, tokens & pricing, rate limits. Build a tiny chatbot.", res: ["gemini-quickstart", "ms-genai-beginners", "anth-academy"] },
        { t: "Run a model on your laptop", d: "Install Ollama or LM Studio, pull a 3–8B model, chat offline, call its local API.", res: ["ollama", "lmstudio", "jan"] }
      ]
    },
    {
      level: "intermediate",
      title: "Stage 2 — AI application builder",
      duration: "≈ 2–4 months",
      steps: [
        { t: "Embeddings & vector search", d: "Cosine similarity, chunking strategies, vector DBs, hybrid search (BM25 + vectors), reranking.", res: ["pinecone-learn", "weaviate-academy", "llamaindex"] },
        { t: "RAG end-to-end", d: "Ingest → chunk → embed → retrieve → augment prompt → generate → cite sources. Then evaluate it.", res: ["dlai-adv-rag", "anth-cookbook", "ragas"] },
        { t: "Tool use & structured outputs", d: "Function calling, JSON schemas, validation, retries; the model decides, your code executes.", res: ["anth-courses", "openai-cookbook", "gemini-cookbook"] },
        { t: "Agents & agentic patterns", d: "ReAct loop, prompt chaining, routing, orchestrator-workers, reflection, human-in-the-loop.", res: ["anth-effective-agents", "dlai-agentic", "hf-agents"] },
        { t: "MCP & tool ecosystems", d: "Connect agents to data and tools through the Model Context Protocol; build a server.", res: ["mcp-docs", "dlai-mcp", "hf-mcp"] },
        { t: "Evals, not vibes", d: "Golden datasets, assertions, LLM-as-judge, error analysis, regression testing of prompts.", res: ["hamel-evals", "anth-courses", "kaggle-genai"] },
        { t: "Transformers internals", d: "Self-attention, QKV, positional encodings, decoder-only architecture — build a mini GPT.", res: ["illustrated-transformer", "karpathy-zth", "raschka-scratch"] },
        { t: "Agentic coding tools", d: "Use Claude Code / Codex / Gemini CLI effectively: project memory files, plan mode, tests as guardrails.", res: ["anth-cc-best", "dlai-claude-code", "agents-md"] },
        { t: "Automate with AI workflows", d: "Trigger LLM steps from events (webhooks, emails, schedules, git pushes). Low-code with n8n/Zapier/Make, or code and CI agents.", res: ["n8n-docs", "cc-actions", "zapier-ai"] }
      ]
    },
    {
      level: "professional",
      title: "Stage 3 — AI engineer in production",
      duration: "ongoing",
      steps: [
        { t: "Harness & context engineering", d: "Design the loop around the model: tool design, context budgeting, compaction, subagents, skills, permissions, sandboxes.", res: ["anth-context-eng", "anth-tools-agents", "agent-sdk"] },
        { t: "Multi-agent systems", d: "Orchestrator/worker topologies, parallelism, shared state, failure handling, cost control.", res: ["anth-multiagent", "langgraph-docs", "google-adk"] },
        { t: "Durable workflows & agent interop", d: "Long-running automations that survive crashes (retries, idempotency, resumable state) and agents that talk to other agents (A2A).", res: ["temporal", "a2a", "crewai"] },
        { t: "Gateways, routing & cost", d: "One API over many providers: fallbacks, caching, budgets, and routing easy requests to small/local models.", res: ["litellm", "openrouter", "vllm"] },
        { t: "Advanced RAG", d: "Query rewriting, HyDE, contextual retrieval, GraphRAG, agentic RAG, long-context vs. retrieval trade-offs.", res: ["graphrag", "eugene-patterns", "rag-paper"] },
        { t: "Fine-tuning & post-training", d: "When (not) to fine-tune, LoRA/QLoRA, SFT, DPO, GRPO, distillation, dataset quality.", res: ["hf-peft", "hf-trl", "unsloth"] },
        { t: "Serving & inference optimization", d: "Quantization (GGUF, AWQ, FP8), KV cache, batching, speculative decoding, vLLM/SGLang, GPU sizing.", res: ["vllm", "sglang", "trtllm"] },
        { t: "LLMOps & observability", d: "Tracing, prompt versioning, online evals, cost/latency dashboards, A/B tests, guardrails.", res: ["langfuse", "phoenix", "chip-ai-eng"] },
        { t: "Security & safety", d: "Prompt injection, data exfiltration, excessive agency, sandboxing, least privilege, red-teaming.", res: ["owasp-llm", "anth-research", "bluedot"] },
        { t: "Deep theory", d: "Train a language model from scratch; read the key papers; understand scaling laws.", res: ["cs336", "cs224n", "attention-paper"] }
      ]
    }
  ];

  /* ----------------------------- Open models ----------------------------- */
  const openModels = [
    { family: "Llama", org: "Meta", sizes: "1B – 400B+ (MoE)", strengths: "Huge ecosystem, many fine-tunes, multilingual", license: "Llama community license", url: "https://www.llama.com" },
    { family: "Qwen", org: "Alibaba", sizes: "0.6B – 235B+ (dense & MoE)", strengths: "Excellent coding, reasoning & multilingual; many sizes", license: "Mostly Apache 2.0", url: "https://github.com/QwenLM" },
    { family: "Gemma", org: "Google", sizes: "~1B – 27B", strengths: "Strong small models, on-device variants, vision", license: "Gemma terms of use", url: "https://ai.google.dev/gemma" },
    { family: "Mistral / Magistral / Devstral", org: "Mistral AI", sizes: "~7B – 120B+", strengths: "Efficient, European, coding & reasoning variants", license: "Apache 2.0 (many) / research", url: "https://docs.mistral.ai" },
    { family: "DeepSeek", org: "DeepSeek", sizes: "Distills 1.5B – 70B, full MoE 670B+", strengths: "Frontier-level open reasoning; transparent reports", license: "MIT (most)", url: "https://github.com/deepseek-ai" },
    { family: "Phi", org: "Microsoft", sizes: "~3B – 15B", strengths: "Small language models punching above their size", license: "MIT", url: "https://github.com/microsoft/PhiCookbook" },
    { family: "gpt-oss", org: "OpenAI", sizes: "~20B & ~120B (MoE)", strengths: "Reasoning + tool use, fits 16GB / single 80GB GPU", license: "Apache 2.0", url: "https://github.com/openai/gpt-oss" }
  ];

  const localTools = [
    { name: "Ollama", level: "beginner", desc: "One-command model runner with model library & OpenAI-compatible API.", url: "https://ollama.com", best: "Laptop / dev" },
    { name: "LM Studio", level: "beginner", desc: "GUI to discover, download and chat; local server mode.", url: "https://lmstudio.ai", best: "Desktop users" },
    { name: "Jan", level: "beginner", desc: "Open-source offline chat app.", url: "https://jan.ai", best: "Privacy-first desktop" },
    { name: "Open WebUI", level: "beginner", desc: "Self-hosted ChatGPT-style UI with RAG, users & tools.", url: "https://github.com/open-webui/open-webui", best: "Team chat UI" },
    { name: "llama.cpp", level: "intermediate", desc: "Engine for GGUF models on CPU, CUDA, Metal, Vulkan. llama-server included.", url: "https://github.com/ggml-org/llama.cpp", best: "Any hardware, edge" },
    { name: "MLX / mlx-lm", level: "intermediate", desc: "Apple's array framework; fast inference & LoRA on Macs.", url: "https://github.com/ml-explore/mlx-lm", best: "Apple silicon" },
    { name: "llamafile", level: "intermediate", desc: "Single-file executables bundling model + runtime.", url: "https://github.com/Mozilla-Ocho/llamafile", best: "Portable distribution" },
    { name: "vLLM", level: "professional", desc: "High-throughput production server: PagedAttention, batching, multi-GPU.", url: "https://docs.vllm.ai", best: "Production GPU servers" },
    { name: "SGLang", level: "professional", desc: "Fast serving with prefix caching & structured outputs.", url: "https://github.com/sgl-project/sglang", best: "Agentic / high-QPS" },
    { name: "TensorRT-LLM", level: "professional", desc: "Max-performance NVIDIA inference.", url: "https://github.com/NVIDIA/TensorRT-LLM", best: "NVIDIA datacenter" }
  ];

  const hardwareTiers = [
    { tier: "Laptop (CPU / iGPU)", mem: "8–16 GB RAM", models: "1–4B @ Q4", use: "Autocomplete, summarizing, classification, offline assistant", speed: "5–20 tok/s" },
    { tier: "Gaming GPU / Mac 16–32 GB", mem: "8–16 GB VRAM or 16–32 GB unified", models: "7–14B @ Q4–Q8", use: "Solid chat, RAG over your docs, light coding help", speed: "20–80 tok/s" },
    { tier: "Enthusiast (RTX 3090/4090/5090, Mac 64 GB)", mem: "24–32 GB VRAM or 64 GB unified", models: "24–32B @ Q4–Q6, ~20B MoE", use: "Strong coding/reasoning, small agents", speed: "20–60 tok/s" },
    { tier: "Workstation (2× 24 GB GPUs, Mac 128 GB+)", mem: "48–128 GB", models: "70B @ Q4, ~100B MoE", use: "Near-frontier quality for many tasks, team server", speed: "10–30 tok/s" },
    { tier: "Datacenter (H100/H200/B200, MI300)", mem: "80–192 GB per GPU, multi-GPU", models: "70B FP8/FP16, 400B+ MoE", use: "Production serving for many users", speed: "1000s tok/s aggregate" }
  ];

  const futureReasons = [
    { icon: "🔒", t: "Privacy & sovereignty", d: "Sensitive data (health, legal, source code) never leaves your infrastructure — key for GDPR, the EU AI Act and regulated industries." },
    { icon: "💸", t: "Predictable cost", d: "High-volume, simple tasks (classification, extraction, embeddings) can be far cheaper on owned hardware than per-token APIs." },
    { icon: "⚡", t: "Latency & offline", d: "On-device models answer instantly and keep working without a network: phones, cars, factories, field work." },
    { icon: "🎛️", t: "Customization", d: "Open weights can be fine-tuned, distilled, quantized and inspected — impossible with closed APIs." },
    { icon: "🧩", t: "Hybrid routing", d: "The future is hybrid: a small local model handles most requests and routes hard ones to a frontier API." },
    { icon: "📈", t: "Small models keep improving", d: "Each generation, today's small model matches the previous generation's much larger model. Edge AI is growing fast." }
  ];

  /* ------------------------------ Stay updated ------------------------------ */
  const updates = [
    { cat: "Newsletters & blogs", items: [
      { n: "The Batch (DeepLearning.AI)", u: "https://www.deeplearning.ai/the-batch/", d: "Weekly AI news with Andrew Ng's letter." },
      { n: "Simon Willison's Weblog", u: "https://simonwillison.net", d: "Daily hands-on notes on LLMs, tools and prompt injection." },
      { n: "Latent Space", u: "https://www.latent.space", d: "The AI engineer newsletter & podcast." },
      { n: "Import AI (Jack Clark)", u: "https://importai.substack.com", d: "Weekly research & policy analysis." },
      { n: "Interconnects (Nathan Lambert)", u: "https://www.interconnects.ai", d: "Open models, post-training and RL." },
      { n: "Ahead of AI (Sebastian Raschka)", u: "https://magazine.sebastianraschka.com", d: "Research deep dives on LLM architectures." }
    ]},
    { cat: "Engineering blogs", items: [
      { n: "Anthropic Engineering", u: "https://www.anthropic.com/engineering", d: "Agents, context engineering, Claude Code internals." },
      { n: "OpenAI News", u: "https://openai.com/news/", d: "Model releases and research." },
      { n: "Google DeepMind Blog", u: "https://deepmind.google/discover/blog/", d: "Gemini, research breakthroughs." },
      { n: "Hugging Face Blog", u: "https://huggingface.co/blog", d: "Open-source models, libraries, tutorials." }
    ]},
    { cat: "Research & leaderboards", items: [
      { n: "Hugging Face Daily Papers", u: "https://huggingface.co/papers", d: "Curated trending arXiv papers." },
      { n: "arXiv cs.CL", u: "https://arxiv.org/list/cs.CL/recent", d: "Raw feed of new NLP/LLM papers." },
      { n: "LMArena", u: "https://lmarena.ai", d: "Human-preference model rankings." },
      { n: "Artificial Analysis", u: "https://artificialanalysis.ai", d: "Independent quality, speed & price benchmarks." }
    ]},
    { cat: "Communities", items: [
      { n: "r/LocalLLaMA", u: "https://www.reddit.com/r/LocalLLaMA/", d: "The place for open & local model news." },
      { n: "Hugging Face Hub", u: "https://huggingface.co/models", d: "Trending models — see what people actually use." },
      { n: "MCP servers registry", u: "https://github.com/modelcontextprotocol/servers", d: "Reference & community MCP servers." }
    ]}
  ];

  const trends = [
    { icon: "🤖", t: "Agents everywhere", d: "From chatbots to agents that plan, use tools and run for hours. The bottleneck moved from model IQ to harness and context design." },
    { icon: "🔌", t: "MCP as the USB-C of AI", d: "The Model Context Protocol became the common way to plug tools and data into AI apps across vendors." },
    { icon: "🧠", t: "Reasoning models", d: "Models that 'think' before answering (test-time compute) dominate math, coding and planning tasks." },
    { icon: "👩‍💻", t: "Agentic coding", d: "Terminal & IDE agents (Claude Code, Codex, Gemini CLI...) change how software is written — learn to steer them." },
    { icon: "⚙️", t: "Background agents & AI automation", d: "AI moves from chat windows into workflows: agents triggered by emails, tickets, schedules and CI events, working in the background with humans approving key steps." },
    { icon: "📦", t: "Skills & context engineering", d: "Packaging know-how as loadable skills and managing context windows is now a core engineering discipline." },
    { icon: "📱", t: "Small & on-device models", d: "Capable 1–30B models run on phones and laptops; hybrid local/cloud architectures become the norm." },
    { icon: "🛡️", t: "Security & regulation", d: "Prompt injection defense, sandboxing and compliance (EU AI Act) are now part of the job." },
    { icon: "🎥", t: "Multimodal native", d: "Text, image, audio, video and computer-use in one model; voice agents in real time." }
  ];

  return { topics, levels, formats, providers, courses, roadmap, openModels, localTools, hardwareTiers, futureReasons, updates, trends };
})();

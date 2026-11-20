/* Deutsch — Erklärinhalte (Konzepte, Deployment, Stack, Harness) */
I18N.add("de", { content: {
  concepts: {
    llm: {
      title: "LLMs", tagline: "Riesige Next-Token-Vorhersager, die zu universellen Reasoning-Maschinen wurden.",
      body: [
        "Ein Large Language Model ist ein neuronales Transformer-Netz, das auf Billionen von Tokens trainiert wurde, um das nächste Token vorherzusagen. Skalierung und Daten machen aus diesem einfachen Ziel breite Fähigkeiten: Schreiben, Programmieren, Übersetzen, logisches Denken.",
        "Assistenten entstehen in zwei Phasen: <b>Pretraining</b> (Sprache & Weltwissen lernen), dann <b>Post-Training</b> (Instruction Tuning, Präferenzoptimierung und RL, damit das Modell hilfreich, ehrlich und sicher wird — und Reasoning-Modelle vor der Antwort nachdenken).",
        "Als Engineer steuerst du das Modell über seinen <b>Kontext</b>: System-Prompt, Gesprächsverlauf, Dokumente, Tool-Definitionen. Alles, was das Modell über deine Aufgabe weiß, muss in diesem Fenster stehen."
      ],
      flow: ["📝 Text", "✂️ Tokenizer", "🔢 Embeddings", "🔁 N × Transformer-Blöcke (Attention + MLP)", "📊 Next-Token-Wahrscheinlichkeiten", "🎲 Sampling"],
      loop: "wiederholen bis zum Stopp-Token",
      terms: [["Token", "Wortteil-Einheit; Abrechnung & Limits werden in Tokens gezählt."], ["Kontextfenster", "Max. Tokens pro Aufruf (Eingabe + Ausgabe)."], ["Temperatur", "Zufälligkeit beim Sampling."], ["Reasoning / Thinking", "Zusätzliche Tokens zum Nachdenken vor der Antwort."], ["Multimodal", "Verarbeitet Bilder, Audio, PDFs…"], ["Prompt Caching", "Einen bereits verarbeiteten Präfix wiederverwenden — günstiger & schneller."]]
    },
    rag: {
      title: "RAG", tagline: "Dem Modell das richtige Wissen zur richtigen Zeit geben.",
      body: [
        "Modelle kennen deine privaten oder aktuellen Daten nicht und halluzinieren, wenn sie unsicher sind. <b>Retrieval-Augmented Generation</b> durchsucht eine Wissensbasis nach relevanten Passagen und fügt sie in den Prompt ein, damit die Antwort fundiert und zitierbar ist.",
        "Die Qualität entscheidet sich beim <b>Retrieval</b>: Chunking, Embeddings, hybride Stichwort- + Vektorsuche, Reranking, Metadatenfilter. Dann bei der <b>Generierung</b>: das Modell anweisen, nur aus dem Kontext zu antworten und Quellen zu zitieren.",
        "Fortgeschrittene Varianten: Query-Umschreibung, Contextual Retrieval, GraphRAG für globale Fragen und <b>agentisches RAG</b>, bei dem ein Agent entscheidet, wann und wonach gesucht wird — und so lange iteriert, bis das Ergebnis passt."
      ],
      flow: ["📄 Dokumente", "✂️ Chunken", "🔢 Embedden", "🗄️ Vektor- + Stichwortindex", "🔎 Abrufen + Reranken", "🧩 Prompt anreichern", "💬 Fundierte Antwort + Zitate"],
      loop: "Offline-Indexierung → Online-Abfrage",
      terms: [["Embedding", "Vektor, der Bedeutung erfasst."], ["Chunking", "Dokumente in abrufbare Stücke teilen."], ["Hybride Suche", "BM25 + Vektoren."], ["Reranker", "Präzise zweite Bewertungsstufe."], ["Faithfulness", "Ist die Antwort durch den Kontext belegt?"], ["Agentisches RAG", "Der Agent steuert das Retrieval als Tool."]]
    },
    agents: {
      title: "Agentische KI", tagline: "LLMs, die in einer Schleife Tools nutzen, um Ziele zu erreichen.",
      body: [
        "Ein <b>Agent</b> ist ein LLM, das seine nächste Aktion selbst wählt, ein Tool aufruft (Suche, Codeausführung, API, Datenbank…), das Ergebnis beobachtet und wiederholt, bis das Ziel erreicht ist. Dein Code führt die Tools aus; das Modell wählt sie aus.",
        "Nicht alles braucht einen Agenten. Vorhersehbare Aufgaben passen zu <b>Workflows</b>: Prompt-Verkettung, Routing, Parallelisierung, Orchestrator-Worker, Evaluator-Optimizer. Autonome Agenten lohnen sich für offene Probleme, deren Schritte sich nicht fest programmieren lassen.",
        "Protokolle wie <b>MCP</b> standardisieren, wie Agenten sich mit Tools und Daten verbinden — eine Integration funktioniert in vielen KI-Anwendungen."
      ],
      flow: ["🎯 Ziel", "🧠 Modell überlegt", "🔧 Tool-Aufruf", "⚙️ Dein Code führt aus", "👀 Beobachtung", "✅ Fertig?"],
      loop: "Schleife bis fertig oder Budget aufgebraucht",
      terms: [["Tool- / Function Calling", "Das Modell erzeugt strukturierte Aufrufe, die dein Code ausführt."], ["ReAct", "Schleife Überlegen → Handeln → Beobachten."], ["MCP", "Offenes Protokoll für Tools, Ressourcen & Prompts."], ["Workflow", "Vordefinierte Codepfade, die LLM-Aufrufe orchestrieren."], ["Multi-Agent", "Orchestrator + spezialisierte Sub-Agenten."], ["Guardrails", "Prüfungen von Eingaben, Ausgaben & Aktionen."]]
    },
    harness: {
      title: "KI-Harness", tagline: "Alles rund um das Modell: Agenten, Tools, Daten, Automatisierung und Ops.",
      body: [
        "Ein Modell allein verwandelt nur Text in Text. <b>Harness AI Engineering</b> heißt, alles drumherum zu bauen, damit es nützliche, verlässliche Arbeit leistet: wie du auf Modelle <b>zugreifst</b> (APIs, Gateways, lokale Server), welche <b>Daten</b> sie sehen (RAG, Gedächtnis), welche <b>Tools</b> sie nutzen dürfen (Function Calling, MCP), wie sie <b>orchestriert</b> werden (Workflows, Agenten, Multi-Agenten), wie sie in <b>Automatisierungen</b> eingebunden sind (Trigger, Zeitpläne, CI, Geschäftsprozesse) und wie du sie <b>betreibst</b> (Evals, Tracing, Guardrails, Kosten).",
        "Im Zentrum vieler Systeme steht ein <b>Agent-Harness</b>: die Schleife, das Kontextmanagement, Sub-Agenten, Skills, Berechtigungen und Verifikation, die einen Agenten zuverlässig machen. Claude Code, Codex, Gemini CLI oder die KI-Agenten von n8n sind allesamt Harnesses.",
        "Hier findet heute der Großteil der KI-Engineering-Arbeit statt. Modelle werden alle paar Monate besser; ein gut gestalteter Harness funktioniert weiter — und wird besser —, wenn du Modelle austauschst."
      ],
      flow: ["⚡ Trigger (Nutzer · Ereignis · Zeitplan)", "🧭 Orchestrierung (Workflow oder Agent)", "🧠 LLM über Gateway", "🔧 Tools · MCP · APIs", "📚 Daten & Gedächtnis", "🛡️ Guardrails & Freigabe", "📈 Evals & Tracing"],
      loop: "jede Schicht ist beobachtbar, testbar und austauschbar",
      terms: [["Agent-Harness", "Schleife + Tools + Kontext + Berechtigungen rund um ein Modell."], ["Workflow-Automatisierung", "Ereignisgesteuerte Pipelines mit KI-Schritten."], ["MCP / A2A", "Protokolle für Agent↔Tool und Agent↔Agent."], ["LLM-Gateway", "Eine API, Fallbacks, Budgets, Routing."], ["Guardrails", "Prüfungen von Eingaben, Ausgaben & Aktionen."], ["Human-in-the-Loop", "Freigabe vor irreversiblen Aktionen."]]
    }
  },
  deploy: {
    ollama: ["Ollama", "Der schnellste Weg unter macOS, Linux und Windows. Modelle sind standardmäßig quantisiertes GGUF."],
    compose: ["Ollama + Open WebUI (Docker)", "Ein privater ChatGPT-ähnlicher Stack für dich oder dein Team. Als docker-compose.yml speichern, `docker compose up -d` ausführen und http://localhost:3000 öffnen."],
    llamacpp: ["llama.cpp-Server", "Maximale Kontrolle und Portabilität (CPU, CUDA, Metal, Vulkan). Lade eine .gguf-Datei von Hugging Face herunter."],
    vllm: ["vLLM (Produktions-GPU)", "Serving mit hohem Durchsatz für viele Nutzer: Continuous Batching, PagedAttention, Tensor-Parallelismus. Benötigt eine aktuelle NVIDIA-/AMD-GPU."],
    mlx: ["MLX (Apple Silicon)", "Nutzt den Unified Memory des Mac effizient. Von der Community konvertierte Modelle findest du unter mlx-community auf Hugging Face."],
    client: ["Aus dem Code nutzen", "Alle oben genannten bieten OpenAI-kompatible APIs — wechsle zwischen lokal und Cloud, indem du nur base_url änderst."],
    checklist: ["Produktions-Checkliste", "Bevor du ein selbst gehostetes Modell echten Nutzern zugänglich machst."]
  },
  stack: {
    apps: ["Apps & Oberflächen", "Wo Menschen auf KI treffen: Chat-Assistenten, Copilots in Produkten, Coding-Agenten im Terminal/IDE, Sprach-Agenten und KI-Funktionen in bestehenden Apps.",
      ["Chat-UI & Streaming", "Copilots in Produkten", "Coding-Agenten", "Sprache & Echtzeit", "Computer- / Browser-Steuerung", "Generative UI"]],
    automation: ["Automatisierung & Workflows", "KI-Schritte in Prozessen: ausgelöst durch Ereignisse (E-Mail, Formular, Webhook, Zeitplan, Git-Push), verketten LLM-Aufrufe mit Business-APIs. Low-Code für Tempo; Code und Durable-Engines für Skalierung und Zuverlässigkeit.",
      ["Trigger & Webhooks", "Deterministische Workflows", "Freigaben durch Menschen", "Idempotenz & Wiederholungen", "Geplante / Hintergrund-Agenten", "KI in CI/CD"]],
    agents: ["Agenten & Orchestrierung", "Die Reasoning-Schicht: Ein LLM plant, ruft Tools auf, beobachtet und iteriert. Frameworks und Agent-Harnesses liefern Schleife, Zustand, Gedächtnis, Handoffs, Sub-Agenten und Multi-Agenten-Topologien.",
      ["Agenten-Schleife (ReAct)", "Workflows vs. Agenten", "Multi-Agent & Handoffs", "Planung & Reflexion", "Zustand & Gedächtnis", "Context Engineering"]],
    tools: ["Tools & Protokolle", "Wie Modelle in der Welt handeln: Function Calling mit JSON-Schemas, MCP-Server, die Tools und Daten in jede KI-App einstecken, A2A für die Zusammenarbeit zwischen Agenten, dazu Codeausführung, Suche und Browser.",
      ["Function Calling", "Strukturierte Ausgaben", "MCP: Tools, Ressourcen, Prompts", "A2A-Protokoll", "Sandboxes für Codeausführung", "Tool-Design für Agenten"]],
    data: ["Daten, Gedächtnis & Retrieval", "Wissen, das das Modell nicht hat: Dokumentenparsing, Embeddings, Vektordatenbanken, hybride Suche & Reranking, RAG und GraphRAG sowie Langzeitgedächtnis für Agenten.",
      ["Embeddings", "Chunking & Parsing", "Vektordatenbanken", "Hybride Suche + Reranking", "GraphRAG / agentisches RAG", "Langzeitgedächtnis für Agenten"]],
    access: ["Modellzugang & Gateways", "Wie du Modelle aufrufst: Anbieter-APIs, Cloud-Plattformen (Bedrock, Vertex AI, Azure AI Foundry), Gateways für Fallbacks, Budgets und Routing sowie selbst gehostete Endpunkte. Die meisten sprechen das OpenAI-kompatible Format.",
      ["Anbieter-APIs & SDKs", "OpenAI-kompatible Endpunkte", "Gateways & Fallbacks", "Routing klein ↔ groß", "Prompt Caching", "Rate Limits & Kosten"]],
    models: ["Modelle", "Die Antriebe: geschlossene Frontier-Modelle (Claude, GPT, Gemini), Familien mit offenen Gewichten (Llama, Qwen, Gemma, Mistral, DeepSeek, gpt-oss), Reasoning-, multimodale, Embedding- und kleine On-Device-Modelle.",
      ["Frontier vs. offene Gewichte", "Reasoning-Modelle", "Multimodal", "Embedding-Modelle", "Kleine / On-Device-Modelle", "Fine-Tuning & Distillation"]]
  },
  stackOps: ["Evals · Observability · Guardrails · Sicherheit · Kosten", "Das betrifft jede Schicht. Was du nicht misst, kannst du nicht verbessern, und was du nicht absichern kannst, kannst du nicht ausliefern: Evals in der CI, Traces jedes Modell- und Tool-Aufrufs, Guardrails, Schutz vor Prompt Injection, Least Privilege sowie Kosten- und Latenzbudgets.",
    ["Evals & LLM-as-Judge", "Tracing (OpenTelemetry)", "Guardrails", "Schutz vor Prompt Injection", "Least Privilege & Sandboxing", "Kosten- & Latenzbudgets"]],
  harnessParts: [
    ["Agenten-Schleife", "Ruft das Modell auf, führt Tool-Aufrufe aus, gibt Ergebnisse zurück und stoppt bei Erfolg, Fehler oder aufgebrauchtem Budget."],
    ["Tools & MCP", "Zweckgebundene Tools (Dateien lesen/bearbeiten, Shell, Suche, Browser) und MCP-Server für externe Systeme."],
    ["Kontextmanagement", "System-Prompt, Gedächtnisdateien (CLAUDE.md/AGENTS.md), Compaction, Dateien just in time lesen."],
    ["Sub-Agenten", "Erkundung oder parallele Arbeit an frische Kontexte delegieren; nur verdichtete Ergebnisse zurückgeben."],
    ["Skills", "Bei Bedarf geladene Pakete aus Anweisungen & Skripten — Progressive Disclosure hält den Kontext schlank."],
    ["Berechtigungen & Sandbox", "Allow-/Deny-Regeln, Freigabeabfragen, Container, Netzwerklimits — begrenzen Fehler und Injections."],
    ["Hooks", "Deterministische Skripte bei Lebenszyklus-Ereignissen: nach Änderungen formatieren, riskante Befehle blockieren, benachrichtigen."],
    ["Verifikation", "Tests, Linter, Typprüfer, Screenshots, Evals — damit der Agent seine eigene Arbeit prüfen kann."]
  ],
  harnessExamples: {
    "Claude Code": ["Anthropics agentisches Coding-Tool für Terminal, IDE, Desktop & Web.", "Coding-Agent"],
    "Claude Agent SDK": ["Eigene Agenten auf dem Harness von Claude Code bauen.", "Selbst bauen"],
    "OpenAI Codex": ["OpenAIs Coding-Agent (CLI, IDE, Cloud).", "Coding-Agent"],
    "Gemini CLI": ["Googles Open-Source-Agent fürs Terminal.", "Open Source"],
    "Aider": ["Git-bewusster Pair-Programmer; funktioniert mit lokalen Modellen.", "Open Source"],
    "OpenHands": ["Offene Plattform für Entwickler-Agenten mit isolierter Runtime.", "Open Source"],
    "OpenAI Agents SDK": ["Agenten, Handoffs, Guardrails, Tracing.", "Framework"],
    "Google ADK": ["Agent Development Kit für Multi-Agenten-Systeme.", "Framework"]
  },
  harnessRules: [
    "<b>Fang einfach an.</b> Ein Modell, ein paar sehr gute Tools, eine klare Schleife. Sub-Agenten und Frameworks erst hinzufügen, wenn Evals es rechtfertigen.",
    "<b>Erst Workflow, Agent nur bei Bedarf.</b> Vorhersehbare Prozesse gehören in deterministische Automatisierungen; Autonomie nur dort, wo die Schritte nicht im Voraus bekannt sind.",
    "<b>Halte Modelle austauschbar.</b> Nutze ein Gateway oder eine OpenAI-kompatible Schnittstelle, um Anbieter zu wechseln, Fallbacks zu nutzen oder an lokale Modelle zu routen.",
    "<b>Automatisiere das Lästige, gib das Irreversible frei.</b> Lass die KI entwerfen, klassifizieren und vorbereiten; verlange einen menschlichen Klick zum Bezahlen, Löschen, Deployen oder Mailen an Kunden.",
    "<b>Mach Automatisierungen idempotent.</b> Wiederholungen passieren: Ein erneut ausgeführter LLM-Schritt darf nicht zwei Tickets anlegen oder zwei E-Mails senden.",
    "<b>Gestalte Tools für das Modell, nicht für deine API.</b> Klare Namen, ausführliche Beschreibungen, hilfreiche Fehlermeldungen, knappe Ausgaben.",
    "<b>Budgetiere den Kontext.</b> Informationen just in time laden, lange Verläufe verdichten, laute Arbeit in Sub-Agenten auslagern.",
    "<b>Gib dem Agenten eine Möglichkeit zur Prüfung.</b> Tests, Linter und Screenshots machen aus Raten ein Iterieren.",
    "<b>Speichere Fortschritt außerhalb des Kontexts.</b> Notizen, To-do-Dateien und Git-Commits lassen die Arbeit Sitzungen überdauern.",
    "<b>Least Privilege als Standard.</b> Ausführung isolieren, Freigaben für irreversible oder externe Aktionen verlangen, alle abgerufenen Inhalte als nicht vertrauenswürdig behandeln.",
    "<b>Mach es beobachtbar.</b> Trace jeden Modell- und Tool-Aufruf; lies die Transkripte — dort entstehen die Verbesserungen.",
    "<b>Evaluiere das Gesamtsystem.</b> Benchmarke Harness + Modell auf deinen echten Aufgaben und wiederhole das bei jedem Modellwechsel."
  ]
}});

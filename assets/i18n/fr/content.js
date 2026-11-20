/* Français — contenus explicatifs (concepts, déploiement, stack, harness) */
I18N.add("fr", { content: {
  concepts: {
    llm: {
      title: "LLM", tagline: "D'immenses prédicteurs du prochain token devenus des moteurs de raisonnement polyvalents.",
      body: [
        "Un grand modèle de langage (LLM) est un réseau de neurones transformer entraîné sur des milliers de milliards de tokens pour prédire le token suivant. L'échelle et les données transforment cet objectif simple en capacités très larges : rédaction, code, traduction, raisonnement.",
        "Les assistants sont créés en deux phases : le <b>pré-entraînement</b> (apprendre la langue et les connaissances du monde) puis le <b>post-entraînement</b> (instruction tuning, optimisation des préférences et RL pour rendre le modèle utile, honnête et sûr — et, pour les modèles de raisonnement, pour qu'il réfléchisse avant de répondre).",
        "En tant qu'ingénieur, vous pilotez le modèle via son <b>contexte</b> : prompt système, conversation, documents, définitions d'outils. Tout ce que le modèle sait de votre tâche doit se trouver dans cette fenêtre."
      ],
      flow: ["📝 Texte", "✂️ Tokenizer", "🔢 Embeddings", "🔁 N × blocs transformer (attention + MLP)", "📊 Probabilités du prochain token", "🎲 Échantillonnage"],
      loop: "répéter jusqu'au token de fin",
      terms: [["Token", "Unité sous-lexicale ; facturation et limites se comptent en tokens."], ["Fenêtre de contexte", "Nombre max de tokens par appel (entrée + sortie)."], ["Température", "Degré d'aléatoire de l'échantillonnage."], ["Raisonnement / thinking", "Tokens supplémentaires consacrés à la réflexion avant la réponse."], ["Multimodal", "Accepte images, audio, PDF…"], ["Prompt caching", "Réutiliser un préfixe déjà traité pour réduire coût et latence."]]
    },
    rag: {
      title: "RAG", tagline: "Donner au modèle les bonnes connaissances au bon moment.",
      body: [
        "Les modèles ne connaissent pas vos données privées ou récentes, et ils hallucinent quand ils ne savent pas. La <b>génération augmentée par récupération</b> (RAG) cherche des passages pertinents dans une base de connaissances et les insère dans le prompt, pour que la réponse soit ancrée et citable.",
        "La qualité se joue dans la <b>récupération</b> : découpage, embeddings, recherche hybride mots-clés + vecteurs, reranking, filtres sur métadonnées. Puis dans la <b>génération</b> : demander au modèle de répondre uniquement à partir du contexte et de citer ses sources.",
        "Variantes avancées : réécriture de requêtes, contextual retrieval, GraphRAG pour les questions globales, et <b>RAG agentique</b> où un agent décide quand et quoi chercher, en itérant jusqu'à être satisfait."
      ],
      flow: ["📄 Documents", "✂️ Découper", "🔢 Vectoriser", "🗄️ Index vectoriel + mots-clés", "🔎 Récupérer + reranker", "🧩 Enrichir le prompt", "💬 Réponse ancrée + citations"],
      loop: "indexation hors ligne → requêtes en ligne",
      terms: [["Embedding", "Vecteur qui capture le sens."], ["Découpage (chunking)", "Diviser les documents en morceaux récupérables."], ["Recherche hybride", "BM25 + vecteurs."], ["Reranker", "Second tri, plus précis."], ["Fidélité", "La réponse est-elle étayée par le contexte ?"], ["RAG agentique", "L'agent pilote la récupération comme un outil."]]
    },
    agents: {
      title: "IA agentique", tagline: "Des LLM qui utilisent des outils en boucle pour atteindre un objectif.",
      body: [
        "Un <b>agent</b> est un LLM qui décide de sa prochaine action, appelle un outil (recherche, exécution de code, API, base de données…), observe le résultat et recommence jusqu'à atteindre l'objectif. Votre code exécute les outils ; le modèle les choisit.",
        "Tout n'a pas besoin d'un agent. Les tâches prévisibles conviennent aux <b>workflows</b> : chaînage de prompts, routage, parallélisation, orchestrateur-workers, évaluateur-optimiseur. Réservez les agents autonomes aux problèmes ouverts dont les étapes ne peuvent pas être codées en dur.",
        "Des protocoles comme <b>MCP</b> standardisent la connexion des agents aux outils et aux données : une intégration fonctionne dans de nombreuses applications d'IA."
      ],
      flow: ["🎯 Objectif", "🧠 Le modèle raisonne", "🔧 Appel d'outil", "⚙️ Votre code exécute", "👀 Observation", "✅ Terminé ?"],
      loop: "boucler jusqu'à la fin ou l'épuisement du budget",
      terms: [["Appel d'outils / de fonctions", "Le modèle émet des appels structurés que votre code exécute."], ["ReAct", "Boucle Raisonner → Agir → Observer."], ["MCP", "Protocole ouvert pour outils, ressources & prompts."], ["Workflow", "Chemins de code prédéfinis qui orchestrent des appels LLM."], ["Multi-agents", "Orchestrateur + sous-agents spécialisés."], ["Garde-fous", "Contrôles sur les entrées, sorties & actions."]]
    },
    harness: {
      title: "Harness IA", tagline: "Tout ce qui gravite autour du modèle : agents, outils, données, automatisation et ops.",
      body: [
        "Seul, un modèle ne fait que transformer du texte en texte. Le <b>harness AI engineering</b>, c'est construire tout ce qui l'entoure pour qu'il accomplisse un travail utile et fiable : comment vous <b>accédez</b> aux modèles (API, passerelles, serveurs locaux), quelles <b>données</b> ils voient (RAG, mémoire), quels <b>outils</b> ils peuvent utiliser (function calling, MCP), comment ils sont <b>orchestrés</b> (workflows, agents, multi-agents), comment ils s'intègrent aux <b>automatisations</b> (déclencheurs, planifications, CI, processus métier) et comment vous les <b>exploitez</b> (évaluations, traçage, garde-fous, coûts).",
        "Au centre de nombreux systèmes se trouve un <b>harness d'agent</b> : la boucle, la gestion du contexte, les sous-agents, les skills, les permissions et la vérification qui rendent un agent fiable. Claude Code, Codex, Gemini CLI ou les agents IA de n8n sont tous des harnesses.",
        "C'est là que se fait aujourd'hui l'essentiel du travail d'ingénierie IA. Les modèles progressent tous les quelques mois ; un harness bien conçu continue de fonctionner — et s'améliore — à mesure que vous changez de modèle."
      ],
      flow: ["⚡ Déclencheur (utilisateur · événement · planning)", "🧭 Orchestration (workflow ou agent)", "🧠 LLM via passerelle", "🔧 Outils · MCP · API", "📚 Données & mémoire", "🛡️ Garde-fous & validation", "📈 Évals & traçage"],
      loop: "chaque couche est observable, testable et remplaçable",
      terms: [["Harness d'agent", "Boucle + outils + contexte + permissions autour d'un modèle."], ["Automatisation de workflows", "Pipelines déclenchés par des événements, avec des étapes IA."], ["MCP / A2A", "Protocoles agent↔outil et agent↔agent."], ["Passerelle LLM", "Une API, repli, budgets, routage."], ["Garde-fous", "Contrôles sur les entrées, sorties & actions."], ["Humain dans la boucle", "Validation avant toute action irréversible."]]
    }
  },
  deploy: {
    ollama: ["Ollama", "Le chemin le plus rapide sur macOS, Linux et Windows. Les modèles sont en GGUF quantifié par défaut."],
    compose: ["Ollama + Open WebUI (Docker)", "Une pile privée de type ChatGPT pour vous ou votre équipe. Enregistrez-la sous docker-compose.yml, lancez `docker compose up -d`, puis ouvrez http://localhost:3000."],
    llamacpp: ["Serveur llama.cpp", "Contrôle et portabilité maximum (CPU, CUDA, Metal, Vulkan). Téléchargez un fichier .gguf depuis Hugging Face."],
    vllm: ["vLLM (GPU de production)", "Serving haut débit pour de nombreux utilisateurs : batching continu, PagedAttention, parallélisme tensoriel. Nécessite un GPU NVIDIA/AMD récent."],
    mlx: ["MLX (Apple silicon)", "Exploite efficacement la mémoire unifiée du Mac. Les modèles convertis par la communauté se trouvent sous mlx-community sur Hugging Face."],
    client: ["L'utiliser depuis le code", "Toutes ces solutions exposent des API compatibles OpenAI — passez du local au cloud en changeant simplement base_url."],
    checklist: ["Checklist de production", "Avant d'exposer un modèle auto-hébergé à de vrais utilisateurs."]
  },
  stack: {
    apps: ["Applications & interfaces", "Là où les gens rencontrent l'IA : assistants de chat, copilotes intégrés aux produits, agents de codage en terminal/IDE, agents vocaux et fonctions IA ajoutées aux applications existantes.",
      ["Interface de chat & streaming", "Copilotes dans les produits", "Agents de codage", "Voix & temps réel", "Pilotage d'ordinateur / navigateur", "UI générative"]],
    automation: ["Automatisation & workflows", "Des étapes IA intégrées aux processus : déclenchées par des événements (e-mail, formulaire, webhook, planning, git push), enchaînant appels LLM et API métier. Le low-code pour la rapidité ; le code et les moteurs durables pour l'échelle et la fiabilité.",
      ["Déclencheurs & webhooks", "Workflows déterministes", "Validation humaine", "Idempotence & reprises", "Agents planifiés / en arrière-plan", "IA dans la CI/CD"]],
    agents: ["Agents & orchestration", "La couche de raisonnement : un LLM planifie, appelle des outils, observe et itère. Les frameworks et harnesses d'agents fournissent la boucle, l'état, la mémoire, les transferts, les sous-agents et les topologies multi-agents.",
      ["Boucle d'agent (ReAct)", "Workflows vs agents", "Multi-agents & transferts", "Planification & réflexion", "État & mémoire", "Context engineering"]],
    tools: ["Outils & protocoles", "Comment les modèles agissent sur le monde : function calling avec schémas JSON, serveurs MCP qui branchent outils et données dans toute application d'IA, A2A pour la collaboration entre agents, plus exécution de code, recherche et navigateurs.",
      ["Function calling", "Sorties structurées", "MCP : outils, ressources, prompts", "Protocole A2A", "Sandbox d'exécution de code", "Conception d'outils pour agents"]],
    data: ["Données, mémoire & récupération", "Les connaissances que le modèle n'a pas : analyse de documents, embeddings, bases vectorielles, recherche hybride & reranking, RAG et GraphRAG, plus la mémoire à long terme des agents.",
      ["Embeddings", "Découpage & analyse", "Bases vectorielles", "Recherche hybride + reranking", "GraphRAG / RAG agentique", "Mémoire long terme des agents"]],
    access: ["Accès aux modèles & passerelles", "Comment vous appelez les modèles : API des fournisseurs, plateformes cloud (Bedrock, Vertex AI, Azure AI Foundry), passerelles pour le repli, les budgets et le routage, et endpoints auto-hébergés. La plupart parlent le format compatible OpenAI.",
      ["API & SDK des fournisseurs", "Endpoints compatibles OpenAI", "Passerelles & repli", "Routage petit ↔ grand modèle", "Prompt caching", "Limites de débit & coûts"]],
    models: ["Modèles", "Les moteurs : modèles fermés de pointe (Claude, GPT, Gemini), familles à poids ouverts (Llama, Qwen, Gemma, Mistral, DeepSeek, gpt-oss), modèles de raisonnement, multimodaux, d'embedding et petits modèles embarqués.",
      ["Fermés vs poids ouverts", "Modèles de raisonnement", "Multimodal", "Modèles d'embedding", "Petits modèles / embarqués", "Fine-tuning & distillation"]]
  },
  stackOps: ["Évals · Observabilité · Garde-fous · Sécurité · Coûts", "Cette couche concerne tous les niveaux. On ne peut pas améliorer ce qu'on ne mesure pas, ni livrer ce qu'on ne peut pas sécuriser : évaluations en CI, traces de chaque appel de modèle et d'outil, garde-fous, défenses contre l'injection de prompt, moindre privilège, et budgets de coût/latence.",
    ["Évals & LLM-juge", "Traçage (OpenTelemetry)", "Garde-fous", "Défense contre l'injection de prompt", "Moindre privilège & sandbox", "Budgets de coût & latence"]],
  harnessParts: [
    ["Boucle d'agent", "Appelle le modèle, exécute les appels d'outils, renvoie les résultats, s'arrête en cas de succès, d'erreur ou de budget épuisé."],
    ["Outils & MCP", "Outils dédiés (lire/éditer des fichiers, shell, recherche, navigateur) et serveurs MCP pour les systèmes externes."],
    ["Gestion du contexte", "Prompt système, fichiers mémoire (CLAUDE.md/AGENTS.md), compaction, lecture de fichiers juste-à-temps."],
    ["Sous-agents", "Déléguer l'exploration ou le travail parallèle à des contextes neufs ; ne renvoyer que des résultats condensés."],
    ["Skills", "Paquets d'instructions & scripts chargés à la demande — la divulgation progressive garde le contexte léger."],
    ["Permissions & sandbox", "Règles d'autorisation/refus, demandes de validation, conteneurs, limites réseau — pour contenir erreurs et injections."],
    ["Hooks", "Scripts déterministes aux étapes clés du cycle de vie : formater après une modification, bloquer les commandes risquées, notifier."],
    ["Vérification", "Tests, linters, vérificateurs de types, captures d'écran, évaluations — pour que l'agent puisse contrôler son propre travail."]
  ],
  harnessExamples: {
    "Claude Code": ["L'outil de codage agentique d'Anthropic pour terminal, IDE, desktop & web.", "Agent de codage"],
    "Claude Agent SDK": ["Construisez des agents personnalisés sur le harness de Claude Code.", "Créer le vôtre"],
    "OpenAI Codex": ["L'agent de codage d'OpenAI (CLI, IDE, cloud).", "Agent de codage"],
    "Gemini CLI": ["L'agent en terminal open source de Google.", "Open source"],
    "Aider": ["Binôme de programmation conscient de git ; fonctionne avec des modèles locaux.", "Open source"],
    "OpenHands": ["Plateforme ouverte d'agents de développement avec runtime isolé.", "Open source"],
    "OpenAI Agents SDK": ["Agents, transferts, garde-fous, traçage.", "Framework"],
    "Google ADK": ["Agent Development Kit pour systèmes multi-agents.", "Framework"]
  },
  harnessRules: [
    "<b>Commencez simple.</b> Un modèle, quelques excellents outils, une boucle claire. N'ajoutez sous-agents et frameworks que lorsque les évaluations le justifient.",
    "<b>Le workflow d'abord, l'agent si nécessaire.</b> Les processus prévisibles relèvent d'automatisations déterministes ; n'accordez de l'autonomie que là où les étapes ne peuvent pas être connues à l'avance.",
    "<b>Gardez les modèles interchangeables.</b> Passez par une passerelle ou une interface compatible OpenAI pour pouvoir changer de fournisseur, basculer en repli ou router vers des modèles locaux.",
    "<b>Automatisez le fastidieux, validez l'irréversible.</b> Laissez l'IA rédiger, classer et préparer ; exigez un clic humain pour payer, supprimer, déployer ou écrire aux clients.",
    "<b>Rendez les automatisations idempotentes.</b> Les reprises arrivent : relancer une étape LLM ne doit pas créer deux tickets ni envoyer deux e-mails.",
    "<b>Concevez les outils pour le modèle, pas pour votre API.</b> Noms clairs, descriptions riches, erreurs utiles, sorties concises.",
    "<b>Budgétez le contexte.</b> Chargez l'information juste-à-temps, compactez les longs historiques, isolez le travail bruyant dans des sous-agents.",
    "<b>Donnez à l'agent un moyen de vérifier.</b> Tests, linters et captures d'écran transforment les suppositions en itérations.",
    "<b>Persistez la progression hors du contexte.</b> Notes, fichiers de tâches et commits git permettent au travail de survivre d'une session à l'autre.",
    "<b>Moindre privilège par défaut.</b> Isolez l'exécution, exigez une validation pour les actions irréversibles ou externes, traitez tout contenu récupéré comme non fiable.",
    "<b>Rendez-le observable.</b> Tracez chaque appel de modèle et d'outil ; lisez les transcriptions — c'est de là que viennent les améliorations.",
    "<b>Évaluez le système entier.</b> Benchmarkez harness + modèle sur vos vraies tâches, et relancez à chaque changement de modèle."
  ]
}});

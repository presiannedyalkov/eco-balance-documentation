# Citation System Architecture & Process Flow

**Created:** November 16, 2025  
**Purpose:** Visual explanation of citation system processes and architectures

---

## 📊 General Citation Process Flow

This diagram shows the overall process of how citations work, regardless of which tool you use:

```mermaid
flowchart TD
    A[Research Articles<br/>399 markdown files] --> B[Citation Index<br/>JSON/BibTeX]
    B --> C[Citation IDs<br/>rest-001, fund-001]
    C --> D[Markdown Documents<br/>strategic/*.md]
    D --> E["Citation References<br/>(rest-001) in text"]
    E --> F[Reference Sections<br/>Auto-generated]
    F --> G[Final Output<br/>PDF/EPUB/Web]
    
    H[User Adds Citation] --> I{Which Tool?}
    I -->|Custom Scripts| J[Manual ID<br/>rest-001]
    I -->|Zotero| K[Zotero UI<br/>Pick from library]
    I -->|BibTeX| L[BibTeX Key<br/>@rest2023med]
    
    J --> C
    K --> M[Export to BibTeX]
    L --> M
    M --> B
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e8f5e9
    style D fill:#f3e5f5
    style E fill:#fce4ec
    style F fill:#e0f2f1
    style G fill:#fff9c4
```

---

## 🏗️ Architecture Option 1: Custom Scripts (Lightweight)

**Best for:** Quick start, full control, GitHub-native

### Process Flow

```mermaid
flowchart LR
    A[Article Files<br/>research/bookmarks/articles/*.md] --> B[Script: generate-citation-index.js]
    B --> C[Citation Index<br/>citation_index.json]
    C --> D[Citation IDs<br/>rest-001, fund-001]
    
    E[User Writes Document] --> F["Add Citation<br/>(rest-001)"]
    F --> G[Script: generate-references.js]
    G --> H[Reference Section<br/>Auto-added to doc]
    
    C --> I[Citation Lookup<br/>By ID, topic, tag]
    I --> F
    
    J[Export to PDF/EPUB] --> K[Pandoc<br/>No citation processing]
    H --> J
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e8f5e9
    style D fill:#f3e5f5
    style E fill:#fce4ec
    style F fill:#e0f2f1
    style G fill:#fff9c4
    style H fill:#f1f8e9
    style J fill:#e3f2fd
```

### System Architecture

```mermaid
graph TB
    subgraph "Research Repository"
        A[Articles<br/>399 .md files<br/>YAML frontmatter]
    end
    
    subgraph "Citation System"
        B[generate-citation-index.js<br/>Parses articles<br/>Generates IDs]
        C[Citation Index<br/>citation_index.json<br/>Machine-readable]
        D[CITATIONS.md<br/>Human-readable index]
    end
    
    subgraph "Documentation"
        E[Strategic Docs<br/>strategic/*.md]
        F["Citation References<br/>(rest-001)"]
        G[Reference Sections<br/>Auto-generated]
    end
    
    subgraph "Tools"
        H[add-citation.js<br/>Helper script]
        I[generate-references.js<br/>Scans docs<br/>Adds refs]
    end
    
    subgraph "Export"
        J[Pandoc<br/>PDF/EPUB]
        K[No citation processing<br/>Manual formatting]
    end
    
    A --> B
    B --> C
    B --> D
    C --> H
    H --> F
    E --> F
    F --> I
    I --> G
    E --> G
    G --> J
    J --> K
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e8f5e9
    style D fill:#e8f5e9
    style E fill:#f3e5f5
    style F fill:#fce4ec
    style G fill:#e0f2f1
    style H fill:#fff9c4
    style I fill:#fff9c4
    style J fill:#e3f2fd
```

### What Each Component Does

| Component | Purpose | Input | Output |
|-----------|---------|-------|--------|
| **Article Files** | Source of research | Markdown with YAML | - |
| **generate-citation-index.js** | Parse articles, create IDs | Article files | `citation_index.json` |
| **citation_index.json** | Machine-readable index | - | Citation data |
| **CITATIONS.md** | Human-readable index | - | Browseable list |
| **add-citation.js** | Helper to find/add citations | Topic/keywords | Citation ID |
| **generate-references.js** | Scan docs, add ref sections | Markdown files | Updated files |
| **Pandoc** | Export to PDF/EPUB | Markdown | PDF/EPUB |

---

## 🏗️ Architecture Option 2: Zotero + Pandoc

**Best for:** Academic-style citations, automatic formatting

### Process Flow

```mermaid
flowchart TD
    A[Research Articles<br/>Web/PDF] --> B[Zotero Browser Extension<br/>Capture articles]
    B --> C[Zotero Library<br/>Desktop app<br/>Organize & tag]
    C --> D[Export to BibTeX<br/>references.bib]
    D --> E[Citation Keys<br/>@rest2023mediterranean]
    
    F[User Writes Document] --> G["Add Citation<br/>(@rest2023mediterranean)"]
    G --> H[Pandoc with --citeproc<br/>Process citations]
    H --> I[Formatted References<br/>Auto-generated]
    
    C --> J[Zotero API<br/>Optional: Auto-sync]
    J --> D
    
    I --> K[PDF/EPUB Export<br/>With formatted citations]
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e8f5e9
    style D fill:#f3e5f5
    style E fill:#fce4ec
    style F fill:#e0f2f1
    style G fill:#fff9c4
    style H fill:#f1f8e9
    style I fill:#e3f2fd
    style K fill:#fff9c4
```

### System Architecture

```mermaid
graph TB
    subgraph "Article Capture"
        A[Web Browser] --> B[Zotero Connector<br/>Browser extension]
        B --> C[Zotero Desktop<br/>Library management]
    end
    
    subgraph "Citation Management"
        C --> D[Organize & Tag<br/>Collections, tags]
        D --> E[Export BibTeX<br/>references.bib]
    end
    
    subgraph "Documentation"
        F[Markdown Files<br/>strategic/*.md]
        G["Pandoc Citations<br/>(@key)"]
    end
    
    subgraph "Processing"
        H[Pandoc<br/>--citeproc flag<br/>--bibliography=references.bib]
        I[CSL Style<br/>Citation format]
    end
    
    subgraph "Output"
        J[PDF with Citations<br/>Formatted references]
        K[EPUB with Citations<br/>Formatted references]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    F --> G
    G --> H
    E --> H
    I --> H
    H --> J
    H --> K
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e8f5e9
    style D fill:#e8f5e9
    style E fill:#f3e5f5
    style F fill:#fce4ec
    style G fill:#e0f2f1
    style H fill:#fff9c4
    style I fill:#f1f8e9
    style J fill:#e3f2fd
    style K fill:#e3f2fd
```

### What Each Component Does

| Component | Purpose | Input | Output |
|-----------|---------|-------|--------|
| **Zotero Connector** | Capture articles from web | Web pages | Zotero items |
| **Zotero Desktop** | Manage library, organize | Articles | Organized library |
| **BibTeX Export** | Convert to standard format | Zotero library | `references.bib` |
| **Pandoc --citeproc** | Process citations | Markdown + BibTeX | Formatted citations |
| **CSL Style** | Citation format | Style file | Formatted output |

---

## 🏗️ Architecture Option 3: BibTeX/BibLaTeX (Academic Standard)

**Best for:** Academic publications, formal citations

### Process Flow

```mermaid
flowchart LR
    A[Research Articles] --> B[Manual Entry<br/>or Import]
    B --> C[BibTeX File<br/>references.bib]
    C --> D[Citation Keys<br/>@rest2023mediterranean]
    
    E[Markdown Document] --> F["Add Citation<br/>(@rest2023mediterranean)"]
    F --> G[Pandoc<br/>--citeproc<br/>--bibliography]
    C --> G
    G --> H[Formatted Citations<br/>Auto-generated]
    H --> I[PDF/EPUB<br/>With references]
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e8f5e9
    style D fill:#f3e5f5
    style E fill:#fce4ec
    style F fill:#e0f2f1
    style G fill:#fff9c4
    style H fill:#f1f8e9
    style I fill:#e3f2fd
```

### System Architecture

```mermaid
graph TB
    subgraph "BibTeX Database"
        A[references.bib<br/>Text-based<br/>Version controlled]
    end
    
    subgraph "Citation Entry"
        B[Manual Entry<br/>or Script Import]
        C[Citation Keys<br/>@key format]
    end
    
    subgraph "Documentation"
        D["Markdown Files<br/>(@key) syntax"]
    end
    
    subgraph "Processing"
        E[Pandoc<br/>--citeproc<br/>--bibliography]
        F[CSL Style File<br/>APA, MLA, Chicago, etc.]
    end
    
    subgraph "Output"
        G[PDF<br/>Formatted citations]
        H[EPUB<br/>Formatted citations]
    end
    
    B --> A
    A --> C
    C --> D
    D --> E
    A --> E
    F --> E
    E --> G
    E --> H
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e8f5e9
    style D fill:#f3e5f5
    style E fill:#fff9c4
    style F fill:#f1f8e9
    style G fill:#e3f2fd
    style H fill:#e3f2fd
```

---

## 🏗️ Architecture Option 4: Hybrid (Zotero → BibTeX → Custom Scripts) ⭐

**Best for:** Best of all worlds - recommended approach

### Process Flow

```mermaid
flowchart TD
    A[Research Articles<br/>Web/PDF/Raindrop] --> B[Zotero<br/>Capture & organize]
    B --> C[Zotero Library<br/>Desktop app]
    C --> D[Export BibTeX<br/>references.bib]
    
    D --> E[Script: sync-bibtex-json.js<br/>Convert BibTeX → JSON]
    E --> F[Citation Index<br/>citation_index.json]
    F --> G[Citation IDs<br/>rest-001, @rest2023med]
    
    H[User Writes Document] --> I{Citation Method}
    I -->|Simple| J["Custom ID<br/>(rest-001)"]
    I -->|Pandoc| K["BibTeX Key<br/>(@rest2023med)"]
    
    J --> L[generate-references.js<br/>Custom formatting]
    K --> M[Pandoc --citeproc<br/>Auto formatting]
    
    L --> N[Reference Section<br/>Custom format]
    M --> O[Reference Section<br/>Academic format]
    
    N --> P[PDF/EPUB Export]
    O --> P
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e8f5e9
    style D fill:#f3e5f5
    style E fill:#fff9c4
    style F fill:#e0f2f1
    style G fill:#fce4ec
    style H fill:#f1f8e9
    style J fill:#e3f2fd
    style K fill:#e3f2fd
    style L fill:#fff9c4
    style M fill:#fff9c4
    style N fill:#e8f5e9
    style O fill:#e8f5e9
    style P fill:#fff9c4
```

### System Architecture

```mermaid
graph TB
    subgraph "Article Management"
        A[Zotero Desktop<br/>Library management]
        B[Zotero Connector<br/>Browser extension]
    end
    
    subgraph "Citation Database"
        C[references.bib<br/>BibTeX format<br/>For Pandoc]
        D[citation_index.json<br/>JSON format<br/>For scripts/web]
    end
    
    subgraph "Sync Layer"
        E[sync-bibtex-json.js<br/>BibTeX → JSON]
        F[generate-citation-index.js<br/>JSON → Index]
    end
    
    subgraph "Documentation"
        G[Markdown Files<br/>strategic/*.md]
        H["Custom Citations<br/>(rest-001)"]
        I["Pandoc Citations<br/>(@rest2023med)"]
    end
    
    subgraph "Processing"
        J[generate-references.js<br/>Custom formatting]
        K[Pandoc --citeproc<br/>Academic formatting]
    end
    
    subgraph "Output"
        L[PDF/EPUB<br/>With citations]
        M[Web Docs<br/>With citations]
    end
    
    A --> C
    B --> A
    C --> E
    E --> D
    D --> F
    F --> D
    G --> H
    G --> I
    H --> J
    I --> K
    C --> K
    D --> J
    J --> L
    K --> L
    J --> M
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e8f5e9
    style D fill:#e8f5e9
    style E fill:#fff9c4
    style F fill:#fff9c4
    style G fill:#f3e5f5
    style H fill:#fce4ec
    style I fill:#fce4ec
    style J fill:#fff9c4
    style K fill:#fff9c4
    style L fill:#e3f2fd
    style M fill:#e3f2fd
```

### What Each Component Does

| Component | Purpose | Input | Output |
|-----------|---------|-------|--------|
| **Zotero Desktop** | Manage research library | Articles | Organized library |
| **Export BibTeX** | Convert to standard format | Zotero library | `references.bib` |
| **sync-bibtex-json.js** | Convert BibTeX → JSON | BibTeX file | JSON index |
| **citation_index.json** | Machine-readable index | - | Citation data |
| **generate-references.js** | Custom citation formatting | Markdown + JSON | Reference sections |
| **Pandoc --citeproc** | Academic citation formatting | Markdown + BibTeX | Formatted citations |

---

## 🔄 Complete Workflow Comparison

### Custom Scripts Workflow

```mermaid
sequenceDiagram
    participant U as User
    participant S as Scripts
    participant A as Articles
    participant I as Index
    participant D as Documents
    participant P as Pandoc
    
    U->>A: Has 399 articles
    U->>S: Run generate-citation-index.js
    S->>A: Parse article frontmatter
    S->>I: Create citation_index.json
    I->>U: Citation IDs (rest-001, fund-001)
    U->>D: Add (rest-001) to document
    U->>S: Run generate-references.js
    S->>D: Scan for citations
    S->>I: Lookup citation details
    S->>D: Add reference section
    D->>P: Export to PDF/EPUB
    P->>U: PDF with manual references
```

### Zotero Workflow

```mermaid
sequenceDiagram
    participant U as User
    participant Z as Zotero
    participant B as BibTeX
    participant D as Documents
    participant P as Pandoc
    
    U->>Z: Import articles to Zotero
    Z->>U: Organize & tag articles
    U->>Z: Export to BibTeX
    Z->>B: Generate references.bib
    U->>D: Add (@rest2023med) to document
    D->>P: Run Pandoc with --citeproc
    P->>B: Load bibliography
    P->>D: Process citations
    P->>U: PDF with formatted references
```

### Hybrid Workflow

```mermaid
sequenceDiagram
    participant U as User
    participant Z as Zotero
    participant B as BibTeX
    participant S as Scripts
    participant J as JSON Index
    participant D as Documents
    participant P as Pandoc
    
    U->>Z: Import articles to Zotero
    Z->>B: Export to BibTeX
    B->>S: Run sync-bibtex-json.js
    S->>J: Create citation_index.json
    U->>D: Add (rest-001) OR (@rest2023med)
    D->>S: Option 1: generate-references.js
    D->>P: Option 2: Pandoc --citeproc
    S->>J: Lookup citation
    P->>B: Load bibliography
    S->>D: Add custom references
    P->>D: Format academic references
    D->>U: PDF with citations
```

---

## 📊 Tool Responsibilities Matrix

| Task | Custom Scripts | Zotero | BibTeX | Pandoc |
|------|---------------|--------|--------|--------|
| **Article Capture** | Manual/Import | ✅ Browser extension | Manual entry | ❌ |
| **Library Management** | JSON file | ✅ Desktop app | Text file | ❌ |
| **Citation IDs** | Custom (rest-001) | BibTeX keys | BibTeX keys | Processes keys |
| **Citation Formatting** | Manual/Custom | Via Pandoc | Via Pandoc | ✅ Automatic |
| **Reference Generation** | Script-based | Via Pandoc | Via Pandoc | ✅ Automatic |
| **PDF/EPUB Export** | Pandoc (no citations) | Pandoc (with citations) | Pandoc (with citations) | ✅ |
| **Version Control** | ✅ JSON files | ⚠️ Database files | ✅ Text files | ❌ |
| **Collaboration** | ✅ Git-based | ✅ Zotero Groups | ✅ Git-based | ❌ |

---

## 🎯 Key Differences Explained

### Custom Scripts
- **You manage:** Everything manually or via scripts
- **Citation format:** Simple `[rest-001]` in markdown
- **Reference format:** Custom, script-generated
- **Best for:** Quick start, full control

### Zotero
- **You manage:** Articles in Zotero app
- **Citation format:** `[@rest2023mediterranean]` (BibTeX key)
- **Reference format:** Automatic via Pandoc + CSL styles
- **Best for:** Academic citations, automatic formatting

### BibTeX
- **You manage:** Text file (`references.bib`)
- **Citation format:** `[@rest2023mediterranean]` (BibTeX key)
- **Reference format:** Automatic via Pandoc + CSL styles
- **Best for:** Academic publications, version control

### Hybrid
- **You manage:** Articles in Zotero, sync to both formats
- **Citation format:** Either `[rest-001]` OR `[@rest2023med]`
- **Reference format:** Custom OR automatic (your choice)
- **Best for:** Flexibility, best of all worlds

---

## 💡 Which Should You Choose?

**Start with Custom Scripts if:**
- ✅ You want to start quickly (2-3 hours)
- ✅ You prefer GitHub-native solutions
- ✅ You don't need academic citation formatting yet
- ✅ You want full control

**Add Zotero later if:**
- ✅ You have 100+ citations to manage
- ✅ You need automatic citation formatting
- ✅ You want browser extension for easy capture
- ✅ You need collaborative features

**Use Hybrid approach if:**
- ✅ You want the best of both worlds
- ✅ You need flexibility (custom OR academic formatting)
- ✅ You're willing to invest 5-7 hours initially
- ✅ You want to future-proof your system

---

This document provides visual explanations of how each citation system works. The Mermaid diagrams show the flow of data and the responsibilities of each component.


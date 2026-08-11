# FinSight Financial RAG Assistant Architecture

## Modular Pipeline Breakdown

```
[ Documents ] ──► [ Parsing ] ──► [ Chunking ] ──► [ Embeddings ] ──► [ Vector Store ]
                                                                             │
                                                                             ▼
[ Grounded Response ] ◄── [ LLM Synthesis ] ◄── [ Context ] ◄── [ Vector Retrieval ]
```

### Pipeline Components
1. **Document Ingestion**: Ingests financial news, market commentary, earnings reports, and SEC filings.
2. **Parsing**: Extracts structured text and removes formatting noise.
3. **Chunking**: Semantic and header-aware chunking maintaining metadata context.
4. **Embeddings**: Vector embeddings generated via local `sentence-transformers` models.
5. **Vector Storage**: Indexing via FAISS / PgVector with source metadata.
6. **Retrieval**: Top-K vector retrieval filtered by ticker, date range, and document type.
7. **Context Construction**: Formats retrieved snippets into grounded context with strict attribution prompts.
8. **LLM Generation**: Backend-only API call to synthesize answers with precise source citations.

### Preserved Source Metadata
- `source`: File name or URL
- `title`: Document title
- `date`: Publication timestamp
- `document_id`: Unique document reference ID

# Quizlar MCP Server

Voice-led, FSRS-scheduled flashcards from YouTube, PDFs, web, or text. Auto-graded quizzes.

Quizlar's MCP server lets Claude, Cursor, Cline, Windsurf, or any MCP-compatible client:

- Create flashcard decks from YouTube videos, PDFs, web pages, or pasted text
- Run auto-graded quizzes with the same tier-1-exact-match → phonetic → LLM grading pipeline that powers the [voice product](https://quizlar.app)
- Track memory with FSRS spaced repetition — Quizlar is the scheduler of record, every answer updates real memory state

This repo is the public discovery surface (`server.json` for the Official MCP Registry + a stdio bundle for clients that need it). The hosted MCP server itself is closed-source and runs at `https://mcp.quizlar.app/mcp/`.

## Listings

- **Official MCP Registry** — `io.github.quizlar/mcp-server` v1.0.0
- **Smithery** — <https://smithery.ai/servers/quizlar/quizlar>

## Setup

1. **Mint an API key** at <https://quizlar.app/settings/api-keys> (format: `sk-qz-<32 chars>`).
2. **Pick your client below** and paste the snippet.

### Cursor

`~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "quizlar": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.quizlar.app/mcp/",
        "--header",
        "Authorization:Bearer ${QUIZLAR_API_KEY}"
      ],
      "env": { "QUIZLAR_API_KEY": "sk-qz-..." }
    }
  }
}
```

### Windsurf

`~/.codeium/windsurf/mcp_config.json` — Windsurf supports Streamable HTTP natively, no wrapper needed:

```json
{
  "mcpServers": {
    "quizlar": {
      "serverUrl": "https://mcp.quizlar.app/mcp/",
      "headers": { "Authorization": "Bearer ${QUIZLAR_API_KEY}" }
    }
  }
}
```

Then `export QUIZLAR_API_KEY=sk-qz-...` in your shell.

### Claude Desktop

Open Settings → Connectors → "Add custom connector":

- **Name:** Quizlar
- **URL:** `https://mcp.quizlar.app/mcp/`
- Add header → **Name:** `Authorization`, **Value:** `Bearer sk-qz-...`

Or edit `claude_desktop_config.json` directly using `mcp-remote`:

```json
{
  "mcpServers": {
    "quizlar": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.quizlar.app/mcp/",
        "--header",
        "Authorization:Bearer ${QUIZLAR_API_KEY}"
      ],
      "env": { "QUIZLAR_API_KEY": "sk-qz-..." }
    }
  }
}
```

### Cline

Edit `cline_mcp_settings.json` (Cline → Settings → MCP Servers → "Edit JSON"):

```json
{
  "mcpServers": {
    "quizlar": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.quizlar.app/mcp/",
        "--header",
        "Authorization:Bearer ${QUIZLAR_API_KEY}"
      ],
      "env": { "QUIZLAR_API_KEY": "sk-qz-..." }
    }
  }
}
```

Detailed steps in [`llms-install.md`](./llms-install.md).

### Smithery

```sh
npx -y @smithery/cli@latest install @quizlar/quizlar --client claude
```

Replace `claude` with `cursor`, `windsurf`, etc. Smithery walks you through pasting your API key.

## Tools

22 tools mapped 1:1 to learner verbs:

- **Ingest:** `create_deck_from_youtube`, `create_deck_from_pdf`, `create_deck_from_url`, `create_deck_from_text`, `import_shared_deck`, `get_job_status`
- **Quiz:** `quiz_me` (composite: build + start in one call), `start_quiz`, `next_card`, `submit_answer`, `end_quiz`
- **Review:** `get_study_recommendations`, `get_progress`, `get_streak`, `get_analytics`
- **Manage:** `list_decks`, `get_deck`, `update_deck`, `delete_deck`, `add_card`, `update_card`, `get_user_profile`, `update_preferences`

## Auth

Bearer API key (`sk-qz-<32 chars>`) is the simplest path and works in every client snippet above. Quizlar also exposes full OAuth 2.1 with Dynamic Client Registration + PKCE at `https://mcp.quizlar.app/.well-known/oauth-authorization-server` for clients that prefer a browser flow.

## Links

- **App:** <https://quizlar.app>
- **Issues:** <https://github.com/quizlar/mcp-server/issues>
- **Stdio bundle source:** [`bundle/`](./bundle/) (used to publish to Smithery + any other stdio-only client)

## License

MIT for this configuration repo. The hosted MCP server itself is proprietary.

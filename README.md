# Quizlar MCP Server

Quizlar is voice-powered AI flashcards with spaced repetition. This MCP server lets Claude, Cursor, Cline, or any MCP-compatible client:

- Create flashcard decks from YouTube videos, PDFs, web pages, or raw text
- Run interactive text quizzes with automatic grading
- Track memory with FSRS spaced repetition

Voice quizzing happens in the [Quizlar web app](https://quizlar.app) — the MCP server delivers the deck-creation and text-quizzing tools to your editor.

This repo hosts the registry submission (`server.json`) for the hosted MCP server at `https://mcp.quizlar.app/mcp/`. The server itself is closed-source; this repo is the public discovery surface.

## Setup

1. Mint an API key at <https://quizlar.app/settings/api-keys> (format: `sk-qz-<32 chars>`).
2. Add Quizlar to your MCP client using the snippets below.

### Claude Desktop

In `claude_desktop_config.json` (or via the Connectors UI):

```json
{
  "mcpServers": {
    "quizlar": {
      "type": "streamable-http",
      "url": "https://mcp.quizlar.app/mcp/",
      "headers": { "Authorization": "Bearer sk-qz-..." }
    }
  }
}
```

### Cursor

`~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "quizlar": {
      "url": "https://mcp.quizlar.app/mcp/",
      "headers": { "Authorization": "Bearer sk-qz-..." }
    }
  }
}
```

### Cline

In Cline's settings, add a new MCP server:

- **URL:** `https://mcp.quizlar.app/mcp/`
- **Header:** `Authorization: Bearer sk-qz-...`

## Links

- Listing: [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io) (search "Quizlar")
- App: <https://quizlar.app>
- Issues: <https://github.com/quizlar/mcp-server/issues>

## License

MIT for this configuration repo. The hosted MCP server itself is proprietary.

# Installing Quizlar in Cline

Quizlar is a hosted MCP server at `https://mcp.quizlar.app` that turns YouTube, PDFs, web pages, and pasted text into FSRS-scheduled flashcards with auto-graded quizzes. This guide uses the `/mcp-apikey/` mount (apiKey-only, skips OAuth) since Cline pairs with a static Bearer header.

## Steps

1. **Mint an API key.** The user must visit <https://quizlar.app/settings/api-keys>, sign in with Google, and click "Create new API key". The key has the format `sk-qz-<32 random chars>` and is shown exactly once — copy it.

2. **Add the server to Cline.** Open Cline's settings (gear icon → "MCP Servers" → "Add MCP Server"), or edit `cline_mcp_settings.json` directly. Paste:

   ```json
   {
     "mcpServers": {
       "quizlar": {
         "command": "npx",
         "args": [
           "-y",
           "mcp-remote",
           "https://mcp.quizlar.app/mcp-apikey/",
           "--header",
           "Authorization:Bearer ${QUIZLAR_API_KEY}"
         ],
         "env": {
           "QUIZLAR_API_KEY": "sk-qz-replace-with-the-key-from-step-1"
         }
       }
     }
   }
   ```

3. **Verify.** Cline should show `quizlar` as connected with green status. If it doesn't, run the command manually in a terminal: `npx -y mcp-remote https://mcp.quizlar.app/mcp-apikey/ --header "Authorization:Bearer sk-qz-..."` — you should see "MCP server connected" within a few seconds.

## Why `mcp-remote`?

Quizlar speaks Streamable HTTP, but Cline's stdio config wants a local command. `mcp-remote` is a small npm package that runs a local stdio MCP server which forwards to a remote HTTPS endpoint — it's the standard bridge for stdio-only clients connecting to remote MCP servers.

## Tools you can call after installing

- `create_deck_from_youtube(url)` — ingest a YouTube URL into a deck
- `create_deck_from_text(text)` — ingest pasted notes (use this for PDFs/web pages after extracting text)
- `quiz_me(topic)` — composite: build deck + start quiz in one step
- `start_quiz(deck_id)` / `submit_answer(answer)` / `skip_question()` / `end_quiz()` — manual quiz loop
- `get_study_recommendations()` — FSRS-prioritized cards due across all decks
- `get_progress()` / `get_learning_velocity()` / `get_knowledge_gaps()` / `get_retention_curves()` — learning state

22 tools total. See <https://github.com/quizlar/mcp-server> for the full list.

## Troubleshooting

- **`401 Unauthorized`**: API key is wrong, expired, or revoked. Re-mint at <https://quizlar.app/settings/api-keys>.
- **`mcp-remote: command not found`**: ensure `npx` is on PATH (Node.js 18+ required).
- **Tool calls fail with `429`**: free-tier rate limits. Free accounts get 30 minutes of voice + a daily card-generation cap; upgrade at <https://quizlar.app/billing> if needed.

# Quizlar MCPB bundle

Stdio MCP bundle that wraps the Quizlar Streamable HTTP server at
`https://mcp.quizlar.app/mcp/`. Used to publish to surfaces (Smithery,
Claude Desktop, Cline) that prefer or require stdio servers.

## Layout

```
manifest.json       MCPB v0.4 manifest
icon-512.png        Bundle icon
server/index.js     Stdio entrypoint — spawns mcp-remote with the user's API key
```

The entrypoint reads `QUIZLAR_API_KEY` from env and execs:

```sh
npx -y mcp-remote@latest \
  https://mcp.quizlar.app/mcp/ \
  --header "Authorization:Bearer $QUIZLAR_API_KEY"
```

## Build

```sh
npx -y @anthropic-ai/mcpb pack .
```

Produces `bundle.mcpb`. The `.mcpb` is a build artifact and is
gitignored — rebuild before publishing.

## Publish to Smithery

```sh
curl -X PUT "https://api.smithery.ai/servers/quizlar/quizlar/releases" \
  -H "Authorization: Bearer $SMITHERY_API_KEY" \
  -F "payload=$(cat smithery-payload.json);type=application/json" \
  -F "bundle=@bundle.mcpb;type=application/octet-stream"
```

`smithery-payload.json` contains a `StdioDeployPayload` (type: stdio,
runtime: node, configSchema, serverCard).

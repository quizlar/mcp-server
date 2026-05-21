#!/usr/bin/env node
'use strict';

const { spawn } = require('node:child_process');

const apiKey = process.env.QUIZLAR_API_KEY;
if (!apiKey) {
  process.stderr.write(
    'quizlar-mcp: QUIZLAR_API_KEY env var required.\n' +
    'Mint a key at https://quizlar.app/settings/api-keys (format: sk-qz-<32 chars>).\n',
  );
  process.exit(1);
}

const args = [
  '-y',
  'mcp-remote@latest',
  'https://mcp.quizlar.app/mcp-apikey/',
  '--header',
  `Authorization:Bearer ${apiKey}`,
];

const child = spawn('npx', args, { stdio: 'inherit' });
child.on('error', (err) => {
  process.stderr.write(`quizlar-mcp: failed to spawn npx — ${err.message}\n`);
  process.exit(1);
});
child.on('exit', (code) => process.exit(code ?? 0));

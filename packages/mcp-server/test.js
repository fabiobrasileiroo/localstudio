import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverScript = path.join(__dirname, 'src', 'index.ts');

const child = spawn('node', [serverScript], {
  stdio: ['pipe', 'pipe', 'inherit'],
});

let buffer = '';

function sendRpc(msg) {
  const str = JSON.stringify(msg);
  child.stdin.write(str + '\n');
}

child.stdout.on('data', (data) => {
  buffer += data.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop() ?? '';

  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const parsed = JSON.parse(line);
      console.log('[Test Client Received]:', JSON.stringify(parsed, null, 2));

      if (parsed.id === 1) {
        // Now list tools
        sendRpc({
          jsonrpc: '2.0',
          id: 2,
          method: 'tools/list',
          params: {},
        });
      } else if (parsed.id === 2) {
        // Call localstudio_list_decks
        sendRpc({
          jsonrpc: '2.0',
          id: 3,
          method: 'tools/call',
          params: {
            name: 'localstudio_list_decks',
            arguments: {},
          },
        });
      } else if (parsed.id === 3) {
        console.log('✅ localstudio_list_decks executado com sucesso!');
        child.kill();
        process.exit(0);
      }
    } catch (e) {
      console.error('Failed to parse line:', line, e);
    }
  }
});

// Initialize MCP
sendRpc({
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'test-client', version: '1.0.0' },
  },
});

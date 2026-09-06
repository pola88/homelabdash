import type { EntityState } from "@/lib/schemas/entity-state-schema";

type SSEController = ReadableStreamDefaultController<Uint8Array>;

// instrumentation.ts and Route Handlers are bundled in separate module graphs,
// so plain module-level state would be duplicated (the WS side would broadcast
// into an empty Set). Pin it to globalThis so both sides share one instance.
const globalForSSE = globalThis as typeof globalThis & {
  __sseClients?: Set<SSEController>;
  __sseCache?: Map<string, unknown>;
};

const clients = (globalForSSE.__sseClients ??= new Set<SSEController>());
// Last known state per entity, replayed to every newly connected client so a
// client that joins after the initial HA snapshot still gets a full picture.
const cache = (globalForSSE.__sseCache ??= new Map<string, unknown>());
const encoder = new TextEncoder();

function frame(data: unknown): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
}

export function registerSSEClient(controller: SSEController): SSEController {
  clients.add(controller);
  console.log(`[sse] client connected (${clients.size} total)`);
  for (const [entity_id, state] of cache) {
    try {
      controller.enqueue(frame({ entity_id, state }));
    } catch {
      break;
    }
  }
  return controller;
}

export function unregisterSSEClient(controller: SSEController): void {
  clients.delete(controller);
  console.log(`[sse] client disconnected (${clients.size} total)`);
}

export function broadcastToClients(data: EntityState): void {
  cache.set(data.entity_id, data.state);
  const message = frame(data);
  for (const controller of clients) {
    try {
      controller.enqueue(message);
    } catch {
      clients.delete(controller);
    }
  }
}

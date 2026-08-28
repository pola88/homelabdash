const clients = new Set<ReadableStreamDefaultController<string>>();

export function registerSSEClient(
  controller: ReadableStreamDefaultController<string>,
) {
  clients.add(controller);
  return controller;
}

export function unregisterSSEClient(
  controller: ReadableStreamDefaultController<string>,
) {
  clients.delete(controller);
}

export function broadcastToClients(data: string) {
  const message = `data: ${JSON.stringify(data)}\n\n`;
  for (const controller of clients) {
    try {
      controller.enqueue(message);
    } catch {
      clients.delete(controller);
    }
  }
}

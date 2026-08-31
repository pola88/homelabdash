import { registerSSEClient, unregisterSSEClient } from "@/lib/sse-registry";

const encoder = new TextEncoder();

export async function GET(request: Request) {
  let controllerRef: ReadableStreamDefaultController<Uint8Array>;
  let heartbeat: ReturnType<typeof setInterval>;

  const cleanup = () => {
    clearInterval(heartbeat);
    unregisterSSEClient(controllerRef);
  };

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controllerRef = controller;
      registerSSEClient(controller);

      heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": ping\n\n"));
        } catch {
          cleanup();
        }
      }, 15000);
    },
    cancel() {
      cleanup();
    },
  });

  request.signal.addEventListener("abort", cleanup);

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

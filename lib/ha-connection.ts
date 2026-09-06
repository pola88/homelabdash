import { broadcastToClients } from "./sse-registry";
import { entityStateSchema } from "@/lib/schemas/entity-state-schema";

const HA_TOKEN = process.env.HA_TOKEN;
const HA_URL =
  process.env.HA_WS_URL ?? "ws://homeassistant.local:8123/api/websocket";

const _broadcastToClients = (entity: unknown) => {
  try {
    const parsedData = entityStateSchema.parse(entity);
    broadcastToClients(parsedData);
  } catch (error) {
    console.log("entity", entity, "error", error);
  }
};

export const connectToHA = () => {
  if (!HA_TOKEN) {
    console.error("[ha] HA_TOKEN is not set — skipping connection");
    return;
  }

  console.log(`[ha] connecting to ${HA_URL}`);
  const ws = new WebSocket(HA_URL);
  let msgId = 1;
  let giveUp = false;

  ws.onopen = () => console.log("[ha] socket open");

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    if (msg.type === "auth_required") {
      ws.send(JSON.stringify({ type: "auth", access_token: HA_TOKEN }));
    }

    if (msg.type === "auth_invalid") {
      console.error("[ha] auth invalid — check HA_TOKEN. Not reconnecting.");
      giveUp = true;
      ws.close();
      return;
    }

    if (msg.type === "auth_ok") {
      console.log("[ha] authenticated");
      ws.send(JSON.stringify({ id: msgId++, type: "get_states" }));
      ws.send(
        JSON.stringify({
          id: msgId++,
          type: "subscribe_events",
          event_type: "state_changed",
        }),
      );
    }

    // Initial snapshot from get_states
    if (msg.type === "result" && msg.success && Array.isArray(msg.result)) {
      console.log(`[ha] received ${msg.result.length} initial states`);
      for (const s of msg.result) {
        _broadcastToClients(s);
      }
    }

    if (msg.type === "event" && msg.event?.event_type === "state_changed") {
      _broadcastToClients(msg.event.data.new_state);
    }
  };

  ws.onerror = (err) => {
    console.error("[ha] socket error:", err);
  };

  ws.onclose = () => {
    if (giveUp) return;
    console.warn("[ha] socket closed — reconnecting in 5s");
    setTimeout(connectToHA, 5000);
  };

  return ws;
};

import { broadcastToClients } from "./sse-registry";

const HA_TOKEN = process.env.HA_TOKEN;

export const connectToHA = () => {
  const ws = new WebSocket("ws://homeassistant.local:8123/api/websocket");
  let msgId = 1;

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    if (msg.type === "auth_required") {
      ws.send(JSON.stringify({ type: "auth", access_token: HA_TOKEN }));
    }

    if (msg.type === "auth_ok") {
      ws.send(JSON.stringify({ id: msgId++, type: "get_states" }));
      ws.send(
        JSON.stringify({
          id: msgId++,
          type: "subscribe_events",
          event_type: "state_changed",
        }),
      );
    }

    if (msg.type === "event" && msg.event?.event_type === "state_changed") {
      const { entity_id, new_state } = msg.event.data;
      broadcastToClients({ entity_id, state: new_state });
    }
  };

  ws.onclose = () => setTimeout(connectToHA, 5000);
  return ws;
};

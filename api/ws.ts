import { ACCESS_TOKEN, HOST } from "@/constants/api.constant";

let ws: WebSocket | null = null;

export const connectWS = () => {
  if (ws && ws.readyState === WebSocket.OPEN) return ws;

  ws = new WebSocket(`ws://${HOST}/ws?token=${ACCESS_TOKEN}`);

  ws.onopen = () => {
    console.log("WS connected");
  };

  ws.onerror = (e) => {
    console.log("WS error", e);
  };

  ws.onclose = (e) => {
    console.log("WS closed, reconnecting...", e.code, e.reason);

    setTimeout(() => {
      connectWS();
    }, 10000);
  };

  return ws;
};

export const getWS = () => ws;

export const subscribeWS = (handlers: {
  onLike?: (data: any) => void;
  onComment?: (data: any) => void;
}) => {
  const ws = getWS();
  if (!ws) return;

  ws.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data);

      switch (msg.type) {
        case "like_updated":
          handlers.onLike?.(msg.payload);
          break;

        case "comment_added":
          handlers.onComment?.(msg.payload);
          break;
      }
    } catch (e) {
      console.log("WS parse error", e);
    }
  };
};

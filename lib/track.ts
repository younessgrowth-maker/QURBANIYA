const SESSION_KEY = "qurb_sid";
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 min rolling window

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const now = Date.now();
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const [id, ts] = raw.split(".");
      if (id && ts && now - Number(ts) < SESSION_TTL_MS) {
        localStorage.setItem(SESSION_KEY, `${id}.${now}`);
        return id;
      }
    }
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 16)
        : Math.random().toString(36).slice(2, 18);
    localStorage.setItem(SESSION_KEY, `${id}.${now}`);
    return id;
  } catch {
    return "";
  }
}

export function track(event_name: string, metadata?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    const payload = JSON.stringify({
      event_name,
      path: window.location.pathname + window.location.search,
      referrer: document.referrer || null,
      session_id: getSessionId(),
      metadata: metadata || {},
    });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // fail silently — never break UX for analytics
  }
}

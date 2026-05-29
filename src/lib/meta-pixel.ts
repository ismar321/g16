// Meta Pixel base code is loaded in index.html.
// This file exposes typed helpers to fire events from React.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const trackPurchase = () => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Purchase", {
      value: 9800,
      currency: "DZD",
      content_name: "حامل كرت الشاشة IPS 4.58",
      content_type: "product",
    });
  }
};

export const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, data);
  }
};

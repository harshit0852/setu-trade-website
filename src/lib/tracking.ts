type EventName = 'whatsapp_click' | 'request_quote_click' | 'product_enquiry_click';

interface EventDetail {
  source?: string;
  product?: string;
}

export function trackEvent(name: EventName, detail?: EventDetail): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(`setutrade:${name}`, { detail: detail ?? {} }),
  );
}

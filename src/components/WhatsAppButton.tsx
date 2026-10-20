import { MessageCircle } from 'lucide-react';
import { isWhatsAppConfigured, generalWhatsAppLink, productWhatsAppLink, supplierWhatsAppLink, rfqSuccessWhatsAppLink } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/tracking';

type Variant = 'primary' | 'secondary' | 'dark';
type Context = 'general' | 'product' | 'supplier' | 'rfq_success';

interface WhatsAppButtonProps {
  context: Context;
  productName?: string | null;
  variant?: Variant;
  label?: string;
  source?: string;
  className?: string;
}

function variantClass(variant: Variant): string {
  if (variant === 'primary') {
    return 'bg-[#25D366] text-white hover:bg-[#1da851] border border-transparent';
  }
  if (variant === 'dark') {
    return 'border border-brand-700 bg-brand-900/40 text-white hover:bg-brand-800/60';
  }
  return 'border border-[#25D366] bg-white text-[#1da851] hover:bg-[#25D366]/5 border-[#25D366]/40]';
}

function getLink(context: Context, productName?: string | null): string {
  switch (context) {
    case 'product':
      return productName ? productWhatsAppLink(productName) : generalWhatsAppLink();
    case 'supplier':
      return supplierWhatsAppLink();
    case 'rfq_success':
      return rfqSuccessWhatsAppLink(productName ?? null);
    default:
      return generalWhatsAppLink();
  }
}

export function WhatsAppButton({
  context,
  productName,
  variant = 'secondary',
  label = 'Chat on WhatsApp',
  source,
  className = '',
}: WhatsAppButtonProps) {
  if (!isWhatsAppConfigured()) return null;

  const href = getLink(context, productName);
  const defaultLabel = context === 'product' ? 'WhatsApp Enquiry' : label;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with Setu Trade on WhatsApp${productName ? ` about ${productName}` : ''}`}
      className={`btn text-base ${variantClass(variant)} ${className}`}
      onClick={() => trackEvent('whatsapp_click', { source: source ?? context, product: productName ?? undefined })}
    >
      <MessageCircle className="h-4 w-4" strokeWidth={1.9} />
      {defaultLabel}
    </a>
  );
}

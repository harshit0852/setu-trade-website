const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? '';

export function isWhatsAppConfigured(): boolean {
  return Boolean(whatsappNumber.replace(/\D/g, ''));
}

export function getWhatsAppNumber(): string {
  return whatsappNumber.replace(/\D/g, '');
}

function buildLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const GENERAL_MESSAGE = `Hello Setu Trade,

I am interested in sourcing agro products from India.

Please share your product availability, specifications and export quotation.

Thank you.`;

const SUPPLIER_MESSAGE = `Hello Setu Trade,

I am a supplier/farmer interested in supplying agricultural products.

Please share details about your sourcing requirements.

Thank you.`;

function productMessage(productName: string): string {
  return `Hello Setu Trade,

I am interested in your ${productName}.

Product: ${productName}
Variety/Grade:
Quantity:
Destination:
Please share availability, specifications and quotation.

Thank you.`;
}

export function generalWhatsAppLink(): string {
  return buildLink(getWhatsAppNumber(), GENERAL_MESSAGE);
}

export function supplierWhatsAppLink(): string {
  return buildLink(getWhatsAppNumber(), SUPPLIER_MESSAGE);
}

export function productWhatsAppLink(productName: string): string {
  return buildLink(getWhatsAppNumber(), productMessage(productName));
}

export function rfqSuccessWhatsAppLink(productName: string | null): string {
  if (productName) {
    return buildLink(getWhatsAppNumber(), productMessage(productName));
  }
  return buildLink(getWhatsAppNumber(), GENERAL_MESSAGE);
}

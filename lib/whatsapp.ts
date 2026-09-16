const phoneNumber = "393348078032";

export function whatsappLink(message: string) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
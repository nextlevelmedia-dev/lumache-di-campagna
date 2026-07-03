const phoneNumber = "393333333333";

export function whatsappLink(message: string) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
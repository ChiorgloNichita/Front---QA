import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с нами через форму обратной связи.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Поиск",
  description: "Поиск статей по frontend-разработке.",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

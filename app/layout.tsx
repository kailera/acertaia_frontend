import "@/app/globals.css";
import Sidebar from "@/components/sidebar";

export const metadata = {
  title: "Painel",
  description: "Painel administrativo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}

import "../(site)/globals.css";
import { Inter } from "next/font/google";
import Provider from "@/lib/sessionProvider/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login Page",
  description: "login into the app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

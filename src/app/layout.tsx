import type { Metadata } from "next";
// import "./globals.css";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import NoteProvider from "./providers/NoteProvider";
import { getUser } from "@/auth/server";

export const metadata: Metadata = {
  title: "Script Universe",
  description: "Your personal note-taking companion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get user server-side to pass to Header
  const user = await getUser();

  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={true}
        >
          <NoteProvider>
            {
              user ? (
                <SidebarProvider>
                  <AppSidebar />
                  <div className="flex min-h-screen w-full flex-col">
                    <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
                      {children}
                    </main>
                    <Toaster />
                  </div>
                </SidebarProvider>
              ) : (
                <div className="min-h-screen">
                  {children}
                  <Toaster />
                </div>
              )

            }
          </NoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/common/app-sidebar";
import { cookies } from "next/headers";
import { ModeToggle } from "@/components/common/mode-toggle";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NicAhorro",
  description: "Aplicación Web dedicada a la administración de finanzas personales.",
  applicationName: 'NicAhorro',
  authors: [{ name: 'Gabriel Avilés', url: 'https://github.com/gabo592/' }],
  generator: 'Next.js',
  keywords: ['app', 'web', 'ahorro', 'finanzas', 'nic'],
  referrer: 'no-referrer-when-downgrade',
  creator: 'Gabriel Avilés',
  publisher: 'Vercel',
  icons: [
    { rel: 'icon', type: 'image/png', url: '/favicon-96x96.png', sizes: '96x96' },
    { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
    { rel: 'shortcut icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' }
  ],
  manifest: '/site.webmanifest'
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="NicAhorro" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="w-full flex flex-col gap-2">
              <header className="ml-2 mt-2 mr-2 flex items-center justify-between">
                <SidebarTrigger type="button" />
                <h1 className="text-xl font-bold">NicAhorro</h1>
                <ModeToggle />
              </header>
              <section className="flex flex-col items-center p-4 gap-8">
                {children}
              </section>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

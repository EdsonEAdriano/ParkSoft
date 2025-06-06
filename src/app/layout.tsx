import localFont from "next/font/local";

import Navbar from "./components/navbar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ display: 'flex', height: '100vh', margin: 0, overflow: 'hidden' }}
      >
        <Navbar />
        <div style={{ flex: 1, overflow: 'auto', marginRight: '24px', marginTop: '54px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}

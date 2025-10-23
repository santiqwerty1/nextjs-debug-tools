export const metadata = { title: "Next.js Debug Tools", description: "Support Engineer demo" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{fontFamily:"system-ui, sans-serif", lineHeight:1.5, maxWidth:900, margin:"0 auto", padding:24}}>
        {children}
      </body>
    </html>
  );
}

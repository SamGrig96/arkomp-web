/**
 * Pass-through root layout. The real <html>/<body> live in [locale]/layout.tsx
 * so that lang, metadata and structured data follow the visitor's language.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

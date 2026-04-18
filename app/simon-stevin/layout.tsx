// Editorial-pagina — bewust zonder Header en Footer.
// NB: in Next.js App Router nesten child-layouts IN de parent-layout
// (ze vervangen 'm niet). Het daadwerkelijk verbergen van Header/Footer
// gebeurt in components/Header.tsx + Footer.tsx + MainShell.tsx die
// zichzelf skippen op pathname === '/simon-stevin'. Dit bestand staat
// hier als semantische marker en voor toekomstige per-route metadata.
export default function SimonStevinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

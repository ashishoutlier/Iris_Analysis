import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {"title": "Iris field notes | Ashish", "description": "A closer look at 150 flowers, three species and four measurements."};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }

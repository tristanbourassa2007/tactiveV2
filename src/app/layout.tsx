import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import Sidebar from '@/components/Sidebar'
import type { ReactNode } from 'react'

// Métadonnées de base de l'application
export const metadata: Metadata = {
  title: 'TactiCE - Gestion de Projets',
  description: 'Une application moderne de gestion de projets avec Next.js',
}

// Configuration du viewport et du thème, séparées selon les recommandations Next.js 15
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e293b',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-slate-50">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 min-h-screen">
            <Toaster />
            {children}
          </main>
        </div>
      </body>
    </html>
  )
} 
import './globals.css'
import type { Metadata } from 'next'
import ReportContextProvider from '@/contexts/Reports'

export const metadata: Metadata = {
  title: 'Let It Rain',
  description: 'Mr. Tipples DSR Uploader',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReportContextProvider>{children}</ReportContextProvider>
      </body>
    </html>
  )
}

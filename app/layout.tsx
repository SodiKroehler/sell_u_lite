import { AuthProviders } from './providers'
import { Providers } from "./lib/redux/providers"
import '@styles/globals.css'
import localFont from 'next/font/local'
import { Cabin } from 'next/font/google'
import type { Metadata } from 'next'

const cabin = Cabin({
  subsets: ['latin'],
  variable: '--font-cabin',
})

const gill = localFont({
  src: './styles/fonts/GillSans.otf',
  display: 'swap',
  variable: '--font-gill',
})

export const metadata: Metadata = {
  title: 'Chitters',
  description: 'for chits and gigs',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cabin.variable}`}>
      {/* <html lang="en" className={`${gill.variable} ${cabin.variable}`}> */}
      <body>
        <Providers>
          <AuthProviders>
            {children}
          </AuthProviders>
        </Providers>
      </body>
    </html>
  )
}
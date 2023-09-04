import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './_components/navbar/navbar'
import Sidebar from './_components/sidebar/sidebar'
import './globals.css'
import { ApolloWrapper } from './Apollowrapper'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Salad',
  description: 'Salad',
  openGraph: {
    title: "Salad  Dashborad",
    description:"Dashboard demo ",
    url: "https://www.gotocourse.com/",

    siteName: "Salad",
    locale: "en-US",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ApolloWrapper>
            <Sidebar />
            <main className="main">
              <div className="container">
                <Navbar />
                {children}
              </div>
            </main>
          </ApolloWrapper>

      </body>
    </html>
  )
}

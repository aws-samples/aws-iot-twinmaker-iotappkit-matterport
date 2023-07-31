import './globals.css'

import "@iot-app-kit/components/styles.css"

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import AuthProvider from '../context/AuthContext'
import ProtectedRoutes from '../context/ProtectedRoutesContext'
import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'

const font = Nunito({ subsets: ['latin']})

export const metadata: Metadata = {
  title: 'AWS IoT TwinMaker x Matterport Integration App',
  description: 'Powered by IoT Application Kit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.className} flex flex-col min-h-screen justify-between`}>
      <AuthProvider>
            <ProtectedRoutes>
              <NavBar/>
            <main className='flex items-center flex-grow flex-col w-full'> 
                {children}
            </main> 
              <Footer/>
            </ProtectedRoutes>
          </AuthProvider>
      </body>
    </html>
  )
}

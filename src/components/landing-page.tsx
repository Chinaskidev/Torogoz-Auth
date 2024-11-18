'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet } from 'lucide-react'
import Link from 'next/link'

export function LandingPageComponent() {
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    // Implement wallet connection logic here
    setIsConnected(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">CredChain</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
            <li><Link href="/about" className="text-blue-600 hover:text-blue-800">About</Link></li>
            <li><Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center py-20">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Decentralized Credential Verification</h2>
          <p className="text-xl text-blue-700 mb-8">Secure, verifiable, and portable academic and professional credentials</p>
          <Button 
            onClick={handleConnect}
            className="text-lg px-6 py-3"
            disabled={isConnected}
          >
            {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
            <Wallet className="ml-2 h-5 w-5" />
          </Button>
        </section>

        <section className="py-12">
          <h3 className="text-2xl font-semibold text-blue-800 mb-6 text-center">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-xl font-semibold mb-2">1. Connect</h4>
                <p>Link your digital wallet to our platform securely.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-xl font-semibold mb-2">2. Verify</h4>
                <p>Input your credentials and get them verified by the issuing institution.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-xl font-semibold mb-2">3. Share</h4>
                <p>Receive your credentials as NFTs and share them securely with employers or institutions.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-4 text-center">
        <p>&copy; 2024 CredChain. All rights reserved.</p>
      </footer>
    </div>
  )
}
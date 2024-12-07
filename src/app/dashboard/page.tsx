'use client'

import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCredentialsByUser, getCredentialDetails, verifyCredential } from '@/utils/queries'
import { FiLoader, FiPlus, FiRefreshCw } from 'react-icons/fi'

interface Credential {
  hash: string
  courseName: string
  institutionName: string
  issueDate: string
  recipient: string
  valid: boolean
}

export default function DashboardPage() {
  const { user, authenticated, login } = usePrivy()
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authenticated && user?.address) {
      loadCredentials()
    }
  }, [authenticated, user?.address])

  const loadCredentials = async () => {
    if (!user?.address) return
    
    setIsLoading(true)
    try {
      const hashes = await getCredentialsByUser(user.address)
      const details = await Promise.all(
        hashes.map(async (hash) => {
          const detail = await getCredentialDetails(hash)
          return {
            hash,
            courseName: detail[0],
            institutionName: detail[1],
            issueDate: new Date(Number(detail[2]) * 1000).toLocaleDateString(),
            recipient: detail[3],
            valid: detail[4]
          }
        })
      )
      setCredentials(details)
    } catch (err) {
      setError('Error loading credentials: ' + (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async (hash: string) => {
    try {
      const isValid = await verifyCredential(hash)
      setCredentials(creds => 
        creds.map(c => c.hash === hash ? {...c, valid: isValid} : c)
      )
    } catch (err) {
      setError('Error verifying credential: ' + (err as Error).message)
    }
  }

  if (!authenticated) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="mb-4">Please connect your wallet to view your dashboard</p>
        <Button onClick={() => login()}>Connect Wallet</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Credentials Dashboard</h1>
        <div className="space-x-2">
          <Button onClick={loadCredentials} disabled={isLoading}>
            <FiRefreshCw className="mr-2" />
            Refresh
          </Button>
          <Button asChild>
            <a href="/onboard">
              <FiPlus className="mr-2" />
              New Certificate
            </a>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="received">
        <TabsList className="mb-4">
          <TabsTrigger value="received">Received Credentials</TabsTrigger>
          <TabsTrigger value="issued">Issued Credentials</TabsTrigger>
        </TabsList>

        <TabsContent value="received">
          {isLoading ? (
            <div className="text-center p-8">
              <FiLoader className="h-8 w-8 animate-spin mx-auto" />
              <p className="mt-2">Loading credentials...</p>
            </div>
          ) : credentials.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {credentials.map((cred) => (
                <Card key={cred.hash} className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{cred.courseName}</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Institution:</span> {cred.institutionName}</p>
                    <p><span className="font-medium">Issued:</span> {cred.issueDate}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={cred.valid ? 'text-green-600' : 'text-red-600'}>
                        {cred.valid ? ' Valid' : ' Revoked'}
                      </span>
                    </p>
                  </div>
                  <Button onClick={() => handleVerify(cred.hash)} className="mt-4 w-full">
                    Verify
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8">
              <p>No credentials found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="issued">
          {/* Similar structure as received, but filtered for credentials issued by the user */}
          <div className="text-center p-8">
            <p>Feature coming soon!</p>
          </div>
        </TabsContent>
      </Tabs>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
    </div>
  )
}


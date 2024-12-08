'use client'

import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCredentialsByUser, getCredentialDetails, verifyCredential, useContractSigner } from '@/utils/queries'
import { FiLoader, FiPlus, FiRefreshCw, FiCheckCircle, FiXCircle } from 'react-icons/fi'


interface Credential {
  hash: string
  courseName: string
  institutionName: string
  issueDate: string
  recipient: string
  valid: boolean
}

export default function DashboardPage() {
  const { user, authenticated, login, ready } = usePrivy()
  const { getSigner } = useContractSigner()
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authenticated && user?.wallet?.address && ready) {
      loadCredentials()
    }
  }, [authenticated, user?.wallet?.address, ready])

  const loadCredentials = async () => {
    if (!user?.wallet?.address) return
    
    setIsLoading(true)
    setError(null)
    try {
      const signer = await getSigner()
      const hashes = await getCredentialsByUser(signer, user.wallet.address)
      
      const details = await Promise.all(
        hashes.map(async (hash) => {
          const detail = await getCredentialDetails(signer, hash)
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
      console.error('Error loading credentials:', err)
      setError('Error loading credentials: ' + (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async (hash: string) => {
    try {
      const signer = await getSigner()
      const isValid = await verifyCredential(signer, hash)
      setCredentials(creds => 
        creds.map(c => c.hash === hash ? {...c, valid: isValid} : c)
      )
    } catch (err) {
      setError('Error verifying credential: ' + (err as Error).message)
    }
  }

  if (!authenticated || !ready) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-4">Please connect your wallet to view your dashboard</p>
          <Button onClick={() => login()}>Connect Wallet</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Credentials Dashboard</h1>
        <div className="space-x-2">
          <Button 
            onClick={loadCredentials} 
            disabled={isLoading}
            variant="outline"
          >
            <FiRefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
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
              <FiLoader className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="mt-2 text-muted-foreground">Loading credentials...</p>
            </div>
          ) : credentials.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {credentials.map((cred) => (
                <Card key={cred.hash} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold">{cred.courseName}</h3>
                    {cred.valid ? (
                      <FiCheckCircle className="text-green-500" />
                    ) : (
                      <FiXCircle className="text-red-500" />
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Institution:</span> {cred.institutionName}</p>
                    <p><span className="font-medium">Issued:</span> {cred.issueDate}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={cred.valid ? 'text-green-600 ml-1' : 'text-red-600 ml-1'}>
                        {cred.valid ? 'Valid' : 'Revoked'}
                      </span>
                    </p>
                    <p className="font-mono text-xs text-muted-foreground break-all">
                      Hash: {cred.hash}
                    </p>
                  </div>
                  <Button 
                    onClick={() => handleVerify(cred.hash)} 
                    className="mt-4 w-full"
                    variant="outline"
                  >
                    Verify
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No credentials found</p>
              <Button asChild className="mt-4">
                <a href="/onboard">Create Your First Certificate</a>
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="issued">
          <Card className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Coming Soon!</h3>
            <p className="text-muted-foreground">
              The ability to view issued credentials will be available in a future update.
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {error && (
        <Card className="mt-4 p-4 bg-destructive/10 text-destructive">
          {error}
        </Card>
      )}
    </div>
  )
}


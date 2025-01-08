// eslint-disable-next-line @typescript-eslint/no-unused-vars

'use client'

import { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card } from "../../components/ui/card"
import { verifyCredential, getCredentialDetails } from '../../utils/queries'

export default function VerifyPage() {
  const [credentialHash, setCredentialHash] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [credential, setCredential] = useState<any>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const isValid = await verifyCredential(credentialHash)
      if (isValid) {
        const details = await getCredentialDetails(credentialHash)
        setCredential({
          courseName: details[0],
          institutionName: details[1],
          issueDate: new Date(Number(details[2]) * 1000).toLocaleDateString(),
          recipient: details[3],
          valid: details[4]
        })
      } else {
        setError('This credential is not valid')
      }
    } catch (err) {
      setError('Error verifying credential: ' + (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Verify Credential</h1>
      
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <Label htmlFor="credentialHash">Credential Hash</Label>
            <Input
              id="credentialHash"
              value={credentialHash}
              onChange={(e) => setCredentialHash(e.target.value)}
              placeholder="Enter credential hash to verify"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Verifying...' : 'Verify Credential'}
          </Button>
        </form>

        {error && (
          <Card className="mt-6 p-4 bg-red-50 border-red-200">
            <p className="text-red-600">{error}</p>
          </Card>
        )}

        {credential && (
          <Card className="mt-6 p-6">
            <h2 className="text-xl font-semibold mb-4">Verified Credential</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Institution:</span> {credential.institutionName}</p>
              <p><span className="font-medium">Course:</span> {credential.courseName}</p>
              <p><span className="font-medium">Name:</span> {credential.firstName}</p>
              <p><span className="font-medium">Lastname:</span> {credential.lastName}</p>
              <p><span className="font-medium">Issue Date:</span> {credential.issueDate}</p>
              <p><span className="font-medium">Recipient:</span> {credential.recipient}</p>
              <p><span className="font-medium">Status:</span> 
                <span className={credential.valid ? 'text-green-600' : 'text-red-600'}>
                  {credential.valid ? ' Valid' : ' Revoked'}
                </span>
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}


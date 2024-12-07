'use client'

import { useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { issueCredential } from '@/utils/queries'
import Navbar from "@/components/navbar/navar"; 

export function CertificateForm() {
  const [formData, setFormData] = useState({
    courseName: '',
    institutionName: '',
    recipientName: '',
    recipientAddress: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { user } = usePrivy()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // TODO: Upload certificate to IPFS using Piñata
      // const ipfsHash = await uploadToIPFS(formData)

      // Issue credential on the blockchain
      const txHash = await issueCredential(
        formData.courseName,
        formData.institutionName,
        formData.recipientAddress
      )

      setSuccess(`Certificate issued successfully. Transaction hash: ${txHash}`)
    } catch (err) {
      setError('Error issuing certificate: ' + (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return <div>Please connect your wallet to issue a certificate.</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="courseName">Course Name</Label>
        <Input
          id="courseName"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="institutionName">Institution Name</Label>
        <Input
          id="institutionName"
          name="institutionName"
          value={formData.institutionName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="recipientName">Recipient Name</Label>
        <Input
          id="recipientName"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="recipientAddress">Recipient Ethereum Address</Label>
        <Input
          id="recipientAddress"
          name="recipientAddress"
          value={formData.recipientAddress}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Issuing...' : 'Issue Certificate'}
      </Button>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
    </form>
  )
}


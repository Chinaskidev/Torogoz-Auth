'use client'

import { useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { issueCredential, useContractSigner } from '../utils/queries'
import { uploadToIPFS } from '../utils/ipfsUtils'
import { JsonRpcSigner } from 'ethers'

interface CertificateFormProps {
  onComplete: () => void;  // Recibe la función para avanzar al siguiente paso
}

export function CertificateForm({ onComplete }: CertificateFormProps) {
  const [formData, setFormData] = useState({
    institutionName: '',
    courseName: '',
    firstName: '',
    lastName: '',    
    recipientName: '',
    recipientAddress: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { user, ready } = usePrivy()
  const { getSigner } = useContractSigner()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (!ready) {
        throw new Error("Privy is not ready")
      }

      // Upload certificate to IPFS using Piñata
      const ipfsHash = await uploadToIPFS(formData)

      // Get signer and validate its type
      const signer: JsonRpcSigner = await getSigner()

      if (!signer) {
        throw new Error("Failed to get signer")
      }

      // Issue credential on the blockchain
      const txHash = await issueCredential(
        signer,
        formData.institutionName,
        formData.courseName,
        formData.firstName,
        formData.lastName,
        formData.recipientAddress
      )

      setSuccess(`Certificate issued successfully. IPFS Hash: ${ipfsHash}, Transaction hash: ${txHash}`)

      // Llamar a onComplete después de completar la emisión
      onComplete()
    } catch (err) {
      setError('Error issuing certificate: ' + (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user || !ready) {
    return <div>Please connect your wallet to issue a certificate.</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName}
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

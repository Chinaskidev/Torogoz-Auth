'use client'

import { useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import { uploadToIPFS } from '@/utils/ipfsUtils'
import { issueCredential } from '@/utils/queries'

interface CertificateData {
  courseName: string
  institutionName: string
  recipientName: string
  recipientAddress: string
  issueDate: string
}

export function CertificateForm() {
  const [formData, setFormData] = useState<CertificateData>({
    courseName: '',
    institutionName: '',
    recipientName: '',
    recipientAddress: '',
    issueDate: new Date().toISOString().split('T')[0]
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { user, authenticated } = usePrivy()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Prepare metadata
      const metadata = {
        name: `${formData.courseName} Certificate`,
        description: `Issued by ${formData.institutionName} to ${formData.recipientName}`,
        attributes: {
          ...formData,
          issuer: user?.address
        }
      };

      // Upload to IPFS
      console.log('Uploading to IPFS...');
      const ipfsHash = await uploadToIPFS(metadata);
      console.log('IPFS upload successful. Hash:', ipfsHash);

      // Issue credential on the blockchain
      console.log('Issuing credential on blockchain...');
      const txHash = await issueCredential(
        formData.courseName,
        formData.institutionName,
        formData.recipientAddress
      );
      console.log('Credential issued. Transaction hash:', txHash);

      setSuccess(`Certificate issued successfully! IPFS: ${ipfsHash} | TX: ${txHash}`);
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError('Error issuing certificate: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="text-center p-4">
        <p className="text-lg mb-4">Please connect your wallet to issue certificates</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
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
            pattern="^0x[a-fA-F0-9]{40}$"
            title="Please enter a valid Ethereum address"
          />
        </div>
        <div>
          <Label htmlFor="issueDate">Issue Date</Label>
          <Input
            id="issueDate"
            name="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Issuing Certificate...
            </>
          ) : (
            'Issue Certificate'
          )}
        </Button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{success}</div>}
      </form>

      <div className="hidden md:block">
        <Card className="p-6 bg-white shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-4">Certificate Preview</h2>
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold">{formData.courseName || 'Course Name'}</h3>
              <p className="text-gray-600">This certifies that</p>
              <p className="text-lg font-medium mt-2">{formData.recipientName || 'Recipient Name'}</p>
              <p className="text-gray-600 mt-2">has successfully completed the course at</p>
              <p className="text-lg font-medium mt-2">{formData.institutionName || 'Institution Name'}</p>
              <p className="text-gray-600 mt-4">Issued on</p>
              <p className="font-medium">{formData.issueDate || 'Issue Date'}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}


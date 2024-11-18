import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function CredentialPage() {
  const [credentials, setCredentials] = useState([])
  const [newCredential, setNewCredential] = useState({
    type: '',
    institution: '',
    name: '',
    date: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCredential(prev => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value) => {
    setNewCredential(prev => ({ ...prev, type: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send this data to your backend for verification
    // For this example, we'll just add it to the list with a "pending" status
    setCredentials(prev => [...prev, { ...newCredential, status: 'pending' }])
    setNewCredential({ type: '', institution: '', name: '', date: '' })
  }

  const simulateVerification = (index) => {
    // In a real application, this would be handled by your backend
    setCredentials(prev => 
      prev.map((cred, i) => 
        i === index ? { ...cred, status: 'verified' } : cred
      )
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Manage Your Credentials</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Credential</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="type">Credential Type</Label>
              <Select onValueChange={handleTypeChange} value={newCredential.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Select credential type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="degree">Degree</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="license">Professional License</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="institution">Issuing Institution</Label>
              <Input 
                id="institution" 
                name="institution"
                value={newCredential.institution}
                onChange={handleInputChange}
                placeholder="Enter institution name"
              />
            </div>
            <div>
              <Label htmlFor="name">Credential Name</Label>
              <Input 
                id="name" 
                name="name"
                value={newCredential.name}
                onChange={handleInputChange}
                placeholder="Enter credential name"
              />
            </div>
            <div>
              <Label htmlFor="date">Date Issued</Label>
              <Input 
                id="date" 
                name="date"
                type="date"
                value={newCredential.date}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit">Submit for Verification</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold text-blue-800 mb-4">Your Credentials</h2>
      {credentials.map((cred, index) => (
        <Card key={index} className="mb-4">
          <CardContent className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{cred.name}</h3>
              <p>{cred.institution}</p>
              <p>{cred.date}</p>
            </div>
            <div>
              <Badge 
                variant={cred.status === 'verified' ? 'default' : 'secondary'}
              >
                {cred.status}
              </Badge>
              {cred.status === 'pending' && (
                <Button 
                  onClick={() => simulateVerification(index)}
                  className="ml-2"
                  variant="outline"
                >
                  Simulate Verify
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
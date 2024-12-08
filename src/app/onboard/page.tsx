'use client'

import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CertificateForm } from '@/components/certificate-form'
import { FiUser, FiFileText, FiCheck } from 'react-icons/fi'
import { useEffect, useState } from 'react'

const steps = [
  { id: 'connect', title: 'Connect Wallet', icon: FiUser },
  { id: 'create', title: 'Create Certificate', icon: FiFileText },
  { id: 'complete', title: 'Complete', icon: FiCheck },
]

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState('connect')
  const { login, authenticated, user } = usePrivy()
  const router = useRouter()

  // Update step when authentication status changes
  useEffect(() => {
    if (authenticated && currentStep === 'connect') {
      setCurrentStep('create')
    }
  }, [authenticated, currentStep])

  const handleComplete = () => {
    router.push('/dashboard')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to TorogozAuth</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between mb-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`flex flex-col items-center ${
                currentStep === step.id 
                  ? 'text-primary' 
                  : steps.findIndex(s => s.id === currentStep) > steps.findIndex(s => s.id === step.id)
                    ? 'text-primary/60'
                    : 'text-muted-foreground'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep === step.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>

        <Card className="p-6">
          {currentStep === 'connect' && (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
              <p className="mb-4">Connect your wallet to get your Certificate</p>
              {authenticated ? (
                <Button onClick={() => setCurrentStep('create')}>Continue</Button>
              ) : (
                <Button onClick={() => login()}>Connect Wallet</Button>
              )}
            </div>
          )}

          {currentStep === 'create' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Create Your First Certificate</h2>
              <CertificateForm onComplete={() => setCurrentStep('complete')} />
            </div>
          )}

          {currentStep === 'complete' && (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Onboarding Complete!</h2>
              <p className="mb-4">Congratulations! You ve successfully created your first certificate.</p>
              <Button onClick={handleComplete} className="w-full">Go to Dashboard</Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}


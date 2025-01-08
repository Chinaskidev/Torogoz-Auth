import { CertificateForm } from '../../components/certificate-form'

export default function IssueCertificatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Issue New Certificate</h1>
      <CertificateForm />
    </div>
  )
}


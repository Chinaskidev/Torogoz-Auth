'use client'
import Image from 'next/image'
import { Button } from '../../components/ui/button'

export default function HeroSection() {
  return (
    <main className="relative bg-white text-black">
      {/* Imagen principal fija al inicio */}
      <section className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
          <Image
            src="/torogozlogo.png"
            alt="Torogoz Logo"
            width={950}
            height={950}
            priority
            className="object-contain mt-20"
          />
        </div>
      </section>

      {/* Contenido principal */}
      <section className="container mx-auto px-6 py-20 min-h-screen bg-gray-100 flex flex-col md:flex-row items-center gap-12">
        {/* Contenedor de texto */}
        <div className="space-y-8 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold font-russo">Why Torogoz 3</h1>
          <p className="text-grey-600 text-lg font-russo">
            At Torogoz 3, we leverage decentralised identification technology to revolutionise the way identities are verified and managed. Our solution enables identity verification providers (IDV) and identity management systems (IAM) to securely confirm the same individual across multiple platforms or organisations without compromising privacy. We streamline the user experience, reducing onboarding friction by ensuring that a previously verified customer does not need to undergo repetitive processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
              Sign up for free
            </Button>
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
              Talk to Sales
            </Button>
          </div>
        </div>

        {/* Contenedor de la imagen */}
        <div className="flex justify-center md:w-1/2">
          <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
            <Image
              src="/certificado.png"
              alt="Certificate Illustration"
              width={980}
              height={980}
              priority
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Segundo contenedor con imagen a la izquierda */}
      <section className="container mx-auto px-6 py-20 min-h-screen bg-gray-100 flex flex-col md:flex-row-reverse items-center gap-12">
        {/* Contenedor de texto */}
        <div className="space-y-8 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold font-russo">Your identity, your control.</h1>
          <p className="text-grey-600 text-lg font-russo">
          Create it once, use it anywhere; always ready, secure, and reliable with Torogoz 3.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
              Learn More
            </Button>
          </div>
        </div>

        {/* Contenedor de la imagen */}
        <div className="flex justify-center md:w-1/2">
          <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
            <Image
              src="/dedo.jpg" // Cambia por el nombre de tu archivo de imagen
              alt="Vision Illustration"
              width={980}
              height={980}
              priority
              className="object-contain"
            />
          </div>
        </div>
      </section>


      {/* Tercer contenedor con imagen a la derecha */}
      <section className="container mx-auto px-6 py-20 min-h-screen bg-gray-100 flex flex-col md:flex-row items-center gap-12">
        {/* Contenedor de texto */}
        <div className="space-y-8 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold font-russo">What is the Torogoz 3 project?</h1>
          <p className="text-grey-800 text-lg font-russo">
          We are a group of developers passionate about blockchain technology, dedicated to making it universally accessible. All your certificates and information will be indexed and permanently available on the blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Contenedor de la imagen */}
        <div className="flex justify-center md:w-1/2">
          <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
            <Image
              src="/cabezatorogoz.png" // Cambia por el nombre de tu archivo de imagen
              alt="Vision Illustration"
              width={980}
              height={980}
              priority
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

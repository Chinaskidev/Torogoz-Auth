"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const HeroSection = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const scrollImages = [
    "/torogoz1.png",
    "/decentralized.png",
    "/credential.png",
    "/verification.png",
    "/secure.png",
    "/verifiable.png",
    "/portable.png",
    "/academic.png",
    "/professional.png",
  ];

  const showFinalSection = scrollIndex >= scrollImages.length;

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (scrolling || showFinalSection) return; // Bloquea el scroll si está animando o ya llegó al final
      setScrolling(true);

      const direction = event.deltaY > 0 ? 1 : -1;
      setScrollIndex((prevIndex) => {
        let newIndex = prevIndex + direction;
        if (newIndex < 0) newIndex = 0; // Evita valores negativos
        if (newIndex > scrollImages.length) newIndex = scrollImages.length; // Detiene al final
        return newIndex;
      });

      // Controla el tiempo para permitir el próximo scroll
      setTimeout(() => setScrolling(false), 700);
    };

    document.body.style.overflow = showFinalSection ? "auto" : "hidden"; // Desbloquea scroll al final
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = ""; // Restaurar el scroll al desmontar
    };
  }, [scrolling, showFinalSection]);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Sección de imágenes con animación */}
      {!showFinalSection && (
        <section className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <Image
              src={scrollImages[scrollIndex]}
              alt={`Image ${scrollIndex + 1}`}
              fill
              priority
              className="object-contain transition-transform duration-1000 ease-in-out"
            />
          </div>
        </section>
      )}

      {/* Sección final con logo */}
      {showFinalSection && (
        <>
          <section className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
            <div className="relative w-96 h-96 md:w-[32rem] md:h-[32rem] mb-16 transition-all duration-1000">
              <Image
                src="/torogozauthlogo.png"
                alt="Torogozauth Logo"
                width={900}
                height={900}
                priority
                className="object-contain"
              />
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default HeroSection;

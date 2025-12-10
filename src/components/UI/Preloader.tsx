import { useEffect, useState } from "react";

type PreloaderProps = {
  isExiting: boolean;
};

function Preloader({ isExiting }: PreloaderProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [matrixText, setMatrixText] = useState("");
  const [isDecodingByteHouse, setIsDecodingByteHouse] = useState(false);

  // Texto completo
  const fullText = "Bienvenido a ";
  const byteHouseText = "ByteHouse";

  // Caracteres para el efecto Matrix
  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()";

  // Función para generar caracter aleatorio
  const getRandomChar = () =>
    matrixChars[Math.floor(Math.random() * matrixChars.length)];

  // Escribir "Bienvenido a "
  useEffect(() => {
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Iniciar el efecto Matrix para ByteHouse
        setIsDecodingByteHouse(true);
        setMatrixText(
          byteHouseText
            .split("")
            .map(() => getRandomChar())
            .join("")
        );
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, []);

  // Efecto Matrix para ByteHouse - decodificación secuencial
  useEffect(() => {
    if (!isDecodingByteHouse) return;

    let currentDecodingIndex = 0;
    let frameCount = 0;
    const framesPerLetter = 4; // Cuántos frames de animación antes de decodificar la siguiente letra

    const matrixInterval = setInterval(() => {
      // Generar el texto actual
      const newMatrixText = byteHouseText
        .split("")
        .map((char, index) => {
          if (index < currentDecodingIndex) {
            // Las letras ya decodificadas se mantienen fijas
            return char;
          } else {
            // Las letras aún no decodificadas siguen siendo aleatorias
            return getRandomChar();
          }
        })
        .join("");

      setMatrixText(newMatrixText);

      frameCount++;

      // Cada cierto número de frames, decodificar la siguiente letra
      if (
        frameCount >= framesPerLetter &&
        currentDecodingIndex < byteHouseText.length
      ) {
        currentDecodingIndex++;
        frameCount = 0;
      }

      // Si ya se decodificaron todas las letras, terminar
      if (currentDecodingIndex >= byteHouseText.length) {
        setMatrixText(byteHouseText); // Asegurar que termine con el texto correcto
        clearInterval(matrixInterval);
      }
    }, 80); // Cambio cada 80ms para que coincida con la velocidad de typing

    return () => clearInterval(matrixInterval);
  }, [isDecodingByteHouse]);

  const hasStartedByteHouse = displayedText === fullText;

  return (
    <div
      className={`px-4 fixed inset-0 flex items-center justify-center bg-black z-50 transition-transform duration-1000 ease-in-out ${
        isExiting ? "transform -translate-x-full" : "transform translate-x-0"
      }`}
    >
      <div className="text-white font-inconsolata font-bold text-5xl md:text-7xl text-center relative">
        {/* Parte "Bienvenido a " */}
        <span>{displayedText}</span>

        {/* Parte ByteHouse con efecto Matrix */}
        {hasStartedByteHouse && (
          <span className="font-bitcount font-normal">{matrixText}</span>
        )}
      </div>
    </div>
  );
}

export default Preloader;

// components/CredentialCard.tsx
import React from "react";
import { IconCertificate } from "@tabler/icons-react";
import { formatDate } from "@/utils/dateFormatter"; // Un helper para formatear fechas

interface CredentialCardProps {
  credential: any; // Datos de la credencial
}

const CredentialCard: React.FC<CredentialCardProps> = ({ credential }) => {
  return (
    <div className="relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center pt-4 mx-3">
          {/* Imagen del certificado */}
          <div className="text-center flex flex-col items-center justify-center">
            <IconCertificate className="w-20 h-20 text-gray-700 dark:text-gray-300" />
            <p className="font-medium text-gray-700 py-2">Certificado</p>
          </div>
          
          {/* Nombre del curso y la institución */}
          <div className="text-center py-2 px-4">
            <p className="text-lg font-semibold">{credential.courseName}</p>
            <p className="text-md font-light">{credential.institutionName}</p>
          </div>

          {/* Fecha de emisión */}
          <div className="flex justify-center items-center py-2 px-4">
            <p className="text-sm text-gray-600">
              Emitido el: {formatDate(credential.issueDate)}
            </p>
          </div>

          {/* Validación de la credencial */}
          <div className="flex justify-center items-center py-2 px-4">
            <p className={`text-sm ${credential.valid ? "text-green-500" : "text-red-500"}`}>
              {credential.valid ? "Válido" : "Revocado"}
            </p>
          </div>

          {/* Iconos de redes sociales (opcional) */}
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              Redes Sociales
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-2 pt-2 w-full">
            {credential.socials?.map((social: { type: string, url: string }, index: number) => (
              <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                <div className="flex flex-row w-11 h-11 cursor-pointer items-center bg-black p-3 rounded-full">
                  {/* Aquí agregaríamos iconos según el tipo de red social */}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialCard;

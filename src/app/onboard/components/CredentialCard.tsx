// components/CredentialCard.tsx
import React from "react";
import { IconBrandX, IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";

interface CredentialCardProps {
  formData: any;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ formData }) => {
  return (
    <div className="relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center pt-4 mx-3">
          <div className="text-center flex flex-col items-center justify-center">
            <image
              className="w-20 h-20 object-cover object-center p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src={formData.imageUrl || "/public/torogoz1.png"}
              alt="Certificate Avatar"
            />
            <p className="font-medium text-gray-700 py-2">
              @{`${formData.username}` || `Certificate`}
            </p>
            <p className="text-sm text-gray-700 py-1">
              {formData.info || "This is a digital certificate issued on the blockchain."}
            </p>
          </div>

          <div className="py-2">
            <p className="text-sm font-medium text-gray-700">Course: {formData.courseName}</p>
            <p className="text-sm font-medium text-gray-700">Institution: {formData.institutionName}</p>
            <p className="text-sm font-medium text-gray-700">Issued: {new Date(formData.issueDate * 1000).toLocaleDateString()}</p>
          </div>

          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              Social Media Links
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 w-full">
            {formData.x && (
              <Link href={formData.x}>
                <div className="flex flex-row w-11 h-11 cursor-pointer items-center bg-black p-3 rounded-full">
                  <IconBrandX width={24} height={24} color="white" />
                </div>
              </Link>
            )}
            {formData.linkedin && (
              <Link href={formData.linkedin}>
                <div className="flex flex-row w-11 h-11 cursor-pointer items-center bg-black p-3 rounded-full">
                  <IconBrandLinkedin width={24} height={24} color="white" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialCard;

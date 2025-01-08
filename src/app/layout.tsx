// eslint-disable-next-line @typescript-eslint/no-explicit-any

"use client";
import { defineChain } from "viem";
import { Outfit } from "next/font/google";
import "./globals.css";

import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";
const font = Outfit({ subsets: ["latin"] });

const Sepolia = defineChain({
  id: 11155111 ,
  name: "Sepolia",
  network: "Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Sepolia",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://eth-sepolia.public.blastapi.io"],
    },
  } as any,
  blockExplorers: {
    default: { name: "Explorer", url: "https://sepolia.etherscan.io/" },
  },
}) as any;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <PrivyProvider
          appId="cm3q1swmn00hlyml9gr6ij0z8"
          config={{
            appearance: {
              theme: "light",
              accentColor: "#676FFF",
              logo: "https://your-logo-url",
            },
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
            defaultChain: Sepolia,
            supportedChains: [Sepolia],
          }}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}


"use client";
import { defineChain } from "viem";
import { Outfit } from "next/font/google";
import "./globals.css";

import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";
const font = Outfit({ subsets: ["latin"] });

const Arbitrum = defineChain({
  id: 421614,
  name: "Arbitrum Sepolia",
  network: "Arbitrum Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Arbitrum Sepolia",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://arbitrum-sepolia.infura.io/v3/cf29898319594df799ef861b6dab7198"],
    },
  } as any,
  blockExplorers: {
    default: { name: "Explorer", url: "https://sepolia.arbiscan.io" },
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
            defaultChain: Arbitrum,
            supportedChains: [Arbitrum],
          }}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}

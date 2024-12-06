"use client";
import React, { useState, useEffect } from "react";
import { useWallets, usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { issueCredential, getCredentialsByUser } from "@/utils/queries";

interface DropDownMenuProps {
  onClose: () => void;
}

const DropdownMenu: React.FC<DropDownMenuProps> = ({ onClose }) => {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [userCredentials, setUserCredentials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLinkClick = () => {
    onClose();
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        if (ready && wallets[0]?.address) {
          const userAddress = wallets[0].address;
          const credentials = await getCredentialsByUser(userAddress);
          setUserCredentials(credentials);

          setUserInfo(credentials.length > 0 ? "User has credentials." : "User does not have credentials.");
        } else {
          setUserInfo("User does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUserInfo("Error retrieving user info");
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, [ready, authenticated, wallets]);

  return (
    <div className="w-screen h-screen bg-white px-2 absolute right-0 xl:hidden z-50">
      <Accordion defaultValue="item-1" type="single" collapsible>
        <Link href={"/"} onClick={handleLinkClick} className="py-4 border-b">
          Home
        </Link>
        <Link href={"/verify-identity"} onClick={handleLinkClick} className="py-4 border-b">
          Verify Credentials
        </Link>
      </Accordion>

      <div className="pt-12 space-y-4 flex flex-col px-4">
        {loading ? (
          <p>Loading user info...</p>
        ) : (
          <>
            {authenticated ? (
              <>
                {userCredentials.length > 0 ? (
                  <Link href={"/dashboard"}>
                    <Button className="w-full">Dashboard</Button>
                  </Link>
                ) : (
                  <Link href={"/onboard"}>
                    <Button variant="outline" className="w-full">
                      Get Credentials
                    </Button>
                  </Link>
                )}
                <Button variant="outline" onClick={logout} className="w-full">
                  Disconnect
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={login} className="w-full">
                Connect
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;

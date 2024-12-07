import  { ethers }  from "ethers";
import { usePrivy } from '@privy-io/react-auth';
import { Contract } from "ethers";

const contractAddress = "0x2148caA89bA15a41310077Bd11aC82859Ee56a27";
const contractABI = [
  "function addIssuer(address account)",
  "function revokeIssuer(address account)",
  "function issueCredential(string courseName, string institutionName, address recipient) returns (bytes32)",
  "function verifyCredential(bytes32 credentialHash) view returns (bool)",
  "function revokeCredential(bytes32 credentialHash)",
  "function getCredentialsByUser(address user) view returns (bytes32[])",
  "function getCredentialDetails(bytes32 credentialHash) view returns (string, string, uint256, address, bool)"
];

// Create a custom hook to get the signer
export function useContractSigner() {
  const { ready, getEthersProvider } = usePrivy();

  const getSigner = async () => {
    if (!ready) {
      throw new Error("Privy is not ready");
    }
    const provider = await getEthersProvider();
    return provider.getSigner();
  };

  return { getSigner };
}

// Issue credential
export async function issueCredential(signer: ethers.Signer, courseName: string, institutionName: string, recipient: string) {
  try {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.issueCredential(courseName, institutionName, recipient);
    console.log("Credential issued:", tx.hash);
    return tx.hash; // Transaction hash
  } catch (error) {
    console.error("Error issuing credential:", error);
    throw error;
  }
}

// Verify credential
export async function verifyCredential(signer: ethers.Signer, credentialHash: string) {
  try {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const isValid = await contract.verifyCredential(credentialHash);
    console.log("Is the credential valid?", isValid);
    return isValid;
  } catch (error) {
    console.error("Error verifying credential:", error);
    throw error;
  }
}

// Get credentials by user
export async function getCredentialsByUser(signer: ethers.Signer, userAddress: string) {
  try {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const credentials = await contract.getCredentialsByUser(userAddress);
    console.log("User credentials:", credentials);
    return credentials;
  } catch (error) {
    console.error("Error getting user credentials:", error);
    throw error;
  }
}

// Get credential details
export async function getCredentialDetails(signer: ethers.Signer, credentialHash: string) {
  try {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const details = await contract.getCredentialDetails(credentialHash);
    console.log("Credential details:", details);
    return details;
  } catch (error) {
    console.error("Error getting credential details:", error);
    throw error;
  }
}

// Revoke credential
export async function revokeCredential(signer: ethers.Signer, credentialHash: string) {
  try {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.revokeCredential(credentialHash);
    await tx.wait();
    console.log("Credential revoked:", credentialHash);
    return tx.hash;
  } catch (error) {
    console.error("Error revoking credential:", error);
    throw error;
  }
}

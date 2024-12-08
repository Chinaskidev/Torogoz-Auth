import { ethers } from "ethers";
import { usePrivy } from "@privy-io/react-auth";

// Dirección y ABI del contrato
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

/**
 * Hook personalizado para obtener el signer del contrato
 * @returns {getSigner: Function}
 */
export function useContractSigner() {
  const { ready, getEthersProvider } = usePrivy();

  const getSigner = async (): Promise<ethers.Signer> => {
    if (!ready) {
      throw new Error("Privy is not ready");
    }
    const provider = await getEthersProvider();
    return provider.getSigner(); // Retorna el signer para realizar transacciones
  };

  return { getSigner };
}

/**
 * Emitir un certificado
 * @param signer {ethers.Signer} - Firmante conectado
 * @param courseName {string} - Nombre del curso
 * @param institutionName {string} - Nombre de la institución
 * @param recipient {string} - Dirección del destinatario
 * @returns {Promise<string>} - Hash de la transacción
 */
export async function issueCredential(
  signer: ethers.Signer,
  courseName: string,
  institutionName: string,
  recipient: string
): Promise<string> {
  try {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.issueCredential(courseName, institutionName, recipient);
    console.log("Credential issued:", tx.hash);
    return tx.hash; // Retorna el hash de la transacción
  } catch (error) {
    console.error("Error issuing credential:", error);
    throw error;
  }
}

/**
 * Verificar un certificado
 * @param signer {ethers.Signer} - Firmante conectado
 * @param credentialHash {string} - Hash del certificado
 * @returns {Promise<boolean>} - Validez del certificado
 */
export async function verifyCredential(
  signer: ethers.Signer,
  credentialHash: string
): Promise<boolean> {
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

/**
 * Obtener certificados por usuario
 * @param signer {ethers.Signer} - Firmante conectado
 * @param userAddress {string} - Dirección del usuario
 * @returns {Promise<string[]>} - Lista de hashes de certificados
 */
export async function getCredentialsByUser(
  signer: ethers.Signer,
  userAddress: string
): Promise<string[]> {
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

/**
 * Obtener detalles de un certificado
 * @param signer {ethers.Signer} - Firmante conectado
 * @param credentialHash {string} - Hash del certificado
 * @returns {Promise<any>} - Detalles del certificado
 */
export async function getCredentialDetails(
  signer: ethers.Signer,
  credentialHash: string
): Promise<any> {
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

/**
 * Revocar un certificado
 * @param signer {ethers.Signer} - Firmante conectado
 * @param credentialHash {string} - Hash del certificado
 * @returns {Promise<string>} - Hash de la transacción
 */
export async function revokeCredential(
  signer: ethers.Signer,
  credentialHash: string
): Promise<string> {
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

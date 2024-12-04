import { ethers } from "ethers";
import { Web3Provider, Contract} from "ethers";

const contractAddress = "0x2148caA89bA15a41310077Bd11aC82859Ee56a27";
const contractABI = [
  // ABI  según el contrato
  "function addIssuer(address account)",
  "function revokeIssuer(address account)",
  "function issueCredential(string courseName, string institutionName, address recipient) returns (bytes32)",
  "function verifyCredential(bytes32 credentialHash) view returns (bool)",
  "function revokeCredential(bytes32 credentialHash)",
  "function getCredentialsByUser(address user) view returns (bytes32[])",
  "function getCredentialDetails(bytes32 credentialHash) view returns (string, string, uint256, address, bool)"
];

// Conectar a MetaMask
async function getProvider() {
  if (typeof window.ethereum !== "undefined") {
    return new ethers.providers.Web3Provider(window.ethereum);
  } else {
    throw new Error("MetaMask no está instalado");
  }
}

// Emitir credencial
export async function issueCredential(courseName, institutionName, recipient) {
  try {
    const provider = await getProvider();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.issueCredential(courseName, institutionName, recipient);
    console.log("Credencial emitida:", tx.hash);
    return tx.hash; // Hash de la transacción
  } catch (error) {
    console.error("Error al emitir la credencial:", error);
    throw error;
  }
}

// Verificar credencial
export async function verifyCredential(credentialHash) {
  try {
    const provider = await getProvider();
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    const isValid = await contract.verifyCredential(credentialHash);
    console.log("¿La credencial es válida?", isValid);
    return isValid;
  } catch (error) {
    console.error("Error al verificar credencial:", error);
    throw error;
  }
}

// Obtener credenciales por usuario
export async function getCredentialsByUser(userAddress) {
  try {
    const provider = await getProvider();
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    const credentials = await contract.getCredentialsByUser(userAddress);
    console.log("Credenciales del usuario:", credentials);
    return credentials;
  } catch (error) {
    console.error("Error al obtener credenciales del usuario:", error);
    throw error;
  }
}

// Obtener detalles de una credencial
export async function getCredentialDetails(credentialHash) {
  try {
    const provider = await getProvider();
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    const details = await contract.getCredentialDetails(credentialHash);
    console.log("Detalles de la credencial:", details);
    return details;
  } catch (error) {
    console.error("Error al obtener detalles de la credencial:", error);
    throw error;
  }
}

// Revocar credencial
export async function revokeCredential(credentialHash) {
  try {
    const provider = await getProvider();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.revokeCredential(credentialHash);
    await tx.wait();
    console.log("Credencial revocada:", credentialHash);
    return tx.hash;
  } catch (error) {
    console.error("Error al revocar credencial:", error);
    throw error;
  }
}


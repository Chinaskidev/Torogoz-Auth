import { Web3Provider, Contract } from "ethers";
// Dirección del contrato y ABI
const contractAddress = "0x5EBBdcd85a08ec861Ad94d43e570a1B8a1f237b6";
const contractABI = [
  // ABI de tu contrato Torogoz
  // Asegúrate de incluir las definiciones de las funciones y eventos que necesitas
  "function hasRole(bytes32 role, address account) view returns (bool)",
  "function DEFAULT_ADMIN_ROLE() view returns (bytes32)"
];

// Función para obtener la dirección del usuario
async function getUserAddress() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return await signer.getAddress();
  } else {
    throw new Error("MetaMask no está instalado");
  }
}

// Función para verificar si el usuario tiene el rol de administrador
async function isAdmin() {
  try {
    const userAddress = await getUserAddress();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
    const adminRole = await contract.DEFAULT_ADMIN_ROLE();
    const hasAdminRole = await contract.hasRole(adminRole, userAddress);
    
    return hasAdminRole;
  } catch (e) {
    console.error("Error verificando el rol de administrador:", parseErrorMsg(e));
    return false;
  }
}

// Función para parsear mensajes de error
function parseErrorMsg(e) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message;
}

export { isAdmin, getUserAddress };
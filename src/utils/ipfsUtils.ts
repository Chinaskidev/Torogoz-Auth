import axios from 'axios';

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

export const uploadToIPFS = async (data: any) => {
  try {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });
    
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.data.IpfsHash;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error uploading to IPFS:', error.response?.data || error.message);
    } else {
      console.error('Error uploading to IPFS:', error);
    }
    throw error;
  }
};


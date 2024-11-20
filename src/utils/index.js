import { ethers } from 'ethers';
import Torogoz from './Torogoz.json'

export const  contract= async () => {
    const provider = new ethers.provider.Web3Provider(window.ethereum)
    const {ethereum}= window;
     if (ethereum){
        const signer = provider.getSigner();
        const contractReader = new ethers.Contract(
            '0x5EBBdcd85a08ec861Ad94d43e570a1B8a1f237b6',
            Torogoz.abi,
            signer

        );
        return contractReader;
     }

     

};
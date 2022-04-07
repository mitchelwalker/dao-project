import ethers from 'ethers';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';

import dotenv from 'dotenv';
dotenv.config();

if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
  console.log('private key not found')
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === '') {
  console.log('Missing Alchemy URL')
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === '') {
  console.log('Missing Wallet Address')
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.PRIVATE_KEY,
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
  )
);

(async () => {
  try {
    const address = await sdk.getSigner().getAddress();
    console.log('SDK initiated:', address);
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})();


export default sdk;
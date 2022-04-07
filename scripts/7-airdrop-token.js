import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const editionDrop = sdk.getEditionDrop("0x79bE84902Cc1450833CFa984674BfAB3AeF0b7A8");

// This is the address to our ERC-20 token contract.
const token = sdk.getToken("0x06971d6238Caaa3d101A15a4186d986B98f1D95E");

(async () => {
  try {
    // Grab all the addresses of people who own our membership NFT, 
    // which has a tokenId of 0.
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
      );
      process.exit(0);
    }

    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
      const amount = 1000;
      console.log("✅ Going to airdrop", amount, "tokens to", address);

      // Set up the target.
      const airdropTarget = {
        toAddress: address,
        amount: amount,
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();
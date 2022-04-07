import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x79bE84902Cc1450833CFa984674BfAB3AeF0b7A8");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "8 Bit World",
        description: "This NFT will give you access to BitDAO!",
        image: readFileSync("scripts/assets/world.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})(); 
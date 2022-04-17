import { ethers } from "hardhat"
import addresses from "../addresses.json"

// Set these before proceeding
const env = "staging"
const slicerId = 16
// const slxAddress = "0x6fa5FF63B2752265c6Bd9350591f97A7dAd9e918" // Mainnet
const slxAddress = "0x4F6Ff17F5dCb4f413C5f1b7eC42D6c18666452B0" // Rinkeby

async function main() {
  console.log("deploying")

  const CONTRACT = await ethers.getContractFactory("SliceV1Drop")
  const contract = await CONTRACT.deploy(
    "Slice V1 Drop",
    "SLV1",
    slxAddress,
    addresses[env]["SliceCore"],
    addresses[env]["ProductsModule"],
    slicerId
  )
  await contract.deployed()

  console.log("deploying completed successfully! Address: " + contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

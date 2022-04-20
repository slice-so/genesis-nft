import { expect } from "chai"
import { ethers } from "hardhat"
import { BigNumber } from "ethers"
import { MerkleTree } from "merkletreejs"
import keccak256 from "keccak256"
import { SliceGenesis } from "../../typechain-types/SliceGenesis"
import { createSlicer, createProduct, getSelector } from "../../utils"
import { SLXAddress } from "../../utils/deployJB/deployJB"
import {
  a0,
  a1,
  a2,
  a3,
  a4,
  addr1,
  productsModule,
  sliceCore,
  slx,
} from "../setup"

describe("{SliceGenesis}", () => {
  let slicerAddr: string
  let sliceGenesis: SliceGenesis
  let merkleTree1: MerkleTree
  let merkleTree2: MerkleTree
  let slicerId: number

  const execSignature = getSelector("onProductPurchase(bytes)")

  const checkSignature = getSelector(
    "isPurchaseAllowed(uint256,uint256,address,uint256,bytes,bytes)"
  )

  it("ProductPurchase contract is deployed and initialized", async () => {
    const SLICEGENESIS = await ethers.getContractFactory("SliceGenesis")

    const allowedAddresses1 = [a0, a1, a2, a3]
    const leafNodes1 = allowedAddresses1.map((addr) => keccak256(addr))
    merkleTree1 = new MerkleTree(leafNodes1, keccak256, { sortPairs: true })
    const merkleRoot1 = merkleTree1.getHexRoot()

    const allowedAddresses2 = [a1, a2, a3]
    const leafNodes2 = allowedAddresses2.map((addr) => keccak256(addr))
    merkleTree2 = new MerkleTree(leafNodes2, keccak256, { sortPairs: true })
    const merkleRoot2 = merkleTree2.getHexRoot()

    const { slicer, slicerAddress, tokenId } = await createSlicer(
      [
        { account: a0, shares: 90 },
        { account: a1, shares: 10 },
      ],
      20,
      0,
      0,
      [],
      false
    )
    slicerAddr = slicerAddress
    slicerId = tokenId

    sliceGenesis = (await SLICEGENESIS.deploy(
      "SLICE V1 DROP",
      "SLC1",
      SLXAddress,
      sliceCore.address,
      productsModule.address,
      slicerId
    )) as SliceGenesis
    await sliceGenesis.deployed()

    await sliceGenesis._setTempURI("temp")
    await sliceGenesis._setMerkleRoot(1, merkleRoot1)
    await sliceGenesis._setMerkleRoot(3, merkleRoot2)
    await createProduct(slicerId, slicerAddr, 1, 100, [], true, false, [], {
      externalAddress: sliceGenesis.address,
      checkFunctionSignature: checkSignature,
      execFunctionSignature: execSignature,
      data: [],
      value: ethers.utils.parseEther("0"),
    })
    await createProduct(slicerId, slicerAddr, 5, 100, [], true, false, [], {
      externalAddress: sliceGenesis.address,
      checkFunctionSignature: checkSignature,
      execFunctionSignature: execSignature,
      data: [],
      value: ethers.utils.parseEther("0"),
    })
    await createProduct(slicerId, slicerAddr, 0, 1000, [], true, false, [], {
      externalAddress: sliceGenesis.address,
      checkFunctionSignature: checkSignature,
      execFunctionSignature: execSignature,
      data: [],
      value: ethers.utils.parseEther("0"),
    })
    await createProduct(slicerId, slicerAddr, 0, 1000, "0.1", true, false, [], {
      externalAddress: sliceGenesis.address,
      checkFunctionSignature: checkSignature,
      execFunctionSignature: execSignature,
      data: [],
      value: ethers.utils.parseEther("0"),
    })

    await slx.transfer(a1, BigNumber.from(75).mul(BigNumber.from(10).pow(21)))
    await slx.transfer(a2, BigNumber.from(75).mul(BigNumber.from(10).pow(21)))
  })

  describe("isPurchaseAllowed", () => {
    it("Product #1 - Returns true if in allowlist1, false if not", async () => {
      const proofA0 = merkleTree1.getHexProof(keccak256(a0))
      const buyerCustomDataA0 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA0]
      )
      const isAllowedA0 = await sliceGenesis.isPurchaseAllowed(
        slicerId,
        1,
        a0,
        1,
        [],
        buyerCustomDataA0
      )

      const proofA4 = merkleTree1.getHexProof(keccak256(a4))
      const buyerCustomDataA4 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA4]
      )
      const isAllowedA4 = await sliceGenesis.isPurchaseAllowed(
        slicerId,
        1,
        a4,
        1,
        [],
        buyerCustomDataA4
      )

      expect(isAllowedA0).to.be.equal(true)
      expect(isAllowedA4).to.be.equal(false)
    })

    it("Product #2 - Returns true if account owns enough SLX tokens, false if not", async () => {
      const isAllowedA1X3 = await sliceGenesis.isPurchaseAllowed(
        slicerId,
        2,
        a1,
        3,
        [],
        []
      )
      const isAllowedA1X5 = await sliceGenesis.isPurchaseAllowed(
        slicerId,
        2,
        a1,
        4,
        [],
        []
      )
      expect(isAllowedA1X3).to.be.equal(true)
      expect(isAllowedA1X5).to.be.equal(false)
    })

    it("Product #3 - Returns true if in allowlist2, false if not", async () => {
      const proofA0 = merkleTree2.getHexProof(keccak256(a0))
      const buyerCustomDataA0 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA0]
      )
      const isAllowedA0 = await sliceGenesis.isPurchaseAllowed(
        slicerId,
        3,
        a0,
        1,
        [],
        buyerCustomDataA0
      )

      const proofA1 = merkleTree2.getHexProof(keccak256(a1))
      const buyerCustomDataA1 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA1]
      )
      const isAllowedA1 = await sliceGenesis.isPurchaseAllowed(
        slicerId,
        3,
        a1,
        1,
        [],
        buyerCustomDataA1
      )

      expect(isAllowedA1).to.be.equal(true)
      expect(isAllowedA0).to.be.equal(false)
    })
  })

  describe("onProductPurchase", () => {
    it("Product #1 - NFT minted on purchase", async () => {
      const initBalance = await sliceGenesis.balanceOf(a1)

      const proofA1 = merkleTree1.getHexProof(keccak256(a1))
      const buyerCustomDataA1 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA1]
      )

      await productsModule.payProducts(a1, [
        {
          slicerId,
          productId: 1,
          quantity: 1,
          currency: ethers.constants.AddressZero,
          buyerCustomData: buyerCustomDataA1,
        },
      ])

      const finalBalance = await sliceGenesis.balanceOf(a1)

      expect(finalBalance.sub(initBalance)).to.be.equal(1)
    })

    it("Product #2 - Single NFT minted on purchase", async () => {
      const initBalance = await sliceGenesis.balanceOf(a1)

      await productsModule.payProducts(a1, [
        {
          slicerId,
          productId: 2,
          quantity: 1,
          currency: ethers.constants.AddressZero,
          buyerCustomData: [],
        },
      ])

      const finalBalance = await sliceGenesis.balanceOf(a1)

      expect(finalBalance.sub(initBalance)).to.be.equal(1)
    })

    it("Product #2 - Multiple NFTs minted on purchase", async () => {
      const initBalance = await sliceGenesis.balanceOf(a1)

      await productsModule.payProducts(a1, [
        {
          slicerId,
          productId: 2,
          quantity: 2,
          currency: ethers.constants.AddressZero,
          buyerCustomData: [],
        },
      ])

      const finalBalance = await sliceGenesis.balanceOf(a1)

      expect(finalBalance.sub(initBalance)).to.be.equal(2)
    })

    it("Product #3 - NFT minted on purchase", async () => {
      const initBalance = await sliceGenesis.balanceOf(a1)

      const proofA1 = merkleTree2.getHexProof(keccak256(a1))
      const buyerCustomDataA1 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA1]
      )

      await productsModule.payProducts(a1, [
        {
          slicerId,
          productId: 3,
          quantity: 1,
          currency: ethers.constants.AddressZero,
          buyerCustomData: buyerCustomDataA1,
        },
      ])

      const finalBalance = await sliceGenesis.balanceOf(a1)

      expect(finalBalance.sub(initBalance)).to.be.equal(1)
    })

    it("Product #4 - Anyone can purchase when product with no allowlist is created", async () => {
      const initBalance = await sliceGenesis.balanceOf(a4)

      await productsModule.payProducts(
        a4,
        [
          {
            slicerId,
            productId: 4,
            quantity: 2,
            currency: ethers.constants.AddressZero,
            buyerCustomData: [],
          },
        ],
        { value: ethers.utils.parseEther("0.2") }
      )

      const finalBalance = await sliceGenesis.balanceOf(a4)

      expect(finalBalance.sub(initBalance)).to.be.equal(2)
    })
  })

  describe("tokenURI", () => {
    it("Returns tempURI if baseURI is not set", async () => {
      await sliceGenesis._setBaseURI("")
      expect(await sliceGenesis.tokenURI(1)).to.be.equal("temp")
    })

    it("Returns concatenated URI if baseURI is set", async () => {
      await sliceGenesis._setBaseURI("base/")
      expect(await sliceGenesis.tokenURI(1)).to.be.equal("base/1")
    })
  })

  describe("setMerkleRoot", () => {
    it("Owner can set Merkle root for new allowlist", async () => {
      const bytes32String = ethers.utils.formatBytes32String("asd")
      await expect(sliceGenesis._setMerkleRoot(4, bytes32String)).to.not.be
        .reverted
    })
  })

  describe("royaltyInfo", () => {
    it("Returns slicer address and 10% royalty (ERC2981)", async () => {
      const [receiver, royaltyAmount] = await sliceGenesis.royaltyInfo(1, 100)
      expect(receiver).to.be.equal(slicerAddr)
      expect(royaltyAmount).to.be.equal(10)
    })
  })

  describe("onlyOwner", () => {
    it("Only contract owner can set URI and Merkle root for new allowlists", async () => {
      const bytes32String = ethers.utils.formatBytes32String("asd")
      await expect(sliceGenesis.connect(addr1)._setMerkleRoot(5, bytes32String))
        .to.be.reverted
      await expect(sliceGenesis.connect(addr1)._setBaseURI("asd")).to.be
        .reverted
      await expect(sliceGenesis.connect(addr1)._setTempURI("asd")).to.be
        .reverted
    })
  })

  describe("Reverts", () => {
    it("onProductPurchase (#1) - Not in allowlist", async () => {
      const proofA4 = merkleTree1.getHexProof(keccak256(a4))
      const buyerCustomDataA4 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA4]
      )

      await expect(
        productsModule.payProducts(a4, [
          {
            slicerId,
            productId: 1,
            quantity: 1,
            currency: ethers.constants.AddressZero,
            buyerCustomData: buyerCustomDataA4,
          },
        ])
      ).to.be.reverted
    })

    it("onProductPurchase (#1) - Wrong proof", async () => {
      const proofA1 = merkleTree1.getHexProof(keccak256(a1))
      const buyerCustomDataA1 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA1]
      )

      await expect(
        productsModule.payProducts(a2, [
          {
            slicerId,
            productId: 1,
            quantity: 1,
            currency: ethers.constants.AddressZero,
            buyerCustomData: buyerCustomDataA1,
          },
        ])
      ).to.be.reverted
    })

    it("onProductPurchase (#2) - Not enough SLX (single purchase)", async () => {
      await expect(
        productsModule.payProducts(a2, [
          {
            slicerId,
            productId: 2,
            quantity: 4,
            currency: ethers.constants.AddressZero,
            buyerCustomData: [],
          },
        ])
      ).to.be.reverted
    })

    it("onProductPurchase (#2) - Not enough SLX (multiple purchases)", async () => {
      await productsModule.payProducts(a2, [
        {
          slicerId,
          productId: 2,
          quantity: 1,
          currency: ethers.constants.AddressZero,
          buyerCustomData: [],
        },
      ])
      await expect(
        productsModule.payProducts(a2, [
          {
            slicerId,
            productId: 3,
            quantity: 3,
            currency: ethers.constants.AddressZero,
            buyerCustomData: [],
          },
        ])
      ).to.be.reverted
    })

    it("Max supply reached", async () => {
      const proofA1 = merkleTree2.getHexProof(keccak256(a1))
      const buyerCustomDataA1 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA1]
      )
      const maxSupply = 6969
      const totalSupply = await sliceGenesis.totalSupply()

      await expect(
        productsModule.payProducts(a1, [
          {
            slicerId,
            productId: 3,
            quantity: maxSupply - Number(totalSupply) + 1,
            currency: ethers.constants.AddressZero,
            buyerCustomData: buyerCustomDataA1,
          },
        ])
      ).to.be.reverted
    })
  })
})

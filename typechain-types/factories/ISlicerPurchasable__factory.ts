/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  ISlicerPurchasable,
  ISlicerPurchasableInterface,
} from "../ISlicerPurchasable";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "slicerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "slicerCustomData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "buyerCustomData",
        type: "bytes",
      },
    ],
    name: "isPurchaseAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onProductPurchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export class ISlicerPurchasable__factory {
  static readonly abi = _abi;
  static createInterface(): ISlicerPurchasableInterface {
    return new utils.Interface(_abi) as ISlicerPurchasableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISlicerPurchasable {
    return new Contract(address, _abi, signerOrProvider) as ISlicerPurchasable;
  }
}

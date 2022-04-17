/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  SlicerPurchasablePayable,
  SlicerPurchasablePayableInterface,
} from "../SlicerPurchasablePayable";

const _abi = [
  {
    inputs: [],
    name: "NotAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "NotPurchase",
    type: "error",
  },
  {
    inputs: [],
    name: "NotSuccessful",
    type: "error",
  },
  {
    inputs: [],
    name: "WrongSlicer",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
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
  {
    inputs: [],
    name: "releaseToCollector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class SlicerPurchasablePayable__factory {
  static readonly abi = _abi;
  static createInterface(): SlicerPurchasablePayableInterface {
    return new utils.Interface(_abi) as SlicerPurchasablePayableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SlicerPurchasablePayable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as SlicerPurchasablePayable;
  }
}

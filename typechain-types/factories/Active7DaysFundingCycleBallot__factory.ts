/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Active7DaysFundingCycleBallot,
  Active7DaysFundingCycleBallotInterface,
} from "../Active7DaysFundingCycleBallot";

const _abi = [
  {
    inputs: [],
    name: "duration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "reconfigurationDelay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
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
        name: "_configured",
        type: "uint256",
      },
    ],
    name: "state",
    outputs: [
      {
        internalType: "enum BallotState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610158806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806304f49616146100465780630fb5a6b4146100635780634d393dc91461006c575b600080fd5b61005062093a8081565b6040519081526020015b60405180910390f35b62093a80610050565b61007f61007a3660046100b2565b61008c565b60405161005a91906100d4565b600061009b62093a80836100fc565b42116100a85760016100ab565b60005b9392505050565b600080604083850312156100c557600080fd5b50508035926020909101359150565b60208101600483106100f657634e487b7160e01b600052602160045260246000fd5b91905290565b6000821982111561011d57634e487b7160e01b600052601160045260246000fd5b50019056fea2646970667358221220c8fa20e626899d33c68c63db6726f4544859842a919ad01d5256ddb514f4b9f964736f6c634300080d0033";

type Active7DaysFundingCycleBallotConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Active7DaysFundingCycleBallotConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Active7DaysFundingCycleBallot__factory extends ContractFactory {
  constructor(...args: Active7DaysFundingCycleBallotConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Active7DaysFundingCycleBallot";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Active7DaysFundingCycleBallot> {
    return super.deploy(
      overrides || {}
    ) as Promise<Active7DaysFundingCycleBallot>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Active7DaysFundingCycleBallot {
    return super.attach(address) as Active7DaysFundingCycleBallot;
  }
  connect(signer: Signer): Active7DaysFundingCycleBallot__factory {
    return super.connect(signer) as Active7DaysFundingCycleBallot__factory;
  }
  static readonly contractName: "Active7DaysFundingCycleBallot";
  public readonly contractName: "Active7DaysFundingCycleBallot";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Active7DaysFundingCycleBallotInterface {
    return new utils.Interface(_abi) as Active7DaysFundingCycleBallotInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Active7DaysFundingCycleBallot {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as Active7DaysFundingCycleBallot;
  }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ExampleFailingFundingCycleBallot,
  ExampleFailingFundingCycleBallotInterface,
} from "../ExampleFailingFundingCycleBallot";

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
  "0x608060405234801561001057600080fd5b50610185806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806304f49616146100465780630fb5a6b4146100635780634d393dc91461006c575b600080fd5b6100506212750081565b6040519081526020015b60405180910390f35b62127500610050565b61007f61007a3660046100bd565b61008c565b60405161005a91906100df565b600061009c600262127500610107565b6100a69083610129565b42116100b35760016100b6565b60025b9392505050565b600080604083850312156100d057600080fd5b50508035926020909101359150565b602081016004831061010157634e487b7160e01b600052602160045260246000fd5b91905290565b60008261012457634e487b7160e01b600052601260045260246000fd5b500490565b6000821982111561014a57634e487b7160e01b600052601160045260246000fd5b50019056fea26469706673582212207e05aaf0c7fd08c7019ee475e57e933c0cc81a56588a9fe39e8cf09803fd07ba64736f6c634300080d0033";

type ExampleFailingFundingCycleBallotConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ExampleFailingFundingCycleBallotConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ExampleFailingFundingCycleBallot__factory extends ContractFactory {
  constructor(...args: ExampleFailingFundingCycleBallotConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ExampleFailingFundingCycleBallot";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ExampleFailingFundingCycleBallot> {
    return super.deploy(
      overrides || {}
    ) as Promise<ExampleFailingFundingCycleBallot>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ExampleFailingFundingCycleBallot {
    return super.attach(address) as ExampleFailingFundingCycleBallot;
  }
  connect(signer: Signer): ExampleFailingFundingCycleBallot__factory {
    return super.connect(signer) as ExampleFailingFundingCycleBallot__factory;
  }
  static readonly contractName: "ExampleFailingFundingCycleBallot";
  public readonly contractName: "ExampleFailingFundingCycleBallot";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ExampleFailingFundingCycleBallotInterface {
    return new utils.Interface(
      _abi
    ) as ExampleFailingFundingCycleBallotInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ExampleFailingFundingCycleBallot {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ExampleFailingFundingCycleBallot;
  }
}
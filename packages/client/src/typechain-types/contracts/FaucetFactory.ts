/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface FaucetFactoryInterface extends utils.Interface {
  functions: {
    "createFaucetToken(string,string,string,uint8,uint256,uint256)": FunctionFragment;
    "faucetCount(address)": FunctionFragment;
    "faucets(address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "createFaucetToken" | "faucetCount" | "faucets"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createFaucetToken",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "faucetCount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "faucets",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "createFaucetToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "faucetCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "faucets", data: BytesLike): Result;

  events: {
    "NewFaucet(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewFaucet"): EventFragment;
}

export interface NewFaucetEventObject {
  faucet: string;
}
export type NewFaucetEvent = TypedEvent<[string], NewFaucetEventObject>;

export type NewFaucetEventFilter = TypedEventFilter<NewFaucetEvent>;

export interface FaucetFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FaucetFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createFaucetToken(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _imageUrl: PromiseOrValue<string>,
      _decimals: PromiseOrValue<BigNumberish>,
      _dropletAmount: PromiseOrValue<BigNumberish>,
      _claimInterval: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    faucetCount(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    faucets(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  createFaucetToken(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _imageUrl: PromiseOrValue<string>,
    _decimals: PromiseOrValue<BigNumberish>,
    _dropletAmount: PromiseOrValue<BigNumberish>,
    _claimInterval: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  faucetCount(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  faucets(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    createFaucetToken(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _imageUrl: PromiseOrValue<string>,
      _decimals: PromiseOrValue<BigNumberish>,
      _dropletAmount: PromiseOrValue<BigNumberish>,
      _claimInterval: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    faucetCount(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    faucets(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "NewFaucet(address)"(faucet?: null): NewFaucetEventFilter;
    NewFaucet(faucet?: null): NewFaucetEventFilter;
  };

  estimateGas: {
    createFaucetToken(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _imageUrl: PromiseOrValue<string>,
      _decimals: PromiseOrValue<BigNumberish>,
      _dropletAmount: PromiseOrValue<BigNumberish>,
      _claimInterval: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    faucetCount(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    faucets(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createFaucetToken(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _imageUrl: PromiseOrValue<string>,
      _decimals: PromiseOrValue<BigNumberish>,
      _dropletAmount: PromiseOrValue<BigNumberish>,
      _claimInterval: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    faucetCount(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    faucets(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
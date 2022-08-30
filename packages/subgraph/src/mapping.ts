import { NewFaucet } from "../generated/FaucetFactory/FaucetFactory"
import { FaucetToken } from "../generated/templates";
import { ClaimDroplet, FaucetToken as FaucetTokenContract } from "../generated/templates/FaucetToken/FaucetToken"
import { Claim, Faucet } from "../generated/schema"

export function handleNewFaucet(event: NewFaucet): void {
  let id = event.params.faucet.toHex();
  let faucet = new Faucet(id);

  faucet.address = event.params.faucet.toHex();
  faucet.owner = event.params.owner.toHex();
  faucet.timestamp = event.block.timestamp.toI32();

  let contract = FaucetTokenContract.bind(event.address);
  faucet.name = contract.name();
  faucet.symbol = contract.symbol();
  faucet.imageUrl = contract.imageUrl();
  faucet.decimals = contract.decimals();
  faucet.dropletSize = contract.dropletAmount();
  faucet.claimInterval = contract.claimInterval().toI32();

  faucet.save();

  FaucetToken.create(event.params.faucet);
}

export function handleClaimDroplet(event: ClaimDroplet): void {
  let id = event.transaction.hash.toHex();
  let claim = new Claim(id);

  claim.amount = event.params.amount;
  claim.faucet = event.address.toHex();
  claim.claimedBy = event.params.from.toHex();
  claim.timestamp = event.block.timestamp.toI32();

  claim.save();
}

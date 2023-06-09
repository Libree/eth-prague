import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { Subscription } from "../generated/TokenizedSub/TokenizedSub"

export function createSubscriptionEvent(
  profileId: BigInt,
  follower: Address,
  amount: BigInt,
  tokenAddress: Address
): Subscription {
  let subscriptionEvent = changetype<Subscription>(newMockEvent())

  subscriptionEvent.parameters = new Array()

  subscriptionEvent.parameters.push(
    new ethereum.EventParam(
      "profileId",
      ethereum.Value.fromUnsignedBigInt(profileId)
    )
  )
  subscriptionEvent.parameters.push(
    new ethereum.EventParam("follower", ethereum.Value.fromAddress(follower))
  )
  subscriptionEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  subscriptionEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )

  return subscriptionEvent
}

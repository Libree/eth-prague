import { Subscription as SubscriptionEvent } from "../generated/TokenizedSub/TokenizedSub"
import { SubscriptionPayment } from "../generated/schema"

export function handleSubscription(event: SubscriptionEvent): void {
  let entity = new SubscriptionPayment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.profileId = event.params.profileId
  entity.follower = event.params.follower
  entity.amount = event.params.amount
  entity.tokenAddress = event.params.tokenAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

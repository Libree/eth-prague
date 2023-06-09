import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { Subscription } from "../generated/schema"
import { Subscription as SubscriptionEvent } from "../generated/TokenizedSub/TokenizedSub"
import { handleSubscription } from "../src/tokenized-sub"
import { createSubscriptionEvent } from "./tokenized-sub-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let profileId = BigInt.fromI32(234)
    let follower = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let tokenAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newSubscriptionEvent = createSubscriptionEvent(
      profileId,
      follower,
      amount,
      tokenAddress
    )
    handleSubscription(newSubscriptionEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Subscription created and stored", () => {
    assert.entityCount("Subscription", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Subscription",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "profileId",
      "234"
    )
    assert.fieldEquals(
      "Subscription",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "follower",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Subscription",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "Subscription",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

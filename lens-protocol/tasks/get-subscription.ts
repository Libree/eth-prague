import '@nomiclabs/hardhat-ethers';
import { task } from 'hardhat/config';
import { defaultAbiCoder } from 'ethers/lib/utils';
import {
  TokenizedSubFollowModule__factory,
} from '../typechain-types';
import { deployContract, waitForTx, ZERO_ADDRESS, ProtocolState } from './helpers/utils';
import { use } from 'chai';

const SUBSCRIPTION_MODULE = '0x358800E79E13EDC3820aB3a98321c7a292f92Ea1';
const USDC_ADDRESS = '0xe9DcE89B076BA6107Bb64EF30678efec11939234'
const LENS_HUB_ADDRESS = '0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5'
const PROFILE_ID = 637

task('get-events', 'deploys the entire Lens Protocol').setAction(async ({ }, hre) => {
  const ethers = hre.ethers;
  const accounts = await ethers.getSigners();
  const user = accounts[0];

  console.log('FROM', user.address)

  const tokenizedSub =  TokenizedSubFollowModule__factory.connect(SUBSCRIPTION_MODULE, user);

  const eventFilter = tokenizedSub.filters.Subscription()
  const events = await tokenizedSub.queryFilter(eventFilter)

  console.log({events})

})
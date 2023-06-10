import '@nomiclabs/hardhat-ethers';
import { task } from 'hardhat/config';
import { defaultAbiCoder } from 'ethers/lib/utils';
import {
  TokenizedSubFollowModule__factory,
  LensHub__factory
} from '../typechain-types';
import { deployContract, waitForTx, ZERO_ADDRESS, ProtocolState } from './helpers/utils';
import { use } from 'chai';

const SUBSCRIPTION_MODULE = '0x358800E79E13EDC3820aB3a98321c7a292f92Ea1';
const USDC_ADDRESS = '0xe9DcE89B076BA6107Bb64EF30678efec11939234'
const LENS_HUB_ADDRESS = '0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5'
const PROFILE_ID = 641

task('pay-subsciption', 'deploys the entire Lens Protocol').setAction(async ({ }, hre) => {
  const ethers = hre.ethers;
  const accounts = await ethers.getSigners();
  const user = accounts[0];

  console.log('FROM', user.address)

  const lensHub = LensHub__factory.connect(LENS_HUB_ADDRESS, user);

  const usdc = await ethers.getContractAt("IERC20", USDC_ADDRESS)
  await usdc.connect(user).approve(SUBSCRIPTION_MODULE, '10000000000')
  await usdc.connect(user).approve("0x358800e79e13edc3820ab3a98321c7a292f92ea1", '10000000000')

  const data = defaultAbiCoder.encode(
    ['uint256'],
    ['1000000']
  );

  console.log(data)

  await lensHub.connect(user).follow([PROFILE_ID], [data])
  // const followModuleAddress = await lensHub.getFollowModule(PROFILE_ID);

  // console.log('Subscription Module', SUBSCRIPTION_MODULE)
  // console.log('followModuleAddress', followModuleAddress)

})
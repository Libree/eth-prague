import '@nomiclabs/hardhat-ethers';
import { task } from 'hardhat/config';
import { defaultAbiCoder } from 'ethers/lib/utils';
import {
  TokenizedSubFollowModule__factory,
  LensHub__factory
} from '../typechain-types';
import { deployContract, waitForTx, ZERO_ADDRESS, ProtocolState } from './helpers/utils';
import { use } from 'chai';

const SUBSCRIPTION_MODULE = '0x34AF6976a383B470831fD436036acA2f7AA811d3';
const USDC_ADDRESS = '0xe9DcE89B076BA6107Bb64EF30678efec11939234'
const LENS_HUB_ADDRESS = '0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5'
const PROFILE_ID = 636

task('initialize-subsciption', 'deploys the entire Lens Protocol').setAction(async ({ }, hre) => {
  const ethers = hre.ethers;
  const accounts = await ethers.getSigners();
  // const deployer = accounts[0];
  // const governance = accounts[1];
  const user = accounts[0];

  console.log('FROM', user.address)

  const lensHub = LensHub__factory.connect(LENS_HUB_ADDRESS, user);

  const data = defaultAbiCoder.encode(
    ['uint256', 'string', 'string', 'address', 'uint256', 'address'],
    ['1000000', 'Womeinthech', 'WOTECH', user.address, '10000000', USDC_ADDRESS]
  );

  // await lensHub.whitelistFollowModule(SUBSCRIPTION_MODULE, true);
  // await waitForTx(lensHub.setState(ProtocolState.Unpaused));
  // await waitForTx(lensHub.whitelistProfileCreator(user.address, true));

  // const inputStruct = {
  //   to: user.address,
  //   handle: 'zer0dotw3',
  //   imageURI:
  //     'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
  //   followModule: ZERO_ADDRESS,
  //   followModuleInitData: [],
  //   followNFTURI:
  //     'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
      
  // };
  // await waitForTx(lensHub.connect(user).createProfile(inputStruct));

  await lensHub.connect(user).setFollowModule(PROFILE_ID, SUBSCRIPTION_MODULE, data)
  const followModuleAddress = await lensHub.getFollowModule(PROFILE_ID);

  console.log('Subscription Module', SUBSCRIPTION_MODULE)
  console.log('followModuleAddress', followModuleAddress)

})
import '@nomiclabs/hardhat-ethers';
import { task } from 'hardhat/config';
import { defaultAbiCoder } from 'ethers/lib/utils';
import {
  TokenizedSubFollowModule__factory,
  LensHub__factory,
  MockProfileCreationProxy__factory
} from '../typechain-types';
import { deployContract, waitForTx, ZERO_ADDRESS, ProtocolState } from './helpers/utils';

const LENS_HUB_ADDRESS = '0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5'
const MOCK_PROFILE_CREATOR = '0x4fe8deB1cf6068060dE50aA584C3adf00fbDB87f'

task('create-user', 'deploys the entire Lens Protocol').setAction(async ({ }, hre) => {
  const ethers = hre.ethers;
  const accounts = await ethers.getSigners();
  const user = accounts[0];

  const lensHub = MockProfileCreationProxy__factory.connect(MOCK_PROFILE_CREATOR, user);

  const inputStruct = {
    to: user.address,
    handle: 'teretete',
    imageURI:
      'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
    followModule: ZERO_ADDRESS,
    followModuleInitData: [],
    followNFTURI:
      'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
  };
  await waitForTx(lensHub.connect(user).proxyCreateProfile(inputStruct));

})
import '@nomiclabs/hardhat-ethers';
import { task } from 'hardhat/config';
import {
  TokenizedSubFollowModule__factory,
} from '../typechain-types';
import { deployContract } from './helpers/utils';

const LENS_HUB_ADDRESS = '0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5'; // Sandbox
// const LENS_HUB_ADDRESS = '0x1A1FEe7EeD918BD762173e4dc5EfDB8a78C924A8';

task('subsciption-module-deploy', 'deploys the entire Lens Protocol').setAction(async ({}, hre) => {
  const ethers = hre.ethers;
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];

  console.log('\n\t-- Deploying tokenizedSubFollowModule --');
  const tokenizedSubFollowModule = await deployContract(
    new TokenizedSubFollowModule__factory(deployer).deploy(LENS_HUB_ADDRESS)
  );

  console.log(`\n\t-- Subscription module deployed at ${tokenizedSubFollowModule.address} --`);

})
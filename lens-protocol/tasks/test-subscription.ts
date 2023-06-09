import { defaultAbiCoder } from 'ethers/lib/utils';
import { task } from 'hardhat/config';
import {
    LensHub__factory,
    TokenizedSubFollowModule__factory,
    TokenizedSub__factory,
    ERC20__factory
} from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import {
    waitForTx,
    initEnv,
    getAddrs,
    ProtocolState,
    ZERO_ADDRESS,
    deployContract,
} from './helpers/utils';

task('test-subscription', 'tests the TokenizedSubFollowModule').setAction(async ({ }, hre) => {
    const [governance, , user, follower] = await initEnv(hre);
    const addrs = getAddrs();
    const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

    await waitForTx(lensHub.setState(ProtocolState.Unpaused));
    await waitForTx(lensHub.whitelistProfileCreator(user.address, true));

    const inputStruct: CreateProfileDataStruct = {
        to: user.address,
        handle: 'zer0dotw4',
        imageURI:
            'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
        followModule: ZERO_ADDRESS,
        followModuleInitData: [],
        followNFTURI:
            'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
    };
    await waitForTx(lensHub.connect(user).createProfile(inputStruct));

    const tokenizedSubFollowModule = await deployContract(
        new TokenizedSubFollowModule__factory(governance).deploy(lensHub.address)
    );

    await waitForTx(lensHub.whitelistFollowModule(tokenizedSubFollowModule.address, true));

    const tokenPayment = await deployContract(
        new TokenizedSub__factory(governance).deploy(
            10000,
            'USDC test',
            'USDCT',
            governance.address,
            user.address
        )
    )

    await tokenPayment.connect(governance).transfer(follower.address, 1000)

    const data = defaultAbiCoder.encode(
        ['uint256', 'string', 'string', 'address', 'uint256', 'address'],
        ['10000000', 'Token', 'mytoken', user.address, '1000', tokenPayment.address]
    );
    await waitForTx(lensHub.connect(user).setFollowModule(1, tokenizedSubFollowModule.address, data));

    await tokenPayment.connect(follower).approve(tokenizedSubFollowModule.address, 1000)

    const dataFollow = defaultAbiCoder.encode(
        ['address', 'uint256'],
        [follower.address, 1]
      );

    const tx = lensHub.connect(follower).follow([1], [dataFollow]);
    const receipt = await waitForTx(tx);

    console.log(receipt)
});
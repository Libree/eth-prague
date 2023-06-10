import React, { useState } from 'react';
import { User } from '.';
import { ethers } from 'ethers';

import {
    CreateProfileRequest,
    LensClient,
    development,
    isRelayerResult,
    PublicationSortCriteria,
} from '@lens-protocol/client';

import { defaultAbiCoder } from 'ethers/lib/utils';

import { LensHub__factory } from '../lib/typechain/LensHub__factory'

declare global {
    interface Window {
        ethereum: any;
    }
}

interface UserProviderProps {
    children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
    const LENS_HUB_ADDRESS = '0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5'
    const SUBSCRIPTION_MODULE = '0x34AF6976a383B470831fD436036acA2f7AA811d3';
    const PAYMENT_TOKEN = '0xe9DcE89B076BA6107Bb64EF30678efec11939234'
    const PROFILE_ID = 635
    const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState(false);
    const [address, setAddress] = useState<string>('');
    const [provider, setProvider] = useState<any>(undefined);
    const [lensClient, setLensClient] = useState<any>(undefined);
    const [selectedTestUser, setSelectedTestUser] = useState({ id: '', handle: '' });
    const [reload, setReload] = useState<boolean>(false);
    const [signer, setSigner] = useState<any>(null);


    const loginLens = async () => {
        const lensClient = new LensClient({ environment: development });
        setLensClient(lensClient);

        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        const challenge = await lensClient.authentication.generateChallenge(address);
        const signature = await signer.signMessage(challenge);

        await lensClient.authentication.authenticate(address, signature);

        setProvider(provider);
        setAddress(address);
        setSigner(signer);
        const isLoggedResult = await lensClient.authentication.isAuthenticated();
        setIsLogged(isLoggedResult);
        setOpenAlertModal(false);
    };

    const checkIsLogged = async () => {
        const isLogged = await lensClient.authentication.isAuthenticated();
        setIsLogged(isLogged);
    };


    const searchProfiles = async (search: string) => {
        const result = await lensClient.search.profiles({
            query: search,
            limit: 10,
        });
        return result.items;
    };

    const explorePublications = async () => {
        const result = await lensClient.explore.publications({
            sortCriteria: PublicationSortCriteria.CuratedProfiles,
        });
        return result;
    };

    const handleSelectTestUser = (id?: string, handle?: string) => {
        if (selectedTestUser.id === id) {
            setSelectedTestUser({ id: '', handle: '' });
        } else {
            setSelectedTestUser({ id, handle });
        }
    };

    const createTestProfile = async (value: CreateProfileRequest) => {
        const profileResult = await lensClient.profile.create(value);
        const profileResultValue = profileResult.unwrap();

        if (!isRelayerResult(profileResultValue)) {
            console.log('Something went wrong', profileResultValue);
            return;
        }

        console.log('Tx was successfuly broadcasted with txId', profileResultValue.txId);
        setReload(!reload);
    };

    const getProfileByHandle = async (handle: string) => {
        console.log({ handle })
        const profileDetails = await lensClient.profile.fetch({
            handle,
        })
        return profileDetails;
    };

    const waitForTx = async (tx: any) => {
        const receipt = await provider.waitForTransaction(tx.hash);
        return receipt;
    };

    const createSubscription = async (inputData: any) => {

        const lensHub = LensHub__factory.connect(LENS_HUB_ADDRESS, signer);
        const data = defaultAbiCoder.encode(
            ['uint256', 'string', 'string', 'address', 'uint256', 'address'],
            ['10000000', 'Token', inputData.name, address, '10000000', PAYMENT_TOKEN]
        );

        await waitForTx(await (lensHub.connect(signer).setFollowModule(PROFILE_ID, SUBSCRIPTION_MODULE, data)));
    };


    return (
        <User.Provider
            value={{
                openAlertModal,
                setOpenAlertModal,
                reload: false,
                isLogged,
                address,
                loginLens,
                checkIsLogged,
                getProfileByHandle,
                getRecommendedProfiles: () => { },
                searchProfiles,
                getProfileFeed: () => { },
                explorePublications,
                selectedTestUser,
                handleSelectTestUser,
                createSubscription
            }}
        >
            {children}
        </User.Provider >
    )
};

export default UserProvider;

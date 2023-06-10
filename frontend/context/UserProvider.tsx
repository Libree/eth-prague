import React, { useState } from 'react';
import { User } from '.';
import {
    LensClient,
    development,
    PublicationSortCriteria,
} from '@lens-protocol/client';

declare global {
    interface Window {
        ethereum: any;
    }
}

interface UserProviderProps {
    children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
    const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState(false);
    const [address, setAddress] = useState<string>('');
    const [provider, setProvider] = useState<any>(undefined);
    const [lensClient, setLensClient] = useState<any>(undefined);
    const [selectedTestUser, setSelectedTestUser] = useState({ id: '', handle: '' });


    const loginLens = async () => {
        const lensClient = new LensClient({ environment: development });
        setLensClient(lensClient);

        const signer = provider.getSigner();
        const address = await signer.getAddress();

        const challenge = await lensClient.authentication.generateChallenge(address);
        const signature = await signer.signMessage(challenge);

        await lensClient.authentication.authenticate(address, signature);

        setProvider(provider);
        setAddress(address);
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
                getProfileByHandle: () => { },
                getRecommendedProfiles: () => { },
                searchProfiles,
                getProfileFeed: () => { },
                explorePublications,
                selectedTestUser,
                handleSelectTestUser,
            }}
        >
            {children}
        </User.Provider >
    )
};

export default UserProvider;

import { Dispatch, SetStateAction, createContext } from 'react';

interface IUserContext {
    openAlertModal: boolean;
    setOpenAlertModal: Dispatch<SetStateAction<boolean>>;
    reload: boolean;
    isLogged: boolean;
    address: string;
    loginLens: () => void;
    checkIsLogged: () => void;
    getProfileByHandle: (handle: string) => void;
    getRecommendedProfiles: () => any;
    searchProfiles: (search: string) => any;
    getProfileFeed: (profileId: string) => any;
    explorePublications: () => void;
}

export const User = createContext<IUserContext>({
    openAlertModal: false,
    setOpenAlertModal: () => {},
    reload: false,
    isLogged: false,
    address: '',
    loginLens: () => {},
    checkIsLogged: () => {},
    getProfileByHandle: () => {},
    getRecommendedProfiles: () => {},
    searchProfiles: () => {},
    getProfileFeed: () => {},
    explorePublications: () => {},
});

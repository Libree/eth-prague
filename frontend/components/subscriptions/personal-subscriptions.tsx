import { Button, Input, Text } from '@nextui-org/react';
import Link from 'next/link';
import React, { useState, useContext, useEffect} from 'react';
import { Breadcrumbs, Crumb, CrumbLink } from '../breadcrumb/breadcrumb.styled';
import { DotsIcon } from '../icons/accounts/dots-icon';
import { InfoIcon } from '../icons/accounts/info-icon';
import { HouseIcon } from '../icons/breadcrumb/house-icon';
import { UsersIcon } from '../icons/breadcrumb/users-icon';
import { Flex } from '../styles/flex';
import { SubsTableWrapper } from './table';
import {SubscriptionModal} from '../modals/create-subscription';
import { LoginToContinueModal } from '../modals/login-to-continue';
import { User } from '../../context';


export const PersonalSubscriptions = () => {
    const { isLogged, setOpenAlertModal } = useContext(User);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        !isLogged && setOpenAlertModal(true);
    }, [isLogged])

    return (
        <Flex
            css={{
                'mt': '$5',
                'px': '$6',
                '@sm': {
                    mt: '$10',
                    px: '$16',
                },
            }}
            justify={'center'}
            direction={'column'}
        >
            <Breadcrumbs>
                <Crumb>
                    <HouseIcon />
                    <Link href={'/'}>
                        <CrumbLink href="#">Home</CrumbLink>
                    </Link>
                    <Text>/</Text>
                </Crumb>

                <Crumb>
                    <UsersIcon />
                    <CrumbLink href="#">Test-Users</CrumbLink>
                    <Text>/</Text>
                </Crumb>
                <Crumb>
                    <CrumbLink href="#">List</CrumbLink>
                </Crumb>
            </Breadcrumbs>

            <Text h3>My Subscriptions</Text>
            <Flex
                css={{ gap: '$8' }}
                align={'center'}
                justify={'between'}
                wrap={'wrap'}
            >
                <Flex
                    css={{
                        'gap': '$6',
                        'flexWrap': 'wrap',
                        '@sm': { flexWrap: 'nowrap' },
                    }}
                    align={'center'}
                >
                    <Input
                        css={{ width: '100%', maxW: '410px' }}
                        placeholder="Search subs"
                    />
                    <InfoIcon />
                    <DotsIcon />
                </Flex>
                <Flex css={{ gap: '$6' }} align={'center'}>
                    {isLogged ? (
                        <Button auto color={'gradient'} onPress={() => setOpenModal(true)}>Create subscription</Button>
                    ) : (
                        <Text h5 color={'gray'}>Please log in</Text>
                    )}
                </Flex>
            </Flex>

            {isLogged ? (
                <SubsTableWrapper />
            ) : (
                <Flex
                    css={{
                        'mt': '$5',
                        'px': '$6',
                        '@sm': {
                            mt: '$10',
                            px: '$16',
                        },
                    }}
                    justify={'center'}
                    direction={'column'}
                    align={'center'}
                >
                    <Text h4 color={'gray'} css={{ margin: '3rem 0' }}>Please log in</Text>
                </Flex>
            )}

            <SubscriptionModal
                openModal={openModal}
                closeHandler={() => setOpenModal(false)}
            />

            <LoginToContinueModal />

        </Flex>
    );
};

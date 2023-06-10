import React from 'react';
import { Avatar, Card, Text } from '@nextui-org/react';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';
import Image from 'next/image';
import {useRouter} from 'next/router';
import { formatAddress, timeSinceCreated } from '../../utils';

interface Props {
    data: any;
}

export default function CardPost({ data }: Props) {
    const router = useRouter();
    const goToProfileDetails = () => router.push(`/profile/${data.profile.handle}`);

    return (
        <>
            <Card
                css={{
                    bg: '$blue100',
                    borderRadius: '$xl',
                    px: '$6',
                }}
            >
                <Card.Body css={{ py: '$10' }}>
                    <Flex css={{ gap: '$6' }} justify={'between'} align={'center'}>
                        <Flex
                            css={{ gap: '$5', display: 'flex', alignItems: 'center' }}
                            style={{ cursor: 'pointer' }}
                            onClick={goToProfileDetails}
                        >
                            <Avatar 
                                squared
                                src={data.profile.picture?.original.url || ''}
                                width={50}
                                height={50}
                            />
                            <Flex direction={'column'}>
                                <Text span>
                                    {data.profile.name || formatAddress(data.profile.ownedBy)}
                                </Text>
                                <Text span size={'$xs'} css={{ color: 'gray' }}>
                                    {data.profile.handle}
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex css={{ display: 'flex', flexDirection: 'row-reverse', minWidth: '6rem' }}>
                            <Text span size={'$sm'} css={{ color: 'gray' }}>
                                {timeSinceCreated(data.createdAt)}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex css={{ gap: '$6', py: '$4' }} align={'center'}>
                        <Text
                            span
                            size={'$xl'}
                            weight={'semibold'}
                        >
                            {data.metadata.content}
                        </Text>
                    </Flex>
                    <Flex css={{ gap: '$12' }} align={'center'}>
                        <Box>
                            <Text
                                span
                                size={'$xs'}
                                css={{ color: '$green600' }}
                                weight={'semibold'}
                            >
                                {'↓'}
                            </Text>
                            <Text span size={'$xs'}>
                                Commented:
                            </Text>
                            &nbsp;
                            <Text span size={'$xs'}>
                                {data.stats.totalAmountOfComments}
                            </Text>
                        </Box>
                        <Box>
                            <Text
                                span
                                size={'$xs'}
                                css={{ color: '$red600' }}
                                weight={'semibold'}
                            >
                                {'↑'}
                            </Text>
                            <Text span size={'$xs'}>
                                Mirrored:
                            </Text>
                            &nbsp;
                            <Text span size={'$xs'}>
                                {data.stats.totalAmountOfMirrors}
                            </Text>
                        </Box>
                        <Box>
                            <Text
                                span
                                size={'$xs'}
                                css={{ color: '$green600' }}
                                weight={'semibold'}
                            >
                                {'⭐'}
                            </Text>
                            <Text span size={'$xs'}>
                                Collected:
                            </Text>
                            &nbsp;
                            <Text span size={'$xs'}>
                                {data.stats.totalAmountOfCollects}
                            </Text>
                        </Box>
                    </Flex>
                </Card.Body>
            </Card>
        </>
    )
}

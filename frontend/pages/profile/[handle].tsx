import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { User } from "../../context";
import { Avatar, Button, Container, Divider, Image, Text, Loading, Tooltip } from "@nextui-org/react";
import { formatAddress } from "../../utils";
import { Box } from "../../components/styles/box";
import { Skeleton } from "@mui/material";
import { LoginToContinueModal } from "../../components/modals/login-to-continue";

export default function Profile() {
    const router = useRouter();
    const { handle } = router.query;
    const { isLogged, handleFollow, getProfileByHandle, setOpenAlertModal, selectedTestUser } = useContext(User);
    const [profile, setProfile] = useState<any>();
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        if (handle) {
            console.log('handle',handle)
            const result = await getProfileByHandle(handle as string);
            console.log('profile:')
            console.log(result)
            setProfile(result);
            setLoading(false);
        }
    };

    const followProfile = async () => {
        isLogged && handleFollow(profile.id);
        getData();
    }

    useEffect(() => {
        isLogged ? getData() : setOpenAlertModal(true);
    }, [isLogged, handle])

    return (
        <>
            <Container css={{ padding: '0' }}>

            </Container>
            <Container
                css={{
                    margin: '1rem auto',
                    '@md': { width: '80%' },
                }}
            >
                <Avatar
                    squared
                    src={!loading ? profile.picture?.original.url : ''}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    css={{
                        width: '10rem',
                        height: '10rem',
                    }}
                />
                <Box css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        {loading ? (
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        ) : (
                            <Text h2>{profile.name}</Text>
                        )}
                        <Text css={{ fontWeight: 'bold', color: '$blue500' }}>
                            {!loading && formatAddress(profile.ownedBy)}
                        </Text>
                    </Box>
                    {
                        <Button auto onPress={followProfile}>
                            {loading ? (
                                <Loading type="spinner" size="sm" color="secondary" css={{ minWidth: '2rem' }} />
                            ) : (
                                profile.isFollowedByMe ? 'Following' : 'Follow'
                            )}
                        </Button>
                    }
                </Box>
                <Divider css={{ margin: '0.5rem 0' }} />
                <Box css={{ margin: '1rem 0' }}>
                    <Text h3>{!loading && profile.name}</Text>
                    <Text>{!loading && profile.bio}</Text>
                </Box>
                <Box css={{ display: 'flex', width: '30%', margin: '2rem 0' }}>
                    <Box css={{ marginRight: '2rem' }}>
                        <Text css={{ fontSize: '$lg' }}>Following</Text>
                        <Text h4>{!loading && profile.stats.totalFollowing}</Text>
                    </Box>
                    <Box>
                        <Text css={{ fontSize: '$lg' }}>Followers</Text>
                        <Text h4>{!loading && profile.stats.totalFollowers}</Text>
                    </Box>
                </Box>
            </Container>

            <LoginToContinueModal />
        </>
    );
}
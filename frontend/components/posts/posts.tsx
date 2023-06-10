import CardPost from "./card-post";
import { useQuery } from "@apollo/client";
import { EXPLORE_PUBLICATIONS } from "../../apollo-config/queries";
import { Grid, Text } from "@nextui-org/react";
import { sortByCreatedAt } from "../../utils";

export default function PostsDisplay() {
    const { loading, error, data } = useQuery(EXPLORE_PUBLICATIONS);

    if (loading) {
        return (
            <Text b color={"gray"} css={{ padding: '0.1rem', marginTop: '3rem' }}>
                Loading...
            </Text>
        );
    }
    if (error) return <p>Error : {error.message}</p>;
    const publications = data?.explorePublications.items;
    const publicationsSorted = sortByCreatedAt(publications.slice())

    return (
        <>
            <Grid.Container gap={2} style={{ alignItems: 'center', justifyContent: 'center' }}>
                {publicationsSorted.map((item: any) => (
                    <Grid xs={12} md={12} lg={10} key={item.id}>
                        <CardPost data={item} />
                    </Grid>
                ))}
            </Grid.Container>
        </>
    )
}

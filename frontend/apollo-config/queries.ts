import { gql } from "@apollo/client";

export const GET_PUBLICATIONS = gql`
    query Publications {
        publications(request: {
        profileId: "0x01",
        publicationTypes: [POST],
        limit: 20
        }) {
        items {
            __typename 
            ... on Post {
            ...PostFields
            }
            ... on Comment {
            ...CommentFields
            }
            ... on Mirror {
            ...MirrorFields
            }
        }
        pageInfo {
            prev
            next
            totalCount
        }
        }
    }
    
    fragment MediaFields on Media {
        url
    }
    
    fragment ProfileFields on Profile {
        id
        name
        bio
        isFollowedByMe
        isFollowing(who: null)
        followNftAddress
        metadata
        isDefault
        handle
        picture {
        ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
        }
        ... on MediaSet {
            original {
            ...MediaFields
            }
        }
        }
        coverPicture {
        ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
        }
        ... on MediaSet {
            original {
            ...MediaFields
            }
        }
        }
        ownedBy
        dispatcher {
        address
        }
        stats {
        totalFollowers
        totalFollowing
        }
        followModule {
        ...FollowModuleFields
        }
    }
    
    fragment PublicationStatsFields on PublicationStats { 
        totalAmountOfMirrors
        totalAmountOfCollects
        totalAmountOfComments
        totalUpvotes
        totalDownvotes
    }
    
    fragment MetadataOutputFields on MetadataOutput {
        name
        description
        content
        media {
        original {
            ...MediaFields
        }
        }
        attributes {
        displayType
        traitType
        value
        }
    }
    
    fragment Erc20Fields on Erc20 {
        name
        symbol
        decimals
        address
    }
    
    fragment PostFields on Post {
        id
        profile {
        ...ProfileFields
        }
        stats {
        ...PublicationStatsFields
        }
        metadata {
        ...MetadataOutputFields
        }
        createdAt
        collectModule {
        ...CollectModuleFields
        }
        referenceModule {
        ...ReferenceModuleFields
        }
        appId
        hidden
        reaction(request: null)
        mirrors(by: null)
        hasCollectedByMe
    }
    
    fragment MirrorBaseFields on Mirror {
        id
        profile {
        ...ProfileFields
        }
        stats {
        ...PublicationStatsFields
        }
        metadata {
        ...MetadataOutputFields
        }
        createdAt
        collectModule {
        ...CollectModuleFields
        }
        referenceModule {
        ...ReferenceModuleFields
        }
        appId
        hidden
        reaction(request: null)
        hasCollectedByMe
    }
    
    fragment MirrorFields on Mirror {
        ...MirrorBaseFields
        mirrorOf {
        ... on Post {
            ...PostFields          
        }
        ... on Comment {
            ...CommentFields          
        }
        }
    }
    
    fragment CommentBaseFields on Comment {
        id
        profile {
        ...ProfileFields
        }
        stats {
        ...PublicationStatsFields
        }
        metadata {
        ...MetadataOutputFields
        }
        createdAt
        collectModule {
        ...CollectModuleFields
        }
        referenceModule {
        ...ReferenceModuleFields
        }
        appId
        hidden
        reaction(request: null)
        mirrors(by: null)
        hasCollectedByMe
    }
    
    fragment CommentFields on Comment {
        ...CommentBaseFields
        mainPost {
        ... on Post {
            ...PostFields
        }
        ... on Mirror {
            ...MirrorBaseFields
            mirrorOf {
            ... on Post {
                ...PostFields          
            }
            ... on Comment {
                ...CommentMirrorOfFields        
            }
            }
        }
        }
    }
    
    fragment CommentMirrorOfFields on Comment {
        ...CommentBaseFields
        mainPost {
        ... on Post {
            ...PostFields
        }
        ... on Mirror {
            ...MirrorBaseFields
        }
        }
    }
    
    fragment FollowModuleFields on FollowModule {
        ... on FeeFollowModuleSettings {
        type
        amount {
            asset {
            name
            symbol
            decimals
            address
            }
            value
        }
        recipient
        }
        ... on ProfileFollowModuleSettings {
        type
        contractAddress
        }
        ... on RevertFollowModuleSettings {
        type
        contractAddress
        }
        ... on UnknownFollowModuleSettings {
        type
        contractAddress
        followModuleReturnData
        }
    }
    
    fragment CollectModuleFields on CollectModule {
        __typename
        ... on FreeCollectModuleSettings {
        type
        followerOnly
        contractAddress
        }
        ... on FeeCollectModuleSettings {
        type
        amount {
            asset {
            ...Erc20Fields
            }
            value
        }
        recipient
        referralFee
        }
        ... on LimitedFeeCollectModuleSettings {
        type
        collectLimit
        amount {
            asset {
            ...Erc20Fields
            }
            value
        }
        recipient
        referralFee
        }
        ... on LimitedTimedFeeCollectModuleSettings {
        type
        collectLimit
        amount {
            asset {
            ...Erc20Fields
            }
            value
        }
        recipient
        referralFee
        endTimestamp
        }
        ... on RevertCollectModuleSettings {
        type
        }
        ... on TimedFeeCollectModuleSettings {
        type
        amount {
            asset {
            ...Erc20Fields
            }
            value
        }
        recipient
        referralFee
        endTimestamp
        }
        ... on UnknownCollectModuleSettings {
        type
        contractAddress
        collectModuleReturnData
        }
    }
    
    fragment ReferenceModuleFields on ReferenceModule {
        ... on FollowOnlyReferenceModuleSettings {
        type
        contractAddress
        }
        ... on UnknownReferenceModuleSettings {
        type
        contractAddress
        referenceModuleReturnData
        }
        ... on DegreesOfSeparationReferenceModuleSettings {
        type
        contractAddress
        commentsRestricted
        mirrorsRestricted
        degreesOfSeparation
        }
    }
`;

export const EXPLORE_PUBLICATIONS = gql`
    query ExplorePublications {
        explorePublications(request: {
        sortCriteria: CURATED_PROFILES,
        publicationTypes: [POST],
        limit: 10
        }) {
        items {
            __typename 
            ... on Post {
            ...PostFields
            }
            ... on Comment {
            ...CommentFields
            }
            ... on Mirror {
            ...MirrorFields
            }
        }
        pageInfo {
            prev
            next
            totalCount
        }
        }
    }
    
    fragment MediaFields on Media {
        url
        width
        height
        mimeType
    }
    
    fragment ProfileFields on Profile {
        id
        name
        bio
        attributes {
        displayType
        traitType
        key
        value
        }
        isFollowedByMe
        isFollowing(who: null)
        followNftAddress
        metadata
        isDefault
        handle
        picture {
        ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
        }
        ... on MediaSet {
            original {
            ...MediaFields
            }
            small {
            ...MediaFields
            }
            medium {
            ...MediaFields
            }
        }
        }
        coverPicture {
        ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
        }
        ... on MediaSet {
            original {
            ...MediaFields
            }
            small {
            ...MediaFields
            }
            medium {
            ...MediaFields
            }
        }
        }
        ownedBy
        dispatcher {
        address
        }
        stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
        }
        followModule {
        ...FollowModuleFields
        }
    }
    
    fragment PublicationStatsFields on PublicationStats { 
        totalAmountOfMirrors
        totalAmountOfCollects
        totalAmountOfComments
    }
    
    fragment MetadataOutputFields on MetadataOutput {
        name
        description
        content
        media {
        original {
            ...MediaFields
        }
        small {
            ...MediaFields
        }
        medium {
            ...MediaFields
        }
        }
        attributes {
        displayType
        traitType
        value
        }
    }
    
    fragment Erc20Fields on Erc20 {
        name
        symbol
        decimals
        address
    }
    
    fragment PostFields on Post {
        id
        profile {
        ...ProfileFields
        }
        stats {
        ...PublicationStatsFields
        }
        metadata {
        ...MetadataOutputFields
        }
        createdAt
        collectModule {
        ...CollectModuleFields
        }
        referenceModule {
        ...ReferenceModuleFields
        }
        appId
        hidden
        reaction(request: null)
        mirrors(by: null)
        hasCollectedByMe
    }
    
    fragment MirrorBaseFields on Mirror {
        id
        profile {
        ...ProfileFields
        }
        stats {
        ...PublicationStatsFields
        }
        metadata {
        ...MetadataOutputFields
        }
        createdAt
        collectModule {
        ...CollectModuleFields
        }
        referenceModule {
        ...ReferenceModuleFields
        }
        appId
        hidden
        reaction(request: null)
        hasCollectedByMe
    }
    
    fragment MirrorFields on Mirror {
        ...MirrorBaseFields
        mirrorOf {
        ... on Post {
            ...PostFields          
        }
        ... on Comment {
            ...CommentFields          
        }
        }
    }
    
    fragment CommentBaseFields on Comment {
        id
        profile {
        ...ProfileFields
        }
        stats {
        ...PublicationStatsFields
        }
        metadata {
        ...MetadataOutputFields
        }
        createdAt
        collectModule {
        ...CollectModuleFields
        }
        referenceModule {
        ...ReferenceModuleFields
        }
        appId
        hidden
        reaction(request: null)
        mirrors(by: null)
        hasCollectedByMe
    }
    
    fragment CommentFields on Comment {
        ...CommentBaseFields
        mainPost {
        ... on Post {
            ...PostFields
        }
        ... on Mirror {
            ...MirrorBaseFields
            mirrorOf {
            ... on Post {
                ...PostFields          
            }
            ... on Comment {
                ...CommentMirrorOfFields        
            }
            }
        }
        }
    }
    
    fragment CommentMirrorOfFields on Comment {
        ...CommentBaseFields
        mainPost {
        ... on Post {
            ...PostFields
        }
        ... on Mirror {
            ...MirrorBaseFields
        }
        }
    }
    
    fragment FollowModuleFields on FollowModule {
        ... on FeeFollowModuleSettings {
        type
        amount {
            asset {
            name
            symbol
            decimals
            address
            }
            value
        }
        recipient
        }
        ... on ProfileFollowModuleSettings {
        type
        contractAddress
        }
        ... on RevertFollowModuleSettings {
        type
        contractAddress
        }
        ... on UnknownFollowModuleSettings {
        type
        contractAddress
        followModuleReturnData
        }
    }
    
    fragment CollectModuleFields on CollectModule {
        __typename
        ... on FreeCollectModuleSettings {
        type
        followerOnly
        contractAddress
        }
        ... on FeeCollectModuleSettings {
        type
        amount {
            asset {
            ...Erc20Fields
            }
            value
        }
        recipient
        referralFee
        }
        ... on LimitedFeeCollectModuleSettings {
        type
        collectLimit
        amount {
            asset {
            ...Erc20Fields
            }
            value
        }
        recipient
        referralFee
        }
        ... on LimitedTimedFeeCollectModuleSettings {
        type
        collectLimit
        amount {
            asset {
            ...Erc20Fields
            }
            value
        }
        recipient
        referralFee
        endTimestamp
        }
        ... on RevertCollectModuleSettings {
        type
        }
        ... on TimedFeeCollectModuleSettings {
        type
        amount {
            asset {
            ...Erc20Fields
            }
            value
        }
        recipient
        referralFee
        endTimestamp
        }
        ... on UnknownCollectModuleSettings {
        type
        contractAddress
        collectModuleReturnData
        }
    }
    
    fragment ReferenceModuleFields on ReferenceModule {
        ... on FollowOnlyReferenceModuleSettings {
        type
        contractAddress
        }
        ... on UnknownReferenceModuleSettings {
        type
        contractAddress
        referenceModuleReturnData
        }
        ... on DegreesOfSeparationReferenceModuleSettings {
        type
        contractAddress
        commentsRestricted
        mirrorsRestricted
        degreesOfSeparation
        }
    }
`;

export const IS_FOLLOWED_BY_ME = gql`
    query Profile($profileId: String!) {
        profile(request: { profileId: $profileId }) {
            isFollowedByMe
        }
    }
`;

import { gql } from 'apollo-boost';

export const getStudios = gql`
    query($search: String!){
        Studio(search: $search) {
            name
            id
            siteUrl
            media(sort: SCORE_DESC, page: 1, perPage: 3) {
                nodes {
                    id
                }
            }
        }
    }
`;

export const getAnime = gql`
    query($id: Int!) {
        Media(id: $id) {
            id
            title {
                userPreferred
            }
            coverImage {
                large
                medium
            }
            averageScore
        }
    }
`;

export const getAnimeDetails = gql`
    query($id: Int!) {
        Media(id: $id) {
            id
            idMal
            description(asHtml: false)
            episodes
            bannerImage
            genres
            averageScore
            title {
                userPreferred
            }
            coverImage {
                large
                medium
            }
            averageScore
        }
    }
`;

export const getAnimeSearch = gql`
    query($search: String!){
        Page (page: 1, perPage: 12) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media (search: $search, sort: SCORE_DESC,) {
                id
                title {
                    userPreferred
                }
                coverImage {
                    large
                    medium
                }
                averageScore
            }
        }
    }
`;

export const getAiringAnime= gql`
    query{
        Page (page: 1, perPage: 20) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media (
                season: FALL, 
                sort: SCORE_DESC, 
                status: RELEASING, 
                isAdult:false,
            ){
                id
                title {
                    userPreferred
                }
                coverImage {
                    large
                    medium
                }
                averageScore
            }
        }
    }
`;


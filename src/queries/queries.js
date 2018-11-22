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


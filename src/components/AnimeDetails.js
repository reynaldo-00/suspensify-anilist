import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled, {css} from 'styled-components';

import { getAnimeDetails } from '../queries/queries';
import Loading from './Loading';

/* this.props.data.Media
averageScore: 89
bannerImage: "https://s3.anilist.co/media/anime/banner/21745-5psGR43Ck4RZ.jpg"
coverImage:
large: "https://s3.anilist.co/media/anime/cover/medium/nx21745-CEq1O4v9d6IQ.png"
medium: "https://s3.anilist.co/media/anime/cover/small/nx21745-CEq1O4v9d6IQ.png"
__typename: "MediaCoverImage"
__proto__: Object
description: "Final season of the Monogatari Series, part 4/5. Contains the arcs Mayoi Hell, Hitagi Rendezvous, and Ougi Dark from the Owarimonogatari light novels.↵<br><br>↵"That is—the end of your youth." On the morning of the appointed day of the college entrance examinations, Koyomi Araragi headed towards North Shirahebi Shrine. What awaits him there with an unexpected smiling face is the slice of the sword that marks the final decisive battle—All of the "stories" now meet their resolution!<br><br>↵(Source: Bakemonogatari Wiki)"
episodes: 7
genres: Array(3)
0: "Comedy"
1: "Mystery"
2: "Supernatural"
length: 3
__proto__: Array(0)
id: 21745
idMal: 35247
title:
userPreferred: "Owarimonogatari (Ge)"
*/

class AnimeDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: false
        }
    }

    expandDescription = (e) => {
        e.preventDefault();
        this.setState(prevState => ({...this.state, expand: !prevState.expand}))
    }

    render() {
        console.log(this.props);

        const media = this.props.data.Media || {};

        return this.props.data.loading
        ? <Loading />
        : (
            <Container>
                <Banner background={media.bannerImage}>
                    <Cover cover={media.coverImage.large} />
                </Banner>
                <Info expand={this.state.expand} >
                    <Info.Title>{media.title.userPreferred}</Info.Title>
                    <h3>Score: <span>{media.averageScore / 10}</span></h3>
                    <h3>Episodes: <span>{media.episodes}</span></h3>
                    <h3 className="description">Description: <span>{media.description}</span></h3>
                    <Expand onClick={e => this.expandDescription(e)}>
                        {
                            this.state.expand
                                ? <i className="fas fa-sort-up"></i>
                                : <i className="fas fa-sort-down"></i>
                        }
                    </Expand>
                </Info>

            </Container>
        );
    }
}

export default graphql(getAnimeDetails, {
    options: props => ({
        variables: {
            id: props.match.params.id
        }
    })
})(AnimeDetails);

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`;

const Banner = styled.div`
    width: 100%;
    height: 230px;
    background: url(${props => props.background});
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
`;

const Cover = styled.div`
    width: 100px;
    height: 150px;
    position: absolute;
    left: 50px;
    bottom: -90px;
    background: url(${props => props.cover});
    background-size: cover;
`;

const Info = styled.div`
    width: calc(100% - 180px);
    margin-left: 180px;
    height: 150px;
    h3 {
        font-size: 16px;
        margin: 10px 0px;
        color: #ae88ae;
        span {
            color: #bababa;
        }
    }
    .description {
        height: 20px;
        overflow: hidden;
        ${props => props.expand && css`
            height: auto;
        `}
    }
`;

Info.Title = styled.h1`
    font-size: 20px;
    color: #d46b8c;
    /* color: #f9b5ac; */
    /* color: #ae88ae; */
`

const Expand = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
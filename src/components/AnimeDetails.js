import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled, {css} from 'styled-components';

import { getAnimeDetails } from '../queries/queries';
import Loading from './Loading';

/* this.props.data.Media
genres: Array(3)
0: "Comedy"
1: "Mystery"
2: "Supernatural"
id: 21745
idMal: 35247
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
                <ExternalLinks>
                    <LinkButton mal href={`https://myanimelist.net/anime/${media.idMal}`} target="_blank">MAL</LinkButton>
                    <LinkButton anilist href={`https://anilist.co/anime/${media.id}`} target="_blank">Anilist</LinkButton>
                </ExternalLinks>
                <Info expand={this.state.expand} >
                    <Info.Title>{media.title.userPreferred}</Info.Title>
                    <h3>Score: <span>{media.averageScore / 10}</span></h3>
                    <h3>Episodes: <span>{media.episodes}</span></h3>
                    <h3>Genres: 
                        {
                            media.genres.map((genre, index) => {
                                if (index + 1 === media.genres.length) return <span key={index}> {genre}</span>
                                return <span key={index}> {genre},</span>
                            })
                        }
                    </h3>
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

const ExternalLinks = styled.div`
    width: 100px;
    height: 75px;
    position: absolute;
    left: 50px;
    top: 305px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const LinkButton = styled.a`
    width: 100%;
    height: 30px;
    color: white;
    border: none;
    border-radius: 3px;
    font-size: 18px;
    font-weight: 800;
    text-align: center;
    line-height: 30px;
    text-decoration: none;
    cursor: pointer;
    ${props => props.mal && css`
        background-color: #2E51A2;
    `}
    ${props => props.anilist && css`
        background-color: #d46b8c;
    `}
`;

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    position: relative;
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
    bottom: -55px;
    background: url(${props => props.cover});
    background-size: cover;
`;

const Info = styled.div`
    width: calc(100% - 180px);
    margin-left: 180px;
    height: 150px;
    h3 {
        font-size: 16px;
        margin: 4px 0px;
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
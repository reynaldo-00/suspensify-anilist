import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled, {css} from 'styled-components';
import axios from 'axios';

import { getAnimeDetails } from '../queries/queries';
import Loading from './Loading';

import reddit from '../reddit.png';
import upvote from '../upvote.png';

class AnimeDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            gotredditInfo: false,
            threads: []
        }
    }

    expandDescription = (e) => {
        e.preventDefault();
        this.setState(prevState => ({...this.state, expand: !prevState.expand}))
    }

    getReddit = (titles) => {
        //https://www.reddit.com/r/anime/search.json?q=title:Goblin%20Slayer%20flair%3Aepisode&restrict_sr=1
        const baseUrl = `https://www.reddit.com/r/anime/search.json?q=title:`
        const urlEnding = '%20flair%3Aepisode&restrict_sr=1';
        // const title = 'Goblin Slayer';
        const title = titles.userPreferred;
        // const title = 'Owarimonogatari';

        const url = `${baseUrl}${title}${urlEnding}`

        if (!this.state.gotredditInfo){
            axios.get(url)
            .then(res => {
                const threads = res.data.data.children;
                threads.sort((a, b) => {
                    const titleA = a.data.title.toUpperCase(); // ignore upper and lowercase
                    const titleB = b.data.title.toUpperCase(); // ignore upper and lowercase
                    if (titleA < titleB) {
                        return -1;
                    }
                    if (titleA > titleB) {
                        return 1;
                    }
                    return 0;
                })
                this.setState({threads, gotredditInfo: true})
            })
            .catch(error => console.log(error))
        }
    }

    displayReddit = () => {
        const threads = this.state.threads || [];
        console.log(threads);

        return threads.map((thread, index) => {
            return (
                <Link key={index} href={thread.data.url} target="_blank" >
                    <Icon/>
                    <Upvote ups={thread.data.ups}/>
                    <LinkDetails>{thread.data.title}</LinkDetails>
                </Link>
            );
        })
    }

    render() {
        console.log(this.props);

        const media = this.props.data.Media || {};

        if (!this.props.data.loading) this.getReddit(media.title);

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
                <RedditLinks>
                    {this.displayReddit()}
                </RedditLinks>
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

const LinkDetails = styled.h3`
    margin-left: 25px;
`;

const Link = styled.a`
    width: 100%;
    height: 75px;
    color: #ae88ae;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: solid red 1px; */
`;

const Icon = styled.span`
    width: 50px;
    height: 50px;
    background-image: url(${reddit});
    background-size: 50px, 50px;
`;
const Upvote = styled.span`
    width: 25px;
    height: 25px;
    background-image: url(${upvote});
    background-size: 25px;
    margin-left: 15px;
    position: relative;
    margin-top: -15px;
    &::after {
        content: '${props => props.ups}';
        position: absolute;
        bottom: -25px;
        left: -5px;
    }
`;

const RedditLinks = styled.div`
    margin-top: 50px;
    width: 100%;

`;

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
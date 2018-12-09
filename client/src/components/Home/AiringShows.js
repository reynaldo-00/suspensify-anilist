import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import { getAiringAnime } from '../../queries/queries';
import Loading from '../Loading';
import Anime from './Anime';


class AiringShows extends Component {
    render() {
        const data = this.props.data  || {};
        return data.loading || data === undefined
        ? <Loading/>
        : 
            <Container>
                {
                    data.Page.media.map((anime, index) => 
                        <Anime animeInfo={anime} key={index} history={this.props.history}/>
                    )
                }
            </Container>
        ;
    }
}

export default graphql(getAiringAnime)(AiringShows);

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: flex-start;
    flex-flow: row wrap;
    position: relative;
    margin-top: 100px;
`;


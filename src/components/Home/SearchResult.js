import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import Loading from '../Loading';
import Anime from './Anime';
import { getAnimeSearch } from '../../queries/queries'

class SearchResult extends Component {

    animeClicked = (e, id) => {
        e.preventDefault();
        this.props.history.push(`/anime/${id}`);
    }

    render() {
        const data = this.props.data  || {};
        return data.loading || data === undefined
        ? <Loading />
        : (
            <Container>
                {
                    this.props.data.Page.media.map((anime, index) => 
                        <Anime animeInfo={anime} key={index} history={this.props.history}/>
                    )
                }
            </Container>
        )
    }
}

export default graphql(getAnimeSearch, {
    options: props => {
        return {
            variables: {
                search: props.search
            }
        }
    }
})(SearchResult);

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
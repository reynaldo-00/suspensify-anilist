import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import Loading from '../Loading';
// import AnimeList from './AnimeList';
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
        // : <AnimeList nodes={data.Page.media} animeClicked={this.animeClicked}/>
        : (
            <Container>
                
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
`
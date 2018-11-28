import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import Loading from '../Loading';
import AnimeList from './AnimeList';
import { getAnimeSearch } from '../../queries/queries'

class SearchResult extends Component {

    animeClicked = (e, id) => {
        e.preventDefault();
        this.props.history.push(`/anime/${id}`);
    }

    render() {
        const data = this.props.data  || {};

        return data.loading || data === undefined
        ? (<Loading />)
        : (
            <div>
                <AnimeList nodes={data.Page.media} animeClicked={this.animeClicked}/>
            </div>
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

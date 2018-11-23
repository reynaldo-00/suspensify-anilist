import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled, {css} from 'styled-components';
import { getStudios } from '../queries/queries';
import AnimeList from './AnimeList';
import Loading from './Loading';

class Studio extends Component {

    displayStudio = () => {
        const { data } = this.props;
        return data.loading || data === undefined
            ? (
                <Container loading>
                    <Loading />
                </Container>
            )
            : (
                <Container>
                    <Container.Title>{data.Studio.name}</Container.Title>
                    <AnimeList nodes={data.Studio.media.nodes}/>
                </Container>
            )
    }

    render() {
        return (
            <>
                {
                    this.props.data.Studio !== null
                        ? this.displayStudio()
                        : <h2>No results found</h2>
                }
            </>
        );
    }
}

export default graphql(getStudios, {
    options: props => {
        return {
            variables: {
                search: props.studio
            }
        }
    }
})(Studio);

const Container = styled.section`
    width: 100%;
    height: 365px;
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    ${props => props.loading && css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    `}
`;

const Title = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #d46b8c; 
    /* color: #f9b5ac; */
    /* color: #ae88ae; */
`;

Container.Title = Title;
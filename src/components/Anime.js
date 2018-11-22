import React, { Component } from 'react';
import styled, {css} from'styled-components';
import { graphql } from 'react-apollo';
import { getAnime } from '../queries/queries';
import Loading from './Loading';

class Anime extends Component {

    displayAnime = () => {
        const { data } = this.props;
        return data.loading
            ? <Loading/>
            : (
                <Info>
                    <h2>{data.Media.title.userPreferred}</h2>
                </Info>
            );
    }

    render() {
        const data = this.props.data  || {};
        const media = data.Media || {};
        const coverImage = media.coverImage || '';
        return (
            <Container background={coverImage} index={this.props.index}>
                <Filter />
                {this.displayAnime()}
            </Container>
        );
    }
}

export default graphql(getAnime, {
    options: props => {
        return {
            variables: {
                id: props.id
            }
        }
    }
})(Anime);


const Container = styled.section`
    height: 300px;
    width: 200px;
    margin-left: ${props => props.index === 0 ? '0px' : '30px'};
    background: light-grey;
    position: relative;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    ${props => props.background && css`
        background-image: url(${props => props.background.large});
        background-repeat: no-repeat;
        background-size: cover;
    `}
`;

 const Filter = styled.span`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(0deg, rgba(0,0,0,1), rgba(0,0,0,0) 80%);
    z-index: 1;
 `;

 const Info = styled.section`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    h2 {
        margin-top: 190px;
        font-size: 18px;
        word-wrap: break-word;
        color: #f9b5ac;
        /* color: #ae88ae; */
    }
 `;
import React, { Component } from 'react';
import styled, {css} from'styled-components';
import { graphql } from 'react-apollo';
import { unstable_createResource as createResource } from 'react-cache';

import { getAnime } from '../queries/queries';
import Loading from './Loading';

const imageSource = createResource(source => new Promise(resolve => {
    const img = new Image();
    img.src = source;
    img.onload = resolve;
}))

const Img = ({src, alt, ...props}) => {
    imageSource.read(src);
    return <img src={src} alt={alt} {...props} />
}

class Anime extends Component {

    displayAnime = () => {
        const data = this.props.data  || {};
        const media = data.Media || {};
        const coverImage = media.coverImage || '';
        return data.loading || data === undefined
            ? (
                <Container index={this.props.index}>
                    <Filter />
                    <Loading/>
                </Container>
            )
            : (
                <Container index={this.props.index}>
                    <React.Suspense fallback={
                        <img src={coverImage.medium} alt={media.title.userPreferred} />
                    }>
                        <Img src={coverImage.large} alt={media.title.userPreferred} />
                    </React.Suspense>
                    <Filter />
                    <Info>
                        <h2>{media.title.userPreferred}</h2>
                    </Info>
                </Container>
            );
    }

    render() {
        return this.displayAnime();
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
    img {
        width: 100%;
        height: 100%;
    }
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
    align-items: flex-start;
    h2 {
        margin-top: 210px;
        font-size: 18px;
        word-wrap: break-word;
        color: #ae88ae;
    }
 `;
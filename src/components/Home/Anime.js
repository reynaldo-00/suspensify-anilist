import React, { Component } from 'react';
import styled, {css} from'styled-components';
import { unstable_createResource as createResource } from 'react-cache';

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

    render() {
        const {id, coverImage, title} = this.props.animeInfo;
        return (
            <Container onClick={e => this.props.animeClicked(e, id)}>
                <React.Suspense fallback={
                    <img src={coverImage.medium} alt={title.userPreferred} />
                }>
                    <Img src={coverImage.large} alt={title.userPreferred} />
                </React.Suspense>
                <Filter />
                <Info>
                    <h2>{title.userPreferred}</h2>
                </Info>
            </Container>
        );
    }
}

export default Anime;


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
import React, { Component } from 'react';
import styled from 'styled-components';
import Anime from './Anime';

class AnimeList extends Component {
    render() {
        return (
            <Container>
                {this.props.nodes.map((node, index) => <Anime key={node.id} id={node.id} index={index}/>)}
            </Container>
        );
    }
}

export default AnimeList;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
`;

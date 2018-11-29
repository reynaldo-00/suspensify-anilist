import React, { Component } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import AiringShows from './AiringShows';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    changeHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <Container>
                <Title>ANIscussion</Title>
                <Info>Search discussion threads for any anime</Info>
                <SearchBar search={this.state.search} onChange={this.changeHandler}/>
                {
                    this.state.search.length
                        ? <SearchResult search={this.state.search} {...this.props} />
                        : <></>
                }
                <AiringShows history={this.props.history}/>
            </Container>
        );
    }
}

export default Home;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const Title = styled.h1`
    font-weight: 800;
    font-size: 25px;
`;

const Info = styled.p`
    font-size: 16px;
    font-weight: 400;
`;

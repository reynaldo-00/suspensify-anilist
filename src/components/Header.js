import React from 'react';
import styled from 'styled-components';

const Header = ({search, onChange}) => {

    return (
        <Container>
            <i className="fas fa-search"></i>
            <Container.Input
                type="text" 
                placeHolder="AnimeStudio"
                value={search} 
                onChange={e => onChange(e.target.value)}
            />
        </Container>
    );
}

export default Header;

const Container = styled.div`
    width: 300px;
    height: 45px;
    position: relative;
    .fa-search {
        position: absolute;
        left: 10px;
        line-height: 45px;
        font-size: 22px;
        color: #d46b8c;
    }
`;

Container.Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    border: 1px solid #d46b8c;
    border-radius: 12px;
    background-color: transparent;
    outline: none;
    font-size: 20px;
    padding-left: 40px;
    color: #f9b5ac;
`;


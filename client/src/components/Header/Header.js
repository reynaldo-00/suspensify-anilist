import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <Wrapper>
                <Container>
                    <UserActions>
                        <StyledLink to="/login">Login</StyledLink>
                    </UserActions>
                </Container>
            </Wrapper>
        );
    }
}

export default Header;

const StyledLink = styled(NavLink)`
    text-decoration: none;
    line-height: 60px;
    color: #bababa;
    user-select: none;
    cursor: pointer;
`;

const UserActions = styled.div`
    position: absolute;
    right: 0;
    height: 100%;
    width: 150px;
    display: flex;
    justify-content: flex-end;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: 950px;
    min-width: 550px;
    padding: 5px 40px;
    position: relative;
`;

const Wrapper = styled.div`
    width: 100vw;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
`;
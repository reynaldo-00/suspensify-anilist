import React, { Component } from 'react';
import styled from 'styled-components';

class Register extends Component {
    render() {
        return (
            <Container>
                <StyledLabel htmlFor="username">Username</StyledLabel>
                <StyledInput type="text" name="username" id="username"/>

                <StyledLabel htmlFor="password">Password</StyledLabel>
                <StyledInput type="text" name="password" id="password"/>
                
                <StyledButton type="submit">Submit</StyledButton>
            </Container>
        );
    }
}

export default Register;

const StyledButton = styled.button`
    margin-top: 20px;
    height: 35px;
    border-radius: 6px;
    line-height: 35px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
`;

const StyledInput = styled.input`
    height: 35px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 6px;
    outline: none;
    line-height: 35px;
    padding: 0px 10px;
    font-size: 16px;
    width: 100%;
`;

const StyledLabel = styled.label`
    line-height: 35px;
    width: 100%;
`;

const Container = styled.form`
    width: 300px;
    /* height: 350px; */
    background-color: #fafafa;
    border-radius: 8px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 25px 40px;
`;
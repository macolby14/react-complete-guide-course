//Next gen JS import from node_modules react package. Need because jsx goes to React.createElement
//don't need {Component because using function}
import React from 'react';
//import './Person.css'
import styled from 'styled-components';

//styled.div creates a valid React component
const StyledDiv = styled.div`
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
    @media (min-width: 500px){
        width: 450px;
    }
`;

const person = (props) => { 
    return (
    //<div className="Person">
    <StyledDiv>
        <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
        <p>{props.children}</p>
        <input type="text" onChange={props.changed} value={props.name}/>
    </StyledDiv>
   )
};

export default person;
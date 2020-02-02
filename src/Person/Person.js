//Next gen JS import from node_modules react package. Need because jsx goes to React.createElement
//don't need {Component because using function}
import React from 'react';
import classes from './Person.css'

const person = (props) => { 
    return (
    <div className={classes.Person}>
        <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
        <p>{props.children}</p>
        <input type="text" onChange={props.changed} value={props.name}/>
    </div>
   )
};

export default person;
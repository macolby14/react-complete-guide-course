import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';


class App extends Component {
  //state is keyword
  //if state changes, will re-render DOM
  state = {
    persons: [
      {id:"1",name: "Max", age: 28},
      {id:"2",name: "Manu", age: 29},
      {id:"3",name: "Stephanie", age:26}
    ],
    otherState: "some other value",
    showPersons: true
  };

  //should always edit state in an immutable fashion. Change via methods
  deletePersonHandler = (personIndex) => {
    const persons=[...this.state.persons]; //call slice() to copy or ... avoid editing state
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }

  nameChangedHandler = (event, id) =>{
    const personIndex = this.state.persons.findIndex(p => {
      return p.id===id;
    });//find person by id
    
    const person={...this.state.persons[personIndex]};//spread to copy obj
    person.name=event.target.value;
    const persons=[...this.state.persons];
    persons[personIndex]=person;
    this.setState({persons:persons}); 
  }

  togglePersonHandler = () => {
    this.setState({showPersons:!this.state.showPersons});
  }
  
  
  render() {
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid black",
      padding: "8px",
      cursor: "pointer",
      ':hover': {
        backgroundColor:'lightgreen',
        color:"black"}
    };

    let persons = null;

    //expects key property if rendered through list
    if (this.state.showPersons) {

      style.backgroundColor="red";
      style[":hover"]={
        backgroundColor:'salmon',
        color:'black'
      }

      persons = (
        <div>
          {this.state.persons.map((person,index) =>{
            return (<Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event,person.id)}/>)
          })}
        </div> 
      );
    }

    const classes = [];
    if(this.state.persons.length <=2){
      classes.push("red"); //red
    }
    if(this.state.persons.length<=1){
      classes.push("bold");//red and bold
    }

    return (
      //looks like HTML, but actually jsx
      //jsx is syntatically sugar. Automatically compiled to valid js
      //jsx works in .js and jsx files. Convention to use .js
     //jsx restriction: className instead of class for css. class is reserved work in js
     //jsx must have 1 root element (in JSX 16, may return adjacent elements)
    <div className="App">
        <h1>Hi, I'm a React App!</h1>
        <p className={classes.join(" ")}>This is really working!</p>
        {/*normal js is onclick, jsx is onClick. Don't add () for handlers*/}
        <button 
          style={style}
          onClick={this.togglePersonHandler} >Toggle Persons</button>
          {persons}
      </div>
    );
   //JSX gets complied to React.createElement, takes at least 3 arguments, div, js object, multiple childeren
  // return React.createElement('div',{className: 'App'},React.createElement('h1',null,'Does this work now?'));
  }
}//end App Component

//export App as default, used in index.js to render.
export default App;

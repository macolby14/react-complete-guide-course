import React, { Component } from 'react';
import './App.css';
//need to use uppercase Person, because jsx, lower case eleemnts are HTML
//uppercase elements are custom HTML elements (components)
import Person from './Person/Person';


class App extends Component {
  //state is keyword
  //if state changes, will re-render DOM
  state = {
    persons: [
      {name: "Max", age: 28},
      {name: "Manu", age: 29},
      {name: "Stephanie", age:26}
    ],
    otherState: "some other value"
  };

  //event handler. Use ES6 for correct ES6 scope
  switchNameHandler = (newName) =>{
    //DONT't change state directly. Use methid
    //this.state.persons[0].name="Maximuliam"
    this.setState({
      persons: [
      {name: newName, age: 28},
      {name: "Manu", age: 29},
      {name: "Stephanie", age:27}
       ]
    });
  };

  nameChangedHandler = (event) =>{
    this.setState({
      persons: [
      {name: "Max", age: 28},
      {name: event.target.value, age: 29},
      {name: "Stephanie", age:27}
       ]
    });
  }
  
  
  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    return (
      //looks like HTML, but actually jsx
      //jsx is syntatically sugar. Automatically compiled to valid js
      //jsx works in .js and jsx files. Convention to use .js
     //jsx restriction: className instead of class for css. class is reserved work in js
     //jsx must have 1 root element (in JSX 16, may return adjacent elements)
     <div className="App">
        <h1>Hi, I'm a React App!</h1>
        <p>This is really working!</p>
        {/*normal js is onclick, jsx is onClick. Don't add () for handlers*/}
        <button 
          style={style}
          onClick={() => this.switchNameHandler('Maximilian!!')}>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}></Person>
        <Person
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this,'Max!')}
          changed={this.nameChangedHandler}>My Hobbies: Racing</Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}></Person>
      </div>
    );
   //JSX gets complied to React.createElement, takes at least 3 arguments, div, js object, multiple childeren
  // return React.createElement('div',{className: 'App'},React.createElement('h1',null,'Does this work now?'));
  }
}//end App Component

//export App as default, used in index.js to render.
export default App;

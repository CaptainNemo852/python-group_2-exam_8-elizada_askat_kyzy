import React, { Component } from 'react';
import List from "./containers/ListOfTasks/list"
import Details from "./containers/TaskDetails/Details"
import AddTask from "./containers/AddTask/AddTask"
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={List}/>
                        <Route path='/tasks/add' component={AddTask}/>
                        <Route path="/task/:id" component={Details}/>
                    </Switch>
                </BrowserRouter>
            </div>
    );
  }
}

export default App;
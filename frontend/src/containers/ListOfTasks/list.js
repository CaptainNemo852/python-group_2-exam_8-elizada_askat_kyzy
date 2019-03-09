import React, {Fragment, Component} from 'react'
import {NavLink} from "react-router-dom";
import axios from 'axios';
import Task from "../../components/task/task"



const URL_TASK = 'http://localhost:8000/api/v1/tasks';

class List extends Component {
    state = {
        tasks: [],
        turn: [],
        in_work: [],
        done: []
    };

    componentDidMount() {
        axios.get(URL_TASK)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(tasks => {
                let task = [...this.state.tasks];
                console.log(tasks);

                let turn = tasks.filter(function (task) {
                    return task.status === 'turn';
                });

                this.setState({turn: turn});
                console.log(turn);

                let in_work = tasks.filter(function (task) {
                    return task.status === 'in_work';
                });
                this.setState({in_work: in_work});

                let done = tasks.filter(function (task) {
                    return task.status === 'done';
                });
                this.setState({done: done});
                this.setState({tasks: tasks})
            })
            .catch(error => console.log(error));


    }


    render() {
        console.log(this.state.tasks);
        return <Fragment>
            <p><NavLink to='/tasks/add'>Add Task</NavLink></p>
            <div className='row'>
                {this.state.tasks.map(tasks => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'key={tasks.id}>
                        <Task tasks={tasks}/>
                    </div>
                })}
                {this.state.turn.map(tasks => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'key={tasks.id}>
                        <Task tasks={tasks}/>
                    </div>
                })}
                {this.state.in_work.map(tasks => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'key={tasks.id}>
                        <Task tasks={tasks}/>
                    </div>
                })}
                {this.state.done.map(tasks => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3' key={tasks.id}>
                        <Task tasks={tasks}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}

export default List;
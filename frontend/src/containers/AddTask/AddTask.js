import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import axios from 'axios';



class AddTask extends Component {
    state = {
        task: {
            summary: "",
            description: "",
            due_date: "",
            status: "",
            time_planned: ""
        },

        alert: null,
        submitDisabled: false
    };



    updateTaskState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task[fieldName] = value;
            newState.task = task;
            return newState;
        });
    };
    selectChanged = (field) => {
        const status = "turn";
        this.updateTaskState(field, status);
    };


    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateTaskState(fieldName, value);
    };

    dateChanged = (field, date) => {
        this.updateTaskState(field, date.toISOString());
    };


    formSubmitted = (event) => {
        event.preventDefault();


        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });
        const URL_TASKS = 'http://localhost:8000/api/v1/tasks/';

        axios.post(URL_TASKS, this.state.task)
            .then(response => {
                console.log(response.data);
                if (response.status === 201) return response.data;
                throw new Error('Task was not created');
            })


            .then(task => this.props.history.replace('/task/' + task.id))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Task was not added!`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

    render() {
        const {summary, description, due_date, status, time_planned} = this.state.task;

        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }


        const due_date_selected = due_date ? new Date(due_date) : null;
        const select_options = [{value: "turn", label: "Turn"}];

        return <div>
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Summary</label>
                    <input type="text" className="form-control" name="summary" value={summary} onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Due Date</label>
                    <div>
                        <DatePicker dateFormat="yyyy-MM-dd HH:MM:ss" selected={due_date_selected} className="form-control"
                                    name="release_date" onChange={(date) => this.dateChanged('due_date', date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Time planned</label>
                    <input type="number" className="form-control" name="time_planned" value={time_planned}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <Select options={select_options} name='status'
                            onChange={() => this.selectChanged('status')}/>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Save</button>
            </form>
        </div>;
    };
}

export default AddTask;
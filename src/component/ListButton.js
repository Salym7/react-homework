import React, {Component} from 'react';

class ListButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            note: '',
            currentId: 4,
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.note.length < 3) return;
        this.setState(prevState => ({
            data: [
                {value: this.state.note, id: this.state.currentId},
                ...prevState.data,
            ],
            currentId: this.state.currentId + 1,
            note: '',
        }))

    };

    onValueChange = (e) => {
        this.setState({
            note: e.target.value
        })
    }

    deleteItem = (event) => {
        const id = +event.currentTarget.getAttribute('data-id');
        this.setState(({
            data: this.state.data.filter(item => item.id !== id)
        }))
    };

    render() {

        return (
            <div>
                <div className="m-3">
                    <form className="d-flex"
                          onSubmit={this.onSubmit}>
                        <div className="me-3">
                            <input type="text" value={this.state.note} required="" className="form-control"
                                   placeholder="I am going..."
                                   onChange={this.onValueChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">add</button>
                    </form>
                </div>
                {this.state.data.map((item) => (
                    <div key={item.id}>
                        <div className="row m-3">
                            <div className="col-auto">
                                <button type="button"
                                        className="btn btn-primary btn-sm"
                                        data-id={item.id}
                                        onClick={this.deleteItem}>Delete
                                </button>
                            </div>
                            <div className="col">{item.value}</div>
                        </div>
                        <hr/>
                    </div>
                ))}
            </div>
        );
    }
}

export default ListButton;
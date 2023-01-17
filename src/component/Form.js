import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: [],
            inputs: [],
            currentId: 0,
        }
    }

    addInput = () => {
        this.setState(() => ({
            currentId: this.state.currentId + 1,
        }))
        this.setState((state) => ({
            inputs: [
                {name: '', price: '', id: state.currentId},
                ...state.inputs,
            ]
        }))
    }

    handlerChangeInput = (event) => {
        const {name, value} = event.currentTarget
        const id = +event.currentTarget.getAttribute('data-id')
        const newInputs = this.state.inputs.map(item => item.id === id ? {...item, [name]: value} : item)
        this.setState({inputs: newInputs})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // Sending goods to the server
        console.log(JSON.stringify(this.state.inputs))

    };

    deleteItem = (event) => {
        const id = +event.currentTarget.getAttribute('data-id');
        this.setState(({
            inputs: this.state.inputs.filter(item => item.id !== id)
        }))
    };

    render() {
        const {inputs} = this.state
        const renderList = inputs.map((item) => (
            <div key={item.id} className='d-flex gap-3 border-bottom p-2'>
                <div className='w-25'>
                    <label htmlFor="name" className="col-form-label">Name</label>
                    <input type="text" name="name" className="form-control" id="email" placeholder="name"
                           data-id={item.id}
                           onChange={this.handlerChangeInput}
                           value={inputs.name}/>
                </div>
                <div className='w-25'>
                    <label htmlFor="price" className="col-form-label">price</label>
                    <input type="text" name="price" className="form-control" id="price"
                           placeholder="price"
                           data-id={item.id}
                           onChange={this.handlerChangeInput}
                           value={inputs.price}/>
                </div>
                <div>
                    <button type="button" className="btn-close" data-id={item.id} data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={this.deleteItem}>
                    </button>
                </div>
            </div>

        ))

        return (
            <div>
                <form name="myForm" onSubmit={this.handleSubmit}>
                    <h4>Admin form</h4>
                    <div className="mb-5">
                        <div className="list-group component__space">
                            {renderList}
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-success" onClick={this.addInput}>+
                    </button>
                    <hr/>
                    <button type="submit" className="btn btn-primary ">Submit</button>
                </form>
            </div>
        );
    }
}

export default Form;
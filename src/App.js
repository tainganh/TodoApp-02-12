import React, { Component } from "react";

import "./App.css";
import ProductForm from "./components/ProductForm";
class App extends Component {
    state = {
        showForm: false,
        products: [
            {
                id: 1,
                name: "Iphone",
                price: 200
            },
            {
                id: 2,
                name: "SamSung",
                price: 600
            }
        ],
        proEditing: []
    };
    onToggleForm = () => {
        this.setState({
            showForm: true
        });
    };
    onSubmit = data => {
        var { products } = this.state;
        if (data.id === "") {
            data.id = Date.now();
            this.state.products.push(data) //them vao cuoi mang
        } else {
            //Editing
            var index = this.findIndex(data.id);
            products[index] = data;
        }
        this.setState({
            products: products,
            proEditing: null
        });
        localStorage.setItem("tasks", JSON.stringify(products));
    };
    findIndex = id => {
        var result = -1;
        this.state.products.forEach((product, index) => {
            if (product.id === id) {
                result = index;
            }
        });
        return result;
    };
    Update = id => {
        let index = this.findIndex(id);
        let proEditing = this.state.products[index];
        this.setState({
            proEditing
        })
        this.onToggleForm();
    };
    onDelete = (id) =>{
        alert('Are you sure want to delete product?');
        var index=  this.findIndex(id);
        this.state.products.splice(index,1);
        this.setState({
            products: this.state.products
        })
    }
    render() {
        var product = this.state.products.map((pro, i) => (
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{pro.name}</td>
                <td>{pro.price}</td>
                <td>
                    <button
                        style={{marginRight:'10px'}}
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.Update(pro.id)}
                    >
                        Edit
                    </button>
                    <button className="btn btn-success" onClick={() =>{this.onDelete(pro.id)}}>Delete</button>
                </td>
            </tr>
        ));
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <table
                            className="table table-bordered table-hover"
                            style={{ marginTop: "40px" }}
                        >
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>name</th>
                                    <th>price</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>{product}</tbody>
                        </table>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.onToggleForm}
                        >
                            Add
                        </button>
                    </div>
                    {this.state.showForm ? (
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            {" "}
                            <ProductForm onSubmit={this.onSubmit} product={this.state.proEditing} />
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default App;

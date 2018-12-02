import React, { Component } from "react";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      price: ""
    };
  }
  componentWillMount() {
    if (this.props.product) {
      this.setState({
        id: this.props.product.id,
        name: this.props.product.name,
        price: this.props.product.price
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.product) {
      //!==null
      this.setState({
        id: nextProps.product.id,
        name: nextProps.product.name,
        price: nextProps.product.price
      });
    } else if (!nextProps.product) {
      this.setState({
        id: "",
        name: "",
        price: ""
      });
    }
  }
  onChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.setState({
      name: "",
      price: ""
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <legend>Add new Product</legend>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={this.onChange}
              value={this.state.name}
              placeholder="Input field"
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
              placeholder="Input field"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ProductForm;

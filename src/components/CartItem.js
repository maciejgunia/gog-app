import React, { Component } from 'react';
import './CartItem.scss';

class CartItem extends Component {
    
    constructor (props) {
        super(props);
        
        this.state = this.props.data
    }

    removeItemHandler = () => {
        this.props.removeItemHandler(this.state.id);
    }
    
    render() {
        return (
            <div className="cart-item">
                <img src={this.state.img} alt=""/>
                <div className="info">
                    <span className="title">{this.state.title.length < 30 ? this.state.title : this.state.title.substring(0,25) + '...'}</span>
                    <span className="remove-link" onClick={this.removeItemHandler}>remove</span>
                </div>
                <span className="price">$ {this.state.price}</span>
            </div>
        );
    }
}

export default CartItem;

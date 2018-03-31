import React, { Component } from 'react';
import './Item.scss';

class Item extends Component {
    
    constructor (props) {
        super(props);
        
        this.state = this.props.data
    }

    cartHandler = () => {
        this.props.cartHandler(this.state.id);
    }
    
    render() {
        let button,
            discount;
        
        if (this.state.owned) {
            button = <button className="btn">owned</button>;
        } else if(this.state.inCart){
            button = <button className="btn">in cart</button>;
        } else {
            button = <button className="btn btn-active" onClick={this.cartHandler}>$ {this.state.price}</button>
        }

        if(this.state.discount) discount = <span className="discount">- {this.state.discount}%</span>
        
        return (
            <div className="item">
                <img src={this.state.img} alt=""/>
                <div className="info">
                    <p className="title">{this.state.title}</p>
                    <div className="controls">
                        {discount}
                        {button}
                    </div>
                </div>
            </div>
        );
    }
}

export default Item;

import React, { Component } from 'react';
import Item from './Item';
import CartItem from './CartItem';
import './App.scss';

class App extends Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			assets: {
				banner: '',
				logo: '',
				cart: ''
			},
			items: [],
			cartVisible: false
		}
	}
	
	componentDidMount () {
		const dataUrl = 'https://gog-app-17728.firebaseio.com/data.json';
		let xhr = new XMLHttpRequest();
		xhr.open('GET', dataUrl);
		xhr.onload = response => {
			let data = JSON.parse(response.target.response);
			this.setState(prevState => {
				return { 
					assets: data.assets,
					items: data.items
				};
			});
		};
		xhr.send();
	}

	componentDidUpdate (prevProps, prevState) {
		if(prevState.items.filter(item => item.inCart).length === 0 && prevState.cartVisible)
			this.setState(prevState => {
				prevState.cartVisible = false;
				return prevState;
			});
	}

	addItemHandler = itemId => {
		let cartItems = this.state.items.filter(item => item.inCart),
			maxOrder = 0;

		if(cartItems.length > 0) maxOrder = Math.max(...cartItems.map(item => item.order));

		this.setState(prevState => {
			prevState.items.forEach(item => {
				if(item.id === itemId && !item.inCart) {
					item.inCart = true;
					item.order = maxOrder + 1;
				}
			});

			return prevState;
		});
	}

	removeItemHandler = itemId => {
		const index = this.state.items.findIndex(item => item.id === itemId);

		this.setState(prevState => {
			prevState.items[index].inCart = false;
			return prevState;
		});
	}

	removeAllHandler = () => {
		this.setState(prevState => {
			prevState.items.forEach(item => {
				item.inCart = false;
			})
			return prevState;
		});
	}

	toggleCart = () => {
		this.setState(prevState => {
			if(prevState.cartVisible) prevState.cartVisible = false;
			else prevState.cartVisible = true;

			return prevState;
		});
	}
	
	render() {
		let cartItems = this.state.items.filter(item => item.inCart).sort((a, b) => a.order < b.order),
			cartPrices = cartItems.map(item => item.price),
			total = 0,
			cartClass = 'cart';

		if (cartItems.length) {
			total = cartPrices.reduce((a, b) => {
				return a + b;
			}).toFixed(2);
		} else {
			cartClass += ' empty';
		}

		if(this.state.cartVisible) cartClass += ' active';

		return (
			<div>
				<header>
					<div className="container">
						<a className="logo" href="/"><img src={this.state.assets.logo} alt=""/></a>
						<div className={cartClass} onClick={cartItems.length > 0 ? this.toggleCart : null}>
							<img src={this.state.assets.cart} alt=""/>
							<span className="cart-counter">{cartItems.length}</span>
						</div>
						<div className={this.state.cartVisible ? 'cart-content active' : 'cart-content'}>
							<div className="cart-summary">
								<span className="cart-summary-items">{cartItems.length} items in cart</span>
								<span className="cart-summary-total">$ {total}</span>
								<button className="cart-clear" onClick={this.removeAllHandler}><span>clear cart</span></button>
							</div>
							<div className="cart-items">
								{cartItems.map(item => (
									<CartItem key={item.id} data={item} removeItemHandler={this.removeItemHandler}/>
								))}
							</div>
						</div>
					</div>
				</header>
				<div className="main">
					<div className="container">
						<h2>game of the week</h2>
						<img className="banner" src={this.state.assets.banner} alt=""/>
						<div className="items">
							{this.state.items.map(item => (
								<Item key={item.id} data={item} addItemHandler={this.addItemHandler}/>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;

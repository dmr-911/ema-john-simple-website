import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    useEffect(() => {
        const getProduct = getStoredCart();
        const newProduct = [];
        if (products.length) {
                 for (const key in getProduct) {
                   // console.log(key);
                    
                   const addedProduct = products.find(
                     (product) => product.key === key
                   );
                     newProduct.push(addedProduct);
                 }   
        }
        setCart(newProduct);
    }, [products])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.key);
    };
    
    return (
        <div>
            <div className="shop-container">
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="order-container">
                    <Cart key={cart.key} cart={cart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;
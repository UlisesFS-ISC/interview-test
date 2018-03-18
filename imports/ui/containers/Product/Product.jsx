// Framework
import React, {Component} from "react";
import {Session} from 'meteor/session';

// Components
import Button from "../../components/Button.jsx";
import Details from "../../components/Details.jsx";
import {Input, Label} from "reactstrap";

class Product extends Component {
    /*
     *****
     ***** Static component to display the buy button, will change depending on whether the product is
     ***** on the cart or if there are no products available in stock.
     ***** Inserts the set amount of a product to the cart collection.
     */
    static BuyButton({isOnCart, productId, productName, price, userName, quantity, currentStock, handleBuyProduct, merchantId, showMessage}) {
        let buyButton = null;
        let newStockValue = parseInt(currentStock - quantity);

        if (newStockValue < 0 && currentStock > 0) {
            handleBuyProduct = () => showMessage("Item could not be put in your cart", "Not enough items of this type in Stock", true);
        } else if (isNaN(newStockValue)){
            handleBuyProduct = () => showMessage("Item could not be put in your cart", "Invalid input value", true);
        }

        if(currentStock < 1){
            buyButton = (
                <Button type="button" className="product-disabled" disabled>
                    Out of stock
                </Button>
            );
        } else if (!isOnCart ) {
            const cartEntry = {
                merchantId,
                productId,
                productName,
                price,
                quantity: parseInt(quantity)
            };
            buyButton = (
                <Button onClick={() => handleBuyProduct(userName, cartEntry, newStockValue)}>
                    Add {productName} to Cart
                </Button>
            );
        } else {
            buyButton = (
               <Button type="button" className="product-disabled" disabled>
                   Already on cart
               </Button>
           );
       }

       return buyButton;
    }

    /*
     *****
     ***** Static component to like/unlike the products.
     ***** Inserts/removes a like to the likes collections
     */
    static LikeButton({hasUserLike, merchantId, productId, userName, numberOfLikes, handleLikeProduct}) {
        let likeEntry = {
            merchantId,
            productId,
            userName,
            id: userName + "*" + productId
        };
        let likeButtonType = (!hasUserLike) ? "product-likeButton end-lg" : "product-button-unlike end-lg";
        return (
                <Button className={likeButtonType}
                        onClick={() => handleLikeProduct(likeEntry, hasUserLike)}>
                    {`${numberOfLikes}:  `}<img alt="Cart" src={`/icon/components/button/button-like.svg`}/>
                </Button>
        );

    }

    /*
     *****
     ***** Static number input component, that is only displayed when the product can be bought.
     ***** Sets the product amount to be bought.
     */
    static BuyAmountField({handleQuantityToBuyChange, currentQuantity, maxQuantity, isOnCart}) {
        let numberField = null;

        if (maxQuantity > 0 && !isOnCart) {
            numberField = (
                <div>
                    <Label>Set order amount: </Label>
                    <Input className="product-number"
                           type="number"
                           min="1"
                           max={maxQuantity}
                           onChange={(e) => handleQuantityToBuyChange(e.target.value)}
                           value={currentQuantity}
                    />
                </div>
            );
        }
            return(
                numberField
            );
    }

    constructor(props){
        super(props);
        this.state = {
            stock: props.quantity,
            quantityToBuy: 1
        };
    }

    /*
     *****
     ***** Sets the quantity to buy.
     *****
     */
    handleQuantityToBuyChange = (value) => {
        this.setState({
            quantityToBuy: value
        });
    };

    render() {

        let {LikeButton, BuyButton, BuyAmountField} = Product;
        let {quantityToBuy, stock} = this.state;
        let userName = Session.get('user');

        let {
            merchantId,
            id,
            name = "Product",
            image,
            brand,
            color,
            description,
            price,
            size,
            numberOfLikes,
            likedByUser,
            isOnCart,
            dataLoadFlag,
            submitLikeCalls,
            showMessage,
            submitCartItemCalls,
        } = this.props;

        if(!dataLoadFlag){
            return null;
        }


        const handleBuyProduct = (userName, cartEntry, newStockValue) => {
            this.setState({
                stock: newStockValue
            });
            submitCartItemCalls(userName, cartEntry, newStockValue);
        };

        const info = [
            {label: "Brand", value: brand},
            {label: "Name", value: name},
            {label: "Description", value: description},
            {label: "Color", value: color},
            {label: "Size", value: size},
            {label: "Price", value: price},
            {label: "In stock", value: stock}
        ];

        return (
            <div className="product">
                <img alt={name} src={image} />
                <div className="details">
                    <Details info={info} />
                    <BuyAmountField
                        handleQuantityToBuyChange={this.handleQuantityToBuyChange}
                        maxQuantity={stock}
                        currentQuantity={quantityToBuy}
                        isOnCart={isOnCart}
                    />
                    <div className="product-button-container">
                        <BuyButton
                            isOnCart={isOnCart}
                            productId={id}
                            productName={name}
                            price={price}
                            userName={userName}
                            quantity={quantityToBuy}
                            currentStock={stock}
                            merchantId={merchantId}
                            handleBuyProduct={handleBuyProduct}
                            showMessage={showMessage}
                        />
                        <LikeButton
                            hasUserLike={likedByUser}
                            merchantId={merchantId}
                            productId={id}
                            userName={userName}
                            numberOfLikes={numberOfLikes}
                            handleLikeProduct={submitLikeCalls}
                            handleUnlikeProduct={submitLikeCalls}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;

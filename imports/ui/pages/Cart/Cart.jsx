// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Session } from 'meteor/session';

// Third-party
import MDSpinner from "react-md-spinner";

// Components
import { Row, Col } from "reactstrap";
import Page from "../../containers/Page/Page.jsx";
import Button from "../../components/Button.jsx";
import ModalImpl from "../../components/Modal.jsx";
import Details from "../../components/Details.jsx";

// Util
import {MODAL_TYPES} from '../../Constants.js'

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            totalAmount: 0,
            itemLoadFlag: false,
            serviceErrorFlag: false,
            modalMessage: null
        };
    }

    /*
     *****
     ***** Fetches the cart data from API and gets the order total amount
     *****
     */
    componentDidMount() {
        let userName = Session.get('user');
        if (!userName) {
            this.props.history.push("/");
        }
        Meteor.call("carts.getCartByUserName", userName, (error, response) => {
            if (error) {
                this.setState(() => ( {
                    serviceErrorFlag: true,
                    modalMessage: "Could not load the cart items"
                }));
            } else {
                if (!response) {
                    this.setState(() =>
                        ({
                            itemLoadFlag: true
                        })
                    );
                    return null
                }
                let totalSumToPay = 0;
                response.items.forEach(item => {
                    totalSumToPay += (parseFloat(item.price) * parseFloat(item.quantity));
                });
                this.setState(() =>
                    ({
                        items: response.items,
                        totalAmount: totalSumToPay,
                        itemLoadFlag: true
                    })
                );
            }
        });
    }

    /*
     *****
     ***** Removes an item from  the cart and sets back the merchant product availability.
     *****
     */
    handleRemoveFromCart = (userName, productId, merchantId, price, quantity) => {
        Meteor.call("carts.removeItemFromUserCart", userName, productId, (error, response) => {
            if (error) {
                this.setState(() => ({
                    serviceErrorFlag: true,
                    modalMessage: "Could not remove cart item"
                }));
            } else {
                this.setState(() => ({modalMessage: "Item removed from your cart"}));
                Meteor.call("merchants.rollBackProductAvailability", merchantId, productId, quantity, (error, response) => {
                    if (error) {
                        this.setState(() => ( {
                            serviceErrorFlag: true,
                            modalMessage: "Could not set back the product stock"
                        }));
                    } else {
                        if (!response) return null;
                        let newUserCartItems = this.state.items.filter( item => {return item.productId !== productId});
                        this.setState(() =>
                            ({
                                items: newUserCartItems,
                                totalAmount: this.state.totalAmount - (parseFloat(price) * parseFloat(quantity))
                            })
                        );
                    }
                });
            }
        });
    };

    /*
     *****
     ***** Empties the cart and places an order based on the cart items.
     *****
     */
    handleCheckIn = (order) => {
        Meteor.call("orders.insertOrder", order, (error, response) => {
            if (error) {
                this.setState(() => ( {
                    serviceErrorFlag: true,
                    modalMessage: "Could not submit the order"
                }));
            } else {
                this.setState(() => ({modalMessage: "Order has been submitted"}));

                Meteor.call("carts.emptyUserCart", order.userName, (error, response) => {
                    if (error) {
                        this.setState(() => (
                            {
                                serviceErrorFlag: true,
                                modalMessage: "Could not empty the cart"
                            }
                        ));
                    } else {
                        this.setState(() =>
                            ({
                                items: [],
                                totalAmount: 0
                            })
                        );
                    }
                });

            }
        });
    };


    goBack = () => this.props.history.push("/shop");
    goUserPage = () => this.props.history.push("/user");

    cleanMessages = () => {
        this.setState(() =>
            ({
                serviceErrorFlag: false,
                modalMessage: null
            })
        );
    };

    render() {
        let userName = Session.get('user');
        let currentTime = Date.now();
        const { items, serviceErrorFlag, totalAmount, itemLoadFlag, modalMessage} = this.state;
        let cartPageContent = null;
        let modalProps;

        if (modalMessage !== null) {
            let content = modalMessage;
            let modalType =  serviceErrorFlag ? MODAL_TYPES.ERROR : MODAL_TYPES.SUCCESS;
            modalProps = {
                type: modalType,
                title: "Cart",
                content: content,
                onClose: this.cleanMessages
            };
        }
        if(!itemLoadFlag) {
            cartPageContent = (
                    <Row className="cart-page">
                        <div className="cart-message-container">
                            <h1>{"Loading "}</h1>
                            <MDSpinner className="cart-spinner"/>
                        </div>
                    </Row>
            );
        } else if(items.length === 0){
            cartPageContent = (
                    <Row className="cart-page">
                        <div className="cart-message-container">
                           <h2>Your cart is empty</h2>
                        </div>
                    </Row>
            );
        } else {
            let cartEntryArray = [];

            items.forEach((item, key) => {
                const info = [
                    {label: "Name", value: item.productName},
                    {label: "Price", value: (item.price).toFixed(2)},
                    {label: "Quantity", value: item.quantity}
                ];

                cartEntryArray.push(
                    <Details info={info} key={key} >
                        <Button className="cart-deleteButton"
                                onClick={() => {
                                    this.handleRemoveFromCart(userName,
                                        item.productId,
                                        item.merchantId,
                                        item.price,
                                        item.quantity)
                                }}
                        >
                            X Remove
                        </Button>
                    </Details>);
            });

            cartPageContent = (
                <Row className="cart-page">
                    <Col className="cart-details">
                        {cartEntryArray}
                    </Col>
                    <Col className="cart-checkIn">
                        <label>Total Amount: {(totalAmount).toFixed(2)}</label>
                        <Button onClick={() => this.handleCheckIn(
                            {
                                userName: userName,
                                date: currentTime,
                                items: items
                            }
                        )}>Check-in Order</Button>
                    </Col>
                </Row>
            );
        }

        return(
            <Page pageTitle="cart"
                  history
                  goBack={this.goBack}
                  goUserPage={this.goUserPage}
                  modalProps={modalProps}
            >
                {cartPageContent}
            </Page>
        );
    }
}

export default Cart;


// Framework
import React, { Component } from "react";
import { Session } from 'meteor/session';

// Third-party
import MDSpinner from "react-md-spinner";

// Components
import { Row, Col } from "reactstrap";
import Page from "../../containers/Page/Page.jsx";
import Button from "../../components/Button.jsx";
import Details from "../../components/Details.jsx";

// Util
import {MODAL_TYPES} from '../../Constants.js'

class Cart extends Component {

    /*
     *****
     ***** Fetches the cart data from API and gets the order total amount
     *****
     */
    componentWillMount(){
        let userName = Session.get('user');
        if (!userName) {
            this.props.history.push("/");
        }
        this.props.initiateCartCalls(userName);
    }


    goBack = () => this.props.history.push("/shop");
    goUserPage = () => this.props.history.push("/user");

    render() {
        const {items, serviceErrorFlag, totalAmount, dataLoadFlag, message, removeCartItemCalls, submitOrderCalls, cleanMessage} = this.props;
        let userName = Session.get('user');
        let currentTime = Date.now();
        let cartPageContent = null;
        let modalProps;

        if (message !== null) {
            let modalType =  serviceErrorFlag ? MODAL_TYPES.ERROR : MODAL_TYPES.SUCCESS;
            modalProps = {
                type: modalType,
                title: "Cart",
                content: message,
                onClose: cleanMessage
            };
        }
        if(!dataLoadFlag) {
            cartPageContent = (
                    <Row className="cart-page">
                        <div className="cart-message-container">
                            <h1>Loading </h1>
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
                                    removeCartItemCalls(
                                        userName,
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
                        <Button onClick={() => submitOrderCalls(
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


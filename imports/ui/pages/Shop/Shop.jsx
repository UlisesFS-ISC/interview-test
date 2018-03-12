// Framework
import React, {Component} from "react";
import {Session} from 'meteor/session';

// Third-party
import MDSpinner from "react-md-spinner";

// Components
import {Row, Col} from "reactstrap";
import Page from "../../containers/Page/Page.jsx";
import Button from "../../components/Button.jsx";
import Product from "../../containers/Product/Product";
import { Container } from "reactstrap";

// Util
import {MODAL_TYPES} from '../../Constants.js'

const PAGINATION_ELEMENTS = 4;

class Shop extends Component {

    /*
     *****
     ***** Static navigation component to move across different merchant products (set to load 4 merchants at a time).
     *****
     */
    static NavigationButtons = ({initiateMerchantCalls, currentIndex, limit}) => {
        let previousButton = null;
        let nextButton  = null;
        if(currentIndex > PAGINATION_ELEMENTS) {
            previousButton = (
                <Col>
                    <Button
                        className="shop-previous-button"
                        onClick={() => {
                            initiateMerchantCalls(currentIndex - PAGINATION_ELEMENTS, currentIndex );
                        }}
                    >
                        {'<< Prev'}
                    </Button>
                </Col>
            );
        }

        if(currentIndex < (limit)) {
            nextButton = (
                <Col>
                    <Button
                        className="shop-next-button"
                        onClick={() => {
                            initiateMerchantCalls(currentIndex, currentIndex + PAGINATION_ELEMENTS);
                        }}
                    >
                        {'Next >>'}
                    </Button>
                </Col>
            );
        }
        return (
            <Row>
                {previousButton}
                {nextButton}
            </Row>
        )
    };

    /*
     *****
     ***** Static component for the floating Cart button.
     *****
     */
    static CartButton = ({history}) => {
        return (
            <div className="shop-cart">
                    <Button
                        className="shop-cart-button"
                        onClick={() => {
                            history.push("/cart");
                        }}
                    >
                        <img alt="Cart" src={`/icon/components/button/button-cart.svg`}/>
                    </Button>
            </div>
        )
    };

    /*
     *****
     ***** Handles session redirect before mounting.
     *****
     */
    componentWillMount() {
        if (!Session.get('user')) {
            this.props.history.push("/");
        }
    }

    /*
     *****
     ***** Dispatches action to load merchant data.
     *****
     */
    componentDidMount(){
        this.props.initiateMerchantCalls(0, PAGINATION_ELEMENTS);
    }

    goBack = () => this.props.history.push("/");
    goUserPage = () => this.props.history.push("/user");
    render() {
        const {merchants,  serviceErrorFlag, message, dataLoadFlag, limit, index, history, initiateMerchantCalls, cleanMessages} = this.props;
        let {NavigationButtons, CartButton} = Shop;
        let shopPageContent = null;
        let modalProps;

        if (message !== null) {
            let modalType =  serviceErrorFlag ? MODAL_TYPES.ERROR : MODAL_TYPES.SUCCESS;
            modalProps = {
                type: modalType,
                title: "Shop",
                content: message,
                onClose: cleanMessages
            };
        }
        if (!dataLoadFlag) {
            shopPageContent = (
                    <div className="shop-spinner-container">
                        <h1>{"Loading "}</h1>
                        <MDSpinner className="shop-spinner"/>
                    </div>
                );
        } else {
            const getProductsFromMerchant = ({products, brands, guid}) =>
                products.map(({belongsToBrand, ...product}) => ({
                    ...product,
                    brand: brands[belongsToBrand],
                    merchantId: guid
                }));

            const products = merchants.reduce(
                (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
                []
            );

            shopPageContent = (
                    <Container className="shop-page">
                        {products.map(({id, ...product}) =>
                            <Product id={id} {...product} key={id}/>
                        )}
                        <NavigationButtons initiateMerchantCalls={initiateMerchantCalls} currentIndex={index} limit={limit} />
                        <CartButton history={history} />
                    </Container>
            );
        }

        return (
            <Page pageTitle="shop"
                  history goBack={this.goBack}
                  goUserPage={this.goUserPage}
                  modalProps={modalProps}
            >
                {shopPageContent}
            </Page>
        );
    }
}

export default Shop;

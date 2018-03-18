// Framework
import React, {Component} from "react";
import {Session} from 'meteor/session';

// Third-party
import MDSpinner from "react-md-spinner";

// Components
import {Row, Col} from "reactstrap";
import Page from "../../containers/Page/Page-Container";
import Button from "../../components/Button.jsx";
import Product from "../../containers/Product/Product-Container";
import { Container } from "reactstrap";


export const PAGINATION_ELEMENTS = 4;

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
     ***** Dispatches action to load merchant, Cart and Product specific data.
     */
    componentWillMount() {
        let userName = Session.get('user');
        if (!userName) {
            this.props.history.push("/");
        }
        this.props.initiateMerchantCalls(0, PAGINATION_ELEMENTS);
        this.props.initiateProductCalls();
        this.props.initiateCartCalls(userName);
    }


    goBack = () => this.props.history.push("/");
    goUserPage = () => this.props.history.push("/user");
    render() {
        const {merchants, dataLoadFlag, limit, index, history, initiateMerchantCalls, likeDataLoadFlag, cartDataLoadFlag} = this.props;
        let {NavigationButtons, CartButton} = Shop;
        let shopPageContent = null;

        if (!dataLoadFlag || !likeDataLoadFlag || !cartDataLoadFlag) {
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
            >
                {shopPageContent}
            </Page>
        );
    }
}

export default Shop;

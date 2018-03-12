// Framework
import React, {Component} from "react";
import {Session} from 'meteor/session';

// Third-party
import MDSpinner from "react-md-spinner";

// Components
import {Row} from "reactstrap";
import Page from "../../containers/Page/Page.jsx";
import Button from "../../components/Button.jsx";
import Details from "../../components/Details.jsx";
import { Container } from "reactstrap";

// Util
import {MODAL_TYPES} from '../../Constants.js'


class User extends Component {

    /*
    **** Static component with the user details
     */
    static UserInfoSection({ userData, handleLogOutButton}) {

        if (!userData) return null;

        const info = [
            {label: "User name", value: userData.userName},
            {label: "First name", value: userData.details.firstName},
            {label: "Last name", value: userData.details.lastName},
            {label: "Address", value: userData.details.address}
        ];

        return (
            <div className="user-details">
                <h3>User details</h3>
                <Details info={info}/>
                <Button
                    className="button-logout"
                onClick={handleLogOutButton}
                >
                    X Log-out
                </Button>
            </div>
        );
    }

    /*
     **** Static component with the user order history
     */
    static UserOrdersSection({ userOrders }) {
        let orderEntries = [];

        userOrders.forEach( (userOrder, key) => {
            let orderItems = [];

            userOrder.items.forEach( (item, itemKey) => {
                const info = [
                    {label: "Name", value: item.productName},
                    {label: "Quantity", value: item.quantity},
                    {label: "Amount to pay", value: (item.price * item.quantity).toFixed(2)}
                ];
                orderItems.push(<Details info={info} key={itemKey + item.productId}/>)
            });

            orderEntries.push(
                (
                    <div className="info"  key={key}>
                        <div className="info-row">
                            <div className="label">
                                Order date:
                            </div>
                            <div className="value">
                                {new Date(userOrder.date).toLocaleDateString("en-US")}
                            </div>
                            <div className="item-details">
                                {orderItems}
                            </div>
                        </div>
                    </div>
                )
            );
        });

        if (orderEntries.length === 0){
            orderEntries.push(
                <div className="info" key="no-data">
                    <h4>No orders available to display</h4>
                </div>
            )
        }

        return (
            <div  className="user-orders">
                <h3>Order history</h3>
                {orderEntries}
            </div>
        );
    }

    componentDidMount() {
        const userName = Session.get('user');
        if (!userName) {
            this.props.history.push("/");
        }
        this.props.initiateUserCalls(userName);
    }


    /*
     *****
     ***** Nav functions
     *****
     */
    goBack = () => this.props.history.push("/shop");
    goUserPage = () => this.props.history.push("/user");

    render() {
        const { UserOrdersSection, UserInfoSection } = User;
        let { userOrders, errorMessage, userData, dataLoadFlag, history, cleanMessage, logOut } = this.props;
        let userPageContent;
        let modalProps = null;

        if (errorMessage !== null) {
            modalProps = {
                type: MODAL_TYPES.ERROR,
                title: "User",
                content: errorMessage,
                onClose: cleanMessage
            };
        }

        if(!dataLoadFlag) {
            userPageContent = (
                <Row className="user-page">
                    <div className="user-message-container">
                        <h1>Loading </h1>
                        <MDSpinner className="user-spinner"/>
                    </div>
                </Row>
            );
        } else {
            userPageContent = (
                <Container className="user-page">
                    <div className="user-info">
                        <Row>
                            <UserInfoSection userData={userData} handleLogOutButton={ () =>
                            {
                                logOut();
                                history.push("/");
                            }} />
                            <UserOrdersSection userOrders={userOrders} />
                        </Row>
                    </div>
                </Container>
            );
        }
        return (
            <Page pageTitle="User panel"
                  history goBack={this.goBack}
                  goUserPage={this.goUserPage}
                  modalProps={modalProps}
            >
                {userPageContent}
            </Page>
        );
    }
}

export default User;
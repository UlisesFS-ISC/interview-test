import React from 'react';
import { connect } from 'react-redux';

import {ShopActions} from "../../actions/Shop-Actions"
import Shop from './Shop';

const mapStateToProps = (state) => {
    return {
        merchants: state.Shop.merchants,
        index: state.Shop.index,
        limit: state.Shop.limit,
        dataLoadFlag: state.Shop.dataLoadFlag,
        serviceErrorFlag: state.Shop.serviceErrorFlag,
        message: state.Shop.message
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        initiateMerchantCalls: (start, end) => dispatch(ShopActions.initiateMerchantCalls(start, end)),
        cleanMessage: () => dispatch(ShopActions.cleanMessage())
    }
};

const ShopContainer = connect(mapStateToProps, mapDispatchToProps)(Shop);

export default ShopContainer;
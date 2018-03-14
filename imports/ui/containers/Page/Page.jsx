// @flow

// Framework
import React, {Component} from "react";

// Components
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import Modal from "../../components/Modal.jsx";

//Util
import {MODAL_TYPES} from "../../Constants";

const Page = ({children, pageTitle, goBack, goUserPage, modalTitle, message, cleanMessage, serviceErrorFlag}) => {

        let modal = null;
        let className = serviceErrorFlag ? MODAL_TYPES.ERROR : MODAL_TYPES.SUCCESS;

        if (message !== null &&  modalTitle !== null) {
            modal =(
                <Modal
                    title={modalTitle}
                    className={className}
                    onClose={cleanMessage}
                >
                    {message}
                </Modal>
            )
        }

        return (
            <div className="page">
                {modal}
                <Header goBack={goBack} goUserPage={goUserPage}>
                    {pageTitle}
                </Header>
                <main>
                    {children}
                </main>
                <Footer />
            </div>
        );

};



export default Page;


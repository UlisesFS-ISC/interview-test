// @flow

// Framework
import React, {Component} from "react";

// Components
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import Modal from "../../components/Modal.jsx";

const Page = ({children, pageTitle, goBack, goUserPage, modalProps}) => {

        let modal = null;

        if (modalProps){
            modal =(
                <Modal
                    title={modalProps.title}
                    className={modalProps.type}
                    onClose={modalProps.onClose}
                >
                    {modalProps.content}
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


import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';

const PrivateLayout = ({ children, showFooter }) => {
    return (
        <>
            <Sidebar />
            <div className="private-content">
                {children} {/* This will be the page content */}
            </div>
            {showFooter && <Footer />}
        </>
    );
};

export default PrivateLayout;

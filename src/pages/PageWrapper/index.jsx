import React from 'react';
import { Outlet } from 'react-router-dom';


const PageWrapper = () => {


    return( 
        <>
            <Outlet></Outlet>
        </>

    )
};

export default PageWrapper;
import BSTCarousel from './BSTCarousel';
import BSTNav from './BSTNav';
import BSTFooter from './BSTFooter';
import BSTAdmin from './BSTAdmin';
import { React, useState, useEffect } from 'react';
// Import swal
import Swal from 'sweetalert2';

const BSTHomepageContainer = () => {
    
   
    return (
        <div>
            <BSTNav />
                <BSTAdmin />
            <BSTFooter />
        </div>
    )

}

export default BSTHomepageContainer
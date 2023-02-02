import React from 'react'

import playstore from "../../images/playstore.png";
import appstore from "../../images/Appstore.png";
import "./footer.css";




const Footer = () => {
    return (
        <footer id="footer">
            <div className='LeftFooter'>
                <h4>Download Our App</h4>
                <p>Download App for Ios and Android Mobile phone </p>

                <img src={playstore} alt="playStore" />
                <img src={appstore} alt="AppStore" />

            </div>
            <div class="MidFooter">
                <h1>E Commerce solution</h1>
                <p>High Quality is our first Priority</p>
                <p>Copy Right 2023 </p>

            </div>
            <div class="RightFooter">
                   <h4>Follow us</h4>
                   <a href='www.youtube.com'>YOU TUBE</a>
                   <a href='www.facebook.com'>FACEBOOK</a>
                   <a href='www.instagram.com'>INSTAGRAM</a>



            </div>
        </footer>
    )
}

export default Footer

// frontend/src/components/HomeFooterBar/HomeFooterBar.js

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import css
import './HomeFooterBar.css';

//? HomeFooterBar component
const HomeFooterBar = () => {
  return (
    <div className="outer-footer-container">
      <div className="footer-content-container">
        <div id="DIV_1">
          <span id="SPAN_2">© 2022 Airbnb, Inc.</span>
          <span id="SPAN_3">·</span>
          <a href="" id="A_4">Privacy</a>
          <span id="SPAN_5">·</span>
          <a href="" id="A_6">Terms</a>
          <span id="SPAN_7">·</span>
          <a href="" id="A_8">Sitemap</a>
        </div>
        
        <div id="DIV_2">
          <span>
            
          </span>
        </div>
      </div>
    </div>
  );
};

// export HomeFooterBar
export default HomeFooterBar;

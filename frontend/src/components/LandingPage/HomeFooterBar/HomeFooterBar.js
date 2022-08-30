// frontend/src/components/HomeFooterBar/HomeFooterBar.js

// import css
import './HomeFooterBar.css';

//? HomeFooterBar component
const HomeFooterBar = () => {
  return (
    <div className="outer-footer-container">
      <div className="footer-content-container">
        {/* //? upper div container (map) */}
        <div id="DIV_MAP">
          <button id="inner_div_map_button">
            Show map
            <i className="fa-solid fa-map"></i>
          </button>
        </div>

        {/* //? lower div container (lower) */}
        <div className="lower_div_container">
          
          {/* //? outer lower div 1 */}
          <div id="DIV_1">
            <span className="inner_div_1_content" id="SPAN_2">© 2022 Airbnb, Inc.</span>
            <span className="inner_div_1_content" id="SPAN_3">·</span>
            <span className="inner_div_1_content" id="A_4">Privacy</span>
            <span className="inner_div_1_content" id="SPAN_5">·</span>
            <span className="inner_div_1_content" id="A_6">Terms</span>
            <span className="inner_div_1_content" id="SPAN_7">·</span>
            <span className="inner_div_1_content" id="A_8">Sitemap</span>
          </div>

          {/* //? outer lower div 2 */}
          <div id="DIV_2">
            <div id="inner_div_1">
              <span className="inner_div_1_content">
                {/* globe icon */}
                <i className="fa-solid fa-globe" id="inner_div_1_globe"></i>
              </span>
              <span className="inner_div_1_content">
                {/* Language */}
                English (US)
              </span>
            </div>

            <div id="inner_div_2">
              <span className="inner_div_2_content_a">
                {/* currency */}
                $
              </span>
              <span className="inner_div_2_content_b">
                {/* dollar sign */}
                USD
              </span>
            </div>

            {/* //? outer lower div 3 */}
            <div id="inner_div_3">
              {/* Support & resources */}
              <span className="inner_div_3_content">Support & resources</span>
              <i className="fa-solid fa-angle-up"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export HomeFooterBar
export default HomeFooterBar;

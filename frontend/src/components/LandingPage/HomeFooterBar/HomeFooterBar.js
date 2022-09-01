// frontend/src/components/HomeFooterBar/HomeFooterBar.js

// import react
import { useState } from 'react';

// import css
import './HomeFooterBar.css';

// import context
import { Modal } from '../../../context/Modal';

// import component
import MapModal from './MapModal';

//? HomeFooterBar component
const HomeFooterBar = () => {
  // state for MapModal
  const [showMapModal, setShowMapModal] = useState(false);

  return (
    <div className="outer-footer-container_home">
      <div className="footer-content-container_home">
        {/* //? upper div container (map) */}
        <div id="DIV_MAP_home">
          <button id="inner_div_map_button_home" onClick={_ => setShowMapModal(true)}>
            <span>Show map</span>
            <i className="fa-solid fa-map"></i>
          </button>
        </div>
        {
          // Show Review Modal
          showMapModal
          &&
          <Modal onClose={_ => setShowMapModal(false)}>
            <MapModal />
          </Modal>
        }

        {/* //? lower div container (lower) */}
        <div className="lower_div_container_home">

          {/* //? outer lower div 1 */}
          <div id="DIV_1_home">
            <div id="left_inner_div_1_home">
              <span className="inner_div_1_content_home" id="SPAN_2">© 2022 Airbnb, Inc.</span>
              <span className="inner_div_1_content_home" id="SPAN_3">·</span>
              <span className="inner_div_1_content_home" id="A_4">Privacy</span>
              <span className="inner_div_1_content_home" id="SPAN_5">·</span>
              <span className="inner_div_1_content_home" id="A_6">Terms</span>
              <span className="inner_div_1_content_home" id="SPAN_7">·</span>
              <span className="inner_div_1_content_home" id="A_8">Sitemap</span>
            </div>
          </div>

          {/* //? outer lower div 2 */}
          <div id="DIV_2_home">
            <div id="inner_div_1_home">
              <span className="inner_div_1_content_home">
                {/* globe icon */}
                <i className="fa-solid fa-globe" id="inner_div_1_globe_home"></i>
              </span>
              <span className="inner_div_1_content_home">
                {/* Language */}
                English (US)
              </span>
            </div>

            <div id="inner_div_2_home">
              <span className="inner_div_2_content_a_home">
                {/* currency */}
                $
              </span>
              <span className="inner_div_2_content_b_home">
                {/* dollar sign */}
                USD
              </span>
            </div>

            {/* //? outer lower div 3 */}
            <div id="inner_div_3_home">
              {/* Support & resources */}
              <span className="inner_div_3_content_home">Support & resources</span>
              <i className="fa-solid fa-angle-up up_arrow_home"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export HomeFooterBar
export default HomeFooterBar;

// frontend/src/components/HomeFooterBar/HomeFooterBar.js

// import react
import { useState } from 'react';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import react-redux
import { useSelector } from 'react-redux';

// import css
import './HomeFooterBar.css';

// import context
import { Modal } from '../../../context/Modal';

// import component
import MapModal from './MapModal';

//? HomeFooterBar component
const HomeFooterBar = ({ mapState = false }) => {
  // state for MapModal
  const [showMapModal, setShowMapModal] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="outer-footer-container_home" style={{ zIndex: 100 }}>
      <div className="footer-content-container_home">
        {/* //? upper div container (map) */}
        {
          mapState &&
          <div id="DIV_MAP_home">
            {
              !showMapModal
              &&
              <button id="inner_div_map_button_home" onClick={_ => setShowMapModal(true)}>
                {<span>Show map</span>}
                <i className="fa-solid fa-map"></i>
              </button>
            }
          </div>
        }

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
              <span className="inner_div_1_content_home" id="SPAN_1">© 2022 Airbnb, Inc.</span>
              <span className="inner_div_1_content_home" id="SPAN_3">·</span>
              <span className="inner_div_1_content_home" id="A_4"></span>

              {
                sessionUser ?
                  <NavLink
                    to="/host/homes"
                    className="inner_div_1_content_home"
                  >
                    Host an Experience
                  </NavLink>
                  :
                  <NavLink
                    to="/signup"
                    className="inner_div_1_content_home"
                  >
                    Become a Host
                  </NavLink>
              }
              <span className="inner_div_1_content_home" id="SPAN_5">·</span>
              {/* <span className="inner_div_1_content_home" id="A_6">Log Out</span> */}
              {/* <span className="inner_div_1_content_home" id="SPAN_7">·</span> */}
              {/* <span className="inner_div_1_content_home" id="A_8">Sitemap</span> */}
            </div>
          </div>

          {/* //? outer lower div 2 */}
          <div id="DIV_2_home">
            <div id="inner_div_1_home">
              <span className="inner_div_1_content_home">
                {/* globe icon */}
                <NavLink
                  to="/"
                  className="inner_div_1_content_home external-link-hover"
                  id="SPAN_2"
                  onClick={_ => {
                    return window.open('https://www.linkedin.com/in/chawin-pathompornvivat', '_blank');
                  }}>
                  <i className="fa-brands fa-linkedin fa-xl"></i>
                  <>Visit My LinkedIn</>
                </NavLink>
              </span>
            </div>

            {/* //? outer lower div 3 */}
            <div id="inner_div_3_home external-link-hover">
              <NavLink
                to="/"
                className="inner_div_3_content_home external-link-hover"
                id="SPAN_2"
                onClick={_ => {
                  return window.open('https://github.com/pchawin40/AirBnB', '_blank');
                }}>
                <i className="fa-brands fa-github fa-xl"></i>
                Check Out Readme
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export HomeFooterBar
export default HomeFooterBar;

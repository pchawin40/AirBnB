// import css
import './SpotFooter.css';

//? SpotFooter component
const SpotFooter = () => {

  return (
    <footer className="home-content-footer">

      <section className="home-content-top-footer">

        {/* support */}
        <section className="home-content-footer-support">
          <ul>
            <h4>Support</h4>
            {/* help center */}
            <li>
              Help Center
            </li>

            {/* aircover */}
            <li>
              AirCover
            </li>

            {/* safety information */}
            <li>
              Safety information
            </li>

            {/* supporting people w/ disabilities */}
            <li>
              Supporting people with disabilities
            </li>

            {/* cancellation options */}
            <li>
              Cancellation options
            </li>

            {/* our covid-19 response */}
            <li>
              Our COVID-19 Response
            </li>

            {/* report concern */}
            <li>
              Report a neighborhood concern
            </li>
          </ul>
        </section>

        {/* community */}
        <section className="home-content-footer-community">
          <ul>
            <h4>Community</h4>
            <li>
              Airbnb.org: disaster relief housing
            </li>
            <li>
              Support Afghan refugees
            </li>
            <li>
              Combating discrimination
            </li>
          </ul>

        </section>

        {/* hosting */}
        <section className="home-content-footer-hosting">
          <ul>
            <h4>Hosting</h4>
            <li>
              Try hosting
            </li>
            <li>
              AirCover for Hosts
            </li>
            <li>
              Explore hosting resources
            </li>
            <li>
              Visit our community forum
            </li>
            <li>
              How to host responsibly
            </li>
          </ul>
        </section>

        {/* airbnb */}
        <section className="home-content-footer-airbnb">
          <ul>
            <h4>Airbnb</h4>
            <li>
              Newsroom
            </li>
            <li>
              Learn about new features
            </li>
            <li>
              Letter from our founders
            </li>
            <li>
              Careers
            </li>
            <li>
              Investors
            </li>
            <li>
              Gift cards
            </li>
          </ul>
        </section>
      </section>

      <section className="home-content-lower-footer">

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
              <i className="fa-brands fa-facebook-f"></i>

              <i className="fa-brands fa-twitter"></i>

              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>
        </div>
      </section>
    </footer>

  );
};

// export default SpotFooter
export default SpotFooter;

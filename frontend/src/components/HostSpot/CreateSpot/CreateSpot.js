// import react
import { useState } from 'react';

// import react-redux
import { useDispatch } from 'react-redux';

// import react-router-dom
import { useHistory, NavLink } from 'react-router-dom';

// import store
import * as spotActions from '../../../store/spots';

// import css
import './CreateSpot.css';

//? CreateSpot component
const CreateSpot = () => {

  /**
   * Controlled Inputs:
   * ------------------
   * address: spot's address
   * city: spot's city
   * state: spot's state
   * country: spot's country
   * lat: spot's lat
   * lng: spot's lng
   * name: spot's name
   * description: spot's description
   * price: spot's price
   * previewImage: spot's preview image
   * validationErrors: spot's validation errors
   */
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // const [address, setAddress] = useState("123 Disney Lane");
  // const [city, setCity] = useState("San Francisco");
  // const [state, setState] = useState("California");
  // const [country, setCountry] = useState("United States of America");
  // const [lat, setLat] = useState(37.7645358);
  // const [lng, setLng] = useState(37.7645358);
  // const [name, setName] = useState("App Academy");
  // const [description, setDescription] = useState("'Place where web developers are created");
  // const [price, setPrice] = useState(123);
  // const [previewImage, setPreviewImage] = useState("https://rew-online.com/wp-content/uploads/2019/05/90-fifth-avenue-ny-ny.jpg");
  
  const [validationErrors, setValidationErrors] = useState([]);

  // invoke useDispatch
  const dispatch = useDispatch();

  // invoke history
  const history = useHistory();

  //? handleExitButton: navigate back to home
  const handleExitButton = () => {
    return history.push('/');
  }

  //? handleSubmit: submit create a spot form
  const handleSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();

    // grab data from user's spot inputs
    const spot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage
    }

    // reset spot data after signing up
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setLat("");
    setLng("");
    setName("");
    setDescription("");
    setPrice("");
    setPreviewImage("");

    // dispatch create spot
    return dispatch(spotActions.addASpot(spot)).then(res => {
      return history.push('/');
    }).catch(
      async res => {
        // parse res to data json
        const data = await res.json();

        // set error if any
        if (data) setValidationErrors([data.message]);
      }
    );
  };

  return (
    <>
      <main id="create-page">
        {/* //? Left aside */}
        <aside id="create-left-aside">
          <figure id="create-logo-container">
            <i style={{ zIndex: 1 }} onClick={handleExitButton} className="fa-brands fa-airbnb create-logo-icon"></i>
          </figure>
          {/* airbnb logo */}
          <h1>Describe your spot to host ☺</h1>
        </aside>

        {/* //? Right section */}
        <section id="create-right-section">
          {/* create step */}
          <section className="create-right-text-content">
            
            <form id="create-spot-form" onSubmit={handleSubmit}>
              <ul>
                {
                  validationErrors.map(error => <li key={error}>{error}</li>)
                }
              </ul>

              {/* //? address */}
              <input
                placeholder="Address"
                type="Address"
                onChange={e => setAddress(e.target.value)}
                required
                value={address}
              />

              {/* //? city */}
              <input
                placeholder="City"
                type="City"
                onChange={e => setCity(e.target.value)}
                required
                value={city}
              />

              {/* //? state */}
              <input
                placeholder="State"
                type="state"
                onChange={e => setState(e.target.value)}
                required
                value={state}
              />

              {/* //? country */}
              <input
                placeholder="Country"
                type="country"
                onChange={e => setCountry(e.target.value)}
                required
                value={country}
              />

              {/* //? lat */}
              <input
                placeholder="Lat"
                type="lat"
                onChange={e => setLat(e.target.value)}
                required
                value={lat}
              />

              {/* //? lng */}
              <input
                placeholder="Lng"
                type="lng"
                onChange={e => setLng(e.target.value)}
                required
                value={lng}
              />

              {/* //? name */}
              <input
                placeholder="Name"
                type="name"
                onChange={e => setName(e.target.value)}
                required
                value={name}
              />

              {/* //? description */}
              <input
                placeholder="Description"
                type="description"
                onChange={e => setDescription(e.target.value)}
                required
                value={description}
              />

              {/* //? price */}
              <input
                placeholder="Price"
                type="price"
                onChange={e => setPrice(e.target.value)}
                required
                value={price}
              />

              {/* //? preview image */}
              <input
                placeholder="Preview image"
                type="previewimage"
                onChange={e => setPreviewImage(e.target.value)}
                required
                value={previewImage}
              />

              {/* //? button to submit form */}
              <button className="create-button spot-create" id="right-section-enter-button">
                Host Your Spot
              </button>
            </form>
          </section>
          <button className="create-button spot-exit" id="right-section-exit-button" onClick={handleExitButton}>
            Exit
          </button>
          <section id="create-right-lower-section">
            <li>
              <NavLink to="/host/homes" className="create-button-spot-back">
                Back
              </NavLink>
            </li>
          </section>
        </section>
      </main>
    </>
  );
};

// export component
export default CreateSpot;

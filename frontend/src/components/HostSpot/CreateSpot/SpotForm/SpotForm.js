import { useEffect, useState, useRef } from "react";

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { useHistory, useParams } from "react-router-dom";

// import api
import Autocomplete from "react-google-autocomplete";

// import store
import * as mapActions from '../../../../store/maps';
import * as spotActions from '../../../../store/spots';

// import context
import { useSpot } from "../../../../context/SpotContext";

// import css
import './SpotForm.css';

const SpotForm = ({ spotActivity = "create", currentSpot }) => {
  window.Buffer = window.Buffer || require("buffer").Buffer;

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
   * image: spot's preview images
   * validationErrors: spot's validation errors
   */
  const {
    address, setAddress,
    city, setCity,
    state, setState,
    country, setCountry,
    lat, setLat,
    lng, setLng,
    name, setName,
    description, setDescription,
    price, setPrice,
    locationType, setLocationType
  } = useSpot();

  const [spot, setSpot] = useState("");

  const [image, setImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  // invoke dispatch
  const dispatch = useDispatch();

  // invoke useRef
  const ref = useRef();

  // selector to get api key
  const apiKey = useSelector(mapActions.getMapKey);

  // invoke history
  const history = useHistory();

  // deconstruct spotId (if any)
  let { spotId } = useParams();

  if (!spotId) spotId = 0;

  // load on start up
  useEffect(() => {
    if (spotId) dispatch(spotActions.thunkGetSpots());

    // dispatch maps get api key
    dispatch(mapActions.getKey());
  }, [dispatch, spotId ? spotId : ""]);

  useEffect(() => {
    // if edit form, apply the current spot information
    if (currentSpot) {
      setAddress(currentSpot.address);
      setCity(currentSpot.city);
      setState(currentSpot.state);
      setCountry(currentSpot.country);
      setLat(currentSpot.lat);
      setLng(currentSpot.lng);
      setName(currentSpot.name);
      setDescription(currentSpot.description);
      setPrice(currentSpot.price);
      setImage(currentSpot.previewImage);
      setLocationType(currentSpot.locationType);
      setSpot(currentSpot.address + " " + currentSpot.city + " " + currentSpot.state + " " + currentSpot.country);
    } else {
      // if not editing, set to default value
      setAddress("");
      setCity("");
      setState("");
      setCountry("");
      setLat("");
      setLng("");
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setSpot("");
      setLocationType("");
    }
  }, [currentSpot]);

  //? handleSubmit: submit create a spot form
  const handleSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();

    // grab data from user's spot inputs
    const spot = {
      ...currentSpot ? currentSpot : "",
      address,
      city,
      state,
      country,
      lat: lat ? lat : 37.7645358,
      lng: lng ? lng : 37.7645358,
      name,
      description,
      price,
      locationType,
      previewImage: image
    }

    // reset validation errors
    setValidationErrors([]);

    // reset ref value
    ref.current.value = "";

    history.push('/')

    // dispatch create spot
    return dispatch(
      spotActivity === "create"
        ?
        // if activity is not edit, add the spot
        spotActions.addASpot(spot)
        :
        // otherwise, edit the spot
        spotActions.thunkEditSpot(spot, Number(spotId))
    )
      .then(_ => {
        return dispatch(spotActions.thunkGetSpots())
      })
      .catch(
        async res => {
          // parse res to data json
          const data = await res.json();

          // set error if any
          if (data.errors) setValidationErrors([Object.values(data.errors)]);
          console.log("validationErrors: ", validationErrors.map(error => error.map(error => console.log("error", error))));
        }
      );
  };

  //? updateFile: single file update function
  const updateFile = e => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  //? handleLocationNav: get location when clicked on location icon
  const handleLocationNav = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    // success case: get user's position
    const success = async (pos) => {
      // set coordinate
      const crd = pos.coords;

      // get successful response
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${crd.latitude}&lon=${crd.longitude}&format=json`);

      // if response is ok
      if (res.ok) {
        // turn data into json
        const data = await res.json();

        // set address, city, state, country, lat, lng
        setAddress(data.address.house_number + " " + data.address.road);
        setCity(data.address.town);
        setState(data.address.state);
        setCountry(data.address.country);
        setLat(crd.latitude);
        setLng(crd.longitude);
      }

    }

    // error case
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    // get current position passing in success and failed attempt
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <form id="spot-form" onSubmit={handleSubmit}>
      {/* //? Validation Errors */}
      {
        validationErrors.length > 0
        &&
        <ul className="error-list-container">
          <h3>We found some errors while attempting to create your spot</h3>
          {
            validationErrors.map(error => error.map(error => <li key={error} className="error-list">{error}</li>))
          }
        </ul>
      }

      {/* //? Name */}
      <section id="spot-form-name-section">
        <label htmlFor="name">What is your spot name?</label>
        <input
          id="spot-form-name"
          required
          placeholder=" Enter spot name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </section>

      <section id="spot-form-location-type">
        <label htmlFor="location-type">What is your location type?</label>
        <select
          id="spot-form-location-type"
          name="location-type"
          value={locationType}
          onChange={e => setLocationType(e.target.value)}
        >
          <option value="">--Select Location Type--</option>
          <option value="Stays">Stay</option>
          <option value="Experiences">Experience</option>
        </select>
      </section>

      {/* //? Description */}
      <section id="spot-form-description-section">
        <label htmlFor="description">How would you describe your spot?</label>
        <textarea
          required
          id="spot-form-description"
          placeholder="Enter spot description&#10;&#10;&#10;&#10;"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </section>

      {/* //? Price */}
      <section id="spot-form-price-section">
        <label htmlFor="price">How much does your spot cost per night? (in $USD)</label>
        <input
          id="spot-form-price"
          required
          placeholder=" Enter price per night"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </section>

      {/* //? Preview Image */}
      {/* //* putting ref clears file input upon invalid submission */}
      <section id="spot-form-image">
        <label htmlFor="">Upload your spot's image</label>
        <input
          id="spot-form-image"
          type="file"
          multiple
          ref={ref}
          onChange={updateFile} />
      </section>

      {/* //? Address */}
      <section id="spot-form-address-section">
        <label>Where is your spot located? </label>

        <section id="spot-form-address-inner-section">

          <Autocomplete
            id="spot-form-address"
            apiKey={apiKey}
            defaultValue={spot}
            placeholder="Enter address here"
            required
            // value={spot}
            // onChange={e => setSpot(e.target.value)}
            options={{
              types: ["address"]
            }}
            // onChange={e => setSpot(e.target.value)}
            onPlaceSelected={(place) => {
              const findComponent = keyword =>
                place.address_components.find(component => component.types.includes(keyword));

              const parseComponent = keyword =>
                findComponent(keyword) ? findComponent(keyword).long_name : "";

              // set address
              const street_number = parseComponent("street_number");
              const route = parseComponent("route");

              const selectAddress = street_number + " " + route;
              setAddress(selectAddress);

              // set city
              const selectCity = parseComponent("locality"); // place.address_components[2].long_name;
              setCity(selectCity);

              // set state
              const selectState = parseComponent("administrative_area_level_1"); //
              setState(selectState);

              // set country
              const selectCountry = parseComponent("country");
              setCountry(selectCountry);

              // set lat
              const selectLat = place.geometry.location.lat();
              setLat(selectLat);

              // set lng
              const selectLng = place.geometry.location.lng();
              setLng(selectLng);

              setSpot(place.formatted_address);
            }}
          />

          {/* Get auto location */}
          <figure id="arrow-icon-container">
            <i className="fa-solid fa-location-arrow arrow-icon" onClick={handleLocationNav} />
          </figure>
        </section>
      </section>

      {/* //? Sign Up Button */}
      <button
        id={`spot-form-button-${spotActivity}`}
        className="spot-form-button"
        type="submit"
      >
        Create Your Spot
      </button>
    </form>
  );
};

export default SpotForm;

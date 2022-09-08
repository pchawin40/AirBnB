// import component
import MapContainer from "../../MapContainer";

//? MapModal
const MapModal = ({ setShowMapModal }) => {
  return (
    <>
      {/* //* MapContainer */}
      <MapContainer setShowMapModal={setShowMapModal}/>
    </>
  );
};

// export component
export default MapModal;

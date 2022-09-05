// import component
import ImageProvider from '../../../context/ImageContext';
import Headline from './Headline';
import HomeGallery from './HomeGallery';

//? HeaderSection component
const HeaderSection = ({ spot }) => {
  return (
    <section className="header-section">
      {/* //? Headline */}
      <Headline />

      {/* //? Home Gallery */}
      <ImageProvider>
        <HomeGallery spot={spot} />
      </ImageProvider>
    </section>
  );
};

// export HeaderSection
export default HeaderSection;

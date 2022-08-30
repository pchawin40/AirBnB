// import component
import Headline from './Headline';
import HomeGallery from './HomeGallery';

//? HeaderSection component
const HeaderSection = ({ spot }) => {
  return (
    <section>
      {/* //? Headline */}
      <Headline/>
      
      {/* //? Home Gallery */}
      <HomeGallery spot={spot} />
    </section>
  );
};

// export HeaderSection
export default HeaderSection;

// import component
import Headline from './Headline';
import HomeGallery from './HomeGallery';

//? HeaderSection component
const HeaderSection = () => {
  return (
    <section>
      {/* //? Headline */}
      <Headline/>
      
      {/* //? Home Gallery */}
      <HomeGallery/>
    </section>
  );
};

// export HeaderSection
export default HeaderSection;

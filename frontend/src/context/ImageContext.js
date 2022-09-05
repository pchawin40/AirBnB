import { useState, useContext, createContext } from 'react';

export const ImageContext = createContext();
export const useImage = () => useContext(ImageContext);

export default function ImageProvider({ children }) {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <>
      <ImageContext.Provider
        value={{
          showImageModal, setShowImageModal
        }}
      >
        {children}
      </ImageContext.Provider>
    </>
  );
}

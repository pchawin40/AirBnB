import { useState, useContext, createContext } from 'react';

export const ImageContext = createContext();
export const useImage = () => useContext(ImageContext);

export default function ImageProvider({ children }) {
  const [editImageModal, setEditImageModal] = useState(false);

  return (
    <>
      <ImageContext.Provider
        value={{
          editImageModal, setEditImageModal
        }}
      >
        {children}
      </ImageContext.Provider>
    </>
  );
}

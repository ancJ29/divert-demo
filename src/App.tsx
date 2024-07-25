import { useCallback, useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import {
  CAMERA_PAGE,
  CHECKING_PAGE,
  GALLERY_PAGE,
  HOME_PAGE,
  PAGE_MODES,
  RESULT_PAGE
} from "./constants/page-mode";
import GalleryPage from "./pages/GalleryPage";
import CheckingPage from "./pages/CheckingPage";
import ResultPage from "./pages/ResultPage";
import CameraPage from "./pages/CameraPage";

function App() {
  const [preLoading, setPreLoading] = useState(true);
  const [pageMode, setPageMode] = useState(PAGE_MODES[HOME_PAGE]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMatched, setIsMatched] = useState(false);
  const [isDirectPicture, setIsDirectPicture] = useState(false);

  const correctImages = [1, 2, 3, 8, 9, 10, 11, 12, 17, 18 ];

  const preLoadingContainer = document.getElementById("preLoadingContainer");
  if (preLoadingContainer) {
    setTimeout(() => {
      preLoadingContainer.style.display = "none";
      document.body.classList.remove("overflow-hidden");
      setPreLoading(false);
    }, 2000);
  }

  const pageModeChangeHandler = (mode: number) => {
    setPageMode(mode);
    if (mode === PAGE_MODES[HOME_PAGE] || mode === PAGE_MODES[GALLERY_PAGE]) {
      setIsDirectPicture(false);
    }
  }

  const choosingImageHandler = (imageName: string) => {
    const parts = imageName.split(/\s*-\s*/);
    setSelectedImage(imageName);
    setIsMatched(correctImages.includes(parseInt(parts[parts.length - 1])));
    pageModeChangeHandler(PAGE_MODES[CHECKING_PAGE]);
  }

  const checkingCapturedPicture = useCallback((img: string | null) => {
    if (!img) {
      alert("CAPTURED FAIL");
    } else {
      setSelectedImage(img);
      setIsDirectPicture(true);
      pageModeChangeHandler(PAGE_MODES[CHECKING_PAGE]);
    }
  }, []);

  useEffect(() => {
    if (pageMode === PAGE_MODES[CHECKING_PAGE]) {
      setTimeout(() => {
        pageModeChangeHandler(PAGE_MODES[RESULT_PAGE]);
      }, 1000);
    }
  }, [pageMode])

  return (
    !preLoading && <div className="master-container">
      {
        pageMode === PAGE_MODES[HOME_PAGE]
          && <HomePage onChangePageMode={pageModeChangeHandler} />
      }
      {
        pageMode === PAGE_MODES[CAMERA_PAGE] &&
          <CameraPage
            onBackHome={() => pageModeChangeHandler(PAGE_MODES[HOME_PAGE])}
            onOpenGallery={() => pageModeChangeHandler(PAGE_MODES[GALLERY_PAGE])}
            onCapturePicture={checkingCapturedPicture}
          />
      }
      {
        pageMode === PAGE_MODES[GALLERY_PAGE] &&
          <GalleryPage
            onChangePageMode={pageModeChangeHandler}
            onChooseImage={choosingImageHandler}
          />
      }
      {
        pageMode === PAGE_MODES[CHECKING_PAGE]
          && <CheckingPage isDirectPicture={isDirectPicture} imageName={selectedImage} />
      }
      {
        pageMode === PAGE_MODES[RESULT_PAGE]
          && <ResultPage
            isDirectPicture={isDirectPicture}
            onChangePageMode={pageModeChangeHandler}
            isMatched={isMatched}
            imageName={selectedImage}
          />
      }
    </div>
  )
}

export default App

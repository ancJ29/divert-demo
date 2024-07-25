import { Container } from "@mantine/core";
import ContainerWithBgImg from "../components/ContainerWithBgImg";
import { IconBolt, IconBoltOff, IconCircleX, IconLayout2, IconRotateDot } from "@tabler/icons-react";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useWindowSize } from "@uidotdev/usehooks";
import { FACING_MODE_ENVIRONMENT, FACING_MODE_USER } from "../constants/camera-mode";
import { useTorchLight } from "@blackbox-vision/use-torch-light";
import { isAndroid, isChrome, isMobile } from "react-device-detect";

export default function CameraPage({
  onBackHome,
  onOpenGallery,
  onCapturePicture,
}: {
  onBackHome: () => void;
  onOpenGallery: () => void;
  onCapturePicture: (img: string | null) => void;
}) {
  //const [isFlashActive, setIsFlashActive] = useState(false);
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

  const webcamRef = useRef<Webcam>(null);
  const size = useWindowSize();
  const isLandscape = size.height && size.width && size.height <= size.width;
  const ratio = size.height && size.width
    ? (isLandscape ? size.width / size.height : size.height / size.width)
    : 1;

  const [isFlashActive, setIsFlashActive] = useTorchLight(webcamRef.current);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current && webcamRef.current.getScreenshot();
    onCapturePicture(imageSrc);
  }, [webcamRef, onCapturePicture]);

  const renderedFlashButton = () => {
    return isFlashActive
    ? <IconBolt className="h-12 w-12" onClick={() => toggleFlash()} />
    : <IconBoltOff className="h-12 w-12" onClick={() => toggleFlash()} />
  }

  const toggleFlash = () => {
    setIsFlashActive();
  }

  const switchCameraHandler = useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);

  return  (
    <ContainerWithBgImg>
      <div className="fixed flex items-center justify-center inset-0 w-full h-full z-10">
        { size.height && size.width && <Webcam
            height={size.height}
            width={size.width > 768 ? 768 : size.width}
            screenshotFormat="image/jpeg"
            videoConstraints={{facingMode, aspectRatio: ratio}}
            ref={webcamRef}
          />
        }
      </div>

      <Container className="flex flex-col justify-between min-h-svh w-full z-20">
        <Container px={0} className="flex items-center justify-between w-full py-4 text-white">
          <IconCircleX className="h-12 w-12" onClick={onBackHome} />
          <IconRotateDot className="h-12 w-12" onClick={() => switchCameraHandler()} />
        </Container>
        <Container px={0} className="relative flex items-center justify-between w-full py-12 text-white">
          <IconLayout2 className="h-12 w-12" onClick={onOpenGallery} />
          <div className="photo-button" onClick={() => capture()}>
            <div className="circle"></div>
            <div className="ring"></div>
          </div>
          {
            isAndroid && isChrome && isMobile
              ? renderedFlashButton()
              : <span className="h-12 w-12" />
          }
        </Container>
      </Container>
    </ContainerWithBgImg>
  );
}

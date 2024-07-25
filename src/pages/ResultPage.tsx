import { Button, Center, Container } from "@mantine/core";
import { IconPhotoCancel, IconPhotoCheck } from "@tabler/icons-react";
import { HOME_PAGE, PAGE_MODES } from "../constants/page-mode";
import { useState } from "react";
import Modal from "../components/Modal";

export default function ResultPage({
  isMatched,
  isDirectPicture,
  imageName,
  onChangePageMode
}: {
  isMatched: boolean;
  isDirectPicture: boolean;
  imageName: string | null;
  onChangePageMode: (mode: number) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const actionBar = (
    <div className="w-full pb-2">
      <Button
        variant="filled"
        radius="xl"
        size="md"
        fullWidth
        onClick={handleClose}
      >OK</Button>
    </div>
  );
  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <Container px={0} className="flex flex-col w-full gap-4 pb-8">
        {
          imageName &&
            <Center>
              <div
                className="w-36 h-[9rem] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: isDirectPicture
                  ? `url(${imageName})`
                  : `url(../public/images/${imageName}.jpg)`
                }}
              />
            </Center>
        }
        <span className="text-xl text-center font-bold">Name Product</span>
        <Container px={0} className="flex flex-col w-full gap-4">
          <div className="flex justify-between items-center w-full border-b">
            <span className="w-28">Part Area</span>
            <span className="flex-grow font-bold">Part Area</span>
          </div>
          <div className="flex justify-between items-center w-full border-b">
            <span className="w-28">Part No</span>
            <span className="flex-grow font-bold">Part No</span>
          </div>
          <div className="flex justify-between items-center w-full border-b">
            <span className="w-28">Stock</span>
            <span className="flex-grow font-bold">5</span>
          </div>
        </Container>
      </Container>
    </Modal>
  );

  return (
    <>
      <Container className="flex flex-col relative items-center h-screen w-full pt-8 pb-28">
        { (isMatched || isDirectPicture) && <>
            <Center className="h-24 w-24 bg-green-800 rounded-full text-white p-4">
              <IconPhotoCheck className="h-12 w-12" />
            </Center>
            <span className="text-xl text-center my-4">There is one product<br />matching</span>
            <Container px={0} className="inline-flex justify-between w-full rounded-lg shadow-xl">
              {
                imageName &&
                  <div
                    className="w-36 min-h-[9rem] h-full bg-cover bg-center rounded-l-lg"
                    style={{ backgroundImage: isDirectPicture
                      ? `url(${imageName})`
                      : `url(../public/images/${imageName}.jpg)`
                    }}
                  />
              }
              <div className="flex flex-col flex-grow gap-2 py-4 xs:px-8 px-4 rounded-r-lg">
                <span className="text-xl font-bold">Name Product</span>
                <div>Stock: <span className="font-bold">5</span></div>
                <Button
                  variant="filled"
                  radius="xl"
                  size="md"
                  fullWidth
                  onClick={handleClick}
                >
                  Detail
                </Button>
              </div>
            </Container>
          </>
        }
        { !isMatched && !isDirectPicture && <>
            <Center className="h-24 w-24 bg-red-800 rounded-full text-white p-4">
              <IconPhotoCancel className="h-12 w-12" />
            </Center>
            <span className="text-xl text-center mt-4">There is no one product<br />matching</span>
          </>
        }
        <div className="flex items-center w-full absolute left-0 bottom-0 pb-8 px-4">
          <Button
            variant="default"
            radius="xl"
            size="lg"
            fullWidth
            onClick={() => onChangePageMode(PAGE_MODES[HOME_PAGE])}
          >
            Cancel
          </Button>
        </div>
      </Container>
      { showModal && modal }
    </>
  );
}

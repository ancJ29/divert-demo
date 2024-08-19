import { Container } from "@mantine/core";
import { IconHomeFilled } from '@tabler/icons-react';
import { HOME_PAGE, PAGE_MODES } from "../constants/page-mode";
import { useState } from "react";
import { generateUUID } from "../utils/StringUtils";
import GalleryItem from "../components/GalleryItem";
import GalleryActionBar from "../components/GalleryActionBar";

export default function GalleryPage({
  onChangePageMode,
  onChooseImage,
}: {
  onChangePageMode: (mode: number) => void;
  onChooseImage: (imageName: string) => void;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 12;
  const totalRecords = 30; // MEMO: hardcore for prototype
  const totalPages = Math.ceil(totalRecords/limit);

  const renderImages = (rowIndex: number) => {
    return [...Array(3)].map((_, index: number) => {
      const order = ((index+1)+(rowIndex*3))+(currentPage*limit);
      const imageName = `product-${String(order%5 + 1).padStart(2, '0')}`;
      return order <= totalRecords
        ? <GalleryItem
            key={generateUUID()}
            imageName={imageName}
            onChooseImage={onChooseImage}
          />
        : undefined
    }).filter((el) => !!el)
  }

  const renderedMansory = [...Array(Math.ceil(limit/3))].map((_, index: number) => {
    return <div key={generateUUID()} className="grid gap-4">
      { renderImages(index) }
    </div>
  });

  const prevHandler = () => {
    return currentPage > 0 ? setCurrentPage(currentPage - 1) : 0;
  }

  const nextHandler = () => {
    return currentPage < (totalPages - 1) ? setCurrentPage(currentPage + 1) : (totalPages - 1);
  }

  return (
    <Container className="h-screen w-full py-4">
      <Container px={0} className="mb-4">
        <IconHomeFilled onClick={() => onChangePageMode(PAGE_MODES[HOME_PAGE])} />
      </Container>
      <GalleryActionBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevClick={() => prevHandler()}
        onNextClick={() => nextHandler()}
      />
      <Container px={0}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6">
          { renderedMansory }
        </div>
      </Container>
    </Container>
  )
}

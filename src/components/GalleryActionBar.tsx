import { Container } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function GalleryActionBar({
  currentPage,
  totalPages,
  onPrevClick,
  onNextClick,
}: {
  currentPage: number;
  totalPages: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}) {
  return (
    <Container px={0} className="inline-flex items-center justify-between w-full mb-4">
      <span className="w-4 h-4">
        { currentPage > 0 && <IconChevronLeft onClick={onPrevClick} /> }
      </span>
      <span className="font-bold text-2xl">Images</span>
      <span className="w-4 h-4">
        { currentPage < (totalPages - 1) && <IconChevronRight onClick={onNextClick} /> }
      </span>
    </Container>
  )
}

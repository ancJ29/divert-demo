import { Button, Center } from "@mantine/core";
import { CAMERA_PAGE, GALLERY_PAGE, PAGE_MODES } from "../constants/page-mode";
import { generateUUID } from "../utils/StringUtils"
import ContainerWithBgImg from "../components/ContainerWithBgImg";

export default function HomePage({
  onChangePageMode
}: {
  onChangePageMode: (mode: number) => void;
}) {
  const renderedButtons = [
    { label: 'Take Picture', pageMode: CAMERA_PAGE, variant: "filled" },
    { label: 'Choode Picture', pageMode: GALLERY_PAGE, variant: "default" },
  ].map((el) => {
    return (
      <Button
        key={generateUUID()}
        variant={el.variant}
        radius="xl"
        size="lg"
        fullWidth
        onClick={() => onChangePageMode(PAGE_MODES[el.pageMode])}
      >
        { el.label }
      </Button>
    )
  })

  return (
    <ContainerWithBgImg>
      <Center className="flex-col gap-4 w-60">
        { renderedButtons }
      </Center>
    </ContainerWithBgImg>
  );
}

import { Center } from "@mantine/core";
import { IconRotateClockwise } from "@tabler/icons-react";
import ContainerWithBgImg from "../components/ContainerWithBgImg";

export default function CheckingPage({
  imageName,
  isDirectPicture,
}: {
  imageName: string | null;
  isDirectPicture: boolean;
}) {
  return (
    <ContainerWithBgImg>
      {
        imageName &&
        <Center className="flex flex-col bg-white rounded-md p-4 w-10/12 gap-4">
          <img
            className="h-auto max-w-full w-8/12 rounded-lg border border-b rounded-md"
            src={isDirectPicture ? imageName : `../images/${imageName}.jpg`}
            alt={imageName}
          />
          <IconRotateClockwise className="w-10 h-10 animate-spin" />
          <Center className="flex flex-col">
            <span className="font-bold text-2xl">Processing</span>
            <span className="font-bold text-blue-500">Check with Database!</span>
          </Center>
        </Center>
      }
    </ContainerWithBgImg>
  );
}

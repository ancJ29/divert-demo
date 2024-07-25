import { Center } from "@mantine/core";

export default function ContainerWithBgImg({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Center className="h-screen w-full relative">
      <div className="home-container-bg-img"></div>
      <div className="home-container-bg-color"></div>
      { children }
    </Center>
  );
}

import Image from "next/image";
import { getImage } from "~/server/quires";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  return <Image src={image.url} width={480} height={480} alt={image.name} />;
}

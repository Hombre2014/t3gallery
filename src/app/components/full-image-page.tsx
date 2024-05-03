import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { deleteImage, getImage } from "~/server/quires";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  const idAsNumber = Number(props.id);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img
          src={image.url}
          alt={image.name}
          className="flex-shrink object-contain"
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="p-2">
          <div>Uploaded by:</div>
          <div>{uploaderInfo.username}</div>
        </div>
        <div className="p-2">
          <div>Created on:</div>
          <div>{image.createdAt.toLocaleDateString()}</div>
        </div>
        <div className="p-2">
          <form
            action={async () => {
              "use server";

              await deleteImage(idAsNumber);
            }}
          >
            <Button variant="destructive" type="submit">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

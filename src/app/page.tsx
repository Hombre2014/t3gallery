import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/7734ab09-3d96-4ed0-b395-8792fa2c5ffd-jracoh.png",
  "https://utfs.io/f/b9725cf0-3859-47b1-8b02-6823b9896454-jracog.png",
  "https://utfs.io/f/ca2169ed-7d23-4681-9bae-058220027a08-jracoi.png",
  "https://utfs.io/f/9d0d799a-5895-43e0-a27e-4832a488602f-jracof.png",
];

const mockImages = mockUrls.map((url, index) => {
  return {
    id: index + 1,
    url,
  };
});

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id} className="w-48">
            {post.name}
          </div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
      <h1>Hello, Gallery is in progress!</h1>
    </main>
  );
}

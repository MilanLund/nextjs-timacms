import client from "@/tina/__generated__/client";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

interface NewsProps {}

interface Post {
  title: string;
  slug: string;
  date: string;
  body: TinaMarkdownContent;
}

export async function NewsComponent(props: NewsProps): Promise<JSX.Element> {
  const postsResponse = await client.queries.postConnection();
  const posts: Post[] = postsResponse.data.postConnection.edges
    ?.map((post) => {
      if (!post?.node) {
        return undefined;
      }

      const item: Post = {
        slug: post?.node?._sys.filename,
        title: post?.node?.title,
        date: post?.node?.date,
        body: post?.node?.body,
      };

      return item;
    })
    .filter((post) => post !== undefined) as Post[];

  return (
    <div>
      {posts.map((post, index) => {
        return (
          <div key={index}>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <TinaMarkdown content={post.body} />
          </div>
        );
      })}
    </div>
  );
}

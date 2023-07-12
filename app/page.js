import { fetchAPI } from "./assets/helpers/fetchAPI";
import PageBuilder from "./components/PageBuilder";
export default async function Home() {
  const { data: articles } = await fetchAPI("articles", {
    populate: { featured_image: true },
  });
  const { data: home } = await fetchAPI("home", {
    populate: {
      pagebuilder: {
        populate: { article: { populate: { featured_image: true } } },
      },
    },
  });

  return (
    <main>
      <PageBuilder
        components={home?.attributes?.pagebuilder}
        blogs={articles}
      />
    </main>
  );
}

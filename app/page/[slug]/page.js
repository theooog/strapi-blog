import { notFound } from "next/navigation";
import { fetchAPI } from "../../assets/helpers/fetchAPI";
import PageBuilder from "../../components/PageBuilder";
export default async function page({ params }) {
  const slug = params?.slug;
  const { data: pages } = await fetchAPI("pages", {
    filters: {
      slug: slug,
    },
    populate: {
      pagebuilder: {
        populate: { article: { populate: { featured_image: true } } },
      },
    },
  });
  if (pages.length === 0 || !pages || pages.length > 1) {
    return notFound();
  }
  const page = pages[0];
  return (
    <main>
      <div className="mt-10">
        <h1>{page?.attributes?.Name}</h1>
        <PageBuilder components={page?.attributes?.pagebuilder} />
      </div>
    </main>
  );
}

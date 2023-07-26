import { fetchAPI } from "../assets/helpers/fetchAPI";
import BlogList from "../components/Lists/BlogList";
import Dropdown from "../components/Dropdown/Dropdown";
export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};
const page = async ({ searchParams }) => {
  const { data: articles } = await fetchAPI("articles", {
    populate: "*",
    filters: {
      categories: {
        value: {
          $in: searchParams?.category,
        },
      },
    },
  });

  const { data: categories } = await fetchAPI("categories", {
    populate: "*",
  });
  return (
    <div className="mt-10">
      <Dropdown categories={categories} />
      <BlogList blogs={articles} />
    </div>
  );
};

export default page;

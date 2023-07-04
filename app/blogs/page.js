import { fetchAPI } from "../assets/helpers/fetchAPI";
import BlogList from "../components/Lists/BlogList";
import Dropdown from "../components/Dropdown/Dropdown";
const page = async ({ searchParams }) => {
  const articles = await fetchAPI("articles", {
    populate: "*",
    filters: {
      categories: {
        value: {
          $in: searchParams?.category,
        },
      },
    },
  });

  const categories = await fetchAPI("categories", {
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

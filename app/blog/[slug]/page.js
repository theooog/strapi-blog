import { fetchAPI } from "@/assets/helpers/fetchAPI";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { getMedia } from "@/assets/helpers/getMedia";
import { sanitize } from "isomorphic-dompurify";
import { marked } from "marked";
import RelevantArticles from "../../components/RelevantArticles/RelevantArticles";
import AuthorCard from "../../components/Cards/AuthorCard";

export async function generateMetadata({ params }) {
  const { data: articleData } = await fetchAPI("articles", {
    filters: {
      slug: { $eq: params?.slug },
    },
    populate: {
      featured_image: 1,
      categories: 1,
      writer: {
        populate: "*",
      },
    },
  });

  const writer = articleData[0]?.attributes?.writer?.data;
  if (articleData.length !== 1) {
    return notFound();
  }
  const article = articleData[0];
  const attr = article?.attributes;

  return {
    title: attr?.title,
    description:
      attr?.description.length > 150
        ? attr?.description.slice(0, 150) + "..."
        : attr?.description,
    openGraph: {
      images: [getMedia(attr?.featured_image, "medium")?.url],
    },
    creator: writer?.attributes?.name,
  };
}

const page = async ({ params }) => {
  const { data: articleData } = await fetchAPI("articles", {
    filters: {
      slug: { $eq: params?.slug },
    },
    populate: {
      featured_image: 1,
      categories: 1,
      writer: {
        populate: "*",
      },
    },
  });

  const writer = articleData[0]?.attributes?.writer?.data;
  if (articleData.length !== 1) {
    return notFound();
  }

  const article = articleData[0];
  const attr = article?.attributes;
  const categories = attr?.categories?.data;
  const getDescription = (text) => {
    const sanitizeDescription = sanitize(text);
    const formattedDescription = marked(sanitizeDescription);
    return { __html: formattedDescription };
  };
  const description = getDescription(attr?.description);
  return (
    <div className="mt-10 lg:mt-20">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-6">
        <div className="lg:col-span-10">
          <h1 className="mb-2">{attr?.title}</h1>
          <span>
            <em>{dayjs(attr?.createdAt).format("MMMM DD, YYYY")}</em>
          </span>
          <div>
            {categories.map((cat) => {
              return (
                <Link
                  key={cat?.attributes?.value}
                  href={"/category/" + cat?.attributes?.value}
                >
                  <span className="text-primary hover:border-b-2 font-bold me-3">
                    {cat?.attributes?.label}
                  </span>
                </Link>
              );
            })}
          </div>
          <Image
            className="my-6"
            src={getMedia(attr?.featured_image, "medium")?.url}
            alt={getMedia(attr?.featured_image, "medium")?.alt}
            width={800}
            height={500}
          />
          <div dangerouslySetInnerHTML={description}></div>
          <div className="mt-16">
            <AuthorCard
              name={writer?.attributes?.name}
              bio={writer?.attributes?.bio}
              imageALT={
                getMedia(writer?.attributes?.profile_image, "thumbnail")?.alt
              }
              imageURL={
                getMedia(writer?.attributes?.profile_image, "thumbnail")?.url
              }
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <RelevantArticles categories={categories} />
      </div>
    </div>
  );
};

export default page;

import FeaturedCard from "./components/Cards/FeaturedCard";
import BlogList from "./components/Lists/BlogList";
export default function Home() {
  return (
    <main>
      <FeaturedCard
        title={"Blog example"}
        description={
          "this is a blog example.this is a blog examplethis is a blog examplethis is a blog examplethis is a blog examplethis is a blog example"
        }
        imageURL={"https://i.imgur.com/Vbsk7t5.jpeg"}
        imageALT={"Robot art image"}
        url={"/"}
      />
      <BlogList title={"Recent articles"} />
    </main>
  );
}

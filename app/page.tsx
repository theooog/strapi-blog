import Image from "next/image";
import FeaturedCard from "./components/Cards/FeaturedCard";
import BlogCard from "./components/Cards/BlogCard";
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
    </main>
  );
}

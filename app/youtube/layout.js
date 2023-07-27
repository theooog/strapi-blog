import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children, context }) {
  const token = cookies().get("authToken");

  let user;
  if (token?.value) {
    const userData = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    user = await userData.json();
  }

  if (!user?.id) {
    redirect("/login");
  }

  return <div>{children}</div>;
}

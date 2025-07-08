import HomePage from "@/component/home-page";

export default function Home() {
  return <HomePage />;
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return {
    title:
      locale === "en"
        ? "Your Amazing Product | Landing Page"
        : "Sản phẩm tuyệt vời của bạn | Trang đích",
    description:
      locale === "en"
        ? "Welcome to your amazing product landing page"
        : "Chào mừng đến với trang đích sản phẩm tuyệt vời của bạn",
  };
}

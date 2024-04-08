import Header from "./components/header";
import Slider from "./components/slider";

export default function Home() {
  const images = [
    "/women/zara1.jpg",
    "/women/zara2.jpg",
    "/women/zara3.jpg",
    "/women/zara4.jpg",
    "/women/zara5.jpg",
    "/women/zara6.jpg",
    "/women/zara7.jpg",
    "/women/zara8.jpg",
    "/women/zara9.jpg",
  ];

  const data = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    url: images[index],
  }));

  return (
    <main className="w-full h-screen bg-green-400 overflow-hidden">
      <Header />
      <Slider data={data} />
    </main>
  );
}

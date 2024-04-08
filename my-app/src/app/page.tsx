import Slider from "./slider";

export default function Home() {
  const data = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  }));

  return (
    <main className="w-full h-screen bg-green-400 overflow-hidden">
      <Slider data={data} />
    </main>
  );
}

import { AppBar } from "@/components/AppBar";
import { Hero } from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <AppBar/>
      <Hero/>
      {/* <HeroVideo/> */}
      </main>
  );
}

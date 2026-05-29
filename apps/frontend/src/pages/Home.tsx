import { PainPoint } from "@/components/home/PainPoint";
import { Hero } from "../components/home/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { Logo } from "@/components/home/Logo";
import { SaveItems } from "@/components/home/SaveItems";

export function Home() {
  return (
    <div className="flex flex-col mx-4 mt-20 items-center max-w-6xl mx-auto gap-16">
      <div className="self-start">
        <Logo />
      </div>
      <Hero />
      <div className="border-b-2 w-full mt-4"></div>
      <PainPoint />
      <div className="border-b-2 w-full mt-4"></div>
      <Capabilities />
      <div className="border-b-2 w-full mt-4"></div>
      <SaveItems/>
      <div className="border-b-2 w-full mt-4"></div>
    </div>
  );
}

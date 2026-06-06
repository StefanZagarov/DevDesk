import { PainPoint } from "@/components/home/PainPoint";
import { Hero } from "../components/home/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { SaveItems } from "@/components/home/SaveItems";
import { CallToAction } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { Separator } from "@/components/home/Separator";
import { NavBar } from "@/components/home/NavBar";

export function Home() {
  return (
    <div className="flex flex-col items-center max-w-6xl mx-auto gap-16">
      <NavBar />
      <Hero />
      <Separator />

      <PainPoint />
      <Separator />

      <Capabilities />
      <Separator />

      <SaveItems />
      <Separator />

      <CallToAction />
      <Separator />

      <Footer />
    </div>
  );
}

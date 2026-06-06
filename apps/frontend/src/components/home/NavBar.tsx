import { Button } from "../ui/button";
import { Separator } from "./Separator";
import { Logo } from "../ui/Logo";

export function NavBar() {
  return (
    <nav className="w-full sticky pt-5 top-0 bg-background/40 backdrop-blur-md">
      <div className="flex justify-between items-center pb-5">
        <Logo />
        <Button>Get started --{">"}</Button>
      </div>
      <Separator />
    </nav>
  );
}

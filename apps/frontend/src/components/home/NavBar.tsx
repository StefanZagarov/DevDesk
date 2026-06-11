import { Button } from "../ui/button";
import { Separator } from "./Separator";
import { Logo } from "../ui/Logo";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full sticky pt-5 top-0 bg-background/40 backdrop-blur-md">
      <div className="flex justify-between items-center pb-5">
        <Logo />
        <Button onClick={() => navigate("/workspace-main")}>Get started --{">"}</Button>
      </div>
      <Separator />
    </nav>
  );
}

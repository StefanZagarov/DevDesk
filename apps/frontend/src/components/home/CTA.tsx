import { LibraryBig } from "lucide-react";
import { Button } from "../ui/button";

// Call to action section - quote and a button to start using the app - register page
export function CallToAction() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-semibold text-center mb-3">
        Your second brain,
        <br /> built for devs.
      </h1>
      <p className="mb-6">Free to start. No credit card required.</p>

      <Button className="p-6">
        <LibraryBig />
        Create your Desk
      </Button>
    </div>
  );
}

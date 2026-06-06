import { CircleUserRound, Plus, Sun } from "lucide-react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";

export function Topbar() {
  return (
    <div className="flex border-b p-2 h-[--header-height] items-center bg-sidebar px-4 justify-between">
      <div className="flex items-center gap-6">
        <SidebarTrigger />
        <div className="relative">
          <Input className="w-85 pr-26" placeholder="Search resources..." />
          <kbd className="absolute background bg-sidebar w-fit whitespace-nowrap left-60 top-[6px] px-2 rounded-xl cursor-default select-none">
            CTRL + K
          </kbd>
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="px-4">
          <Plus /> New
        </Button>
        <Button
          variant="outline"
          className="border rounded-full border-chart-2"
        >
          <Sun />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:opacity-80">
              <Avatar>
                {/* <AvatarImage src={user.image} /> */}
                <AvatarFallback>
                  <CircleUserRound />
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end"></DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

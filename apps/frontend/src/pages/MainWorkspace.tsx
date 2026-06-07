import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/workspace/AppSidebar";
import { CardsPanel } from "@/components/workspace/CardsPanel";
import { Topbar } from "@/components/workspace/Topbar";

export function MainWorkspace() {
  return (
    <SidebarProvider className="flex-col [--header-height:3.3rem]">
      <Topbar />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex flex-1 flex-col">
          <CardsPanel />
        </main>
      </div>
    </SidebarProvider>
  );
}

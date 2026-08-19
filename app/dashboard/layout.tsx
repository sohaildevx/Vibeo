import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllPlaygroundForUser } from "@/modules/dashboard/actions";
import { DashboardSidebar } from "@/app/dashboard/page";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const playgroundData = await getAllPlaygroundForUser();

  const technologyIconMap: Record<string, string> = {
    REACT: "Zap",
    NEXTJS: "Lightbulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "FlameIcon",
    ANGULAR: "Terminal",
  };

  const formatedPlayGroundData = playgroundData?.map((item)=>({
    id:item.id,
    name:item.title,
    icon:technologyIconMap[item.template] || "Code2",
    starred: false
  }))

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar initialPlaygroundData={formatedPlayGroundData ?? []}/>
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}

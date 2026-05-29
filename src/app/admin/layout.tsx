import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export const metadata = {
  title: "Admin | Khurli Jumamuratova",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col pl-64">
        <AdminTopbar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

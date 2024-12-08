import Navbar from "@/components/navbar/navar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </>
  )
}

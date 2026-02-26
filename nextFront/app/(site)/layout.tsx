
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="body-con">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
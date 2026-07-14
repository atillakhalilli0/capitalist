import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsTicker from "@/components/home/NewsTicker";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <>
      <Header />
      <NewsTicker />
      <main>{children}</main>

      <Footer />
    </>
  );
}
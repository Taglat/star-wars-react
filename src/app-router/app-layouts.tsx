import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import Layout from "@/components/layout/layout";
import { Navbar } from "@/components/navbar/navbar";


export function PrivateLayout() {
  return <Layout headerSlot={<Header />} footerSlot={<Footer />} navbarSlot={<Navbar />} />;
}

export function PublicLayout() {
  return <Layout headerSlot={<Header />} footerSlot={<Footer />} />;
}

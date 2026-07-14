import Link from "next/link";
import Container from "./Container";
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { ArrowUpRight, Rss } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-border bg-card/60 transition-colors duration-300">
      <Container>
        {/* Top Part */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 border-b border-border/80">
          <div className="space-y-6">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter text-foreground"
            >
              <span className="text-accent">KAPİTALİST</span>
            </Link>

            <p className="text-sm leading-7 text-muted-foreground font-sans">
              Azərbaycanın regional və qlobal iqtisadiyyat, maliyyə, biznes, texnologiya və startap ekosistemini təhlil edən media platforması.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors"
                aria-label="Twitter/X"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors"
                aria-label="Github"
              >
                <FaGithub className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors"
                aria-label="RSS Feed"
              >
                <Rss className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Kateqoriyalar
            </h3>

            <ul className="space-y-4 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
              <li>
                <Link href="/biznes" className="hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors">Biznes</Link>
              </li>
              <li>
                <Link href="/maliyye" className="hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors">Maliyyə</Link>
              </li>
              <li>
                <Link href="/iqtisadiyyat" className="hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors">İqtisadiyyat</Link>
              </li>
              <li>
                <Link href="/startap" className="hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors">Startap</Link>
              </li>
              <li>
                <Link href="/texnologiya" className="hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors">Texnologiya</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Platforma
            </h3>

            <ul className="space-y-4 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
              <li>
                <Link href="/haqqimizda" className="hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors">Haqqımızda</Link>
              </li>
              <li>
                <Link href="/elaqe" className="hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors">Əlaqə</Link>
              </li>
              <li>
                <Link href="/podcast" className="hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors">Podcast</Link>
              </li>
              <li>
                <Link href="/axtaris" className="hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors">Axtarış</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Gündəlik Bülleten
            </h3>

            <p className="text-sm leading-6 text-muted-foreground">
              Hər sabah ən önəmli iqtisadi analitika və xəbərləri birbaşa poçt qutunuzda əldə edin.
            </p>

            <Link
              href="/#abune"
              className="inline-flex w-full items-center justify-between rounded-md border border-accent/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-accent hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors"
            >
              Newsletter-ə qoşul
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Part */}
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-mono text-muted-foreground">
            © {new Date().getFullYear()} KAPİTALİST MEDIA. Bütün hüquqlar qorunur.
          </p>

          <div className="flex gap-8 text-xs font-mono text-muted-foreground">
            <Link href="#" className="hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors">Gizlilik Siyasəti</Link>
            <Link href="#" className="hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors">Şərtlər</Link>
            <Link href="#" className="hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors">Cookies</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
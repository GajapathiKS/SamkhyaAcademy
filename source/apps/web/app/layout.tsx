import "./globals.css";
import "./reference.css";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { BrandMark } from "@/components/BrandMark";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "SamkhyaAcademy",
  description:
    "A learning platform for software, AI, enterprise technology, deep tech and leadership programs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <header className="nav reference-nav">
          <div className="shell">
            <Link href="/" className="brand" aria-label="SamkhyaAcademy home">
              <span className="brand-mark">
                <BrandMark />
              </span>
              <span className="brand-word">
                Samkhya<span>Academy</span>
                <small>A Samkhya Technologies Initiative</small>
              </span>
            </Link>
            <nav className="links" aria-label="Primary navigation">
              <Link href="/courses">Courses⌄</Link>
              <Link href="/learning-paths">Learning Paths⌄</Link>
              <Link href="/programs">Programs⌄</Link>
              <Link href="/webinars">Webinars</Link>
              <Link href="/organizations">For Organizations⌄</Link>
              <Link href="/resources">Resources⌄</Link>
              <Link href="/about">About</Link>
            </nav>
            <div className="nav-actions">
              <Link href="/login" className="btn nav-login">
                Log In
              </Link>
              <Link href="/courses" className="btn primary">
                Get Started
              </Link>
            </div>
          </div>
        </header>
        {children}
        <footer className="site-footer reference-footer">
          <div className="shell footer-grid">
            <div>
              <Link href="/" className="brand footer-brand">
                <span className="brand-mark">
                  <BrandMark />
                </span>
                <span className="brand-word">
                  Samkhya<span>Academy</span>
                  <small>A Samkhya Technologies Initiative</small>
                </span>
              </Link>
              <p>
                Applied learning for engineers, leaders, teams and founders -
                from foundations to measurable outcomes.
              </p>
            </div>
            <div>
              <strong>Explore</strong>
              <Link href="/courses">Courses</Link>
              <Link href="/learning-paths">Learning paths</Link>
              <Link href="/programs">Programs</Link>
              <Link href="/webinars">Webinars</Link>
            </div>
            <div>
              <strong>For organizations</strong>
              <Link href="/organizations">Team learning</Link>
              <Link href="/org-admin">Organization portal</Link>
              <Link href="/entrepreneurship">Venture Builder</Link>
            </div>
            <div>
              <strong>Support</strong>
              <Link href="/resources">Resources</Link>
              <Link href="/certificates">Verify certificate</Link>
              <Link href="/about">About</Link>
              <Link href="/login">Sign in</Link>
            </div>
            <div>
              <strong>Stay current</strong>
              <p>
                Program updates, learning resources and webinar announcements.
              </p>
              <div className="footer-subscribe">
                <span>Email address</span>
                <b>→</b>
              </div>
            </div>
          </div>
          <div className="shell footer-bottom">
            © 2026 SamkhyaAcademy{" "}
            <span>Privacy · Terms · Responsible learning</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

import Link from "next/link";

/**
 * ============================================================
 * Footer 
 * ============================================================
 * Description:
 * A responsive footer replicating the Apple website’s layout.
 * Uses CSS variables for color theming and structured organization
 * with semantically clear section groups and accessibility considerations.
 *
 * Features:
 * - Responsive grid layout with multiple informational sections
 * - Structured JSON LD data for SEO
 * - Reusable color theme integration using CSS variables
 * - Adaptive design with modern Tailwind utility classes
 */

export default function Footer() {
  const sections = [
    {
      title: "Shop and Learn",
      links: [
        "Store", "Mac", "iPad", "iPhone", "Watch", "Vision", "AirPods",
        "TV & Home", "AirTag", "Accessories", "Gift Cards",
      ],
    },
    {
      title: "Apple Wallet",
      links: ["Wallet", "Apple Card", "Apple Pay", "Apple Cash"],
    },
    {
      title: "Account",
      links: [
        "Manage Your Apple Account", "Apple Store Account", "iCloud.com",
      ],
    },
    {
      title: "Entertainment",
      links: [
        "Apple One", "Apple TV+", "Apple Music", "Apple Arcade",
        "Apple Fitness+", "Apple News+", "Apple Podcasts",
        "Apple Books", "App Store",
      ],
    },
    {
      title: "Apple Store",
      links: [
        "Find a Store", "Genius Bar", "Today at Apple", "Group Reservations",
        "Apple Camp", "Apple Store App", "Certified Refurbished",
        "Apple Trade In", "Financing", "Carrier Deals at Apple",
        "Order Status", "Shopping Help",
      ],
    },
    {
      title: "For Business",
      links: ["Apple and Business", "Shop for Business"],
    },
    {
      title: "For Education",
      links: [
        "Apple and Education", "Shop for K-12", "Shop for College",
      ],
    },
    {
      title: "For Healthcare",
      links: ["Apple and Healthcare"],
    },
    {
      title: "For Government",
      links: [
        "Apple and Government", "Shop for Veterans and Military",
        "Shop for State and Local Employees", "Shop for Federal Employees",
      ],
    },
    {
      title: "Apple Values",
      links: [
        "Accessibility", "Education", "Environment", "Inclusion and Diversity",
        "Privacy", "Racial Equity and Justice", "Supply Chain Innovation",
      ],
    },
    {
      title: "About Apple",
      links: [
        "Newsroom", "Apple Leadership", "Career Opportunities", "Investors",
        "Ethics & Compliance", "Events", "Contact Apple",
      ],
    },
  ];

  return (
    <footer className="bg-[var(--color-white)]/95 relative border-t border-[var(--color-black)]/20 backdrop-blur-md text-[var(--color-black)]/80 text-sm">
      {/* Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Apple Inc.",
            url: "https://www.apple.com",
            sameAs: [
              "https://www.facebook.com/apple",
              "https://twitter.com/apple",
              "https://www.instagram.com/apple/",
            ],
          }),
        }}
      />

      {/* Footer Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Section Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-2 text-[var(--color-black)]">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="hover:underline hover:text-[var(--color-black)] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer Bar */}
        <div className="mt-10 pt-6 border-t border-[var(--color-black)]/20 text-xs flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[var(--color-black)]/80">
            © {new Date().getFullYear()} Apple Inc. All rights reserved.
          </p>

          {/* Policy Links */}
          <div className="flex flex-wrap justify-center gap-3 text-[var(--color-black)]/80 hover:text-[var(--color-black)]">
            <Link href="#" className="hover:underline ">Privacy Policy</Link>
            <span>•</span>
            <Link href="#" className="hover:underline ">Terms of Use</Link>
            <span>•</span>
            <Link href="#" className="hover:underline ">Sales and Refunds</Link>
            <span>•</span>
            <Link href="#" className="hover:underline ">Legal</Link>
            <span>•</span>
            <Link href="#" className="hover:underline ">Site Map</Link>
          </div>

          <p className="text-[var(--color-black)]/80">United States</p>
        </div>
      </div>
    </footer>
  );
}

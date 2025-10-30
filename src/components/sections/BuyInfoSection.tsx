import Image from "next/image";

/**
 * =========================================================
 * BuyInfoSection Component
 * ---------------------------------------------------------
 * - Displays promotional info for iPhone 17 Pro and iPhone Air.
 * - Includes pricing, comparison specs, and CTA buttons.
 * - Fully responsive using Tailwind CSS grid and spacing utilities.
 *
 * =========================================================
 */
export default function BuyInfoSection() {
  return (
    <section className="bg-[var(--color-white)]/95 text-[var(--color-black)] py-20 relative rounded-t-4xl">
      <div className="max-w-7xl mx-auto text-left">
        {/* ============================ 🏷️ Section Header ============================ */}
        <h2 className="text-4xl md:text-5xl font-semibold mb-10 ml-5">
          Keep exploring iPhone.
        </h2>

        {/* ============================ 📦 Main Comparison Container ============================ */}
        <div className="max-w-7xl bg-[var(--color-white)] rounded-4xl p-3 sm:p-8 mx-auto text-center">
          {/* =========================================================
              📱 Phones Display Section
              ---------------------------------------------------------
              - Displays iPhone 17 Pro and iPhone Air product visuals.
              - Includes product name, price, and action links.
          ========================================================= */}
          <div className="grid grid-cols-2 text-sm md:text-lg font-bold gap-0 justify-center">
            {/* ---------- iPhone 17 Pro ---------- */}
            <div className="flex flex-col items-center space-y-4">
              {/* Product Image */}
              <div className="relative w-full max-w-[350px] aspect-[1/1] mx-auto">
                <Image
                  src="/img/BuyImages/buy17p.png"
                  alt="iPhone 17 Pro"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Product Info */}
              <p className="text-[var(--color-orange)] font-bold">New</p>
              <h3 className="text-2xl font-semibold text-[var(--color-black)]">
                iPhone 17 Pro
              </h3>
              <p className="text-[var(--color-black)]/70 max-w-sm font-normal">
                Innovative design for ultimate performance and battery life.
              </p>
              <p className="font-bold text-[var(--color-black)]">
                From $1099 or $45.79/mo. for 24 mo.*
              </p>

              {/* Buy Link */}
              <a
                href="#"
                className="text-[var(--color-primary)] hover:underline font-medium text-sm"
              >
                Buy &gt;
              </a>
            </div>

            {/* ---------- iPhone Air ---------- */}
            <div className="flex flex-col text-sm md:text-lg font-bold items-center space-y-4">
              {/* Product Image */}
              <div className="relative w-full max-w-[350px] aspect-[1/1] mx-auto">
                <Image
                  src="/img/BuyImages/iphoneair.jpg"
                  alt="iPhone Air"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Product Info */}
              <p className="text-[var(--color-orange)] font-bold">New</p>
              <h3 className="text-2xl font-semibold text-[var(--color-black)]">
                iPhone Air
              </h3>
              <p className="text-[var(--color-black)]/70 max-w-sm font-normal">
                The thinnest iPhone ever. With the power of pro inside.
              </p>
              <p className="font-bold text-[var(--color-black)]">
                From $999 or $41.62/mo. for 24 mo.*
              </p>

              {/* Learn More Link */}
              <a
                href="#"
                className="text-[var(--color-primary)] hover:underline font-medium text-sm"
              >
                Learn more
              </a>
            </div>
          </div>

          {/* ============================ 🧭 Divider Line ============================ */}
          <div className="border-t border-gray-300 my-12"></div>

          {/* =========================================================
              ⚙️ Specs Comparison Section
              ---------------------------------------------------------
              - Compares display, camera, chip, battery, and features.
              - Side-by-side layout using two grid columns.
          ========================================================= */}
          <div className="grid grid-cols-2 text-xs sm:text-sm font-bold gap-3 sm:gap-16 text-center">
            {/* ---------- iPhone 17 Pro Specs ---------- */}
            <div className="space-y-3">
              <p className="text-xl md:text-2xl font-semibold text-[var(--color-black)]">
                6.9” or 6.3”
              </p>
              <p className="text-[var(--color-white)]/60">
                Super Retina XDR display
              </p>

              {/* Camera */}
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/img/BuyImages/iphone_17_promax_camera__.png"
                  alt="iPhone 17 Pro Camera"
                  width={40}
                  height={40}
                />
                <p className="text-[var(--color-black)]/70">
                  48MP Pro Fusion camera system<br />
                  48MP Fusion Main<br />
                  48MP Fusion Ultra Wide<br />
                  48MP Fusion Telephoto
                </p>
              </div>

              {/* Chip */}
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/img/BuyImages/chip_a19pro.png"
                  alt="A19 Pro Chip"
                  width={40}
                  height={40}
                />
                <p className="text-[var(--color-black)]/70">
                  A19 Pro chip <br />
                  6-core GPU with Neural Accelerators
                </p>
              </div>

              {/* Battery */}
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/img/BuyImages/battery_.png"
                  alt="Battery"
                  width={40}
                  height={40}
                />
                <p className="text-[var(--color-black)]/70">
                  Up to 39 hours video playback
                </p>
              </div>

              {/* Apple Intelligence */}
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/img/BuyImages/apple_intelligence.png"
                  alt="Apple Intelligence"
                  width={40}
                  height={40}
                />
                <p className="text-[var(--color-black)]/70">
                  Apple Intelligence
                </p>
              </div>

              {/* Description */}
              <p className="text-[var(--color-black)]/60 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-normal">
                The innovative design for iPhone 17 Pro delivers exceptional
                durability, breakthrough battery life, and unlocks the
                extraordinary power of the A19 Pro chip. The 48MP Pro Fusion
                camera system has the longest iPhone Telephoto ever with 8x
                optical zoom and smarter group selfies with the new Center Stage
                camera. Helpful Apple Intelligence tools like Clean Up and more.
              </p>
            </div>

            {/* ---------- iPhone Air Specs ---------- */}
            <div className="space-y-3">
              <p className="text-xl md:text-2xl font-semibold text-[var(--color-black)]">
                6.5”
              </p>
              <p className="text-[var(--color-white)]/60">
                Super Retina XDR display
              </p>

              {/* Camera */}
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/img/BuyImages/17proairsacm.png"
                  alt="iPhone Air Camera"
                  width={40}
                  height={40}
                />
                <p className="text-[var(--color-black)]/70">
                  48MP Fusion camera system<br />
                  48MP Fusion Main<br />
                  —<br />
                  —
                </p>
              </div>

              {/* Chip */}
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/img/BuyImages/chip_a19pro.png"
                  alt="A19 Pro Chip"
                  width={40}
                  height={40}
                />
                <p className="text-[var(--color-black)]/70">
                  A19 Pro chip <br />
                  5-core GPU with Neural Accelerators
                </p>
              </div>

              {/* Battery */}
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/img/BuyImages/battery_.png"
                  alt="Battery"
                  width={40}
                  height={40}
                />
                <p className="text-[var(--color-black)]/70">
                  Up to 27 hours video playback
                </p>
              </div>

              {/* Apple Intelligence */}
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/img/BuyImages/apple_intelligence.png"
                  alt="Apple Intelligence"
                  width={40}
                  height={40}
                />
                <p className="text-[var(--color-black)]/70">
                  Apple Intelligence
                </p>
              </div>

              {/* Description */}
              <p className="text-[var(--color-black)]/60 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-normal">
                iPhone Air is the thinnest iPhone ever, powered by the A19 Pro
                chip. It’s more durable than ever, featuring Ceramic Shield 2 and
                a titanium frame. The 48MP camera brings next-gen portraits and
                a 6.5-inch ProMotion display up to 120Hz. All-day battery life and
                Apple Intelligence make it more capable than ever.
              </p>
            </div>
          </div>

          {/* ============================ ⚖️ Compare All Button ============================ */}
          <div className="mt-12">
            <button className="bg-gray-200 hover:bg-gray-300 text-[var(--color-black)] font-medium px-6 py-3 rounded-full transition">
              Compare all iPhone models &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

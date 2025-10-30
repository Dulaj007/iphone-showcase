import Image from "next/image";

/**
 * AccessoriesSection Component
 * --------------------------------------------------
 * Displays a collection of iPhone accessories with images, titles, and descriptions
 * in a responsive grid layout. Each accessory includes an image that slightly scales
 * on hover for an interactive visual effect.
 */

// ------------------------------------
// Type Definition
// ------------------------------------

/** Defines the structure for accessory data items. */
interface Accessory {
  img: string;   // Image path of the accessory
  title: string; // Accessory name
  desc: string;  // Description text
}

// ------------------------------------
// Data: Accessories List
// ------------------------------------

const accessoriesData: Accessory[] = [
  {
    img: "/img/Accessories/a01.jpg",
    title: "TechWoven Case",
    desc: "Made from a custom technical woven fabric of multiple colored yarns. The sides of the case are coated and textured for a better grip. Available in five colors.",
  },
  {
    img: "/img/Accessories/a02.jpg",
    title: "Crossbody Strap",
    desc: "Allows you to comfortably wear your iPhone hands-free. Embedded flexible magnets with stainless steel sliding mechanisms make it effortless to adjust for a perfect fit.",
  },
  {
    img: "/img/Accessories/a03.jpg",
    title: "Silicone Case",
    desc: "Six striking colors, now with two connection points that allow secure attachment to the new Crossbody Strap.",
  },
];

// ------------------------------------
// Component Definition
// ------------------------------------

/**
 * Renders the "Accessories" section with title, subtitle, and
 * a responsive grid of accessories.
 */
export default function AccessoriesSection() {
  return (
    <section className="bg-[var(--color-black)] py-16 px-4 relative">
      {/* Section Header */}
      <div className="text-center mb-10">
        <p className="text-[var(--color-orange)] font-semibold mb-2 text-sm">
          Accessories
        </p>
        <h2 className="text-[var(--color-white)] text-4xl md:text-5xl font-bold mb-2">
          Pro pairings.
        </h2>
        <a
          href="#"
          className="text-blue-400 hover:text-blue-300 text-base font-medium hover:underline"
        >
          Shop all iPhone accessories &#8594;
        </a>
      </div>

      {/* Accessories Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {accessoriesData.map((item, idx) => (
          <div
            key={item.title}
            className="flex flex-col items-center text-center sm:text-left"
          >
            {/* Image Wrapper: maintains aspect ratio and responsive sizing */}
            <div className="relative w-[70%] sm:w-[80%] md:w-[100%] aspect-[3/3] md:aspect-[3/4] rounded-2xl overflow-hidden mb-6">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                priority={idx === 0} // Prioritize first image for faster load
              />
            </div>

            {/* Accessory Description */}
            <p className="text-[var(--color-white)]/70 text-sm leading-relaxed max-w-xs">
              <span className="text-[var(--color-white)] font-bold">
                {item.title}{" "}
              </span>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

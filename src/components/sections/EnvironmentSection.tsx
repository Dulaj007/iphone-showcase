import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import Image from "next/image";

/**
 * EnvironmentSection Component
 * -----------------------------------------------------
 * Displays environmental impact information cards for the iPhone 17 Pro series.
 * Each card contains a title, subtitle, icon, and detailed description, and opens
 * a modal popup with more information when clicked.
 * 
 * Features:
 * - Uses Framer Motion for smooth modal transitions.
 * - Utilizes Next/Image for optimized image rendering.
 * - Fully responsive grid layout for desktop and mobile.
 *--------------------------------------------------------
 */


/**
 * Interface representing a single card's data structure
 */
interface CardData {
  id: number;           // Unique identifier for the card
  title: string;        // Main title of the card
  subtitle: string;     // Subtitle or emphasized text
  secondtitle: string;  // Optional secondary title
  color: string;        // Tailwind class for accent color
  icon: string;         // Path to icon image
  description: string;  // Detailed description to display in popup
}

/**
 * Array of card objects representing environmental info
 */
const cards: CardData[] = [
  {
    id: 1,
    title: "Made with",
    subtitle: " 30% recycled material ",
    secondtitle: "by weight.",
    color: "text-purple-500",
    icon: "/Icons/recycle.svg",
    description: `
Recycled Material
  
Our approach.
Using recycled materials, like 100% recycled cobalt in the battery, reduces the need to mine new material, which avoids the carbon emissions and environmental impacts of mining.

Learn more in our Product Environmental Report (PDF)

How you can help.
You can protect the earth’s precious resources by trading in, passing down, or recycling devices and accessories you no longer use. You can bring them into any Apple Store for free, secure recycling. We also offer other ways to recycle, including mail-in options.

Learn how to trade in or recycle devices
    `,
  },
  {
    id: 2,
    title: "Manufactured with",
    subtitle: " 40% renewable electricity.",
    secondtitle: "",
    color: "text-orange-500",
    icon: "/Icons/electric.svg",
    description: `
Renewable Electricity

Our approach.
Using electricity from renewable sources like wind and solar across our global supply chain — instead of fossil fuels — significantly reduces carbon emissions from manufacturing Apple products.

Learn more in our Product Environmental Report (PDF)

How you can help.
You can extend the lifespan of your batteries and Apple products by using Optimized Battery Charging. It works by learning your charging habits and delaying the final charge — from 80% to 100% — until you are likely to need it.

Learn more about Optimized Battery Charging
    `,
  },
  {
    id: 3,
    title: "Ships in compact packaging for",
    subtitle: " 25% more units ",
    secondtitle: "per trip.",
    color: "text-cyan-600",
    icon: "/Icons/box.svg",
    description: `
Package and Ship

Our approach.
To ship multiple iPhone 17 Pro and iPhone 17 Pro Max at once, we designed smaller boxes that use less cardboard, reducing paper waste and carbon emissions because more units can be shipped per trip.

Learn more in our Product Environmental Report (PDF)

How you can help.
New Apple products come in paper packaging that’s 100% fiber-based. In most places, you can put the entire box into your household recycling bin. You can also bring Apple packaging to any Apple Store and we’ll recycle it for free.

Learn more about recycling
    `,
  },
];

/**
 * EnvironmentSection Component
 * --------------------------------------------------
 * Displays environmental information cards for iPhone 17 Pro series.
 * Allows users to click a card to open a detailed popup modal.
 */
export default function EnvironmentSection() {
  // State to manage currently selected card for popup
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  return (
    <section className="relative text-[var(--color-black)] bg-[var(--color-white)]/95 py-16 text-center px-6">
      {/* Section Header */}
      <h2 className="text-4xl md:text-5xl font-semibold mb-2">
        iPhone 17 Pro and the environment.
      </h2>
      <p className="text-blue-600 mt-3 text-sm mb-10">
        Learn more in our Product Environmental Report (PDF)
      </p>

      {/* --- Card Grid --- */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className="relative bg-[var(--color-white)] shadow-sm rounded-2xl p-8 text-left 
            cursor-pointer transition-all hover:scale-[1.03] duration-500 hover:shadow-md"
          >
            {/* Icon */}
            <Image
              src={card.icon}
              alt={`${card.title} icon`}
              width={45}
              height={32}
              className="mb-2"
            />

            {/* Card Text */}
            <p className="text-xl pr-3 font-extrabold mb-2 leading-snug">
              {card.title}{" "}
              <span className={`text-lg  ${card.color}`}>
                {card.subtitle}
              </span>
              {card.secondtitle}
            </p>

            {/* Plus Button Indicator */}
            <div className="absolute bottom-5 right-5 bg-[var(--color-black)] text-[var(--color-white)] rounded-full w-8 h-8 flex items-center justify-center">
              <Plus size={18} />
            </div>
          </div>
        ))}
      </div>

      {/* --- Popup Modal --- */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 bg-[var(--color-black)]/5 backdrop-blur-xl bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-2xl w-full mx-4 p-8 relative text-left overflow-y-auto max-h-[80vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 bg-[var(--color-black)]/95 text-[var(--color-white)] rounded-full p-2"
                onClick={() => setSelectedCard(null)}
              >
                <X size={20} />
              </button>

              {/* Popup Content */}
              <div className="prose max-w-none text-[var(--color-black)]/95 whitespace-pre-line">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedCard.description.split("\n")[1]}
                </h2>
                <p>{selectedCard.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

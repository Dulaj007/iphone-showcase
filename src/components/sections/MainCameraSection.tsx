
import Image from "next/image";

/**
 * MainCameraSection Component
 * --------------------------------------------------
 * A responsive section showcasing the iPhone Main camera system.
 * 
 */

export default function MainCameraSection() {
  return (
    <section className="text-white py-20 flex flex-col items-center bg-black/60 backdrop-blur-sm">
      {/* ---------- Section Title ---------- */}
      <div className="text-center mb-10">
        <h3 className="text-orange-500 text-sm md:text-base font-semibold mb-2">
          Cameras
        </h3>
        <h1 className="text-4xl md:text-6xl font-bold">A big zoom forward.</h1>
      </div>

      {/* ---------- Image and Feature Layout ---------- */}
      <div className="flex flex-col lg:flex-row items-center w-full relative gap-6 lg:gap-0">
        {/* --- Device Image --- */}
        <div className="w-full lg:w-3/4 relative">
          <div className="overflow-hidden">
            <Image
              src="/img/cmeraWhitePhone.jpg"
              alt="iPhone Camera"
              width={1200}
              height={800}
              className="
                rounded-lg 
                w-[170%] 
                md:w-[115%] 
                lg:w-[120%] 
                object-cover 
                object-left 
                -translate-x-[40%] 
                md:-translate-x-[30%] 
                lg:-translate-x-[20%]
                transition-all
              "
              priority
            />
          </div>
        </div>

        {/* --- Camera Feature Stats --- */}
        <div className="lg:w-[35%] lg:-ml-16 text-center lg:text-left flex flex-col items-center lg:items-start space-y-12">
          {/* Optical Zoom Stat */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-gray-400 text-base md:text-lg">Up to</p>
            <p className="text-orange-500 text-5xl md:text-6xl font-bold leading-snug">
              8x
            </p>
            <p className="text-gray-300 text-base font-bold md:text-xl">
              optical-quality zoom
            </p>
          </div>

          {/* Megapixel Stat */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-gray-400 text-base md:text-lg">All</p>
            <p className="text-orange-500 text-5xl md:text-6xl font-bold leading-snug">
              48MP
            </p>
            <p className="text-gray-300 text-base font-bold md:text-xl">
              rear cameras
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Description Text ---------- */}
      <div className="max-w-5xl mt-16 px-5 text-gray-400 text-center text-sm md:text-base leading-relaxed">
        <p>
          Across the iPhone 17 Pro camera system, you’ll find innovation that
          goes to great lengths. The telephoto features the next generation of
          our tetraprism design and a 56 percent larger sensor. With an
          equivalent 200 mm focal length, the 8x optical-quality zoom makes this{" "}
          <span className="text-white font-semibold">
            the longest iPhone Telephoto ever
          </span>{" "}
          — offering 16x total optical zoom range. So you can explore an even
          wider range of creative choices and add a longer reach to your
          compositions.
        </p>
      </div>
    </section>
  );
}

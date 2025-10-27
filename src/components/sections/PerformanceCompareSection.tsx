
import React, { useState } from "react";

interface ComparisonItem {
  label: string;
  value: string;
  desc: string;
}

interface ModelData {
  [key: string]: ComparisonItem[];
}

/** 
 * PerformanceCompareSection Component
 * --------------------------------------------------
 * This section allows users to compare the performance metrics 
 * of various iPhone models, including CPU, GPU, and video playback hours.
 * Users can select a model from the dropdown to view a responsive 
 * comparison grid of performance statistics. 
 * All colors and styles use CSS variables for theme consistency 
 * 
 */

export default function PerformanceCompareSection() {
  const data: ModelData = {
    "iPhone 13": [
      { label: "Up to", value: "40% faster", desc: "6-core CPU" },
      { label: "Up to", value: "2x faster", desc: "6-core GPU" },
      { label: "Up to", value: "10 more hours", desc: "video playback on iPhone 17 Pro¹" },
      { label: "Up to", value: "16 more hours", desc: "video playback on iPhone 17 Pro Max¹" },
    ],
    "iPhone 13 Pro": [
      { label: "Up to", value: "50% faster", desc: "6-core CPU" },
      { label: "Up to", value: "2.2x faster", desc: "6-core GPU" },
      { label: "Up to", value: "11 more hours", desc: "video playback on iPhone 17 Pro¹" },
      { label: "Up to", value: "17 more hours", desc: "video playback on iPhone 17 Pro¹" },
    ],
    "iPhone 13 Pro Max": [
      { label: "Up to", value: "50% faster", desc: "6-core CPU" },
      { label: "Up to", value: "2.2x faster", desc: "6-core GPU" },
      { label: "Up to", value: "5 more hours", desc: "video playback on iPhone 17 Pro¹" },
      { label: "Up to", value: "11 more hours", desc: "video playback on iPhone 17 Pro Max¹" },
    ],
    "iPhone 14": [
      { label: "Up to", value: "50% faster", desc: "6-core CPU" },
      { label: "Up to", value: "2.2x faster", desc: "6-core GPU" },
      { label: "Up to", value: "13 more hours", desc: "video playback on iPhone 17 Pro¹" },
      { label: "Up to", value: "19 more hours", desc: "video playback on iPhone 17 Pro Max¹" },
    ],
    "iPhone 14 Pro Max": [
      { label: "Up to", value: "40% faster", desc: "6-core CPU" },
      { label: "Up to", value: "2x faster", desc: "6-core GPU" },
      { label: "Up to", value: "4 more hours", desc: "video playback on iPhone 17 Pro¹" },
      { label: "Up to", value: "10 more hours", desc: "video playback on iPhone 17 Pro Max¹" },
    ],
    "iPhone 15": [
      { label: "Up to", value: "40% faster", desc: "6-core CPU" },
      { label: "Up to", value: "2x faster", desc: "6-core GPU" },
      { label: "Up to", value: "13 more hours", desc: "video playback on iPhone 17 Pro¹" },
      { label: "Up to", value: "19 more hours", desc: "video playback on iPhone 17 Pro Max¹" },
    ],
    "iPhone 15 Pro": [
      { label: "Up to", value: "20% faster", desc: "6-core CPU" },
      { label: "Up to", value: "50% faster", desc: "6-core GPU" },
      { label: "Up to", value: "10 more hours", desc: "video playback on iPhone 17 Pro¹" },
      { label: "Up to", value: "16 more hours", desc: "video playback on iPhone 17 Pro Max¹" },
    ],
    "iPhone 15 Pro Max": [
      { label: "Up to", value: "20% faster", desc: "6-core CPU" },
      { label: "Up to", value: "50% faster", desc: "6-core GPU" },
      { label: "Up to", value: "4 more hours", desc: "video playback on iPhone 17 Pro¹" },
      { label: "Up to", value: "10 more hours", desc: "video playback on iPhone 17 Pro Max¹" },
    ],
  };

  const [selectedModel, setSelectedModel] = useState<keyof typeof data>("iPhone 13");
  const comparisons = data[selectedModel];

  return (
    <section className="flex relative justify-center items-center  bg-gradient-to-r from-transparent via-[var(--color-black)] to-transparent  text-[var(--color-text)] py-16 px-4">
      <div className="w-full max-w-6xl bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-black)] rounded-3xl p-15 text-center md:text-left transition-all duration-300">
        {/* Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-4 mb-10">
          <span className="text-[var(--color-text-muted)] text-sm font-semibold">Compare with</span>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as keyof typeof data)}
            className="bg-[var(--color-bg-secondary)] border font-semibold border-gray-700 rounded-full px-5 py-2 text-sm focus:outline-none text-[var(--color-text)]"
          >
            {Object.keys(data).map((model) => (
              <option key={model}>{model}</option>
            ))}
          </select>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left md:text-left">
          {comparisons.map((item, index) => (
            <div key={index}>
              <p className="text-[var(--color-text-muted)] font-semibold text-sm mb-1">{item.label}</p>
              <h3 className="text-xl font-bold mb-1 text-[var(--color-white)]">{item.value}</h3>
              <p className="text-[var(--color-text-muted)] font-semibold text-lg leading-tight pr-0 lg:pr-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

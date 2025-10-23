"use client";

import { motion } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { useState, useRef, useEffect } from "react";

export default function SwipeUpPanel({
  children,
  peekHeight = 80,
  onOpen,
  onClose,
}: {
  children: React.ReactNode;
  peekHeight?: number;
  onOpen?: () => void;
  onClose?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Swipe up drag
  const bind = useDrag(
    ({ down, movement: [, my], direction: [, dy], cancel }) => {
      if (!down && dy < 0 && Math.abs(my) > 100) {
        setIsOpen(true);
        onOpen?.();
        cancel?.();
      }
    },
    { axis: "y" }
  );

  // Swipe down drag
  const bindDown = useDrag(
    ({ down, movement: [, my], direction: [, dy], cancel }) => {
      if (!down && dy > 0 && Math.abs(my) > 80 && isOpen) {
        setIsOpen(false);
        onClose?.();
        cancel?.();
      }
    },
    { axis: "y" }
  );

  // TypeScript-safe binders
  const safeBind = () => {
    const props = bind();
    const { onDrag, ...rest } = props as any;
    return rest;
  };

  const safeBindDown = () => {
    const props = bindDown();
    const { onDrag, ...rest } = props as any;
    return rest;
  };

  // Lock body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-50 overflow-hidden"
      animate={{ height: isOpen ? "100vh" : peekHeight }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Wrapper when closed → bouncing */}
      {!isOpen && (
        <motion.div
          {...safeBind()}
          className="h-full w-full flex flex-col items-center justify-center cursor-grab"
          initial={{ y: 0 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <div className="w-12 h-2 bg-gray-400 rounded-full mb-1" />
          <div className="text-gray-500 text-sm">⬆ Swipe up</div>
        </motion.div>
      )}

      {/* Content area when opened */}
      {isOpen && (
        <div className="relative h-full flex flex-col">
          {/* Swipe down handle */}
          <div
            {...safeBindDown()}
            className="absolute top-3 left-1/2 -translate-x-1/2 cursor-grab flex flex-col items-center z-50"
          >
            <div className="w-12 h-2 bg-gray-400 rounded-full mb-1" />
            <p className="text-xs text-gray-500">⬇ Swipe down</p>
          </div>

          {/* Scrollable content */}
<div
  id="swipeUpContent"
  className="h-full w-full pt-8 overflow-y-auto"
>
  {children}
</div>


        </div>
      )}
    </motion.div>
  );
}

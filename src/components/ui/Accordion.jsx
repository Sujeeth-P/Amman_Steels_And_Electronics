import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className={cn("font-semibold text-slate-900 transition-colors group-hover:text-blue-600", isOpen && "text-blue-600")}>
          {title}
        </span>
        <ChevronDown 
          className={cn("text-slate-400 transition-transform duration-300", isOpen && "rotate-180 text-blue-600")} 
          size={20} 
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-slate-600 text-sm leading-relaxed">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Accordion({ items, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={cn("bg-white rounded-xl shadow-sm border border-slate-200 px-6", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={activeIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
}

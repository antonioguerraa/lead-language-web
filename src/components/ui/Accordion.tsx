import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

function AccordionPanel({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left cursor-pointer"
      >
        <span className="pr-4 text-lg font-medium text-text-primary">
          {item.question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-text-muted transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div ref={contentRef} className="pb-5">
          <p className="text-text-secondary leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => (
        <AccordionPanel
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}

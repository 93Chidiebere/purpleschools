import { Button } from "@/components/ui/button";

interface MathKeyboardProps {
  onInsert: (symbol: string) => void;
}

export function MathKeyboard({ onInsert }: MathKeyboardProps) {
  const symbols = [
    { label: "log_b(x)", value: "log_b(x)" },
    { label: "x²", value: "²" },
    { label: "x³", value: "³" },
    { label: "^", value: "^" },
    { label: "√", value: "√" },
    { label: "π", value: "π" },
    { label: "θ", value: "θ" },
    { label: "÷", value: "÷" },
    { label: "×", value: "×" },
    { label: "±", value: "±" },
    { label: "=", value: "=" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-hide snap-x w-full">
      {symbols.map((sym, idx) => (
        <Button
          key={idx}
          type="button"
          variant="secondary"
          size="sm"
          className="snap-start flex-shrink-0 text-xs font-mono h-8 px-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-foreground"
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            onInsert(sym.value);
          }}
        >
          {sym.label}
        </Button>
      ))}
    </div>
  );
}

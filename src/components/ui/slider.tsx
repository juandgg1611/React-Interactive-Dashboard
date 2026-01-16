import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-bg-300/50">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-primary-100 to-primary-200" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary-200 bg-white ring-2 ring-primary-100/30 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200/50 disabled:pointer-events-none disabled:opacity-50 shadow-lg hover:scale-110 hover:shadow-primary-100/30 hover:shadow-lg" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

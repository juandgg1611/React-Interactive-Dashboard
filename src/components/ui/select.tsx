// components/ui/select.tsx
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      // Estilos base premium
      "flex h-12 w-full items-center justify-between",
      "px-4 py-3 text-sm",
      "rounded-xl border-2",

      // Fondo y borde - FORZAR FONDO MÁS OSCURO
      "bg-bg-300/50 backdrop-blur-sm",
      "border-bg-300/70",

      // Estados hover y focus
      "hover:border-primary-100/80 hover:bg-bg-300/60",
      "focus:border-primary-200 focus:bg-bg-300/70",
      "focus:ring-2 focus:ring-primary-200/40 focus:ring-offset-2",

      // Texto - FORZAR BLANCO
      "text-white",
      "data-[placeholder]:text-white/70",

      // Estados disabled
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:text-white/50",

      // Otros
      "transition-all duration-300",
      "shadow-lg shadow-black/30",
      "[&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <div
        className="
        ml-2 
        w-6 h-6 
        rounded-lg 
        bg-gradient-to-br from-primary-100/30 to-primary-200/20 
        border border-primary-200/50
        flex items-center justify-center
        transition-all duration-300
        group-hover:from-primary-100/40 group-hover:to-primary-200/30
        group-hover:border-primary-200/70
        group-hover:scale-105
      "
      >
        <ChevronDown
          className="
          h-3.5 w-3.5 
          text-white
          transition-transform duration-300
          group-data-[state=open]:rotate-180
        "
        />
      </div>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-2",
      "bg-gradient-to-b from-bg-300/90 to-transparent",
      "sticky top-0 z-10",
      "backdrop-blur-sm",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4 text-white/80" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-2",
      "bg-gradient-to-t from-bg-300/90 to-transparent",
      "sticky bottom-0 z-10",
      "backdrop-blur-sm",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4 text-white/80" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        // Estilos base del contenedor
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem]",
        "overflow-y-auto overflow-x-hidden rounded-xl",
        "border-2 shadow-2xl",

        // Fondo - MÁS OSCURO Y CON BLUR
        "bg-bg-300/95 backdrop-blur-xl",
        "border-white/20",

        // Animaciones
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",

        // Para posicionamiento popper
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",

        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-2",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "px-3 py-2 text-xs font-semibold",
      "text-white/80 uppercase tracking-wider",
      "border-b border-white/20 mb-2",
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      // Estilos base del item
      "relative flex w-full cursor-default select-none items-center",
      "py-3 pl-10 pr-4 text-sm rounded-lg",
      "outline-none transition-all duration-200",

      // Texto - FORZAR BLANCO
      "text-white",

      // Estados hover
      "hover:bg-white/10 hover:text-white",
      "focus:bg-white/15 focus:text-white",

      // Estado seleccionado
      "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary-100/30 data-[state=checked]:to-primary-200/20",
      "data-[state=checked]:text-white data-[state=checked]:font-semibold",
      "data-[state=checked]:shadow-md data-[state=checked]:shadow-primary-100/20",

      // Estado disabled
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[disabled]:text-white/50",

      className
    )}
    {...props}
  >
    {/* Indicador de check personalizado */}
    <span
      className="
      absolute left-3 
      flex h-5 w-5 
      items-center justify-center
      rounded-md 
      border-2 
      border-white/30
      transition-all duration-300
      group-data-[state=checked]:border-white
      group-data-[state=checked]:bg-gradient-to-br group-data-[state=checked]:from-primary-100 group-data-[state=checked]:to-primary-200
      group-hover:border-white/50
    "
    >
      <SelectPrimitive.ItemIndicator>
        <Check
          className="
          h-3 w-3 
          text-white 
          transition-all duration-300
          scale-0 group-data-[state=checked]:scale-100
        "
        />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText className="text-white">
      {children}
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      "mx-2 my-1 h-px",
      "bg-gradient-to-r from-transparent via-white/20 to-transparent",
      className
    )}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

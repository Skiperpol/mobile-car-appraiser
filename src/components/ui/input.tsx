import { useThemePreference } from "@/hooks/useThemePreference";
import { THEME } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Platform, TextInput } from "react-native";

function Input({
  className,
  placeholderTextColor,
  ...props
}: React.ComponentProps<typeof TextInput>) {
  const { mode } = useThemePreference();

  return (
    <TextInput
      placeholderTextColor={placeholderTextColor ?? THEME[mode].placeholder}
      className={cn(
        "dark:bg-input/30 border-input bg-white text-foreground flex h-base w-full min-w-0 flex-row items-center rounded-main border px-3 py-1 text-base leading-5 shadow-sm shadow-black/5 sm:h-9",
        props.editable === false &&
          cn(
            "opacity-50",
            Platform.select({
              web: "disabled:pointer-events-none disabled:cursor-not-allowed",
            }),
          ),
        Platform.select({
          web: cn(
            "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground outline-none transition-[color,box-shadow] md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          ),
          native: "placeholder:text-muted-foreground/50",
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Input };

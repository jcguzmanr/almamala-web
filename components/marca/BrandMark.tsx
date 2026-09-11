import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  size?: "hero" | "compact";
  priority?: boolean;
};

export default function BrandMark({
  size = "hero",
  priority = false,
}: BrandMarkProps) {
  const isHero = size === "hero";

  return (
    <div
      className={cn(
        "brand-mark relative mx-auto",
        isHero ? "h-40 w-40 md:h-52 md:w-52" : "h-16 w-16"
      )}
    >
      <span className="brand-mark__halo" aria-hidden="true" />
      <span className="brand-mark__glow" aria-hidden="true" />
      <Image
        src="/images/logo_am.svg"
        alt="Alma Mala — copa y sol"
        width={208}
        height={208}
        priority={priority}
        className="relative z-10 h-full w-full object-contain"
      />
    </div>
  );
}

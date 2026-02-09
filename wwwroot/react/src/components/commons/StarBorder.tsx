import React from "react";

export type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties["animationDuration"];
  thickness?: number;
  useDefaultStyle?: boolean;
};

// Animated star border wrapper, adapted to IND CRM colors.
/**
 * Deprecated: StarBorder is deprecated and should not be used in new UI.
 * Use standard Tailwind button styles instead.
 * @deprecated
 */
const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  contentClassName = "",
  color = "rgba(0, 41, 107, 0.65)",
  speed = "5s",
  thickness = 0.3,
  useDefaultStyle = true,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";
  const baseContent = "relative z-10 text-center rounded-[5px]";
  const defaultContent =
    "bg-gradient-to-b from-[#00296b] to-[#001f4d] border border-[#001f4d]/70 text-white text-[14px] py-[12px] px-[22px]";
  const contentClass = useDefaultStyle
    ? `${baseContent} ${defaultContent} ${contentClassName}`
    : `${baseContent} ${contentClassName}`;
  const adjustedThickness = Math.max(0, thickness + 0.3);

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[5px] ${className}`}
      {...(rest as any)}
      style={{
        padding: `${adjustedThickness}px 0`,
        ...(rest as any).style,
      }}
    >
      <div
        className="absolute w-[150%] h-[25%] opacity-70 bottom-[-4px] right-[-125%] rounded-md animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[150%] h-[25%] opacity-70 top-[-4px] left-[-125%] rounded-md animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className={contentClass}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;

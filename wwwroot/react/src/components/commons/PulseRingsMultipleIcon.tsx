import React from "react";

type PulseRingsMultipleIconProps = {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  background?: string;
  opacity?: number;
  rotation?: number;
  shadow?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  padding?: number;
  className?: string;
};

// Pulse rings icon with CSS animation to avoid SMIL compatibility issues.
const PulseRingsMultipleIcon = ({
  size,
  color = "currentColor",
  strokeWidth = 2,
  background = "transparent",
  opacity = 0.4,
  rotation = 90,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 12,
  className,
}: PulseRingsMultipleIconProps) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push("scaleX(-1)");
  if (flipVertical) transforms.push("scaleY(-1)");

  const viewBoxSize = 24 + padding * 2;
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;
  const ringPath =
    "M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        opacity,
        transform: transforms.join(" ") || undefined,
        filter: shadow > 0 ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))` : undefined,
        backgroundColor: background !== "transparent" ? background : undefined,
        color: color,
      }}
    >
      <path className="ind-pulse-ring--base" fill="currentColor" d={ringPath} />
      <path className="ind-pulse-ring" fill="currentColor" d={ringPath} />
      <path className="ind-pulse-ring ind-pulse-ring--delay-1" fill="currentColor" d={ringPath} />
      <path className="ind-pulse-ring ind-pulse-ring--delay-2" fill="currentColor" d={ringPath} />
    </svg>
  );
};

export default PulseRingsMultipleIcon;

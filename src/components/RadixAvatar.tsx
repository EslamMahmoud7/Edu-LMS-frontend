import * as AvatarPrimitive from "@radix-ui/react-avatar";

interface RadixAvatarProps {
  src?: string;
  name: string;
  size?: number; // px
}

export function RadixAvatar({ src, name, size = 80 }: RadixAvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <AvatarPrimitive.Root
      className="inline-flex items-center justify-center rounded-full bg-blue-50 overflow-hidden"
      style={{ width: size, height: size }}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={name}
          onError={(e) => {
            // hide if error
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          className="object-cover w-full h-full"
        />
      )}
      <AvatarPrimitive.Fallback
        className="flex items-center justify-center text-blue-700 font-bold"
        delayMs={600}
        style={{ width: size, height: size }}
      >
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

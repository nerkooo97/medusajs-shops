import React from "react"
import Image from "next/image"

type ImagePlaceholderProps = {
  imageUrl?: string | null
  alt?: string
  label?: string
  className?: string
  aspectRatio?: string
}

export default function ImagePlaceholder({
  imageUrl,
  alt = "Slika",
  label = "Placeholder slika",
  className = "",
  aspectRatio = "aspect-video",
}: ImagePlaceholderProps) {
  if (imageUrl) {
    return (
      <div className={`relative w-full ${aspectRatio} overflow-hidden rounded-xl bg-muted ${className}`}>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover object-center"
        />
      </div>
    )
  }

  return (
    <div
      className={`relative w-full ${aspectRatio} bg-muted/40 border border-border/80 rounded-xl flex items-center justify-center p-4 text-center select-none ${className}`}
    >
      <span className="text-xs font-medium text-muted-foreground/80 tracking-wide">
        {label}
      </span>
    </div>
  )
}

"use client"

import React, { useState, useEffect, useCallback } from "react"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, Link as LinkIcon, Check, X } from "lucide-react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

export default function ImageGallery({ images = [] }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const hasMultipleImages = images.length > 1
  const selectedImage = images[selectedIndex] || images[0]

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isZoomOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomOpen(false)
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isZoomOpen, handleNext, handlePrev])

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center text-muted-foreground text-sm">
        Nema dostupnih slika
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        {/* Main Product Image Container - borderless, fully utilized and centered */}
        <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden group select-none flex items-center justify-center">
          {/* Top Right Tool Buttons (Link & Fullscreen) */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              title="Kopiraj link proizvoda"
              className="size-8 rounded-lg bg-white/90 hover:bg-white text-muted-foreground hover:text-foreground shadow-xs border border-border/60 flex items-center justify-center transition-colors cursor-pointer"
            >
              {copied ? <Check className="size-4 text-emerald-600" /> : <LinkIcon className="size-4" />}
            </button>
            <button
              type="button"
              onClick={() => setIsZoomOpen(true)}
              title="Uvećaj sliku"
              className="size-8 rounded-lg bg-white/90 hover:bg-white text-muted-foreground hover:text-foreground shadow-xs border border-border/60 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Maximize2 className="size-4" />
            </button>
          </div>

          {/* Main Showcase Image - fills 100% edge-to-edge with zero gaps */}
          {selectedImage?.url && (
            <div
              className="relative size-full cursor-zoom-in p-0"
              onClick={() => setIsZoomOpen(true)}
            >
              <Image
                key={selectedImage.id || selectedIndex}
                src={selectedImage.url}
                priority
                alt={`Slika proizvoda ${selectedIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </div>
          )}

          {/* Navigation Arrows for Main Image */}
          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                aria-label="Prethodna slika"
                className="absolute left-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-white/90 hover:bg-white text-foreground shadow-md border border-border/60 flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover:opacity-100 sm:opacity-60 sm:hover:opacity-100"
              >
                <ChevronLeft className="size-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                aria-label="Sljedeća slika"
                className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-white/90 hover:bg-white text-foreground shadow-md border border-border/60 flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover:opacity-100 sm:opacity-60 sm:hover:opacity-100"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>

        {/* Horizontal Row of Square Thumbnails directly below main image */}
        {hasMultipleImages && (
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
            {images.map((image, index) => {
              const isSelected = index === selectedIndex
              return (
                <button
                  key={image.id || index}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Prikaži sliku ${index + 1}`}
                  className={`relative size-16 sm:size-20 rounded-lg overflow-hidden bg-white border cursor-pointer shrink-0 transition-all ${
                    isSelected
                      ? "border-primary ring-2 ring-primary/20 shadow-xs scale-102"
                      : "border-border hover:border-muted-foreground/40 opacity-75 hover:opacity-100"
                  }`}
                >
                  {image.url && (
                    <Image
                      src={image.url}
                      alt={`Pregled slike ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            aria-label="Zatvori pregled"
            className="absolute top-5 right-5 size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
          >
            <X className="size-6 stroke-[2]" />
          </button>

          <div
            className="relative w-full max-w-5xl h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedImage?.url && (
              <Image
                src={selectedImage.url}
                alt={`Slika proizvoda ${selectedIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain object-center p-2"
              />
            )}
          </div>

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                aria-label="Prethodna slika"
                className="absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="size-6 stroke-[2]" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                aria-label="Sljedeća slika"
                className="absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="size-6 stroke-[2]" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}

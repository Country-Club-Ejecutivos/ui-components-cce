'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface ImageSliderImage {
  src: string
  alt?: string
}

export interface ImageSliderProps {
  images: ImageSliderImage[]
  className?: string
  imageClassName?: string
}

export function ImageSlider({ images, className, imageClassName }: ImageSliderProps) {
  const [current, setCurrent] = React.useState(0)
  const count = images.length

  if (count === 0) return null

  const prev = () => setCurrent((i) => (i === 0 ? count - 1 : i - 1))
  const next = () => setCurrent((i) => (i === count - 1 ? 0 : i + 1))

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="flex w-full items-center gap-3">
        <button
          onClick={prev}
          aria-label="Imagen anterior"
          className="shrink-0 text-foreground/50 transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-6" />
        </button>

        <div className="relative min-w-0 flex-1 overflow-hidden rounded-xl ring-4 ring-white shadow-lg">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt ?? `Imagen ${i + 1}`}
                className={cn('aspect-video w-full shrink-0 object-cover', imageClassName)}
              />
            ))}
          </div>
        </div>

        <button
          onClick={next}
          aria-label="Siguiente imagen"
          className="shrink-0 text-foreground/50 transition-colors hover:text-foreground"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      {count > 1 && (
        <div className="flex gap-2" role="tablist" aria-label="Indicadores de imagen">
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Imagen ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={cn(
                'size-2.5 rounded-full border-2 border-primary transition-colors',
                i === current ? 'bg-primary' : 'bg-transparent',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

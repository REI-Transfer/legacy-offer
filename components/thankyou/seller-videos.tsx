"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { SELLER_VIDEOS, YOUTUBE_CHANNEL_URL } from "@/lib/thankyou-videos"

// Thumbnail first, YouTube player only after a tap. Twelve live iframes would
// make the page slow on a phone, and this page loads right after the lead.
function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative overflow-hidden rounded-xl bg-black" style={{ aspectRatio: "16/9" }}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl transition-transform group-hover:scale-105">
            <Play className="ml-1 h-6 w-6 text-gray-900" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  )
}

export function SellerVideos({ accentColor }: { accentColor: string }) {
  if (SELLER_VIDEOS.length === 0) return null
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-8 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Hear From Sellers Like You</h3>
      <p className="text-sm text-gray-500 mb-5">
        Real homeowners we&apos;ve helped, in their own words.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {SELLER_VIDEOS.map((v) => (
          <div key={v.id}>
            <LiteYouTube id={v.id} title={v.title} />
            <p className="mt-2 text-sm font-semibold text-gray-900 leading-snug">{v.title}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold underline"
          style={{ color: accentColor }}
        >
          See all our videos on YouTube
        </a>
      </div>
    </div>
  )
}

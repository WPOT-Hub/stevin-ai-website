'use client'

import { useState } from 'react'

/**
 * De playlist bij de relatiefles (W-918). De speler van Spotify laadt pas na
 * een tik: zo gaat er geen verzoek naar Spotify voordat de bezoeker dat zelf
 * wil, en hoeft de pagina er niet op te wachten.
 */
const PLAYLIST = '3rvhGTMZz16wuA0OWPvbEc'
const LINK = `https://open.spotify.com/playlist/${PLAYLIST}`

export default function FlesPlaylist() {
  const [open, setOpen] = useState(false)

  if (open) {
    return (
      <div className="mt-10">
        <iframe
          title="De playlist Stevin.AI op Spotify"
          src={`https://open.spotify.com/embed/playlist/${PLAYLIST}`}
          width="100%"
          height="560"
          style={{ border: 0, borderRadius: 12, display: 'block' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
        <p className="m-0 mt-4 text-[15px] text-[#2A3A54]">
          Liever in de app?{' '}
          <a
            href={LINK}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4"
          >
            Open de playlist in Spotify
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="mt-10 rounded-xl border border-border bg-white p-7 sm:p-9">
      <p className="m-0 font-display text-[20px] font-bold text-primary" style={{ letterSpacing: '-0.01em' }}>
        31 nummers, ruim twee uur
      </p>
      <p className="m-0 mt-2 max-w-[560px] text-[16px] leading-[1.55] text-[#2A3A54]">
        De speler komt van Spotify zelf en laadt pas als je erop tikt.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex cursor-pointer items-center rounded-lg bg-accent px-7 py-3.5 font-display text-[15px] font-bold text-white transition-[filter] hover:brightness-110"
        >
          Speel hier af
        </button>
        <a
          href={LINK}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-[15px] font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4"
        >
          Open in Spotify
        </a>
      </div>
    </div>
  )
}

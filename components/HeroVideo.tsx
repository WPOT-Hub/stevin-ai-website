'use client'

export default function HeroVideo() {
  return (
    <div className="video-blob-glow">
      <div className="hero-video-blob w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] xl:w-[460px] xl:h-[460px]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

import { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import BlurText from "../reactbits/BlurText";
import FadeContent from "../reactbits/FadeContent";
import Button from "../ui/Button";
import { heroContent } from "../../data/content";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Radial gradient glow — constrained to prevent overflow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] sm:h-[600px] sm:w-[600px]" />
        <div className="absolute bottom-0 left-1/4 h-[200px] w-[200px] rounded-full bg-accent/10 blur-[100px] sm:h-[300px] sm:w-[300px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
        <BlurText
          text={heroContent.headline}
          animateBy="words"
          direction="top"
          delay={120}
          className="mb-6 justify-center text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl"
          tag="h1"
        />

        <FadeContent duration={0.8} delay={0.8} blur>
          <p className="mx-auto mb-8 max-w-2xl text-base text-text-secondary sm:text-lg md:text-xl">
            {heroContent.subheadline}
          </p>
        </FadeContent>

        {/* Video player */}
        <FadeContent duration={0.8} delay={1.0} blur>
          <div
            className="group relative mx-auto mb-10 max-w-3xl cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-primary/20"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src="/video_landing.mp4"
              poster="/video_poster.jpg"
              playsInline
              preload="metadata"
              className="w-full"
              onEnded={() => setIsPlaying(false)}
            />

            {/* Play/pause overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center bg-navy/40 transition-opacity duration-300 ${
                isPlaying
                  ? "opacity-0 group-hover:opacity-100"
                  : "opacity-100"
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-transform duration-300 hover:scale-110 sm:h-20 sm:w-20">
                {isPlaying ? (
                  <Pause className="h-7 w-7 text-white sm:h-8 sm:w-8" />
                ) : (
                  <Play className="h-7 w-7 translate-x-0.5 text-white sm:h-8 sm:w-8" />
                )}
              </div>
            </div>
          </div>
        </FadeContent>

        <FadeContent duration={0.6} delay={1.4}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/simulador"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer sm:px-8 sm:py-4 sm:text-base bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              {heroContent.ctaPrimary}
            </Link>
            <Button href="#como-funciona" variant="secondary">
              {heroContent.ctaSecondary}
            </Button>
          </div>
        </FadeContent>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-navy to-transparent" />
    </section>
  );
}

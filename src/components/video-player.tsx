"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(t: number) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

const playIcon = (
  /* Треугольник с центроидом по центру viewBox (12.5 ≈ оптический центр) */
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 5.5l10.5 6.5L9 18.5V5.5z" />
  </svg>
);

const pauseIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6.5" y="5" width="3.6" height="14" rx="1.2" />
    <rect x="13.9" y="5" width="3.6" height="14" rx="1.2" />
  </svg>
);

const soundOnIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9.5v5h3.2L12 18.6V5.4L7.2 9.5H4z" fill="currentColor" stroke="none" />
    <path d="M15.5 9.2a4 4 0 010 5.6" />
    <path d="M17.8 6.9a7.2 7.2 0 010 10.2" />
  </svg>
);

const soundOffIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9.5v5h3.2L12 18.6V5.4L7.2 9.5H4z" fill="currentColor" stroke="none" />
    <path d="M15.5 9.8l4.4 4.4M19.9 9.8l-4.4 4.4" />
  </svg>
);

const fullscreenIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 4H5.5A1.5 1.5 0 004 5.5V9" />
    <path d="M15 4h3.5A1.5 1.5 0 0120 5.5V9" />
    <path d="M9 20H5.5A1.5 1.5 0 014 18.5V15" />
    <path d="M15 20h3.5a1.5 1.5 0 001.5-1.5V15" />
  </svg>
);

export default function VideoPlayer({ src }: { src: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);

  /* Плавный прогресс через rAF, пока идёт воспроизведение */
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && v.duration) {
        setProgress(v.currentTime / v.duration);
        setTime(v.currentTime);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    /* play() может отклониться (смена слайда, политика автоплея) — глушим, чтобы не было unhandled rejection */
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const seekTo = (clientX: number) => {
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar || !v.duration) return;
    const rect = bar.getBoundingClientRect();
    const p = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    v.currentTime = p * v.duration;
    setProgress(p);
    setTime(v.currentTime);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    /* capture может быть недоступен (например, для синтетических событий) — сик важнее */
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* no-op */
    }
    seekTo(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) seekTo(event.clientX);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  return (
    <div ref={wrapRef} className="vplayer">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      />

      {!playing ? (
        <button type="button" className="vplayer-big" aria-label="Воспроизвести" onClick={toggle}>
          {playIcon}
        </button>
      ) : null}

      <div className="vplayer-bar">
        <button type="button" className="vplayer-btn" aria-label={playing ? "Пауза" : "Воспроизвести"} onClick={toggle}>
          {playing ? pauseIcon : playIcon}
        </button>

        <div
          ref={progressRef}
          className="vplayer-progress"
          role="slider"
          aria-label="Прогресс воспроизведения"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
        >
          <span className="vplayer-progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>

        <span className="vplayer-time">
          {formatTime(time)} / {formatTime(duration)}
        </span>

        <button type="button" className="vplayer-btn" aria-label={muted ? "Включить звук" : "Выключить звук"} onClick={toggleMute}>
          {muted ? soundOffIcon : soundOnIcon}
        </button>

        <button type="button" className="vplayer-btn" aria-label="На весь экран" onClick={toggleFullscreen}>
          {fullscreenIcon}
        </button>
      </div>
    </div>
  );
}

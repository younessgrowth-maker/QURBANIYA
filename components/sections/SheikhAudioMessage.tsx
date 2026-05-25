"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

// Section "Message audio du cheikh" — version sobre, audio-only.
//
// Pourquoi audio-only et pas vidéo : la vidéo source du cheikh a un fond
// chroma-key (Mecque incrustée) qui peut être perçu comme trompeur par
// l'audience musulmane pratiquante. Le discours en revanche est excellent :
// endorsement explicite Qurbaniya, mention conformité Sounnah, vidéo
// nominative, distribution viande. On garde 100% du contenu marketing
// sans le risque visuel.
//
// UX :
// - Cover statique : photo officielle du cheikh + logo + badge "Ambassadeur"
// - Lecteur audio HTML5 stylé (play/pause + barre de progression + mute)
// - Sous-titres synchronisés via <track src="...vtt"> + cuechange listener
//   pour afficher la phrase courante sous le lecteur (accessibilité +
//   capture l'attention quand le son est coupé sur mobile).
//
// Mobile : le HTML <audio> avec un src mp3 est universellement supporté
// (iOS / Android / desktop). Pas besoin de polyfill.

export default function SheikhAudioMessage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentCue, setCurrentCue] = useState<string>("");

  // Met à jour la barre de progression + listener cuechange pour les sous-titres
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMeta = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMeta);
    audio.addEventListener("ended", onEnded);

    // Sous-titres : on désactive l'affichage natif (que le navigateur
    // rendrait par-dessus la vidéo s'il y en avait une) et on lit
    // manuellement les cues actives pour les afficher en React.
    const setupTrack = () => {
      const track = audio.textTracks[0];
      if (!track) return;
      track.mode = "hidden";
      const onCueChange = () => {
        const active = track.activeCues?.[0];
        // VTTCue.text n'est pas dans les types par défaut, on fait un cast safe
        const text =
          active && "text" in active ? (active as VTTCue).text : "";
        setCurrentCue(text);
      };
      track.addEventListener("cuechange", onCueChange);
      return () => track.removeEventListener("cuechange", onCueChange);
    };
    // Le track peut ne pas être prêt immédiatement, on retente une fois loadedmetadata
    const cleanup = setupTrack();
    const onLoadedMetaTrack = () => {
      if (!cleanup) setupTrack();
    };
    audio.addEventListener("loadedmetadata", onLoadedMetaTrack);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMeta);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadedmetadata", onLoadedMetaTrack);
      if (cleanup) cleanup();
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  }

  const formatTime = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progressPct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <section className="bg-bg-primary section-padding" id="message-cheikh">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
            Message audio
          </span>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-text-primary mb-3">
            Écoutez l&apos;<span className="text-gold">imam Shamsuddin</span>
          </h2>
          <p className="text-text-muted text-sm md:text-base">
            1 minute 42 — notre ambassadeur explique le service en quelques mots
          </p>
        </div>

        <div className="bg-bg-secondary border border-gold/20 rounded-2xl overflow-hidden shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-0">
            {/* Cover */}
            <div
              className="relative aspect-square md:aspect-auto md:h-full bg-bg-tertiary overflow-hidden"
              style={{ minHeight: 200 }}
            >
              <Image
                src="/cheikhChamsouddin.jpg"
                alt="Imam Shamsuddin"
                fill
                sizes="(max-width: 768px) 100vw, 200px"
                className="object-cover"
              />
              {/* Overlay sombre pour cohérence visuelle */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* Badge ambassadeur */}
              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-flex items-center gap-1.5 bg-emerald/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  Ambassadeur Qurbaniya
                </span>
              </div>
            </div>

            {/* Player + transcription cue */}
            <div className="p-5 md:p-6 flex flex-col gap-4">
              <div>
                <p className="font-bold text-text-primary text-base">
                  Imam Shamsuddin
                </p>
                <p className="text-text-muted-light text-xs font-inter">
                  Ambassadeur · Conformité Sounnah
                </p>
              </div>

              {/* Cue affichée (sous-titre courant) — donne envie de cliquer */}
              <div
                className="bg-bg-primary border border-gray-100 rounded-lg p-3 min-h-[64px] flex items-center"
                aria-live="polite"
              >
                <p className="text-text-primary text-sm italic leading-relaxed">
                  {currentCue ||
                    "« Je m'assure personnellement que chaque sacrifice est accompli avec votre intention, dans le respect total de la Sounnah… »"}
                </p>
              </div>

              {/* Lecteur custom */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : "Lecture"}
                  className="flex-shrink-0 w-11 h-11 rounded-full bg-gold hover:bg-gold-light text-white flex items-center justify-center transition-colors shadow-soft"
                >
                  {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>

                <div className="flex-1 flex flex-col gap-1">
                  <div
                    className="h-1.5 bg-gray-200 rounded-full overflow-hidden cursor-pointer relative"
                    onClick={seek}
                    role="slider"
                    aria-label="Progression audio"
                    aria-valuemin={0}
                    aria-valuemax={duration}
                    aria-valuenow={progress}
                    tabIndex={0}
                  >
                    <div
                      className="h-full bg-gold transition-all"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-text-muted-light font-inter tabular-nums">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Activer le son" : "Couper le son"}
                  className="flex-shrink-0 w-9 h-9 rounded-full text-text-muted hover:text-gold transition-colors flex items-center justify-center"
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              {/* Audio HTML5 avec sous-titres */}
              <audio
                ref={audioRef}
                src="/audio/cheikh-shamsuddin.mp3"
                preload="metadata"
                className="hidden"
              >
                <track
                  kind="subtitles"
                  src="/audio/cheikh-shamsuddin.vtt"
                  srcLang="fr"
                  label="Français"
                  default
                />
              </audio>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-text-muted-light mt-4 font-inter">
          Message enregistré pour la communauté musulmane francophone
        </p>
      </div>
    </section>
  );
}

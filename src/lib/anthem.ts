"use client";

import { useEffect, useSyncExternalStore } from "react";

export interface AnthemState {
  available: boolean;
  playing: boolean;
  time: number;
  duration: number;
}

const INITIAL_STATE: AnthemState = {
  available: false,
  playing: false,
  time: 0,
  duration: 0,
};

/**
 * A single, app-wide player for the national anthem.
 *
 * The header control and the homepage AudioPlayer both bind to this store, so
 * there is exactly one underlying HTMLAudioElement: starting the anthem from
 * one control reflects immediately on the other, and pausing one pauses both.
 * The element is created lazily in the browser, so nothing touches the DOM
 * during SSR.
 */

let audio: HTMLAudioElement | null = null;
let listeners: Array<() => void> = [];
let state: AnthemState = INITIAL_STATE;
let currentSrc: string | null = null;

function emit() {
  for (const listener of listeners) listener();
}

function setState(next: Partial<AnthemState>) {
  state = { ...state, ...next };
  emit();
}

function ensureAudio(src: string): HTMLAudioElement {
  if (audio === null) {
    const el = new Audio();
    el.preload = "metadata";
    el.addEventListener("loadedmetadata", () => {
      setState({
        available: Number.isFinite(el.duration) && el.duration > 0,
        duration: el.duration || 0,
      });
    });
    el.addEventListener("timeupdate", () => {
      setState({ time: el.currentTime });
    });
    el.addEventListener("ended", () => {
      setState({ playing: false, time: 0 });
    });
    el.addEventListener("play", () => setState({ playing: true }));
    el.addEventListener("pause", () => setState({ playing: false }));
    audio = el;
  }
  if (currentSrc !== src) {
    currentSrc = src;
    audio.src = src;
  }
  return audio;
}

export function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((item) => item !== listener);
  };
}

export function getSnapshot(): AnthemState {
  return state;
}

/** Load the asset so metadata/availability resolves, without playing. */
export function initAnthem(src: string) {
  ensureAudio(src);
}

export function toggleAnthem(src: string) {
  const el = ensureAudio(src);
  if (el.paused) {
    void el.play();
  } else {
    el.pause();
  }
}

export function restartAnthem() {
  if (!audio) return;
  audio.currentTime = 0;
  setState({ time: 0 });
}

export function seekAnthem(time: number) {
  if (!audio) return;
  audio.currentTime = time;
  setState({ time });
}

export function useAnthem(src: string): AnthemState {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  useEffect(() => {
    initAnthem(src);
  }, [src]);
  return snapshot;
}

import {
  concatAll,
  take,
  count,
  debounceTime,
  delay,
  filter,
  forkJoin,
  from,
  fromEvent,
  map,
  scan,
  withLatestFrom,
  of,
  switchMap,
  tap,
  distinctUntilChanged,
} from "rxjs";
import { Sketch } from "./sketch-04";
import { Pane } from "tweakpane";
import { AudioControl } from "./audio-control";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const hasDebugParam = urlParams.get("debug");
const isDev = import.meta.env.MODE === "development";
const audioControl = new AudioControl(isDev);
let sketch;
let pane;

if (isDev) {
  import("https://greggman.github.io/webgl-lint/webgl-lint.js");
}

if (hasDebugParam || isDev) {
  pane = new Pane({ title: "Settings", expanded: isDev });
}

const resize = () => {
  // explicitly set the width and height to compensate for missing dvh and dvw support
  document.body.style.width = `${document.documentElement.clientWidth}px`;
  document.body.style.height = `${document.documentElement.clientHeight}px`;

  if (sketch) {
    sketch.resize();
  }
};

const logoElm = document.body.querySelector("#logo");
const inputInfoElm = document.body.querySelector("#input-info");
const micBtnElm = document.body.querySelector("#microphone-button");

// add a debounced resize listener
fromEvent(window, "resize")
  .pipe(debounceTime(100))
  .subscribe(() => resize());

// resize initially on load
fromEvent(window, "load")
  .pipe(take(1))
  .subscribe(() => resize());

// mic button
fromEvent(micBtnElm, "click").subscribe(() => {
  audioControl.init();
  micBtnElm.disabled = true;
});

// INIT APP
const canvasElm = document.querySelector("canvas");
sketch = new Sketch(
  canvasElm,
  audioControl,
  (instance) => {
    instance.run();
  },
  () => {
    logoElm.style.opacity = 1;
    logoElm.style.letterSpacing = "1.3em";
    inputInfoElm.style.opacity = 1;
    inputInfoElm.style.pointerEvents = "all";
  },
  isDev,
  pane
);
resize();

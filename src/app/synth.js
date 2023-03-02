import * as Tone from "tone";

export function sine() {
  let osc = new Tone.Oscillator();
  osc.type = "sine"; // triangle, square or sawtooth
  osc.frequency.value = 80; // hz
  osc.start();
  osc.toDestination();
}

export function audioStream() {
  // create audio stream here?
}

import * as Tone from "tone";

export function sine() {
  let osc = new Tone.Oscillator();
  let waveform = new Tone.Waveform();
  Tone.Destination.connect(waveform);
  const waveformValue = waveform.getValue(0);

  osc.type = "sine"; // triangle, square or sawtooth
  osc.frequency.value = 80; // hz

  osc.start();
  osc.toDestination();
}

export function audioStream() {
  // create audio stream here?
}

import AltAudioNode from "altnode.alt-audio-node";
import { CHANNELS } from "./symbols";

export default class MixerGainNode extends AltAudioNode {
  constructor(audioContext, numberOfInputs = 2) {
    super(audioContext);

    this[CHANNELS] = new Array(numberOfInputs);

    for (let i = 0; i < numberOfInputs; i++) {
      this[CHANNELS][i] = audioContext.createGain();
    }
  }

  getChannelGain(channel) {
    return this[CHANNELS][channel].gain;
  }

  connect(...args) {
    this[CHANNELS].forEach((gain) => {
      gain.connect(...args);
    });
  }

  disconnect(...args) {
    this[CHANNELS].forEach((gain) => {
      gain.disconnect(...args);
    });
  }

  dispose() {
    this[CHANNELS].forEach((gain) => {
      gain.disconnect();
    });
    this[CHANNELS] = null;
  }

  __connectFrom(source, outputNum = 0, inputNum = 0) {
    source.connect(this[CHANNELS][inputNum], outputNum);
  }
}

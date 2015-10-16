import assert from "power-assert";
import MixerGainNode from "../src/MixerGainNode";
import { CHANNELS } from "../src/symbols";

describe("MixerGainNode", () => {
  let audioContext;

  beforeEach(() => {
    audioContext = new global.AudioContext();
  });

  describe("constructor(audioContext: AudioContext, numberOfInputs: number = 2)", () => {
    it("works", () => {
      let mixer = new MixerGainNode(audioContext);

      assert(mixer instanceof MixerGainNode);
    });
  });
  describe("#getChannelGain(channel: number): AudioParam", () => {
    it("works", () => {
      let mixer = new MixerGainNode(audioContext);

      assert(mixer.getChannelGain(0) instanceof global.AudioParam);
      assert(mixer.getChannelGain(0) === mixer[CHANNELS][0].gain);
      assert(mixer.getChannelGain(1) instanceof global.AudioParam);
      assert(mixer.getChannelGain(1) === mixer[CHANNELS][1].gain);
    });
  });
  describe("#connect(...args): void", () => {
    it("works", () => {
      let mixer = new MixerGainNode(audioContext);

      mixer.connect(audioContext.destination);

      assert(audioContext.destination.$isConnectedFrom(mixer[CHANNELS][0]));
      assert(audioContext.destination.$isConnectedFrom(mixer[CHANNELS][1]));
    });
  });
  describe("#disconnect(...args): void", () => {
    it("works", () => {
      let mixer = new MixerGainNode(audioContext);

      mixer.connect(audioContext.destination);
      mixer.disconnect();

      assert(!audioContext.destination.$isConnectedFrom(mixer[CHANNELS][0]));
      assert(!audioContext.destination.$isConnectedFrom(mixer[CHANNELS][1]));
    });
  });
  describe("#dispose(): void", () => {
    it("works", () => {
      let mixer = new MixerGainNode(audioContext);

      mixer.dispose();

      assert.throws(() => {
        mixer.dispose();
      });
    });
  });
  describe("connected from", () => {
    it("works", () => {
      let oscillator1 = audioContext.createOscillator();
      let oscillator2 = audioContext.createOscillator();
      let mixer = new MixerGainNode(audioContext);

      oscillator1.connect(mixer, 0, 0);
      oscillator2.connect(mixer, 0, 1);

      assert(mixer[CHANNELS][0].$isConnectedFrom(oscillator1));
      assert(!mixer[CHANNELS][0].$isConnectedFrom(oscillator2));
      assert(mixer[CHANNELS][1].$isConnectedFrom(oscillator2));
      assert(!mixer[CHANNELS][1].$isConnectedFrom(oscillator1));
    });
  });
  describe("graph", () => {
    it("works", () => {
      let mixer = new MixerGainNode(audioContext, 4);

      mixer.getChannelGain(0).value = 0.0;
      mixer.getChannelGain(1).value = 0.1;
      mixer.getChannelGain(2).value = 0.2;
      mixer.getChannelGain(3).value = 0.3;

      mixer.connect(audioContext.destination);

      assert.deepEqual(audioContext.destination.toJSON(), {
        name: "AudioDestinationNode",
        inputs: [
          {
            name: "GainNode",
            gain: {
              value: 0,
              inputs: []
            },
            inputs: []
          },
          {
            name: "GainNode",
            gain: {
              value: 0.1,
              inputs: []
            },
            inputs: []
          },
          {
            name: "GainNode",
            gain: {
              value: 0.2,
              inputs: []
            },
            inputs: []
          },
          {
            name: "GainNode",
            gain: {
              value: 0.3,
              inputs: []
            },
            inputs: []
          }
        ]
      });
    });
  });
});

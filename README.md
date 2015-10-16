# altnode.MixerGainNode
[![Build Status](http://img.shields.io/travis/altnode/mixer-gain-node.svg?style=flat-square)](https://travis-ci.org/altnode/mixer-gain-node)
[![NPM Version](http://img.shields.io/npm/v/altnode.mixer-gain-node.svg?style=flat-square)](https://www.npmjs.org/package/altnode.mixer-gain-node)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

## Installation

```
npm install -S altnode.mixer-gain-node
```

## API
### AudioNode
- `constructor(audioContext: AudioContext, numberOfInputs = 2)`

#### Instance attributes
- `context: AudioContext`

#### Instance methods
_Also implements methods from the interface [altnode.AudioNode](https://github.com/altnode/audio-node)._

- `getChannelGain(channel: number): AudioParam`

## Example

```js
import MixerGainNode from "altnode.mixer-gain-node";

let audioContext = new AudioContext();
let oscillator1 = audioContext.createOscillator();
let oscillator2 = audioContext.createOscillator();
let oscillator3 = audioContext.createOscillator();
let mixer = new MixerGainNode(audioContext, 3);
let t0 = audioContext.currentTime;
let t1 = t0 + 5;

oscillator1.frequency.value = 440;
oscillator1.start(t0);
oscillator1.stop(t1);
oscillator1.connect(mixer, 0, 0);

oscillator2.frequency.value = 660;
oscillator2.start(t0);
oscillator2.stop(t1);
oscillator1.connect(mixer, 0, 1);

oscillator3.frequency.value = 880;
oscillator3.start(t0);
oscillator3.stop(t1);
oscillator1.connect(mixer, 0, 2);

mixer.getChannelGain(0).value = 0.1;
mixer.getChannelGain(1).value = 0.2;
mixer.getChannelGain(2).setValueAtTime(0, t0);
mixer.getChannelGain(2).linearRampToValueAtTime(0.5, t1);

mixer.connect(audioContext.destination);
```

## LICENSE
MIT

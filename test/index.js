import assert from "power-assert";
import index from "../src";
import MixerGainNode from "../src/MixerGainNode";

describe("index", () => {
  it("exports", () => {
    assert(index === MixerGainNode);
  });
});

import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import testSound from "../assets/audio/500Hz_Dobbelpip.wav";

export class Sounds {
  private sound: Sound | null;
  private intervalId: NodeJS.Timeout | null;
  private onSoundCreateAndLoad: () => void;
  private onSoundStopAndUnload: () => void;

  constructor(
    onSoundCreateAndLoad: () => void,
    onSoundStopAndUnload: () => void,
  ) {
    this.sound = null;
    this.intervalId = null;
    this.onSoundCreateAndLoad = onSoundCreateAndLoad;
    this.onSoundStopAndUnload = onSoundStopAndUnload;
    void this.createAndLoad();
  }

  private createAndLoad = () => {
    void Audio.Sound.createAsync(testSound).then(({ sound }) => {
      this.sound = sound;
      this.onSoundCreateAndLoad();
    });
  };

  public playInLoop = () => {
    this.intervalId = setInterval(() => {
      void this.sound?.replayAsync();
    }, 1500);
  };

  public stop = () => {
    void this.sound?.stopAsync().then(() => {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    });
  };

  public stopAndUnload = () => {
    this.stop();
    void this.sound?.unloadAsync().then(() => {
      this.onSoundStopAndUnload();
    });
  };
}

import Sound from "react-native-sound";
import testSound from "../assets/audio/500Hz_Dobbelpip.wav";
import { Ear } from "../types";

export class Sounds {
  private sound: Sound;
  private intervalId: NodeJS.Timeout | null;
  private onSoundCreateAndLoad: () => void;
  private onSoundStopAndRelease: () => void;

  constructor(
    onSoundCreateAndLoad: () => void,
    onSoundStopAndRelease: () => void,
  ) {
    this.sound = new Sound(testSound, this.onSoundsLoaded);
    this.intervalId = null;
    this.onSoundCreateAndLoad = onSoundCreateAndLoad;
    this.onSoundStopAndRelease = onSoundStopAndRelease;
  }

  private onSoundsLoaded = (error: unknown) => {
    if (error) {
      console.error("failed to load the sound", error);
      return;
    }

    const isSoundsLoaded = this.getIsSoundsLoaded(this.getSounds());
    if (isSoundsLoaded) {
      this.initializeSoundPlayback();
      this.onSoundCreateAndLoad();
    }
  };

  private getSounds = () => {
    return [this.sound];
  };

  private getIsSoundsLoaded = (sounds: Sound[]) => {
    let isSoundsLoaded = true;
    sounds.forEach((sound) => {
      if (!sound.isLoaded()) {
        isSoundsLoaded = false;
      }
    });
    return isSoundsLoaded;
  };

  public playInLoop = (ear: Ear) => {
    this.sound.setPan(ear === "left" ? -1 : 1);
    this.intervalId = setInterval(() => {
      this.sound.play();
    }, 1500);
  };

  public stop = () => {
    this.getSounds().forEach((sound) => {
      sound.stop(() => {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      });
    });
  };

  private releaseSounds = () => {
    this.getSounds().forEach((sound) => {
      sound.release();
    });
    Sound.setActive(false);
  };

  public stopAndRelease = () => {
    this.stop();
    this.releaseSounds();
    this.onSoundStopAndRelease();
  };

  private initializeSoundPlayback = () => {
    Sound.setCategory("Playback");
    Sound.setMode("Measurement");
    Sound.setActive(true);
  };
}

// Sound manager - all sounds disabled per user request
class SoundManager {
  public enabled: boolean = false;

  public playClick() {
    // Disabled
  }

  public playSlide() {
    // Disabled
  }

  public playSuccess() {
    // Disabled
  }
}

export const sound = new SoundManager();

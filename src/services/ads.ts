export type RewardedAdCallback = () => void;

export interface AdsManager {
  init(): Promise<void>;
  showBanner(): void;
  showInterstitial(): void;
  showRewardedAd(onEarned: RewardedAdCallback): void;
}

class NoOpAdsManager implements AdsManager {
  async init() {}
  showBanner() {}
  showInterstitial() {}
  showRewardedAd(onEarned: RewardedAdCallback) { onEarned(); }
}

export const adsManager: AdsManager = new NoOpAdsManager();

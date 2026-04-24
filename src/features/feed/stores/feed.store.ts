import { makeAutoObservable } from "mobx";
import type { FeedTierFilter } from "@/features/feed/types";

class FeedStore {
  tier: FeedTierFilter = "all";

  constructor() {
    makeAutoObservable(this);
  }

  setTier(value: FeedTierFilter) {
    this.tier = value;
  }
}

export const feedStore = new FeedStore();
import { makeAutoObservable } from "mobx";
import type { FeedTierFilter } from "@/features/feed/types";

class FeedStore {
  tier: FeedTierFilter = "all";
  isRefreshingManually = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTier(value: FeedTierFilter) {
    this.tier = value;
  }

  setRefreshingManually(value: boolean) {
    this.isRefreshingManually = value;
  }
}

export const feedStore = new FeedStore();
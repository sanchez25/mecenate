import { getPosts } from "@/api/posts.api";
import type { FeedTierFilter } from "@/features/feed/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePostsFeed(tier: FeedTierFilter) {
  return useInfiniteQuery({
    queryKey: ["posts-feed", tier],
    queryFn: ({ pageParam }) =>
      getPosts({
        cursor: pageParam ?? undefined,
        limit: 10,
        tier: tier === "all" ? undefined : tier,
        //simulate_error: true,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore ? lastPage.data.nextCursor : undefined,
    retry: false,
  });
}
import { getPostComments } from "@/api/comments.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePostComments(postId: string) {
    return useInfiniteQuery({
        queryKey: ["post-comments", postId],
        queryFn: ({ pageParam }) =>
            getPostComments(postId, {
                limit: 20,
                cursor: pageParam ?? undefined,
        }),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) =>
            lastPage.data.hasMore ? lastPage.data.nextCursor : undefined,
        enabled: !!postId,
        retry: false,
    });
}
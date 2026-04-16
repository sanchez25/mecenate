import { getPostById } from "@/api/posts.api";
import { useQuery } from "@tanstack/react-query";

export function usePostDetail(postId: string) {
    return useQuery({
        queryKey: ["post-detail", postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId,
        retry: false,
    });
}
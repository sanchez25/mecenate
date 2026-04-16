import { api } from "@/api/client";
import type { CommentCreatedResponse, CommentsResponse } from "@/api/types";

export async function getPostComments(
    postId: string,
    params: { limit?: number; cursor?: string | null } = {}
    ) {
        const { data } = await api.get<CommentsResponse>(`/posts/${postId}/comments`, {
        params: {
            limit: params.limit ?? 20,
            cursor: params.cursor ?? undefined,
        },
    });
    return data;
}

export async function addPostComment(postId: string, text: string) {
    const { data } = await api.post<CommentCreatedResponse>(`/posts/${postId}/comments`, {
        text,
    });
  
    return data;
}
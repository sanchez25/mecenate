import { api } from "@/api/client";
import type { LikeResponse, PostDetailResponse, PostsResponse } from "@/api/types";

type GetPostsParams = {
  limit?: number;
  cursor?: string | null;
  tier?: "free" | "paid";
  simulate_error?: boolean;
};

export async function getPosts(params: GetPostsParams = {}) {
  const { data } = await api.get<PostsResponse>("/posts", {
    params: {
      limit: params.limit ?? 10,
      cursor: params.cursor ?? undefined,
      tier: params.tier ?? undefined,
      simulate_error: params.simulate_error ?? undefined,
    },
  });

  return data;
}

export async function getPostById(id: string) {
  const { data } = await api.get<PostDetailResponse>(`/posts/${id}`);
  return data;
}

export async function togglePostLike(id: string) {
  const { data } = await api.post<LikeResponse>(`/posts/${id}/like`);
  return data;
}
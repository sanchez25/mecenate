import { createAppWebSocket } from "@/api/ws";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
    postId: string;
};

export function usePostRealtime({ postId }: Props) {
    const queryClient = useQueryClient();
  
    useEffect(() => {
        const ws = createAppWebSocket();

        ws.onmessage = (event) => {
            const payload = JSON.parse(event.data);

            if (payload.type === "like_updated" && payload.postId === postId) {
                queryClient.invalidateQueries({ queryKey: ["post-detail", postId] });
                queryClient.invalidateQueries({ queryKey: ["posts-feed"] });
            }

            if (payload.type === "comment_added" && payload.postId === postId) {
                queryClient.invalidateQueries({ queryKey: ["post-comments", postId] });
                queryClient.invalidateQueries({ queryKey: ["post-detail", postId] });
                queryClient.invalidateQueries({ queryKey: ["posts-feed"] });
            }
        };

        return () => {
            ws.close();
        };
    }, [postId, queryClient]);
}
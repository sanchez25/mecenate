import { AppWebSocketClient } from "@/api/ws-client";
import { getWebSocketUrl } from "@/api/ws";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
    postId: string;
};

type WsPayload =
  | {
      type: "like_updated";
      postId: string;
      likesCount: number;
    }
  | {
      type: "comment_added";
      postId: string;
    }
  | {
      type: "ping";
    };

export function usePostRealtime({ postId }: Props) {
    const queryClient = useQueryClient();
  
    useEffect(() => {
        const client = new AppWebSocketClient({
            url: getWebSocketUrl(),
            onMessage: (data) => {
                const payload = data as WsPayload;
        
                if (payload.type === "like_updated" && payload.postId === postId) {
                    queryClient.invalidateQueries({ queryKey: ["post-detail", postId] });
                    queryClient.invalidateQueries({ queryKey: ["posts-feed"] });
                }
        
                if (payload.type === "comment_added" && payload.postId === postId) {
                    queryClient.invalidateQueries({ queryKey: ["post-comments", postId] });
                    queryClient.invalidateQueries({ queryKey: ["post-detail", postId] });
                    queryClient.invalidateQueries({ queryKey: ["posts-feed"] });
                }
            },
            maxRetries: 10,
        });

        client.connect();

        return () => {
            client.disconnect();
        };
    }, [postId, queryClient]);
}
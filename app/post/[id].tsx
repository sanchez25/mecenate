import { PostDetailScreen } from "@/features/post-detail/PostDetailScreen";
import { Stack, useLocalSearchParams } from "expo-router";

export default function PostDetailPage() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Пост",
                }}
            />
            <PostDetailScreen postId={id} />
        </>
    );
}
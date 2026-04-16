import { ErrorState } from "@/features/feed/components/ErrorState";
import { CommentInput } from "@/features/post-detail/components/CommentInput";
import { CommentsList } from "@/features/post-detail/components/CommentsList";
import { LikeButton } from "@/features/post-detail/components/LikeButton";
import { usePostRealtime } from "@/features/post-detail/hooks/usePostRealtime";
import { appIcons } from "@/shared/constants/images";
import { colors, fontFamilies, fontSizes, radii, sizes, spacing } from "@/shared/constants/tokens";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { usePostDetail } from "./hooks/usePostDetail";

type Props = {
    postId: string;
};

export function PostDetailScreen({ postId }: Props) {
    usePostRealtime({ postId });
    const postQuery = usePostDetail(postId);

    if (postQuery.isLoading) {
        return <ActivityIndicator />;
    }

    if (postQuery.isError || !postQuery.data) {
        return <ErrorState onRetry={() => postQuery.refetch()} />;
    }

    const post = postQuery.data.data.post;

    return (
        <ScrollView contentContainerStyle={styles.card}>
            <View style={styles.header}>
                <Image source={{ uri: post.author.avatarUrl }} style={styles.avatar} />
                <Text style={styles.authorName}>{post.author.displayName}</Text>
            </View>
            <Image source={{ uri: post.coverUrl }} style={styles.imagePost} />
            <View style={styles.content}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.preview}>
                    {post.tier === "paid" ? "Публикация доступна только подписчикам." : post.body}
                </Text>
                <View style={styles.meta}>
                    <LikeButton postId={post.id} isLiked={post.isLiked} likesCount={post.likesCount} />
                    <View style={styles.metaItem}>
                        <Image source={appIcons.commentIcon} accessibilityLabel="Комментарий" /> 
                        <Text style={styles.metaText}>{post.commentsCount}</Text>
                    </View>
                </View>
                <View>
                    <CommentsList postId={post.id} />
                </View>
            </View>
            <View style={styles.commentForm}>
                <CommentInput postId={post.id} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        overflow: "hidden",
        borderRadius: radii.lg
    },
    header: {
        flexDirection: "row",
        backgroundColor: colors.background.card,
        alignItems: "center",
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
        paddingTop: spacing.md,
        gap: spacing.md,
    },
    avatar: {
        width: sizes.avatar,
        height: sizes.avatar,
        borderRadius: radii.round,
    },
    authorInfo: {
        flex: 1,
    },
    authorName: {
        fontSize: fontSizes.md,
        fontFamily: fontFamilies.bold,
        color: colors.text.primary,
    },
    imagePost: {
        width: "100%",
        height: sizes.imagePost,
    },
    content: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        gap: spacing.md,
        backgroundColor: colors.background.card,
    },
    title: {
        fontSize: fontSizes.lg,
        fontFamily: fontFamilies.bold,
        color: colors.text.primary,
    },
    preview: {
        fontSize: fontSizes.md,
        fontFamily: fontFamilies.medium,
        color: colors.text.primary,
    },
    meta: {
        flexDirection: "row",
        gap: spacing.sm,
        marginTop: spacing.sm,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        backgroundColor: colors.background.likes,
        borderRadius: radii.round,
    },
    metaText: {
        fontSize: fontSizes.sm,
        fontFamily: fontFamilies.bold,
        color: colors.text.like,
    },
    commentForm: {
        padding: spacing.lg,
        backgroundColor: colors.background.card,
        marginTop: spacing.sm,
    }
});

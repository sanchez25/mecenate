import type { Post } from "@/api/types";
import { PaidPostPlaceholder } from "@/features/feed/components/PaidPostPlaceholder";
import { LikeButton } from "@/features/post-detail/components/LikeButton";
import { appIcons } from "@/shared/constants/images";
import { colors, fontFamilies, fontSizes, radii, sizes, spacing } from "@/shared/constants/tokens";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    post: Post;
};

export function PostCard({ post }: Props) {
    const router = useRouter();
    const isPaid = post.tier === "paid";

    return (
        <Pressable onPress={() => router.push(`/post/${post.id}`)}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Image source={{ uri: post.author.avatarUrl }} style={styles.avatar} />
                    <View style={styles.authorInfo}>
                        <Text style={styles.authorName} numberOfLines={1}>
                            {post.author.displayName}
                        </Text>
                    </View>
                </View>

                {isPaid ? (
                        <PaidPostPlaceholder 
                            post={post}
                            onDonate={() => {
                                console.log("Донат отправлен", post.id);
                            }}
                        />
                    ) : (
                        <View>
                            <Image source={{ uri: post.coverUrl }} style={styles.imagePost} />
                            <View style={styles.content}>
                                <Text style={styles.title} numberOfLines={2}>
                                    {post.title}
                                </Text>
                                <Text style={styles.preview} numberOfLines={3}>
                                    {post.preview}
                                </Text>

                                <View style={styles.meta}>
                                    <LikeButton postId={post.id} isLiked={post.isLiked} likesCount={post.likesCount} />
                                    <View style={styles.metaItem}>
                                        <Image source={appIcons.commentIcon} accessibilityLabel="Комментарий" /> 
                                        <Text style={styles.metaText}>{post.commentsCount}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.background.card,
        overflow: "hidden",
        borderRadius: radii.lg
    },
    header: {
        flexDirection: "row",
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
        gap: spacing.sm,
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
});
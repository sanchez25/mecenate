import type { Comment } from "@/api/types";
import { colors, fontFamilies, fontSizes, radii, sizes, spacing } from "@/shared/constants/tokens";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
    comment: Comment;
};

export function CommentItem({ comment }: Props) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: comment.author.avatarUrl }}
                style={styles.avatar}
            />
            <View style={styles.content}>
                <Text style={styles.name}>
                    {comment.author.displayName}
                </Text>
                <Text style={styles.text}>
                    {comment.text}
                </Text>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.sm,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },
    avatar: {
        width: sizes.avatar,
        height: sizes.avatar,
        borderRadius: radii.round,
    },
    content: {

    },
    name: {
        fontSize: fontSizes.md,
        fontFamily: fontFamilies.bold,
        color: colors.text.primary,
        marginBottom: 2
    },
    text: {
        color: colors.text.primary,
        fontFamily: fontFamilies.medium,
        fontSize: fontSizes.sm,
    },
});
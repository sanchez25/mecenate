import { CommentItem } from "@/features/post-detail/components/CommentItem";
import { usePostComments } from "@/features/post-detail/hooks/usePostComments";
import { colors, fontFamilies, fontSizes, spacing } from "@/shared/constants/tokens";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

type Props = {
    postId: string;
};

function getCommentsLabel(count: number) {
    if (count % 10 === 1 && count % 100 !== 11) return "комментарий";
    if ([2,3,4].includes(count % 10) && ![12,13,14].includes(count % 100)) return "комментария";
    return "комментариев";
}

export function CommentsList({ postId }: Props) {
    const commentsQuery = usePostComments(postId);
    const comments = commentsQuery.data?.pages.flatMap((page) => page.data.comments) ?? [];
  
    return (
        <View>
            <Text style={styles.title}>
                {comments.length} {getCommentsLabel(comments.length)}
            </Text>
            <FlatList
                scrollEnabled={false}
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CommentItem comment={item} />}
                onEndReached={() => {
                    if (commentsQuery.hasNextPage && !commentsQuery.isFetchingNextPage) {
                    commentsQuery.fetchNextPage();
                    }
                }}
                onEndReachedThreshold={0.4}
                ListFooterComponent={commentsQuery.isFetchingNextPage ? <ActivityIndicator /> : null}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: fontSizes.md,
        fontFamily: fontFamilies.medium,
        color: colors.text.comment,
        marginBottom: spacing.sm,
    }
});
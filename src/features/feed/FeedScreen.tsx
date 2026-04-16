import { ErrorState } from "@/features/feed/components/ErrorState";
import { FeedTabs } from "@/features/feed/components/FeedTabs";
import { PostCard } from "@/features/feed/components/PostCard";
import { usePostsFeed } from "@/features/feed/hooks/UsePostsFeed";
import type { FeedTierFilter } from "@/features/feed/types";
import { colors, fontFamilies, fontSizes, spacing } from "@/shared/constants/tokens";
import { useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

export function FeedScreen() {
    const [tier, setTier] = useState<FeedTierFilter>("all");
    //Берём данные из React Query
    const postsQuery = usePostsFeed(tier);

    //Склеиваем страницы в один массив
    const posts = postsQuery.data?.pages.flatMap((page) => page.data.posts) ?? [];

    //Считаем стартовую загрузку и стартовую ошибку
    const showInitialLoader = postsQuery.isLoading && posts.length === 0;
    const showInitialError = postsQuery.isError && posts.length === 0;

    //Дозагрузка следующей страницы
    const handleLoadMore = () => {
        if (!postsQuery.hasNextPage) return;
        if (postsQuery.isFetchingNextPage) return;

        postsQuery.fetchNextPage();
    };

    const handleRefresh = () => {
        postsQuery.refetch();
    };

    if (showInitialLoader) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (showInitialError) {
        return <ErrorState onRetry={handleRefresh} />;
    }

  return (
    <View style={styles.container}>
        <FeedTabs value={tier} onChange={setTier} />
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostCard post={item} />}
            contentContainerStyle={styles.contentContainer}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
                <RefreshControl
                    refreshing={postsQuery.isRefetching && !postsQuery.isFetchingNextPage}
                    onRefresh={handleRefresh}
                />
            }
            ListFooterComponent={
                postsQuery.isFetchingNextPage ? (
                    <View style={styles.footerLoader}>
                        <ActivityIndicator />
                    </View>
                ) : null
            }
            ListEmptyComponent={
                !postsQuery.isLoading ? (
                    <View style={styles.centered}>
                        <Text style={styles.emptyText}>Публикаций пока нет</Text>
                    </View>
                ) : null
            }
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    contentContainer: {
        gap: spacing.lg,
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.xl,
    },
    footerLoader: {
        paddingVertical: spacing.lg,
    },
    emptyText: {
        fontSize: fontSizes.lg,
        fontFamily: fontFamilies.bold,
    },
});
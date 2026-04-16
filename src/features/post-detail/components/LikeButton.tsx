import { togglePostLike } from "@/api/posts.api";
import { appIcons } from "@/shared/constants/images";
import { colors, fontFamilies, fontSizes, radii, spacing } from "@/shared/constants/tokens";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

type Props = {
    postId: string;
    isLiked: boolean;
    likesCount: number;
};

export function LikeButton({ postId, isLiked, likesCount }: Props) {
    const queryClient = useQueryClient();
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
  
    const likeMutation = useMutation({
        mutationFn: () => togglePostLike(postId),
        onSuccess: async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            scale.value = withSequence(
                withTiming(1.12, { duration: 140 }),
                withTiming(1, { duration: 140 })
            );
            queryClient.invalidateQueries({ queryKey: ["post-detail", postId] });
            queryClient.invalidateQueries({ queryKey: ["posts-feed"] });
        },
    });
  
    return (
        <Pressable 
            style={[styles.button, isLiked && styles.buttonActive]}
            onPress={() => likeMutation.mutate()}
        >
            <Animated.View style={[styles.row, animatedStyle]}>
                <Image source={isLiked ? appIcons.likeIconActive : appIcons.likeIcon} accessibilityLabel="Лайк" /> 
                <Text style={[styles.text, isLiked && styles.textActive]}>{likesCount}</Text>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        backgroundColor: colors.background.likes,
        borderRadius: radii.round,
    },
    buttonActive: {
        backgroundColor: colors.button.active,
    },
    textActive: {
        color: colors.text.button,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontSize: fontSizes.sm,
        fontFamily: fontFamilies.bold,
        color: colors.text.like,
    }
});
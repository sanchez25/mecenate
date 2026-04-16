import { addPostComment } from "@/api/comments.api";
import { appIcons } from "@/shared/constants/images";
import { colors, fontFamilies, fontSizes, radii, sizes, spacing } from "@/shared/constants/tokens";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, TextInput, View } from "react-native";

type Props = {
    postId: string;
};

export function CommentInput({ postId }: Props) {
    const [text, setText] = useState("");
    const queryClient = useQueryClient();

    const addCommentMutation = useMutation({
        mutationFn: (value: string) => addPostComment(postId, value),
        onSuccess: () => {
            setText("");
            queryClient.invalidateQueries({ queryKey: ["post-comments", postId] });
            queryClient.invalidateQueries({ queryKey: ["post-detail", postId] });
            queryClient.invalidateQueries({ queryKey: ["posts-feed"] });
        },
        onError: () => {
            Alert.alert("Ошибка", "Не удалось отправить комментарий");
        },
    });
  
    return (
        <View style={styles.container}>
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Ваш комментарий"
                placeholderTextColor="#A4AAB0"
                style={styles.input}
            />
            <Pressable
                style={styles.button}
                disabled={!text.trim() || addCommentMutation.isPending}
                onPress={() => addCommentMutation.mutate(text.trim())}
            >
                <Image source={appIcons.buttonComment} accessibilityLabel="Отправить комментарий" /> 
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    input: {
        minHeight: sizes.avatar,
        borderWidth: 2,
        borderColor: colors.background.likes,
        borderRadius: radii.xl,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        paddingRight: 30,
        fontSize: fontSizes.md,
        fontFamily: fontFamilies.medium,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 8,
        top: "50%",
        transform: [{ translateY: -16 }],
    },
});
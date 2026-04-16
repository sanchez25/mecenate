import type { Post } from "@/api/types";
import { appIcons } from "@/shared/constants/images";
import { colors, fontFamilies, fontSizes, radii, sizes, spacing } from "@/shared/constants/tokens";
import { BlurView } from "expo-blur";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    post: Post;
    onDonate?: () => void;
};

export function PaidPostPlaceholder({ post, onDonate }: Props) {
    return (
        <View>
            <View style={styles.container}>
                <Image source={{ uri: post.coverUrl }} style={styles.imageBlur} />
                <BlurView intensity={50} style={styles.blurBlock} />
                <View style={styles.blurColor}></View>
                <View style={styles.overlayBlock}>
                    <View style={styles.donateBlock}>
                        <Image source={appIcons.donateIcon} accessibilityLabel="Донат" />
                    </View>
                    <Text style={styles.text}>Контент скрыт пользователем. Доступ откроется после доната</Text>
                    {onDonate ? (
                        <Pressable style={styles.button} onPress={onDonate}>
                            <Text style={styles.buttonText}>Отправить донат</Text>
                        </Pressable>
                    ) : null}
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.emptyTitle}></View>
                <View style={styles.emptyPreview}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        overflow: "hidden",
        height: sizes.imagePost,
        justifyContent: "center",
        alignItems: "center"
    },
    imageBlur: {
        width: "100%",
        height: "100%",
        ...StyleSheet.absoluteFillObject,
    },
    blurBlock: {
        ...StyleSheet.absoluteFillObject,
    },
    blurColor: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.background.overlay,
    },
    overlayBlock: {
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        width: sizes.paidPostText,
    },
    donateBlock: {
        width: sizes.donateBlock,
        height: sizes.donateBlock,
        backgroundColor: colors.button.primary,
        borderRadius: radii.sm,
        padding: spacing.sm,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: fontSizes.md,
        fontFamily: fontFamilies.semiBold,
        color: colors.text.button,
        textAlign: "center",
    },
    button: {
        backgroundColor: colors.button.primary,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.md,
        borderRadius: radii.md,
        width: sizes.buttonMd,
        alignItems: "center",
    },
    buttonText: {
        color: colors.text.button,
        fontFamily: fontFamilies.semiBold,
        fontSize: fontSizes.md,
    },
    content: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        gap: spacing.sm,
    },
    emptyTitle: {
        width: 164,
        height: 26,
        backgroundColor: colors.background.emptyContent,
        borderRadius: radii.xl,
    },
    emptyPreview: {
        width: 360,
        height: 40,
        backgroundColor: colors.background.emptyContent,
        borderRadius: radii.xl,
    },
});
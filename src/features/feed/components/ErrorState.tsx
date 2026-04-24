import { appImages } from "@/shared/constants/images";
import { colors, fontFamilies, fontSizes, radii, sizes, spacing } from "@/shared/constants/tokens";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    onRetry: () => void;
};

export function ErrorState({ onRetry }: Props) {
    return (
        <View style={styles.container}>
            <Image source={appImages.errorState} accessibilityLabel="Ошибка загрузки публикаций" />
            <Text style={styles.text}>Не удалось загрузить публикацию</Text>
            <Pressable style={styles.button} onPress={onRetry}>
                <Text style={styles.buttonText}>Повторить</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.xl,
        gap: spacing.lg,
    },
    text: {
        fontSize: fontSizes.lg,
        fontFamily: fontFamilies.bold,
        textAlign: "center",
        color: colors.text.primary,
    },
    button: {
        backgroundColor: colors.button.primary,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.md,
        borderRadius: radii.md,
        width: sizes.buttonLg,
        alignItems: "center",
    },
    buttonText: {
        color: colors.text.button,
        fontFamily: fontFamilies.semiBold,
        fontSize: fontSizes.md,
    },
});
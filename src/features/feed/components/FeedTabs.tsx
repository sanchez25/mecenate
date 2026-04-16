import { colors, fontFamilies, fontSizes, spacing } from "@/shared/constants/tokens";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    value: "all" | "free" | "paid";
    onChange: (value: "all" | "free" | "paid") => void;
};

const tabs = [
    { label: "Все", value: "all" },
    { label: "Бесплатные", value: "free" },
    { label: "Платные", value: "paid" },
] as const;


export function FeedTabs({ value, onChange }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.containerItems}>
                {tabs.map((tab) => {
                    const isActive = value === tab.value;
            
                    return (
                        <Pressable
                            key={tab.value}
                            onPress={() => onChange(tab.value)}
                            style={[styles.tab, isActive && styles.activeTab]}
                        >
                            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
        alignItems: "center",
    },
    containerItems: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        backgroundColor: colors.background.card,
        borderRadius: 999,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 999,
        backgroundColor: colors.background.card,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    activeTab: {
        backgroundColor: colors.button.primary,

    },
    tabText: {
        fontSize: fontSizes.sm,
        fontFamily: fontFamilies.medium,
        color: colors.text.like,
    },
    activeTabText: {
        fontFamily: fontFamilies.bold,
        color: colors.text.button,
    },
});

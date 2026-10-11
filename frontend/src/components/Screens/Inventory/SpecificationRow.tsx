import {
    Text,
    View,
    StyleSheet
} from 'react-native';

type SpecificationRowProps = {
    label: string;
    value: string | number | null;
    suffix?: string;
};

export default function SpecificationRow({
    label,
    value,
    suffix = "",
}: SpecificationRowProps) {
    const displayValue = 
        value === null || value === ""
            ? "Not specified"
            : `${value}${suffix}`;

    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{displayValue}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#dddddd",
    },

    label: {
        flex: 1,
        fontSize: 14,
        opacity: 0.7,
    },

    value: {
        flex: 1,
        fontSize: 14,
        fontWeight: "500",
        textAlign: "right",
    },
});
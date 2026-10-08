import { Text, View, StyleSheet } from 'react-native';

import type { Product } from "../../../../api/types";

type ProductCardProps = {
    product: Product;
}

export default function ProductCard({
    product,
}: ProductCardProps) {
    // Converting JSON string price to JavaScript Floating-point number.
    // Good for displaying price now, but not for financial calculations.
    const price = product.unit_price !== null
    ? `$${Number(product.unit_price).toFixed(2)}`
    : "Price unavailable";

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.name}>
                    {product.name}
                </Text>

                <Text style={styles.category}>
                    {product.category.name}
                </Text>
            </View>

            <Text style={styles.price}>
                {price}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#dddddd",
    },

    header: {
        gap: 4,
    },

    category: {
        fontSize: 14,
        opacity: 0.6,
    },

    name: {
        fontSize: 16,
        fontWeight: "600",
    },

    price: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: "600",
    },
});

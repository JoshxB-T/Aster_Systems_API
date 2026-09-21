import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import InventoryCard from './InventoryCard';

export default function InventorySummaryList({summary}) {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Inventory Summary</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        marginTop: 10
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8
    },

    card: {
        width: 150,
        marginRight: 8
    },

    name: {
        fontSize: 14,
        color: "#666",
        marginBottom: 6
    },

    number: {
        fontSize: 16,
        fontWeight: "bold"
    }
});

import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Card from "./Card";

export default function SalesActivityList({ sales }) {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Sales Activity</Text>

            <ScrollView vertical showsVerticalScrollIndicator={false}>
                {sales.map((s, index) => (
                    <Card key={index}>
                        <Text style={styles.name}>{s.amount}</Text>
                        <Text style={styles.number}>{s.status}</Text>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
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

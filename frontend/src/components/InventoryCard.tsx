import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function InventoryCard(props) {
    return (
        <View style={[styles.card, props.style]}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        elevation: 4,
        backgroundColor: '#fff',
        marginHorizontal: 4,
        marginVertical: 6,
        boxShadow: '0px 3px 6px rgba(0,0,0,0.25)'
    },

    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10
    }
});

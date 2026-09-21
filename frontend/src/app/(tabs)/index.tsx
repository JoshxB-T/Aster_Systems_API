import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';

import SalesActivityList from '../../components/SalesActivityColumn';
import InventorySummaryList from '../../components/InventorySummaryRow';

export default function IndexScreen() {
    return (
        <ScrollView style={styles.container}>
            <SalesActivityList sales={[]}/>
            <InventorySummaryList summary={[]}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
});

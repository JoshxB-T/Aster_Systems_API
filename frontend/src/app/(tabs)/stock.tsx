import React, { useEffect, useState } from 'react';
import { 
    ActivityIndicator,
    Text,
    ScrollView,
    View,
    StyleSheet,
    FlatList,
} from 'react-native';

import { getProducts } from '../../../api/productService';
import type { Product } from '../../../api/types';

import ProductCard from '@/components/Screens/Inventory/ProductCard';

export default function StockScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);
                setError(null);

                const response = await getProducts();

                setProducts(response.items);
            } catch (err) {
                console.error("Failed to load products:", err);

                setError(
                    err instanceof Error
                    ? err
                    : new Error("Unable to load inventory.")
                );
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator />
                <Text style={styles.text}>Loading inventory...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.text}>{error.message}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            keyExtractor={(product) => product.id.toString()}
            renderItem={({item}) => (
                <ProductCard product={item}/>
            )}
        />
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex:1, 
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 18,
        color: '#000000'
    },
});
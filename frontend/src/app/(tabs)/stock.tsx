import React, { Activity, useCallback, useEffect, useState } from 'react';
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

const PAGE_SIZE = 20;

export default function StockScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [offset, setOffset] = useState(0);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const hasMore = products.length < total

    const loadNextPage = useCallback(async () => {
        if (loadingMore || !hasMore || initialLoading) {
            return;
        }

        setLoadingMore(true);
        setError(null);

        try {
            const nextOffset = offset + PAGE_SIZE;
            const response = await getProducts({
                limit: PAGE_SIZE,
                offset: nextOffset
            });

            setProducts((current) => [
                ...current,
                ...response.items
            ]);
            setOffset(response.offset);
            setTotal(response.total);
        } catch (err) {
            console.error("Failed to load more products:", err);
        } finally {
            setLoadingMore(false);
        }
    }, [hasMore, initialLoading, loadingMore, offset]);

    useEffect(() => {
        async function loadInitialPage() {
            try {
                setInitialLoading(true);
                setError(null);

                const response = await getProducts({
                    limit: PAGE_SIZE,
                    offset: 0
                });

                setProducts(response.items);
                setTotal(response.total);
                setOffset(response.offset);
            } catch (err) {
                console.error("Failed to load inventory:", err);

                setError(
                    err instanceof Error
                    ? err
                    : new Error("Unable to load inventory.")
                );
            } finally {
                setInitialLoading(false);
            }
        }

        loadInitialPage();
    }, []);

    if (initialLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator />
                <Text style={styles.text}>Loading inventory...</Text>
            </View>
        );
    }

    if (error && products.length === 0) {
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
            onEndReached={loadNextPage}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                <View>
                    {loadingMore && <ActivityIndicator />}
                    {error && <Text>{error.message}</Text>}
                    {!hasMore && products.length > 0 && (
                        <Text>
                            All {total} products loaded.
                        </Text>
                    )}
                </View>
            }
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
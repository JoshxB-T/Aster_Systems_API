import {
    useCallback,
    useEffect,
    useState,
    useRef
} from 'react';

import { 
    ActivityIndicator,
    Text,
    Pressable,
    TextInput,
    View,
    StyleSheet,
    FlatList,
} from 'react-native';

import { getProducts } from '../../../api/productService';
import type { Product, CategoryFilter } from '../../../api/types';

import ProductCard from '@/components/Screens/Inventory/ProductCard';

const PAGE_SIZE = 20;


export default function StockScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [offset, setOffset] = useState(0);

    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<CategoryFilter>(null);

    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Prevent responses from an old filter or page request
    // from changing the current results
    const requestVersion = useRef(0);
    const loadingMoreRef = useRef(false);

    const hasMore = products.length < total

    useEffect(() => {
        const version = ++requestVersion.current;

        setProducts([]);
        setTotal(0);
        setOffset(0);
        setInitialLoading(true);
        setLoadingMore(false);
        loadingMoreRef.current = false;
        setError(null);

        async function loadInitialPage() {
            try {
                const response = await getProducts({
                    limit: PAGE_SIZE,
                    offset: 0,
                    search,
                    category
                });

                if (version !== requestVersion.current) return;

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

        return () => {
            // Invalidate any requests still in flight
            if (requestVersion.current === version) {
                requestVersion.current++;
            }
        };
    }, [search, category]);

    const loadNextPage = useCallback(async () => {
        if (
            loadingMoreRef.current ||
            initialLoading ||
            !hasMore
        ) {
            return;
        }

        loadingMoreRef.current = true;
        setLoadingMore(true);
        setError(null);

        const version = requestVersion.current;
        const nextOffset = offset + PAGE_SIZE;

        try {
            const response = await getProducts({
                limit: PAGE_SIZE,
                offset: nextOffset,
                search,
                category
            });

            if (version !== requestVersion.current) return;

            setProducts((current) => [
                ...current,
                ...response.items
            ]);
            setOffset(response.offset);
            setTotal(response.total);
        } catch (err) {
            if (version !== requestVersion.current) return;

            console.error("Failed to load more products:", err);

            setError(
                err instanceof Error
                ? err
                : new Error("Unable to load more products. Please Try again.")
            );
        } finally {
            if (version === requestVersion.current) {
                loadingMoreRef.current = false;
                setLoadingMore(false);
            }
        }
    }, [category, hasMore, initialLoading, loadingMore, offset]);

    function applySearch() {
        setSearch(searchText.trim());
    }

    function selectCategory(value: CategoryFilter) {
        setCategory(value);
    }

    return (
        <View style={styles.container}>
            <View style={styles.filters}>
                <View style={styles.searchRow}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder='Search products...'
                        returnKeyType='search'
                        onSubmitEditing={applySearch}
                        accessibilityLabel='Search products by name'
                    />

                    <Pressable
                        style={styles.searchButton}
                        onPress={applySearch}
                        accessibilityRole='button'
                    >
                        <Text style={styles.searchButtonText}>
                            Search
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.categoryRow}>
                    {[
                        { label: 'All', value: null },
                        { label: 'CPU', value: 'CPU' },
                        { label: 'GPU', value: 'GPU' }
                    ].map((option) => {
                        const selected = category === option.value;

                        return (
                            <Pressable
                                key={option.label}
                                style={[
                                    styles.categoryButton,
                                    selected && styles.categoryButtonSelected
                                ]}
                                onPress={() => 
                                    selectCategory(
                                        option.value as CategoryFilter
                                    )
                                }
                                accessibilityRole='button'
                                accessibilityState={{ selected }}
                            >
                                <Text
                                    style={[
                                        styles.categoryButtonText,
                                        selected &&
                                            styles.categoryButtonTextSelected
                                    ]}
                                >
                                    {option.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                <Text style={styles.resultCount}>
                    {total} {total === 1 ? 'product' : 'products'} found
                </Text>
            </View>

            {initialLoading ? (
                <View style={styles.centered}>
                    <ActivityIndicator />
                    <Text>Loading inventory...</Text>
                </View>
            ) : error && products.length === 0 ? (
                <View style={styles.centered}>
                    <Text>{error.message}</Text>
                </View>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(product) => product.id.toString()}
                    renderItem={({ item }) => (
                        <ProductCard product={item} />
                    )}
                    onEndReached={loadNextPage}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={
                        <Text style={styles.empty}>
                            No products match your filters.
                        </Text>
                    }
                    ListFooterComponent={
                        <View style={styles.footer}>
                            {loadingMore && <ActivityIndicator />}
                            {error && (
                                <Text style={styles.error}>{error.message}</Text>
                            )}
                            {!hasMore && products.length > 0 && (
                                <Text style={styles.footerText}>
                                    All matching products loaded.
                                </Text>
                            )}
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    filters: {
        padding: 16,
        gap: 12,
    },

    searchRow: {
        flexDirection: 'row',
        gap: 8,
    },

    searchInput: {
        flex: 1,
        minWidth: 0,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    searchButton: {
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#222222',
    },

    searchButtonText: {
        color: '#ffffff',
        fontWeight: '600',
    },

    categoryRow: {
        flexDirection: 'row',
        gap: 8,
    },

    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#cccccc',
    },

    categoryButtonSelected: {
        backgroundColor: '#222222',
        borderColor: '#222222',
    },

    categoryButtonText: {
        color: '#222222',
        fontWeight: '500',
    },

    categoryButtonTextSelected: {
        color: '#ffffff',
    },

    resultCount: {
        fontSize: 13,
        opacity: 0.65,
    },

    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    empty: {
        padding: 24,
        textAlign: 'center',
    },

    footer: {
        alignItems: 'center',
        padding: 16,
        gap: 8,
    },

    footerText: {
        opacity: 0.65,
    },

    error: {
        color: '#ff0000',
        textAlign: 'center',
    },

    loadingContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 18,
        color: '#000000'
    },
});
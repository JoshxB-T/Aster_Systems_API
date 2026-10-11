import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { getProduct } from '../../../api/productService';
import type { ProductDetails } from '../../../api/types';
import ProductDetailsView from '../../components/Screens/Inventory/ProductDetails';

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProduct() {
            try {
                setLoading(true);
                setError(null);

                const response = await getProduct(id);

                setProduct(response);
            } catch (err) {
                console.error("Failed to load product:", err);
                setError("Unable to load product.");
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            loadProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <View>
                <ActivityIndicator />
                <Text>Loading product...</Text>
            </View>
        );
    }

    if (error || !product) {
        return (
            <View>
                <Text>{error ?? "Product not found."}</Text>
            </View>
        )
    }

    return <ProductDetailsView product={product}/>
}

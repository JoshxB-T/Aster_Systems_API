import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import type { ProductDetails as ProductDetailsType } from '../../../../api/types';
import SpecificationRow from './SpecificationRow';

type ProductDetailsProps = {
    product: ProductDetailsType
}

export default function ProductDetails({
    product,
}: ProductDetailsProps) {
    const price =
        product.unit_price !== null
        ? `$${Number(product.unit_price).toFixed(2)}`
        : "Price unavailable";

    const details = product.details;

    return (
        <View style={styles.container}>
            {/* General product information */}
            <View style={styles.header}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.category}>{product.category.name}</Text>
                <Text style={styles.price}>{price}</Text>
                <Text 
                    style={[
                        styles.status,
                        product.active
                            ? styles.active
                            : styles.inactive,
                    ]}
                >
                    {product.active ? "Active" : "Inactive"}
                </Text>
            </View>

            {/* Hardware specification information */}
            <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Specifications</Text>

                    {details && "core_count" in details && (
                        <>
                            <SpecificationRow
                                label="Core Count"
                                value={details.core_count}
                            />

                            <SpecificationRow
                                label="Core Clock"
                                value={details.core_clock}
                                suffix=" GHz"
                            />

                            <SpecificationRow
                                label="Boost Clock"
                                value={details.boost_clock}
                                suffix=" GHz"
                            />

                            <SpecificationRow
                                label="Microarchitecture"
                                value={details.microarchitecture}
                            />

                            <SpecificationRow
                                label="TDP"
                                value={details.tdp}
                                suffix=" W"
                            />

                            <SpecificationRow
                                label="Integrated Graphics"
                                value={details.graphics}
                            />
                        </>
                    )}

                    {details && "chipset" in details && (
                        <>
                            <SpecificationRow 
                                label="Chipset"
                                value={details.chipset}
                            />

                            <SpecificationRow
                                label="Memory"
                                value={details.memory}
                                suffix=" GB" 
                            />
                            
                            <SpecificationRow
                                label="Core Clock"
                                value={details.core_clock}
                                suffix=" MHz"
                            />

                            <SpecificationRow
                                label="Boost Clock"
                                value={details.boost_clock}
                                suffix=" MHz"
                            />

                            <SpecificationRow
                                label="Color"
                                value={details.color}
                            />

                            <SpecificationRow
                                label="Length"
                                value={details.length}
                                suffix=" mm"
                            />
                        </>
                    )}

                    {!details && (
                        <Text style={styles.empty}>
                            No hardware specifications available.
                        </Text>
                    )}
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 24,
    },

    header: {
        gap: 8,
    },

    name: {
        fontSize: 24,
        fontWeight: "700",
    },

    category: {
        fontSize: 14,
        opacity: 0.65,
    },

    price: {
        marginTop: 8,
        fontSize: 22,
        fontWeight: "600",
    },

    status: {
        alignSelf: "flex-start",
        fontSize: 13,
        fontWeight: "600",
    },

    active: {
        color: "green",
    },

    inactive: {
        color: "red",
    },

    section: {
        gap: 4,
    },

    sectionTitle: {
        marginBottom: 8,
        fontSize: 18,
        fontWeight: "700",
    },

    empty: {
        opacity: 0.65,
        paddingVertical: 10,
    },
});
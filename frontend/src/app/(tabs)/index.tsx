import React, { useEffect, useState } from 'react';
import { Pressable, Text, ScrollView, View, StyleSheet } from 'react-native';

import SalesActivityList from '../../components/SalesActivityColumn';
import InventorySummaryList from '../../components/InventorySummaryRow';
import { convertTextStyleToRNTextStyle } from 'expo-router/build/utils/font';

export default function IndexScreen() {
    const [isToggled, setIsToggled] = React.useState(false);

    const handleToggle = () => {
        setIsToggled(previousState => !previousState);
    };

    return (
        <ScrollView style={styles.container}>
            <SalesActivityList sales={[]}/>
            <Pressable
                onPress={handleToggle}
                style={({pressed}) => [
                    styles.button,
                    {
                        backgroundColor: isToggled ? '#cc0000' : '#E5E5E5',
                        opacity: pressed ? 0.7 : 1,
                    }
                ]}
            >
                <View
                    style={styles.row}
                >
                    <View style={styles.circle}/>
                    <View
                        style={styles.verticalText}
                    >
                        <Text style={styles.buttonText}>420</Text>
                        <Text style={styles.buttonTextBottom}>To Be Packed</Text>
                    </View>
                </View>
            </Pressable>

            <InventorySummaryList summary={[]}/>
            <Pressable
                onPress={handleToggle}
                style={({pressed}) => [
                    styles.button,
                    {
                        backgroundColor: isToggled ? 'blue' : '#E5E5E5',
                        opacity: pressed ? 0.7 : 1,
                    }
                ]}
            >
                <View
                    style={styles.row}
                >

                </View>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },

    button: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        boxShadow: '0px 3px 6px rgba(0,0,0,0.25)',
        elevation: 4,
        marginHorizontal: 8,
        marginVertical: 0,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },

    buttonText: {
        color: '#000000',
        fontSize: 25,
        fontWeight: 'bold',
    },

    verticalText: {
        marginLeft: 25,
    },

    buttonTextBottom: {
        marginTop: 25,
    },

    circle: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: '#0000ff',
    },

});

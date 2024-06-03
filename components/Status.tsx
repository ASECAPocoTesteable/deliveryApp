import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Status = ({ status }:{ status:string }) => {
    const statusMap: {[key: string]: string} = {
        PENDING: "Pending",
        ONGOING: "Ongoing",
        COMPLETED: "Delivered",
    };

    const renderIcon = (status: string) => {
        switch (status) {
            case "PENDING":
                return <Icon name="more-horiz" size={24} color="#000" />;
            case "ONGOING":
                return <Icon name="loop" size={24} color="#000" />;
            case "COMPLETED":
                return <Icon name="check" size={24} color="#000" />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.iconContainer,
                    {
                        backgroundColor:
                            status === "PENDING"
                                ? "#FFD700"
                                : status === "ONGOING"
                                ? "#FFA500"
                                : "#32CD32",
                    },
                ]}
            >
                {renderIcon(status)}
            </View>
            <Text style={styles.statusText}>{statusMap[status]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 95,
        height: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 36,
        height: 36,
        borderRadius: 10,
    },
    statusText: {
        marginTop: 8,
        fontSize: 16,
    },
});

export default Status;
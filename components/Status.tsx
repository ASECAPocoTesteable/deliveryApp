import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Status = ({ status }:{ status:string }) => {
    const statusMap: {[key: string]: string} = {
        ASSIGNED: "Assigned",
        INPROGRESS: "In Progress",
        DELIVERED: "Delivered",
        INCIDENT: "Incident",
    };

    const renderIcon = (status: string) => {
        switch (status) {
            case "ASSIGNED":
                return <Icon name="more-horiz" size={24} color="#fff" />;
            case "INPROGRESS":
                return <Icon name="loop" size={24} color="#fff" />;
            case "DELIVERED":
                return <Icon name="check-circle" size={24} color="#fff" />;
            case "INCIDENT":
                return <Icon name="error" size={24} color="#fff" />;
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
                            status === "ASSIGNED"
                                ? "#FFA500"
                                : status === "INPROGRESS"
                                    ? "#005ae0"
                                    : status === "DELIVERED"
                                        ? "#32CD32"
                                        : status === "INCIDENT"
                                            ? "#FF4500"
                                            : "#D3D3D3",
                    },
                ]}
            >
                {renderIcon(status)}
            </View>
            <Text style={styles.statusText}>{statusMap[status] || "Unknown"}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        width: "100%",
        padding:8,
        borderRadius: 10,
    },
    statusText: {
        fontSize: 16,
    },
});

export default Status;

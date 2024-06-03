import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Status from "./Status";
import Icon from "react-native-vector-icons/MaterialIcons";

const Order = ({
  order,
  updateOrderStatus,
}: {
  order: any;
  updateOrderStatus: any;
}) => {
  const renderIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Icon name="hourglass-empty" size={24} color="#fff" />;
      case "IN_PROGRESS":
        return <Icon name="loop" size={24} color="#fff" />;
      case "COMPLETED":
        return <Icon name="check-circle" size={24} color="#fff" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.card} id={order.id}>
      <View style={styles.infoContainer}>
        <Text style={styles.header}>Order ID:</Text>
        <Text style={styles.body}>{order.orderId}</Text>
        <Text style={styles.header}>Deliverer:</Text>
        <Text style={styles.body}>
          {order.deliverer.name} {order.deliverer.surname}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, order.status === "PENDING" && styles.pending]}
          onPress={() => updateOrderStatus(order.orderId, "PENDING")}
        >
          {renderIcon("PENDING")}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, order.status === "IN_PROGRESS" && styles.inProgress]}
          onPress={() => updateOrderStatus(order.orderId, "IN_PROGRESS")}
        >
          {renderIcon("IN_PROGRESS")}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, order.status === "COMPLETED" && styles.completed]}
          onPress={() => updateOrderStatus(order.orderId, "COMPLETED")}
        >
          {renderIcon("COMPLETED")}
        </TouchableOpacity>
        <Status status={order.status} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  body: {
    fontSize: 16,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    height: 45,
    width: 45,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22.5,
    marginHorizontal: 5,
  },
  pending: {
    backgroundColor: "#FFEB3B",
  },
  inProgress: {
    backgroundColor: "#FFC107",
  },
  completed: {
    backgroundColor: "#4CAF50",
  },
});

export { Order };

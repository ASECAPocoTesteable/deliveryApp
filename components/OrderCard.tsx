import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Status from "./Status";
import Icon from "react-native-vector-icons/MaterialIcons";

const OrderCard = ({
                     order,
                     updateOrderStatus,
                   }: {
  order: any;
  updateOrderStatus: (orderId: number, newStatus: string) => void;
}) => {
  const renderButtons = () => {
    switch (order.status) {
      case "ASSIGNED":
        return (
            <TouchableOpacity
                style={[styles.button, styles.assigned]}
                onPress={() => updateOrderStatus(order.id, "INPROGRESS")}
            >
              <Text style={styles.buttonText}>Pick Up</Text>
            </TouchableOpacity>
        );
      case "INPROGRESS":
        return (
            <>
              <TouchableOpacity
                  style={[styles.button, styles.inProgress]}
                  onPress={() => updateOrderStatus(order.id, "DELIVERED")}
              >
                <Text style={styles.buttonText}>Deliver</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={[styles.button, styles.incident]}
                  onPress={() => updateOrderStatus(order.id, "INCIDENT")}
              >
                <Text style={styles.buttonText}>Report Incident</Text>
              </TouchableOpacity>
            </>
        );
      case "INCIDENT":
        return (
            <TouchableOpacity
                style={[styles.button, styles.solved]}
                onPress={() => updateOrderStatus(order.id, "SOLVED")}
            >
              <Text style={styles.buttonText}>Solved</Text>
            </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
      <View style={styles.card} id={order.id}>
        <View style={styles.infoContainer}>
          <Text style={styles.header}>Order ID:</Text>
          <Text style={styles.body}>{order.id}</Text>
          <Text style={styles.header}>Deliverer:</Text>
          <Text style={styles.body}>
            {order.userAddress}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Status status={order.status} />
          {renderButtons()}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    width: 200,
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22.5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  assigned: {
    backgroundColor: "#FFA500",
  },
  inProgress: {
    backgroundColor: "#32CD32",
  },
  incident: {
    backgroundColor: "#FF4500",
  },
  solved: {
    backgroundColor: "#1E90FF",
  },
});

export { OrderCard };

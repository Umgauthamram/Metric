import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LineChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width - 40; // padding

const ProgressScreen = () => {
  const { jumpHeight } = useLocalSearchParams();
  const [progressData, setProgressData] = useState([
    { date: "2025-09-10", jumpHeight: 50, verified: true },
    { date: "2025-09-11", jumpHeight: 52, verified: true },
    { date: "2025-09-12", jumpHeight: 48, verified: false },
  ]);

  // Add new jump from Test
  useEffect(() => {
    if (jumpHeight) {
      const newResult = {
        date: new Date().toLocaleDateString(),
        jumpHeight: Number(jumpHeight),
        verified: true,
      };
      setProgressData((prev) => [...prev, newResult]);
    }
  }, [jumpHeight]);

  const best = Math.max(...progressData.map((p) => p.jumpHeight));
  const latest = progressData[progressData.length - 1].jumpHeight;
  const average = progressData.reduce((sum, p) => sum + p.jumpHeight, 0) / progressData.length;

  // Line chart data
  const lineData = {
    labels: progressData.map((p) => p.date),
    datasets: [
      {
        data: progressData.map((p) => p.jumpHeight),
        color: () => "#10B981",
        strokeWidth: 3,
      },
    ],
  };

  // Bar chart data (verified vs unverified)
  const barData = {
    labels: progressData.map((p) => p.date),
    datasets: [
      {
        data: progressData.map((p) => (p.verified ? p.jumpHeight : 0)),
      },
      {
        data: progressData.map((p) => (!p.verified ? p.jumpHeight : 0)),
      },
    ],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>My Progress</Text>

      <View style={styles.summaryContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Best Jump</Text>
          <Text style={styles.statValue}>{best} m</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Recent</Text>
          <Text style={styles.statValue}>{latest} m</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Average</Text>
          <Text style={styles.statValue}>{average.toFixed(1)} m</Text>
        </View>
      </View>

      {/* Line Chart */}
      <Text style={styles.chartTitle}>Jump Height Over Time</Text>
      <LineChart
        data={lineData}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          style: { borderRadius: 12 },
          propsForDots: { r: "5", strokeWidth: "2", stroke: "#10B981" },
        }}
        style={{ borderRadius: 12, marginBottom: 25 }}
      />

      {/* Bar Chart */}
      <Text style={styles.chartTitle}>Verified vs Unverified Jumps</Text>
      <BarChart
        data={barData}
        width={screenWidth}
        height={220}
        fromZero
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 1,
          color: (opacity = 1, index) => (index === 0 ? "#10B981" : "#F59E0B"), // green for verified, orange for unverified
          labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
        style={{ borderRadius: 12, marginBottom: 25 }}
        verticalLabelRotation={-30}
      />

      {/* History Cards */}
      {progressData.map((p, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.cardDate}>{p.date}</Text>
          <Text style={styles.cardHeight}>{p.jumpHeight} m</Text>
          {p.verified ? (
            <Text style={styles.cardVerified}>Verified</Text>
          ) : (
            <Text style={styles.cardUnverified}>Unverified</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20 },
  summaryContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  statBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    width: "30%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  statLabel: { fontSize: 14, color: "#555" },
  statValue: { fontSize: 20, fontWeight: "bold", color: "#333" },
  chartTitle: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardDate: { fontSize: 14, color: "#666" },
  cardHeight: { fontSize: 18, fontWeight: "600", color: "#333" },
  cardVerified: { fontSize: 12, color: "#10B981", fontWeight: "600" },
  cardUnverified: { fontSize: 12, color: "#F59E0B", fontWeight: "600" },
});

export default ProgressScreen;

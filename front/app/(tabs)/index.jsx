import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather icons for a clean look

// Reusable component for the metric cards
const PerformanceCard = ({ iconName, title, lastValue, currentValue, unit, change, color }) => {
    const isPositive = change >= 0;
    const changeText = `isPositive ? +${change}${unit} : ${change}${unit}`;

    return (
        <View style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
                <Icon name={iconName} size={20} color={color} />
            </View>
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardSubtitle}>Last: {lastValue}{unit}</Text>
            </View>
            <View style={styles.cardStatsContainer}>
                <Text style={styles.cardValue}>{currentValue}<Text style={styles.cardUnit}>{unit}</Text></Text>
                <Text style={[styles.cardChange, { color: isPositive ? '#34D399' : '#EF4444' }]}>
                    {changeText}
                </Text>
            </View>
        </View>
    );
};

// Main Dashboard Screen Component
const DashboardScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Performance</Text>
                        <Text style={styles.headerSubtitle}>Your athletic journey</Text>
                    </View>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} // Placeholder image
                        style={styles.profileImage}
                    />
                </View>

                {/* Total Score Card */}
                <LinearGradient
                    colors={['#E0F7FA', '#D1C4E9']} // Light blue to light purple gradient
                    style={styles.totalScoreCard}
                >
                    <Text style={styles.totalScore}>875</Text>
                    <Text style={styles.totalScoreLabel}>Total Score</Text>
                    <View style={styles.weeklyChangeContainer}>
                        <Icon name="arrow-up" size={14} color="#10B981" />
                        <Text style={styles.weeklyChangeText}>+45 this week</Text>
                    </View>
                </LinearGradient>

                {/* Performance Metrics */}
                <PerformanceCard
                    iconName="arrow-up"
                    title="Vertical Jump"
                    lastValue={53}
                    currentValue={55}
                    unit="cm"
                    change={2}
                    color="#3B82F6"
                />
                <PerformanceCard
                    iconName="repeat"
                    title="Shuttle Run"
                    lastValue={10.1}
                    currentValue={9.8}
                    unit="s"
                    change={-0.3}
                    color="#F59E0B"
                />
                <PerformanceCard
                    iconName="activity"
                    title="Sit-ups"
                    lastValue={42}
                    currentValue={45}
                    unit=" reps"
                    change={3}
                    color="#8B5CF6"
                />

                {/* Recent Achievements Section */}
                <Text style={styles.sectionTitle}>Recent Achievements</Text>
                <View style={styles.achievementsPlaceholder}>
                    <Text style={styles.achievementsText}>New achievements will appear here!</Text>
                </View>

            </ScrollView>

            {/* Static Bottom Tab Bar */}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6', // Light gray background
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    totalScoreCard: {
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        marginBottom: 20,
    },
    totalScore: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    totalScoreLabel: {
        fontSize: 16,
        color: '#4B5563',
        marginTop: -5,
    },
    weeklyChangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    weeklyChangeText: {
        marginLeft: 5,
        color: '#059669',
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    cardStatsContainer: {
        alignItems: 'flex-end',
    },
    cardValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },
    cardUnit: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#6B7280',
    },
    cardChange: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 15,
    },
    achievementsPlaceholder: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    achievementsText: {
        color: '#6B7280',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingVertical: 10,
        paddingBottom: 20,
    },
    tabItem: {
        alignItems: 'center',
    },
    activeTab: {
    },
    tabLabel: {
        fontSize: 10,
        color: '#6B7280',
        marginTop: 4,
    },
});

export default DashboardScreen;
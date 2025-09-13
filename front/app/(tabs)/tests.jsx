import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, StatusBar, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For back arrow and info icon

const VerticalJumpTestScreen = ({ navigation }) => {
    // This could come from a state or an API call after the AI processes the video
    const jumpResult = {
        value: 55,
        unit: 'cm',
        verified: true,
        message: 'AI has verified your measurement.'
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Icon name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Vertical Jump Test</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <Icon name="info" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* AI Verification Status */}
                <View style={styles.aiStatusContainer}>
                    <Text style={styles.aiStatusLabel}>AI Verification</Text>
                    <View style={styles.activeIndicator}>
                        <View style={styles.dot}></View>
                        <Text style={styles.activeText}>Active</Text>
                    </View>
                </View>

                {/* Video/Image Placeholder with AI Overlay */}
                <View style={styles.videoPlaceholder}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/300x450/BBDCE5/CFAB8D?text=User+Jumping+AI+Overlay' }} // Placeholder image for jumping user with AI tracking
                        style={styles.aiOverlayImage}
                        resizeMode="cover"
                    />
                    {/* The AI result overlay - this is illustrative */}
                    <View style={styles.resultOverlay}>
                        <Text style={styles.resultValue}>{jumpResult.value} {jumpResult.unit}</Text>
                        {jumpResult.verified && (
                            <View style={styles.verifiedBadge}>
                                <Icon name="check-circle" size={14} color="#10B981" />
                                <Text style={styles.verifiedText}>Verified!</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Great Jump Message */}
                <View style={styles.messageContainer}>
                    <Text style={styles.greatJumpText}>Great Jump!</Text>
                    <Text style={styles.verificationMessage}>
                        {jumpResult.message} Tap 'Save Result' to record.
                    </Text>
                </View>

                {/* Action Buttons */}
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.buttonText}>Save Result</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tryAgainButton}>
                    <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8', // Light background
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
        backgroundColor: '#FFFFFF', // White header background
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    headerButton: {
        padding: 5,
    },
    aiStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
    },
    aiStatusLabel: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    activeIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0F7FA', // Light blue background for active status
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#10B981', // Green dot
        marginRight: 5,
    },
    activeText: {
        fontSize: 13,
        color: '#10B981', // Green text
        fontWeight: '600',
    },
    videoPlaceholder: {
        width: '100%',
        aspectRatio: 300 / 450, // Adjust aspect ratio as needed for your image/video area
        backgroundColor: '#E0E0E0', // Placeholder background
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'flex-end', // Position result overlay at the bottom
        alignItems: 'center',
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 6,
    },
    aiOverlayImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    resultOverlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background for result
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 12,
        marginBottom: 20, // Space from bottom of video placeholder
        alignItems: 'center',
        flexDirection: 'row', // For result value and verified badge
    },
    resultValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 10,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D1FAE5', // Light green background
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    verifiedText: {
        fontSize: 12,
        color: '#065F46', // Dark green text
        fontWeight: '600',
        marginLeft: 4,
    },
    messageContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    greatJumpText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    verificationMessage: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
        marginHorizontal: 15,
    },
    saveButton: {
        width: '100%',
        backgroundColor: '#BBDCE5', // Your light blue color
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    tryAgainButton: {
        width: '100%',
        backgroundColor: '#ECEEDF', // Your off-white color
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9C4B0', // Your warm beige border
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
});

export default VerticalJumpTestScreen;
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';

// Import the new icons from react-native-vector-icons
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// SVG Icons as strings (keeping them for the other two icons)
const phoneIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l-3 3m0 0l-3-3m3 3v14" />
</svg>
`;

const aiVerificationIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
</svg>
`;

const analyticsIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16 8v.01M6 12v.01m4 0v.01m4 0v.01M16 12v.01m-2-4v.01M6 16v.01m4 0v.01m4 0v.01" />
</svg>
`;

const KhelPratibhaScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#eceedf" />

            {/* Background Gradient Overlay */}
            <LinearGradient
                colors={['rgba(187, 220, 229, 0.5)', 'rgba(207, 171, 141, 0.5)']}
                style={styles.gradientOverlay}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />

            {/* Main Content ScrollView */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <View style={styles.contentWrapper}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <View style={styles.headerIconBg}>
                            <SvgXml xml={phoneIconSvg} width="40" height="40" />
                        </View>
                        <Text style={styles.mainTitle}>Project Khel Pratibha</Text>
                        <Text style={styles.tagline}>Turn your smartphone into a verified athletic assessment station</Text>
                    </View>

                    {/* Hero Image Section */}
                    <View style={styles.heroImageContainer}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/336x256.png?text=Hero+Image' }}
                            style={styles.heroImage}
                        />
                    </View>

                    {/* Features Section */}
                    <View style={styles.featuresSection}>
                        {/* Feature 1 */}
                        <View style={styles.featureCard}>
                            <View style={[styles.featureIconBg, { backgroundColor: '#bbdce5' }]}>
                                <SvgXml xml={aiVerificationIconSvg} width="24" height="24" />
                            </View>
                            <View style={styles.featureTextWrapper}>
                                <Text style={styles.featureTitle}>AI-Powered Verification</Text>
                                <Text style={styles.featureDescription}>Real-time performance tracking</Text>
                            </View>
                        </View>
                        {/* Feature 2 */}
                        <View style={styles.featureCard}>
                            <View style={[styles.featureIconBg, { backgroundColor: '#d9c4b0' }]}>
                                <SvgXml xml={analyticsIconSvg} width="24" height="24" />
                            </View>
                            <View style={styles.featureTextWrapper}>
                                <Text style={styles.featureTitle}>Performance Analytics</Text>
                                <Text style={styles.featureDescription}>Track and improve your scores</Text>
                            </View>
                        </View>
                    </View>

                    {/* Auth Buttons Section */}
                    <View style={styles.authButtonsSection}>
                        <TouchableOpacity style={styles.primaryButton}>
                            <Text style={styles.primaryButtonText}>Get Started</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Fontisto name="google" size={20} color="#333" style={styles.socialIcon} />
                            <Text style={styles.socialButtonText}>Continue with Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <FontAwesome name="apple" size={20} color="#333" style={styles.socialIcon} />
                            <Text style={styles.socialButtonText}>Continue with Apple</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Disclaimer */}
                    <Text style={styles.disclaimerText}>
                        By continuing, you agree to our Terms & Privacy Policy
                    </Text>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eceedf',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.5,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 24, // Added vertical padding for spacing
    },
    contentWrapper: {
        width: '100%',
        maxWidth: 390,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    headerIconBg: {
        width: 80,
        height: 80,
        backgroundColor: '#bbdce5',
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    tagline: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        lineHeight: 20,
    },
    heroImageContainer: {
        width: '100%',
        marginBottom: 40,
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        aspectRatio: 336 / 256,
        borderRadius: 16,
    },
    featuresSection: {
        width: '100%',
        marginBottom: 40,
        gap: 16,
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eceedf',
        padding: 16,
        borderRadius: 12,
    },
    featureIconBg: {
        width: 40,
        height: 40,
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    featureTextWrapper: {
        flex: 1, // Ensures the text container takes up the remaining space
    },
    featureTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    featureDescription: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
    authButtonsSection: {
        width: '100%',
        gap: 16,
        marginBottom: 32,
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#cfab8d',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    socialIcon: {
        marginRight: 12,
    },
    socialButtonText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '600',
    },
    disclaimerText: {
        fontSize: 10,
        color: '#888',
        textAlign: 'center',
        lineHeight: 14,
    },
});

export default KhelPratibhaScreen;
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import { useRouter } from "expo-router";

// Import icons from react-native-vector-icons
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// A simple back arrow icon for navigation
const backArrowIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
`;

const LoginScreen = () => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

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

            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <SvgXml xml={backArrowIconSvg} width="24" height="24" />
            </TouchableOpacity>

            {/* Main Content ScrollView */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.contentWrapper}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <Text style={styles.mainTitle}>Welcome Back!</Text>
                        <Text style={styles.tagline}>Sign in to continue your journey</Text>
                    </View>

                    {/* Input Fields Section */}
                    <View style={styles.inputFieldsSection}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <TouchableOpacity>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Auth Buttons Section */}
                    <View style={styles.authButtonsSection}>
                        <TouchableOpacity style={styles.primaryButton}>
                            <Text style={styles.primaryButtonText}>Sign In</Text>
                        </TouchableOpacity>

                        <Text style={styles.orText}>OR</Text>

                        <TouchableOpacity style={styles.socialButton}>
                            <Fontisto name="google" size={20} color="#333" style={styles.socialIcon} />
                            <Text style={styles.socialButtonText}>Continue with Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <FontAwesome name="apple" size={20} color="#333" style={styles.socialIcon} />
                            <Text style={styles.socialButtonText}>Continue with Apple</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sign Up Link */}
                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Don't have an account? </Text>
                        <TouchableOpacity>
                            <Text style={[styles.signUpText, styles.signUpLink]} onPress={() => router.push('/(auth)/')}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
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
    backButton: {
        position: 'absolute',
        top: (Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0) + 16,
        left: 16,
        zIndex: 10,
        padding: 8,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 24,
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
        marginBottom: 32,
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
    },
    inputFieldsSection: {
        marginBottom: 24,
        width: '100%',
    },
    input: {
        width: '100%',
        backgroundColor: '#eceedf',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        fontSize: 14,
        color: '#333',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#d9c4b0',
    },
    forgotPasswordText: {
        textAlign: 'right',
        fontSize: 12,
        color: '#cfab8d',
        fontWeight: '600',
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
    orText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 12,
        fontWeight: '500',
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
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        fontSize: 12,
        color: '#555',
    },
    signUpLink: {
        color: '#cfab8d',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
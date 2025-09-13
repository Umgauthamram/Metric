import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import { useRouter } from "expo-router";

// Import the icons from react-native-vector-icons
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// SVG Icons as strings (reusing the same icons)
const phoneIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l-3 3m0 0l-3-3m3 3v14" />
</svg>
`;

const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignUp = () => {
        // Handle sign-up logic here (e.g., API call)
        console.log('Signing up with:', { name, email, password });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#eceedf" />
            <LinearGradient
                colors={['rgba(187, 220, 229, 0.5)', 'rgba(207, 171, 141, 0.5)']}
                style={styles.gradientOverlay}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.contentWrapper}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <View style={styles.headerIconBg}>
                            <SvgXml xml={phoneIconSvg} width="40" height="40" />
                        </View>
                        <Text style={styles.mainTitle}>Create Account</Text>
                        <Text style={styles.tagline}>Join us and get started on your athletic journey.</Text>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formSection}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="John Doe"
                                placeholderTextColor="#999"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="you@example.com"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor="#999"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity onPress={() => router.replace("/onboarding")} style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Sign Up</Text>
                    </TouchableOpacity>

                    {/* Or Separator */}
                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                        <Text style={styles.separatorText}>or</Text>
                        <View style={styles.separatorLine} />
                    </View>

                    {/* Social Buttons Section */}
                    <View style={styles.socialButtonsSection}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Fontisto name="google" size={20} color="#333" style={styles.socialIcon} />
                            <Text style={styles.socialButtonText}>Continue with Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <FontAwesome name="apple" size={20} color="#333" style={styles.socialIcon} />
                            <Text style={styles.socialButtonText}>Continue with Apple</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Login Link */}
                    <View style={styles.loginLinkContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                            <Text style={styles.loginLink} >Log in</Text>
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
    formSection: {
        width: '100%',
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#f5f5f5',
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
        fontSize: 16,
        fontWeight: '600',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    separatorText: {
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#888',
    },
    socialButtonsSection: {
        width: '100%',
        gap: 16,
        marginBottom: 24,
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
        fontSize: 16,
        fontWeight: '600',
    },
    loginLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
    },
    loginText: {
        fontSize: 14,
        color: '#555',
    },
    loginLink: {
        fontSize: 14,
        color: '#cfab8d',
        fontWeight: '600',
    },
    disclaimerText: {
        fontSize: 10,
        color: '#888',
        textAlign: 'center',
        lineHeight: 14,
    },
});

export default SignUpScreen;
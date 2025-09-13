import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const ProfileScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Animation shared values
  const profileOpacity = useSharedValue(0);
  const profileTranslateY = useSharedValue(20);
  const syncScale = useSharedValue(1);

  // Profile section and cards animation
  useEffect(() => {
    profileOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.exp) });
    profileTranslateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.exp) });
  }, []);

  const profileAnimatedStyle = useAnimatedStyle(() => ({
    opacity: profileOpacity.value,
    transform: [{ translateY: profileTranslateY.value }],
  }));

  // Sync button press animation
  const syncGesture = Gesture.Tap()
    .onBegin(() => {
      syncScale.value = withSpring(0.95, { damping: 20, stiffness: 300 });
    })
    .onFinalize(() => {
      syncScale.value = withSpring(1, { damping: 20, stiffness: 300 });
    });

  const syncAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: syncScale.value }],
  }));

  const handleSyncData = () => {
    if (isSyncing) return;

    setIsSyncing(true);
    console.log("Starting data sync...");

    setTimeout(() => {
      setIsSyncing(false);
      console.log("Data sync complete!");
    }, 2000);
  };

  const ToggleSwitch = ({ iconName, label, isEnabled, onToggle }) => {
    const toggleAnimation = useSharedValue(isEnabled ? 20 : 0);

    const toggleAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: toggleAnimation.value }],
    }));

    const trackAnimatedStyle = useAnimatedStyle(() => ({
      backgroundColor: withTiming(isEnabled ? '#1F2937' : '#E5E7EB', { duration: 300 }),
    }));

    const handleToggle = () => {
      try {
        onToggle();
        toggleAnimation.value = withSpring(isEnabled ? 0 : 20, { damping: 20, stiffness: 300 });
      } catch (error) {
        console.error("Toggle error:", error);
      }
    };

    return (
      <View style={styles.settingItem}>
        <View style={styles.settingLabelContainer}>
          <FontAwesome name={iconName} size={22} color="#6B7280" style={styles.settingIcon} />
          <Text style={styles.settingLabel}>{label}</Text>
        </View>
        <TouchableOpacity onPress={handleToggle} activeOpacity={0.8}>
          <Animated.View style={[styles.toggleTrack, trackAnimatedStyle]}>
            <Animated.View style={[styles.toggleDot, toggleAnimatedStyle]} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <LinearGradient
        colors={['#FFFFFF', '#F3F4F6']}
        style={styles.gradientOverlay}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentWrapper}>
          {/* Top Profile Section */}
          <Animated.View style={[styles.profileSection, profileAnimatedStyle]}>
            <Image
              source={{ uri: 'https://placehold.co/120x120/CCCCCC/FFFFFF/png?text=Profile' }}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>Jane Doe</Text>
            <Text style={styles.userEmail}>jane.doe@example.com</Text>
            <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
              <FontAwesome name="edit" size={18} color="#FFFFFF" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Personal Info Card */}
          <Animated.View style={[styles.card, profileAnimatedStyle]}>
            <Text style={styles.cardTitle}>Personal Info</Text>
            <View style={styles.infoGroup}>
              <FontAwesome name="user" size={20} color="#6B7280" style={styles.infoIcon} />
              <Text style={styles.infoText}>Name: <Text style={styles.infoValue}>Jane Doe</Text></Text>
            </View>
            <View style={styles.infoGroup}>
              <FontAwesome name="venus-mars" size={20} color="#6B7280" style={styles.infoIcon} />
              <Text style={styles.infoText}>Gender: <Text style={styles.infoValue}>Female</Text></Text>
            </View>
            <View style={styles.infoGroup}>
              <FontAwesome name="calendar" size={20} color="#6B7280" style={styles.infoIcon} />
              <Text style={styles.infoText}>D.O.B: <Text style={styles.infoValue}>January 1, 1995</Text></Text>
            </View>
            <View style={styles.infoGroup}>
              <FontAwesome name="dumbbell" size={20} color="#6B7280" style={styles.infoIcon} />
              <Text style={styles.infoText}>Weight: <Text style={styles.infoValue}>65kg</Text></Text>
            </View>
            <View style={styles.infoGroup}>
              <FontAwesome name="ruler" size={20} color="#6B7280" style={styles.infoIcon} />
              <Text style={styles.infoText}>Height: <Text style={styles.infoValue}>170cm</Text></Text>
            </View>
          </Animated.View>

          {/* Settings Card */}
          <Animated.View style={[styles.card, profileAnimatedStyle]}>
            <Text style={styles.cardTitle}>Settings</Text>
            <ToggleSwitch
              iconName="bell"
              label="Notifications"
              isEnabled={isNotificationsEnabled}
              onToggle={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
            />
            <ToggleSwitch
              iconName="moon"
              label="Dark Mode"
              isEnabled={isDarkModeEnabled}
              onToggle={() => setIsDarkModeEnabled(!isDarkModeEnabled)}
            />
            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <FontAwesome name="sync-alt" size={22} color="#6B7280" style={styles.settingIcon} />
                <Text style={styles.settingLabel}>Sync Data</Text>
              </View>
              <GestureDetector gesture={syncGesture}>
                <Animated.View style={[styles.syncButton, syncAnimatedStyle]}>
                  <TouchableOpacity
                    onPress={handleSyncData}
                    disabled={isSyncing}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={isSyncing ? ['#6B7280', '#1F2937'] : ['#1F2937', '#4B5563']}
                      style={styles.syncButtonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      {isSyncing ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <Text style={styles.syncButtonText}>Sync Now</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              </GestureDetector>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 400,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 0.5,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9999,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  infoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 8,
  },
  infoIcon: {
    width: 28,
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  infoValue: {
    fontWeight: '600',
    color: '#1F2937',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  toggleTrack: {
    width: 52,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  toggleDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  syncButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  syncButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  syncButtonActive: {
    opacity: 0.9,
  },
  syncButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
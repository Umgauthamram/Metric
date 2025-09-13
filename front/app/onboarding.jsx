import { router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
  LayoutAnimation,
  UIManager,
} from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const sportsTests = [
  'Vertical Jump',
  'Shuttle Run',
  'Sit-ups',
  'Push-ups',
  'Sprint (100m)',
  'Endurance Run (1.6km)',
  'Flexibility Test',
];

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 3;

const DateWheelSelector = ({ items, selectedValue, onValueChange }) => {
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const index = Math.round(yOffset / ITEM_HEIGHT);
    const newValue = items[index];
    if (newValue !== selectedValue) {
      onValueChange(newValue);
    }
  };

  const handleScrollEnd = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const index = Math.round(yOffset / ITEM_HEIGHT);
    scrollViewRef.current.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
  };

  useEffect(() => {
    const initialIndex = items.indexOf(selectedValue);
    if (initialIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: initialIndex * ITEM_HEIGHT, animated: false });
    }
  }, [items, selectedValue]);

  return (
    <View style={styles.wheelContainer}>
      <View style={styles.selectionBar} />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleScrollEnd}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
      >
        <View style={{ height: (VISIBLE_ITEMS - 1) / 2 * ITEM_HEIGHT }} />
        {items.map((item, index) => (
          <View key={index} style={styles.wheelItem}>
            <Text style={[styles.wheelItemText, item === selectedValue && styles.wheelItemTextSelected]}>
              {item}
            </Text>
          </View>
        ))}
        <View style={{ height: (VISIBLE_ITEMS - 1) / 2 * ITEM_HEIGHT }} />
      </ScrollView>
    </View>
  );
};

const OnboardingScreen = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState({ day: 1, month: 'January', year: 2000 });
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);
  const scrollViewRef = useRef(null);

  const progress = (step / 4) * 100;

  const animateAndNavigate = (newStep) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep(newStep);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleNext = () => {
    if (step < 4) {
      animateAndNavigate(step + 1);
    } else {
      const onboardingData = { gender, dob, weight, height, selectedTests };
      console.log('Onboarding complete:', onboardingData);
      router.replace('/(tabs)/');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      animateAndNavigate(step - 1);
    }
  };

  const toggleTest = (test) => {
    setSelectedTests((prev) =>
      prev.includes(test)
        ? prev.filter((t) => t !== test)
        : [...prev, test]
    );
  };

  const daysInMonth = (month, year) => {
    const monthIndex = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].indexOf(month);
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What's your gender?</Text>
            <Text style={styles.stepSubtitle}>
              This helps us with personalized analytics.
            </Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.answerButton, gender === 'Male' && styles.answerButtonSelected]}
                onPress={() => { setGender('Male'); handleNext(); }}
              >
                <Text style={[styles.answerButtonText, gender === 'Male' && styles.answerButtonTextSelected]}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.answerButton, gender === 'Female' && styles.answerButtonSelected]}
                onPress={() => { setGender('Female'); handleNext(); }}
              >
                <Text style={[styles.answerButtonText, gender === 'Female' && styles.answerButtonTextSelected]}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.answerButton, gender === 'Other' && styles.answerButtonSelected]}
                onPress={() => { setGender('Other'); handleNext(); }}
              >
                <Text style={[styles.answerButtonText, gender === 'Other' && styles.answerButtonTextSelected]}>Prefer not to say</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What's your date of birth?</Text>
            <Text style={styles.stepSubtitle}>
              Age is a key factor in performance data.
            </Text>
            <View style={styles.dobContainer}>
                <DateWheelSelector
                    items={days}
                    selectedValue={dob.day}
                    onValueChange={(day) => setDob(prev => ({ ...prev, day }))}
                />
                <DateWheelSelector
                    items={months}
                    selectedValue={dob.month}
                    onValueChange={(month) => setDob(prev => ({ ...prev, month }))}
                />
                <DateWheelSelector
                    items={years}
                    selectedValue={dob.year}
                    onValueChange={(year) => setDob(prev => ({ ...prev, year }))}
                />
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What are your measurements?</Text>
            <Text style={styles.stepSubtitle}>
              Body metrics are important for a full fitness profile.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Weight (in kg)"
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <TextInput
              style={styles.input}
              placeholder="Height (in cm)"
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Select your tests.</Text>
            <Text style={styles.stepSubtitle}>
              Choose the tests you want to track. You can always change this later.
            </Text>
            <View style={styles.testsContainer}>
              {sportsTests.map((test) => (
                <TouchableOpacity
                  key={test}
                  style={[
                    styles.testButton,
                    selectedTests.includes(test) && styles.testButtonSelected,
                  ]}
                  onPress={() => toggleTest(test)}
                >
                  <Text
                    style={[
                      styles.testButtonText,
                      selectedTests.includes(test) && styles.testButtonTextSelected,
                    ]}
                  >
                    {test}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <View style={styles.contentWrapper}>
          {renderStep()}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {step > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.nextButton, step === 1 && { flex: 1, marginLeft: 0 }]} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{step === 4 ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding : 20  ,},
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 4,
  },
  closeButton: {
    marginLeft: 16,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#aaa',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  stepContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: 24, // Added padding to the step container
  },
  stepTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: 'black',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 32,
  },
  buttonGroup: {
    width: '100%',
  },
  answerButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  answerButtonSelected: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  answerButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  answerButtonTextSelected: {
    color: 'white',
  },
  dobContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: VISIBLE_ITEMS * ITEM_HEIGHT + 24, // Adjusted height for spacing
    paddingHorizontal: 20, // Add horizontal padding for a better look
  },
  wheelContainer: {
    flex: 1,
    height: VISIBLE_ITEMS * ITEM_HEIGHT,
    position: 'relative',
    marginHorizontal: 8,
  },
  selectionBar: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    transform: [{ translateY: -ITEM_HEIGHT / 2 }],
    zIndex: -1,
  },
  wheelItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelItemText: {
    fontSize: 14, // Adjusted font size
    color: '#888',
  },
  wheelItemTextSelected: {
    fontSize: 18, // Adjusted font size
    fontWeight: '600',
    color: 'black',
  },
  input: {
    backgroundColor: '#f5f5f5',
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    width: '100%',
    color: 'black',
  },
  testsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  testButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  testButtonSelected: {
    borderColor: 'black',
    backgroundColor: 'black',
  },
  testButtonText: {
    color: '#555',
    fontWeight: '500',
    fontSize: 14,
  },
  testButtonTextSelected: {
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#888',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: 'black',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flex: 1,
    marginLeft: 16,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OnboardingScreen;

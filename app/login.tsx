import { getTranslation } from '@/locales/translations';
import { signIn } from '@/services/firebaseAuth';
import { useAuthStore } from '@/store/authStore';
import { useLanguageStore } from '@/store/languageStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Keyboard, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const { language } = useLanguageStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!resetEmail.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!resetEmail.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Open WhatsApp with pre-filled message
    const message = `Hi, I forgot my password. My email is: ${resetEmail}`;
    const whatsappUrl = `https://wa.me/2348105795528?text=${encodeURIComponent(message)}`;
    
    try {
      await Linking.openURL(whatsappUrl);
      setShowForgotPasswordModal(false);
      setResetEmail('');
    } catch (error) {
      Alert.alert('Error', 'Could not open WhatsApp. Please make sure WhatsApp is installed.');
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        getTranslation('common.error', language),
        'Please fill in all fields'
      );
      return;
    }

    if (!email.includes('@')) {
      Alert.alert(
        getTranslation('common.error', language),
        'Please enter a valid email'
      );
      return;
    }

    setLoading(true);
    
    try {
      // Sign in with Supabase
      const userProfile = await signIn(email, password);
      
      // Import isUserAdmin to check if user is admin
      const { isUserAdmin } = await import('@/services/firebaseAuth');
      
      // Update auth store with user data
      setUser({
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        isAdmin: isUserAdmin(userProfile.email),
      });
      
      setLoading(false);
      router.replace('/(tabs)');
    } catch (error: any) {
      setLoading(false);
      
      let errorMessage = 'Login failed. Please try again.';
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password.';
      } else if (error.message.includes('user-not-found')) {
        errorMessage = 'User not found. Please sign up first.';
      } else if (error.message.includes('wrong-password')) {
        errorMessage = 'Invalid password.';
      } else if (error.message.includes('invalid-email')) {
        errorMessage = 'Invalid email address.';
      } else if (error.message.includes('too-many-requests')) {
        errorMessage = 'Too many login attempts. Please try again later.';
      }
      
      Alert.alert(
        getTranslation('common.error', language),
        errorMessage
      );
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={16}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            Keyboard.dismiss();
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>{getTranslation('login.title', language)}</Text>
        <View style={styles.backButtonPlaceholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>{getTranslation('login.subtitle', language)}</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{getTranslation('signup.email', language)}</Text>
            <TextInput
              style={styles.input}
              placeholder={getTranslation('signup.email', language)}
              placeholderTextColor="#666666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{getTranslation('signup.password', language)}</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder={getTranslation('signup.password', language)}
                placeholderTextColor="#666666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="#AAAAAA"
                />
              </Pressable>
            </View>
          </View>

          <Pressable
            style={styles.forgotPasswordLink}
            onPress={() => setShowForgotPasswordModal(true)}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Logging in...' : getTranslation('login.button', language)}
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{getTranslation('login.noaccount', language)} </Text>
          <Pressable onPress={() => router.push('/country-select')}>
            <Text style={styles.linkText}>{getTranslation('login.signup', language)}</Text>
          </Pressable>
        </View>
      </View>

      {/* Extra padding at bottom to allow scrolling above keyboard */}
      <View style={styles.bottomPadding} />

      {/* Forgot Password Modal */}
      <Modal
        visible={showForgotPasswordModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowForgotPasswordModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Reset Password</Text>
              <Pressable
                onPress={() => setShowForgotPasswordModal(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </Pressable>
            </View>

            <Text style={styles.modalDescription}>
              Enter your email address and we'll help you reset your password via WhatsApp.
            </Text>

            <View style={styles.modalInputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter your email"
                placeholderTextColor="#666666"
                value={resetEmail}
                onChangeText={setResetEmail}
                keyboardType="email-address"
              />
            </View>

            <Pressable
              style={styles.modalButton}
              onPress={handleForgotPassword}
            >
              <Text style={styles.modalButtonText}>
                Contact Admin on WhatsApp
              </Text>
            </Pressable>

            <Pressable
              style={styles.modalCancelButton}
              onPress={() => setShowForgotPasswordModal(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  backButtonPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 300,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 20,
    lineHeight: 20,
  },
  modalInputGroup: {
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 14,
  },
  modalButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  modalCancelButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  modalCancelButtonText: {
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '600',
  },
});

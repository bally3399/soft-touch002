import { Language, getTranslation } from '@/locales/translations';
import { changePassword, updateUserName } from '@/services/firebaseAuth';
import { useAuthStore } from '@/store/authStore';
import { COUNTRY_LANGUAGES, useLanguageStore } from '@/store/languageStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AccountScreen() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const { language, setLanguage, country } = useLanguageStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get available languages for the current country
  const availableLanguages = useMemo(() => {
    return COUNTRY_LANGUAGES[country] || COUNTRY_LANGUAGES.default;
  }, [country]);

  // Type-safe country for translations
  const countryForTranslation = country as any;

  const handleLogout = () => {
    Alert.alert(
      getTranslation('account.logout', language, countryForTranslation),
      getTranslation('common.logout', language, countryForTranslation) || 'Are you sure you want to logout?',
      [
        { text: getTranslation('common.cancel', language, countryForTranslation), onPress: () => {} },
        {
          text: getTranslation('account.logout', language, countryForTranslation),
          onPress: () => {
            logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const handleSaveProfile = async () => {
    if (!editedName.trim()) {
      Alert.alert(
        getTranslation('common.error', language, countryForTranslation),
        getTranslation('profile.fillall', language, countryForTranslation) || 'Name cannot be empty'
      );
      return;
    }

    setIsLoading(true);
    try {
      if (!user) throw new Error('No user logged in');
      
      await updateUserName(user.id, editedName);
      setUser({ ...user, name: editedName });
      Alert.alert(
        getTranslation('common.success', language, countryForTranslation),
        getTranslation('profile.updated', language, countryForTranslation) || 'Profile updated successfully'
      );
      setIsEditing(false);
    } catch (error: any) {
      console.error('Profile update error:', error);
      Alert.alert(
        getTranslation('common.error', language, countryForTranslation),
        error.message || getTranslation('profile.error', language, countryForTranslation) || 'Failed to update profile'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert(
        getTranslation('common.error', language, countryForTranslation),
        getTranslation('checkout.fillall', language, countryForTranslation) || 'Please fill in all password fields'
      );
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert(
        getTranslation('common.error', language, countryForTranslation),
        getTranslation('signup.passwordmin', language, countryForTranslation) || 'New password must be at least 6 characters'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        getTranslation('common.error', language, countryForTranslation),
        getTranslation('signup.passwordmatch', language, countryForTranslation) || 'Passwords do not match'
      );
      return;
    }

    setIsLoading(true);
    try {
      await changePassword(newPassword);
      Alert.alert(
        getTranslation('common.success', language, countryForTranslation),
        getTranslation('account.changepassword', language, countryForTranslation) || 'Password updated successfully'
      );
      setShowPasswordChange(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Password change error:', error);
      Alert.alert(
        getTranslation('common.error', language, countryForTranslation),
        error.message || 'Failed to change password'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setShowLanguageSelect(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.section}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            {user?.isAdmin && (
              <View style={styles.adminBadge}>
                <Ionicons name="shield-checkmark" size={14} color="#FFFFFF" />
                <Text style={styles.adminText}>Admin</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Edit Profile Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{getTranslation('profile.title', language, countryForTranslation)}</Text>
          <Pressable onPress={() => setIsEditing(!isEditing)}>
            <Ionicons
              name={isEditing ? 'close' : 'pencil'}
              size={20}
              color="#FFFFFF"
            />
          </Pressable>
        </View>

        {isEditing ? (
          <View style={styles.editForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{getTranslation('profile.fullname', language, countryForTranslation)}</Text>
              <TextInput
                style={styles.input}
                value={editedName}
                onChangeText={setEditedName}
                placeholderTextColor="#666666"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{getTranslation('profile.email', language, countryForTranslation)}</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={user?.email}
                editable={false}
                placeholderTextColor="#666666"
              />
            </View>

            <Pressable style={[styles.saveButton, isLoading && styles.buttonDisabled]} onPress={handleSaveProfile} disabled={isLoading}>
              <Text style={styles.saveButtonText}>{isLoading ? getTranslation('profile.updating', language, countryForTranslation) : getTranslation('common.save', language, countryForTranslation)}</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{getTranslation('profile.fullname', language, countryForTranslation)}:</Text>
              <Text style={styles.infoValue}>{user?.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{getTranslation('profile.email', language, countryForTranslation)}:</Text>
              <Text style={styles.infoValue}>{user?.email}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Language Selection Section */}
      <View style={styles.section}>
        <Pressable
          style={styles.sectionHeader}
          onPress={() => setShowLanguageSelect(!showLanguageSelect)}
        >
          <Text style={styles.sectionTitle}>{getTranslation('account.language', language, countryForTranslation)}</Text>
          <Ionicons
            name={showLanguageSelect ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#FFFFFF"
          />
        </Pressable>

        {showLanguageSelect && (
          <View style={styles.languageList}>
            {availableLanguages.map((lang) => (
              <Pressable
                key={lang.code}
                style={[
                  styles.languageItem,
                  language === lang.code && styles.languageItemActive,
                ]}
                onPress={() => handleChangeLanguage(lang.code)}
              >
                <View>
                  <Text style={styles.languageName}>{lang.name}</Text>
                  <Text style={styles.languageNative}>{lang.nativeName}</Text>
                </View>
                {language === lang.code && (
                  <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                )}
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Change Password Section */}
      <View style={styles.section}>
        <Pressable
          style={styles.sectionHeader}
          onPress={() => setShowPasswordChange(!showPasswordChange)}
        >
          <Text style={styles.sectionTitle}>{getTranslation('account.changepassword', language, countryForTranslation)}</Text>
          <Ionicons
            name={showPasswordChange ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#FFFFFF"
          />
        </Pressable>

        {showPasswordChange && (
          <View style={styles.editForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{getTranslation('login.emailaddress', language, countryForTranslation)}</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  secureTextEntry={!showOldPassword}
                  placeholderTextColor="#666666"
                  placeholder={getTranslation('login.emailaddress', language, countryForTranslation)}
                />
                <Pressable
                  style={styles.eyeIcon}
                  onPress={() => setShowOldPassword(!showOldPassword)}
                >
                  <Ionicons
                    name={showOldPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="#AAAAAA"
                  />
                </Pressable>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{getTranslation('signup.password', language, countryForTranslation)}</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showNewPassword}
                  placeholderTextColor="#666666"
                  placeholder={getTranslation('signup.password', language, countryForTranslation)}
                />
                <Pressable
                  style={styles.eyeIcon}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  <Ionicons
                    name={showNewPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="#AAAAAA"
                  />
                </Pressable>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{getTranslation('signup.confirmpassword', language, countryForTranslation)}</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  placeholderTextColor="#666666"
                  placeholder={getTranslation('signup.confirmpassword', language, countryForTranslation)}
                />
                <Pressable
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="#AAAAAA"
                  />
                </Pressable>
              </View>
            </View>

            <Pressable
              style={[styles.saveButton, isLoading && styles.buttonDisabled]}
              onPress={handleChangePassword}
              disabled={isLoading}
            >
              <Text style={styles.saveButtonText}>{isLoading ? getTranslation('profile.updating', language, countryForTranslation) : getTranslation('account.changepassword', language, countryForTranslation)}</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Admin Section */}
      {user?.isAdmin && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getTranslation('account.help', language, countryForTranslation)}</Text>
          <Pressable
            style={styles.adminButton}
            onPress={() => router.push('/upload-designs')}
          >
            <Ionicons name="cloud-upload" size={20} color="#FFFFFF" />
            <Text style={styles.adminButtonText}>{getTranslation('upload.title', language, countryForTranslation)}</Text>
          </Pressable>
          <Pressable
            style={styles.adminButton}
            onPress={() => router.push('/manage-designs')}
          >
            <Ionicons name="list" size={20} color="#FFFFFF" />
            <Text style={styles.adminButtonText}>{getTranslation('manage.title', language, countryForTranslation)}</Text>
          </Pressable>
          <Pressable
            style={styles.adminButton}
            onPress={() => router.push('/manage-featured')}
          >
            <Ionicons name="star" size={20} color="#FFB800" />
            <Text style={styles.adminButtonText}>{getTranslation('featured.title', language, countryForTranslation)}</Text>
          </Pressable>
        </View>
      )}

      {/* Logout Section */}
      <View style={styles.section}>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color="#FF6B6B" />
          <Text style={styles.logoutButtonText}>{getTranslation('account.logout', language, countryForTranslation)}</Text>
        </Pressable>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  section: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 8,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 4,
  },
  adminText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoContainer: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  infoLabel: {
    fontSize: 14,
    color: '#AAAAAA',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  editForm: {
    gap: 12,
  },
  inputGroup: {
    marginBottom: 8,
    marginTop: 5
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 14,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 14,
  },
  eyeIcon: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  disabledInput: {
    opacity: 0.6,
  },
  saveButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  languageList: {
    gap: 8,
  },
  languageItem: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#333333',
  },
  languageItemActive: {
    borderColor: '#FFFFFF',
    backgroundColor: '#333333',
  },
  languageName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  languageNative: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  adminButton: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
    marginTop: 10
  },
  adminButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    gap: 12,
  },
  logoutButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  spacer: {
    height: 20,
  },
});


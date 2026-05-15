import { Language } from '@/locales/translations';
import { COUNTRY_LANGUAGES, useLanguageStore } from '@/store/languageStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LanguageSelectScreen() {
  const router = useRouter();
  const { language, country, setLanguage } = useLanguageStore();

  // Get languages for the selected country
  const availableLanguages = COUNTRY_LANGUAGES[country] || COUNTRY_LANGUAGES['default'];

  const handleSelectLanguage = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    router.push('/signup');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Select Language</Text>
        <View style={styles.backButtonPlaceholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Choose your preferred language</Text>
        <Text style={styles.countryLabel}>{country}</Text>

        <ScrollView
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {availableLanguages.map((item) => (
            <Pressable
              key={item.code}
              style={[
                styles.languageItem,
                language === item.code && styles.languageItemActive,
              ]}
              onPress={() => handleSelectLanguage(item.code)}
            >
              <View style={styles.languageContent}>
                <Text style={styles.languageName}>{item.name}</Text>
                <Text style={styles.languageNative}>{item.nativeName}</Text>
              </View>
              {language === item.code && (
                <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
              )}
            </Pressable>
          ))}
        </ScrollView>

        <Pressable
          style={styles.continueButton}
          onPress={() => handleSelectLanguage(language)}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </View>

      <View style={styles.bottomPadding} />
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
    marginTop: 30,
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
    marginBottom: 8,
  },
  countryLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  listContainer: {
    marginBottom: 30,
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageItemActive: {
    borderColor: '#FFFFFF',
    backgroundColor: '#2A2A2A',
  },
  languageContent: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 300,
  },
});

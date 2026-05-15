import { addDesign } from '@/services/firebaseDesigns';
import { useAuthStore } from '@/store/authStore';
import { useDesignStore } from '@/store/designStore';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

const CATEGORIES = [
  { id: 'agbada', name: 'Agbada' },
  { id: 'english', name: 'English wears' },
  { id: 'native', name: 'Nativewear' },
  { id: 'tshirt', name: 'T-shirt' },
  { id: 'kaftan', name: 'Kaftan' },
  { id: 'cap', name: 'Cap' },
  { id: 'senate', name: 'Senate wear' },
];

const CATEGORY_PREFIXES: { [key: string]: string } = {
  agbada: 'AG',
  english: 'EG',
  native: 'NW',
  tshirt: 'TS',
  kaftan: 'KF',
  cap: 'CP',
  senate: 'SN',
};

export default function UploadDesignsScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const addDesignLocal = useDesignStore((state) => state.addDesign);
  const designs = useDesignStore((state) => state.designs);
  const [designName, setDesignName] = useState('');
  const [description, setDescription] = useState('');
  const [designPrice, setDesignPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('agbada');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const generateDesignId = (category: string) => {
    const prefix = CATEGORY_PREFIXES[category] || 'DS';
    const categoryDesigns = designs.filter(d => d.category === category);
    const nextNumber = categoryDesigns.length + 1;
    return `${prefix}-${String(nextNumber).padStart(2, '0')}`;
  };

  const designId = generateDesignId(selectedCategory);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleUpload = async () => {
    if (!selectedCategory.trim()) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    if (!designName.trim()) {
      Alert.alert('Error', 'Please enter a design name');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    if (!designPrice.trim()) {
      Alert.alert('Error', 'Please enter a price');
      return;
    }

    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image');
      return;
    }

    const price = parseFloat(designPrice);
    if (isNaN(price) || price < 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    setIsLoading(true);

    try {
      const designId = generateDesignId(selectedCategory);
      
      // Upload to Firebase
      const newDesign = await addDesign(
        {
          id: designId,
          name: designName,
          price,
          image: selectedImage,
          category: selectedCategory,
          description,
          createdBy: user.id,
        },
        selectedImage,
        user.id
      );

      // Also add to local store for immediate display
      addDesignLocal({
        id: designId,
        name: designName,
        price,
        image: newDesign.image,
        category: selectedCategory,
        description,
      });

      setIsLoading(false);

      Alert.alert('Success', 'Design uploaded successfully', [
        {
          text: 'OK',
          onPress: () => {
            setDesignName('');
            setDescription('');
            setDesignPrice('');
            setSelectedImage(null);
            setSelectedCategory('agbada');
          },
        },
      ]);
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert('Error', error.message || 'Failed to upload design');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Upload New Design</Text>
          <Text style={styles.headerSubtitle}>Add a new design to the catalog</Text>
        </View>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Form */}
      <View style={styles.content}>
        {/* Category */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <Pressable
            style={styles.selectButton}
            onPress={() => setShowCategoryModal(true)}
            disabled={isLoading}
          >
            <Text style={styles.selectButtonText}>
              {CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Select a category'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#FFFFFF" />
          </Pressable>

          <Modal
            visible={showCategoryModal}
            transparent
            animationType="fade"
            onRequestClose={() => setShowCategoryModal(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowCategoryModal(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Category</Text>
                {CATEGORIES.map((cat) => (
                  <Pressable
                    key={cat.id}
                    style={[
                      styles.modalOption,
                      selectedCategory === cat.id && styles.modalOptionActive,
                    ]}
                    onPress={() => {
                      setSelectedCategory(cat.id);
                      setShowCategoryModal(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        selectedCategory === cat.id && styles.modalOptionTextActive,
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Pressable>
          </Modal>
        </View>

        {/* Design ID */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Design ID</Text>
          <View style={[styles.input, styles.readOnlyInput]}>
            <Text style={styles.readOnlyText}>{designId}</Text>
          </View>
        </View>

        {/* Design Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Design Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Royal Agbada"
            placeholderTextColor="#666666"
            value={designName}
            onChangeText={setDesignName}
            editable={!isLoading}
          />
        </View>

        {/* Description */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter a description of the design"
            placeholderTextColor="#666666"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            editable={!isLoading}
          />
        </View>

        {/* Price */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Price ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="29.99"
            placeholderTextColor="#666666"
            value={designPrice}
            onChangeText={setDesignPrice}
            keyboardType="decimal-pad"
            editable={!isLoading}
          />
        </View>

        {/* Image Picker */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Design Image</Text>
          <Pressable
            style={styles.imagePicker}
            onPress={pickImage}
            disabled={isLoading}
          >
            {selectedImage ? (
              <>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.selectedImage}
                />
                <Pressable
                  style={styles.changeImageButton}
                  onPress={pickImage}
                >
                  <Ionicons name="pencil" size={16} color="#FFFFFF" />
                </Pressable>
              </>
            ) : (
              <View style={styles.imagePickerContent}>
                <Ionicons name="cloud-upload" size={32} color="#FFFFFF" />
                <Text style={styles.imagePickerText}>Select Image</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Upload Button */}
        <Pressable
          style={[styles.uploadButton, isLoading && styles.uploadButtonDisabled]}
          onPress={handleUpload}
          disabled={isLoading}
        >
          <Ionicons name="cloud-upload" size={20} color="#000000" />
          <Text style={styles.uploadButtonText}>
            {isLoading ? 'Uploading...' : 'Add Design'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginTop: 26,
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
    marginTop: 15

  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    marginTop: 20,
    flex: 1,
    textAlign:'center'

  },
  headerSubtitle: {
    fontSize: 14,
    color: '#AAAAAA',
    flex: 1,
    textAlign:'center'
  },
  headerPlaceholder: {
    width: 24,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  formGroup: {
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  readOnlyInput: {
    justifyContent: 'center',
  },
  readOnlyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  selectButton: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 16,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  modalOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  modalOptionActive: {
    backgroundColor: '#2A2A2A',
  },
  modalOptionText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  modalOptionTextActive: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  imagePicker: {
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: 8,
    overflow: 'hidden',
    maxHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerContent: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  imagePickerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  selectedImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  uploadButtonDisabled: {
    opacity: 0.6,
  },
  uploadButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

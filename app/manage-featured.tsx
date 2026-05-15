import { addToFeatured, getFeaturedDesigns, removeFromFeatured } from '@/services/firebaseFeatured';
import { useDesignStore } from '@/store/designStore';
import { useFeaturedStore } from '@/store/featuredStore';
import { useLanguageStore } from '@/store/languageStore';
import { formatPrice } from '@/utils/currency';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ManageFeaturedScreen() {
  const router = useRouter();
  const designs = useDesignStore((state) => state.designs);
  const { featuredProducts, addFeaturedProduct, removeFeaturedProduct, isFeatured } = useFeaturedStore();
  const { country } = useLanguageStore();
  const [selectedTab, setSelectedTab] = useState<'available' | 'featured'>('available');
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseFeatured, setFirebaseFeatured] = useState<any[]>([]);

  // Load featured products from Firebase when screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadFeatured = async () => {
        try {
          setIsLoading(true);
          const featured = await getFeaturedDesigns();
          setFirebaseFeatured(featured);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to load featured products:', error);
          setIsLoading(false);
        }
      };
      loadFeatured();
    }, [])
  );

  const availableDesigns = designs.filter((d) => !isFeatured(d.id) && !firebaseFeatured.some(f => f.designId === d.id));

  const handleAddFeatured = async (design: any) => {
    try {
      setIsLoading(true);
      // Add to Firebase
      await addToFeatured(design);
      // Add to local store
      await addFeaturedProduct(design);
      // Reload featured products
      const featured = await getFeaturedDesigns();
      setFirebaseFeatured(featured);
      setIsLoading(false);
      Alert.alert('Success', `${design.name} added to featured products!`);
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert('Error', error.message || 'Failed to add to featured');
    }
  };

  const handleRemoveFeatured = async (id: string, name: string) => {
    Alert.alert('Remove Featured', `Remove ${name} from featured products?`, [
      { text: 'Cancel' },
      {
        text: 'Remove',
        onPress: async () => {
          try {
            setIsLoading(true);
            // Remove from Firebase
            await removeFromFeatured(id);
            // Remove from local store
            await removeFeaturedProduct(id);
            // Reload featured products
            const featured = await getFeaturedDesigns();
            setFirebaseFeatured(featured);
            setIsLoading(false);
            Alert.alert('Success', `${name} removed from featured products`);
          } catch (error: any) {
            setIsLoading(false);
            Alert.alert('Error', error.message || 'Failed to remove from featured');
          }
        },
      },
    ]);
  };

  const renderAvailableDesign = ({ item }: any) => (
    <View style={styles.designCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.designImage}
      />
      <View style={styles.designInfo}>
        <Text style={styles.designName}>{item.name}</Text>
        <Text style={styles.designId}>ID: {item.id}</Text>
        <Text style={styles.designPrice}>{formatPrice(item.price || 0, country)}</Text>
      </View>
      <Pressable
        style={styles.addButton}
        onPress={() => handleAddFeatured(item)}
      >
        <Ionicons name="star" size={20} color="#FFB800" />
      </Pressable>
    </View>
  );

  const renderFeaturedDesign = ({ item }: any) => {
    if (!item) {
      return null;
    }
    
    return (
      <View style={styles.designCard}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.designImage}
            onError={(error) => {
              console.error('Featured image load error for', item.id);
            }}
          />
        ) : (
          <View style={[styles.designImage, styles.imagePlaceholder]}>
            <Ionicons name="image" size={32} color="#666666" />
          </View>
        )}
        <View style={styles.designInfo}>
          <Text style={styles.designName}>{item.name}</Text>
          <Text style={styles.designId}>ID: {item.id}</Text>
          <Text style={styles.designPrice}>{formatPrice(item.price || 0, country)}</Text>
        </View>
        <Pressable
          style={[styles.removeButton]}
          onPress={() => handleRemoveFeatured(item.id, item.name)}
          disabled={isLoading}
        >
          <Ionicons name="trash" size={20} color="#FF6B6B" />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Manage Featured</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabsContainer}>
        <Pressable
          style={[styles.tab, selectedTab === 'available' && styles.tabActive]}
          onPress={() => setSelectedTab('available')}
        >
          <Text style={[styles.tabText, selectedTab === 'available' && styles.tabTextActive]}>
            Available ({availableDesigns.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, selectedTab === 'featured' && styles.tabActive]}
          onPress={() => setSelectedTab('featured')}
        >
          <Text style={[styles.tabText, selectedTab === 'featured' && styles.tabTextActive]}>
            Featured ({firebaseFeatured.length})
          </Text>
        </Pressable>
      </View>

      {selectedTab === 'available' ? (
        availableDesigns.length > 0 ? (
          <FlatList
            data={availableDesigns}
            renderItem={renderAvailableDesign}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-circle" size={64} color="#666666" />
            <Text style={styles.emptyTitle}>All Products Featured!</Text>
            <Text style={styles.emptyText}>All your designs are already featured</Text>
          </View>
        )
      ) : firebaseFeatured.length > 0 ? (
        <FlatList
          data={firebaseFeatured}
          renderItem={({ item }) => renderFeaturedDesign({ item })}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="star-outline" size={64} color="#666666" />
          <Text style={styles.emptyTitle}>No Featured Products</Text>
          <Text style={styles.emptyText}>Add products to feature them on the home screen</Text>
        </View>
      )}
    </View>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 28,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#AAAAAA',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  designCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
  },
  designImage: {
    width: 100,
    height: 120,
    backgroundColor: '#2A2A2A',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  designInfo: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  designName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  designId: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  designPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
  },
});

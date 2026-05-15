import { useCartStore } from '@/store/cartStore';
import { useDesignStore } from '@/store/designStore';
import { useLanguageStore } from '@/store/languageStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice } from '@/utils/currency';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const CATEGORIES = [
  { id: 'all', name: 'All', icon: 'grid' },
  { id: 'agbada', name: 'Agbada', icon: 'shirt' },
  { id: 'english', name: 'English wears', icon: 'shirt' },
  { id: 'native', name: 'Nativewear', icon: 'shirt' },
  { id: 'tshirt', name: 'T-shirt', icon: 'shirt' },
  { id: 'kaftan', name: 'Kaftan', icon: 'shirt' },
  { id: 'cap', name: 'Cap', icon: 'shirt' },
  { id: 'senate', name: 'Senate wear', icon: 'shirt' },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const designs = useDesignStore((state) => state.designs);
  const addToCart = useCartStore((state) => state.addToCart);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { country } = useLanguageStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter designs by category
  const filteredDesigns = selectedCategory === 'all' 
    ? designs 
    : designs.filter(design => design.category === selectedCategory);

  const handleAddToCart = (design: any) => {
    addToCart(design);
    Alert.alert('Success', `${design.name} added to cart!`);
  };

  const handleToggleWishlist = (design: any) => {
    if (isInWishlist(design.id)) {
      removeFromWishlist(design.id);
      Alert.alert('Removed', `${design.name} removed from wishlist`);
    } else {
      addToWishlist(design);
      Alert.alert('Added', `${design.name} added to wishlist`);
    }
  };

  const renderProductCard = ({ item }: any) => {
    const inWishlist = isInWishlist(item.id);
    return (
      <Pressable 
        style={styles.productCard}
        onPress={() => {
          router.push({
            pathname: '/product-details',
            params: {
              id: item.id,
              name: item.name,
              image: item.image,
              price: item.price?.toString() || '0',
              category: item.category,
              description: item.description,
            },
          });
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
          />
          <Pressable
            style={styles.wishlistButton}
            onPress={() => handleToggleWishlist(item)}
          >
            <Ionicons
              name={inWishlist ? 'heart' : 'heart-outline'}
              size={24}
              color={inWishlist ? '#FF6B6B' : '#FFFFFF'}
            />
          </Pressable>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productId}>ID: {item.id}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
          <Text style={styles.productPrice}>{formatPrice(item.price || 0, country)}</Text>
          <Pressable
            style={styles.cartButton}
            onPress={() => handleAddToCart(item)}
          >
            <Ionicons name="cart" size={18} color="#FFFFFF" />
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Designs</Text>
      </View>

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <View style={styles.filterLabel}>
          <Ionicons name="filter" size={18} color="#FFFFFF" />
          <Text style={styles.filterText}>Filter by Category</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {CATEGORIES.map((category) => (
            <Pressable
              key={category.id}
              style={[
                styles.filterButton,
                selectedCategory === category.id && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCategory === category.id && styles.filterButtonTextActive,
                ]}
              >
                {category.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Products Grid */}
      {filteredDesigns.length > 0 ? (
        <FlatList
          data={filteredDesigns}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="shirt" size={64} color="#666666" />
          <Text style={styles.emptyStateTitle}>No Designs Found</Text>
          <Text style={styles.emptyStateText}>
            No designs in this category yet. Check back soon!
          </Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  filterLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333333',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  filterButtonTextActive: {
    color: '#000000',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginHorizontal: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: '#2A2A2A',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  productId: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#CCCCCC',
    marginBottom: 8,
    lineHeight: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: '#333333',
  },
  cartButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
  },
});

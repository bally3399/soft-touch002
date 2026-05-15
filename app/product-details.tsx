import { useCartStore } from '@/store/cartStore';
import { useLanguageStore } from '@/store/languageStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice } from '@/utils/currency';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { id, name, image, price, category, description } = useLocalSearchParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { country } = useLanguageStore();

  const design = {
    id: id as string,
    name: name as string,
    image: image as string,
    price: price ? parseFloat(price as string) : 0,
    category: category as string,
    description: description as string,
  };

  const inWishlist = isInWishlist(design.id);

  const handleAddToCart = () => {
    addToCart(design);
    Alert.alert('Success', `${design.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(design.id);
      Alert.alert('Removed', `${design.name} removed from wishlist`);
    } else {
      addToWishlist(design);
      Alert.alert('Added', `${design.name} added to wishlist`);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Product Details</Text>
        <Pressable onPress={handleToggleWishlist}>
          <Ionicons
            name={inWishlist ? 'heart' : 'heart-outline'}
            size={28}
            color={inWishlist ? '#FF6B6B' : '#FFFFFF'}
          />
        </Pressable>
      </View>

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: design.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* Product Info */}
      <View style={styles.infoSection}>
        <View style={styles.titleRow}>
          <View style={styles.titleColumn}>
            <Text style={styles.productName}>{design.name}</Text>
            <Text style={styles.productId}>ID: {design.id}</Text>
          </View>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name="star"
                size={16}
                color="#FFB800"
                style={{ marginRight: 2 }}
              />
            ))}
            <Text style={styles.reviewCount}>(99)</Text>
          </View>
        </View>

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>{formatPrice(design.price, country)}</Text>
        </View>

        {/* Category */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Category</Text>
          <Text style={styles.category}>{design.category}</Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.description}>{design.description}</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresLabel}>Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.featureText}>Premium Quality</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.featureText}>Authentic Design</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.featureText}>Fast Delivery</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Ionicons name="cart" size={20} color="#000000" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>

          <Pressable
            style={styles.buyNowButton}
            onPress={() => {
              handleAddToCart();
              router.push('/(tabs)/cart');
            }}
          >
            <Ionicons name="bag-check" size={20} color="#FFFFFF" />
            <Text style={styles.buyNowText}>Buy Now</Text>
          </Pressable>
        </View>
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
  imageContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleColumn: {
    flex: 1,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  productId: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reviewCount: {
    fontSize: 12,
    color: '#AAAAAA',
    marginLeft: 4,
  },
  priceContainer: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  priceLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryContainer: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  descriptionContainer: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  descriptionLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
  featuresContainer: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  featuresLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 12,
  },
  featuresList: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  buyNowButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#333333',
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  buyNowText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  spacer: {
    height: 20,
  },
});

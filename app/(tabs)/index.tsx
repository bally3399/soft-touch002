import { getAllDesigns } from '@/services/firebaseDesigns';
import { useCartStore } from '@/store/cartStore';
import { useDesignStore } from '@/store/designStore';
import { useFeaturedStore } from '@/store/featuredStore';
import { useLanguageStore } from '@/store/languageStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice } from '@/utils/currency';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const designs = useDesignStore((state) => state.designs);
  const setDesigns = useDesignStore((state) => state.setDesigns);
  const addToCart = useCartStore((state) => state.addToCart);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { featuredProducts, loadFeaturedProducts } = useFeaturedStore();
  const { country } = useLanguageStore();
  const [isLoading, setIsLoading] = useState(true);

  // Animation values
  const emojiOpacity = useRef(new Animated.Value(0)).current;
  const emojiScale = useRef(new Animated.Value(0.5)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.8)).current;

  // Load designs when screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadDesigns = async () => {
        try {
          setIsLoading(true);
          const supabaseDesigns = await getAllDesigns();
          if (supabaseDesigns && supabaseDesigns.length > 0) {
            const mappedDesigns = supabaseDesigns.map(d => ({
              id: d.id,
              name: d.name,
              price: d.price,
              image: d.image,
              category: d.category,
              description: d.description,
            }));
            setDesigns(mappedDesigns);
          }
        } catch (error) {
          console.error('Failed to load designs:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadDesigns();
    }, [setDesigns])
  );

  useEffect(() => {
    // Emoji animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(emojiOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(emojiScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Title animation starts after emoji
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(titleScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Clear featured products and load fresh
    const clearAndLoad = async () => {
      const { clearFeaturedProducts } = useFeaturedStore.getState();
      await clearFeaturedProducts();
      loadFeaturedProducts();
    };
    
    clearAndLoad();
  }, []);

  const handleAddToCart = (design: any) => {
    addToCart(design);
    Alert.alert('Success', `${design.name} added to cart!`);
  };

  const handleToggleWishlist = (design: any) => {
    if (isInWishlist(design.id)) {
      removeFromWishlist(design.id);
    } else {
      addToWishlist(design);
    }
  };

  // Get top 3 designs for new arrivals
  const newArrivals = designs.slice(0, 3);

  // Featured categories with images
  const featuredCategories = [
    { id: 'agbada', name: 'Agbada', image: require('@/assets/images/Agbada.jpeg') },
    { id: 'cap', name: 'Cap', image: require('@/assets/images/Cap.jpeg') },
    { id: 'kaftan', name: 'Kaftan', image: require('@/assets/images/Kaftan.jpeg') },
  ];

  // Testimonials
  const testimonials = [
    {
      id: '1',
      name: 'John Doe',
      text: 'The quality of my Agbada exceeded my expectations. Truly royal craftsmanship!',
      rating: 5,
    },
    {
      id: '2',
      name: 'Sarah Smith',
      text: 'Amazing designs and excellent customer service. Highly recommended!',
      rating: 5,
    },
    {
      id: '3',
      name: 'Ahmed Hassan',
      text: 'Best traditional wear collection I\'ve found. Worth every penny!',
      rating: 5,
    },
  ];

  // Hero Section
  const renderHero = () => (
    <View style={styles.heroSection}>
      <Animated.Text
        style={[
          styles.heroEmoji,
          {
            opacity: emojiOpacity,
            transform: [{ scale: emojiScale }],
          },
        ]}
      >
        🪡
      </Animated.Text>
      <Animated.Text
        style={[
          styles.heroTitle,
          {
            opacity: titleOpacity,
            transform: [{ scale: titleScale }],
          },
        ]}
      >
        Soft Touch
      </Animated.Text>
      <Text style={styles.heroSubtitle}>Discover our exclusive collection designed for kings</Text>
      <Pressable 
        style={styles.heroButton}
        onPress={() => router.push('/(tabs)/categories')}
      >
        <Text style={styles.heroButtonText}>Explore Designs</Text>
      </Pressable>
    </View>
  );

  // New Arrivals Section
  const renderNewArrivals = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <Pressable onPress={() => router.push('/(tabs)/categories')}>
          <Text style={styles.seeAllText}>See All</Text>
        </Pressable>
      </View>
      {newArrivals.length === 0 ? (
        <View style={styles.emptySection}>
          <Text style={styles.emptySectionText}>No designs available yet</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {newArrivals.map((design) => {
            const inWishlist = isInWishlist(design.id);
            return (
              <Pressable 
                key={design.id} 
                style={styles.newArrivalCard}
                onPress={() => {
                  router.push({
                    pathname: '/product-details',
                    params: {
                      id: design.id,
                      name: design.name,
                      image: design.image,
                      price: design.price?.toString() || '0',
                      category: design.category,
                      description: design.description,
                    },
                  });
                }}
              >
                <View style={styles.imageContainer}>
                  {design.image ? (
                    <>
                      <Image
                        source={{ uri: design.image }}
                        style={styles.newArrivalImage}
                        resizeMode="cover"
                        onError={(error) => {
                          console.error('Image load error for', design.id);
                        }}
                      />
                      <Text style={styles.imageDebugText}>{design.id}</Text>
                    </>
                  ) : (
                    <View style={[styles.newArrivalImage, styles.imagePlaceholder]}>
                      <Ionicons name="image" size={48} color="#666666" />
                      <Text style={styles.placeholderText}>No Image</Text>
                    </View>
                  )}
                  <Pressable
                    style={styles.wishlistButton}
                    onPress={() => handleToggleWishlist(design)}
                  >
                    <Ionicons
                      name={inWishlist ? 'heart' : 'heart-outline'}
                      size={20}
                      color={inWishlist ? '#FF6B6B' : '#FFFFFF'}
                    />
                  </Pressable>
                </View>
                <View style={styles.newArrivalInfo}>
                  <Text style={styles.newArrivalName}>{design.name}</Text>
                  <Text style={styles.newArrivalId}>ID: {design.id}</Text>
                  <Text style={styles.newArrivalDescription} numberOfLines={2}>{design.description}</Text>
                  <Text style={styles.newArrivalPrice}>{formatPrice(design.price || 0, country)}</Text>
                  <Pressable
                    style={styles.cartButton}
                    onPress={() => handleAddToCart(design)}
                  >
                    <Ionicons name="cart" size={16} color="#FFFFFF" />
                    <Text style={styles.cartButtonText}>Add to Cart</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );

  // Featured Design Section
  const renderFeatured = () => {
    // Only render if there are featured products
    if (!featuredProducts || featuredProducts.length === 0) {
      return null;
    }

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Design</Text>
          <Pressable onPress={() => router.push('/(tabs)/categories')}>
            <Text style={styles.seeAllText}>See All</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {featuredProducts.map((design) => {
            const inWishlist = isInWishlist(design.id);
            return (
              <Pressable 
                key={design.id} 
                style={styles.newArrivalCard}
                onPress={() => {
                  router.push({
                    pathname: '/product-details',
                    params: {
                      id: design.id,
                      name: design.name,
                      image: design.image,
                      price: design.price?.toString() || '0',
                      category: design.category,
                      description: design.description,
                    },
                  });
                }}
              >
                <View style={styles.imageContainer}>
                  {design.image ? (
                    <>
                      <Image
                        source={{ uri: design.image }}
                        style={styles.newArrivalImage}
                        resizeMode="cover"
                        onError={(error) => {
                          console.error('Featured image load error for', design.id);
                        }}
                      />
                      <Text style={styles.imageDebugText}>{design.id}</Text>
                    </>
                  ) : (
                    <View style={[styles.newArrivalImage, styles.imagePlaceholder]}>
                      <Ionicons name="image" size={48} color="#666666" />
                      <Text style={styles.placeholderText}>No Image</Text>
                    </View>
                  )}
                  <Pressable
                    style={styles.wishlistButton}
                    onPress={() => handleToggleWishlist(design)}
                  >
                    <Ionicons
                      name={inWishlist ? 'heart' : 'heart-outline'}
                      size={20}
                      color={inWishlist ? '#FF6B6B' : '#FFFFFF'}
                    />
                  </Pressable>
                </View>
                <View style={styles.newArrivalInfo}>
                  <Text style={styles.newArrivalName}>{design.name}</Text>
                  <Text style={styles.newArrivalId}>ID: {design.id}</Text>
                  <Text style={styles.newArrivalDescription} numberOfLines={2}>{design.description}</Text>
                  <Text style={styles.newArrivalPrice}>{formatPrice(design.price || 0, country)}</Text>
                  <Pressable
                    style={styles.cartButton}
                    onPress={() => handleAddToCart(design)}
                  >
                    <Ionicons name="cart" size={16} color="#FFFFFF" />
                    <Text style={styles.cartButtonText}>Add to Cart</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  // Featured Categories Section (Horizontal Slides)
  const renderFeaturedCategories = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Browse Categories</Text>
        <Pressable onPress={() => router.push('/(tabs)/categories')}>
          <Text style={styles.seeAllText}>See All</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {featuredCategories.map((category) => (
          <Pressable
            key={category.id}
            style={styles.categorySlide}
            onPress={() => router.push('/(tabs)/categories')}
          >
            <Image
              source={category.image}
              style={styles.categoryImage}
            />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categorySlideText}>{category.name}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  // Testimonials Section
  const renderTestimonials = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>What Our Customers Say</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {testimonials.map((testimonial) => (
          <View key={testimonial.id} style={styles.testimonialCard}>
            <View style={styles.testimonialHeader}>
              <View style={styles.testimonialAvatar}>
                <Ionicons name="person" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.testimonialMeta}>
                <Text style={styles.testimonialName}>{testimonial.name}</Text>
                <View style={styles.testimonialStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={12}
                      color="#FFB800"
                      style={{ marginRight: 2 }}
                    />
                  ))}
                </View>
              </View>
            </View>
            <Text style={styles.testimonialText}>{testimonial.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  // CTA Section
  const renderCTA = () => (
    <View style={styles.ctaSection}>
      <Text style={styles.ctaTitle}>Ready to Elevate Your Style?</Text>
      <Text style={styles.ctaSubtitle}>Discover our exclusive collection designed for kings</Text>
      <Pressable 
        style={styles.ctaButton}
        onPress={() => router.push('/(tabs)/categories')}
      >
        <Text style={styles.ctaButtonText}>Shop Now</Text>
      </Pressable>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderHero()}
      {designs.length > 0 && renderNewArrivals()}
      {renderFeatured()}
      {renderFeaturedCategories()}
      {renderTestimonials()}
      {renderCTA()}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  // Hero Section
  heroSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  heroButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  // Section
  section: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: 12,
    color: '#AAAAAA',
    fontWeight: '500',
  },
  // New Arrivals
  horizontalScroll: {
    paddingRight: 16,
  },
  newArrivalCard: {
    width: 280,
    marginRight: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newArrivalImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1A1A',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newArrivalInfo: {
    padding: 12,
  },
  newArrivalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  newArrivalId: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  newArrivalDescription: {
    fontSize: 12,
    color: '#CCCCCC',
    marginBottom: 8,
    lineHeight: 16,
  },
  newArrivalPrice: {
    fontSize: 14,
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
  // Featured Categories (Slides)
  categorySlide: {
    width: 200,
    height: 150,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333333',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  categorySlideText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Testimonials
  testimonialCard: {
    width: 280,
    marginRight: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testimonialMeta: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  testimonialStars: {
    flexDirection: 'row',
  },
  testimonialText: {
    fontSize: 13,
    color: '#AAAAAA',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  // CTA Section
  ctaSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
  emptySection: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySectionText: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
  },
  imageDebugText: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    fontSize: 10,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  placeholderText: {
    fontSize: 12,
    color: '#AAAAAA',
    marginTop: 8,
  },
});

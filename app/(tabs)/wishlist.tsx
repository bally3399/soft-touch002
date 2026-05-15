import { useCartStore } from '@/store/cartStore';
import { useLanguageStore } from '@/store/languageStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice } from '@/utils/currency';
import { Ionicons } from '@expo/vector-icons';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function WishlistScreen() {
  const items = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const addToCart = useCartStore((state) => state.addToCart);
  const { country } = useLanguageStore();

  const handleAddToCart = (item: any) => {
    addToCart(item);
    removeFromWishlist(item.id);
    Alert.alert('Success', `${item.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeFromWishlist(id);
    Alert.alert('Removed', `${name} removed from wishlist`);
  };

  const renderWishlistItem = ({ item }: any) => (
    <View style={styles.wishlistCard}>
      {/* Image */}
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
      />

      {/* Info */}
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemId}>ID: {item.id}</Text>
        {item.price && (
          <Text style={styles.itemPrice}>{formatPrice(item.price, country)}</Text>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => handleAddToCart(item)}
        >
          <Ionicons name="cart" size={20} color="#FFFFFF" />
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.removeButton]}
          onPress={() => handleRemoveFromWishlist(item.id, item.name)}
        >
          <Ionicons name="trash" size={20} color="#FF6B6B" />
        </Pressable>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={64} color="#666666" />
      <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
      <Text style={styles.emptyText}>Add items to your wishlist to save them for later</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        renderEmpty()
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Wishlist</Text>
            <Text style={styles.itemCount}>{items.length} items</Text>
          </View>
          <FlatList
            data={items}
            renderItem={renderWishlistItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        </>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  itemCount: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  wishlistCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  itemImage: {
    width: 100,
    height: 120,
    backgroundColor: '#2A2A2A',
  },
  itemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  itemId: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  removeButton: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  emptyContainer: {
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

import { useCartStore } from '@/store/cartStore';
import { useLanguageStore } from '@/store/languageStore';
import { formatPrice } from '@/utils/currency';
import { Ionicons } from '@expo/vector-icons';
import { Alert, FlatList, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CartScreen() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotal = useCartStore((state) => state.getTotal);
  const { country } = useLanguageStore();

  const handleContactAdmin = async () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart first');
      return;
    }

    try {
      // Create order summary based on number of items
      let message = '';
      
      if (items.length === 1) {
        // Single item: show image URL and price
        const item = items[0];
        const itemPrice = formatPrice((item.price || 0) * item.quantity, country);
        message = `Hi, I'd like to order these designs:\n${item.image}\nPrice: ${itemPrice}`;
      } else {
        // Multiple items: show all images and total
        const imageUrls = items.map((item) => item.image).join('\n');
        const total = getTotal();
        const totalFormatted = formatPrice(total, country);
        message = `Hi, I'd like to order these designs:\n${imageUrls}\n\nTotal: ${totalFormatted}`;
      }
      
      // For Android, try multiple URL schemes
      const phoneNumber = '2348117977661';
      const encodedMessage = encodeURIComponent(message);
      
      // Different URL schemes to try
      const urlSchemes = [
        // Android: Try the standard whatsapp scheme first
        `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`,
        // Android: Try without phone parameter (some Android versions)
        `whatsapp://send?text=${encodedMessage}`,
        // Web fallback
        `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      ];
      
      let opened = false;
      
      // Try each URL scheme
      for (const url of urlSchemes) {
        try {
          const canOpen = await Linking.canOpenURL(url);
          if (canOpen) {
            await Linking.openURL(url);
            opened = true;
            break;
          }
        } catch (error) {
          // Continue to next URL scheme
          continue;
        }
      }
      
      if (opened) {
        Alert.alert('Success', 'Opening WhatsApp...');
      } else {
        Alert.alert('Error', 'WhatsApp is not installed on your device. Please install WhatsApp to place orders.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open WhatsApp');
    }
  };

  const renderCartItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
      />
      
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <View style={styles.itemTextInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemId}>ID: {item.id}</Text>
            {item.price && (
              <Text style={styles.itemPrice}>{formatPrice(item.price, country)}</Text>
            )}
          </View>
          <Pressable
            style={styles.removeButton}
            onPress={() => removeFromCart(item.id)}
          >
            <Ionicons name="trash" size={20} color="#FF6B6B" />
          </Pressable>
        </View>

        <View style={styles.itemFooter}>
          <View style={styles.quantityControl}>
            <Pressable
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Ionicons name="remove" size={16} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.quantity}>x{item.quantity}</Text>
            <Pressable
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Ionicons name="add" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={styles.itemTotal}>
            {formatPrice((item.price || 0) * item.quantity, country)}
          </Text>
        </View>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart" size={64} color="#666666" />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.emptySubtext}>Add some designs to get started</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>{formatPrice(getTotal(), country)}</Text>
        </View>

        <Pressable
          style={styles.contactButton}
          onPress={handleContactAdmin}
        >
          <Ionicons name="logo-whatsapp" size={20} color="#000000" />
          <Text style={styles.contactButtonText}>Send Order</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cartItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  itemImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#2A2A2A',
  },
  itemDetails: {
    padding: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemTextInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    fontSize: 16,
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
    fontWeight: '600',
    color: '#FFFFFF',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  quantity: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    minWidth: 35,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#AAAAAA',
    marginTop: 8,
  },
  footer: {
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#AAAAAA',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contactButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  contactButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    marginTop: 10,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

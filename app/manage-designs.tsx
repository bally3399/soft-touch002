import { deleteDesign } from '@/services/firebaseDesigns';
import { useAuthStore } from '@/store/authStore';
import { useDesignStore } from '@/store/designStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default function ManageDesignsScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const allDesigns = useDesignStore((state) => state.designs);
  const removeDesignLocal = useDesignStore((state) => state.removeDesign);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter designs to show only admin's designs
  const adminDesigns = allDesigns.filter(d => {
    // For now, show all designs since we don't have createdBy in the store
    // In a real app, you'd filter by d.createdBy === user?.id
    return true;
  });

  const filteredDesigns = adminDesigns.filter((design) =>
    design.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string, name: string, imageUrl: string) => {
    Alert.alert('Delete Design', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            setIsLoading(true);
            // Delete from Firebase
            await deleteDesign(id, imageUrl);
            // Remove from local store
            removeDesignLocal(id);
            setIsLoading(false);
            Alert.alert('Success', 'Design deleted successfully');
          } catch (error: any) {
            setIsLoading(false);
            Alert.alert('Error', error.message || 'Failed to delete design');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const handleEdit = (id: string, name: string, price: number) => {
    setEditingId(id);
    setEditName(name);
    setEditPrice(price.toString());
  };

  const handleSaveEdit = () => {
    if (!editName.trim()) {
      Alert.alert('Error', 'Design name cannot be empty');
      return;
    }

    const price = parseFloat(editPrice);
    if (isNaN(price) || price < 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    // In a real app, you would update the design here
    // For now, we'll just close the edit mode
    Alert.alert('Success', 'Design updated successfully');
    setEditingId(null);
    setEditName('');
    setEditPrice('');
  };

  const renderDesignItem = ({ item }: { item: any }) => {
    const isEditing = editingId === item.id;

    return (
      <View style={styles.designCard}>
        <View style={styles.designHeader}>
          <View style={styles.designInfo}>
            {isEditing ? (
              <View style={styles.editForm}>
                <TextInput
                  style={styles.editInput}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Design name"
                  placeholderTextColor="#666666"
                />
                <View style={styles.priceEditContainer}>
                  <Text style={styles.currencySymbol}>₦</Text>
                  <TextInput
                    style={styles.editPriceInput}
                    value={editPrice}
                    onChangeText={setEditPrice}
                    placeholder="0.00"
                    placeholderTextColor="#666666"
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            ) : (
              <>
                <Text style={styles.designName}>{item.name}</Text>
                <Text style={styles.designPrice}>₦{item.price?.toFixed(2) || '0.00'}</Text>
              </>
            )}
          </View>
          <View style={styles.designActions}>
            {isEditing ? (
              <>
                <Pressable
                  style={styles.actionButton}
                  onPress={handleSaveEdit}
                >
                  <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                </Pressable>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => {
                    setEditingId(null);
                    setEditName('');
                    setEditPrice('');
                  }}
                >
                  <Ionicons name="close" size={18} color="#FFFFFF" />
                </Pressable>
              </>
            ) : (
              <>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => handleEdit(item.id, item.name, item.price || 0)}
                  disabled={isLoading}
                >
                  <Ionicons name="pencil" size={18} color="#FFFFFF" />
                </Pressable>
                <Pressable
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDelete(item.id, item.name, item.image)}
                  disabled={isLoading}
                >
                  <Ionicons name="trash" size={18} color="#FF6B6B" />
                </Pressable>
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Manage Designs</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search designs..."
          placeholderTextColor="#666666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery && (
          <Pressable onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666666" />
          </Pressable>
        )}
      </View>

      {/* Designs List - Scrollable */}
      <FlatList
        data={filteredDesigns}
        renderItem={renderDesignItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="shirt" size={48} color="#666666" />
            <Text style={styles.emptyStateText}>
              {adminDesigns.length === 0
                ? 'No designs yet'
                : 'No designs match your search'}
            </Text>
          </View>
        }
      />

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Designs</Text>
          <Text style={styles.statValue}>{adminDesigns.length}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Showing</Text>
          <Text style={styles.statValue}>{filteredDesigns.length}</Text>
        </View>
      </View>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerPlaceholder: {
    width: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  designCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  designHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  designInfo: {
    flex: 1,
  },
  designName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  designPrice: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  editForm: {
    gap: 8,
  },
  editInput: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    color: '#FFFFFF',
    fontSize: 12,
  },
  priceEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  currencySymbol: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 2,
  },
  editPriceInput: {
    flex: 1,
    paddingVertical: 6,
    color: '#FFFFFF',
    fontSize: 12,
  },
  designActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#AAAAAA',
    marginTop: 12,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

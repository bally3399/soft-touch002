import { supabase } from '@/config/firebase';
import { Design } from '@/store/cartStore';

export interface FeaturedDesign extends Design {
  createdAt: number;
  updatedAt: number;
}

// Get all featured designs
export const getFeaturedDesigns = async (): Promise<FeaturedDesign[]> => {
  try {
    const { data, error } = await supabase
      .from('featured')
      .select('*');

    if (error) throw error;
    return (data || []) as FeaturedDesign[];
  } catch (error: any) {
    throw new Error(`Failed to fetch featured designs: ${error.message}`);
  }
};

// Add design to featured
export const addToFeatured = async (design: Design): Promise<FeaturedDesign> => {
  try {
    const now = Date.now();
    const featuredDesign = {
      id: design.id,
      name: design.name,
      price: design.price,
      image: design.image,
      category: design.category,
      description: design.description || '',
      createdat: now,
      updatedat: now,
    };

    const { data, error } = await supabase
      .from('featured')
      .insert([featuredDesign])
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to add to featured');

    return data as FeaturedDesign;
  } catch (error: any) {
    throw new Error(`Failed to add to featured: ${error.message}`);
  }
};

// Remove design from featured
export const removeFromFeatured = async (designId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('featured')
      .delete()
      .eq('id', designId);

    if (error) throw error;
  } catch (error: any) {
    throw new Error(`Failed to remove from featured: ${error.message}`);
  }
};

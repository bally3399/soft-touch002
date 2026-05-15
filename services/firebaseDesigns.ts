import { supabase } from '@/config/firebase';
import { Design } from '@/store/cartStore';

export interface FirebaseDesign extends Design {
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}

// Upload design image to Supabase Storage
export const uploadDesignImage = async (
  imageUri: string,
  designId: string
): Promise<string> => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    if (blob.size === 0) {
      throw new Error('Blob is empty - image file may be corrupted');
    }

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const timestamp = Date.now();
    const fileName = `${designId}/${timestamp}.jpg`;
    
    const supabaseUrl = 'https://yfbroftoijiqslvbmanz.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmYnJvZnRvaWppcXNsdmJtYW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NjAzOTgsImV4cCI6MjA5NDMzNjM5OH0.T5ZpEBYibICQyhTqFG-smOvHhWGSz1a6fQazBtrLRl4';
    
    const uploadUrl = `${supabaseUrl}/storage/v1/object/designs/${fileName}`;
    
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'image/jpeg',
      },
      body: bytes,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Upload failed with status ${uploadResponse.status}: ${errorText}`);
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/designs/${fileName}`;
    
    return publicUrl;
  } catch (error: any) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

// Add design to database
export const addDesign = async (
  design: Omit<FirebaseDesign, 'createdAt' | 'updatedAt'>,
  imageUri: string,
  userId: string
): Promise<FirebaseDesign> => {
  try {
    const imageUrl = await uploadDesignImage(imageUri, design.id);

    const designData = {
      id: design.id,
      name: design.name,
      price: design.price,
      image: imageUrl,
      category: design.category,
      description: design.description || '',
      createdby: userId,
    };

    const { error } = await supabase
      .from('designs')
      .insert([designData]);

    if (error) {
      throw error;
    }

    return {
      ...design,
      image: imageUrl,
      createdBy: userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  } catch (error: any) {
    throw new Error(`Failed to add design: ${error.message}`);
  }
};

// Get all designs
export const getAllDesigns = async (): Promise<FirebaseDesign[]> => {
  try {
    const { data, error } = await supabase
      .from('designs')
      .select('id, name, price, image, category, description, createdby');

    if (error) throw error;
    
    const result = (data || []).map(d => ({
      id: d.id,
      name: d.name,
      price: d.price,
      image: d.image,
      category: d.category,
      description: d.description,
      createdBy: d.createdby,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })) as FirebaseDesign[];
    
    return result;
  } catch (error: any) {
    throw new Error(`Failed to fetch designs: ${error.message}`);
  }
};

// Get designs by category
export const getDesignsByCategory = async (category: string): Promise<FirebaseDesign[]> => {
  try {
    const { data, error } = await supabase
      .from('designs')
      .select('id, name, price, image, category, description, createdby')
      .eq('category', category);

    if (error) throw error;
    
    return (data || []).map(d => ({
      id: d.id,
      name: d.name,
      price: d.price,
      image: d.image,
      category: d.category,
      description: d.description,
      createdBy: d.createdby,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })) as FirebaseDesign[];
  } catch (error: any) {
    throw new Error(`Failed to fetch designs: ${error.message}`);
  }
};

// Get designs by admin
export const getDesignsByAdmin = async (adminId: string): Promise<FirebaseDesign[]> => {
  try {
    const { data, error } = await supabase
      .from('designs')
      .select('id, name, price, image, category, description, createdby')
      .eq('createdby', adminId);

    if (error) throw error;
    
    return (data || []).map(d => ({
      id: d.id,
      name: d.name,
      price: d.price,
      image: d.image,
      category: d.category,
      description: d.description,
      createdBy: d.createdby,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })) as FirebaseDesign[];
  } catch (error: any) {
    throw new Error(`Failed to fetch designs: ${error.message}`);
  }
};

// Update design
export const updateDesign = async (
  designId: string,
  updates: Partial<FirebaseDesign>
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('designs')
      .update(updates)
      .eq('id', designId);

    if (error) throw error;
  } catch (error: any) {
    throw new Error(`Failed to update design: ${error.message}`);
  }
};

// Delete design
export const deleteDesign = async (designId: string, imageUrl: string): Promise<void> => {
  try {
    const urlParts = imageUrl.split('/');
    const filePath = urlParts.slice(-2).join('/');

    const { error: storageError } = await supabase.storage
      .from('designs')
      .remove([filePath]);

    if (storageError) {
      throw storageError;
    }

    const { error: dbError } = await supabase
      .from('designs')
      .delete()
      .eq('id', designId);

    if (dbError) {
      throw dbError;
    }
  } catch (error: any) {
    throw new Error(`Failed to delete design: ${error.message}`);
  }
};

// Regenerate signed URL for existing design (for designs uploaded with old public URL)
export const regenerateSignedUrl = async (imageUrl: string): Promise<string> => {
  try {
    const urlParts = imageUrl.split('/');
    const filePath = urlParts.slice(-2).join('/');

    const { data: signedData, error: signedError } = await supabase.storage
      .from('designs')
      .createSignedUrl(filePath, 31536000);

    if (signedError) {
      throw signedError;
    }

    const signedUrl = signedData.signedUrl;
    return signedUrl;
  } catch (error: any) {
    throw error;
  }
};

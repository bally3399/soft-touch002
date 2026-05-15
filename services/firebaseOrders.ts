import { supabase } from '@/config/firebase';
import { CartItem } from '@/store/cartStore';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  currency: string;
  status: 'pending' | 'completed' | 'cancelled';
  whatsappMessage: string;
  createdAt: number;
  updatedAt: number;
}

// Create order
export const createOrder = async (
  userId: string,
  items: CartItem[],
  total: number,
  currency: string,
  whatsappMessage: string
): Promise<Order> => {
  try {
    const order: Omit<Order, 'id'> = {
      userId,
      items,
      total,
      currency,
      status: 'pending',
      whatsappMessage,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create order');

    return data as Order;
  } catch (error: any) {
    throw new Error(`Failed to create order: ${error.message}`);
  }
};

// Get user orders
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return (data || []) as Order[];
  } catch (error: any) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

// Get all orders (admin)
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return (data || []) as Order[];
  } catch (error: any) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

// Update order status
export const updateOrderStatus = async (
  orderId: string,
  status: 'pending' | 'completed' | 'cancelled'
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({
        status,
        updatedAt: Date.now(),
      })
      .eq('id', orderId);

    if (error) throw error;
  } catch (error: any) {
    throw new Error(`Failed to update order: ${error.message}`);
  }
};

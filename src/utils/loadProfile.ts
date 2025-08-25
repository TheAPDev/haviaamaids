// @ts-ignore
import { supabase } from '../supabaseClient';

/**
 * Loads the profile for the currently logged-in user from the 'maids' table.
 * Returns the profile data or null if not found or on error.
 */
export async function loadProfile() {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('maids')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  } else {
    console.log('Profile loaded:', data);
    return data;
  }
}

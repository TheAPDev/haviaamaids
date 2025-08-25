// @ts-ignore
import { supabase } from '../supabaseClient';

/**
 * Update or insert maid profile in Supabase
 * @param user_id - The logged-in user's user_id (UUID)
 * @param profile - Profile fields to update/insert
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function updateProfile(
  user_id: string,
  profile: {
    full_name: string,
    phone: string,
    location: string,
    experience_years: number,
    skillset: string[] | string,
    username: string,
    password: string
  }
): Promise<{ success: boolean; message: string }> {
  try {
    // Do NOT send id, let Supabase/Postgres auto-generate it
    const { error } = await supabase
      .from('maids')
      .upsert({
        user_id,
        full_name: profile.full_name,
        phone: profile.phone,
        location: profile.location,
        experience_years: profile.experience_years,
        skillset: profile.skillset,
        username: profile.username,
        password: profile.password
      });
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Profile updated successfully.' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Unknown error' };
  }
}

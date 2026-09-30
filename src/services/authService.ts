import { supabase } from '../lib/supabase';
const client=()=>{if(!supabase) throw new Error('Supabase is not configured.'); return supabase;};
export const signIn=(email:string,password:string)=>client().auth.signInWithPassword({email,password});
export const signUp=(email:string,password:string,fullName:string)=>client().auth.signUp({email,password,options:{data:{full_name:fullName},emailRedirectTo:window.location.origin+'/login'}});
export const requestPasswordReset=(email:string)=>client().auth.resetPasswordForEmail(email,{redirectTo:window.location.origin+'/reset-password'});
export const updatePassword=(password:string)=>client().auth.updateUser({password});
export const signOut=()=>supabase?.auth.signOut();
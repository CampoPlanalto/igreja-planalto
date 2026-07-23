export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            churches: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    logo_url: string | null;
                    banner_url: string | null;
                    slogan: string | null;
                    primary_color: string;
                    secondary_color: string;
                    address: string | null;
                    phone: string | null;
                    email: string | null;
                    website: string | null;
                    social_links: Json | null;
                    settings: Json | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    slug: string;
                    logo_url?: string | null;
                    banner_url?: string | null;
                    slogan?: string | null;
                    primary_color?: string;
                    secondary_color?: string;
                    address?: string | null;
                    phone?: string | null;
                    email?: string | null;
                    website?: string | null;
                    social_links?: Json | null;
                    settings?: Json | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    slug?: string;
                    logo_url?: string | null;
                    banner_url?: string | null;
                    slogan?: string | null;
                    primary_color?: string;
                    secondary_color?: string;
                    address?: string | null;
                    phone?: string | null;
                    email?: string | null;
                    website?: string | null;
                    social_links?: Json | null;
                    settings?: Json | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    name: string | null;
                    avatar_url: string | null;
                    role: 'super_admin' | 'church_admin' | 'member';
                    church_id: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id: string;
                    email: string;
                    name?: string | null;
                    avatar_url?: string | null;
                    role?: 'super_admin' | 'church_admin' | 'member';
                    church_id?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    email?: string;
                    name?: string | null;
                    avatar_url?: string | null;
                    role?: 'super_admin' | 'church_admin' | 'member';
                    church_id?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            campaigns: {
                Row: {
                    id: string;
                    church_id: string;
                    title: string;
                    slug: string;
                    description: string | null;
                    banner_url: string | null;
                    start_date: string | null;
                    end_date: string | null;
                    is_active: boolean;
                    is_public: boolean;
                    qr_code_url: string | null;
                    settings: Json | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    church_id: string;
                    title: string;
                    slug: string;
                    description?: string | null;
                    banner_url?: string | null;
                    start_date?: string | null;
                    end_date?: string | null;
                    is_active?: boolean;
                    is_public?: boolean;
                    qr_code_url?: string | null;
                    settings?: Json | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    church_id?: string;
                    title?: string;
                    slug?: string;
                    description?: string | null;
                    banner_url?: string | null;
                    start_date?: string | null;
                    end_date?: string | null;
                    is_active?: boolean;
                    is_public?: boolean;
                    qr_code_url?: string | null;
                    settings?: Json | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            campaign_fields: {
                Row: {
                    id: string;
                    campaign_id: string;
                    label: string;
                    type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'phone' | 'email' | 'file';
                    required: boolean;
                    options: string[] | null;
                    placeholder: string | null;
                    order: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    campaign_id: string;
                    label: string;
                    type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'phone' | 'email' | 'file';
                    required?: boolean;
                    options?: string[] | null;
                    placeholder?: string | null;
                    order?: number;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    campaign_id?: string;
                    label?: string;
                    type?: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'phone' | 'email' | 'file';
                    required?: boolean;
                    options?: string[] | null;
                    placeholder?: string | null;
                    order?: number;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            responses: {
                Row: {
                    id: string;
                    campaign_id: string;
                    data: Json;
                    visitor_name: string | null;
                    visitor_phone: string | null;
                    visitor_email: string | null;
                    ip_address: string | null;
                    user_agent: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    campaign_id: string;
                    data: Json;
                    visitor_name?: string | null;
                    visitor_phone?: string | null;
                    visitor_email?: string | null;
                    ip_address?: string | null;
                    user_agent?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    campaign_id?: string;
                    data?: Json;
                    visitor_name?: string | null;
                    visitor_phone?: string | null;
                    visitor_email?: string | null;
                    ip_address?: string | null;
                    user_agent?: string | null;
                    created_at?: string;
                };
            };
            campaign_views: {
                Row: {
                    id: string;
                    campaign_id: string;
                    ip_address: string | null;
                    user_agent: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    campaign_id: string;
                    ip_address?: string | null;
                    user_agent?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    campaign_id?: string;
                    ip_address?: string | null;
                    user_agent?: string | null;
                    created_at?: string;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            increment_campaign_views: {
                Args: { campaign_uuid: string };
                Returns: void;
            };
            handle_new_user: {
                Args: Record<PropertyKey, never>;
                Returns: unknown;
            };
            update_updated_at_column: {
                Args: Record<PropertyKey, never>;
                Returns: unknown;
            };
        };
        Enums: {
            user_role: 'super_admin' | 'church_admin' | 'member';
            field_type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'phone' | 'email' | 'file';
        };
    };
}
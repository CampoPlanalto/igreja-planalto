-- Igreja Planalto - Database Schema
-- Run this in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Churches table (for multi-tenancy)
CREATE TABLE public.churches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    banner_url TEXT,
    slogan TEXT,
    primary_color TEXT DEFAULT '#0ea5e9',
    secondary_color TEXT DEFAULT '#0369a1',
    address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    settings JSONB DEFAULT '{
        "allow_registration": true,
        "require_approval": false,
        "notification_email": null
    }'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Users profile (extends Supabase Auth)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    church_id UUID REFERENCES public.churches(id) ON DELETE SET NULL,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('super_admin', 'church_admin', 'member')),
    name TEXT,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Campaigns table
CREATE TABLE public.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    church_id UUID NOT NULL REFERENCES public.churches(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    banner_url TEXT,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    is_public BOOLEAN DEFAULT true,
    qr_code_url TEXT,
    settings JSONB DEFAULT '{
        "show_visitor_count": false,
        "allow_anonymous": true,
        "require_phone": false,
        "require_email": false,
        "thank_you_message": "Obrigado por preencher!",
        "redirect_url": null
    }'::jsonb,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(church_id, slug)
);

-- 4. Campaign fields (dynamic form builder)
CREATE TABLE public.campaign_fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    field_type TEXT NOT NULL CHECK (field_type IN (
        'text', 'textarea', 'select', 'checkbox', 'radio', 
        'date', 'phone', 'email', 'number', 'file', 'hidden'
    )),
    required BOOLEAN DEFAULT false,
    options JSONB DEFAULT '[]'::jsonb, -- for select, checkbox, radio
    placeholder TEXT,
    help_text TEXT,
    field_order INTEGER DEFAULT 0,
    validation_rules JSONB DEFAULT '{}'::jsonb,
    conditional_logic JSONB DEFAULT '{}'::jsonb, -- show/hide based on other fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Form responses
CREATE TABLE public.responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    visitor_name TEXT,
    visitor_phone TEXT,
    visitor_email TEXT,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Campaign views/analytics
CREATE TABLE public.campaign_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_campaigns_church_id ON public.campaigns(church_id);
CREATE INDEX idx_campaigns_slug ON public.campaigns(slug);
CREATE INDEX idx_campaigns_is_active ON public.campaigns(is_active);
CREATE INDEX idx_campaign_fields_campaign_id ON public.campaign_fields(campaign_id);
CREATE INDEX idx_responses_campaign_id ON public.responses(campaign_id);
CREATE INDEX idx_responses_created_at ON public.responses(created_at DESC);
CREATE INDEX idx_campaign_views_campaign_id ON public.campaign_views(campaign_id);
CREATE INDEX idx_campaign_views_created_at ON public.campaign_views(created_at DESC);
CREATE INDEX idx_profiles_church_id ON public.profiles(church_id);

-- Enable Row Level Security
ALTER TABLE public.churches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Churches: Admins can manage their church, super_admin can manage all
CREATE POLICY "churches_select_own" ON public.churches
    FOR SELECT USING (
        id IN (SELECT church_id FROM public.profiles WHERE id = auth.uid())
        OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
    );

CREATE POLICY "churches_insert_admin" ON public.churches
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
    );

CREATE POLICY "churches_update_admin" ON public.churches
    FOR UPDATE USING (
        id IN (SELECT church_id FROM public.profiles WHERE id = auth.uid() AND role IN ('church_admin', 'super_admin'))
    );

-- Profiles: Users can read/update their own profile
CREATE POLICY "profiles_select_own" ON public.profiles
    FOR SELECT USING (id = auth.uid() OR church_id IN (SELECT church_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "profiles_update_own" ON public.profiles
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "profiles_insert_own" ON public.profiles
    FOR INSERT WITH CHECK (id = auth.uid());

-- Campaigns: Church admins can manage campaigns in their church
CREATE POLICY "campaigns_select_church" ON public.campaigns
    FOR SELECT USING (
        church_id IN (SELECT church_id FROM public.profiles WHERE id = auth.uid())
        OR is_public = true
    );

CREATE POLICY "campaigns_insert_admin" ON public.campaigns
    FOR INSERT WITH CHECK (
        church_id IN (SELECT church_id FROM public.profiles WHERE id = auth.uid() AND role IN ('church_admin', 'super_admin'))
    );

CREATE POLICY "campaigns_update_admin" ON public.campaigns
    FOR UPDATE USING (
        church_id IN (SELECT church_id FROM public.profiles WHERE id = auth.uid() AND role IN ('church_admin', 'super_admin'))
    );

CREATE POLICY "campaigns_delete_admin" ON public.campaigns
    FOR DELETE USING (
        church_id IN (SELECT church_id FROM public.profiles WHERE id = auth.uid() AND role IN ('church_admin', 'super_admin'))
    );

-- Campaign Fields: Same as campaigns
CREATE POLICY "campaign_fields_select_church" ON public.campaign_fields
    FOR SELECT USING (
        campaign_id IN (SELECT id FROM public.campaigns WHERE church_id IN (SELECT church_id FROM public.profiles WHERE id = auth.uid()))
        OR campaign_id IN (SELECT id FROM public.campaigns WHERE is_public = true)
    );

CREATE POLICY "campaign_fields_manage_admin" ON public.campaign_fields
    FOR ALL USING (
        campaign_id IN (SELECT id FROM public.campaigns WHERE church_id IN (SELECT church_id FROM public.profiles WHERE id = auth.uid() AND role IN ('church_admin', 'super_admin')))
    );

-- Responses: Church admins can view responses, public can insert
CREATE POLICY "responses_select_admin" ON public.responses
    FOR SELECT USING (
        campaign_id IN (SELECT id FROM public.campaigns WHERE church_id IN (SELECT church_id FROM public.profiles WHERE id = auth.uid() AND role IN ('church_admin', 'super_admin')))
    );

CREATE POLICY "responses_insert_public" ON public.responses
    FOR INSERT WITH CHECK (
        campaign_id IN (SELECT id FROM public.campaigns WHERE is_public = true AND is_active = true)
    );

-- Campaign Views: Public insert, admin select
CREATE POLICY "campaign_views_insert_public" ON public.campaign_views
    FOR INSERT WITH CHECK (
        campaign_id IN (SELECT id FROM public.campaigns WHERE is_public = true AND is_active = true)
    );

CREATE POLICY "campaign_views_select_admin" ON public.campaign_views
    FOR SELECT USING (
        campaign_id IN (SELECT id FROM public.campaigns WHERE church_id IN (SELECT church_id FROM public.profiles WHERE id = auth.uid() AND role IN ('church_admin', 'super_admin')))
    );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_churches_updated_at BEFORE UPDATE ON public.churches
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaign_fields_updated_at BEFORE UPDATE ON public.campaign_fields
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name', 'member');
    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to increment campaign views atomically
CREATE OR REPLACE FUNCTION public.increment_campaign_views(campaign_uuid UUID)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.campaign_views (campaign_id)
    VALUES (campaign_uuid);
EXCEPTION WHEN OTHERS THEN
    -- Ignore errors for analytics
    NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.churches TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.campaigns TO authenticated;
GRANT ALL ON public.campaign_fields TO authenticated;
GRANT ALL ON public.responses TO authenticated;
GRANT ALL ON public.campaign_views TO authenticated;

-- Seed data for testing
INSERT INTO public.churches (name, slug, slogan, primary_color, secondary_color, email)
VALUES (
    'Igreja Campo do Planalto',
    'campo-do-planalto',
    'Vila Planalto',
    '#0ea5e9',
    '#0369a1',
    'contato@campodoplanalto.org'
) ON CONFLICT (slug) DO NOTHING;
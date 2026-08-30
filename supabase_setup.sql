-- Gyan Mandir Yoga Center - Supabase Database Schema Setup Script
-- Paste this script inside Supabase SQL Editor and click "Run" to create all tables.

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  "passwordHash" TEXT NOT NULL,
  role TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default admin account (User: admin / Pass: password)
INSERT INTO admins (id, username, "passwordHash", role)
VALUES ('admin-1', 'admin', 'password', 'Super Admin')
ON CONFLICT (username) DO NOTHING;

-- 2. Classes Table
CREATE TABLE IF NOT EXISTS classes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  image TEXT,
  description TEXT,
  duration TEXT,
  difficulty TEXT,
  schedule TEXT,
  instructor TEXT,
  benefits JSONB DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT true
);

-- 3. Schedule Table
CREATE TABLE IF NOT EXISTS schedule (
  id TEXT PRIMARY KEY,
  time TEXT NOT NULL,
  monday TEXT DEFAULT 'Rest',
  tuesday TEXT DEFAULT 'Rest',
  wednesday TEXT DEFAULT 'Rest',
  thursday TEXT DEFAULT 'Rest',
  friday TEXT DEFAULT 'Rest',
  saturday TEXT DEFAULT 'Rest',
  sunday TEXT DEFAULT 'Rest'
);

-- 4. Instructors Table
CREATE TABLE IF NOT EXISTS instructors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  credentials TEXT,
  bio TEXT,
  image TEXT
);

-- 5. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id BIGINT PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT,
  image TEXT,
  published BOOLEAN DEFAULT true
);

-- 6. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  rating INTEGER DEFAULT 5,
  review TEXT,
  approved BOOLEAN DEFAULT true
);

-- 7. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT,
  date TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT false,
  starred BOOLEAN DEFAULT false,
  archived BOOLEAN DEFAULT false
);

-- 8. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

-- 9. Media Library Table
CREATE TABLE IF NOT EXISTS media_library (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL
);

-- 10. Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  details TEXT,
  admin TEXT,
  date TIMESTAMPTZ DEFAULT NOW()
);

-- Disable Row Level Security (RLS) on all tables for easy client-side API access
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;
ALTER TABLE classes DISABLE ROW LEVEL SECURITY;
ALTER TABLE schedule DISABLE ROW LEVEL SECURITY;
ALTER TABLE instructors DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE media_library DISABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs DISABLE ROW LEVEL SECURITY;

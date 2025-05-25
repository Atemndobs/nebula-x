---
title: Quick Start
description: Get started with Nebula Logix in minutes
---

# Quick Start Guide

This guide will help you set up and run the Nebula Logix application locally.

## Prerequisites

- Node.js 16.x or later
- npm 8.x or later
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Atemndobs/nebula-x.git
   cd nebula-x
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in your browser**
   The application will be available at `http://localhost:5173`

## Next Steps

- [Learn about authentication](/guides/authentication)
- [Understand the routing system](/guides/routing)
- [Explore the API reference](/api-reference)

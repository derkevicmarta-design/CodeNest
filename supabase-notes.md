# Supabase optional backend

Supabase is planned as an optional backend for CodeNest.

## Possible tables

### users
- id
- username
- password
- role

### projects
- id
- name
- description
- category
- author
- likes
- html
- css
- js

### contact_requests
- id
- name
- email
- message
- status
- created_at

## Current demo version

In the current demo version, data is stored in localStorage.
This allows the project to work without a server and be deployed on GitHub Pages.

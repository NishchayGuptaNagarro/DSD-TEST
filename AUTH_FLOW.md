# Authentication Flow Analysis - DSD-TEST

## Overview

This document analyzes the front-end authentication flow in the DSD-TEST React application, identifies the root cause of Issue #1 (all user personas defaulting to warehouse admin role), and provides recommendations.

---

## Authentication Architecture

### Files Involved

| File | Role |
|------|------|
| src/screens/Login/Login.tsx | Login form, API call, JWT decode, token storage |
| src/api/api.ts | Axios instance with auth interceptor |
| src/api/config.ts | Base URL, exception URLs, header endpoints |
| src/utilities/isTokenValid.ts | Token expiry check |
| src/component/ProtectedRoute/ProtectedRoute.tsx | Route guard, redirects unauthenticated users |
| src/component/SidebarNew/SidebarData.tsx | Static sidebar navigation items (hardcoded) |
| src/component/SidebarNew/Sidebar.tsx | Sidebar rendering (no role filtering) |
| src/App.tsx | Route definitions |
| src/screens/Home/Home.tsx | Home screen with hardcoded Welcome Admin greeting |
| src/utilities/enums.ts | Driver role enums (VAN-SELLER, DELIVERY, HYBRID) |
| src/utilities/getInitialDriverType.ts | Driver type selection helper |

---

## How Authentication Works (Current Flow)

### 1. Login (Login.tsx)

User enters userId + password, then POST /accounts/login with credentials.
Response contains access_token and refresh_token. The access_token is stored
in localStorage and decoded via jwtDecode(). The decoded user object is stored
as JSON in localStorage under key user. Navigator redirects to /home.

### 2. Token Validation (isTokenValid.ts)

Reads the user object from localStorage, parses it, and checks the exp claim:
Date.now() < userToken.exp * 1000. Returns true if the token is not expired.

### 3. Route Protection (ProtectedRoute.tsx)

Checks localStorage.getItem(user) and calls isTokenValid(). If invalid or
missing, clears localStorage and navigates to / (login). If valid, renders children.

### 4. API Authentication (api.ts)

Axios request interceptor attaches Authorization: Bearer token header.
Also adds idempotency keys for mutation requests, correlation IDs, language
codes, and timezone headers.

---

## Root Cause: Why All Personas Default to Warehouse Admin

### Finding 1: No Role Stored or Checked in Frontend

The JWT token is decoded via jwtDecode() and stored as-is in localStorage.
However, the decoded JWT payload is never inspected for a role claim. There is
no code anywhere in the frontend that reads a role, business_role_id, user_type,
or similar field from the JWT. The ProtectedRoute component only checks token
validity (expiry), not the user role. There is no role-based routing or
role-based UI filtering anywhere in the application.

### Finding 2: Home Screen Hardcodes Welcome Admin

In src/screens/Home/Home.tsx, the CardStack component uses a hardcoded admin
greeting. The translation key home.welcomeAdmin always displays an admin greeting
regardless of the logged-in user role. Every user sees Welcome Admin because
the UI is hardcoded for the warehouse admin persona.

### Finding 3: Sidebar Shows Same Navigation for All Roles

In src/component/SidebarNew/SidebarData.tsx, the navigation items are a static
array with Home, Stock Check-Out, Stock Check-In, and History. There is no
role-based filtering. All four navigation items are shown to every user
regardless of their persona (Warehouse Admin, VanSeller, Delivery).

### Finding 4: Driver Type Selection Is Independent of Logged-In User

The getInitialDriverType() utility reads from sessionStorage and defaults to
VAN-SELLER. This is used for stock checkout operations (which driver is being
loaded), NOT the role of the logged-in user. This is a different concept from
the user authentication role.

### Finding 5: Routes Are Not Role-Gated

In App.tsx, all protected routes use the same ProtectedRoute wrapper which only
checks if the user is authenticated (token valid), not if they have the correct
role. A VanSeller or Delivery user can access every screen that a Warehouse
Admin can access.

---

## Summary of the Bug

The frontend has no concept of user roles. The JWT token likely contains role
information in its payload (e.g., role, business_role_id, user_type), but the
frontend code:

1. Never extracts a role from the decoded JWT
2. Never stores the role separately
3. Never checks the role for access control
4. Hardcodes admin-centric UI text (Welcome Admin)
5. Shows the same sidebar navigation to all users
6. Uses the same ProtectedRoute (authentication-only) for all routes

As a result, all three personas (Warehouse Admin, VanSeller, Delivery) see the
exact same interface and are treated identically, appearing to all be warehouse
admins.

---

## Recommendations

### Priority 1: Extract and Store Role from JWT

In Login.tsx, after decoding the JWT, extract the role and store it separately
in localStorage for easy access by other components.

### Priority 2: Create Role-Aware Route Guard

Enhance ProtectedRoute to accept allowed roles. If allowedRoles is provided
and the user role is not in the list, redirect to an appropriate page or show
a 403 unauthorized message.

### Priority 3: Filter Sidebar by Role

Modify SidebarData or the Sidebar component to accept the user role and
conditionally render navigation items based on role permissions.

### Priority 4: Update Home Screen Greeting

Replace the hardcoded Welcome Admin with a role-aware greeting that uses the
extracted user role to display the appropriate label.

### Priority 5: Define Role Constants

Create a centralized role/permission model (e.g., src/models/roles.ts) mapping
roles to allowed routes and features.

---

## Testing Notes

- Verify the JWT payload actually contains a role field by inspecting
  jwtDecode(token) output
- After fixes, verify each persona sees only their permitted screens and
  correct greeting
- Verify that navigating to unauthorized routes redirects appropriately
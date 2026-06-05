# Authentication Flow Analysis

## Issue
All three user personas (Warehouse Admin, VanSeller, Delivery) incorrectly default to the warehouse admin role when logging in.

## Authentication Architecture

### Login Flow (src/screens/Login/Login.tsx)
1. User submits `email_or_username` + `password` to `POST accounts/login`
2. Backend returns `{ access_token, refresh_token }`
3. Frontend stores both tokens in `localStorage`
4. Frontend decodes the JWT via `jwtDecode` and stores the full decoded payload as `user` in `localStorage`
5. User is redirected to `/home`

### Token Validation (src/utilities/isTokenValid.ts)
- Only checks JWT `exp` claim (expiration time)
- Does NOT inspect any role, permission, or identity claims

### Protected Routes (src/component/ProtectedRoute/ProtectedRoute.tsx)
- Guards routes by checking `isTokenValid()`
- No role-based access control - any authenticated user can access every route

---

## Root Causes

### 1. Backend Does Not Return Role Information
**File:** `src/screens/Login/propTypes/types.ts`

The `LoginApiResponse` type only declares `access_token` and `refresh_token`:

```ts
export interface LoginApiResponse {
  status_code: number;
  msg: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}
```

No `role`, `business_role_id`, or `user_type` field exists in the login response.

### 2. Frontend Never Reads Role from JWT
**File:** `src/screens/Login/Login.tsx`

After decoding the token, the full payload is saved but no role field is extracted or stored separately:

```ts
const user = jwtDecode(responseData.data.access_token);
localStorage.setItem('user', JSON.stringify(user));
```

No code anywhere reads `user.role`, `user.business_role_id`, or any similar claim.

### 3. Home Screen Hardcodes Warehouse Admin UI
**File:** `src/screens/Home/Home.tsx`

The welcome card always displays the warehouse admin greeting:

```ts
const adminMainInfo = `${t('home.welcomeAdmin')} ${user.username?.split(' ')[0] || ''}!`;
```

There is no conditional rendering based on role. Every user sees the same admin-branded home screen.

### 4. Sidebar Shows All Navigation Items to All Users
**Files:** `src/component/SidebarNew/SidebarData.tsx`, `src/component/SidebarNew/Sidebar.tsx`

The sidebar items (Home, Stock Check Out, Stock Check In, History) are hardcoded in `SidebarData` and rendered unconditionally for every authenticated user. No role filtering is applied.

### 5. Driver Type Toggle Is Not the Users Role
**Files:** `src/utilities/getInitialDriverType.ts`, `src/component/DriverSelectionGrid/DriverSelectionGrid.tsx`

The VAN-SELLER / DELIVERY / HYBRID toggle in the Stock Check Out and Stock Check In screens is a **warehouse admin action** - it selects which driver type the admin is currently managing. It defaults to VAN-SELLER via `getInitialDriverType()`. This is NOT the logged-in users role; it is the role of the driver being assigned stock.

### 6. No Role-Based Route Guards
**File:** `src/App.tsx`

All protected routes use the same `<ProtectedRoute>` wrapper, which only checks token validity. A VanSeller or Delivery driver sees and can navigate to every admin screen (Stock Check Out, Stock Check In, History).

---

## Summary of Gaps

| Layer | What Exists | What Is Missing |
|---|---|---|
| **Backend API** | Returns JWT + refresh token | Role claim in JWT or separate role field in response |
| **JWT Decoding** | Decodes and stores full token payload | No extraction of role/permissions from claims |
| **Route Protection** | Token expiry check | Role-based access control per route |
| **Home Screen** | Admin greeting hardcoded | Conditional UI based on user role |
| **Sidebar** | Fixed navigation list | Role-based menu filtering |
| **Stock Check Out/In** | Driver type toggle (admin context) | Separation of admin vs. driver personas |

---

## Recommended Fixes

1. **Backend**: Include a `role` or `business_role_id` claim in the JWT token (or return it in the login response).

2. **Login flow** (`Login.tsx`): Extract the role from the decoded JWT and store it in localStorage:

```ts
const user = jwtDecode(responseData.data.access_token);
localStorage.setItem('user', JSON.stringify(user));
localStorage.setItem('user_role', user.role || user.business_role_id);
```

3. **ProtectedRoute**: Add role-based route guards so each persona only accesses its allowed routes.

4. **Home screen**: Conditionally render UI based on `user_role`:
   - Warehouse Admin: show admin greeting + full navigation cards
   - VanSeller: show driver-specific greeting + My Orders navigation
   - Delivery: show driver-specific greeting + delivery-specific navigation

5. **Sidebar**: Filter `SidebarData` based on the users role before rendering.

6. **Sign-out flow**: Ensure `user_role` is cleared from localStorage on logout.

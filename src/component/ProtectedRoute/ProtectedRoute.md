## Overview
This is a container component, we should wrap whatever screen we need authorized access inside this.
It checks for jwt token and then checks if its valid, if checks fail it redirects back to login.

### Inclusion

```
import ProtectedRoute from '/component/ProtectedRoute/ProtectedRoute.tsx';
 
                    <ProtectedRoute>
                      <Screen />
                    </ProtectedRoute>
```

### Use Case Description
1. Used to protect routes from unauthorized access


## Overview

The `PageDetails` component is designed to display a heading and subheading used within the header of a dashboard screens. It provides a flexible and reusable structure for displaying key information at the top of the screen.

### Inclusion

```typescript
import PageDetails from 'component/PageDetails/PageDetails.tsx';

<PageDetails heading="Heading of the screen" subHeading="SubHeading of the screen" />
```

### Use Case Description

1. Used as children component to pass on to header to show details of the screen.

#### Input Props:

1. heading: string -> Holds the heading to be displayed on header
2. subHeading: string -> Holds the subHeading to be displayed on header

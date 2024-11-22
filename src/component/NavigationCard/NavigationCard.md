## Overview

The `NavigationCard` component is designed to display navigation link through cards on required screens. It provides a flexible and reusable structure for displaying cards that navigate to other screens.

### Inclusion

```
import NavigationCard from 'component/NavigationCard/NavigationCard.tsx';

<NavigationCard item={item} />
```

### Use Case Description

1. Used to display a reusable navigation card to jump to other screen.

#### Input Props:

1. item: SidebarOption -> To accept an item of type SidebarOption which holds the data to be displayed on the card and also the path to which card must navigate.

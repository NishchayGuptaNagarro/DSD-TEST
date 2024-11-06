## Overview

The `Header` component is designed to display a header over required screens. It provides a flexible and reusable structure for displaying screen heading, language selector and logout selector at the top of the screen.

### Inclusion

```
import AppHeader from 'component/Header/Header.tsx';

<Header>
    <PageDetails heading={heading} subHeading={subHeading} />
</Header>
```

### Use Case Description

1. Used to display header at the top of each screen along with the left children component passed as prop.

#### Input Props:

1. children: ReactNode -> To accept react component to display it on left part of header.

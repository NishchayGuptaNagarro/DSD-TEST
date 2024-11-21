# Overview

A UI component that generates a card.

### Inclusion

```
import DetailsCard from '/component/DetailsCard/DetailsCard.tsx';

   <DetailsCard
        iconBackground={styles.bgTranslucentWhite}
        icon={PersonBlue}
        cardBackground={styles.bgMidnightBlueGray}
        mainInfo={adminMainInfo}
        mainInfoColor={styles.whitePure}
        secondaryInfo={t('home.adminSecondaryHeading')}
        secondaryInfoColor={styles.whitePure}
      />
```

### Use Case Description

1. Can be used to display a card component in UI.

### Component Designs

#### Input Props

1. heading: string -> Heading we want to give our card
2. icon: string -> Path to icon we want in our card heading
3. mainInfo: string -> This is main detail is displayed larger.
4. secondaryInfo: string -> This is secondary detail, is smaller


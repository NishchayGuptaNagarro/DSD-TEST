# Overview
This component displays a dropdown button that contains various actions that we pass as props.

### Inclusion

```
import DropDownButton from '/components/DropDownButton/DropDownButton.tsx';
 
<DropDownButton options={actions} handleClick={handleAction} />
```

### Use Case Description
1. We can use it to create a dropdown button anywhere in application.

### Component Designs

#### Input Props

1. options:string[]-> String array of different options that we display.
2. handleClick:(selectedIndex: number) => void -> function to be called when an option is clicked, we will get selected index argument in this, which we can use to map our action to particular option.


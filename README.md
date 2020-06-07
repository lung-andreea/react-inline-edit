# react-inline-edit
An accessible and easy inline text edit component for ReactJS.

> Supports React 16.3.0 or newer

## Running locally

You can clone this repository on your local environment by running

```bash
git clone https://github.com/lung-andreea/react-inline-edit.git
```

To test the code locally run the following commands into the project root folder:
```bash
yarn install
yarn start
```
App runs locally into the Browser on port 3000

## Demo

CodeSandbox code for demo here:
https://codesandbox.io/embed/async-rgb-u1qbj?fontsize=14&hidenavigation=1&theme=dark
   
## Usage
There are two usages for our component. You can either use it as:

#### Text Input

```js
import React from 'react';
import InlineEditTextInput from "./components/InlineEditTextInput";

export default () => (
  <InlineEditTextInput
      initialValue="Initial text input"
      name="inlineEditPlaceholder"
      maxLength={50}
      editLabel="Click here to edit description"
      addLabel="Click here to add description"
      onChange={() => console.log("Input value changed")}
      onConfirm={() => console.log("Confirm button clicked")}
      onCancel={() => console.log("Cancel button clicked")}
  />
);
```
or:
#### Text Area

```js
import React from 'react';
import InlineEditTextArea from "./components/InlineEditTextArea";

export default () => (
  <InlineEditTextArea
      initialValue=""
      name="inlineEditPlaceholder"
      maxLength={2000}
      editLabel="Click here to edit description"
      addLabel="Click here to add description"
      onChange={() => console.log("Input value changed")}
      onConfirm={() => console.log("Confirm button clicked")}
      onCancel={() => console.log("Cancel button clicked")}
  />
);
```

## Documentation

The project has been created with create-react-app.

It provides two variations of the InlineEdit component that can be used according to different needs.

It is written in the new ES6 standard and uses the React Hooks api.
For styling purposes, we use SASS.


## Components

The main functionality components reside in the folder `components`. 
Other types of helper components are found in the `utils` directory.

### &lt;InlineEdit /&gt;

This is the main component of our app and holds all the core functionality like the
`edit`, `confirm`, `cancel` etc. bahaviour. 

We can view it as a helper component
to help us with organizing some common functionality that we can later reuse in 
the `<InlineEditTextInput />` and `<InlineEditTextArea />` respectively.

Notice how we use the children prop as a function in render. That gives us more flexibility
and is a useful pattern if we strive for reusability.

If you specify additional props on the `<InlineEdit />` component they will be forwarded to the rendered html input element.

#### className: `string`

Provide a custom class name for the outer container of the input element.

#### sidebar: `object`

An additional `html` element or node that will be displayed `inline-block` with the
text input value. 

> When the text input is in edit mode, the sidebar will be hidden.

#### initialValue: `string`

> default: `null`

The initial value of the text input element.

> If no initial value is provided, a placeholder text will be shown instead.

#### isDisabled: `boolean`

> default: `false`

Prop to determine if the text input is disabled or not.

#### onConfirm: `function`

> default: `undefined`

Register a confirm callback for the success flow of events in the case the user clicks the confirm button.

> It receives no arguments.

#### onCancel: `function`

> default: `undefined`

Register a cancel callback for the unsuccessful flow of events in the case the user clicks the cancel button.

> It receives no arguments.

#### editLabel: `string`

> default: `null`

User defined value for the edit label text.

> This will show only if there is an actual text value.

#### editLabel: `string`

> default: `null`

User defined value for the edit label text.

> This will show only if there is an actual text value.

#### addLabel: `string`

> default: `null`

User defined text value to show in case an `initialValue` is not provided.

> This will show up in a lighter color than the actual text value we display
to suggest that it is a placeholder.

#### maxLength: `number`

> default: `Infinity`

Character limit for the input value.

> No input that exceeds `maxLength` will be saved to state.

### &lt;InlineEditTextInput /&gt;

The same as above.

### &lt;InlineEditTextArea /&gt;

All of the specified `InlineEdit` props above, with the addition of `enableScroll`.

#### enableScroll: `boolean`

Specifies whether to use the `Scrollable` component for values that go outside the initial
space limit.

> A false values for this props means we will use `React.Fragment` instead of a `Scrollable`. 

## Utils

### &lt;Button /&gt;

>className: `string`

>onClick: `function`
      
>disabled: `boolean`

>label: `node`

>title: `string`

>children: `node`

>primary: `boolean`

>secondary: `boolean`

>isLarge: `boolean`

### &lt;Link /&gt;

>className: `string`

>disabled: `boolean`

>secondary: `boolean`

>light: `boolean`

>onClick: `function`

>children: `node`

### &lt;Tooltip /&gt;

>children: `element.isRequired`

>title: `node`
    
>placement: ```
`oneOf([
    'top-start',
    'top',
    'top-end',
    'left-start',
    'left',
    'left-end',
    'bottom-start',
    'bottom',
    'bottom-end',
    'right-start',
    'right',
    'right-end'
])```

### &lt;TextInput /&gt;

>initialValue: `string`
     
>onChange: `function`

>onKeyUp: `function`

>onBlur: `function`

>onEnterPressed: `function`

>parseValue: `function`

>className: `string`

>isLarge: `boolean`

>isDisabled: `boolean`

### &lt;AutoresizeInput /&gt;

>className: `string`

>onChange: `function`

>initialValue: `string`

>isDisabled: `boolean`

### &lt;ClickOutside /&gt;

>clickEventName: `oneOf(['click', 'mousedown', 'mouseup'])`

>onClick: `function.isRequired`

>children: `element.isRequired`

### &lt;Scrollable /&gt;

>enableYAxis: `boolean`

>enableXAxis: `boolean`

>registerScroll: `boolean`

>propagateScrollToParent: `boolean`

>children: `node`

>onScrollBottom: `function`

## Styling

We use SASS for styling. The required styling rules can be found in the `styles/_global.scss` file.

### Linting

We use eslint for linting rules. See `.eslintrc`

## Dependecies

<ul>
<li>eslint</li>
<li>prettier</li>
<li>@popperjs/core</li>
<li>classnames</li>
<li>font-awesome</li>
<li>node-sass</li>
<li>perfect-scrollbar</li>
</ul>
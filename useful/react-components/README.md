# React Components Library

This directory contains a collection of reusable React components for web development projects. These components are designed to be simple, customizable, and accessible.

## Components Included

### Layout Components

- **Header** - Responsive navigation header with mobile menu toggle
- **Footer** - Responsive footer with sections for links, contact info, and social media

### UI Components

- **Card** - Versatile card component for displaying content in a contained box
- **Button** - Customizable button component with various styles and sizes
- **Modal** - Accessible modal dialog component

### Form Components

- **Form** - Form container component
- **TextInput** - Text input field with label and validation
- **TextArea** - Multi-line text input with label and validation
- **Select** - Dropdown select component with label and validation
- **Checkbox** - Checkbox input with label
- **RadioGroup** - Group of radio buttons with label

## Usage

Import the components you need:

```jsx
import {
  Header,
  Card,
  Button,
  Form,
  TextInput,
} from "../useful/react-components";
```

### Header Example

```jsx
<Header
  title="My Website"
  links={[
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" },
  ]}
  logo="/images/logo.png"
  sticky={true}
  onThemeToggle={() => toggleTheme()}
/>
```

### Card Example

```jsx
<Card
  title="Card Title"
  subtitle="Optional subtitle"
  image="/images/card-image.jpg"
  imageAlt="Description of image"
  content="This is the main content of the card."
  actions={
    <>
      <Button variant="outlined">Cancel</Button>
      <Button variant="primary">Submit</Button>
    </>
  }
  variant="elevated" // 'default', 'outlined', or 'elevated'
  onClick={() => console.log("Card clicked")}
/>
```

### Button Example

```jsx
<Button
  variant="primary" // 'primary', 'secondary', 'outlined', 'text'
  size="medium" // 'small', 'medium', 'large'
  onClick={() => console.log("Button clicked")}
  disabled={false}
  loading={isLoading}
  leftIcon={<span>👍</span>}
  fullWidth={false}
>
  Click Me
</Button>
```

### Form Elements Example

```jsx
<Form onSubmit={handleSubmit}>
  <TextInput
    label="Username"
    id="username"
    name="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
    error={errors.username}
    helperText="Enter your username"
  />

  <TextArea
    label="Description"
    id="description"
    name="description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows={4}
  />

  <Select
    label="Country"
    id="country"
    name="country"
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    options={[
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "uk", label: "United Kingdom" },
    ]}
    placeholder="Select your country"
  />

  <Checkbox
    label="I agree to the terms and conditions"
    id="terms"
    name="terms"
    checked={termsChecked}
    onChange={(e) => setTermsChecked(e.target.checked)}
    required
  />

  <RadioGroup
    label="Subscription Plan"
    name="plan"
    value={plan}
    onChange={(e) => setPlan(e.target.value)}
    options={[
      { value: "free", label: "Free Plan" },
      { value: "pro", label: "Pro Plan" },
      { value: "premium", label: "Premium Plan" },
    ]}
  />

  <Button type="submit" variant="primary">
    Submit
  </Button>
</Form>
```

### Modal Example

```jsx
const [isModalOpen, setIsModalOpen] = useState(false);

// In your component:
<>
  <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

  <Modal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    title="Modal Title"
    size="medium" // 'small', 'medium', 'large', 'full'
    footer={
      <>
        <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </>
    }
  >
    <p>This is the modal content.</p>
  </Modal>
</>;
```

## CSS Variables

These components use CSS variables for styling, allowing for easy theming. You can override these variables in your root CSS:

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --accent-color: #28a745;
  --text-color: #333;
  --border-color: #dee2e6;
  --error-color: #dc3545;
  --primary-bg: #ffffff;
  --footer-bg: #f8f9fa;
  --footer-text: #333;
  --card-bg: #ffffff;
  --modal-bg: #ffffff;
  --input-bg: #ffffff;
  --placeholder-color: #6c757d;
  --focus-color: rgba(0, 123, 255, 0.25);
}
```

## Accessibility

These components are built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Color contrast considerations

## Customization

All components accept a `className` prop for additional CSS customization:

```jsx
<Button className="my-custom-button">Custom Button</Button>
```

/**
 * React Components Library
 *
 * This file exports all the React components in the library
 * for easy importing in other files.
 */

import Header from "./Header";
import Footer from "./Footer";
import Card from "./Card";
import Button from "./Button";
import Modal from "./Modal";
import {
  Form,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  RadioGroup,
} from "./FormElements";

export {
  // Layout Components
  Header,
  Footer,

  // UI Components
  Card,
  Button,
  Modal,

  // Form Components
  Form,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  RadioGroup,
};

/**
 * Example usage:
 *
 * import { Header, Card, Button, Form, TextInput } from './path/to/react-components';
 *
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <Header
 *         title="My App"
 *         links={[
 *           { label: 'Home', url: '/' },
 *           { label: 'About', url: '/about' },
 *           { label: 'Contact', url: '/contact' }
 *         ]}
 *       />
 *
 *       <Card
 *         title="Welcome to My App"
 *         content="This is a sample card component"
 *         actions={<Button variant="primary">Learn More</Button>}
 *       />
 *
 *       <Form onSubmit={handleSubmit}>
 *         <TextInput
 *           label="Email"
 *           type="email"
 *           id="email"
 *           required
 *         />
 *         <Button type="submit">Submit</Button>
 *       </Form>
 *     </div>
 *   );
 * };
 */

export default {
  Header,
  Footer,
  Card,
  Button,
  Modal,
  Form,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  RadioGroup,
};

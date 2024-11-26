import { registerEnumType, ObjectType, Field } from 'type-graphql';

export enum Category {
  CSS = 'CSS',
  JavaScript = 'JavaScript',
  React = 'React',
  Vue = 'Vue',
  Tailwind = 'Tailwind',
}

registerEnumType(Category, {
  name: 'Category',
  description: 'Available blog post categories',
});

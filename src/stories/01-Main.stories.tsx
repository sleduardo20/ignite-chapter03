import { Story, Meta } from '@storybook/react/types-6-0';

import Main from '../components/Main';

export default {
  title: 'components/Main',
  component: Main,
} as Meta;

export const basic: Story = args => <Main />;

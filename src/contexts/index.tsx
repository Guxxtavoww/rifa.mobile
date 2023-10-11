import { ComposeProviders } from '@/components';

import { CustomToastProvider } from './CustomToastContext';

const Contexts: FCWithChildren<{}, true> = ({ children }) => (
  <ComposeProviders with={[CustomToastProvider]}>{children}</ComposeProviders>
);

export default Contexts;

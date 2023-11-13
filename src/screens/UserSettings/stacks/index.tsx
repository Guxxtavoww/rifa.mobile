import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import Settings from './Settings';
import MyRaffles from './MyRaffles';
import BoughtRaffles from './BoughtRaffles';
import { iUserStackWidgetProps } from '../components/UserStackWidget';

interface iUserSettingsStacksProps {
  currentStack: iUserStackWidgetProps['widgetType'];
}

const UserSettingsStacks: React.FC<iUserSettingsStacksProps> = ({
  currentStack,
}) => {
  const stacksObject: {
    [K in iUserStackWidgetProps['widgetType']]: JSX.Element;
  } = {
    'attach-money': <BoughtRaffles />,
    'shopping-cart': <MyRaffles />,
    'settings': <Settings />,
  };

  const content = useMemo(() => stacksObject[currentStack], [currentStack]);

  return <View style={{ flex: 1 }}>{content}</View>;
};

export default memo(UserSettingsStacks);

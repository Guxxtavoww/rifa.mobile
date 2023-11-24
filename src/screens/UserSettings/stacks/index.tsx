import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import Settings from './Settings';
import MyRaffles from './MyRaffles';
import BoughtRaffles from './BoughtRaffles';
import FavoriteRaffles from './FavoriteRaffles';
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
    'Comprados': <BoughtRaffles />,
    'Suas Rifas': <MyRaffles />,
    'Perfil': <Settings />,
    'Favoritos': <FavoriteRaffles />,
  };

  const content = useMemo(() => stacksObject[currentStack], [currentStack]);

  return <View style={{ flex: 1 }}>{content}</View>;
};

export default memo(UserSettingsStacks);

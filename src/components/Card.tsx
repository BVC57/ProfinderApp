import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Sizes } from '@/constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  margin?: number;
  shadow?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = Sizes.cardPadding,
  margin = 0,
  shadow = true,
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          padding,
          margin,
          ...(shadow && styles.shadow),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.radiusLg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  shadow: {
    shadowColor: Colors.shadow,
    shadowOffset: Sizes.shadowOffset,
    shadowOpacity: 0.1,
    shadowRadius: Sizes.shadowRadius,
    elevation: Sizes.elevation,
  },
});

export default Card;

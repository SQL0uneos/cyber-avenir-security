import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/spacing';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = colors.primary,
  height = 8,
}) => {
  const widthPercentage = `${Math.min(100, Math.max(0, progress))}%`;

  return (
    <View style={[styles.background, { height }]}>
      <View
        style={[
          styles.fill,
          { width: widthPercentage as any, backgroundColor: color, height },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    backgroundColor: colors.surfaceBorder,
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: radii.full,
  },
});

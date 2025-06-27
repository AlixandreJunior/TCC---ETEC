import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react-native';

interface DateNavigationProps {
  currentPeriodText: string;
  onPrevPress: () => void;
  onNextPress: () => void;
}

const { width, height } = Dimensions.get('window');

const DateNavigation: React.FC<DateNavigationProps> = ({
  currentPeriodText,
  onPrevPress,
  onNextPress,
}) => {
  return (
    <View style={styles.dateNavigation}>
      <TouchableOpacity onPress={onPrevPress}>
        <ChevronLeft size={24} color="#374151" />
      </TouchableOpacity>

      <Text style={styles.dateText}>{currentPeriodText}</Text>

      <TouchableOpacity onPress={onNextPress}>
          <ChevronRight size={24} color="#374151" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dateNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
  },
});

export default DateNavigation;
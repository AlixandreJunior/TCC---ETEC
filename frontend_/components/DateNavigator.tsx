import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  format,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
  isTomorrow,
  isYesterday,
  isSameWeek,
  isSameMonth,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

const { width, height } = Dimensions.get('window');

interface DateNavigatorProps {
  currentDate: Date;
  mode: 'day' | 'week' | 'month';
  onDateChange: (newDate: Date) => void;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  currentDate,
  mode,
  onDateChange,
}) => {
  const handlePrev = () => {
    let newDate: Date;
    switch (mode) {
      case 'day':
        newDate = subDays(currentDate, 1);
        break;
      case 'week':
        newDate = subWeeks(currentDate, 1);
        break;
      case 'month':
        newDate = subMonths(currentDate, 1);
        break;
      default:
        newDate = currentDate;
    }
    onDateChange(newDate);
  };

  const handleNext = () => {
    let newDate: Date;
    switch (mode) {
      case 'day':
        newDate = addDays(currentDate, 1);
        break;
      case 'week':
        newDate = addWeeks(currentDate, 1);
        break;
      case 'month':
        newDate = addMonths(currentDate, 1);
        break;
      default:
        newDate = currentDate;
    }
    onDateChange(newDate);
  };

  const getSpecialLabel = (date: Date, mode: 'day' | 'week' | 'month') => {
    const today = new Date();

    switch (mode) {
      case 'day':
        if (isToday(date)) return 'Hoje';
        if (isYesterday(date)) return 'Ontem';
        if (isTomorrow(date)) return 'Amanhã';
        break;

      case 'week':
        if (isSameWeek(date, today, { weekStartsOn: 0 })) return 'Esta semana';
        if (isSameWeek(date, subWeeks(today, 1), { weekStartsOn: 0 })) return 'Semana passada';
        if (isSameWeek(date, addWeeks(today, 1), { weekStartsOn: 0 })) return 'Próxima semana';
        break;

      case 'month':
        if (isSameMonth(date, today)) return 'Este mês';
        if (isSameMonth(date, subMonths(today, 1))) return 'Mês passado';
        if (isSameMonth(date, addMonths(today, 1))) return 'Próximo mês';
        break;
    }

    return null;
  };

  const getFormattedLabel = () => {
    const specialLabel = getSpecialLabel(currentDate, mode);
    if (specialLabel) return specialLabel;

    switch (mode) {
      case 'day':
        return format(currentDate, "EEEE, d 'de' MMMM", { locale: ptBR }).replace(/^\w/, c => c.toUpperCase());
      case 'week': {
        const start = startOfWeek(currentDate, { locale: ptBR, weekStartsOn: 0 });
        const end = endOfWeek(currentDate, { locale: ptBR, weekStartsOn: 0 });
        return `${format(start, 'd/MM')} - ${format(end, 'd/MM')}`;
      }
      case 'month':
        return format(currentDate, "MMMM 'de' yyyy", { locale: ptBR });
    }
  };

  return (
    <View style={styles.dateNavigator}>
      <TouchableOpacity onPress={handlePrev}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="#374151" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.dateText}>{getFormattedLabel()}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNext}>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#374151" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dateNavigator: {
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

export default DateNavigator;

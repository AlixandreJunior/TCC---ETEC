import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BookIcon } from './Icons/BookIcon';

interface ObjectiveDisplayCardProps {
  objectiveTitle: string;
  objectiveSubtitle: string;
}

const { width } = Dimensions.get('window');

const ObjectiveDisplayCard: React.FC<ObjectiveDisplayCardProps> = ({
  objectiveTitle,
  objectiveSubtitle,
}) => {
  return (
    <View style={styles.objectiveCard}>
      <View style={styles.objectiveLeft}>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        <BookIcon size={24} color="#374151" />
      </View>
      <View style={styles.objectiveContent}>
        <Text style={styles.objectiveTitle}>{objectiveTitle}</Text>
        <Text style={styles.objectiveSubtitle}>{objectiveSubtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  objectiveCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginHorizontal: width * 0.05,
  },
  objectiveLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#79D457',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  objectiveContent: {
    flex: 1,
  },
  objectiveTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  objectiveSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default ObjectiveDisplayCard;
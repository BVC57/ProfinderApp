import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Sizes } from '@/constants';
import { HistoryItem } from '@/types';
import Card from '@/components/Card';

const UserHistoryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');

  const historyData: HistoryItem[] = [
    {
      id: '1',
      title: 'Plumbing Service',
      description: 'Fixed kitchen sink leak and replaced faucet',
      date: '2024-01-15',
      status: 'completed',
      type: 'Plumbing',
    },
    {
      id: '2',
      title: 'Electrician Visit',
      description: 'Installed new ceiling fan in living room',
      date: '2024-01-12',
      status: 'completed',
      type: 'Electrical',
    },
    {
      id: '3',
      title: 'Cleaning Service',
      description: 'Deep cleaning of entire house',
      date: '2024-01-10',
      status: 'completed',
      type: 'Cleaning',
    },
    {
      id: '4',
      title: 'HVAC Maintenance',
      description: 'Regular maintenance and filter replacement',
      date: '2024-01-08',
      status: 'pending',
      type: 'HVAC',
    },
    {
      id: '5',
      title: 'Garden Landscaping',
      description: 'Lawn mowing and garden cleanup',
      date: '2024-01-05',
      status: 'cancelled',
      type: 'Landscaping',
    },
  ];

  const filteredHistory = historyData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return Colors.success;
      case 'pending':
        return Colors.warning;
      case 'cancelled':
        return Colors.error;
      default:
        return Colors.gray500;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'pending':
        return 'time';
      case 'cancelled':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const filterButtons = [
    { key: 'all', label: 'All' },
    { key: 'completed', label: 'Completed' },
    { key: 'pending', label: 'Pending' },
    { key: 'cancelled', label: 'Cancelled' },
  ] as const;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Service History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={Sizes.iconMd} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={Sizes.iconMd} color={Colors.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.gray400}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={Sizes.iconMd} color={Colors.gray400} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterButtons.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === filter.key && styles.activeFilterButtonText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* History List */}
      <ScrollView style={styles.historyContainer} showsVerticalScrollIndicator={false}>
        {filteredHistory.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={Sizes.iconXl * 2} color={Colors.gray300} />
            <Text style={styles.emptyStateTitle}>No services found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'Try adjusting your search terms' : 'Your service history will appear here'}
            </Text>
          </View>
        ) : (
          filteredHistory.map((item) => (
            <Card key={item.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <View style={styles.historyTitleContainer}>
                  <Text style={styles.historyTitle}>{item.title}</Text>
                  <View style={styles.serviceTypeContainer}>
                    <Text style={styles.serviceType}>{item.type}</Text>
                  </View>
                </View>
                <View style={styles.statusContainer}>
                  <Ionicons
                    name={getStatusIcon(item.status) as any}
                    size={Sizes.iconMd}
                    color={getStatusColor(item.status)}
                  />
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.historyDescription}>{item.description}</Text>
              
              <View style={styles.historyFooter}>
                <View style={styles.dateContainer}>
                  <Ionicons name="calendar-outline" size={Sizes.iconSm} color={Colors.gray400} />
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>View Details</Text>
                  <Ionicons name="chevron-forward" size={Sizes.iconSm} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Sizes.screenPadding,
    paddingTop: Sizes.xl,
  },
  title: {
    fontSize: Sizes.fontSizeXxl,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  filterButton: {
    padding: Sizes.sm,
  },
  searchContainer: {
    paddingHorizontal: Sizes.screenPadding,
    marginBottom: Sizes.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Sizes.radiusMd,
    paddingHorizontal: Sizes.md,
    paddingVertical: Sizes.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: Sizes.sm,
    fontSize: Sizes.fontSizeMd,
    color: Colors.textPrimary,
  },
  filterContainer: {
    marginBottom: Sizes.md,
  },
  filterContent: {
    paddingHorizontal: Sizes.screenPadding,
    gap: Sizes.sm,
  },
  filterButton: {
    paddingHorizontal: Sizes.md,
    paddingVertical: Sizes.sm,
    borderRadius: Sizes.radiusFull,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeFilterButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: Colors.white,
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: Sizes.screenPadding,
  },
  historyCard: {
    marginBottom: Sizes.md,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Sizes.sm,
  },
  historyTitleContainer: {
    flex: 1,
  },
  historyTitle: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Sizes.xs,
  },
  serviceTypeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Sizes.sm,
    paddingVertical: Sizes.xs,
    borderRadius: Sizes.radiusSm,
  },
  serviceType: {
    fontSize: Sizes.fontSizeXs,
    color: Colors.primary,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: Sizes.fontSizeSm,
    fontWeight: '600',
    marginLeft: Sizes.xs,
  },
  historyDescription: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Sizes.md,
  },
  historyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
    marginLeft: Sizes.xs,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.primary,
    fontWeight: '600',
    marginRight: Sizes.xs,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.xxl * 2,
  },
  emptyStateTitle: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Sizes.lg,
    marginBottom: Sizes.sm,
  },
  emptyStateText: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Sizes.xl,
  },
});

export default UserHistoryScreen;

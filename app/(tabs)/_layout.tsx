import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../src/theme/colors';
import {
  ShieldAlert,
  Vault,
  Radar,
  Dna,
  SearchCheck,
  User,
} from 'lucide-react-native';

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.surfaceBorder,
        },
        headerTitleStyle: {
          color: colors.textPrimary,
          fontWeight: '800',
          fontSize: 18,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            style={styles.profileBtn}
          >
            <User size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        ),
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.surfaceBorder,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cockpit',
          headerTitle: 'Cyber Security Cockpit',
          tabBarIcon: ({ color, size }) => <ShieldAlert size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="vault"
        options={{
          title: 'Vault',
          headerTitle: 'CyberVault Diagnostic',
          tabBarIcon: ({ color, size }) => <Vault size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="osint"
        options={{
          title: 'OSINT',
          headerTitle: 'OSINT Identity Radar',
          tabBarIcon: ({ color, size }) => <Radar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaks"
        options={{
          title: 'Leak DNA',
          headerTitle: 'Leak DNA Exposure',
          tabBarIcon: ({ color, size }) => <Dna size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scamhunt"
        options={{
          title: 'ScamHunt',
          headerTitle: 'ScamHunt Phishing',
          tabBarIcon: ({ color, size }) => <SearchCheck size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  profileBtn: {
    marginRight: 16,
    padding: 6,
    borderRadius: 20,
    backgroundColor: colors.surfaceElevated,
  },
});

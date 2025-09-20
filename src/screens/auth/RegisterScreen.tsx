import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { registerUser } from '@/store/authSlice';
import { registerSchema } from '@/utils/validation';
import { SCREEN_NAMES } from '@/constants';
import { Colors, Sizes } from '@/constants';
import { RegisterCredentials } from '@/types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import Toast from 'react-native-toast-message';

const RegisterScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin'>('user');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterCredentials>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user',
    },
  });

  const onSubmit = async (data: RegisterCredentials) => {
    try {
      const result = await dispatch(registerUser(data)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Welcome to ProfinderApp!',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error || 'Please try again',
      });
    }
  };

  const navigateToLogin = () => {
    navigation.navigate(SCREEN_NAMES.LOGIN);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join ProfinderApp and start your journey
          </Text>
        </View>

        <Card style={styles.formCard}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
                leftIcon="person-outline"
                autoCapitalize="words"
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                leftIcon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                leftIcon="lock-closed-outline"
                secureTextEntry
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
                leftIcon="lock-closed-outline"
                secureTextEntry
              />
            )}
          />

          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>Account Type</Text>
            <View style={styles.roleButtons}>
              <Button
                title="User"
                onPress={() => setSelectedRole('user')}
                variant={selectedRole === 'user' ? 'primary' : 'outline'}
                size="small"
                style={styles.roleButton}
              />
              <Button
                title="Admin"
                onPress={() => setSelectedRole('admin')}
                variant={selectedRole === 'admin' ? 'primary' : 'outline'}
                size="small"
                style={styles.roleButton}
              />
            </View>
          </View>

          <Button
            title="Create Account"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={styles.submitButton}
          />
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.linkText} onPress={navigateToLogin}>
              Sign In
            </Text>
          </Text>
        </View>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Sizes.screenPadding,
  },
  header: {
    alignItems: 'center',
    marginTop: Sizes.xxl,
    marginBottom: Sizes.xl,
  },
  title: {
    fontSize: Sizes.fontSizeXxxl,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Sizes.sm,
  },
  subtitle: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  formCard: {
    marginBottom: Sizes.lg,
  },
  roleContainer: {
    marginBottom: Sizes.lg,
  },
  roleLabel: {
    fontSize: Sizes.fontSizeSm,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Sizes.sm,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: Sizes.md,
  },
  roleButton: {
    flex: 1,
  },
  submitButton: {
    marginTop: Sizes.md,
  },
  footer: {
    alignItems: 'center',
    marginTop: Sizes.lg,
  },
  footerText: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
  },
  linkText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default RegisterScreen;

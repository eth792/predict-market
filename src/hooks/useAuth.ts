"use client";

/**
 * Authentication Hook - V2
 * Handles wallet login, signature authentication, and JWT management
 */

import { useEffect, useState, useCallback } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { api, setAccessToken, getAccessToken } from '@/lib/api/client';
import { saveUserInfo, getUserInfo, clearAllAuthData } from '@/lib/auth-storage';
import type { UserProfile } from '@/lib/api/schema';

/**
 * Generate login signature message
 */
const generateSignatureMessage = (address: string): string => {
  const timestamp = Date.now();
  return `Welcome to Prediction Market!\n\nSign this message to authenticate your wallet.\n\nAddress: ${address}\nTimestamp: ${timestamp}`;
};

/**
 * Hook: User authentication state
 */
export function useAuth() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  /**
   * Perform backend login
   */
  const performBackendLogin = useCallback(async (
    walletAddress: string,
    message: string,
    signature: string
  ): Promise<UserProfile | null> => {
    try {
      console.log('🔐 Logging in to backend with wallet:', walletAddress);

      // Send message and signature together to backend, format: "message|||signature"
      const combinedSignature = `${message}|||${signature}`;

      const loginResponse = await api.auth.login({
        walletAddress,
        signature: combinedSignature,
      });

      console.log('✅ Login successful:', loginResponse);

      // Save user info and token
      if (loginResponse.user && loginResponse.access_token) {
        setAccessToken(loginResponse.access_token);
        saveUserInfo({
          id: loginResponse.user.id,
          walletAddress: loginResponse.user.walletAddress,
          username: loginResponse.user.username,
          createdAt: loginResponse.user.createdAt,
          updatedAt: loginResponse.user.updatedAt,
        });
        setUser(loginResponse.user);
        setIsAuthenticated(true);
        return loginResponse.user;
      }

      return null;
    } catch (error) {
      console.error('❌ Backend login failed:', error);
      throw error;
    }
  }, []);

  /**
   * Request user signature and login
   */
  const authenticateWallet = useCallback(async () => {
    if (!address || !isConnected) {
      setAuthError('Wallet not connected');
      return false;
    }

    setIsAuthenticating(true);
    setAuthError(null);

    try {
      // 1. Generate signature message
      const message = generateSignatureMessage(address);
      console.log('📝 Generated message for signing:', message);

      // 2. Request user signature
      const signature = await signMessageAsync({ message });
      console.log('✍️ Signature obtained:', signature);

      // 3. Backend login
      const user = await performBackendLogin(address, message, signature);

      if (user) {
        console.log('✅ Authentication successful');
        return true;
      } else {
        setAuthError('Login failed: No user returned');
        return false;
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Authentication failed';
      console.error('❌ Authentication error:', errorMsg);
      setAuthError(errorMsg);
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  }, [address, isConnected, signMessageAsync, performBackendLogin]);

  /**
   * Logout
   */
  const logout = useCallback(() => {
    console.log('👋 Logging out');
    setUser(null);
    setIsAuthenticated(false);
    clearAllAuthData();
    setAccessToken(null);
  }, []);

  /**
   * Initialize: Restore user state from localStorage
   */
  useEffect(() => {
    const savedUser = getUserInfo();
    const savedToken = getAccessToken();

    if (
      savedUser &&
      savedUser.walletAddress &&
      savedToken &&
      address?.toLowerCase() === savedUser.walletAddress.toLowerCase()
    ) {
      console.log('🔄 Restoring user session:', savedUser);
      setUser({
        id: savedUser.id,
        walletAddress: savedUser.walletAddress,
        username: savedUser.username,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt ?? savedUser.createdAt,
      });
      setIsAuthenticated(true);
    }
  }, [address]);

  /**
   * Listen for wallet connection: Auto-trigger authentication
   */
  useEffect(() => {
    if (isConnected && address && !isAuthenticated && !isAuthenticating) {
      console.log('🔗 Wallet connected, triggering authentication:', address);
      authenticateWallet();
    } else if (!isConnected && isAuthenticated) {
      // Wallet disconnected, clear authentication
      console.log('🔌 Wallet disconnected, clearing authentication');
      logout();
    }
  }, [isConnected, address, isAuthenticated, isAuthenticating, authenticateWallet, logout]);

  /**
   * Listen for address changes: Re-authenticate if address changes
   */
  useEffect(() => {
    if (isConnected && address && user && address.toLowerCase() !== user.walletAddress.toLowerCase()) {
      console.log('🔄 Wallet address changed, re-authenticating:', address);
      logout();
      authenticateWallet();
    }
  }, [address, user, isConnected, authenticateWallet, logout]);

  return {
    // State
    user,
    isAuthenticated,
    isAuthenticating,
    authError,

    // Methods
    authenticateWallet,
    logout,

    // Wallet info
    address,
    isConnected,
  };
}

/**
 * Hook: Get JWT Token
 */
export function useAuthToken() {
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    const savedToken = getAccessToken();
    setToken(savedToken || undefined);
  }, []);

  return token;
}

/**
 * Hook: Check if authenticated (simplified version)
 */
export function useIsAuthenticated() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

/**
 * Authentication Storage Utilities
 * Handles local storage of JWT tokens and wallet addresses
 */

const AUTH_TOKEN_KEY = 'prediction_market_auth_token';
const WALLET_ADDRESS_KEY = 'prediction_market_wallet_address';
const USER_INFO_KEY = 'prediction_market_user_info';

export interface StoredUserInfo {
  id: string;
  walletAddress: string;
  username?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Save JWT token
 */
export function saveAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

/**
 * Get saved JWT token
 */
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
}

/**
 * Clear JWT token
 */
export function clearAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

/**
 * Save wallet address
 */
export function saveWalletAddress(address: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(WALLET_ADDRESS_KEY, address.toLowerCase());
  }
}

/**
 * Get saved wallet address
 */
export function getSavedWalletAddress(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(WALLET_ADDRESS_KEY);
  }
  return null;
}

/**
 * Clear wallet address
 */
export function clearWalletAddress(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(WALLET_ADDRESS_KEY);
  }
}

/**
 * Save user information
 */
export function saveUserInfo(user: StoredUserInfo): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
  }
}

/**
 * Get saved user information
 */
export function getUserInfo(): StoredUserInfo | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(USER_INFO_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse user info:', e);
        return null;
      }
    }
  }
  return null;
}

/**
 * Clear user information
 */
export function clearUserInfo(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_INFO_KEY);
  }
}

/**
 * Clear all authentication data
 */
export function clearAllAuthData(): void {
  clearAuthToken();
  clearWalletAddress();
  clearUserInfo();
}

/**
 * Check if there is a valid authentication session
 */
export function hasAuthSession(): boolean {
  return getAuthToken() !== null && getSavedWalletAddress() !== null;
}

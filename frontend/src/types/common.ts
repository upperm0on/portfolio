// Common shared types used across the application

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// Utility types for API responses
export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

export type ApiError = {
  message: string;
  code?: string;
  status?: number;
};

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Form types
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface FormState<T> {
  data: T;
  status: FormStatus;
  error?: string;
}


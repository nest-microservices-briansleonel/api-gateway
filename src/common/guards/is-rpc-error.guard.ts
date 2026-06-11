// common/guards/is-rpc-error.guard.ts
import { IRpcError } from '../interfaces/rpc-error.interface';

export function isRpcError(value: unknown): value is IRpcError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value &&
    'message' in value &&
    typeof (value as Record<string, unknown>).status === 'number' &&
    (typeof (value as Record<string, unknown>).message === 'string' ||
      Array.isArray((value as Record<string, unknown>).message))
  );
}

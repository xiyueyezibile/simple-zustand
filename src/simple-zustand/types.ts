import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector'

export type GetState<T> = () => T

export type SetState<T> = (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  ) => void

export type Subscribe = Parameters<typeof useSyncExternalStoreWithSelector>[0]

export type StoreApi<T> = {
    setState: SetState<T>
    getState: GetState<T>
    subscribe: Subscribe
  }
  
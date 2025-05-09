import { QueryKey } from '@tanstack/react-query';
import { AnyObjectType } from '@/shared/types';

export const createKeys = (rootKey: string) => {
  return {
    all: [rootKey] as QueryKey,

    lists: [rootKey, 'list'] as QueryKey,

    list: (params?: AnyObjectType) =>
      params ? [rootKey, 'list', 'no parent', params] : ([rootKey, 'list', 'no parent'] as QueryKey),

    listByParentId: (id: string | number, params?: AnyObjectType) =>
      params ? [rootKey, 'list', id, params] : ([rootKey, 'list', id] as QueryKey),

    details: [rootKey, 'detail'] as QueryKey,

    detail: (id?: number | string) => (id ? [rootKey, 'detail', id] : [rootKey, 'detail']) as QueryKey,
  };
};

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'shared/store/toastStore';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  type CreateUserDto,
  type UpdateUserDto,
} from './api';

// -- Query key factory -------------------------------------------------------

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// -- Queries -----------------------------------------------------------------

export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUser(id),
    enabled: id > 0,
  });
}

// -- Mutations ---------------------------------------------------------------

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateUserDto) => createUser(dto),
    onSuccess: () => {
      toast.success('User created successfully.');
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateUserDto }) =>
      updateUser(id, dto),
    onSuccess: (_data, variables) => {
      toast.success('User updated successfully.');
      void queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted successfully.');
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

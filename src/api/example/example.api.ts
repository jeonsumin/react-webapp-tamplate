import { apiClient } from '@/lib/axios';

// -- Types -------------------------------------------------------------------

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface CreateUserDto {
  name: string;
  username: string;
  email: string;
}

export interface UpdateUserDto {
  name?: string;
  username?: string;
  email?: string;
}

// -- API functions -----------------------------------------------------------

export async function getUsers(): Promise<User[]> {
  const { data } = await apiClient.get<User[]>('/users');
  return data;
}

export async function getUser(id: number): Promise<User> {
  const { data } = await apiClient.get<User>(`/users/${id}`);
  return data;
}

export async function createUser(dto: CreateUserDto): Promise<User> {
  const { data } = await apiClient.post<User>('/users', dto);
  return data;
}

export async function updateUser(id: number, dto: UpdateUserDto): Promise<User> {
  const { data } = await apiClient.put<User>(`/users/${id}`, dto);
  return data;
}

export async function deleteUser(id: number): Promise<void> {
  await apiClient.delete(`/users/${id}`);
}

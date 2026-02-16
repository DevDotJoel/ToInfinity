import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60,
    },
  },
});

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<MutationFnType extends (...args: any) => Promise<any>> = {
  onSuccess?: (data: ApiFnReturnType<MutationFnType>) => void;
  onError?: (error: Error) => void;
  onMutate?: (variables: Parameters<MutationFnType>[0]) => Promise<any> | any;
  onSettled?: (
    data: ApiFnReturnType<MutationFnType> | undefined,
    error: Error | null,
    variables: Parameters<MutationFnType>[0],
    context: any
  ) => void;
};

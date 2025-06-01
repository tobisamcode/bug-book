import kyInstance from "@/lib/ky";
import { FollowerInfo } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useFollowMutation(data: FollowerInfo, userId: string) {
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["follower-info", userId];

  const mutation = useMutation({
    mutationFn: () =>
      data.isFllowedByMe
        ? kyInstance.delete(`api/users/${userId}/followers`)
        : kyInstance.post(`api/users/${userId}/followers`),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFllowedByMe ? -1 : 1),
        isFllowedByMe: !previousState?.isFllowedByMe,
      }));

      return {
        previousState,
      };
    },

    onError: (error, variables, content) => {
      queryClient.setQueryData(queryKey, content?.previousState);
      console.error(error);
      toast.error("Something went wrong, Please try again");
    },
  });

  return mutation;
}

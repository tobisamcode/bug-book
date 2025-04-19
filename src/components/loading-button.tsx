import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface LoadingButtonProps extends React.ComponentProps<"button"> {
  loading: boolean;
}

export default function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex cursor-pointer items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
}

import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  className?: string;
  onBottomReached: () => void;
}

export default function InfiniteScrollContainer({
  className,
  onBottomReached,
  children,
}: InfiniteScrollContainerProps) {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange: (inView) => {
      if (inView) {
        onBottomReached();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
}

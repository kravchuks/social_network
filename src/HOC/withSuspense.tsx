import React, {
  ComponentType,
  PropsWithChildren,
  ReactNode,
  Suspense,
} from "react";

import Preloader from "components/Preloader/Preloader";

interface WithSuspenseProps {
  props: PropsWithChildren<any>;
}

export function withSuspense<P extends WithSuspenseProps>(
  Component: ComponentType<P>,
  { props }: P
): ReactNode {
  return (
    <Suspense fallback={<Preloader />}>
      <Component {...props} />
    </Suspense>
  );
}

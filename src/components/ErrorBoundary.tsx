import React, { Component, ComponentType, ErrorInfo, ForwardRefExoticComponent, FunctionComponent, PropsWithChildren, PropsWithRef, PropsWithoutRef, ReactElement, ReactNode, RefAttributes } from "react";

function hasArrayChanged(a:unknown[] = [], b: unknown[]= []) {
  return (
    a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))
  );
}
export type ErrorBoundaryContextType = {
    didCatch: boolean;
    error: any;
    resetErrorBoundary: (...args: any[]) => void;
};
// export const ErrorBoundaryContext: import("react").Context<ErrorBoundaryContextType | null>;
declare function FallbackRender(props: FallbackProps): ReactNode;
export type FallbackProps = {
    error: any;
    resetErrorBoundary: (...args: any[]) => void;
};
type ErrorBoundarySharedProps = {
    onError?: (error: Error, info: {
        componentStack: string;
    }) => void;
    onReset?: (details: {
        reason: "imperative-api";
        args: any[];
    } | {
        reason: "keys";
        prev: any[] | undefined;
        next: any[] | undefined;
    }) => void;
    resetKeys?: any[];
};
export type ErrorBoundaryPropsWithComponent = ErrorBoundarySharedProps & {
    fallback?: never;
    FallbackComponent: ComponentType<FallbackProps>;
    fallbackRender?: never;
};
export type ErrorBoundaryPropsWithRender = ErrorBoundarySharedProps & {
    fallback?: never;
    FallbackComponent?: never;
    fallbackRender: typeof FallbackRender;
};
export type ErrorBoundaryPropsWithFallback = ErrorBoundarySharedProps & {
    fallback: ReactElement<unknown, string | FunctionComponent | typeof Component> | null;
    FallbackComponent?: never;
    fallbackRender?: never;
};
export type ErrorBoundaryProps = ErrorBoundaryPropsWithFallback | ErrorBoundaryPropsWithComponent | ErrorBoundaryPropsWithRender;
type ErrorBoundaryState = {
    didCatch: boolean;
    error: any;
};
// export class ErrorBoundary extends Component<PropsWithRef<PropsWithChildren<ErrorBoundaryProps>>, ErrorBoundaryState> {
//     state: ErrorBoundaryState;
//     static getDerivedStateFromError(error: Error): {
//         didCatch: boolean;
//         error: Error;
//     };
//     resetErrorBoundary: (...args: any[]) => void;
//     componentDidCatch(error: Error, info: ErrorInfo): void;
//     componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState): void;
//     render(): ReactElement<any, string | import("react").JSXElementConstructor<any>>;
// }
export type UseErrorBoundaryApi<Error> = {
    resetBoundary: () => void;
    showBoundary: (error: Error) => void;
};
// export function useErrorBoundary<Error = any>(): UseErrorBoundaryApi<Error>;
// export function withErrorBoundary<Props extends Object>(component: ComponentType<Props>, errorBoundaryProps: ErrorBoundaryProps): ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<any>>;

//# sourceMappingURL=react-error-boundary.d.ts.map
export const handleStateReset = (
  details:
    | { reason: "imperative-api"; args: any[] }
    | { reason: "keys"; prev: any[] | undefined; next: any[] | undefined }
) => {
  console.log({ details });
};

export function FallbackComponent({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  resetErrorBoundary();

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export const logError = (error: Error, info: { componentStack: string }) => {
  console.log({ error, info });
};

class Boundary extends React.Component<
  PropsWithRef<PropsWithChildren<ErrorBoundaryProps>>,
  ErrorBoundaryState
> {
  constructor(
    props:
      | React.PropsWithChildren<ErrorBoundaryProps>
      | Readonly<React.PropsWithChildren<ErrorBoundaryProps>>
  ) {
    super(props);
    this.state = { didCatch: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.log({ error: error.message, stack: error.stack });
    // Update state so the next render will show the fallback UI.
    return { didCatch: true, error };
  }

  resetErrorBoundary = (...args: any[]) => {
    const { error: error } = this.state;
    if (error !== null) {
      this.props.onReset?.({
        args: args,
        reason: "imperative-api",
      });
      this.setState({ didCatch: false, error: null });
    }
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log({ error });
    console.log({ info });
    // Todo Logging Error and Resetting State Where Failure Occurred

    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // this.props.onError?.(error, info); or
    // logErrorToMyService(error, info.componentStack);
  }

  componentDidUpdate(
    prevProps: ErrorBoundaryProps,
    prevState: ErrorBoundaryState
  ) {
    const { didCatch: didCatch } = this.state;
    const { resetKeys: resetKeys } = this.props;
    // There's an edge case where if the thing that triggered the error happens to *also* be in the resetKeys array,
    // we'd end up resetting the error boundary immediately.
    // This would likely trigger a second error to be thrown.
    // So we make sure that we don't check the resetKeys on the first call of cDU after the error is set.
    if (
      didCatch &&
      prevState.error !== null &&
      hasArrayChanged(prevProps.resetKeys, resetKeys)
    ) {
      this.props.onReset?.({
        next: resetKeys,
        prev: prevProps.resetKeys,
        reason: "keys",
      });
      this.setState({ didCatch: false, error: null });
    }
  }

  render() {
    if (this.state.didCatch) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}
export default Boundary;

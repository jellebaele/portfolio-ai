import type React from 'react';

type ComposeProvidersProps = {
  providers: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
  children: React.ReactNode;
};

export const ComposeProviders = ({ providers, children }: ComposeProvidersProps) => {
  return (
    <>
      {providers.reduceRight((Previous, Current) => {
        return <Current>{Previous}</Current>;
      }, children)}
    </>
  );
};

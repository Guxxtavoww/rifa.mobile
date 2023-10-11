interface iComposeProvidersProps {
  with: React.ElementType[];
}

const ComposeProviders: FCWithChildren<iComposeProvidersProps, true> = ({
  children,
  with: Providers,
}) => (
  <>
    {Providers.reduce(
      (AccProviders, CurrentProvider) => (
        <CurrentProvider>{AccProviders}</CurrentProvider>
      ),
      children
    )}
  </>
);

export default ComposeProviders;

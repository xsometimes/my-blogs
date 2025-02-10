type Props = {
  children: React.ReactNode;
  params: { };
};

export default function Layout({ children, params: {} }: Props) {
    
  return (
    <>{children}</>);
}

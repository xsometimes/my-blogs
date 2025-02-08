type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function Layout({ children, params: {} }: Props) {
    
  return (
    <>{children}</>);
}

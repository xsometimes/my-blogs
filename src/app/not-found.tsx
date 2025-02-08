import Error from 'next/error';

export default function NotFound() {
  return (
    <Error
      statusCode={404}
      displayName={`Lydia's blogs`}
      title='your page is not found'
    />
  );
}

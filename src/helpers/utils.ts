export const getPathWithBase = (path: string) => {
  // if (process.env.NODE_ENV === 'production') {
  //   return path;
  // }

  if (path.startsWith('/')) {
    return `${process.env.NEXT_PUBLIC_BASE_PATH}${path}`;
  }
  return `${process.env.NEXT_PUBLIC_BASE_PATH}/${path}`;
};
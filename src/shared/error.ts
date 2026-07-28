const isError = (a: unknown) => a instanceof Error;

export const parseError = (error: Error) => isError(error) ? error.message : 'Unknown error';


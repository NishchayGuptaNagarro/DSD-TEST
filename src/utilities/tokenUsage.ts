export function logTokenUsage(
  operation: string,
  tokenCount: number,
  metadata?: Record<string, unknown>,
): void {
  if (process.env.NODE_ENV === 'development') {
    console.info(
      'TokenUsage: ' + operation + ': ' + tokenCount + ' tokens',
      metadata ?? '',
    );
  }
}

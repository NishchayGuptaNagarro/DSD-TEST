import {v4 as uuidv4} from 'uuid';

export interface CorrelationObject {
  id: string;
  timestamp: number;
}

export async function generateCorrelationId() {
  const correlationObject: CorrelationObject = {
    id: uuidv4(),
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(
    'correlationIdObject',
    JSON.stringify(correlationObject),
  );
  return correlationObject;
}

//to check whether the id is expired or not
export const isCorrelationIdExpired = (timestamp: number): boolean => {
  const FIFTEEN_HOURS_IN_MS = 15 * 60 * 60 * 1000;
  const currentTime = new Date().getTime();
  return currentTime - timestamp > FIFTEEN_HOURS_IN_MS;
};

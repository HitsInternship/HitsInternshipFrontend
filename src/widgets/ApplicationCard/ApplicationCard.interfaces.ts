import { IApplication } from '@/entities/Application';

export interface IApplicationCardProps {
  application: IApplication;
  onSuccess: () => void;
}

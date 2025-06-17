import { Company } from '@/entities/Company/models';
import { api } from '@/shared/api';

export const downloadInternsByCompany = async (
  company: Company,
): Promise<void> => {
  const response = await api.get(
    `/api/practice/${company.id}/company-practice-exel`,
    {
      responseType: 'blob',
    },
  );

  const url = window.URL.createObjectURL(response.data);
  const link = document.createElement('a');
  link.href = url;

  // Пытаемся извлечь имя файла из заголовков, иначе задаем дефолт
  //   const contentDisposition = response.headers['content-disposition'];
  //   const fileNameMatch = contentDisposition?.match(
  //     /filename\*?=(?:UTF-8'')?(.+)/,
  //   );
  const fileName = 'Практики_' + company.name;

  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

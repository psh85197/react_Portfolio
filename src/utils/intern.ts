import { InternData, InternDTO, TableIntern } from '@/types/intern';
import { format } from 'date-fns';

export const convertToTableData = (intern: InternDTO): TableIntern => {
  return {
    id: String(intern.id),
    username: intern.user.username,
    name: `${intern.firstName} ${intern.lastName}`,
    phone: intern.phone,
    birthday: format(new Date(intern.birthday), 'yyyy-MM-dd'),
    affiliatedUniversityName: intern.affiliatedUniversity.name,
    createdAt: format(new Date(intern.createdAt), 'yyyy-MM-dd HH:mm:ss'),
    lastLoginAt: format(new Date(intern.user.lastLoginAt), 'yyyy-MM-dd HH:mm:ss')
  };
};

// 리스트 변환 함수
export const convertToTableDataList = (data: InternData): TableIntern[] => {
  return data.items.map(convertToTableData);
};
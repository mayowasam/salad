import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>{`< Previous `}</a>;
  }
  if (type === 'next') {
    return <a>{`Next >`}</a>;
  }
  return originalElement;
};

type PaginateProps= {
    total :  number,
    onChange: ((page: number, pageSize: number) => void) | undefined
}


export default function Paginate ({total, onChange}:PaginateProps){
    return <Pagination  onChange={onChange} total={total} itemRender={itemRender} />;
     
}

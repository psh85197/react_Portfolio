import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom'; //a태그 사용할때 필요
import '@/assets/scss/style.scss';

const Buttonwrap: FC = () => {
  return (
    <div className='component-wrap'>
      <div className="hgroup-wrap">
        <h2 className='f40-700-130'>Button</h2>
      </div>
      <div className="component-group">
        <div className='from-group'>
          <div className="btn-wrap">
            <Button className="btn btn-primary">Click me</Button>
          </div>
        </div>
        <div className='from-group'>
          <div className="btn-wrap">
            <Button className="btn btn-delete" variant="destructive">삭제</Button>
          </div>
        </div>
        <div className='from-group'>
          <div className="btn-wrap">
            <Button className="btn btn-line" variant="outline">취소</Button>
          </div>
        </div>
        <div className='from-group'>
          <div className="btn-wrap">
            <Button className="btn file-btn" variant="secondary">보조 액션</Button>
          </div>
        </div>
        <div className='from-group'>
          <div className="btn-wrap">
            <Button className="btn btn-default" variant="ghost">취소</Button>
          </div>
        </div>
        <div className='from-group'>
          <div className="btn-wrap">
            <Button className="btn refresh-btn" variant="link">취소</Button>
          </div>
        </div>
        <div className='from-group'>
          <div className="btn-wrap">
            <Button className="btn btn-download" size="icon">취소</Button>
          </div>
        </div>
        <div className='from-group'>
          <div className="btn-wrap">
            <Button className="btn">
            <img src="/path/to/your/icon.png" alt="아이콘" className="mr-2 h-4 w-4" />
              아이콘 버튼
            </Button>
          </div>
        </div>
        <div className='from-group'>
          <div className="btn-wrap">
            <Link className='btn btn-line' to="/login">a태그입니다</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buttonwrap;
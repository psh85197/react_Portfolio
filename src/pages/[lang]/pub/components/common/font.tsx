import { FC } from 'react';
// import { Link } from 'react-router-dom';
import '@/assets/scss/style.scss';

const Fontwrap: FC = () => {

  
  return (
    <div className='component-wrap'>
      <div className="hgroup-wrap">
        <h2 className='f40-700-130'>폰트 모음</h2>
      </div>
      <div className="component-group">
        <div className='from-group'>
          <div className='hgroup-wrap'>
            <p className='f48-700-140'>font-size: 48px; font-weight: 700; line-height: 1.4;</p>
            <br />
            <p className='f40-700-130'>font-size: 40px; font-weight: 700; line-height: 1.3;</p>
            <br />
            <p className='f32-700-140'>font-size: 32px; font-weight: 700; line-height: 1.4;</p>
            <br />
            <p className='f24-700-140'>font-size: 24px; font-weight: 700; line-height: 1.4;</p>
            <br />
            <p className='f24-600-140'>font-size: 24px; font-weight: 600; line-height: 1.4;</p>
            <br />
            <p className='f18-600-140'>font-size: 18px; font-weight: 600; line-height: 1.4;</p>
            <br />
            <p className='f18-600-160'>font-size: 18px; font-weight: 600; line-height: 1.6;</p>
            <br />
            <p className='f16-600-160'>font-size: 16px; font-weight: 600; line-height: 1.6;</p>
            <br />
            <p className='f14-600-140'>font-size: 14px; font-weight: 600; line-height: 1.4;</p>
            <br />
            <p className='f18-400-160'>font-size: 18px; font-weight: 400; line-height: 1.6;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fontwrap;

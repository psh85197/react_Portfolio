import { FC } from 'react';
import { Textarea } from "@/components/ui/textarea";
import '@/assets/scss/style.scss';

const Textareawrap: FC = () => {

  return (
    <div className='component-wrap'>
      <div className="hgroup-wrap">
        <h2 className='f40-700-130'>textarea</h2>
      </div>
      <div className="component-group">
        <div className='from-group'>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Basic Textarea(기본)</h3>
              <Textarea
                placeholder="Enter your message"
                maxlength={100}
              />  
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Textarea with Static Value(텍스트 값 존재할 시)</h3>
              <Textarea
                placeholder="Maximum 100 characters"
                maxlength={100}
                value={"멍멍멍머어어엉"}
              />  
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Textareawrap;

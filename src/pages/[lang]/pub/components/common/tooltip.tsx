import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/tooltip-popover";
import ico_tooltip from "@/assets/images/icon/ico_tooltip.png";
import ico_close from "@/assets/images/btn/btn_tooltip_close.png";

interface CustomTooltipProps {
  content: string | React.ReactNode;
  variant?: 'default' | 'info' | 'warning';
  showCloseButton?: boolean;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ 
  content, 
  variant = 'default',
  showCloseButton = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getVariantClass = () => {
    switch (variant) {
      case 'info':
        return 'tooltip-info';
      case 'warning':
        return 'tooltip-warning';
      default:
        return 'tooltip-default';
    }
  };

  const renderContent = () => {
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return content;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button 
          type="button" 
          className={`tooltip-btn ${getVariantClass()}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={ico_tooltip} alt="툴팁" className="tooltip-icon" />
        </button>
      </PopoverTrigger>
      <PopoverContent className={`tooltip-content ${getVariantClass()}`}>
        <div className="tooltip-header">
          <div className="tooltip-text">{renderContent()}</div>
          {showCloseButton && (
            <button 
              type="button" 
              className="tooltip-close-btn"
              onClick={() => setIsOpen(false)}
            >
              <img src={ico_close} alt="닫기" className="tooltip-close-icon" />
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomTooltip; 
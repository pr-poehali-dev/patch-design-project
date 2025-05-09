
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

/**
 * Компонент для отображения информации о лицензии дизайна вышивки
 */
const ProductLicense = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="mt-2 text-xs border-t border-gray-100 pt-2">
      <div className="flex items-center justify-between">
        <span className="text-gray-600 font-medium flex items-center">
          <Icon name="Shield" className="h-3 w-3 mr-1 text-gray-500" />
          Лицензия автора
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 px-2 text-purple-600 hover:bg-transparent hover:text-purple-800"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <span className="flex items-center text-xs">
              <Icon name="ChevronUp" size={14} className="mr-1" />
              Скрыть
            </span>
          ) : (
            <span className="flex items-center text-xs">
              <Icon name="ChevronDown" size={14} className="mr-1" />
              Подробнее
            </span>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-md">
          <p className="leading-tight">
            Продавец является законным правообладателем дизайна машинной вышивки. Продавец предоставляет Покупателю неисключительное право использования и продажи готовых вышивок, созданных с использованием данного дизайна. Покупатель обязуется не распространять дизайн в цифровой форме, не разрешать третьим лицам редактирование или изменение дизайна без предварительного письменного согласия Продавца. Любое использование дизайна в коммерческих целях требует уплаты соответствующей лицензионной платы Продавцу, за исключением случаев, когда данное соглашение явно разрешает иное. Продавец не несет ответственности за любые убытки или претензии, возникающие в связи с использованием Покупателем данного дизайна. Данное соглашение действует с момента приобретения дизайна и до его прекращения по соглашению сторон.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductLicense;

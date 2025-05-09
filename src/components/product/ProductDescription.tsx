import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ProductDescriptionProps {
  description: string;
  maxLength?: number;
}

/**
 * Компонент для отображения описания товара с возможностью разворачивания
 */
const ProductDescription = ({
  description,
  maxLength = 100,
}: ProductDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsTruncation = description.length > maxLength;

  // Обрезанное описание с многоточием
  const truncatedDescription =
    needsTruncation && !isExpanded
      ? `${description.substring(0, maxLength).trim()}...`
      : description;

  // Переключение состояния развернутости
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-3 text-sm">
      <p className="text-gray-700">{truncatedDescription}</p>

      {needsTruncation && (
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-russian-blue hover:bg-transparent hover:text-russian-blue/80 hover:underline mt-1"
          onClick={toggleExpand}
        >
          {isExpanded ? (
            <span className="flex items-center gap-1">
              <Icon name="ChevronUp" size={14} />
              Свернуть
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Icon name="ChevronDown" size={14} />
              Показать полностью
            </span>
          )}
        </Button>
      )}
    </div>
  );
};

export default ProductDescription;

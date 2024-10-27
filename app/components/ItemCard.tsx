import React from 'react';

interface ItemCardProps {
  name: string;
  price: number;
  image: string;
  onAdd: () => void;
  onRemove: () => void;
  disabled: boolean;
  canRemove: boolean;
  quantity: number;
}

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  price,
  image,
  onAdd,
  onRemove,
  disabled,
  canRemove,
  quantity,
}) => {
  return (
    <div className="p-4 rounded-lg transition-all duration-200 group hover:shadow-[0_0_0_1.5px_#2463ec]">
      <div className="flex flex-col items-center justify-center bg-cardBackground p-4 rounded-lg">
        <div className="w-full h-48 overflow-hidden rounded-md">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="mt-4 text-lg font-bold">{name}</h3>
        <p className="text-xl text-gray-400 mt-2">{`₹${price.toLocaleString('en-IN')}`}</p>
        <div className="flex items-center border-2 border-gray-500 rounded-full px-4 py-2 mt-4">
          <button
            onClick={onRemove}
            disabled={!canRemove}
            className={`text-white w-6 h-6 flex items-center justify-center ${
              !canRemove ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            -
          </button>
          <span className="text-lg mx-4">{quantity}</span>
          <button
            onClick={onAdd}
            disabled={disabled}
            className={`text-white w-6 h-6 flex items-center justify-center ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

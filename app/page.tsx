"use client";

import React, { useState, useEffect } from 'react';
import ItemCard from './components/ItemCard';
import Image from 'next/image';
import { useSpring, animated } from '@react-spring/web';

import itemList from './items';
import elonMuskImage from '../public/images/elon-muskk.png';

export default function HomePage() {
  const [budget, setBudget] = useState(22437900000000);
  const [items] = useState(itemList);
  const [cartItems, setCartItems] = useState<{ name: string; price: number; quantity: number }[]>([]);
  const [displayBudget, setDisplayBudget] = useState(budget);

  useEffect(() => {
    setDisplayBudget(budget);
  }, [budget]);

  const springProps = useSpring({
    from: { value: displayBudget },
    to: { value: budget },
    config: { tension: 170, friction: 26 },
  });

  const handleAdd = (item: { name: string; price: number }) => {
    if (budget >= item.price) {
      setBudget((prevBudget) => prevBudget - item.price);
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((cartItem) => cartItem.name === item.name);
        if (existingItem) {
          return prevItems.map((cartItem) =>
            cartItem.name === item.name
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          return [...prevItems, { ...item, quantity: 1 }];
        }
      });
    }
  };

  const handleRemove = (item: { name: string; price: number }) => {
    setBudget((prevBudget) => prevBudget + item.price);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.name === item.name);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevItems.filter((cartItem) => cartItem.name !== item.name);
      }
    });
  };

  const formatCurrency = (amount: number) => {
    if (amount > 99999999) {
      const croreValue = (amount / 10000000).toFixed(1);
      return `${croreValue.endsWith('.0') ? croreValue.slice(0, -2) : croreValue} crore`;
    } else if (amount > 99999) {
      const lakhValue = (amount / 100000).toFixed(1);
      return `${lakhValue.endsWith('.0') ? lakhValue.slice(0, -2) : lakhValue} lakh`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center my-8">Spend Elon Musk&apos;s Money</h1>

      {/* Elon Musk's Image */}
      <Image
        src={elonMuskImage}
        alt="Elon Musk"
        width={400}
        height={400}
        className="mb-6"
        priority
      />

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Budget Strip */}
        <div className="sticky top-0 z-50">
          <div className="max-w-7xl mx-auto bg-[#2463ec] p-4 rounded-lg">
            <animated.h2 className="text-3xl font-bold font-mono tracking-tighter text-center text-white">
              {springProps.value.to((val) => `₹${Math.round(val).toLocaleString('en-IN')}`)}
            </animated.h2>
          </div>
        </div>

        {/* Item Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {items.map((item) => (
            <ItemCard
              key={item.name}
              name={item.name}
              price={item.price}
              image={item.image}
              onAdd={() => handleAdd(item)}
              onRemove={() => handleRemove(item)}
              disabled={budget < item.price}
              canRemove={cartItems.some(cartItem => cartItem.name === item.name && cartItem.quantity > 0)}
              quantity={cartItems.find(cartItem => cartItem.name === item.name)?.quantity || 0}
            />
          ))}
        </div>

        {/* Your Bill Section */}
        <div className="mt-8 mb-8 p-4 bg-cardBackground text-white rounded-lg max-w-md mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">Your Bill</h3>
          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <ul className="mb-4 pt-4">
              {cartItems.map((cartItem) => (
                <li key={cartItem.name} className="flex justify-between items-center mb-2 text-lg">
                  <div className="flex-[5] whitespace-normal">{cartItem.name}</div>
                  <div className="flex-1 text-center whitespace-nowrap">x{cartItem.quantity}</div>
                  <div className="flex-[3] text-right whitespace-nowrap">
                    {formatCurrency(cartItem.price * cartItem.quantity)}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <hr className="my-4 border-gray-500" />
          <div className="font-bold text-xl flex justify-between">
            <span>Total</span>
            <span>
              ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
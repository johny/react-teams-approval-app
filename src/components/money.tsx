import React from "react";

interface MoneyProps {
  value: number;
  currency?: string;
}

export const Money: React.FC<MoneyProps> = ({ value, currency = "€" }) => {
  // const formatter = new Intl.NumberFormat('en-UK', { style: 'currency', currency })
  // const stringValue = formatter.format(value)
  return <span className="Money">{value}€</span>;
};

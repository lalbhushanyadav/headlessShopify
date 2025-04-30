import React, { useEffect, useState } from "react";

const ProductSwatches = React.memo(
  ({
    options,
    combinations,
    onSelectionChange,
    productId,
    productSlug,
    productName,
  }) => {
    const [selected, setSelected] = useState({});
    const [stockStatus, setStockStatus] = useState({});

    // Pre-select the first option for each option set
    useEffect(() => {
      const initial = options.reduce((acc, opt) => {
        acc[opt.name] = opt.values[0];
        return acc;
      }, {});
      setSelected(initial);
    }, [options]);

    // Update the stock status whenever combinations change
    useEffect(() => {
      const status = combinations.reduce((acc, variant) => {
        const selectedCombination = variant.selectedOptions.reduce(
          (acc, option) => {
            acc[option.name] = option.value;
            return acc;
          },
          {}
        );
        const variantKey = Object.values(selectedCombination).join("-");
        acc[variantKey] = variant.quantity > 0 ? "In stock" : "Out of stock";
        return acc;
      }, {});
      setStockStatus(status);
    }, [combinations]);

    const handleSelect = (optionName, value) => {
      setSelected((prev) => {
        const newSelected = { ...prev, [optionName]: value };
        setTimeout(() => {
          const variantKey = getVariantKey(newSelected);
          const variantId = getVariantId(variantKey);
          const id = productId; // Make dynamic if needed
          const stockQuantity = getStockQuantity(variantKey);
          const stockPrice = getProductPrice(variantKey);

          const variant = combinations.find((comb) => {
            const selectedCombination = comb.selectedOptions.reduce(
              (acc, option) => {
                acc[option.name] = option.value;
                return acc;
              },
              {}
            );
            const key = Object.values(selectedCombination).join("-");
            return key === variantKey;
          });

          const productLink = productSlug;
          const productTitle = `${productName} - ${variant?.title || ""}`;

          // Notify parent component with all required cart data
          onSelectionChange({
            selected: newSelected,
            variantId,
            productId,
            stockQuantity,
            stockPrice,
            productLink,
            productTitle,
            variantDetails: variant || null, // full variant object if needed
          });
        }, 0);

        return newSelected;
      });
    };

    const getProductPrice = (variantKey) => {
      const variant = combinations.find((comb) => {
        const selectedCombination = comb.selectedOptions.reduce(
          (acc, option) => {
            acc[option.name] = option.value;
            return acc;
          },
          {}
        );
        const key = Object.values(selectedCombination).join("-");
        return key === variantKey;
      });
      return variant ? variant.price : 0; // Return the price of the selected variant
    };

    const getStockQuantity = (variantKey) => {
      const variant = combinations.find((comb) => {
        const selectedCombination = comb.selectedOptions.reduce(
          (acc, option) => {
            acc[option.name] = option.value;
            return acc;
          },
          {}
        );
        const key = Object.values(selectedCombination).join("-");
        return key === variantKey;
      });
      return variant ? variant.quantity : 0; // Return the quantity of the selected variant
    };

    const getVariantKey = (selectedOptions) => {
      return Object.values(selectedOptions).join("-");
    };

    const getVariantId = (variantKey) => {
      const variant = combinations.find((comb) => {
        const selectedCombination = comb.selectedOptions.reduce(
          (acc, option) => {
            acc[option.name] = option.value;
            return acc;
          },
          {}
        );
        const key = Object.values(selectedCombination).join("-");
        return key === variantKey;
      });
      return variant ? variant.id : null;
    };

    const variantKey = getVariantKey(selected);
    const currentStockStatus = stockStatus[variantKey];

    return (
      <div className="mt-6">
        {options.map((option) => (
          <div key={option.name} className="mb-4">
            <div className="text-sm font-medium text-gray-800 dark:text-white mb-2">
              {option.name}:
            </div>
            <div className="flex gap-2">
              {option.values.map((value) => {
                const isSelected = selected[option.name] === value;
                const isOutOfStock =
                  stockStatus[variantKey] === "Out of stock" &&
                  selected[option.name] === value;

                return (
                  <button
                    key={value}
                    onClick={() => handleSelect(option.name, value)}
                    className={`px-4 py-1 border rounded text-sm font-medium ${
                      isSelected
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300"
                    } ${isOutOfStock ? "bg-gray-200 text-gray-500" : ""}`}
                    disabled={isOutOfStock}
                  >
                    {value}
                    {isOutOfStock && (
                      <span className="ml-2 text-red-500">🛑</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

export default ProductSwatches;

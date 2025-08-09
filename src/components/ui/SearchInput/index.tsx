import styled from "styled-components";
import type { FC, InputHTMLAttributes } from "react";
import { useState, useEffect, useCallback } from "react";

export type SearchInputProps = {
  onSearch: (query: string) => void;
  debounceMs?: number;
  placeholder?: string;
  value?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "onSearch" | "value">;

export const SearchInput: FC<SearchInputProps> = ({
  onSearch,
  debounceMs = 300,
  placeholder = "Search games...",
  value: externalValue,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(externalValue || "");

  useEffect(() => {
    if (externalValue !== undefined) {
      setInputValue(externalValue);
    }
  }, [externalValue]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(inputValue);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [inputValue, onSearch, debounceMs]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleClearClick = useCallback(() => {
    setInputValue("");
  }, []);

  return (
    <InputWrapper role="search">
      <SearchIcon 
        className="pi pi-search" 
        aria-hidden="true"
      />
      <StyledInput
        {...props}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        role="searchbox"
        aria-label="Search games"
        aria-describedby={inputValue ? "search-clear-button" : undefined}
      />
      {inputValue && (
        <ClearButton
          type="button"
          onClick={handleClearClick}
          aria-label="Clear search input"
          id="search-clear-button"
        >
          <i className="pi pi-times" aria-hidden="true" />
        </ClearButton>
      )}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchIcon = styled.i`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  z-index: 1;
  pointer-events: none;
`;

const StyledInput = styled.input`
  width: 100%;
  height: ${({ theme }) => theme.dimensions.buttons.button.minHeight};
  padding: ${({ theme }) =>
    `${theme.spacing.md} ${theme.spacing.xxl} ${theme.spacing.md} ${theme.spacing.xxl}`};
  background: ${({ theme }) => theme.colors.background.input};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  transition: ${({ theme }) => theme.transitions.fast};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.primary}80;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  background: transparent;
  border: none;
  padding: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  transition: ${({ theme }) => theme.transitions.fast};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text.active};
    transform: ${({ theme }) => theme.transforms.regularUpScale};
  }
`;

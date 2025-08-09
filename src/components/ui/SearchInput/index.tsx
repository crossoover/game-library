import type { FC, InputHTMLAttributes } from "react";
import { useState, useEffect, useCallback } from "react";
import { InputWrapper, SearchIcon, StyledInput, ClearButton } from "./styles";

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


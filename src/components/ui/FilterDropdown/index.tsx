import styled from "styled-components";
import type { FC } from "react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { PROVIDERS, TAGS } from "../../../constants/filters";
import { Typography } from "../Typography";

export type FilterOption = {
  value: string;
  label: string;
};

export type FilterDropdownProps = {
  options: FilterOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  label?: string;
};

export const FilterDropdown: FC<FilterDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );

  const allOptions = useMemo(
    () =>
      value ? [{ value: "", label: "Clear selection" }, ...options] : options,
    [value, options]
  );

  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const handleOptionClick = useCallback(
    (optionValue: string) => {
      onChange(optionValue === value ? null : optionValue);
      setIsOpen(false);
      buttonRef.current?.focus();
    },
    [onChange, value]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen) {
        if (
          event.key === "Enter" ||
          event.key === " " ||
          event.key === "ArrowDown"
        ) {
          event.preventDefault();
          setIsOpen(true);
          setFocusedIndex(0);
        }
        return;
      }

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
          break;
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) =>
            prev < allOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (focusedIndex >= 0) {
            const selectedOption = allOptions[focusedIndex];
            handleOptionClick(selectedOption.value);
          }
          break;
        case "Home":
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case "End":
          event.preventDefault();
          setFocusedIndex(allOptions.length - 1);
          break;
      }
    },
    [isOpen, allOptions, focusedIndex, handleOptionClick, buttonRef]
  );

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        $isOpen={isOpen}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label ? `${label} filter` : "Filter dropdown"}
      >
        <Typography variant="span" size="sm">
          {selectedOption ? label + ": " + selectedOption.label : placeholder}
        </Typography>
        <DropdownIcon
          className={`pi pi-chevron-${isOpen ? "up" : "down"}`}
          $isOpen={isOpen}
        />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu role="listbox" aria-label={`${label} options`}>
          {allOptions.map((option, index) => (
            <DropdownOption
              key={option.value || "clear"}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              $isSelected={option.value === value}
              $isFocused={index === focusedIndex}
              role="option"
              aria-selected={option.value === value}
            >
              {option.value === "" ? (
                <ClearOptionWrapper>
                  <Typography variant="span" size="sm">
                    {option.label}
                  </Typography>
                </ClearOptionWrapper>
              ) : (
                <Typography variant="span" size="sm">
                  {option.label}
                </Typography>
              )}
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export const ProvidersDropdown: FC<Omit<FilterDropdownProps, "options">> = (
  props
) => <FilterDropdown {...props} options={PROVIDERS} />;

export const TagsDropdown: FC<Omit<FilterDropdownProps, "options">> = (
  props
) => <FilterDropdown {...props} options={TAGS} />;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  min-width: 230px;
  height: ${({ theme }) => theme.dimensions.buttons.button.minHeight};
  padding: ${({ theme }) =>
    `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.background.input};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.text.active};
    outline-offset: 2px;
  }

  span {
    text-align: left;
    flex: 1;
  }

  @media screen and (max-width: 550px) {
    min-width: 100%;

    span {
      font-size: ${({ theme }) => theme.typography.fontSizes.xs} !important;
    }
  }
`;

const DropdownIcon = styled.i<{ $isOpen: boolean }>`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  transition: ${({ theme }) => theme.transitions.fast};
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.xs});
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background.input};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownOption = styled.button<{
  $isSelected: boolean;
  $isFocused: boolean;
}>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  background: ${({ theme, $isSelected, $isFocused }) => {
    if ($isSelected) return theme.colors.background.button;
    if ($isFocused) return `${theme.colors.background.button}40`;
    return "transparent";
  }};
  border: none;
  text-align: left;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  outline: none;

  &:hover {
    background: ${({ theme, $isSelected }) =>
      $isSelected
        ? theme.colors.background.button
        : `${theme.colors.background.button}20`};
  }

  @media screen and (max-width: 550px) {
    span {
      font-size: ${({ theme }) => theme.typography.fontSizes.xs} !important;
    }
  }
`;

const ClearOptionWrapper = styled.span`
  font-style: italic;
  opacity: 0.8;
`;

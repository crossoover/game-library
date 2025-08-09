import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "../../../test/test-utils";
import { SearchInput } from "./index";

describe("SearchInput", () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with default placeholder", () => {
    render(<SearchInput onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText("Search games...")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(<SearchInput onSearch={mockOnSearch} placeholder="Find a game" />);
    expect(screen.getByPlaceholderText("Find a game")).toBeInTheDocument();
  });

  it("renders search icon", () => {
    render(<SearchInput onSearch={mockOnSearch} />);
    expect(document.querySelector(".pi-search")).toBeInTheDocument();
  });

  it("calls onSearch after debounce delay", async () => {
    render(<SearchInput onSearch={mockOnSearch} debounceMs={300} />);
    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "test search" } });

    expect(mockOnSearch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(mockOnSearch).toHaveBeenCalledWith("test search");
  });

  it("debounces multiple rapid changes", async () => {
    render(<SearchInput onSearch={mockOnSearch} debounceMs={300} />);
    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "test" } });

    vi.advanceTimersByTime(299);
    expect(mockOnSearch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  it("shows clear button when input has value", () => {
    render(<SearchInput onSearch={mockOnSearch} />);
    const input = screen.getByRole("searchbox");

    expect(
      screen.queryByLabelText("Clear search input")
    ).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "test" } });
    expect(screen.getByLabelText("Clear search input")).toBeInTheDocument();
  });

  it("clears input when clear button is clicked", () => {
    render(<SearchInput onSearch={mockOnSearch} />);
    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "test search" } });
    expect(input).toHaveValue("test search");

    const clearButton = screen.getByLabelText("Clear search input");
    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
  });

  it("calls onSearch with empty string when cleared", () => {
    render(<SearchInput onSearch={mockOnSearch} debounceMs={100} />);
    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "test" } });
    vi.advanceTimersByTime(100);

    const clearButton = screen.getByLabelText("Clear search input");
    fireEvent.click(clearButton);
    vi.advanceTimersByTime(100);

    expect(mockOnSearch).toHaveBeenLastCalledWith("");
  });

  it("updates input value when external value prop changes", () => {
    const { rerender } = render(
      <SearchInput onSearch={mockOnSearch} value="initial" />
    );
    const input = screen.getByRole("searchbox");

    expect(input).toHaveValue("initial");

    rerender(<SearchInput onSearch={mockOnSearch} value="updated" />);
    expect(input).toHaveValue("updated");
  });

  it("has proper accessibility attributes", () => {
    render(<SearchInput onSearch={mockOnSearch} />);
    const input = screen.getByRole("searchbox");
    const searchWrapper = screen.getByRole("search");

    expect(input).toHaveAttribute("aria-label", "Search games");
    expect(searchWrapper).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "test" } });
    const clearButton = screen.getByLabelText("Clear search input");
    expect(clearButton).toHaveAttribute("id", "search-clear-button");
    expect(input).toHaveAttribute("aria-describedby", "search-clear-button");
  });
});

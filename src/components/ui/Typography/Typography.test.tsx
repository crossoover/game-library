import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/test-utils'
import { Typography } from './index'

describe('Typography', () => {
  it('renders children correctly', () => {
    render(<Typography>Hello World</Typography>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders with default span variant', () => {
    render(<Typography>Default text</Typography>)
    const element = screen.getByText('Default text')
    expect(element.tagName.toLowerCase()).toBe('span')
  })

  it('renders with h1 variant', () => {
    render(<Typography variant="h1">Heading 1</Typography>)
    const element = screen.getByText('Heading 1')
    expect(element.tagName.toLowerCase()).toBe('h1')
  })

  it('renders with h2 variant', () => {
    render(<Typography variant="h2">Heading 2</Typography>)
    const element = screen.getByText('Heading 2')
    expect(element.tagName.toLowerCase()).toBe('h2')
  })

  it('renders with p variant', () => {
    render(<Typography variant="p">Paragraph text</Typography>)
    const element = screen.getByText('Paragraph text')
    expect(element.tagName.toLowerCase()).toBe('p')
  })

  it('applies custom size prop', () => {
    render(<Typography size="lg">Large text</Typography>)
    const element = screen.getByText('Large text')
    expect(element).toBeInTheDocument()
  })

  it('applies custom weight prop', () => {
    render(<Typography weight="bold">Bold text</Typography>)
    const element = screen.getByText('Bold text')
    expect(element).toBeInTheDocument()
  })

  it('combines variant, size, and weight props', () => {
    render(
      <Typography variant="h3" size="xl" weight="semibold">
        Custom heading
      </Typography>
    )
    const element = screen.getByText('Custom heading')
    expect(element.tagName.toLowerCase()).toBe('h3')
    expect(element).toBeInTheDocument()
  })
})
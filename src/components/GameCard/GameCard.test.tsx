import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/test-utils'
import { GameCard } from './index'
import type { Game } from '../../types/games'

// Mock the gameImages module
vi.mock('../../constants/gameImages', () => ({
  getGameImage: vi.fn(() => 'https://example.com/game-image.jpg')
}))

describe('GameCard', () => {
  const mockGame: Game = {
    id: '1',
    title: 'Test Game',
    slug: 'test-game',
    thumbnail: 'test-thumbnail.jpg',
    type: 'slots',
    provider: {
      id: 'provider1',
      name: 'Test Provider'
    },
    tags: ['Action', 'Adventure', 'RPG']
  }

  const mockGameWithoutTags: Game = {
    id: '2',
    title: 'Simple Game',
    slug: 'simple-game',
    thumbnail: 'simple-thumbnail.jpg',
    type: 'table',
    provider: {
      id: 'provider2',
      name: 'Simple Provider'
    }
  }

  it('renders game title and provider name', () => {
    render(<GameCard game={mockGame} />)
    
    expect(screen.getByText('Test Game')).toBeInTheDocument()
    expect(screen.getByText('Test Provider')).toBeInTheDocument()
  })

  it('renders game image with proper alt text', () => {
    render(<GameCard game={mockGame} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'Test Game game thumbnail')
    expect(image).toHaveAttribute('src', 'https://example.com/game-image.jpg')
  })

  it('displays first two tags when available', () => {
    render(<GameCard game={mockGame} />)
    
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Adventure')).toBeInTheDocument()
    expect(screen.getByText('+1')).toBeInTheDocument() // +1 for remaining tag
  })

  it('does not display tags container when no tags', () => {
    render(<GameCard game={mockGameWithoutTags} />)
    
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<GameCard game={mockGame} />)
    
    const card = screen.getByTestId('game-card-1')
    expect(card).toHaveAttribute('role', 'button')
    expect(card).toHaveAttribute('tabIndex', '0')
    expect(card).toHaveAttribute('aria-label', 
      'Play Test Game by Test Provider. Tags: Action, Adventure, RPG')
    expect(card).toHaveAttribute('aria-describedby', 'game-description-1')
  })

  it('has visually hidden description for screen readers', () => {
    render(<GameCard game={mockGame} />)
    
    const description = document.getElementById('game-description-1')
    expect(description).toBeInTheDocument()
    expect(description).toHaveTextContent(
      'Test Game is a slots game by Test Provider. Tagged as: Action, Adventure, RPG.Press Enter or Space to play this game.'
    )
  })

  it('handles keyboard interaction - Enter key', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<GameCard game={mockGame} />)
    
    const card = screen.getByTestId('game-card-1')
    fireEvent.keyDown(card, { key: 'Enter' })
    
    expect(consoleSpy).toHaveBeenCalledWith('Launch game: Test Game')
    consoleSpy.mockRestore()
  })

  it('handles keyboard interaction - Space key', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<GameCard game={mockGame} />)
    
    const card = screen.getByTestId('game-card-1')
    fireEvent.keyDown(card, { key: ' ' })
    
    expect(consoleSpy).toHaveBeenCalledWith('Launch game: Test Game')
    consoleSpy.mockRestore()
  })

  it('ignores other key presses', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<GameCard game={mockGame} />)
    
    const card = screen.getByTestId('game-card-1')
    fireEvent.keyDown(card, { key: 'Tab' })
    
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('renders correctly with game that has many tags', () => {
    const gameWithManyTags: Game = {
      ...mockGame,
      tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5']
    }
    
    render(<GameCard game={gameWithManyTags} />)
    
    expect(screen.getByText('Tag1')).toBeInTheDocument()
    expect(screen.getByText('Tag2')).toBeInTheDocument()
    expect(screen.getByText('+3')).toBeInTheDocument() // +3 for remaining tags
  })

  it('renders correctly with game that has exactly two tags', () => {
    const gameWithTwoTags: Game = {
      ...mockGame,
      tags: ['Tag1', 'Tag2']
    }
    
    render(<GameCard game={gameWithTwoTags} />)
    
    expect(screen.getByText('Tag1')).toBeInTheDocument()
    expect(screen.getByText('Tag2')).toBeInTheDocument()
    expect(screen.queryByText(/^\+\d/)).not.toBeInTheDocument() // No +N text
  })

  it('has proper ARIA labels for tags', () => {
    render(<GameCard game={mockGame} />)
    
    const tagsContainer = screen.getByRole('list')
    expect(tagsContainer).toHaveAttribute('aria-label', 'Game tags: Action, Adventure, RPG')
    
    const tagItems = screen.getAllByRole('listitem')
    expect(tagItems[0]).toHaveAttribute('aria-label', 'Tag: Action')
    expect(tagItems[1]).toHaveAttribute('aria-label', 'Tag: Adventure')
    expect(tagItems[2]).toHaveAttribute('aria-label', 'Tag: Additional')
  })
})
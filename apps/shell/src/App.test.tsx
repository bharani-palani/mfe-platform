import { describe, it, expect, vi } from 'vitest'
import * as store from '@repo/store'

vi.mock('ledgerelyApp/Dashboard', () => ({
  default: () => <div>Mock Dashboard</div>,
}))

// Mock fetch for API call
globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, title: 'Test Todo 1', completed: true },
        { id: 2, title: 'Test Todo 2', completed: false },
      ]),
  }),
) as unknown as typeof fetch

import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from './App'
import { Suspense } from 'react'

describe('App Component', () => {
  it('renders the main heading', () => {
    render(
      <Suspense fallback="Loading...">
        <App />
      </Suspense>,
    )

    expect(
      screen.getByRole('heading', {
        name: /Vite \+ federation \+ tailwind \+ zustand \+ Tanstack router \+ Vitest/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the UI section heading', () => {
    render(<App />)
    expect(screen.getByText('Loaded UI from packages')).toBeInTheDocument()
  })

  it('renders all three buttons with correct text', () => {
    render(<App />)
    expect(screen.getByText('Click 1')).toBeInTheDocument()
    expect(screen.getByText('Click 2')).toBeInTheDocument()
    expect(screen.getByText('Click 3')).toBeInTheDocument()
  })

  it('renders Zustand section and user', () => {
    render(<App />)
    expect(screen.getByText('Loaded Zustand from packages')).toBeInTheDocument()
    expect(screen.getByText(/User:/)).toBeInTheDocument()
  })

  it('renders Login and Logout buttons', () => {
    render(<App />)
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('calls setUser when Login is clicked', () => {
    const setUser = vi.fn()
    vi.spyOn(store, 'userStore').mockImplementation((fn: any) =>
      fn({
        user: 'TestUser',
        setUser,
        logout: vi.fn(),
      }),
    )
    render(<App />)
    fireEvent.click(screen.getByText('Login'))
    expect(setUser).toHaveBeenCalledWith('Bharani')
  })

  it('calls logout when Logout is clicked', () => {
    const logout = vi.fn()
    vi.spyOn(store, 'userStore').mockImplementation((fn: any) =>
      fn({
        user: 'TestUser',
        setUser: vi.fn(),
        logout,
      }),
    )
    render(<App />)
    fireEvent.click(screen.getByText('Logout'))
    expect(logout).toHaveBeenCalled()
  })

  it('renders the MFE section and Dashboard', async () => {
    render(<App />)
    expect(screen.getByText('Loaded components from MFE')).toBeInTheDocument()
    expect(await screen.findByText('Mock Dashboard')).toBeInTheDocument()
  })

  it('shows loading indicator while fetching API data', async () => {
    render(<App />)
    expect(screen.getAllByText('Loading...')[0]).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument(),
    )
  })

  it('renders API call section and fetched todos', async () => {
    render(<App />)
    expect(screen.getByText('API call')).toBeInTheDocument()
    expect(await screen.findByText('Test Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument()
  })

  it('renders alternating background colors for todos', async () => {
    render(<App />)
    const items = await screen.findAllByRole('listitem')
    expect(items[0].className).toContain('bg-gray-100')
    expect(items[1].className).toContain('bg-white')
  })

  it('renders checkmark for completed and cross for incomplete todos', async () => {
    render(<App />)
    const items = await screen.findAllByRole('listitem')
    expect(items[0]).toHaveTextContent('✓')
    expect(items[1]).toHaveTextContent('✗')
  })

  it('calls alert when Click 3 is pressed', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<App />)
    fireEvent.click(screen.getByText('Click 3'))
    expect(alertSpy).toHaveBeenCalledWith('i am button 3')
    alertSpy.mockRestore()
  })
})

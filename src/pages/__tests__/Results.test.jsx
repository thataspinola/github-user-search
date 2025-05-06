import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Results } from '../Results'

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes('/users/')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            login: 'octocat',
            name: 'Octocat',
            bio: 'Mascote do GitHub',
            location: 'Internet',
            followers: 42,
            following: 99,
            avatar_url: 'https://github.com/images/error/octocat_happy.gif',
            html_url: 'https://github.com/octocat'
          })
      })
    }

    if (url.includes('/repos')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, name: 'aaa', stargazers_count: 30 },
            { id: 2, name: 'zzz', stargazers_count: 10 }
          ])
      })
    }

    return Promise.reject(new Error('not found'))
  })
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('Results page', () => {
  it('deve exibir dados do usuário e repositórios', async () => {
    render(
      <MemoryRouter initialEntries={['/results/octocat']}>
        <Routes>
          <Route path="/results/:username" element={<Results />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/carregando/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Octocat')).toBeInTheDocument()
      expect(screen.getByText('repo-a')).toBeInTheDocument()
      expect(screen.getByText('repo-b')).toBeInTheDocument()
    })
  })

  it('deve exibir erro se o usuário não for encontrado', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 404 })
    )

    render(
      <MemoryRouter initialEntries={['/results/usuario_inexistente']}>
        <Routes>
          <Route path="/results/:username" element={<Results />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/usuário não encontrado/i)).toBeInTheDocument()
    })
  })

  it('deve ordenar repositórios por nome ascendente', async () => {
    render(
      <MemoryRouter initialEntries={['/results/octocat']}>
        <Routes>
          <Route path="/results/:username" element={<Results />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('aaa')).toBeInTheDocument()
      expect(screen.getByText('zzz')).toBeInTheDocument()
    })

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'name_desc' }
    })

    const items = screen.getAllByRole('heading', { level: 3 })
    expect(items[0]).toHaveTextContent('zzz')
    expect(items[1]).toHaveTextContent('aaa')
  })
})

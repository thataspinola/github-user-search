import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { RepoDetails } from '../RepoDetails'

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes('/repos/octocat/repo-a')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            full_name: 'octocat/repo-a',
            description: 'Repositório de testes',
            stargazers_count: 42,
            language: 'JavaScript',
            private: false,
            created_at: '2022-01-01T00:00:00Z',
            pushed_at: '2022-03-01T00:00:00Z',
            html_url: 'https://github.com/octocat/repo-a'
          })
      })
    }

    return Promise.reject(new Error('not found'))
  })
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('RepoDetails page', () => {
  it('deve exibir os dados do repositório', async () => {
    render(
      <MemoryRouter initialEntries={['/results/octocat/repos/repo-a']}>
        <Routes>
          <Route path="/results/:username/repos/:repoName" element={<RepoDetails />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/octocat\/repo-a/i)).toBeInTheDocument()
      expect(screen.getByText(/repositório de testes/i)).toBeInTheDocument()
      expect(screen.getByText(/JavaScript/i)).toBeInTheDocument()
    })
  })

  it('deve exibir erro se o repositório não existir', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 404 })
    )

    render(
      <MemoryRouter initialEntries={['/results/octocat/repos/not-found']}>
        <Routes>
          <Route path="/results/:username/repos/:repoName" element={<RepoDetails />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/repositório não encontrado/i)).toBeInTheDocument()
    })
  })
})

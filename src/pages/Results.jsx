import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './Results.module.scss'

export function Results() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [repos, setRepos] = useState([])
  const [sortBy, setSortBy] = useState('stars_desc')

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`https://api.github.com/users/${username}`)

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Usuário não encontrado.')
          } else {
            throw new Error('Erro ao buscar dados.')
          }
        }

        const data = await res.json()
        setUser(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [username])

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos`)
        if (!res.ok) throw new Error('Erro ao buscar repositórios.')

        const data = await res.json()
        setRepos(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchRepos()
  }, [username])

  function getSortedRepos() {
    return [...repos].sort((a, b) => {
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name)
      if (sortBy === 'stars_asc') return a.stargazers_count - b.stargazers_count
      if (sortBy === 'stars_desc') return b.stargazers_count - a.stargazers_count
      return 0
    })
  }

  if (loading) return <p>Carregando...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!user) return null

  return (
    <div className={styles.resultsContainer}>
      <img src={user.avatar_url} alt={`Avatar de ${user.login}`} />
      <h2>{user.name || 'Sem nome'}</h2>
      <p><strong>Usuário:</strong> {user.login}</p>
      <p><strong>Bio:</strong> {user.bio || 'Sem descrição'}</p>
      <p><strong>Localização:</strong> {user.location || 'Desconhecida'}</p>
      <p><strong>Seguidores:</strong> {user.followers}</p>
      <p><strong>Seguindo:</strong> {user.following}</p>
      <a href={user.html_url} target="_blank" rel="noreferrer">Ver perfil completo</a>

      <div className={styles.sortOptions}>
        <label>Ordenar por:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="stars_desc">Estrelas ↓</option>
          <option value="stars_asc">Estrelas ↑</option>
          <option value="name_asc">Nome A-Z</option>
          <option value="name_desc">Nome Z-A</option>
        </select>
      </div>

      <ul className={styles.repoList}>
        {getSortedRepos().map((repo) => (
          <li key={repo.id}>
            <h3>
              <Link to={`/results/${username}/repos/${repo.name}`}>
                {repo.name}
              </Link>
            </h3>
            <p>{repo.description || 'Sem descrição'}</p>
            <span>⭐ {repo.stargazers_count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

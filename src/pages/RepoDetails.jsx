import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './RepoDetails.module.scss'

export function RepoDetails() {
  const { username, repoName } = useParams()
  const [repo, setRepo] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRepo() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
        if (!res.ok) throw new Error('Repositório não encontrado.')

        const data = await res.json()
        setRepo(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepo()
  }, [username, repoName])

  if (loading) return <p>Carregando...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!repo) return null

  return (
    <div className={styles.repoContainer}>
      <h1>{repo.full_name}</h1>
      <p>{repo.description || 'Sem descrição'}</p>

      <ul>
        <li><strong>Estrelas:</strong> ⭐ {repo.stargazers_count}</li>
        <li><strong>Linguagem:</strong> {repo.language || 'Não informada'}</li>
        <li><strong>Privado:</strong> {repo.private ? 'Sim' : 'Não'}</li>
        <li><strong>Criado em:</strong> {new Date(repo.created_at).toLocaleDateString()}</li>
        <li><strong>Último push:</strong> {new Date(repo.pushed_at).toLocaleDateString()}</li>
      </ul>

      <a href={repo.html_url} target="_blank" rel="noreferrer">
        Ver no GitHub
      </a>

      <br />
      <Link to={`/results/${username}`}>← Voltar aos repositórios</Link>
    </div>
  )
}

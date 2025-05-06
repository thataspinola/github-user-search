import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (username.trim()) {
      navigate(`/results/${username}`)
    } else {
      alert('Digite um nome de usuário válido')
    }
  }

  return (
    <div className="home-container">
      <h1>Buscar Usuário do GitHub</h1>
      <input
        type="text"
        placeholder="Digite o nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}
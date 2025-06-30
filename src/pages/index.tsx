import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const IndexPage = () => {
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()
  useEffect(() => {
      navigate('/home')
  }, [navigate, isAuthenticated])

  return null
}

export default IndexPage
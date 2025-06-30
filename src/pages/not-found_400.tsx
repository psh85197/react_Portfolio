import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">400</h1>
      <p className="mb-4">페이지를 찾을 수 없습니다</p>
      <button 
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-main text-white rounded"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};
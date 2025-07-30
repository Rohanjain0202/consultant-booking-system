  import { useNavigate } from 'react-router-dom';
  import { useEffect } from 'react';

  const CustomerDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
      navigate('/customer/home');
    }, [navigate]);

    return null;
  };

  export default CustomerDashboard;

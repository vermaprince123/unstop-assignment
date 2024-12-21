const loginUser = async (credentials) => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...credentials,
        expiresInMins: 30
      }),
    });
  
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Login failed');
    }
  };
  
  export { loginUser };
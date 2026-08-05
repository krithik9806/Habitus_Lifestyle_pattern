export const isAuthenticated = () => {
  try {
    return localStorage.getItem('currentUser') !== null;
  } catch (error) {
    return false;
  }
};

export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    return null;
  }
};

export const setCurrentUser = (email) => {
  localStorage.setItem('currentUser', JSON.stringify({ email }));
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const registerUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userExists = users.find(u => u.email === email);
  
  if (userExists) {
    return { success: false, message: 'User already exists' };
  }
  
  users.push({ email, password });
  localStorage.setItem('users', JSON.stringify(users));
  return { success: true };
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    return { success: true };
  }
  
  return { success: false, message: 'Invalid email or password' };
};


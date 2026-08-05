export const getUserData = (email) => {
  try {
    const allData = JSON.parse(localStorage.getItem('userData') || '{}');
    return allData[email] || null;
  } catch (error) {
    return null;
  }
};

export const saveUserData = (email, data) => {
  const allData = JSON.parse(localStorage.getItem('userData') || '{}');
  allData[email] = { ...allData[email], ...data };
  localStorage.setItem('userData', JSON.stringify(allData));
};

export const getCurrentUserData = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser) return null;
  return getUserData(currentUser.email);
};


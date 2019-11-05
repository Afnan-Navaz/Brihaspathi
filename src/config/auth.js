import {req} from './http';

export const login = (id, pin) => {
  req(`https://alfred-jhyf6iaxsq-an.a.run.app/api/excel_id/?excel_id=${id}`)
  .then(data => {
    console.log(data[0].pin);
    if(data[0].pin === parseInt(pin)){
      localStorage.setItem('excelId', id);
      window.location.href = '/';
    }
  });
  
};

export const logout = history => {
  localStorage.removeItem('excelId');
  history.push('/login');
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('excelId');
};

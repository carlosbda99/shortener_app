import {API} from "../Config/Api";

const TOKEN_KEY: string = "@shortener_token";

const checkValidToken = async (): Promise<boolean> => {
  let validToken: boolean = false;

  await fetch(`${API}/auth/logged`,{
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${getToken()}`
    })
  }).then( res => {
    if (res.ok) {validToken = true;}
    else {logout();}
  });

  return validToken;
} ;

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const isAuthenticated = (): boolean => {
  const tokenSaved: boolean = localStorage.getItem(TOKEN_KEY) !== null;
  let validToken: any = false;

  if (tokenSaved) {
    validToken = checkValidToken();
  }

  return (tokenSaved && validToken);
};

export const login = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};


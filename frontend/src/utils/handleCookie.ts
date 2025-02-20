import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setCookie = (name: string, value: string, type: 'AT' | 'RT') => {
  return cookies.set(name, value, {
    path: '/',
    secure: true,
    maxAge: type === 'AT' ? 60 * 30 : 60 * 60 * 24 * 7, // AT는 만료 시간 30분, RT는 7일로 설정
  })
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}

export const removeCookie = (name: string) => {
  return cookies.remove(name, { path: '/' })
}

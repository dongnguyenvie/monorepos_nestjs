import { useEffect, useMemo } from 'react'
import { useSigninMutation } from 'graphql/autogenerated'
import { useMeStore } from 'app/redux/user'
import { SigninPageProps } from '.'
import { ACCESS_TOKEN_KEY } from 'utils/constants'

export function useSignIn(props: SigninPageProps) {
  const { onInjectMe, refreshMe } = useMeStore()
  const [handleSignin, { data, loading, error }] = useSigninMutation({ onError: () => {} })

  const isSigninSuccessfully = useMemo(() => {
    return { loading: loading, error: error, data: data }
  }, [data, loading, error])

  useEffect(() => {
    if (!loading && !error && data) {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.signin.token)
      onInjectMe({ ...data!.signin })
    }
  }, [data, loading, error, onInjectMe])

  return {
    handleSignin,
    isSigninSuccessfully,
  }
}

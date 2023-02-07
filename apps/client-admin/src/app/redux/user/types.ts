import { MeOutput } from 'graphql/autogenerated'
export interface IMe extends Partial<Pick<MeOutput, 'id' | 'username' | 'sub' | 'scp'>> {
  loadingMeData: boolean
  isFetch: boolean
  email: string
}

export type IContainerState = IMe

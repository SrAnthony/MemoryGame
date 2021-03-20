import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type HomeStackParamList = {
  Home: undefined,
  Ranking: undefined,
  Game: undefined,
  Login: undefined,
}

type FullModalStackParamList = {
  HomeNavigator: NavigatorScreenParams<HomeStackParamList>,
  AvatarSelector: undefined,
}

type FullModalRouteType<T extends keyof FullModalStackParamList> = RouteProp<FullModalStackParamList,
  T>

type HomeRouteType<T extends keyof HomeStackParamList> = RouteProp<HomeStackParamList,
  T>

type FullModalNavigationType<T extends keyof FullModalStackParamList> = CompositeNavigationProp<StackNavigationProp<FullModalStackParamList, T>,
  StackNavigationProp<HomeStackParamList>>

type HomeNavigationType<T extends keyof HomeStackParamList> = CompositeNavigationProp<StackNavigationProp<HomeStackParamList, T>,
  StackNavigationProp<FullModalStackParamList>>

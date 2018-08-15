module Model exposing (Model,User,Input)

import Navigation

type alias User = {
  id: Int,
  name: String,
  genderCode: String
}

type alias Input = {
  name: String,
  genderCode: String
}

type alias Model =
    { currentRoute : Navigation.Location
    , users: List User
    , user: User
    , input: Input
    }
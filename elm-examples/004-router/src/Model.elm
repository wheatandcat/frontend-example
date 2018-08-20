module Model exposing (Model,User,Input,Flags)

import Navigation

-- Data type for the flags
type alias Flags =
  { host : String
  }

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
    { 
      host: String
    , currentRoute : Navigation.Location
    , users: List User
    , user: User
    , input: Input
    }
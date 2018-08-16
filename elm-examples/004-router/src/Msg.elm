module Msg exposing (Msg(..))

import Model
import Http
import Dict exposing (Dict)
import Navigation


type Msg
    = NoOp
    | UrlChange Navigation.Location
    | NewUsers (Result Http.Error (List Model.User))
    | NewUser (Result Http.Error Model.User)
    | GetUsers (Result Http.Error String)
    | DeleteUser Int
    | ChangeName String
    | ChangeGenderCode String
    | CreateUser String String
    | RedirectToUser (Result Http.Error Model.User)
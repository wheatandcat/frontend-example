module Msg exposing (Msg(..))

import Model
import Http
import Navigation


type Msg
    = NoOp
    | UrlChange Navigation.Location
    | NewUsers (Result Http.Error (List Model.User))
    | GetUsers (Result Http.Error String)
    | DeleteUser Int
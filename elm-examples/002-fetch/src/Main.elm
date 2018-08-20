-- Read more about this program in the official Elm guide:
-- https://guide.elm-lang.org/architecture/effects/http.html

import Html exposing (..)
import Http
import String
import Json.Decode as Decode

-- Data type for the flags
type alias Flags =
  { host : String
  }
  

main =
  Html.programWithFlags
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

-- MODEL
type alias User = {
  id: Int,
  name: String
}


type alias Model =
  { 
    host: String,
    users: List User
  }


init: Flags ->  (Model, Cmd Msg)
init flags =
  ( Model flags.host []
  , getUsers flags.host
  )



-- UPDATE


type Msg
  = NewUsers (Result Http.Error (List User))


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NewUsers (Ok newUsers) ->
      ({model | users = newUsers}, Cmd.none)

    NewUsers (Err _) ->
      (model, Cmd.none)

-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ 
      h3 [] [ text "elm | 002-fetch"]
    , h2 [] [text "users"]
    , ul [] (List.map viewUser model.users)
    ]


viewUser: User -> Html Msg
viewUser u =
    li [] [ text u.name ]


-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- HTTP

getUsers :String -> Cmd Msg
getUsers host =
  let
    url =
      String.concat[host,"/users"]
  in
    Http.send NewUsers (Http.get url decodeUsers)


decodeUser: Decode.Decoder User
decodeUser =
  Decode.map2 User
   (Decode.field "id" Decode.int)
   (Decode.field "name" Decode.string)

decodeUsers : Decode.Decoder (List User)
decodeUsers =
  Decode.list decodeUser
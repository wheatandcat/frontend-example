-- Read more about this program in the official Elm guide:
-- https://guide.elm-lang.org/architecture/effects/http.html

import Html exposing (..)
import Http
import Json.Decode as Decode

main =
  Html.program
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
    users: List User
  }


init : (Model, Cmd Msg)
init =
  ( Model []
  , getUsers
  )



-- UPDATE


type Msg
  = NewUsers (Result Http.Error (List User))


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NewUsers (Ok users) ->
      (Model users, Cmd.none)

    NewUsers (Err _) ->
      (model, Cmd.none)

-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ h2 [] [text "users"]
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

getUsers : Cmd Msg
getUsers =
  let
    url =
      "http://localhost:3000/users"
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
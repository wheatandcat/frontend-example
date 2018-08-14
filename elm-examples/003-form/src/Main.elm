-- Read more about this program in the official Elm guide:
-- https://guide.elm-lang.org/architecture/effects/http.html

import Html exposing (..)
import Http
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)
import Json.Decode as Decode
import Json.Encode as Encode

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
  name: String,
  genderCode: String
}


type alias Model =
  { 
    users: List User,
    name: String,
    genderCode: String
  }


init : (Model, Cmd Msg)
init =
  ( Model [] "" "1"
  , getUsers
  )

-- UPDATE

type Msg
  = NewUsers (Result Http.Error (List User))
  | ChangeName String
  | ChangeGenderCode String
  | CreateUser (Result Http.Error (User))
  | NewUser String String

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NewUsers (Ok users) ->
      (Model users "" "1", Cmd.none)

    NewUsers (Err _) ->
      (model, Cmd.none)

    ChangeName newName ->
      ({model| name = newName}, Cmd.none)

    ChangeGenderCode newGenderCode ->
      ({model| genderCode = newGenderCode}, Cmd.none)
    
    NewUser name genderCode ->
      (model, postUser (User 0 name genderCode))

    CreateUser (Ok _) ->
      (Model [] "" "", getUsers)

    CreateUser (Err _) ->
      (model, Cmd.none)

-- VIEW

view : Model -> Html Msg
view model =
  div [] 
    [ 
      h2 [] [text "form"]
    , span [] [text "名前: "]
    , input [onInput ChangeName] []
    , div []
        [ label []
            [ 
              input [type_ "radio", onClick (ChangeGenderCode "1"), checked (if model.genderCode == "1" then True else False)] []
            , text " 男性 "
            ]
        , label []
            [ input [type_ "radio", onClick (ChangeGenderCode "2"), checked (if model.genderCode == "2" then True else False)] []
            , text " 女性 "
            ]
        ]
    , br [] []
    , button [onClick (NewUser model.name model.genderCode)] [text "登録" ]
    , br [] []
    , br [] []
    , h2 [] [text "users"]
    , table [] 
        ([ thead []
            [ th [] [text "id"]
            , th [] [text "名前"]
            , th [] [text "性別"]
            ]
        ]
        ++ (List.map rowUser model.users)
        )
    ]

rowUser: User -> Html Msg
rowUser u =
    tr [] 
    [ td [] [ text (toString u.id) ]
    , td [] [ text u.name ]
    , td [] [ text (viewGender u.genderCode) ]
    ]

viewGender: String -> String
viewGender genderCode = if genderCode == "1" then "男性" else "女性"


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
  Decode.map3 User
   (Decode.field "id" Decode.int)
   (Decode.field "name" Decode.string)
   (Decode.field "genderCode" Decode.string)
   
decodeUsers : Decode.Decoder (List User)
decodeUsers =
  Decode.list decodeUser

postUser : User -> Cmd Msg
postUser user =
  let
    url =
      "http://localhost:3000/users"
  in
    Http.send CreateUser (Http.post url (Http.jsonBody (encodedUser user)) decodeUser)

encodedUser : User -> Encode.Value
encodedUser user = 
    let
        value =
            [ ( "id", Encode.int user.id )
            , ( "name", Encode.string user.name )
            , ( "genderCode", Encode.string user.genderCode )
            ]
    in
        value
            |> Encode.object
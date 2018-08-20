-- Read more about this program in the official Elm guide:
-- https://guide.elm-lang.org/architecture/effects/http.html

import Html exposing (..)
import Http
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)
import Json.Decode as Decode
import Json.Encode as Encode

main =
  Html.programWithFlags
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

-- Data type for the flags
type alias Flags =
  { host : String
  }

-- MODEL

type alias User = {
  id: Int,
  name: String,
  genderCode: String
}


type alias Model =
  { 
    host: String,
    users: List User,
    name: String,
    genderCode: String
  }


init :Flags -> (Model, Cmd Msg)
init flags =
  ( Model flags.host [] "" "1"
  , getUsers flags.host
  )

-- UPDATE

type Msg
  = NewUsers (Result Http.Error (List User))
  | ChangeName String
  | ChangeGenderCode String
  | GetUsers (Result Http.Error String)
  | CreateUser String String
  | DeleteUser Int

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NewUsers (Ok newUsers) ->
      ({model| users = newUsers}, Cmd.none)

    NewUsers (Err _) ->
      (model, Cmd.none)

    ChangeName newName ->
      ({model| name = newName}, Cmd.none)

    ChangeGenderCode newGenderCode ->
      ({model| genderCode = newGenderCode}, Cmd.none)
    
    CreateUser name genderCode ->
      (model, postUser model.host (User 0 name genderCode))

    DeleteUser id ->
      (model, deleteUser model.host id)

    GetUsers (Ok _) ->
      (model, getUsers model.host)

    GetUsers (Err _) ->
      (model, Cmd.none)

-- VIEW

view : Model -> Html Msg
view model =
  div [] 
    [ 
      h3 [] [ text "elm | 003-form"]
    , h2 [] [text "form"]
    , span [] [text "名前: "]
    , input [onInput ChangeName, value model.name] []
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
    , button [onClick (CreateUser model.name model.genderCode)] [text "登録" ]
    , br [] []
    , br [] []
    , h2 [] [text "users"]
    , table [] 
        ([ thead []
            [ th [] [text "id"]
            , th [] [text "名前"]
            , th [] [text "性別"]
            , th [] [text "アクション"]
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
    , td [] [ 
      button [onClick (DeleteUser u.id)] [text "削除" ]
     ]
    ]

viewGender: String -> String
viewGender genderCode = if genderCode == "1" then "男性" else "女性"


-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

-- HTTP

getUsers : String -> Cmd Msg
getUsers host =
  let
    url =
      host ++ "/users"
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

postUserRequest : String -> User -> Http.Request String
postUserRequest host user =
      Http.request 
        { method = "POST"
        , headers = []
        , url = host++"/users"
        , body = Http.jsonBody (encodedUser user)
        , expect = Http.expectString
        , timeout = Nothing
        , withCredentials = False
        }

postUser : String -> User -> Cmd Msg
postUser host user =
    postUserRequest host user
        |> Http.send GetUsers

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

deleteUserRequest : String -> Int -> Http.Request String
deleteUserRequest host id =
      Http.request 
        { method = "DELETE"
        , headers = []
        , url = host++"/users/"++toString id
        , body = Http.emptyBody
        , expect = Http.expectString
        , timeout = Nothing
        , withCredentials = False
        }

deleteUser : String -> Int -> Cmd Msg
deleteUser host id =
    deleteUserRequest host id
        |> Http.send GetUsers 

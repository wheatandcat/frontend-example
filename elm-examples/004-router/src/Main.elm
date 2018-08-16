module Main exposing (main)

import Http
import View
import Model
import Navigation
import Router
import Dict exposing (Dict)
import Msg exposing (Msg(..))
import Json.Decode as Decode
import Json.Encode as Encode
import String
import UrlParser as Url exposing ((</>), (<?>), s, int, stringParam, top)

main : Program Never Model.Model Msg
main =
    Navigation.program UrlChange
        { view = View.view
        , init = init
        , update = update
        , subscriptions = (\_ -> Sub.none)
        }

----init

init : Navigation.Location -> (Model.Model, Cmd Msg)
init location =
    ( Model.Model location [] (Model.User 0 "" "") (Model.Input "" "1")
    , routerInit location
    )

routerInit: Navigation.Location -> Cmd Msg
routerInit location =
    let
        page = Url.parsePath Router.route location
    in
        case page of
            Nothing ->
                getUsers

            Just route ->
                msgInit route

msgInit route =
  case route of
    Router.UsersRoute -> 
        getUsers

    Router.UserRoute id ->
        getUser id
    
    Router.CreateUserRoute ->
        getUsers

----update

update : Msg -> Model.Model -> (Model.Model, Cmd Msg)
update msg model =
    case msg of
        UrlChange location ->
          ({model | currentRoute = location}, Cmd.none)
        
        NewUsers (Ok resultUsers) ->
          ({model | users = resultUsers}, Cmd.none)

        NewUsers (Err _) ->
          (model, Cmd.none)

        NewUser (Ok resultUser) ->
          ({model | user = resultUser}, Cmd.none)

        NewUser (Err _) ->
          (model, Cmd.none)

        GetUsers (Ok _) ->
          (model, getUsers)

        GetUsers (Err _) ->
          (model, Cmd.none)

        DeleteUser id ->
          (model, deleteUser id)

        ChangeName newName ->
          ({model| input = (Model.Input newName model.input.genderCode)}, Cmd.none)

        ChangeGenderCode newGenderCode ->
          ({model| input = (Model.Input model.input.name newGenderCode)}, Cmd.none)

        CreateUser name genderCode ->
         (model, postUser (Model.User 0 name genderCode))

        RedirectToUser (Ok user) ->
          (model, Navigation.load (String.concat["/users/", (toString user.id)]))

        RedirectToUser (Err _) ->
          (model, Cmd.none)

        NoOp ->
          (model, Cmd.none )

-- HTTP

getUsers : Cmd Msg
getUsers =
  let
    url =
      "http://localhost:3000/users"
  in
    Http.send NewUsers (Http.get url decodeUsers)

getUser : Int -> Cmd Msg
getUser id =
  let
    url =
      String.concat["http://localhost:3000/users/", (toString id)]
  in
    Http.send NewUser (Http.get url decodeUser)


decodeUser: Decode.Decoder Model.User
decodeUser =
  Decode.map3 Model.User
   (Decode.field "id" Decode.int)
   (Decode.field "name" Decode.string)
   (Decode.field "genderCode" Decode.string)
   
decodeUsers : Decode.Decoder (List Model.User)
decodeUsers =
  Decode.list decodeUser

postUserRequest : Model.User -> Http.Request Model.User
postUserRequest user =
      Http.request 
        { method = "POST"
        , headers = []
        , url = "http://localhost:3000/users"
        , body = Http.jsonBody (encodedUser user)
        , expect = Http.expectJson decodeUser
        , timeout = Nothing
        , withCredentials = False
        }

postUser : Model.User -> Cmd Msg
postUser user =
    postUserRequest user
        |> Http.send RedirectToUser 

encodedUser : Model.User -> Encode.Value
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

deleteUserRequest : Int -> Http.Request String
deleteUserRequest id =
      Http.request 
        { method = "DELETE"
        , headers = []
        , url = String.concat ["http://localhost:3000/users/", toString id]
        , body = Http.emptyBody
        , expect = Http.expectString
        , timeout = Nothing
        , withCredentials = False
        }

deleteUser : Int -> Cmd Msg
deleteUser id =
    deleteUserRequest id
        |> Http.send GetUsers 

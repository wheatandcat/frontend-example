module Main exposing (main)

import Http
import View
import Model
import Navigation
import Router
import Msg exposing (Msg(..))
import Json.Decode as Decode
import Json.Encode as Encode
import String
import UrlParser as Url exposing ((</>), (<?>), s, int, stringParam, top)

main : Program Model.Flags Model.Model Msg
main =
    Navigation.programWithFlags UrlChange
        { view = View.view
        , init = init
        , update = update
        , subscriptions = (\_ -> Sub.none)
        }

----init

init : Model.Flags -> Navigation.Location -> (Model.Model, Cmd Msg)
init flags location =
    ( Model.Model flags.host location [] (Model.User 0 "" "") (Model.Input "" "1")
    , routerInit flags.host location
    )

routerInit: String -> Navigation.Location -> Cmd Msg
routerInit host location =
    let
        page = Url.parsePath Router.route location
    in
        case page of
            Nothing ->
                getUsers host

            Just route ->
                msgInit host route

msgInit host route =
  case route of
    Router.UsersRoute -> 
        getUsers host

    Router.UserRoute id ->
        getUser host id
    
    Router.CreateUserRoute ->
        getUsers host

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
          (model, getUsers model.host)

        GetUsers (Err _) ->
          (model, Cmd.none)

        DeleteUser id ->
          (model, deleteUser model.host id)

        ChangeName newName ->
          ({model| input = (Model.Input newName model.input.genderCode)}, Cmd.none)

        ChangeGenderCode newGenderCode ->
          ({model| input = (Model.Input model.input.name newGenderCode)}, Cmd.none)

        CreateUser name genderCode ->
         (model, postUser model.host (Model.User 0 name genderCode))

        RedirectToUser (Ok user) ->
          (model, Navigation.load ("/users/"++(toString user.id)))

        RedirectToUser (Err _) ->
          (model, Cmd.none)

        NoOp ->
          (model, Cmd.none )

-- HTTP

getUsers : String -> Cmd Msg
getUsers host =
  let
    url =
      host++"/users"
  in
    Http.send NewUsers (Http.get url decodeUsers)

getUser : String -> Int -> Cmd Msg
getUser host id =
  let
    url =
      host++"/users/"++(toString id)
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

postUserRequest : String -> Model.User -> Http.Request Model.User
postUserRequest host user =
      Http.request 
        { method = "POST"
        , headers = []
        , url = host++"/users"
        , body = Http.jsonBody (encodedUser user)
        , expect = Http.expectJson decodeUser
        , timeout = Nothing
        , withCredentials = False
        }

postUser : String -> Model.User -> Cmd Msg
postUser host user =
    postUserRequest host user
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

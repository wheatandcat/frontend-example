module View exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)
import Model
import Msg exposing (Msg(..))
import Router
import String
import UrlParser as Url exposing ((</>), (<?>), s, int, stringParam, top)

view : Model.Model -> Html Msg
view model =
    div []
        [ h2 [] [ text "Pages" ]
        , ul [] (List.map viewLink [ "/users", "/createUser" ])
        , pageBody model
        ]

viewLink : String -> Html Msg
viewLink name =
    li [] [ a [ href (name) ] [ text name ] ]

pageBody : Model.Model -> Html Msg
pageBody model =
    let
        page = Url.parsePath Router.route model.currentRoute
    in
        case page of
            Nothing ->
                usersPage model

            Just route ->
                viewPage route model

viewPage route model =
  case route of
    Router.UsersRoute -> 
        usersPage model

    Router.UserRoute id ->
        userPage id
    
    Router.CreateUserRoute ->
        createUserPage

usersPage : Model.Model -> Html Msg
usersPage model =
    div [] [
          h1 [] [ text "users" ]
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

rowUser: Model.User -> Html Msg
rowUser u =
    tr [] 
    [ td [] [ 
       a [ href (String.concat["users/", (toString u.id)])] [ text (toString u.id)]
      ]
      , td [] [ text u.name ]
      , td [] [ text (viewGender u.genderCode) ]
      , td [] [ 
       button [onClick (DeleteUser u.id)] [text "削除" ]
      ]
    ]

viewGender: String -> String
viewGender genderCode = if genderCode == "1" then "男性" else "女性"

userPage : Int -> Html Msg
userPage id =
    div [] [
         h1 [] [ text "user" ]
        ,h2 [] [ text (toString id)]
    ]

createUserPage : Html Msg
createUserPage =
    h1 [] [ text "create user" ]



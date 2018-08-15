module Router exposing (..)
import UrlParser as Url exposing ((</>), (<?>), s, int, stringParam, top)

type Route
    = UsersRoute
    | UserRoute Int
    | CreateUserRoute

route : Url.Parser (Route -> a) a
route =
  Url.oneOf
    [ Url.map UsersRoute top
    , Url.map UserRoute (Url.s "users" </> int)
    , Url.map CreateUserRoute (Url.s "createUser")  
    ]
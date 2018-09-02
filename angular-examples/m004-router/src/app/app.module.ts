import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from ".//app-routing.module";
import { UsersComponent } from "./users/users.component";
import { CreateUserComponent } from "./create-user/create-user.component";
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [AppComponent, UsersComponent, CreateUserComponent, UserComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

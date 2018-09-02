import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

interface UserType {
  id: number;
  name: string;
  genderCode: string;
}

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users: UserType[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<UserType[]>(`${environment.host}/users`).subscribe(data => {
      this.users = data;
    });
  }

  onDelete(id: number) {
    this.http
      .delete<UserType>(`${environment.host}/users/${id}`)
      .subscribe(_ => {
        this.getUsers();
      });
  }
}

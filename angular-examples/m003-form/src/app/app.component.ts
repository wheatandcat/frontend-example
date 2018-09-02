import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { User } from "./user";

interface UserType {
  id: number;
  name: string;
  genderCode: string;
}

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  users: UserType[];

  model = new User("", 1);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<UserType[]>(`${environment.host}/users`).subscribe(data => {
      this.users = data;
    });
  }

  onCreate() {
    this.http
      .post<UserType>(
        `${environment.host}/users`,
        {
          name: this.model.name,
          genderCode: String(this.model.genderCode)
        },
        httpOptions
      )
      .subscribe(_ => {
        this.model = new User("", 1);
        this.getUsers();
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

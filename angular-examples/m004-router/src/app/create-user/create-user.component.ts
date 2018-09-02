import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { User } from "./user";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

interface UserType {
  id: number;
  name: string;
  genderCode: string;
}

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"]
})
export class CreateUserComponent implements OnInit {
  model = new User("", 1);

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {}

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
      .subscribe(data => {
        this.model = new User("", 1);
        this.router.navigate(["/user/", data.id]);
      });
  }
}

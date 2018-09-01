import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

interface User {
  id: number;
  name: string;
  genderCode: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  users: User[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<User[]>(`${environment.host}/users`).subscribe(data => {
      this.users = data;
    });
  }
}

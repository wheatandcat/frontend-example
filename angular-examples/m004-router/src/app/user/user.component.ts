import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

interface UserType {
  id: number;
  name: string;
  genderCode: string;
}

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  user: UserType = {
    id: 0,
    name: "",
    genderCode: "1"
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    this.http
      .get<UserType>(`${environment.host}/users/${id}`)
      .subscribe(data => {
        this.user = data;
      });
  }
}

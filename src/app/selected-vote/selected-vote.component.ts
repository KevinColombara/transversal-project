import { Votation } from './../votation';
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-selected-vote',
  templateUrl: './selected-vote.component.html',
  styleUrls: ['./selected-vote.component.css']
})
export class SelectedVoteComponent implements OnInit {


  values: any;
  varid!: string;


  constructor(private http: HttpClient,private _Activatedroute:ActivatedRoute) { }


  ngOnInit(): void {this.onSubmit();

  }


  getValues() {
      this.varid=String(this._Activatedroute.snapshot.paramMap.get("id"));
      alert("http://localhost:3000/getVotation/"+this.varid);
      return this.http.get<any>("http://localhost:3000/getVotation/"+this.varid);
  }

  onSubmit() {

      this.values = this.getValues();

  }


}

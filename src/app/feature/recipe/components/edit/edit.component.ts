import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: number;
  mode: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    //own observable should be cleared
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params['id']);
    });

    this.route.data.subscribe((data: Data) => {
      this.mode = data['mode'];
      console.log(this.mode);
    });
  }
}

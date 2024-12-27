import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'lib-nav-tree-heading',
  templateUrl: './nav-tree-heading.component.html',
  styleUrls: ['./nav-tree-heading.component.css']
})
export class NavTreeHeadingComponent implements OnInit {
  selectedPath: string[] = [];
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      if(params['path']){
        this.selectedPath =JSON.parse(params['path']);
      }
    });
  }
 

}



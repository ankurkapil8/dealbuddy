import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../../utils.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  public allDeals = [];
  public stopLoading = false;
  public advertisementImage = '../../assets/img/saving.jpg';

  constructor(
    private utils: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.getResultsBasedOnData();
  }


  getResultsBasedOnData(){
      let searchKey = this.route.snapshot.paramMap.get('searchKeyword');

      this.findInThresults(searchKey);
  }

  
  pushToCollection(where, data){

    if(where.length == 0){ this.stopLoading = true; }

    data.map( oneData =>{
              let ourData = JSON.parse( oneData );
          
              let newDate = this.utils.convertEpochDateToLocalDate( ourData.entryTime );
              ourData.formattedDate = `${ newDate }`;
               
              where.push(  ourData );
    });

  }


  findInThresults(searchKey){

         this.utils.findMeThisKeyword(1, searchKey).subscribe(
            res =>{

              this.pushToCollection( this.allDeals, res );

            },
            err =>{

              this.utils.openSnackBar('Sorry we had an error while finding your search results');

            }
          );
    
  }

}

import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../../utils.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {

    public allDeals = [];
    public filterButtons = [
        {  'class': '',  'icon': 'fa-user',  'title': '4 you' },
        {  'class': 'bordered',  'icon': 'fa-list-ul',  'title': 'All' },
        {  'class': '',  'icon': 'fa-map-marker',  'title': 'Local' },
        // {  'class': '',  'icon': 'fa-bookmark',  'title': 'Saved' }
    ];
  
    public pageId = 1;
    public stopLoading = false;
  
  
    constructor(
      public utils: UtilsService,
      private router: Router, 
    ){}
  
    ngOnInit() {
      this.utils.returnLoggedInOrNot();
      this.getAllCoupons( this.pageId, undefined);
    }
  
    pushToCollection(where, data){
  
      if(where.length == 0){ this.stopLoading = true; }

      data.map( oneData => where.push(oneData) );

    }
  
      getAllCoupons(page, filterBy){
  
          this.allDeals = [];
  
          this.utils.getAllEvents(page, filterBy).subscribe(
              res =>{
                this.pushToCollection( this.allDeals, res );
              },
              err =>{
                // console.log( err );
              }
            );
      
      };
  

      
    activeRoute(filterButton){

      if( filterButton.class === 'bordered' ){
          return true;
      }
      
      }
  
  
      selectThisButton( btn ){
          let btnTitle = btn.title;
  
          this.filterButtons.map( oneBtn =>{
  
              if(oneBtn.title === btnTitle){
                oneBtn.class = 'bordered';
                  this.filterThisResults(btnTitle);
              }else{
                  oneBtn.class = '';
              }
  
          });
  
      }
  
      filterThisResults(by){
  
          const page = 1;
          let filterBy =  'all';
          let callFiter = false;
  
          if( by === '4 you'){
              filterBy= 'matchedEvents';
              callFiter = true;
  
          }else if( by === 'All'){
              filterBy= undefined;
              callFiter = true;
  
          }else if( by === 'Local'){
  
              this.utils.getTheUserLocation();
  
              this.utils.returnLoggedInOrNot() === false ? callFiter = false : callFiter = true;

              filterBy= 'localEvents'
  
          }else if( by === 'Saved'){
              filterBy= 'savedEvents'
          }
  
          // check and call
          if( callFiter === true ){
              this.callFilteredApi(page,filterBy);
          }
  
      }
  
      callFilteredApi(page,filterBy){  
          this.getAllCoupons(page, filterBy);
      }
    
  

}
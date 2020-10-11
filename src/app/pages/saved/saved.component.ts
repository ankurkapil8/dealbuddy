import { Component, OnInit, AfterViewInit , Inject } from '@angular/core';
import { UtilsService } from "../../utils.service";

export interface DialogData {
  animal: string;
  name: string;
};

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html'
})


export class SavedComponent implements OnInit {

    public allDeals = [];

    public filterButtons = [
        {  'class': '',  'icon': 'fa-user',  'title': '4 you' },
        {  'class': 'bordered',  'icon': 'fa-list-ul',  'title': 'All' },
        {  'class': '',  'icon': 'fa-map-marker',  'title': 'Local' },
    ];

    public savedDeals = [];
    public userInteractionIcons = this.utils.userInteractionIcons;
    public pageId = 1;
    public savedAreEmpty = true;

    public animal: string;
    public name: string;
    public stopLoading = false;

    constructor(
        public utils: UtilsService
    ){}


    ngOnInit() {
        this.getSavedDeals();
    }
 
  
    public trackItem (index: number, item) {
        return index;
    }

    pushToCollection(where, data){


        if( where === this.allDeals  ){

            if(where.length == 0){ this.stopLoading = true; }

            data.map( oneData => {
    
                let newDate = this.utils.convertEpochDateToLocalDate( oneData.entryTime );
                oneData.formattedDate = `${ newDate }`;
                
            });
    
            data.map( oneData => where.push(oneData) );

        }else{
            
            if(where.length == 0){ this.stopLoading = true; }

            data.map( oneData => where.push( JSON.parse(oneData) ) );
            this.savedDeals.map( data => { data.isBookmarked = true; } );
            this.savedDeals = [...this.savedDeals];
            
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
            filterBy= 'matchedDeals';
            callFiter = true;

        }else if( by === 'All'){
            filterBy= undefined;
            callFiter = true;

        }else if( by === 'Local'){

            this.utils.getTheUserLocation();

            filterBy= 'localDeals';

            this.utils.returnLoggedInOrNot() === false ? callFiter = false : callFiter = true;

        }else if( by === 'Saved'){
            filterBy= 'savedDeals';
            callFiter = true;
        }

        // check and call
        if( callFiter === true ){
            // this.callFilteredApi(page,filterBy);
        }

    }

    
    activeRoute(filterButton){

        if( filterButton.class === 'bordered' ){
            return true;
        }
        
    }


    getSavedDeals(){
        
        this.savedDeals = [];
        this.utils.getAllUserSavedItems().subscribe(
            res =>{

                this.savedAreEmpty = false;
                this.pushToCollection( this.savedDeals, res);

            },
            err =>{
                this.utils.openSnackBar('Sorry we could not get your saved deals, please try again');
            }
        );

    }

    getSavedDealByEmail(){
        // will pass call to api and return the results to the the api
    }

    bookmarkThisDeal(icon,feed){


            if(icon.title === 'bookmark' && feed.isBookmarked == true ){
                feed.isBookmarked = undefined;
                this.sendTheBookmarkDelete(feed.id);
            }
            else  if(icon.title === 'bookmark' && feed.isBookmarked == undefined ){

                this.sendTheBookmarkPost(feed.id);
            }

    }


    sendTheBookmarkDelete(dealId){

        this.utils.deleteADealBookmark(dealId).subscribe(
            res =>{
                this.getSavedDeals();
            },
            err =>{
                this.utils.openSnackBar('Sorry we unbookmark this deal, please try again');
            }
        );

    }


    sendTheBookmarkPost(dealId){

        this.utils.bookmarkADeal(dealId).subscribe(
            res =>{
                this.getSavedDeals();
            },
            err =>{
                this.utils.openSnackBar('Sorry we could not bookmark this deal, please try again');
            }
        );

    }


    
}

    import { Component, OnInit } from '@angular/core';
    import { UtilsService } from "../../utils.service";
    import {Router} from "@angular/router";


    @Component({
        selector: 'app-deals',
        templateUrl: './deals.component.html',
    })

    export class DealsComponent implements OnInit {

    public allDeals = [];

    public filterButtons = [
        {  'class': '',  'icon': 'fa-user',  'title': '4 you' },
        {  'class': 'bordered',  'icon': 'fa-list-ul',  'title': 'All' },
        {  'class': '',  'icon': 'fa-map-marker',  'title': 'Local' },
        // {  'class': '',  'icon': 'fa-bookmark',  'title': 'Saved' }
    ];

    public savedDeals = [];
    public userInteractionIcons = this.utils.userInteractionIcons;
    public pageId = 1;
    public stopLoading = false;

    constructor(
        public utils: UtilsService,
        private router: Router,
    ){}


    ngOnInit() {
        this.getAllDeals( this.pageId, undefined);
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

            data.map( oneData => where.push(oneData) );

            this.savedDeals.map( data =>{

                this.allDeals.map( (oneDeal, index) =>{

                            if(oneDeal.id === data.id ){
                                document.getElementById(`${oneDeal.id}`).style.color = 'red';
                                oneDeal.isBookmarked = true;
                            }
                });

            });

            // update the deals listing
            this.allDeals = [...this.allDeals];

        }

    }

    getAllDeals(pageId, filterBy){

        this.allDeals = [];
        
        this.utils.getAllDeals(pageId, filterBy).subscribe(

            res =>{
              this.pushToCollection( this.allDeals, res );
              this.getSavedDeals();
            },
            err =>{
                this.utils.openSnackBar('Sorry we could not get all deals, please check your internet connection');
            }
          
      );


    };
    


    
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

            this.utils.returnLoggedInOrNot() === false ? callFiter = false : callFiter = true;

            filterBy= 'localDeals';

        }else if( by === 'Saved'){
            filterBy= 'savedDeals';
            callFiter = true;
        }

        // check and call
        if( callFiter === true ){
            this.callFilteredApi(page,filterBy);
        }

    }

    callFilteredApi(page,filterBy){

        this.getAllDeals(page, filterBy);
    }

    
    activeRoute(filterButton){

        if( filterButton.class === 'bordered' ){
            return true;
        }
        
    }


    getSavedDeals( deleteID='1' ){
        
        this.savedDeals = [];
        this.utils.getSavedDeals().subscribe(
            ( res: any ) =>{

                let response = res;
                let strippedSavedDealsArray = response.filter( oneDeal => oneDeal.id !== deleteID );
                this.pushToCollection( this.savedDeals, strippedSavedDealsArray);
            },
            err =>{
                this.utils.openSnackBar('Sorry we could not get your saved deals, please try again');
            }
        );

    }

    bookmarkThisDeal(icon,feed){

                    if(icon.title === 'bookmark' && feed.isBookmarked == true ){
                        feed.isBookmarked = undefined;
                        this.sendTheBookmarkDelete(feed);
                    }
                    else if(icon.title === 'bookmark' && feed.isBookmarked == undefined ){
                        this.sendTheBookmarkPost(feed.id);
                    }


    }

    sendTheBookmarkDelete(feed){

        this.utils.deleteADealBookmark(feed.id).subscribe(
            res =>{

                document.getElementById(`${feed.id}`).style.color = '#BBF8D3';
                this.getSavedDeals(feed.id);

            },
            err =>{

                if( err.status === 200 ){

                    document.getElementById(`${feed.id}`).style.color = '#BBF8D3';
                    this.getSavedDeals(feed.id);

                }else{

                    this.utils.openSnackBar('Sorry we unbookmark this deal, please try again');

                }
               
            }
        );

    }


    sendTheBookmarkPost(dealId){


        this.utils.bookmarkADeal(dealId).subscribe(
            res =>{
                document.getElementById(`${dealId}`).style.color = 'red';
                this.getSavedDeals();
            },
            err =>{

                if( err.status === 200 ){
                    
                    document.getElementById(`${dealId}`).style.color = 'red';
                    this.getSavedDeals();

                }else{
                    this.utils.openSnackBar('Sorry we could not bookmark this deal, please try again');
                }

            }
        )

    }


    


}
